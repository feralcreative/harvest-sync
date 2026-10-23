# AGENTS.md

Operating manual for Harvest Sync: a Node/Express tool that copies time entries from one Harvest account (agency, source) into another (contractor, destination). No database, no build step, no test suite.

When a change makes anything in this file inaccurate—a command, a path, a convention, a prohibition—update this file in the same change.

## Commands

| Task | Command |
| --- | --- |
| Install | `npm install` |
| Dev server + dashboard | `npm start` |
| Dev server, no browser popup | `NODE_ENV=production node server.js` |
| Verify both Harvest accounts | `npm test` |
| Preview a sync (read-only, writes an HTML report) | `node syncAgencyToDestination-preview.js 2026-09-01 2026-09-15` |
| Preview last 7 days | `npm run preview` |
| Health check while running | `curl -s http://localhost:8118/api/status` |
| Build preview-report CSS | `npm run build:css` |
| Watch preview-report CSS | `npm run watch:css` |
| Build dashboard CSS | `sass assets/styles/dashboard.scss public/css/dashboard.css` |

Server listens on **8118**, hardcoded in `server.js`. No lint, formatter, typecheck, or unit-test command exists in this repo; do not invent one unless asked.

`npm run sync` and `npm run sync:month` are listed in `package.json` but crash on start. See [Gotchas](#gotchas).

## Definition of done

Run these in order before reporting work complete.

1. `npm test`—both accounts must report a successful connection.
2. If you touched any `.scss`, recompile it and commit the generated `.css` and `.css.map` alongside the source.
3. `NODE_ENV=production node server.js`, then `curl -s http://localhost:8118/api/status`—both `connected` fields must be `true`. Stop the server afterward.
4. If you touched sync, preview, or duplicate-detection logic, run the preview CLI over a real date range and read the generated report. Delete the report file when done.
5. Load `http://localhost:8118` in a browser and exercise the page you changed if the change was frontend.

Not required, and not to be attempted: there is no unit, integration, or e2e suite. Never verify a sync change by running an actual sync.

## Prohibitions

- **Never run a real sync to test.** `node syncAgencyToDestination.js`, `npm run sync`, `npm run sync:month`, and `POST /api/sync` all write live time entries into a real Harvest account. This tool has no undo. Use the preview path.
- **Never run `utils/delete-feral-entries.js`.** It permanently deletes contractor time entries from a hardcoded start date through today.
- **Never hand-edit generated CSS**: `public/css/dashboard.css`, `assets/styles/preview-report.css`, and either generated `.css.map`. Edit the matching `.scss` in `assets/styles/` and recompile.
- **Never hand-edit `package-lock.json`.**
- **Never read `.env` or `.vscode/sftp.json` into a commit, a log line, a console dump, or a chat response.** Names of variables are fine; values are not.
- **Never commit anything matching `.gitignore`.** Note that `**/_*` silently ignores every path starting with an underscore, including `_PLANS/` and `_archive/`.
- **Deploying to the NAS requires explicit human approval**, every time.
- **Adding a dependency requires approval.** There are five, deliberately.
- Do not introduce a bundler, a framework, or TypeScript. See [docs/decisions.md](docs/decisions.md).

## Architecture

Three independent entry points, each carrying **its own private copy** of the config object, `harvestRequest`, and the fetch helpers. There is no shared module. A fix applied to one is not applied to the others.

| Entry point | Role | Writes to Harvest |
| --- | --- | --- |
| `server.js` | Express API + static host for the dashboard. The supported path. | Yes, via `POST /api/sync` |
| `syncAgencyToDestination-preview.js` | CLI, emits `sync-preview-<ISO>.html` | No |
| `syncAgencyToDestination.js` | CLI writer | Currently crashes on start |

Sync call chain, `POST /api/sync` in `server.js`:

1. `handleSync` in `public/js/dashboard.js` resolves the date range, calls `getSelectedSyncUsers` (which hits `GET /api/sync/users`), and POSTs `{ fromDate, toDate, userIds }`.
2. `getUsers`, `getProjects`, and `getTasks` load both accounts; `getOrCreateDefaultClient` resolves the client that new projects will hang from.
3. Contractor entries for the range are fetched once per user into `contractorEntriesByUser`, for duplicate detection.
4. Per agency time entry: match or `createProject` → `ensureTaskExists` → `assignTaskToProject` → `assignUserToProject` (both guarded by the per-sync assignment caches) → duplicate check → `createTimeEntry`.
5. Response is `{ summary, lineItems }`; `displayResults` renders it.

`POST /api/preview` follows the same chain through step 3 and the duplicate check, then returns. It creates nothing.

Dependency direction is one-way: the browser talks to the HTTP API, and nothing else. There is no server-side persistence—no database, no session, no file store. All client state lives in browser `localStorage` under `harvestSyncActivity` and `harvestSyncSettings`.

The frontend is one `public/index.html` holding four `.page-container` divs, shown and hidden by `setupNavigation` in `public/js/dashboard.js` against `window.location.pathname`. Express serves `index.html` for every non-`/api/` GET.

Deeper: [docs/architecture.md](docs/architecture.md).

## Conventions

- CommonJS `require` on the server. Browser JS is plain global-scope scripts—no modules, no bundler, no imports.
- No formatter is configured. Match the file you are in: 2-space indent, double quotes, semicolons, ~120 column soft limit.
- Account selection is always the literal string `"agency"` or `"contractor"`, both in route params and in the `config` object keys.
- Users are matched across the two accounts by exact `` `${first_name} ${last_name}` `` string equality. Case-sensitive, whitespace-sensitive.
- Projects are matched by `code` when the source project has one, by `name` otherwise. Preserve that fallback in both directions.
- `harvestRequest` throws `Error("Harvest API error (<status>): <body>")`. Callers branch on `error.message.includes("422")`. Keep that message shape or the duplicate and already-assigned paths break.
- Routes catch and answer `res.status(500).json({ error: error.message })`.
- Hours move through the system as decimal floats. Convert to `h:mm` only at render time, via `formatHours` / `formatHoursWithDecimal`.
- SCSS sources live in `assets/styles/`. Compiled CSS is committed.
- Logging is `console.log` / `console.error` with the operation and its counts. No logger library.

## Gotchas

- **`syncAgencyToDestination.js` does not run.** Its `config` object defines the key `destination`, but every reference in the file reads `config.contractor`. `main()` throws `TypeError: Cannot read properties of undefined (reading 'accountId')` before any network call. Renaming the key to `contractor` is the fix; nothing else in the file needs it.
- **Helpers are triplicated.** `harvestRequest`, `getUsers`, `getTimeEntries`, and the config block exist separately in `server.js`, `syncAgencyToDestination.js`, and `syncAgencyToDestination-preview.js`. Changing one changes one.
- **localStorage keys are camelCase**: `harvestSyncActivity` and `harvestSyncSettings`. Hyphenated names in older notes refer to keys that do not exist.
- **The timer feature is disabled in three places**: the nav link is commented out in `public/index.html`, every `/api/timer/*` route is commented out in `server.js`, and the timer functions are still live in `public/js/dashboard.js`. Re-enabling needs all three.
- **Do not lift the assignment calls out of their cache guards.** `taskAssignmentsCache` and `userAssignmentsCache` in `POST /api/sync` exist because calling `assignTaskToProject` and `assignUserToProject` per entry burned two API calls each and tripped Harvest's 100-requests-per-15-seconds limit. See [docs/RATE_LIMIT_FIX_DOCUMENTATION.md](docs/RATE_LIMIT_FIX_DOCUMENTATION.md).
- **There is no 429 backoff anywhere.** A large range can still fail partway, leaving a partial sync. Re-running is safe because duplicates are skipped; surface that to the user rather than adding a silent auto-retry.
- **Duplicate detection requires all five of** `spent_date`, `hours`, task name, project (code or name), and notes to match. Editing the notes on a synced entry in the contractor account makes it re-sync as a new entry.
- **`preview:month` and `sync:month` use `date -v-1m`**, which is BSD `date`. Both fail on Linux, including inside `Dockerfile.dev`.
- **`sass` is not a dependency.** `npm run build:css` resolves a globally installed binary. `npx sass` tries to download it.
- **No npm script builds the dashboard stylesheet.** `assets/styles/dashboard.scss` compiles to `public/css/dashboard.css` by hand; see [Commands](#commands).
- **`npm start` shells out to `open <url>`** unless `NODE_ENV=production`. Start the server any other way when scripting, or it spawns a browser tab every run.
- **Express 5 rejects `app.get("*")`.** The SPA catch-all is a plain `app.use` middleware that filters on `req.path.startsWith("/api/")`. Keep it a middleware.
- **Port 8118 has no env override.** If the port is busy, the process holding it is this app. Kill it and restart on 8118; never fall back to another port.
- **The preview CLI drops `sync-preview-<ISO>.html` in the repo root.** Gitignored, but clean it up.
- **Zero-hour entries are filtered out** before sync and preview, which is how running timers are excluded. Negative entries are kept: Harvest writes them when a forgotten timer is corrected, and dropping them overstates the contractor invoice. Keep the filter at `entry.hours !== 0`, never `> 0`.
- **`getOrCreateDefaultClient` falls back to the first client in the account** when it finds no client named `Default Client` or matching `AGENCY_NAME`. Every auto-created project inherits that choice.
- **`assets/styles/dashboard-temp.css` is referenced by nothing.** Do not edit it expecting an effect.

## Credentials

No secret values belong in this file, in `docs/`, or in any commit. `.env.example` is the canonical list of required keys.

| Variable | Source | Notes |
| --- | --- | --- |
| `AGENCY_HARVEST_TOKEN` | `.env` | Harvest personal access token, source account |
| `AGENCY_HARVEST_ACCOUNT_ID` | `.env` | Issued on the same Harvest page as the token |
| `CONTRACTOR_HARVEST_TOKEN` | `.env` | Personal access token, destination account |
| `CONTRACTOR_HARVEST_ACCOUNT_ID` | `.env` | |
| `AGENCY_NAME`, `CONTRACTOR_NAME` | `.env` | Display only |
| `AGENCY_BRAND_COLOR`, `CONTRACTOR_BRAND_COLOR` | `.env` | Hex; `server.js` supplies defaults |
| `EMPLOYEE_1_NAME`, `EMPLOYEE_2_NAME` | `.env` | Must match the Harvest display name exactly, in both accounts |
| `TIMER_USER` | `.env` | Read only by the disabled timer code |
| SFTP host, port, user, remote path | `.vscode/sftp.json` (gitignored) | Key-based auth through the SSH agent; no password is stored |

To obtain a Harvest token: profile menu → Developers → Create New Personal Access Token. The token and the account ID are shown together, once.

`.gitignore` must keep covering `.env`, `.vscode`, `sync-preview-*.html`, `logs`, and `*.log`. Nothing matching those may be read into a commit, a log, or a chat response.

## Commit and PR conventions

- Conventional Commits: `type(scope): subject`, imperative mood. `feat`, `fix`, `chore`, `refactor`, `docs`, `style`.
- The agent commits on the user's behalf in logical blocks. Never push, deploy, or open a PR without being asked.
- Never add AI attribution: no `Co-Authored-By` trailer, no generated-with footer, in commit messages or PR bodies.
- Work lands on `main`. Use a branch plus a PR for anything larger than a single fix.
- Before committing, run `git status --short` and confirm nothing ignored slipped in.

## Deep-dive index

- [docs/architecture.md](docs/architecture.md)—entry points, duplicated helpers, data flow, frontend structure. Read before any cross-cutting change.
- [docs/api.md](docs/api.md)—every live and disabled endpoint with request and response shapes. Read before touching a route or a `fetch` call.
- [docs/deployment.md](docs/deployment.md)—NAS release process, PM2, rollback. Read before any deploy conversation.
- [docs/decisions.md](docs/decisions.md)—why no database, no framework, no TypeScript, and why duplicate detection compares fields. Read before "improving" any of those.
- [docs/debugging.md](docs/debugging.md)—log locations, known failure modes, health checks. Read when something is broken.
- [docs/RATE_LIMIT_FIX_DOCUMENTATION.md](docs/RATE_LIMIT_FIX_DOCUMENTATION.md)—the 429 root cause and the assignment-cache fix, in full.
- [docs/harvest-api-v2.md](docs/harvest-api-v2.md)—vendored Harvest API v2 reference. Large; grep it rather than reading it.
