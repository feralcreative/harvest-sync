# Harvest Sync Helper Scripts

This directory contains utility scripts for managing your Harvest accounts.

## delete-feral-entries.js

**Purpose:** Delete all time entries from the Feral Creative Harvest account within a specified date range.

**⚠️ WARNING:** This is a destructive operation that permanently deletes time entries and CANNOT be undone!

**Use Case:** Useful for testing sync functionality by clearing out entries that were previously synced, allowing you to test the sync process again from scratch.

**Date Range:** Currently configured to delete entries from **November 16, 2025 to present**.

**How to run:**

```bash
node utils/delete-feral-entries.js
```

**What it does:**

1. Fetches all time entries from Feral Creative for the date range
2. Shows you a summary of entries to be deleted (grouped by user)
3. Asks for confirmation (type 'yes' to proceed)
4. Deletes each entry one by one
5. Shows a summary of results (deleted vs failed)

**Safety features:**

- Only affects the **Feral Creative** (contractor) account
- Does NOT touch the **Cannonball** (agency) account
- Requires explicit confirmation before deleting (must type 'yes')
- Shows detailed summary before proceeding
- Reports success/failure for each deletion

**Example output:**

```text
╔════════════════════════════════════════════════════════════════╗
║  DELETE FERAL CREATIVE TIME ENTRIES                            ║
╚════════════════════════════════════════════════════════════════╝

📅 Date Range: 2025-11-16 to 2025-11-22
🏢 Account: Feral Creative (12345678)

Fetching time entries from 2025-11-16 to 2025-11-22...
  Fetched page 1 of 1 (25 entries)

📊 Found 25 time entries to delete:

  Ziad Ezzat: 15 entries (15.53 hours)
  Rebecca Hobbs: 10 entries (17.33 hours)

⚠️  WARNING: This will permanently delete all these entries!
⚠️  This action CANNOT be undone!

Type 'yes' to confirm deletion: yes

🗑️  Deleting entries...

  ✓ Deleted: 2025-11-20 - VEN Landing Page - Technology - 0.17h
  ✓ Deleted: 2025-11-20 - Internal IT Support - Technology - 1.62h
  ...

╔════════════════════════════════════════════════════════════════╗
║  DELETION COMPLETE                                             ║
╚════════════════════════════════════════════════════════════════╝

✅ Successfully deleted: 25 entries
```

**To modify date range:**

Edit the `FROM_DATE` constant in the script (line 23):

```javascript
const FROM_DATE = "2025-11-16"; // Change this date
```

---

## update-all-projects-to-people-rate.js

**Purpose:** One-time script to update all **active** projects in your Feral Creative (contractor) account to use "Person Billable Rate" instead of "Project" rate.

**When to use:**

- After initial setup to convert existing projects
- When you need to bulk-update project billing settings

**What it does:**

1. Fetches all projects from your contractor Harvest account
2. Filters for active projects only (archived projects are skipped)
3. Identifies active projects not using "People" billable rate
4. Shows you a list of projects that will be updated
5. Asks for confirmation before making changes
6. Updates each active project to use `bill_by: "People"`
7. Provides a summary of successful and failed updates

**How to run:**

```bash
# From the project root directory
node utils/update-all-projects-to-people-rate.js
```

**Requirements:**

- Your `.env` file must be configured with:
  - `CONTRACTOR_HARVEST_TOKEN`
  - `CONTRACTOR_HARVEST_ACCOUNT_ID`
  - `CONTRACTOR_NAME` (optional)

**Example output:**

```text
======================================================================
UPDATE ALL PROJECTS TO PERSON BILLABLE RATE
======================================================================

Account: Feral Creative
Account ID: 1234567

Fetching all projects from Feral Creative...
Found 45 total projects

Active projects: 38
Archived projects (will be skipped): 7

Active projects already using "People" rate: 12
Active projects needing update: 26

Active projects to be updated:
  1. Internal IT Support (ID: 12345) - Current: Project
  2. Brand Center Compass Page (ID: 12346) - Current: Project
  ...

⚠️  This will update all ACTIVE projects listed above to use 'People' billable rate.
⚠️  Archived projects will NOT be modified.
Press Ctrl+C to cancel, or press Enter to continue...

Updating projects...

  Updating: Internal IT Support... ✅
  Updating: Brand Center Compass Page... ✅
  ...

======================================================================
SUMMARY
======================================================================
✅ Successfully updated: 33
❌ Failed: 0
Total processed: 33

✨ Done!
```

**Safety features:**

- **Only processes active projects** - archived projects are automatically skipped
- Shows you exactly what will be changed before making any updates
- Requires manual confirmation (press Enter) to proceed
- Can be cancelled at any time with Ctrl+C
- Includes rate limiting delays to avoid API throttling
- Provides detailed error messages if any updates fail

**Note:** This script only affects your contractor account (Feral Creative). It does not modify your agency account (Cannonball).
