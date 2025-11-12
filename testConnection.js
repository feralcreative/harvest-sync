// testConnection.js
// Test script to verify Harvest API credentials are working

require("dotenv").config();
const fetch = require("node-fetch");

async function testHarvestConnection(accountName, accountId, token) {
  console.log(`\nTesting ${accountName} connection...`);

  try {
    const response = await fetch("https://api.harvestapp.com/v2/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Harvest-Account-Id": accountId,
        "User-Agent": "Harvest-Sync-Tool (contact@example.com)",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ ${accountName} connection failed (${response.status}): ${errorText}`);
      return false;
    }

    const data = await response.json();
    console.log(`✅ ${accountName} connection successful!`);
    console.log(`   Authenticated as: ${data.first_name} ${data.last_name} (${data.email})`);
    console.log(`   Account ID: ${accountId}`);
    return true;
  } catch (error) {
    console.error(`❌ ${accountName} connection error:`, error.message);
    return false;
  }
}

async function main() {
  console.log("=== Testing Harvest API Connections ===");

  const agencyAccountId = process.env.AGENCY_HARVEST_ACCOUNT_ID;
  const agencyToken = process.env.AGENCY_HARVEST_TOKEN;
  const contractorAccountId = process.env.CONTRACTOR_HARVEST_ACCOUNT_ID;
  const contractorToken = process.env.CONTRACTOR_HARVEST_TOKEN;

  // Check if credentials are configured
  if (!agencyAccountId || !agencyToken) {
    console.error(`\n❌ ${agencyName} credentials not configured in .env file`);
    console.log("   Please set AGENCY_HARVEST_ACCOUNT_ID and AGENCY_HARVEST_TOKEN");
  }

  if (!contractorAccountId || !contractorToken) {
    console.error("\n❌ Contractor credentials not configured in .env file");
    console.log("   Please set CONTRACTOR_HARVEST_ACCOUNT_ID and CONTRACTOR_HARVEST_TOKEN");
  }

  if (!agencyAccountId || !agencyToken || !contractorAccountId || !contractorToken) {
    console.log("\nPlease configure all credentials in .env file and try again.");
    process.exit(1);
  }

  // Test both connections
  const agencyOk = await testHarvestConnection(process.env.AGENCY_NAME || "Agency", agencyAccountId, agencyToken);
  const contractorOk = await testHarvestConnection(
    process.env.CONTRACTOR_NAME || "Contractor",
    contractorAccountId,
    contractorToken
  );

  console.log("\n=== Test Results ===");
  if (agencyOk && contractorOk) {
    console.log("✅ All connections successful! You can now run the sync script.");
  } else {
    console.log("❌ Some connections failed. Please check your credentials and try again.");
    process.exit(1);
  }
}

main();
