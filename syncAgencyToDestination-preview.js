// syncAgencyToContractor-preview.js
// Preview mode - generates HTML report instead of writing to Contractor

require("dotenv").config();
const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");

// Load compiled CSS
const cssPath = path.join(__dirname, "assets", "styles", "preview-report.css");
let compiledCSS = "";
try {
  compiledCSS = fs.readFileSync(cssPath, "utf8");
} catch (error) {
  console.error("Warning: Could not load compiled CSS. Run 'npm run build:css' first.");
  console.error("Falling back to inline styles...");
}

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

// Generate HTML report
function generateHTMLReport(reportData, fromDate, toDate) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const filename = `sync-preview-${timestamp}.html`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Harvest Sync Preview - ${fromDate} to ${toDate}</title>
    <style>
        ${compiledCSS}
    </style>
</head>
<body>
    <div class="container">
        <h1>🔍 Harvest Sync Preview</h1>
        <div class="subtitle">${config.agency.name} → ${config.contractor.name} | ${fromDate} to ${toDate}</div>
        
        <div class="summary">
            <h2>Summary</h2>
            <div class="summary-grid">
                <div class="summary-item">
                    <div class="label">Total Entries</div>
                    <div class="value">${reportData.totalEntries}</div>
                </div>
                <div class="summary-item">
                    <div class="label">Total Hours</div>
                    <div class="value">${reportData.totalHours.toFixed(2)}</div>
                </div>
                <div class="summary-item">
                    <div class="label">Projects</div>
                    <div class="value">${reportData.totalProjects}</div>
                </div>
                <div class="summary-item">
                    <div class="label">New Projects</div>
                    <div class="value">${reportData.newProjects}</div>
                </div>
                <div class="summary-item">
                    <div class="label">New Tasks</div>
                    <div class="value">${reportData.newTasks}</div>
                </div>
            </div>
        </div>

        ${
          reportData.newProjects > 0 || reportData.newTasks > 0
            ? `
        <div class="action-required">
            <h3>⚠️ Actions Required</h3>
            <ul class="action-list">
                ${
                  reportData.newProjects > 0
                    ? `<li>${reportData.newProjects} new project(s) will be created in ${config.contractor.name}</li>`
                    : ""
                }
                ${
                  reportData.newTasks > 0
                    ? `<li>${reportData.newTasks} new task(s) will be created in ${config.contractor.name}</li>`
                    : ""
                }
                <li>All tasks will be assigned to their respective projects</li>
                <li>Users will be assigned to all projects</li>
            </ul>
        </div>
        `
            : ""
        }

        ${reportData.users
          .map(
            (user) => `
        <div class="user-section">
            <div class="user-header">
                <h2>${user.name}</h2>
                <div class="user-stats">${user.entries} entries | ${user.hours.toFixed(2)} hours | ${
              user.projects
            } projects</div>
            </div>

            ${user.projectGroups
              .map(
                (project) => `
            <div class="project-group">
                <div class="project-header">
                    <div class="project-name">${project.name}</div>
                    <span class="project-status ${project.exists ? "status-exists" : "status-new"}">
                        ${project.exists ? `✓ Exists in ${config.contractor.name}` : "+ Will be created"}
                    </span>
                </div>
                <table class="entries-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Task</th>
                            <th>Hours</th>
                            <th>Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${project.entries
                          .map(
                            (entry) => `
                        <tr>
                            <td>${entry.spent_date}</td>
                            <td>
                                <span class="task-badge ${entry.taskExists ? "" : "task-new"}">
                                    ${entry.task}${entry.taskExists ? "" : " (new)"}
                                </span>
                            </td>
                            <td class="hours">${entry.hours}h</td>
                            <td class="notes">${entry.notes || "—"}</td>
                        </tr>
                        `
                          )
                          .join("")}
                    </tbody>
                </table>
            </div>
            `
              )
              .join("")}
        </div>
        `
          )
          .join("")}

        <div class="footer">
            Generated on ${new Date().toLocaleString()}<br>
            This is a preview only. No data has been written to ${config.contractor.name}.
        </div>
    </div>
</body>
</html>`;

  fs.writeFileSync(filename, html);
  console.log(`\n✅ Preview report generated: ${filename}`);
  return filename;
}

// Main preview function
async function previewSync(fromDate, toDate) {
  console.log(`\n=== Generating Preview for ${fromDate} to ${toDate} ===\n`);

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

    const reportData = {
      totalEntries: 0,
      totalHours: 0,
      totalProjects: 0,
      newProjects: 0,
      newTasks: 0,
      users: [],
    };

    const uniqueProjects = new Set();
    const uniqueNewTasks = new Set();

    // Process each target user
    for (const cbUser of targetAgencyUsers) {
      console.log(`\nProcessing ${cbUser.first_name} ${cbUser.last_name}...`);

      const userData = {
        name: `${cbUser.first_name} ${cbUser.last_name}`,
        entries: 0,
        hours: 0,
        projects: 0,
        projectGroups: [],
      };

      // Get time entries for this user from Agency
      const timeEntries = await getAgencyTimeEntries(cbUser.id, fromDate, toDate);
      console.log(`Found ${timeEntries.length} time entries`);

      // Group entries by project
      const projectMap = new Map();

      for (const entry of timeEntries) {
        const projectName = entry.project.name;

        if (!projectMap.has(projectName)) {
          projectMap.set(projectName, {
            name: projectName,
            exists: contractorProjects.some((p) => p.name === projectName),
            entries: [],
          });
          uniqueProjects.add(projectName);
        }

        const taskExists = contractorTasks.some((t) => t.name === entry.task.name);
        if (!taskExists) {
          uniqueNewTasks.add(entry.task.name);
        }

        projectMap.get(projectName).entries.push({
          spent_date: entry.spent_date,
          task: entry.task.name,
          taskExists: taskExists,
          hours: entry.hours,
          notes: entry.notes,
        });

        userData.entries++;
        userData.hours += entry.hours;
        reportData.totalEntries++;
        reportData.totalHours += entry.hours;
      }

      userData.projects = projectMap.size;
      userData.projectGroups = Array.from(projectMap.values());
      reportData.users.push(userData);
    }

    reportData.totalProjects = uniqueProjects.size;
    reportData.newProjects = Array.from(uniqueProjects).filter(
      (name) => !contractorProjects.some((p) => p.name === name)
    ).length;
    reportData.newTasks = uniqueNewTasks.size;

    // Generate HTML report
    const filename = generateHTMLReport(reportData, fromDate, toDate);

    console.log(`\n=== Preview Summary ===`);
    console.log(`Total entries: ${reportData.totalEntries}`);
    console.log(`Total hours: ${reportData.totalHours.toFixed(2)}`);
    console.log(`Projects: ${reportData.totalProjects} (${reportData.newProjects} new)`);
    console.log(`New tasks: ${reportData.newTasks}`);
    console.log(`\nOpen ${filename} in your browser to review the details.`);
  } catch (error) {
    console.error("Error generating preview:", error);
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
  const fromDate = args[0] || new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
  const toDate = args[1] || new Date().toISOString().split("T")[0];

  await previewSync(fromDate, toDate);
}

main();
