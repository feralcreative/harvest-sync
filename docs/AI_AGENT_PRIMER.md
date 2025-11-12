# AI AGENT PRIMER - Harvest Sync Tool

**Project:** Harvest Time Entry Sync Between Accounts  
**Version:** v2.0.0  
**Repository:** <https://github.com/feralcreative/harvest-sync>  
**Last Updated:** 2025-11-11

---

## Project Overview

This project automates the synchronization of time entries from one Harvest account (source agency) to another Harvest account (contractor company) for specified employees.

## Business Context

- **Source Agency**: The agency where contractors work
- **Contractor Company**: The contractor's company that needs time tracking for invoicing
- **Problem**: Contractors need to track time in both their employer's and their own company's Harvest accounts
- **Solution**: Automated sync script that copies time entries from source to destination

## Key Features

1. **Preview Mode** - Generate HTML reports showing what will be synced before making changes
2. **Automatic Project/Task Creation** - Creates missing projects and tasks in contractor account
3. **Duplicate Detection** - Skips entries that already exist
4. **Configurable Employees** - Sync time for any number of employees via environment variables
5. **Date Range Support** - Sync specific periods or default to last 7 days

## Architecture

### Main Components

1. **syncAgencyToDestination.js** - Main sync script that writes data
2. **syncAgencyToDestination-preview.js** - Preview mode that generates HTML reports
3. **testConnection.js** - Validates Harvest API credentials
4. **.env** - Configuration file (NOT in git) containing credentials and names

### Environment Variables

All sensitive information is stored in `.env` file:

```
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

1. Fetch users from both Harvest accounts
2. Identify target employees by name matching
3. Fetch time entries from source agency for date range
4. For each time entry:
   - Find or create project in destination
   - Find or create task in destination
   - Assign task to project
   - Assign user to project
   - Create time entry in destination
5. Skip duplicates automatically

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

```
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

### Preview Before Syncing

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

```
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
