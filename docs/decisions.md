# Decisions

Why the code is shaped the way it is. Read before "fixing" anything listed here. Root rules: [../AGENTS.md](../AGENTS.md).

## No database

**Chosen:** browser `localStorage` for activity history and display preferences.

One person uses this tool, on one machine, and the only state worth keeping is a list of past runs and two display toggles. Harvest itself is the system of record for everything that matters. A database would add a service to install, back up, and deploy on a NAS, in exchange for nothing.

**Consequence:** history does not follow the user to another browser, and the server cannot report on past syncs. Accepted.

## No frontend framework, no bundler, no TypeScript

**Chosen:** vanilla ES6+ in global-scope `<script>` tags, CommonJS on the server.

Four pages and roughly two thousand lines. A framework would mean a build step between editing a file and seeing the result, and a toolchain to maintain on a Synology NAS.

**Consequence:** no type safety, and `public/js/dashboard.js` is one flat namespace—which is how it once ended up with `formatHours` declared twice. Accepted; adding TypeScript is not a standing invitation.

## Duplicate detection by field comparison, not by an idempotency key

**Chosen:** compare `spent_date`, `hours`, task name, project, and notes against the destination entries already in range.

Harvest has no unique constraint on time entries and no way to stamp a synced entry with its source id. Comparison is the only mechanism available that works on entries created before this tool existed.

**Consequence:** editing the notes on a synced entry in the contractor account makes it look new, and it re-syncs. Two genuinely identical entries on the same day collapse into one. Both are preferable to silently duplicating a month of time.

**Rejected:** writing the source entry id into the notes field. It pollutes invoices, which are the whole reason the contractor account exists.

## Assignment caching instead of rate-limit backoff

**Chosen:** two per-request `Set`s that skip repeat task and user assignment calls within one sync.

The 429s were not a traffic problem, they were a waste problem: 50 entries sharing one project issued 100 assignment calls, 98 of which returned 422 and still counted against the limit. Removing the waste removed the failure for realistic ranges. Backoff would have hidden the waste and made syncs slower.

**Consequence:** there is still no retry, so a genuinely large range can hit the limit. Full analysis in [RATE_LIMIT_FIX_DOCUMENTATION.md](RATE_LIMIT_FIX_DOCUMENTATION.md).

## Preview as a separate script, not a flag

**Chosen:** `syncAgencyToDestination-preview.js` is its own file, and `POST /api/preview` its own route.

A `--dry-run` flag on a destructive script is one typo away from a real sync. A file that contains no write calls cannot write, whatever arguments it is given.

**Consequence:** the read and compare logic exists twice, and the two copies have drifted. The safety is worth the duplication; the drift is not, and is a known debt.

## Projects created with `bill_by: "People"`

Person billable rate, rather than the project rate. Contractor invoicing is per person, so a project-level rate would produce wrong invoice totals for any project with more than one person on it.

## Match projects by code first, name second

Project names differ between the two accounts more often than codes do, because each account renames for its own reporting. The code is the stable identifier when it exists. Falling back to name keeps projects that were never given a code working.

## Timer feature disabled rather than deleted

The timer never reliably reflected state across two accounts—starting a timer in one account did nothing in the other, and the UI implied otherwise. Rather than ship something misleading, the nav link and the server routes were commented out and the client code left in place, so the work is recoverable.

**Consequence:** dead code in three files. Re-enabling means uncommenting all three and solving the cross-account problem first.
