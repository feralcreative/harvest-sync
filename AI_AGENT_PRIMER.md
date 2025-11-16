# AI AGENT PRIMER - Harvest Sync Tool

**Project:** Harvest Time Entry Sync Between Accounts
**Version:** v2.1.0
**Repository:** <https://github.com/feralcreative/harvest-sync>
**Last Updated:** 2025-11-16

---

## Project Overview

This project automates the synchronization of time entries from one Harvest account (source agency) to another Harvest account (contractor company) for specified employees.

## Business Context

- **Source Agency**: The agency where contractors work
- **Contractor Company**: The contractor's company that needs time tracking for invoicing
- **Problem**: Contractors need to track time in both their employer's and their own company's Harvest accounts
- **Solution**: Automated sync script that copies time entries from source to destination

## Key Features

1. **Web Dashboard** - Modern multi-page web interface with navigation (Dashboard, History, Settings)
2. **Preview Mode with Duplicate Detection** - Shows exactly what will be synced, including which entries already exist
3. **Billing Period Selection** - Choose from Full Month, First Half (1st-15th), or Second Half (16th-end)
4. **Time Format Display** - Hours shown in hh:mm format (e.g., 1:08 instead of 1.14)
5. **Hours by Worker** - Summary cards showing total hours per employee for selected period
6. **Automatic Project/Task Creation** - Creates missing projects and tasks in contractor account
7. **Real-time Duplicate Detection** - Preview checks existing entries before sync to show accurate status
8. **Configurable Employees** - Sync time for any number of employees via environment variables
9. **Activity History** - Track and review past previews and syncs with clickable history items
10. **Settings Page** - Configure API credentials, target users, and display preferences

## Architecture

### Main Components

