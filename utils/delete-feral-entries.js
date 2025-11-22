#!/usr/bin/env node

/**
 * Delete Time Entries from Feral Creative Harvest
 *
 * This script deletes all time entries from the Feral Creative (contractor)
 * Harvest account within a specified date range.
 *
 * WARNING: This is a destructive operation and cannot be undone!
 *
 * Usage:
 *   node utils/delete-feral-entries.js
 */

require("dotenv").config();
const readline = require("readline");
const fs = require("fs");

// Harvest API configuration
const FERAL_ACCOUNT_ID = process.env.CONTRACTOR_HARVEST_ACCOUNT_ID;
const FERAL_ACCESS_TOKEN = process.env.CONTRACTOR_HARVEST_TOKEN;

// Date range - from November 16, 2025 to present
const FROM_DATE = "2025-11-16";
const TO_DATE = new Date().toISOString().split("T")[0]; // Today's date

// Validate environment variables
if (!FERAL_ACCOUNT_ID || !FERAL_ACCESS_TOKEN) {
  console.error("❌ Error: Missing required environment variables");
  console.error("   Required: CONTRACTOR_HARVEST_ACCOUNT_ID, CONTRACTOR_HARVEST_TOKEN");
  process.exit(1);
}

/**
 * Make a request to the Harvest API
 */
async function harvestRequest(path, method = "GET", body = null) {
  const url = `https://api.harvestapp.com/v2${path}`;
  const options = {
    method,
    headers: {
      "Harvest-Account-ID": FERAL_ACCOUNT_ID,
      Authorization: `Bearer ${FERAL_ACCESS_TOKEN}`,
      "User-Agent": "Harvest Sync (harvest-sync@feralcreative.com)",
      "Content-Type": "application/json",
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Harvest API error (${response.status}): ${errorText}`);
  }

  return response.json();
}

/**
 * Get all time entries for a date range
 */
async function getAllTimeEntries(fromDate, toDate) {
  console.log(`\nFetching time entries from ${fromDate} to ${toDate}...`);

  let allEntries = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    const data = await harvestRequest(`/time_entries?from=${fromDate}&to=${toDate}&page=${page}&per_page=100`);

    allEntries = allEntries.concat(data.time_entries);
    totalPages = data.total_pages;

    console.log(`  Fetched page ${page} of ${totalPages} (${data.time_entries.length} entries)`);
    page++;
  }

  return allEntries;
}

/**
 * Delete a time entry
 */
async function deleteTimeEntry(entryId) {
  await harvestRequest(`/time_entries/${entryId}`, "DELETE");
}

/**
 * Prompt user for confirmation
 */
function promptConfirmation(message) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(message, (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === "yes");
    });
  });
}

/**
 * Main execution
 */
async function main() {
  console.log("╔════════════════════════════════════════════════════════════════╗");
  console.log("║  DELETE FERAL CREATIVE TIME ENTRIES                            ║");
  console.log("╚════════════════════════════════════════════════════════════════╝");
  console.log();
  console.log(`📅 Date Range: ${FROM_DATE} to ${TO_DATE}`);
  console.log(`🏢 Account: Feral Creative (${FERAL_ACCOUNT_ID})`);
  console.log();

  try {
    // Fetch all time entries
    const entries = await getAllTimeEntries(FROM_DATE, TO_DATE);

    if (entries.length === 0) {
      console.log("\n✅ No time entries found in the specified date range.");
      process.exit(0);
    }

    // Display summary
    console.log(`\n📊 Found ${entries.length} time entries to delete:\n`);

    // Group by user
    const entriesByUser = {};
    entries.forEach((entry) => {
      const userName = `${entry.user.name}`;
      if (!entriesByUser[userName]) {
        entriesByUser[userName] = [];
      }
      entriesByUser[userName].push(entry);
    });

    // Display breakdown by user
    Object.keys(entriesByUser).forEach((userName) => {
      const userEntries = entriesByUser[userName];
      const totalHours = userEntries.reduce((sum, e) => sum + e.hours, 0);
      console.log(`  ${userName}: ${userEntries.length} entries (${totalHours.toFixed(2)} hours)`);
    });

    // Generate markdown report
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `entries-to-delete-${timestamp}.md`;

    let markdown = `# Time Entries to Delete from Feral Creative\n\n`;
    markdown += `**Date Range:** ${FROM_DATE} to ${TO_DATE}\n`;
    markdown += `**Account:** Feral Creative (${FERAL_ACCOUNT_ID})\n`;
    markdown += `**Generated:** ${new Date().toLocaleString()}\n\n`;
    markdown += `---\n\n`;
    markdown += `## Summary\n\n`;
    markdown += `**Total Entries:** ${entries.length}\n\n`;

    // Summary by user
    Object.keys(entriesByUser).forEach((userName) => {
      const userEntries = entriesByUser[userName];
      const totalHours = userEntries.reduce((sum, e) => sum + e.hours, 0);
      markdown += `- **${userName}:** ${userEntries.length} entries (${totalHours.toFixed(2)} hours)\n`;
    });

    markdown += `\n---\n\n`;
    markdown += `## Detailed List\n\n`;

    // Detailed list in table format
    markdown += `| # | Date | User | Project | Task | Hours | Notes |\n`;
    markdown += `|---|------|------|---------|------|-------|-------|\n`;

    entries.forEach((entry, index) => {
      const date = entry.spent_date;
      const user = entry.user.name;
      const project = entry.project.name;
      const task = entry.task.name;
      const hours = entry.hours.toFixed(2);
      const notes = (entry.notes || "").replace(/\|/g, "\\|").replace(/\n/g, " ") || "-";

      markdown += `| ${index + 1} | ${date} | ${user} | ${project} | ${task} | ${hours} | ${notes} |\n`;
    });

    // Write to file
    fs.writeFileSync(filename, markdown);

    console.log(`\n✅ Detailed list written to: ${filename}`);
    console.log(`   Review this file before proceeding.\n`);
    console.log("⚠️  WARNING: This will permanently delete all these entries!");
    console.log("⚠️  This action CANNOT be undone!");
    console.log();

    // Confirm deletion
    const confirmed = await promptConfirmation("Type 'yes' to confirm deletion: ");

    if (!confirmed) {
      console.log("\n❌ Deletion cancelled.");
      process.exit(0);
    }

    // Delete entries
    console.log("\n🗑️  Deleting entries...\n");
    let deleted = 0;
    let failed = 0;

    for (const entry of entries) {
      try {
        await deleteTimeEntry(entry.id);
        deleted++;
        console.log(`  ✓ Deleted: ${entry.spent_date} - ${entry.project.name} - ${entry.task.name} - ${entry.hours}h`);
      } catch (error) {
        failed++;
        console.error(`  ✗ Failed: ${entry.spent_date} - ${entry.project.name} - ${error.message}`);
      }
    }

    // Summary
    console.log("\n╔════════════════════════════════════════════════════════════════╗");
    console.log("║  DELETION COMPLETE                                             ║");
    console.log("╚════════════════════════════════════════════════════════════════╝");
    console.log(`\n✅ Successfully deleted: ${deleted} entries`);
    if (failed > 0) {
      console.log(`❌ Failed to delete: ${failed} entries`);
    }
    console.log();
  } catch (error) {
    console.error("\n❌ Error:", error.message);
    process.exit(1);
  }
}

// Run the script
main();
