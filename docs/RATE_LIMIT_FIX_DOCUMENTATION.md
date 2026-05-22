# Harvest API Rate Limit Fix Documentation

## Problem Summary

The application was hitting Harvest API rate limits (HTTP 429 errors) during sync operations, even with relatively small datasets. This was caused by redundant API calls being made for task and user assignments.

## Root Cause Analysis

### What Was Wrong

In the `/api/sync` endpoint (server.js), the code was making **redundant API calls for every single time entry** being synced:

```javascript
// This code ran for EVERY time entry
await assignTaskToProject(config.contractor, contractorProject.id, contractorTask.id);
await assignUserToProject(config.contractor, contractorProject.id, contractorUser.id);
```

### Why It Was Wrong

**The Problem:**
- When syncing multiple time entries that share the same project, task, and user combination, the code would attempt to assign the task to the project and the user to the project **repeatedly**
- Each assignment attempt makes a POST request to the Harvest API
- The API returns a 422 error ("already exists") for duplicate assignments, which the code catches and ignores
- However, these failed requests **still count against the rate limit**

**Example Scenario:**
Syncing 50 time entries for the same project/task/user:
- **50 task assignment API calls** (49 fail with 422, but all count toward rate limit)
- **50 user assignment API calls** (49 fail with 422, but all count toward rate limit)
- **Total: 100 wasted API calls**

With Harvest's rate limit of **100 requests per 15 seconds per account**, this would hit the limit almost immediately.

### How It Was Diagnosed

1. **Error Analysis**: The error message showed HTTP 429 (Too Many Requests) from Harvest API
2. **Code Review**: Examined the `/api/sync` endpoint to identify all API calls being made
3. **Pattern Recognition**: Noticed that `assignTaskToProject()` and `assignUserToProject()` were called inside the loop for every time entry
4. **Function Inspection**: Confirmed these functions make POST requests every time, catching 422 errors but not preventing the calls

**Key Code Locations:**
- `/api/sync` endpoint: Lines ~423-600 in server.js
- Assignment functions: Lines ~186-220 in server.js
- The problematic loop: Lines ~500-560 in server.js

## The Fix

### Solution Overview

Implement **assignment caching** during each sync operation to track which assignments have already been made, preventing redundant API calls.

### Implementation Details

**Step 1: Add cache data structures** (at the beginning of the sync endpoint)

```javascript
// Cache for assignments to avoid redundant API calls
const taskAssignmentsCache = new Set(); // "projectId-taskId"
const userAssignmentsCache = new Set(); // "projectId-userId"
```

**Step 2: Check cache before making assignment calls** (in the time entry processing loop)

```javascript
// Assign task to project (only if not already done in this sync)
const taskAssignmentKey = `${contractorProject.id}-${contractorTask.id}`;
if (!taskAssignmentsCache.has(taskAssignmentKey)) {
  await assignTaskToProject(config.contractor, contractorProject.id, contractorTask.id);
  taskAssignmentsCache.add(taskAssignmentKey);
}

// Assign user to project (only if not already done in this sync)
const userAssignmentKey = `${contractorProject.id}-${contractorUser.id}`;
if (!userAssignmentsCache.has(userAssignmentKey)) {
  await assignUserToProject(config.contractor, contractorProject.id, contractorUser.id);
  userAssignmentsCache.add(userAssignmentKey);
}
```

### Impact

**Before Fix:**
- 50 time entries = ~100+ redundant API calls
- Easily hits rate limit with moderate datasets

**After Fix:**
- 50 time entries = ~2-10 API calls (only unique project/task/user combinations)
- Dramatically reduced API usage
- Rate limit issues eliminated for normal use cases

## How to Apply This Fix to Another Project

### Step 1: Locate the Sync Endpoint

Find the endpoint that performs the sync operation. Look for:
- Route definition like `app.post("/api/sync", ...)` or similar
- Functions that create time entries in the destination account
- Loops that process multiple time entries

### Step 2: Identify Assignment Calls

Within the sync endpoint, look for calls to functions that assign:
- Tasks to projects
- Users to projects
- Any other resource assignments

Common patterns:
```javascript
await assignTaskToProject(...)
await assignUserToProject(...)
await harvestRequest(account, `/projects/${projectId}/task_assignments`, "POST", ...)
await harvestRequest(account, `/projects/${projectId}/user_assignments`, "POST", ...)
```

### Step 3: Check if Calls Are in a Loop

Verify if these assignment calls are inside a loop that processes multiple time entries. If yes, this is the problem.

### Step 4: Implement Caching

1. **Add cache variables** at the start of the sync function (before any loops):
   ```javascript
   const taskAssignmentsCache = new Set();
   const userAssignmentsCache = new Set();
   ```

2. **Wrap assignment calls** with cache checks:
   ```javascript
   // For task assignments
   const taskKey = `${projectId}-${taskId}`;
   if (!taskAssignmentsCache.has(taskKey)) {
     await assignTaskToProject(...);
     taskAssignmentsCache.add(taskKey);
   }
   
   // For user assignments
   const userKey = `${projectId}-${userId}`;
   if (!userAssignmentsCache.has(userKey)) {
     await assignUserToProject(...);
     userAssignmentsCache.add(userKey);
   }
   ```

### Step 5: Test

1. Run a sync operation with multiple time entries
2. Monitor API call count (check server logs)
3. Verify no rate limit errors occur
4. Confirm all time entries are synced correctly

## Verification Checklist

Use this checklist to verify the fix has been applied correctly:

- [ ] Located the sync endpoint in the codebase
- [ ] Identified all assignment API calls within the sync logic
- [ ] Confirmed assignment calls are inside a time entry processing loop
- [ ] Added cache Set() variables at the function start
- [ ] Wrapped task assignment calls with cache checks
- [ ] Wrapped user assignment calls with cache checks
- [ ] Tested sync operation with multiple entries
- [ ] Verified reduced API call count in logs
- [ ] Confirmed no 429 rate limit errors
- [ ] Validated all time entries sync correctly

## Additional Notes

- The cache is scoped to each sync operation (function-local variables), so it resets between syncs
- This is intentional - we want to verify assignments at the start of each sync
- The first assignment attempt may still return 422 if it already exists from a previous sync, which is fine
- The key benefit is eliminating redundant calls **within the same sync operation**

## Related Files

In the original harvest-sync project:
- `server.js` - Main server file containing the sync endpoint
- Lines ~451-465 - Cache variable declarations
- Lines ~530-545 - Cache check implementation

## Questions to Ask

When inspecting another project for this issue:

1. Does the sync endpoint make assignment API calls?
2. Are these calls inside a loop that processes multiple time entries?
3. Is there any caching mechanism to prevent redundant calls?
4. How many API calls are made when syncing N entries with the same project/task/user?

If the answer to #3 is "no" and #4 is "2N or more", the issue exists and needs this fix.

