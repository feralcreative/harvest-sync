# Debugging

Read when something is broken. Root rules: [../AGENTS.md](../AGENTS.md).

## Health checks, in order

```bash
npm test
curl -s http://localhost:8118/api/status
curl -s http://localhost:8118/api/sync/users
```

`npm test` isolates credentials from everything else—it hits `/users/me` on each account directly and touches none of the sync code. If it passes and `/api/status` fails, the problem is the server, not Harvest.

## Logs

- **Development:** stdout and stderr from `npm start`, plus the browser console. Every sync logs per-user entry counts and each skipped duplicate.
- **Production:** `pm2 logs harvest-sync`, with files under `~/.pm2/logs/harvest-sync-out.log` and `-error.log` on the host.
- There is no logging library and no log file in development. `console.log` is the mechanism.

## Failure modes

### `Harvest API error (401)`

Token is wrong, revoked, or paired with the wrong account id—the id and token must come from the same Harvest page. Fix `.env`, then restart the server; `dotenv` reads the file once at boot.

### `Harvest API error (403)`

The token's user lacks permission to create projects, tasks, or time entries. Needs Administrator or Manager on the contractor account.

### `Harvest API error (422)` during a sync

Normal. It means the entry already exists; `POST /api/sync` catches `already been taken` and counts it as a duplicate. A 422 that is *not* that message is a real validation failure and aborts the run.

### `Harvest API error (429)`

Rate limit, 100 requests per 15 seconds per account. There is no retry. Wait, then re-run over a narrower range—already-written entries are skipped. If this happens on a small range, check that the assignment caches in `POST /api/sync` are still guarding the `assign*` calls.

### A user's entries are silently missing

`GET /api/sync/users` reports `found: false` for that account. The name in `.env` must equal `first_name` + space + `last_name` exactly as Harvest stores it, case included.

### `No target users found in agency account` (400)

Neither the posted `userIds` nor `EMPLOYEE_1_NAME` / `EMPLOYEE_2_NAME` matched anyone in the agency account.

### `TypeError: Cannot read properties of undefined (reading 'accountId')`

You ran `syncAgencyToDestination.js` or `npm run sync`. Known break—the config key is `destination`, the call sites read `config.contractor`. Nothing was written.

### Server will not start

Port 8118 is occupied, and the occupant is almost certainly a previous run of this app.

```bash
lsof -i :8118
```

Kill it and restart on 8118. Do not switch ports; the port is hardcoded in `server.js`.

### A browser tab opens on every restart

`server.js` runs `open <url>` unless `NODE_ENV=production`. Start it as `NODE_ENV=production node server.js` when scripting.

### Style changes do not appear

You edited the compiled CSS, or edited the SCSS and did not recompile. `assets/styles/dashboard.scss` has no npm script—compile it with `sass assets/styles/dashboard.scss public/css/dashboard.css`. Then hard-reload; the stylesheet is served by `express.static` with default caching.

### Preview report is unstyled

The compiled `assets/styles/preview-report.css` is missing. The CLI warns on stderr and falls back. Run `npm run build:css`.

## Inspecting a sync without running one

Run the preview CLI over the range in question and open the generated `sync-preview-<ISO>.html`. It lists every entry with its project, task, hours, and whether the project or task would be created. Delete the file afterward.

## Clearing client state

Activity history and display settings live in `localStorage` under `harvestSyncActivity` and `harvestSyncSettings`. Clearing them affects only the browser; nothing in Harvest changes.
