#!/usr/bin/env node

// update-all-projects-to-people-rate.js
// One-time script to update all Feral Creative projects to use "People" billable rate

require("dotenv").config();
const fetch = require("node-fetch");

// Configuration from environment variables
const config = {
  contractor: {
    accountId: process.env.CONTRACTOR_HARVEST_ACCOUNT_ID,
    token: process.env.CONTRACTOR_HARVEST_TOKEN,
    apiUrl: "https://api.harvestapp.com/v2",
    name: process.env.CONTRACTOR_NAME || "Contractor",
  },
};

// Make a request to Harvest API
async function harvestRequest(account, endpoint, method = "GET", body = null) {
  const url = `${account.apiUrl}${endpoint}`;
  const options = {
    method,
    headers: {
      Authorization: `Bearer ${account.token}`,
      "Harvest-Account-Id": account.accountId,
      "User-Agent": "Harvest Sync (harvest-sync@example.com)",
      "Content-Type": "application/json",
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Harvest API error: ${response.status} ${response.statusText} - ${errorText}`);
  }

  return await response.json();
}

// Get all projects from Contractor account
async function getAllProjects() {
  console.log(`\nFetching all projects from ${config.contractor.name}...`);
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

  console.log(`Found ${allProjects.length} total projects\n`);
  return allProjects;
}

// Update a project to use "People" billable rate
async function updateProjectToPeopleRate(projectId, projectName) {
  const updateData = {
    bill_by: "People",
  };

  try {
    await harvestRequest(config.contractor, `/projects/${projectId}`, "PATCH", updateData);
    return true;
  } catch (error) {
    console.error(`  ❌ Error updating project: ${error.message}`);
    return false;
  }
}

// Main function
async function main() {
  console.log("=".repeat(70));
  console.log("UPDATE ALL PROJECTS TO PERSON BILLABLE RATE");
  console.log("=".repeat(70));
  console.log(`\nAccount: ${config.contractor.name}`);
  console.log(`Account ID: ${config.contractor.accountId}`);

  try {
    // Get all projects
    const projects = await getAllProjects();

    // Filter for active projects only
    const activeProjects = projects.filter((p) => p.is_active === true);
    const archivedProjects = projects.filter((p) => p.is_active === false);

    console.log(`Active projects: ${activeProjects.length}`);
    console.log(`Archived projects (will be skipped): ${archivedProjects.length}\n`);

    // Filter active projects that need updating (not already using "People" rate)
    const projectsToUpdate = activeProjects.filter((p) => p.bill_by !== "People");
    const alreadyCorrect = activeProjects.filter((p) => p.bill_by === "People");

    console.log(`Active projects already using "People" rate: ${alreadyCorrect.length}`);
    console.log(`Active projects needing update: ${projectsToUpdate.length}\n`);

    if (projectsToUpdate.length === 0) {
      console.log("✅ All active projects are already using Person Billable Rate!");
      return;
    }

    // Ask for confirmation
    console.log("Active projects to be updated:");
    projectsToUpdate.forEach((p, i) => {
      console.log(`  ${i + 1}. ${p.name} (ID: ${p.id}) - Current: ${p.bill_by}`);
    });

    console.log("\n⚠️  This will update all ACTIVE projects listed above to use 'People' billable rate.");
    console.log("⚠️  Archived projects will NOT be modified.");
    console.log("Press Ctrl+C to cancel, or press Enter to continue...");

    // Wait for user confirmation
    await new Promise((resolve) => {
      process.stdin.once("data", resolve);
    });

    // Update each project
    console.log("\nUpdating projects...\n");
    let successCount = 0;
    let failCount = 0;

    for (const project of projectsToUpdate) {
      process.stdout.write(`  Updating: ${project.name}... `);
      const success = await updateProjectToPeopleRate(project.id, project.name);

      if (success) {
        console.log("✅");
        successCount++;
      } else {
        failCount++;
      }

      // Small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    // Summary
    console.log("\n" + "=".repeat(70));
    console.log("SUMMARY");
    console.log("=".repeat(70));
    console.log(`✅ Successfully updated: ${successCount}`);
    console.log(`❌ Failed: ${failCount}`);
    console.log(`Total processed: ${projectsToUpdate.length}`);
    console.log("\n✨ Done!\n");
  } catch (error) {
    console.error("\n❌ Error:", error.message);
    process.exit(1);
  }
}

// Run the script
main();
