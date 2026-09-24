# Architecture

Read before any change that crosses a file boundary. Root rules live in [../AGENTS.md](../AGENTS.md).

## Shape of the system

A single-user tool with no persistence layer. Everything is a pass-through between two Harvest accounts: read the source, compare against the destination, write what is missing.

## Entry points

| File | Process | Reads | Writes |
| --- | --- | --- | --- |
| `server.js` | Express on 8118, also serves `public/` | Both accounts | Contractor account, via `POST /api/sync` only |
| `syncAgencyToDestination-preview.js` | One-shot CLI | Both accounts | An HTML file in the repo root |
| `syncAgencyToDestination.js` | One-shot CLI | Both accounts | Contractor account—but crashes on start, see [../AGENTS.md](../AGENTS.md) |

## The duplicated helper layer

Each entry point declares its own `config` object and its own copies of `harvestRequest`, `getUsers`, `getTimeEntries`, `getProjects`, and `getTasks`. They are near-identical but have drifted: `syncAgencyToDestination.js` names its destination account key `destination` while every call site in the file reads `config.contractor`, which is why it throws.

Treat every change to a helper as three changes until someone extracts a shared module. Nothing currently imports across these files.

## Server module map

All in `server.js`, top to bottom.

1. **Config**—reads `process.env` into `config.agency` and `config.contractor`, each carrying `accountId`, `token`, `apiUrl`, and `name`. `config.targetUsers` is the filtered `[EMPLOYEE_1_NAME, EMPLOYEE_2_NAME]` pair.
2. **Transport**—`harvestRequest(account, endpoint, method, body)`. Sets `Authorization: Bearer`, `Harvest-Account-Id`, and a fixed `User-Agent`. Throws on any non-2xx.
3. **Readers**—`getUsers`, `getTimeEntries`, `getProjects`, `getClients` page through `next_page` at 100 per page. `getTasks` does not paginate.
4. **Writers**—`getOrCreateDefaultClient`, `createProject`, `ensureTaskExists`, `assignTaskToProject`, `assignUserToProject`, `createTimeEntry`. The two `assign*` functions swallow a 422 as "already assigned" and return `null`.
5. **Routes**—see [api.md](api.md).
6. **Static and catch-all**—`express.static("public")`, then an `app.use` middleware that answers any non-`/api/` GET with `public/index.html`.

## Project and task resolution

`createProject` hardcodes `bill_by: "People"` (person billable rate), `budget_by: "none"`, `is_billable: true`. `ensureTaskExists` creates with `billable_by_default: true` and pushes the new task into the caller's `existingTasks` array so the same sync does not create it twice.

New projects need a client. `getOrCreateDefaultClient` looks for a client named `Default Client` or one matching `AGENCY_NAME`, falls back to the first client in the account, and only creates `Default Client` when the account has none.

## Duplicate detection

A source entry is a duplicate when an existing contractor entry in the same date range matches on all five of: `spent_date`, `hours`, `task.name`, project (`code` when the source has one, else `name`), and `notes` treated as `""` when absent.

Contractor entries are fetched once per user into a `Map` keyed by user id before the per-entry loop, not inside it. `POST /api/sync` keys that map by **contractor** user id; `POST /api/preview` keys it by **agency** user id. Both are internally consistent; do not copy one loop into the other without adjusting the key.

`POST /api/sync` has a second line of defence: if `createTimeEntry` throws a 422 containing `already been taken`, it counts the entry as a duplicate instead of failing the sync.

## Rate-limit protection

`POST /api/sync` holds two `Set`s for the life of one request, `taskAssignmentsCache` keyed `"<projectId>-<taskId>"` and `userAssignmentsCache` keyed `"<projectId>-<userId>"`. Assignment calls happen only on a cache miss. Without this, a 50-entry sync issued 100 assignment calls against a 100-per-15-seconds limit. Full write-up in [RATE_LIMIT_FIX_DOCUMENTATION.md](RATE_LIMIT_FIX_DOCUMENTATION.md).

## Frontend

`public/index.html` holds four sibling `.page-container` divs: `dashboardPage`, `timerPage`, `historyPage`, and `settingsPage`. `timerPage` is present but unreachable, its nav link commented out.

`setupNavigation` in `public/js/dashboard.js` maps `/`, `/timers`, `/activity`, and `/settings` to those ids, toggles `style.display`, pushes history with `history.pushState`, and re-renders on `popstate`. Unknown paths fall through to the dashboard.

State is browser-local:

| Key | Contents |
| --- | --- |
| `harvestSyncActivity` | Array of past preview and sync runs, rendered by `renderActivityList` |
| `harvestSyncSettings` | `{ timeFormat, dateFormat }` display preferences |

Billing period selection is computed client-side in `initializeDates` and `updateDateRange` into a plain `fromDate`/`toDate` pair. "Sync all time" substitutes `2000-01-01` through today. The server knows nothing about billing periods.

## Styles

| Source | Output | Built by |
| --- | --- | --- |
| `assets/styles/dashboard.scss` | `public/css/dashboard.css` | Manual `sass` invocation |
| `assets/styles/preview-report.scss` | `assets/styles/preview-report.css` | `npm run build:css` |

The preview CLI inlines the compiled `preview-report.css` into every generated report, and warns to stderr if that file is missing.
