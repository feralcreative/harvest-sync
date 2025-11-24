// syncAgencyToContractor.js
// Syncs time entries from source agency Harvest to contractor company Harvest

require("dotenv").config();
const fetch = require("node-fetch");

// Configuration from environment variables
const config = {
  agency: {
    accountId: process.env.AGENCY_HARVEST_ACCOUNT_ID,
    token: process.env.AGENCY_HARVEST_TOKEN,
    apiUrl: "https://api.harvestapp.com/v2",
    name: process.env.AGENCY_NAME || "Agency",
  },
  destination: {
    accountId: process.env.CONTRACTOR_HARVEST_ACCOUNT_ID,
    token: process.env.CONTRACTOR_HARVEST_TOKEN,
    apiUrl: "https://api.harvestapp.com/v2",
    name: process.env.CONTRACTOR_NAME || "Contractor",
  },
  targetUsers: [process.env.EMPLOYEE_1_NAME, process.env.EMPLOYEE_2_NAME].filter(Boolean), // Remove any undefined values
};

// Helper function to make Harvest API requests
async function harvestRequest(account, endpoint, method = "GET", body = null) {
  const url = `${account.apiUrl}${endpoint}`;
  const options = {
    method,
    headers: {
      Authorization: `Bearer ${account.token}`,
      "Harvest-Account-Id": account.accountId,
      "Content-Type": "application/json",
      "User-Agent": "Harvest-Sync-Tool (contact@example.com)",
    },
  };

  if (body && (method === "POST" || method === "PATCH")) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Harvest API error (${response.status}): ${errorText}`);
  }

  return await response.json();
}

// Get all users from Agency
async function getAgencyUsers() {
  console.log("Fetching users from Agency...");
  const data = await harvestRequest(config.agency, "/users");
  return data.users;
}

// Get all users from Contractor
async function getContractorUsers() {
  console.log("Fetching users from Contractor...");
  const data = await harvestRequest(config.contractor, "/users");
  return data.users;
}

// Get time entries for a specific user from Agency
async function getAgencyTimeEntries(userId, fromDate, toDate) {
  console.log(`Fetching time entries for user ${userId} from ${fromDate} to ${toDate}...`);
  let allEntries = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const endpoint = `/time_entries?user_id=${userId}&from=${fromDate}&to=${toDate}&page=${page}&per_page=100`;
    const data = await harvestRequest(config.agency, endpoint);
    allEntries = allEntries.concat(data.time_entries);

    hasMore = data.next_page !== null;
    page++;
  }

  return allEntries;
}

// Get all projects from Contractor
async function getContractorProjects() {
  console.log("Fetching projects from Contractor...");
  let allProjects = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const endpoint = `/projects?page=${page}&per_page=100`;
    const data = await harvestRequest(config.contractor, endpoint);
    allProjects = allProjects.concat(data.projects);

    hasMore = data.next_page !== null;
    page++;
  }

  return allProjects;
}

// Get all tasks from Contractor
async function getContractorTasks() {
  console.log("Fetching tasks from Contractor...");
  const data = await harvestRequest(config.contractor, "/tasks");
  return data.tasks;
}

// Create a project in Contractor
async function createContractorProject(projectName, projectCode = null) {
  console.log(`Creating project "${projectName}" in Contractor...`);
  const projectData = {
    name: projectName,
    is_active: true,
    bill_by: "People", // Use Person Billable Rate
    budget_by: "none",
  };

  if (projectCode) {
    projectData.code = projectCode;
  }

  const data = await harvestRequest(config.contractor, "/projects", "POST", projectData);
  console.log(`Created project "${projectName}" with ID: ${data.id}`);
  return data;
}

// Create a task in Contractor if it doesn't exist
async function ensureTaskExists(taskName, existingTasks) {
  const existingTask = existingTasks.find((t) => t.name === taskName);
  if (existingTask) {
    return existingTask;
  }

  console.log(`Creating task "${taskName}" in Contractor...`);
  const taskData = {
    name: taskName,
    is_active: true,
    billable_by_default: true,
  };

  const data = await harvestRequest(config.contractor, "/tasks", "POST", taskData);
  console.log(`Created task "${taskName}" with ID: ${data.id}`);
  existingTasks.push(data); // Add to cache
  return data;
}

// Assign task to project in Contractor
async function assignTaskToProject(projectId, taskId) {
  console.log(`Assigning task ${taskId} to project ${projectId}...`);
  const assignmentData = {
    task_id: taskId,
    is_active: true,
    billable: true,
  };

  try {
    const data = await harvestRequest(
      config.contractor,
      `/projects/${projectId}/task_assignments`,
      "POST",
      assignmentData
    );
    return data;
  } catch (error) {
    // Task might already be assigned
    if (error.message.includes("422")) {
      console.log(`Task ${taskId} already assigned to project ${projectId}`);
      return null;
    }
    throw error;
  }
}

// Assign user to project in Contractor
async function assignUserToProject(projectId, userId) {
  console.log(`Assigning user ${userId} to project ${projectId}...`);
  const assignmentData = {
    user_id: userId,
    is_active: true,
  };

  try {
    const data = await harvestRequest(
      config.contractor,
      `/projects/${projectId}/user_assignments`,
      "POST",
      assignmentData
    );
    return data;
  } catch (error) {
    // User might already be assigned
    if (error.message.includes("422")) {
      console.log(`User ${userId} already assigned to project ${projectId}`);
      return null;
    }
    throw error;
  }
}

// Create time entry in Contractor
async function createContractorTimeEntry(timeEntry, contractorUserId, contractorProjectId, contractorTaskId) {
  const entryData = {
    user_id: contractorUserId,
    project_id: contractorProjectId,
    task_id: contractorTaskId,
    spent_date: timeEntry.spent_date,
    hours: timeEntry.hours,
    notes: timeEntry.notes || "",
  };

  const data = await harvestRequest(config.contractor, "/time_entries", "POST", entryData);
  return data;
}

// Main sync function
async function syncTimeEntries(fromDate, toDate) {
  console.log(`\n=== Starting Agency to Contractor sync for ${fromDate} to ${toDate} ===\n`);

  try {
    // Get users from both accounts
    const agencyUsers = await getAgencyUsers();
    const contractorUsers = await getContractorUsers();

    // Find target users in Agency
    const targetAgencyUsers = agencyUsers.filter((user) =>
      config.targetUsers.includes(`${user.first_name} ${user.last_name}`)
    );

    if (targetAgencyUsers.length === 0) {
      console.log("No target users found in Agency account");
      return;
    }

    console.log(`Found ${targetAgencyUsers.length} target user(s) in Agency`);

    // Get existing projects and tasks from Contractor
    const contractorProjects = await getContractorProjects();
    const contractorTasks = await getContractorTasks();

    let totalEntriesCreated = 0;
    let totalEntriesSkipped = 0;

    // Process each target user
    for (const agencyUser of targetAgencyUsers) {
      console.log(`\n--- Processing ${agencyUser.first_name} ${agencyUser.last_name} ---`);

      // Find corresponding user in Contractor
      const contractorUser = contractorUsers.find(
        (u) => `${u.first_name} ${u.last_name}` === `${agencyUser.first_name} ${agencyUser.last_name}`
      );

      if (!contractorUser) {
        console.log(
          `WARNING: User ${agencyUser.first_name} ${agencyUser.last_name} not found in Contractor. Skipping.`
        );
        continue;
      }

      // Get time entries for this user from Agency
      const timeEntries = await getAgencyTimeEntries(agencyUser.id, fromDate, toDate);
      console.log(`Found ${timeEntries.length} time entries for ${agencyUser.first_name} ${agencyUser.last_name}`);

      // Process each time entry
      for (const entry of timeEntries) {
        try {
          const projectName = entry.project.name;
          const taskName = entry.task.name;

          // Find or create project in Contractor
          let contractorProject = contractorProjects.find((p) => p.name === projectName);
          if (!contractorProject) {
            contractorProject = await createContractorProject(projectName, entry.project.code);
            contractorProjects.push(contractorProject);
          }

          // Ensure task exists in Contractor
          const contractorTask = await ensureTaskExists(taskName, contractorTasks);

          // Assign task to project
          await assignTaskToProject(contractorProject.id, contractorTask.id);

          // Assign user to project
          await assignUserToProject(contractorProject.id, contractorUser.id);

          // Create time entry in Contractor
          await createContractorTimeEntry(entry, contractorUser.id, contractorProject.id, contractorTask.id);

          console.log(`✓ Created time entry: ${entry.hours}h on ${entry.spent_date} for ${projectName} - ${taskName}`);
          totalEntriesCreated++;
        } catch (error) {
          if (error.message.includes("422") && error.message.includes("already been taken")) {
            console.log(`⊘ Skipped duplicate entry: ${entry.hours}h on ${entry.spent_date}`);
            totalEntriesSkipped++;
          } else {
            console.error(`✗ Error creating time entry:`, error.message);
          }
        }
      }
    }

    console.log(`\n=== Sync Complete ===`);
    console.log(`Total entries created: ${totalEntriesCreated}`);
    console.log(`Total entries skipped: ${totalEntriesSkipped}`);
  } catch (error) {
    console.error("Fatal error during sync:", error);
    throw error;
  }
}

// Main execution
async function main() {
  // Validate environment variables
  if (!config.agency.accountId || !config.agency.token) {
    console.error("ERROR: Agency Harvest credentials not configured in .env file");
    process.exit(1);
  }

  if (!config.contractor.accountId || !config.contractor.token) {
    console.error("ERROR: Contractor Harvest credentials not configured in .env file");
    process.exit(1);
  }

  if (config.targetUsers.length === 0) {
    console.error("ERROR: No employee names configured in .env file");
    console.error("Please set EMPLOYEE_1_NAME and/or EMPLOYEE_2_NAME");
    process.exit(1);
  }

  // Get date range from command line arguments or use defaults
  const args = process.argv.slice(2);
  const fromDate = args[0] || new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]; // Last 7 days
  const toDate = args[1] || new Date().toISOString().split("T")[0]; // Today

  await syncTimeEntries(fromDate, toDate);
}

main();
