// Harvest Sync Web Server
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const fetch = require("node-fetch");
const { exec } = require("child_process");

const app = express();
const PORT = 8118;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Configuration from environment variables
const config = {
  agency: {
    accountId: process.env.AGENCY_HARVEST_ACCOUNT_ID,
    token: process.env.AGENCY_HARVEST_TOKEN,
    apiUrl: "https://api.harvestapp.com/v2",
    name: process.env.AGENCY_NAME || "Agency",
  },
  contractor: {
    accountId: process.env.CONTRACTOR_HARVEST_ACCOUNT_ID,
    token: process.env.CONTRACTOR_HARVEST_TOKEN,
    apiUrl: "https://api.harvestapp.com/v2",
    name: process.env.CONTRACTOR_NAME || "Contractor",
  },
  targetUsers: [process.env.EMPLOYEE_1_NAME, process.env.EMPLOYEE_2_NAME].filter(Boolean),
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

// Get all users from an account
async function getUsers(account) {
  const data = await harvestRequest(account, "/users");
  return data.users;
}

// Get time entries for a specific user
async function getTimeEntries(account, userId, fromDate, toDate) {
  let allEntries = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const endpoint = `/time_entries?user_id=${userId}&from=${fromDate}&to=${toDate}&page=${page}&per_page=100`;
    const data = await harvestRequest(account, endpoint);
    allEntries = allEntries.concat(data.time_entries);
    hasMore = data.next_page !== null;
    page++;
  }

  return allEntries;
}

// Get all projects from an account
async function getProjects(account) {
  let allProjects = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const endpoint = `/projects?page=${page}&per_page=100`;
    const data = await harvestRequest(account, endpoint);
    allProjects = allProjects.concat(data.projects);
    hasMore = data.next_page !== null;
    page++;
  }

  return allProjects;
}

// Get all tasks from an account
async function getTasks(account) {
  const data = await harvestRequest(account, "/tasks");
  return data.tasks;
}

// Get all clients from an account
async function getClients(account) {
  let allClients = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const endpoint = `/clients?page=${page}&per_page=100`;
    const data = await harvestRequest(account, endpoint);
    allClients = allClients.concat(data.clients);
    hasMore = data.next_page !== null;
    page++;
  }

  return allClients;
}

// Get or create default client
async function getOrCreateDefaultClient(account) {
  const clients = await getClients(account);

  // Look for a default client (you can customize this logic)
  let defaultClient = clients.find((c) => c.name === "Default Client" || c.name === config.agency.name);

  if (!defaultClient && clients.length > 0) {
    // Use the first client if no default found
    defaultClient = clients[0];
  }

  if (!defaultClient) {
    // Create a default client if none exist
    const clientData = {
      name: "Default Client",
      is_active: true,
    };
    defaultClient = await harvestRequest(account, "/clients", "POST", clientData);
  }

  return defaultClient;
}

// Create a project
async function createProject(account, projectName, projectCode = null, clientId) {
  const projectData = {
    client_id: clientId,
    name: projectName,
    is_active: true,
    is_billable: true,
    bill_by: "Project",
    budget_by: "none",
  };

  if (projectCode) {
    projectData.code = projectCode;
  }

  const data = await harvestRequest(account, "/projects", "POST", projectData);
  return data;
}

// Ensure task exists
async function ensureTaskExists(account, taskName, existingTasks) {
  const existingTask = existingTasks.find((t) => t.name === taskName);
  if (existingTask) {
    return existingTask;
  }

  const taskData = {
    name: taskName,
    is_active: true,
    billable_by_default: true,
  };

  const data = await harvestRequest(account, "/tasks", "POST", taskData);
  existingTasks.push(data);
  return data;
}

// Assign task to project
async function assignTaskToProject(account, projectId, taskId) {
  const assignmentData = {
    task_id: taskId,
    is_active: true,
    billable: true,
  };

  try {
    const data = await harvestRequest(account, `/projects/${projectId}/task_assignments`, "POST", assignmentData);
    return data;
  } catch (error) {
    if (error.message.includes("422")) {
      return null; // Task already assigned
    }
    throw error;
  }
}

// Assign user to project
async function assignUserToProject(account, projectId, userId) {
  const assignmentData = {
    user_id: userId,
    is_active: true,
  };

  try {
    const data = await harvestRequest(account, `/projects/${projectId}/user_assignments`, "POST", assignmentData);
    return data;
  } catch (error) {
    if (error.message.includes("422")) {
      return null; // User already assigned
    }
    throw error;
  }
}

// Create time entry
async function createTimeEntry(account, timeEntry, userId, projectId, taskId) {
  const entryData = {
    user_id: userId,
    project_id: projectId,
    task_id: taskId,
    spent_date: timeEntry.spent_date,
    hours: timeEntry.hours,
    notes: timeEntry.notes || "",
  };

  const data = await harvestRequest(account, "/time_entries", "POST", entryData);
  return data;
}

// API Routes

