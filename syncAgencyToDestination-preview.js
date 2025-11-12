// syncAgencyToContractor-preview.js
// Preview mode - generates HTML report instead of writing to Contractor

require("dotenv").config();
const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");

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
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: #f5f5f5;
            padding: 20px;
            line-height: 1.6;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333;
            margin-bottom: 10px;
            font-size: 28px;
        }
        .subtitle {
            color: #666;
            margin-bottom: 30px;
            font-size: 16px;
        }
        .summary {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 6px;
            margin-bottom: 30px;
            border-left: 4px solid #007bff;
        }
        .summary h2 {
            color: #333;
            margin-bottom: 15px;
            font-size: 20px;
        }
        .summary-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
        }
        .summary-item {
            background: white;
            padding: 15px;
            border-radius: 4px;
        }
        .summary-item .label {
            color: #666;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 5px;
        }
        .summary-item .value {
            color: #333;
            font-size: 24px;
            font-weight: bold;
        }
        .user-section {
            margin-bottom: 40px;
        }
        .user-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 6px;
            margin-bottom: 20px;
        }
        .user-header h2 {
            font-size: 24px;
            margin-bottom: 5px;
        }
        .user-stats {
            font-size: 14px;
            opacity: 0.9;
        }
        .project-group {
            margin-bottom: 30px;
            border: 1px solid #e0e0e0;
            border-radius: 6px;
            overflow: hidden;
        }
        .project-header {
            background: #f8f9fa;
            padding: 15px 20px;
            border-bottom: 1px solid #e0e0e0;
        }
        .project-name {
            font-size: 18px;
            font-weight: 600;
            color: #333;
            margin-bottom: 5px;
        }
        .project-status {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 500;
        }
        .status-exists {
            background: #d4edda;
            color: #155724;
        }
        .status-new {
            background: #fff3cd;
            color: #856404;
        }
        .entries-table {
            width: 100%;
            border-collapse: collapse;
        }
        .entries-table th {
            background: #f8f9fa;
            padding: 12px 20px;
            text-align: left;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: #666;
            font-weight: 600;
        }
        .entries-table td {
            padding: 12px 20px;
            border-top: 1px solid #e0e0e0;
            color: #333;
        }
        .entries-table tr:hover {
            background: #f8f9fa;
        }
        .hours {
            font-weight: 600;
            color: #667eea;
        }
        .task-badge {
            display: inline-block;
            padding: 4px 10px;
            background: #e3f2fd;
            color: #1976d2;
            border-radius: 4px;
            font-size: 13px;
        }
        .task-new {
            background: #fff3cd;
            color: #856404;
        }
        .notes {
            color: #666;
            font-size: 14px;
            font-style: italic;
        }
        .action-required {
            background: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 4px;
        }
        .action-required h3 {
            color: #856404;
            margin-bottom: 10px;
        }
        .action-list {
            list-style: none;
            padding-left: 0;
        }
        .action-list li {
            padding: 5px 0;
            color: #856404;
        }
        .action-list li:before {
            content: "→ ";
            font-weight: bold;
        }
        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e0e0e0;
            color: #666;
            font-size: 14px;
            text-align: center;
        }
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
    const cannonballUsers = await getAgencyUsers();
    const feralUsers = await getContractorUsers();

    // Find target users in Agency
    const targetAgencyUsers = cannonballUsers.filter((user) =>
      config.targetUsers.includes(`${user.first_name} ${user.last_name}`)
    );

    if (targetAgencyUsers.length === 0) {
      console.log("No target users found in Agency account");
      return;
    }

    console.log(`Found ${targetAgencyUsers.length} target user(s) in Agency`);

    // Get existing projects and tasks from Contractor
    const feralProjects = await getContractorProjects();
    const feralTasks = await getContractorTasks();

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
            exists: feralProjects.some((p) => p.name === projectName),
            entries: [],
          });
          uniqueProjects.add(projectName);
        }

        const taskExists = feralTasks.some((t) => t.name === entry.task.name);
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
      (name) => !feralProjects.some((p) => p.name === name)
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