1. **server.js** - Express web server providing REST API and serving the dashboard
2. **public/index.html** - Multi-page web dashboard interface (Dashboard, History, Settings)
3. **public/js/dashboard.js** - Client-side JavaScript for interactive functionality and page navigation
4. **public/css/dashboard.css** - Harvest-inspired styling compiled from SCSS
5. **public/images/** - Logo and icon assets (logo-harvest-sync.svg, icon-harvest.svg)
6. **assets/styles/** - SCSS source files for styling
7. **syncAgencyToDestination.js** - Main sync script that writes data (CLI)
8. **syncAgencyToDestination-preview.js** - Preview mode that generates HTML reports (CLI)
9. **testConnection.js** - Validates Harvest API credentials
10. **.env** - Configuration file (NOT in git) containing credentials and names

### Web Server Architecture

The web server (server.js) provides:

- **Static File Serving**: Serves the dashboard HTML, CSS, and JavaScript
- **REST API Endpoints**:
  - `GET /api/status` - Check connection status for both Harvest accounts
  - `POST /api/preview` - Generate preview of what will be synced
  - `POST /api/sync` - Execute the actual sync operation
- **Auto-Browser Launch**: Automatically opens browser on startup
- **Port 8118**: Dedicated port for the web interface

### Environment Variables

All sensitive information is stored in `.env` file:

```bash
AGENCY_HARVEST_TOKEN=<token>
AGENCY_HARVEST_ACCOUNT_ID=<id>
CONTRACTOR_HARVEST_TOKEN=<token>
CONTRACTOR_HARVEST_ACCOUNT_ID=<id>
AGENCY_NAME=<name>
CONTRACTOR_NAME=<name>
EMPLOYEE_1_NAME=<full name>
EMPLOYEE_2_NAME=<full name>
```

### Data Flow

#### Preview Mode

1. Fetch users from both Harvest accounts
2. Identify target employees by name matching
3. Fetch time entries from source agency for date range
4. Fetch existing time entries from contractor account for same date range (for duplicate detection)
5. For each agency time entry:
   - Check if project exists in destination (match by code if available, otherwise by name)
   - Check if task exists in destination
   - Compare against contractor entries to detect duplicates (by date, hours, task, project, notes)
   - Mark as "Pending" (will sync) or "Duplicate" (already exists)
6. Return summary with accurate status for each entry

#### Sync Mode

1. Fetch users from both Harvest accounts
2. Identify target employees by name matching
3. Fetch time entries from source agency for date range
4. For each time entry:
   - Find or create project in destination
   - Find or create task in destination
   - Assign task to project
   - Assign user to project
   - Attempt to create time entry in destination
   - If 422 error with "already been taken", mark as "Duplicate" and skip
   - Otherwise mark as "Created"
5. Return summary with final status for each entry

## Security & Privacy

### What's Public (Safe for GitHub)

- All code files (genericized)
- `.env.example` with placeholder values
- Documentation with generic examples
- Package.json and dependencies

### What's Private (In .env, NOT in git)

- Harvest API tokens
- Harvest account IDs
- Company names
- Employee names

### .gitignore Configuration

```text
node_modules
.env
sync-preview-*.html
```

## Usage

### First Time Setup

1. Clone repository
2. Run `npm install`
3. Copy `.env.example` to `.env`
4. Fill in actual credentials and names in `.env`
5. Run `npm test` to verify connections

### Using the Web Dashboard

**Start the server:**

```bash
npm start
```

This will:

- Start the Express server on port 8118
- Automatically open your browser to the dashboard
- Display connection status for both Harvest accounts

**Dashboard Features:**

- **Multi-Page Navigation**: Dashboard, History, and Settings pages
- **Connection Status Cards**: Shows whether both Harvest accounts are connected
- **Billing Period Selection**: Choose Year, Month, and Half (Full Month, First Half 1st-15th, Second Half 16th-end)
- **Sync All Time Option**: Checkbox to sync all entries from 2000-01-01 to today (ignores date range)
- **Preview with Duplicate Detection**: Shows accurate status (Pending vs Duplicate) before syncing
- **Hours by Worker**: Summary cards showing total hours per employee for selected period
- **Line Items Table**: Detailed view of all entries with project codes, task names, hours (hh:mm), and status badges
- **Status Badges**: Visual indicators for Pending (will sync), Duplicate (already exists), Created (synced), New Project, New Task
- **Activity History Page**: Clickable history items to review past operations
- **Settings Page**: Configure API credentials, target users, and display preferences

**Workflow:**

1. Start the server with `npm start`
2. Check that both accounts show as connected
3. Select a billing period (Year, Month, Half) or check "Sync all time"
4. Click "Preview Sync" to see what will be synced (with duplicate detection)
5. Review the results:
   - Summary totals (entries, hours, projects)
   - Hours by worker
   - Line items table with status badges
6. Click "Run Sync" to execute the sync
7. Confirm the operation
8. View the results (Created vs Duplicate entries)
9. Check History page to review past operations

### Preview Before Syncing (CLI)

```bash
npm run preview
# or with date range
node syncAgencyToDestination-preview.js 2025-01-01 2025-01-31
```

### Actual Sync

```bash
npm run sync
# or with date range
node syncAgencyToDestination.js 2025-01-01 2025-01-31
```

## API Integration

### Harvest API v2

- **Base URL**: `https://api.harvestapp.com/v2`
- **Authentication**: Bearer token + Account ID header
- **Rate Limit**: 100 requests per 15 seconds
- **User-Agent**: `Harvest-Sync-Tool (contact@example.com)`

### Key Endpoints Used

- `GET /users` - List all users
- `GET /time_entries` - List time entries (with filters)
- `GET /projects` - List all projects
- `GET /tasks` - List all tasks
- `POST /projects` - Create project
- `POST /tasks` - Create task
- `POST /projects/{id}/task_assignments` - Assign task to project
- `POST /projects/{id}/user_assignments` - Assign user to project
- `POST /time_entries` - Create time entry

## Development Notes

### Adding More Employees

To sync more than 2 employees, add more environment variables:

```bash
EMPLOYEE_3_NAME=Third Employee
EMPLOYEE_4_NAME=Fourth Employee
```

Then update the config in both scripts:

```javascript
targetUsers: [
  process.env.EMPLOYEE_1_NAME,
  process.env.EMPLOYEE_2_NAME,
  process.env.EMPLOYEE_3_NAME,
  process.env.EMPLOYEE_4_NAME
].filter(Boolean)
```

### Customizing Project Creation

Projects are created with these defaults:

- `is_active: true`
- `bill_by: 'Project'`
- `budget_by: 'none'`

Modify `createContractorProject()` function to change defaults.

### Customizing Task Creation

Tasks are created with these defaults:

- `is_active: true`
- `billable_by_default: true`

Modify `ensureTaskExists()` function to change defaults.

## Troubleshooting

### Common Issues

1. **"User not found"** - Employee names must match exactly in both accounts
2. **401 Unauthorized** - Check API tokens are correct and not expired
3. **403 Forbidden** - Account needs admin/manager permissions
4. **422 Unprocessable** - Usually means duplicate entry (automatically skipped)

### Debug Mode

Add console.log statements to see detailed API responses:

```javascript
const data = await harvestRequest(...);
console.log('API Response:', JSON.stringify(data, null, 2));
```

## Archive

The `_archive/` folder contains the previous Google Sheets integration for reference.

## Future Enhancements

Potential improvements:

- Support for more than 2 employees without code changes
- Configurable project/task defaults via .env
- Dry-run mode (like preview but in CLI)
- Sync in reverse (destination → agency)
- Incremental sync (only new entries since last run)
- Webhook integration for real-time sync
- Support for other time tracking systems

## License

MIT License - See LICENSE file for details

## Contact

For issues or questions, please open an issue on GitHub.