// Check connection status
app.get("/api/status", async (req, res) => {
  try {
    const agencyStatus = { connected: false, name: config.agency.name };
    const contractorStatus = { connected: false, name: config.contractor.name };

    try {
      await harvestRequest(config.agency, "/users?per_page=1");
      agencyStatus.connected = true;
    } catch (error) {
      agencyStatus.error = error.message;
    }

    try {
      await harvestRequest(config.contractor, "/users?per_page=1");
      contractorStatus.connected = true;
    } catch (error) {
      contractorStatus.error = error.message;
    }

    res.json({
      agency: agencyStatus,
      contractor: contractorStatus,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Preview sync
app.post("/api/preview", async (req, res) => {
  try {
    const { fromDate, toDate } = req.body;

    if (!fromDate || !toDate) {
      return res.status(400).json({ error: "fromDate and toDate are required" });
    }

    const agencyUsers = await getUsers(config.agency);
    const contractorUsers = await getUsers(config.contractor);
    const contractorProjects = await getProjects(config.contractor);
    const contractorTasks = await getTasks(config.contractor);

    const targetAgencyUsers = agencyUsers.filter((user) =>
      config.targetUsers.includes(`${user.first_name} ${user.last_name}`)
    );

    if (targetAgencyUsers.length === 0) {
      return res.status(400).json({ error: "No target users found in agency account" });
    }

    let totalEntries = 0;
    let totalHours = 0;
    const uniqueProjects = new Set();
    const uniqueNewTasks = new Set();
    const lineItems = [];
    const hoursByUser = {}; // Track hours per user

    // Fetch contractor entries for duplicate detection
    // Build a map of contractor entries by user for efficient lookup
    const contractorEntriesByUser = new Map();

    for (const agencyUser of targetAgencyUsers) {
      // Find matching contractor user by name
      const contractorUser = contractorUsers.find(
        (u) => `${u.first_name} ${u.last_name}` === `${agencyUser.first_name} ${agencyUser.last_name}`
      );

      if (contractorUser) {
        console.log(
          `Fetching contractor entries for ${contractorUser.first_name} ${contractorUser.last_name} (${fromDate} to ${toDate})`
        );
        const entries = await getTimeEntries(config.contractor, contractorUser.id, fromDate, toDate);
        console.log(`  Found ${entries.length} existing contractor entries`);
        contractorEntriesByUser.set(agencyUser.id, entries);
      } else {
        contractorEntriesByUser.set(agencyUser.id, []);
      }
    }

    for (const user of targetAgencyUsers) {
      const timeEntries = await getTimeEntries(config.agency, user.id, fromDate, toDate);
      totalEntries += timeEntries.length;

      const userName = `${user.first_name} ${user.last_name}`;
      if (!hoursByUser[userName]) {
        hoursByUser[userName] = 0;
      }

      // Get contractor entries for this user
      const contractorEntries = contractorEntriesByUser.get(user.id) || [];

      for (const entry of timeEntries) {
        totalHours += entry.hours;
        hoursByUser[userName] += entry.hours; // Add to user's total
        uniqueProjects.add(entry.project.code || entry.project.name);

        // Match by project code if available, otherwise fall back to name
        const projectExists = entry.project.code
          ? contractorProjects.some((p) => p.code === entry.project.code)
          : contractorProjects.some((p) => p.name === entry.project.name);

        const taskExists = contractorTasks.some((t) => t.name === entry.task.name);

        if (!taskExists) {
          uniqueNewTasks.add(entry.task.name);
        }

        // Check if this exact entry already exists in contractor account
        const isDuplicate = contractorEntries.some((contractorEntry) => {
          const dateMatch = contractorEntry.spent_date === entry.spent_date;
          const hoursMatch = contractorEntry.hours === entry.hours;
          const taskMatch = contractorEntry.task.name === entry.task.name;
          const projectMatch =
            (entry.project.code && contractorEntry.project.code === entry.project.code) ||
            contractorEntry.project.name === entry.project.name;
          const notesMatch = (contractorEntry.notes || "") === (entry.notes || "");

          return dateMatch && hoursMatch && taskMatch && projectMatch && notesMatch;
        });

        // Add line item with status markers
        lineItems.push({
          date: entry.spent_date,
          user: `${user.first_name} ${user.last_name}`,
          project: entry.project.name,
          projectCode: entry.project.code || "",
          task: entry.task.name,
          hours: entry.hours,
          notes: entry.notes || "",
          projectStatus: projectExists ? "exists" : "new",
          taskStatus: taskExists ? "exists" : "new",
          entryStatus: isDuplicate ? "duplicate" : "pending",
        });
      }
    }

    const newProjects = Array.from(uniqueProjects).filter((codeOrName) => {
      // Check if this is a code or name by looking for it in the line items
      const item = lineItems.find((li) => (li.projectCode || li.project) === codeOrName);
      if (!item) return false;

      return item.projectCode
        ? !contractorProjects.some((p) => p.code === item.projectCode)
        : !contractorProjects.some((p) => p.name === item.project);
    }).length;

    console.log(`Preview: ${lineItems.length} line items`);

    res.json({
      summary: {
        totalEntries,
        totalHours,
        totalProjects: uniqueProjects.size,
        newProjects,
        newTasks: uniqueNewTasks.size,
        hoursByUser, // Add hours per user
      },
      lineItems,
    });
  } catch (error) {
    console.error("Preview error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Run sync
app.post("/api/sync", async (req, res) => {
  try {
    const { fromDate, toDate } = req.body;

    if (!fromDate || !toDate) {
      return res.status(400).json({ error: "fromDate and toDate are required" });
    }

    const agencyUsers = await getUsers(config.agency);
    const contractorUsers = await getUsers(config.contractor);
    const contractorProjects = await getProjects(config.contractor);
    const contractorTasks = await getTasks(config.contractor);
    const defaultClient = await getOrCreateDefaultClient(config.contractor);

    const targetAgencyUsers = agencyUsers.filter((user) =>
      config.targetUsers.includes(`${user.first_name} ${user.last_name}`)
    );

    if (targetAgencyUsers.length === 0) {
      return res.status(400).json({ error: "No target users found in agency account" });
    }

    let totalEntries = 0;
    let totalHours = 0;
    let entriesCreated = 0;
    let entriesSkipped = 0;
    const uniqueProjects = new Set();
    const lineItems = [];
    const hoursByUser = {}; // Track hours per user

    for (const agencyUser of targetAgencyUsers) {
      const contractorUser = contractorUsers.find(
        (u) => `${u.first_name} ${u.last_name}` === `${agencyUser.first_name} ${agencyUser.last_name}`
      );

      if (!contractorUser) {
        console.log(`User ${agencyUser.first_name} ${agencyUser.last_name} not found in contractor account`);
        continue;
      }

      const timeEntries = await getTimeEntries(config.agency, agencyUser.id, fromDate, toDate);
      totalEntries += timeEntries.length;

      const userName = `${agencyUser.first_name} ${agencyUser.last_name}`;
      if (!hoursByUser[userName]) {
        hoursByUser[userName] = 0;
      }

      for (const entry of timeEntries) {
        totalHours += entry.hours;
        hoursByUser[userName] += entry.hours; // Add to user's total
        uniqueProjects.add(entry.project.code || entry.project.name);

        const projectName = entry.project.name;
        const projectCode = entry.project.code;
        const taskName = entry.task.name;

        // Check if project exists before creating (match by code if available)
        const projectExistsBefore = projectCode
          ? contractorProjects.some((p) => p.code === projectCode)
          : contractorProjects.some((p) => p.name === projectName);

        const taskExistsBefore = contractorTasks.some((t) => t.name === taskName);

        // Find or create project (match by code if available)
        let contractorProject = projectCode
          ? contractorProjects.find((p) => p.code === projectCode)
          : contractorProjects.find((p) => p.name === projectName);

        if (!contractorProject) {
          contractorProject = await createProject(config.contractor, projectName, projectCode, defaultClient.id);
          contractorProjects.push(contractorProject);
        }

        // Ensure task exists
        const contractorTask = await ensureTaskExists(config.contractor, taskName, contractorTasks);

        // Assign task to project
        await assignTaskToProject(config.contractor, contractorProject.id, contractorTask.id);

        // Assign user to project
        await assignUserToProject(config.contractor, contractorProject.id, contractorUser.id);

        // Create time entry
        let entryStatus = "created";
        try {
          await createTimeEntry(config.contractor, entry, contractorUser.id, contractorProject.id, contractorTask.id);
          entriesCreated++;
        } catch (error) {
          if (error.message.includes("422") && error.message.includes("already been taken")) {
            entriesSkipped++;
            entryStatus = "duplicate";
          } else {
            throw error;
          }
        }

        // Add line item with status markers
        lineItems.push({
          date: entry.spent_date,
          user: `${agencyUser.first_name} ${agencyUser.last_name}`,
          project: projectName,
          projectCode: projectCode || "",
          task: taskName,
          hours: entry.hours,
          notes: entry.notes || "",
          projectStatus: projectExistsBefore ? "exists" : "new",
          taskStatus: taskExistsBefore ? "exists" : "new",
          entryStatus,
        });
      }
    }

    res.json({
      summary: {
        totalEntries,
        totalHours,
        totalProjects: uniqueProjects.size,
        entriesCreated,
        entriesSkipped,
        hoursByUser, // Add hours per user
      },
      lineItems,
    });
  } catch (error) {
    console.error("Sync error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, async () => {
  const url = `http://localhost:${PORT}`;
  console.log(`\n🚀 Harvest Sync Dashboard running at ${url}\n`);
  console.log(`📊 Dashboard: ${url}`);
  console.log(`🔌 API Status: ${url}/api/status`);
  console.log(`\n✨ Opening browser...\n`);

  // Open browser
  try {
    exec(`open ${url}`);
  } catch (error) {
    console.error("Could not open browser automatically:", error.message);
    console.log(`Please open ${url} manually in your browser.`);
  }
});
