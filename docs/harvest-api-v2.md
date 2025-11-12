### Harvest API V2 GET Request Example

Source: <https://help.getharvest.com/api-v2/introduction/overview/general>

Demonstrates how to make a GET request to the Harvest API V2, including necessary headers for authentication and account identification. Parameters are appended to the URL.

```APIDOC
curl https://api.harvestapp.com/v2/tasks?page=2&per_page=10 \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"
```

--------------------------------

### Create Project Request Example

Source: <https://help.getharvest.com/api-v2/projects-api/projects/projects>

Example cURL command to create a new project via the Harvest API v2. Demonstrates setting headers, the HTTP method, and the JSON payload.

```bash
curl "https://api.harvestapp.com/v2/projects" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"client_id":5735776,"name":"Your New Project","is_billable":true,"bill_by":"Project","hourly_rate":100.0,"budget_by":"project","budget":10000}'
```

--------------------------------

### Harvest API v2 Contact Response Examples

Source: <https://help.getharvest.com/api-v2/clients-api/clients/contacts>

Provides example responses for Harvest API v2 contact data, showcasing both XML and JSON formats. These examples illustrate the structure and fields returned when retrieving contact information.

```xml
<contacts type="array">
    <contact>
        <id type="integer">4706510</id>
        <client-id type="integer">5735776</client-id>
        <title>Owner</title>
        <first-name>George</first-name>
        <last-name>Frank</last-name>
        <email>georgefrank@example.com</email>
        <phone-office></phone-office>
        <phone-mobile></phone-mobile>
        <fax></fax>
        <created-at type="dateTime">2019-06-26T21:44:57Z</created-at>
        <updated-at type="dateTime">2019-06-26T21:44:57Z</updated-at>
    </contact>
</contacts>
```

```json
{"id":4706510,"title":"Owner","first_name":"George","last_name":"Frank","email":"georgefrank@example.com","phone_office":"","phone_mobile":"","fax":"","created_at":"2019-06-26T21:44:57Z","updated_at":"2019-06-26T21:44:57Z","client":{"id":5735776,"name":"123 Industries"}}
```

--------------------------------

### Example Response - Update Invoice

Source: <https://help.getharvest.com/api-v2/invoices-api/invoices/invoices>

Example JSON response after successfully updating an invoice.

```json
{"id":13150453,"client_key":"8b86437630b6c260c1bfa289f0154960f83b606d","number":"1002","purchase_order":"2345","amount":5000.0,"due_amount":5000.0,"tax":null,"tax_amount":0.0,"tax2":null,"tax2_amount":0.0,"discount":null,"discount_amount":0.0,"subject":"ABC Project Quote","notes":null,"state":"draft","period_start":null,"period_end":null,"issue_date":"2017-06-27","due_date":"2017-07-27","payment_term":"custom","sent_at":null,"paid_at":null,"paid_date":null,"closed_at":null,"recurring_invoice_id":null,"created_at":"2017-06-27T16:34:24Z","updated_at":"2017-06-27T16:36:33Z","currency":"USD","payment_options":["credit_card"],"client":{"id":5735774,"name":"ABC Corp"},"estimate":null,"retainer":null,"creator":{"id":1782884,"name":"Bob Powell"},"line_items":[{"id":53341928,"kind":"Service","description":"ABC Project","quantity":1.0,"unit_price":5000.0,"amount":5000.0,"taxed":false,"taxed2":false,"project":null}]}
```

--------------------------------

### Harvest API V2 Code Samples

Source: <https://help.getharvest.com/api-v2/introduction/overview/code-samples>

Examples of using the Harvest API V2 in various popular programming languages.

```Java
// Java code sample for Harvest API V2
// (Specific code not provided in source text)
```

```C#
// C# code sample for Harvest API V2
// (Specific code not provided in source text)
```

```Go
// Go code sample for Harvest API V2
// (Specific code not provided in source text)
```

```JavaScript
// JavaScript code sample for Harvest API V2
// (Specific code not provided in source text)
```

```PHP
// PHP code sample for Harvest API V2
// (Specific code not provided in source text)
```

```PowerShell
# PowerShell code sample for Harvest API V2
# (Specific code not provided in source text)
```

```Python
# Python code sample for Harvest API V2
# (Specific code not provided in source text)
```

```Ruby
# Ruby code sample for Harvest API V2
# (Specific code not provided in source text)
```

```Visual Basic
' Visual Basic code sample for Harvest API V2
' (Specific code not provided in source text)
```

```Google Apps Script
// Google Apps Script code sample for Harvest API V2
// (Specific code not provided in source text)
```

--------------------------------

### Harvest API v2 Client Response Example

Source: <https://help.getharvest.com/api-v2/introduction/overview/pagination>

This snippet shows an example JSON response when retrieving a list of clients from the Harvest API v2. It includes pagination information and links to navigate through the results.

```APIDOC
GET /clients

Response:
{
  "clients": [
    "{1 client object}"
  ],
  "page": 1,
  "total_pages": 257,
  "total_entries": 257,
  "next_page": 2,
  "previous_page": null,
  "links": {
    "first": "https://api.harvestapp.com/v2/clients?page=1&per_page=1&ref=first",
    "next": "https://api.harvestapp.com/v2/clients?cursor=eyJhZnRlciI6eyJpZCI6ODAwNX19&per_page=1&ref=next_cursor",
    "previous": null,
    "last": "https://api.harvestapp.com/v2/clients?page=257&per_page=1&ref=last"
  }
}
```

--------------------------------

### Example Request - Create Invoice

Source: <https://help.getharvest.com/api-v2/invoices-api/invoices/invoices>

Example cURL command to create an invoice using the Harvest API v2. It demonstrates how to set authentication headers, the request method, content type, and the JSON payload with invoice details and line item import configuration.

```bash
curl "https://api.harvestapp.com/v2/invoices" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"client_id":5735774,"subject":"ABC Project Quote","payment_term":"upon receipt","line_items_import":{"project_ids":[14307913],"time":{"summary_type":"task","from":"2017-03-01","to":"2017-03-31"},"expenses":{"summary_type":"category"}}}'
```

--------------------------------

### Create Project API Documentation

Source: <https://help.getharvest.com/api-v2/projects-api/projects/projects>

This section details the API endpoint for creating a new project. It includes the HTTP method, URL, and a full breakdown of request parameters, their types, and whether they are required. It also provides example request and response payloads.

```APIDOC
POST /v2/projects

Creates a new project object. Returns a project object and a `201 Created` response code if the call succeeded.

Parameters:
- client_id (integer, required): The ID of the client to associate this project with.
- name (string, required): The name of the project.
- code (string, optional): The code associated with the project.
- is_active (boolean, optional): Whether the project is active or archived. Defaults to `true`.
- is_billable (boolean, required): Whether the project is billable or not.
- is_fixed_fee (boolean, optional): Whether the project is a fixed-fee project or not.
- bill_by (string, required): The method by which the project is invoiced. Options: `Project`, `Tasks`, `People`, or `none`.
- hourly_rate (decimal, optional): Rate for projects billed by Project Hourly Rate.
- budget_by (string, required): The method by which the project is budgeted. Options: `project` (Hours Per Project), `project_cost` (Total Project Fees), `task` (Hours Per Task), `task_fees` (Fees Per Task), `person` (Hours Per Person), `none` (No Budget).
- budget_is_monthly (boolean, optional): Option to have the budget reset every month. Defaults to `false`.
- budget (decimal, optional): The budget in **hours** for the project when budgeting by **time**.
- cost_budget (decimal, optional): The **monetary** budget for the project when budgeting by **money**.
- cost_budget_include_expenses (boolean, optional): Option for budget of Total Project Fees projects to include tracked expenses. Defaults to `false`.
- notify_when_over_budget (boolean, optional): Whether Project Managers should be notified when the project goes over budget. Defaults to `false`.
- over_budget_notification_percentage (decimal, optional): Percentage value used to trigger over budget email alerts. Example: use 10.0 for 10.0%.
- show_budget_to_all (boolean, optional): Option to show project budget to all employees. Does not apply to Total Project Fee projects. Defaults to `false`.
- fee (decimal, optional): The amount you plan to invoice for the project. Only used by fixed-fee projects.
- notes (string, optional): Project notes.
- starts_on (date, optional): Date the project was started.
- ends_on (date, optional): Date the project will end.

Example Request:
```bash
curl "https://api.harvestapp.com/v2/projects" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"client_id":5735776,"name":"Your New Project","is_billable":true,"bill_by":"Project","hourly_rate":100.0,"budget_by":"project","budget":10000}'
```

Example Response:

```json
{"id":14308112,"name":"Your New Project","code":null,"is_active":true,"bill_by":"Project","budget":10000.0,"budget_by":"project","budget_is_monthly":false,"notify_when_over_budget":false,"over_budget_notification_percentage":80.0,"over_budget_notification_date":null,"show_budget_to_all":false,"created_at":"2017-06-26T21:56:52Z","updated_at":"2017-06-26T21:56:52Z","starts_on":null,"ends_on":null,"is_billable":true,"is_fixed_fee":false,"notes":"","client":{"id":5735776,"name":"123 Industries","currency":"EUR"},"cost_budget":null,"cost_budget_include_expenses":false,"hourly_rate":100.0,"fee":null}
```

```

--------------------------------

### Harvest API V2 Postman Collection Setup

Source: https://help.getharvest.com/api-v2/introduction/overview/postman-collection

Instructions for importing and setting up the Harvest API V2 Postman collection. This includes guidance on authorization using environment variables for Account ID and Access Token.

```APIDOC
Postman Collection Setup:

1. Import Collection:
   - Click the 'Run in Postman' button to import the collection.
   - If Postman is not open, it will prompt you to open it.

2. Authorization Setup:
   - The collection uses environment variables for authorization.
   - Acquire an access token and your account ID from the Harvest platform.
   - To set up variables:
     1. Click the ellipsis (...) next to the collection's name.
     2. Select 'Edit' from the dropdown.
     3. In the 'Variables' tab, update 'HARVEST_ACCOUNT_ID' and 'ACCESS_TOKEN' in the 'Current Value' column.
     4. Click 'Update'.

3. Running Requests:
   - Some requests require additional parameters.
   - Required parameters have a checked box; optional parameters are grayed out.
   - Click 'Send' to run a request after specifying parameters.
```

--------------------------------

### Example Response

Source: <https://help.getharvest.com/api-v2/timesheets-api/timesheets/time-entries>

A sample JSON response for a successfully created time entry.

```JSON
{
  "id": 636718192,
  "spent_date": "2017-03-21",
  "user": {
    "id": 1782959,
    "name": "Kim Allen"
  },
  "client": {
    "id": 5735774,
    "name": "ABC Corp"
  },
  "project": {
    "id": 14307913,
    "name": "Marketing Website"
  },
  "task": {
    "id": 8083365,
    "name": "Graphic Design"
  },
  "user_assignment": {
    "id": 125068553,
    "is_project_manager": true,
    "is_active": true,
    "budget": null,
    "created_at": "2017-06-26T22:32:52Z",
    "updated_at": "2017-06-26T22:32:52Z",
    "hourly_rate": 100.0
  },
  "task_assignment": {
    "id": 155502709,
    "billable": true,
    "is_active": true,
    "created_at": "2017-06-26T21:36:23Z",
    "updated_at": "2017-06-26T21:36:23Z",
    "hourly_rate": 100.0,
    "budget": null
  },
  "hours": 1.0,
  "hours_without_timer": 1.0,
  "rounded_hours": 1.0,
  "notes": null,
  "created_at": "2017-06-27T16:01:23Z",
  "updated_at": "2017-06-27T16:01:23Z",
  "is_locked": false,
  "locked_reason": null,
  "is_closed": false,
  "approval_status": "unsubmitted",
  "is_billed": false,
  "timer_started_at": null,
  "started_time": "8:00am",
  "ended_time": "9:00am",
  "is_running": false,
  "invoice": null,
  "external_reference": null,
  "billable": true,
  "budgeted": true,
  "billable_rate": 100.0,
  "cost_rate": 50.0
}
```

--------------------------------

### Harvest API V2 Pagination Example - Fetching First Page of Clients

Source: <https://help.getharvest.com/api-v2/introduction/overview/pagination>

Demonstrates how to retrieve the first page of clients from the Harvest API v2 using cURL. Includes request headers for authorization and account ID.

```curl
curl "https://api.harvestapp.com/v2/clients" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"
```

--------------------------------

### Harvest API V2 Pagination Example - Fetching Next Page of Clients

Source: <https://help.getharvest.com/api-v2/introduction/overview/pagination>

Shows how to fetch the next page of clients using the 'next' URL provided in the pagination links, employing cursor-based pagination.

```curl
curl "https://api.harvestapp.com/v2/clients?cursor=eyJhZnRlciI6eyJpZCI6MzAwN319&per_page=2000&ref=next_cursor" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"
```

--------------------------------

### Example Request for Update Project - Harvest API v2

Source: <https://help.getharvest.com/api-v2/projects-api/projects/projects>

Example cURL request to update a project's name in the Harvest API v2.

```curl
curl "https://api.harvestapp.com/v2/projects/14308112" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X PATCH \
  -H "Content-Type: application/json" \
  -d '{"name":"New project name"}'
```

--------------------------------

### Example Request for Delete Project - Harvest API v2

Source: <https://help.getharvest.com/api-v2/projects-api/projects/projects>

Example cURL request to delete a project in the Harvest API v2.

```curl
curl "https://api.harvestapp.com/v2/projects/14308112" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X DELETE
```

--------------------------------

### Harvest API V2 Pagination Example - Fetching Last Page of Clients

Source: <https://help.getharvest.com/api-v2/introduction/overview/pagination>

Illustrates how to retrieve the last page of clients by using the 'last' URL from the pagination links.

```curl
curl "https://api.harvestapp.com/v2/clients?page=3&per_page=2000&ref=last" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"
```

--------------------------------

### Harvest API V2 Pagination Parameter Example - Limiting Records per Page

Source: <https://help.getharvest.com/api-v2/introduction/overview/pagination>

Demonstrates how to use the 'per_page' parameter to retrieve a specific number of records, such as the most recently created client.

```curl
curl "https://api.harvestapp.com/v2/clients?per_page=1" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"
```

--------------------------------

### Harvest API V2 Roles Documentation

Source: <https://help.getharvest.com/api-v2/roles-api/roles/roles>

This section details the Harvest API v2 endpoints for managing roles. It covers the structure of the role object, required permissions, and operations for listing, retrieving, and creating roles. Includes API endpoint definitions, parameters, and example requests.

```APIDOC
Role Object Structure:
  id: integer - Unique ID for the role.
  name: string - The name of the role.
  user_ids: array of integers - The IDs of the users assigned to this role.
  created_at: datetime - Date and time the role was created.
  updated_at: datetime - Date and time the role was last updated.

Permissions:
  Administrator role is required to interact with the /v2/roles endpoint. Insufficient permissions result in a 403 Forbidden status code.

List all roles:
  Endpoint: GET /v2/roles
  Description: Returns a list of roles in the account, sorted by creation date. The response includes pagination properties.
  Parameters:
    page: integer - DEPRECATED. The page number for pagination. (Default: 1)
    per_page: integer - The number of records to return per page. (Range: 1-2000, Default: 2000)
  Example Request (cURL):
    curl "https://api.harvestapp.com/v2/roles" \
      -H "Authorization: Bearer $ACCESS_TOKEN" \
      -H "Harvest-Account-Id: $ACCOUNT_ID" \
      -H "User-Agent: MyApp (yourname@example.com)"
  Example Response:
    {"roles":[{"id":618100,"name":"Designer","created_at":"2020-04-17T10:09:41Z","updated_at":"2020-04-17T10:09:41Z","user_ids":[]},{"id":618099,"name":"Developer","created_at":"2020-04-17T10:08:43Z","updated_at":"2020-04-17T10:08:43Z","user_ids":[]},{"id":617630,"name":"Sales","created_at":"2020-04-16T16:59:59Z","updated_at":"2020-04-16T16:59:59Z","user_ids":[2084359,3122373,3122374]}],"per_page":2000,"total_pages":1,"total_entries":2,"next_page":null,"previous_page":null,"page":1,"links":{"first":"https://api.harvestapp.com/v2/roles?page=1&per_page=2000","next":null,"previous":null,"last":"https://api.harvestapp.com/v2/roles?page=1&per_page=2000"}}

Retrieve a role:
  Endpoint: GET /v2/roles/{ROLE_ID}
  Description: Retrieves the role with the given ID. Returns a role object and a 200 OK response code.
  Example Request (cURL):
    curl "https://api.harvestapp.com/v2/roles/617630" \
      -H "Authorization: Bearer $ACCESS_TOKEN" \
      -H "Harvest-Account-Id: $ACCOUNT_ID" \
      -H "User-Agent: MyApp (yourname@example.com)"
  Example Response:
    {"id":617630,"name":"Sales","created_at":"2020-04-16T16:59:59Z","updated_at":"2020-04-16T16:59:59Z","user_ids":[2084359,3122373,3122374]}

Create a role:
  Endpoint: POST /v2/roles
  Description: Creates a new role object. Returns a role object and a 201 Created response code.
  Parameters:
    name: string - Required. The name of the role.
    user_ids: array of integers - Optional. The IDs of the users assigned to this role.
  Example Request (cURL):
    curl "https://api.harvestapp.com/v2/roles" \
      -H "Authorization: Bearer $ACCESS_TOKEN" \
      -H "Harvest-Account-Id: $ACCOUNT_ID" \
      -H "User-Agent: MyApp (yourname@example.com)" \
      -X POST \
      -H "Content-Type: application/json" \
      -d '{"name":"Marketing","user_ids":[3122374,3122373,2084359]}'
  Example Response:
    {"id":617670,"name":"Marketing","created_at":"2020-04-16T18:18:30Z","updated_at":"2020-04-16T18:18:30Z","user_ids":[3122374,3122373,2084359]}
```

--------------------------------

### Example Request - Update Invoice

Source: <https://help.getharvest.com/api-v2/invoices-api/invoices/invoices>

Example cURL request to update an invoice, setting the purchase order number.

```curl
curl "https://api.harvestapp.com/v2/invoices/13150453" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X PATCH \
  -H "Content-Type: application/json" \
  -d '{"purchase_order":"2345"}'
```

--------------------------------

### Create Billable Rate - Harvest API v2

Source: <https://help.getharvest.com/api-v2/users-api/users/billable-rates>

This snippet details how to create a billable rate for a user via the Harvest API v2. It includes the POST endpoint, required and optional parameters like amount and start_date, and provides example requests using cURL and Postman, along with a sample JSON response.

```APIDOC
POST /v2/users/{USER_ID}/billable_rates

Parameters:
  - amount (decimal, required): The amount of the billable rate.
  - start_date (date, optional): The date the billable rate is effective. Cannot be a date in the future.

Description:
Creates a new billable rate object. Returns a billable rate object and a `201 Created` response code if the call succeeded.
* Creating a billable rate with no `start_date` will replace a user’s existing rate(s).
* Creating a billable rate with a `start_date` that is before a user’s existing rate(s) will replace those billable rates with the new one.
```

```bash
curl "https://api.harvestapp.com/v2/users/3226125/billable_rates" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"amount":5.0,"start_date":"2020-05-05"}'
```

```json
{"id":1836555,"amount":5.0,"start_date":2020-05-01,"end_date":null,"created_at":"2020-05-01T15:04:20Z","updated_at":"2020-05-01T15:04:20Z"}
```

--------------------------------

### Harvest API V2 Query String Authentication

Source: <https://help.getharvest.com/api-v2/authentication-api/authentication/authentication>

Example of how to authenticate with Harvest API V2 using a Personal Access Token in the query string.

```APIDOC
curl -H "User-Agent: MyApp (yourname@example.com)" \
     "https://api.harvestapp.com/v2/users/me?access_token=$ACCESS_TOKEN&account_id=$ACCOUNT_ID"
```

--------------------------------

### Harvest API v2 Data Types

Source: <https://help.getharvest.com/api-v2/introduction/overview/general>

Details the various data types supported by the Harvest API v2, including their format and example values. This is crucial for understanding how to structure requests and interpret responses.

```APIDOC
Type | Example | Description
---|---|---
boolean | `true` | Either `true` or `false`.
string | `"foo"` | A double-quoted sequence of characters.
integer | `42` | A non-negative integer value.
decimal | `6.8` | A decimal value. The supported precision is field-dependent.
date | `"2017-12-31"` | An ISO 8601 formatted string containing just the date portion.
datetime | `"2017-12-31T14:59:22Z"` | An ISO 8601 formatted string containing a UTC date and time.
time |  `"14:59"`
`"2:59pm"` | A string containing a 12-hour or 24-hour time depending on the Time Format configured for your account. You can check this on the **Settings** page in your Harvest account or the `clock` attribute the Company API.
array |  `[ 1, 2, 3 `] | A JSON array.
object | `{ name: "value" }` | A JSON object.
```

--------------------------------

### Harvest API V2 Header Authentication

Source: <https://help.getharvest.com/api-v2/authentication-api/authentication/authentication>

Example of how to authenticate with Harvest API V2 using a Personal Access Token in the Authorization header.

```APIDOC
curl -H "Authorization: Bearer $ACCESS_TOKEN" \
     -H "Harvest-Account-Id: $ACCOUNT_ID" \
     -H "User-Agent: MyApp (yourname@example.com)" \
     https://api.harvestapp.com/v2/users/me
```

--------------------------------

### Harvest API v2 Shell Variable Usage

Source: <https://help.getharvest.com/api-v2/introduction/overview/general>

Shows how to set and use shell variables for API request parameters like access tokens and account IDs. This simplifies copying and pasting example requests.

```Shell
ACCESS_TOKEN="my-access-token"
ACCOUNT_ID="my-account-id"
USER_AGENT="MyApp (yourname@example.com)"
```

```Shell
curl -X POST https://api.harvestapp.com/v2/company \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: $USER_AGENT"
```

--------------------------------

### Create User Cost Rate

Source: <https://help.getharvest.com/api-v2/users-api/users/cost-rates>

This snippet demonstrates how to create a cost rate for a user using the Harvest API v2. It requires an access token, Harvest Account ID, and specifies the amount and start date for the cost rate.

```curl
curl "https://api.harvestapp.com/v2/users/3226125/cost_rates" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"amount":13.0,"start_date":"2020-04-05"}'
```

```json
{"id":825305,"amount":13.0,"start_date":"2020-04-05","end_date":null,"created_at":"2020-05-01T13:23:27Z","updated_at":"2020-05-01T13:23:27Z"}
```

--------------------------------

### Create Time Entry

Source: <https://help.getharvest.com/api-v2/timesheets-api/timesheets/time-entries>

Creates a new time entry object using start and end times. Returns a time entry object and a 201 Created response code. This method is for accounts tracking time via start and end time.

```APIDOC
POST /v2/time_entries

Parameters:
- user_id (integer, optional): The ID of the user to associate with the time entry. Defaults to the currently authenticated user’s ID.
- project_id (integer, required): The ID of the project to associate with the time entry.
- task_id (integer, required): The ID of the task to associate with the time entry.
- spent_date (date, required): The ISO 8601 formatted date the time entry was spent.
- started_time (time, optional): The time the entry started. Defaults to the current time. Example: “8:00am”.
- ended_time (time, optional): The time the entry ended. If provided, `is_running` will be set to false. If not provided, `is_running` will be set to true.
- notes (string, optional): Any notes to be associated with the time entry.
- external_reference (object, optional): An object containing the `id`, `group_id`, `account_id`, and `permalink` of the external reference.
```

```HTTP
POST /v2/time_entries
```

```JSON
{
  "user_id": 1782959,
  "project_id": 14307913,
  "task_id": 8083365,
  "spent_date": "2017-03-21",
  "started_time": "8:00am",
  "ended_time": "9:00am"
}
```

```Shell
curl "https://api.harvestapp.com/v2/time_entries" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"user_id":1782959,"project_id":14307913,"task_id":8083365,"spent_date":"2017-03-21","started_time":"8:00am","ended_time":"9:00am"}'
```

--------------------------------

### Harvest API V2 Project Budget Report Endpoint

Source: <https://help.getharvest.com/api-v2/reports-api/reports/project-budget-report>

This section details the GET request for the Project Budget Report. It outlines the available parameters for pagination and filtering, such as 'page', 'per_page', and 'is_active'. The response structure includes a 'results' array containing project budget details, along with pagination metadata.

```APIDOC
GET /v2/reports/project_budget

Parameters:
  page (integer, optional): The page number for pagination. Default: 1.
  per_page (integer, optional): The number of records per page. Range: 1 to 2000. Default: 2000.
  is_active (boolean, optional): Filter by project activity. `true` for active, `false` for inactive.

Example Request:
curl
"https://api.harvestapp.com/v2/reports/project_budget" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"

Example Response:
{"results":[{"project_id":14308069,"project_name":"Online Store - Phase 1","client_id":5735776,"client_name":"123 Industries","budget_is_monthly":false,"budget_by":"project","is_active":true,"budget":200,"budget_spent":4,"budget_remaining":196},{"project_id":14307913,"project_name":"Marketing Website","client_id":5735774,"client_name":"ABC Corp","budget_is_monthly":false,"budget_by":"project","is_active":true,"budget":50,"budget_spent":2,"budget_remaining":48}],"per_page":2000,"total_pages":1,"total_entries":2,"next_page":null,"previous_page":null,"page":1,"links":{"first":"https://api.harvestapp.com/v2/reports/project_budget?page=1&per_page=2000","next":null,"previous":null,"last":"https://api.harvestapp.com/v2/reports/project_budget?page=1&per_page=2000"}}
```

--------------------------------

### Harvest API V2 Estimate Item Categories

Source: <https://help.getharvest.com/api-v2/estimates-api/estimates/estimate-item-categories>

Documentation for Harvest API V2's Estimate Item Categories. This includes operations for listing all categories, retrieving a specific category by ID, and creating new categories. It details endpoints, parameters, and provides example requests and responses.

```APIDOC
Estimate Item Categories Object:
  id: integer - Unique ID for the estimate item category.
  name: string - The name of the estimate item category.
  created_at: datetime - Date and time the estimate item category was created.
  updated_at: datetime - Date and time the estimate item category was last updated.

List all estimate item categories:
  Endpoint: GET /v2/estimate_item_categories
  Description: Returns a list of your estimate item categories, sorted by creation date.
  Parameters:
    updated_since: datetime - Only return categories updated since this date/time.
    per_page: integer - Number of records per page (1-2000, default: 2000).
  Example Request:
    curl "https://api.harvestapp.com/v2/estimate_item_categories" \
      -H "Authorization: Bearer $ACCESS_TOKEN" \
      -H "Harvest-Account-Id: $ACCOUNT_ID" \
      -H "User-Agent: MyApp (yourname@example.com)"
  Example Response:
    {"estimate_item_categories":[{"id":1378704,"name":"Product","created_at":"2017-06-26T20:41:00Z","updated_at":"2017-06-26T20:41:00Z"},{"id":1378703,"name":"Service","created_at":"2017-06-26T20:41:00Z","updated_at":"2017-06-26T20:41:00Z"}],"per_page":2000,"total_pages":1,"total_entries":2,"next_page":null,"previous_page":null,"page":1,"links":{"first":"https://api.harvestapp.com/v2/estimate_item_categories?page=1&per_page=2000","next":null,"previous":null,"last":"https://api.harvestapp.com/v2/estimate_item_categories?page=1&per_page=2000"}}

Retrieve an estimate item category:
  Endpoint: GET /v2/estimate_item_categories/{ESTIMATE_ITEM_CATEGORY_ID}
  Description: Retrieves the estimate item category with the given ID.
  Example Request:
    curl "https://api.harvestapp.com/v2/estimate_item_categories/1378704" \
      -H "Authorization: Bearer $ACCESS_TOKEN" \
      -H "Harvest-Account-Id: $ACCOUNT_ID" \
      -H "User-Agent: MyApp (yourname@example.com)"
  Example Response:
    {"id":1378704,"name":"Product","created_at":"2017-06-26T20:41:00Z","updated_at":"2017-06-26T20:41:00Z"}

Create an estimate item category:
  Endpoint: POST /v2/estimate_item_categories
  Description: Creates a new estimate item category object.
  Parameters:
    name: string (required) - The name of the estimate item category.
  Example Request:
    curl "https://api.harvestapp.com/v2/estimate_item_categories" \
      -H "Authorization: Bearer $ACCESS_TOKEN" \
      -H "Harvest-Account-Id: $ACCOUNT_ID" \
      -H "User-Agent: MyApp (yourname@example.com)" \
      -X POST \
      -H "Content-Type: application/json" \
      -d '{"name":"Hosting"}'
  Example Response:
    {"id":1379244,"name":"Hosting","created_at":"2017-06-27T16:06:35Z","updated_at":"2017-06-27T16:06:35Z"}
```

--------------------------------

### Get User Information (cURL)

Source: <https://help.getharvest.com/api-v2/users-api/users/users>

This snippet demonstrates how to retrieve specific user information using the Harvest API v2 via cURL. It requires an access token, Harvest Account ID, and a User-Agent header for authentication and identification.

```bash
curl "https://api.harvestapp.com/v2/users/3237198" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X DELETE
```

--------------------------------

### Harvest API V2 Company Object Attributes

Source: <https://help.getharvest.com/api-v2/company-api/company/company>

Describes the attributes of the company object in Harvest API V2. This includes details like base URI, domain, name, active status, week start day, time tracking preferences, date and time formats, plan type, clock format, currency display settings, decimal and thousands separators, color scheme, weekly capacity, and feature flags for expenses, invoices, estimates, approvals, and teams.

```APIDOC
Company Object Attributes:

- `base_uri` (string): The Harvest URL for the company.
- `full_domain` (string): The Harvest domain for the company.
- `name` (string): The name of the company.
- `is_active` (boolean): Whether the company is active or archived.
- `week_start_day` (string): The weekday used as the start of the week. Returns one of: `Saturday`, `Sunday`, or `Monday`.
- `wants_timestamp_timers` (boolean): Whether time is tracked via duration or start and end times.
- `time_format` (string): The format used to display time in Harvest. Returns either `decimal` or `hours_minutes`.
- `date_format` (string): The format used to display date in Harvest. Returns one of: `%m/%d/%Y`, `%d/%m/%Y`, `%Y-%m-%d`, `%d.%m.%Y`,.`%Y.%m.%d` or `%Y/%m/%d`.
- `plan_type` (string): The type of plan the company is on. Examples: `trial`, `free`, or `simple-v4`.
- `clock` (string): Used to represent whether the company is using a 12-hour or 24-hour clock. Returns either `12h` or `24h`.
- `currency_code_display` (string): How to display the currency code when formatting currency. Returns one of: `iso_code_none`, `iso_code_before`, or `iso_code_after`.
- `currency_symbol_display` (string): How to display the currency symbol when formatting currency. Returns one of: `symbol_none`, `symbol_before`, or `symbol_after`.
- `decimal_symbol` (string): Symbol used when formatting decimals.
- `thousands_separator` (string): Separator used when formatting numbers.
- `color_scheme` (string): The color scheme being used in the Harvest web client.
- `weekly_capacity` (integer): The weekly capacity in seconds.
- `expense_feature` (boolean): Whether the expense module is enabled.
- `invoice_feature` (boolean): Whether the invoice module is enabled.
- `estimate_feature` (boolean): Whether the estimate module is enabled.
- `approval_feature` (boolean): Whether the approval module is enabled.
- `team_feature` (boolean): Whether the team module is enabled.
```

--------------------------------

### Retrieve Contact - Harvest API v2

Source: <https://help.getharvest.com/api-v2/clients-api/clients/contacts>

Retrieves a contact by its ID using a GET request. Requires contact ID in the URL. Returns a contact object and a 200 OK status if successful.

```APIDOC
GET /v2/contacts/{CONTACT_ID}

Parameters:
  CONTACT_ID: The unique identifier for the contact.
```

```curl
curl "https://api.harvestapp.com/v2/contacts/4706479" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"
```

```json
{
  "id": 4706479,
  "title": "Owner",
  "first_name": "Jane",
  "last_name": "Doe",
  "email": "janedoe@example.com",
  "phone_office": "(203) 697-8885",
  "phone_mobile": "(203) 697-8886",
  "fax": "(203) 697-8887",
  "created_at": "2017-06-26T21:20:07Z",
  "updated_at": "2017-06-26T21:27:07Z",
  "client": {
    "id": 5735774,
    "name": "ABC Corp"
  }
}
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<contacts type="array">
    <contact>
        <id type="integer">4706479</id>
        <client-id type="integer">5735774</client-id>
        <title>Owner</title>
        <first-name>Jane</first-name>
        <last-name>Doe</last-name>
        <email>janedoe@example.com</email>
        <phone-office>(203) 697-8885</phone-office>
        <phone-mobile>(203) 697-8886</phone-mobile>
        <fax>(203) 697-8887</fax>
        <created-at type="dateTime">2013-08-12T15:30:14Z</created-at>
        <updated-at type="dateTime">2015-04-16T18:07:28Z</updated-at>
    </contact>
</contacts>
```

--------------------------------

### Harvest API V2 Documentation Overview

Source: <https://help.getharvest.com/api-v2/introduction>

Provides an overview of the Harvest API V2, including links to a Postman collection, supported time zones and currencies, pagination details, and code samples.

```APIDOC
Harvest API V2 Documentation

API Introduction:
  - Overview
  - Postman Collection
  - Supported Time Zones
  - Supported Currencies
  - Pagination
  - Code Samples
```

--------------------------------

### Harvest API V2 Documentation Overview

Source: <https://help.getharvest.com/api-v2/introduction/index>

Provides an overview of the Harvest API V2, including links to a Postman collection, supported time zones and currencies, pagination details, and code samples.

```APIDOC
Harvest API V2 Documentation

API Introduction:
  - Overview
  - Postman Collection
  - Supported Time Zones
  - Supported Currencies
  - Pagination
  - Code Samples
```

--------------------------------

### Harvest API V2 Documentation Overview

Source: <https://help.getharvest.com/api-v2/index>

This section provides an overview of the Harvest API V2, including links to Postman collections, code samples, supported time zones, currencies, and pagination details.

```APIDOC
API V2 Documentation

API Introduction:
  - Overview
  - Postman Collection
  - Code Samples
  - Supported Time Zones
  - Supported Currencies
  - Pagination

Authentication:
  - Authentication

Clients API:
  - Client Contacts
  - Clients

Company Settings:
  - Company

Invoices API:
  - Invoice Messages
  - Invoice Payments
  - Invoices
  - Invoice Item Categories

Estimates API:
  - Estimate Messages
  - Estimates
  - Estimate Item Categories

Expenses API:
  - Expenses
  - Expense Categories

Tasks API:
  - Tasks

Timesheets API:
  - Time Entries

Projects API:
  - Project User Assignments
  - Project Task Assignments
  - Projects

Roles API:
  - Roles

Users API:
  - User Teammates
  - User Billable Rates
  - User Cost Rates
  - User Project Assignments
  - Users

Reports API:
  - Expense Reports
  - Uninvoiced Report
  - Time Reports
  - Project Budget Report
```

--------------------------------

### Harvest API V2 Documentation Overview

Source: <https://help.getharvest.com/api-v2/invoices-api/index>

Provides an overview of the Harvest API V2, directing users to specific sections like the Invoices API. It also mentions the availability of legacy API V1 documentation.

```APIDOC
Harvest API V2 Documentation

Welcome to the Harvest API v2 Help Center.

Sections:
1. Harvest API V2 Documentation
2. Invoices API

This is the current API V2 documentation. You can still view the legacy API V1 documentation.

Invoices API:
  * Invoice Messages
  * Invoice Payments
  * Invoices
  * Invoice Item Categories
```

--------------------------------

### Harvest API V2 Documentation Overview

Source: <https://help.getharvest.com/api-v2/invoices-api>

Provides an overview of the Harvest API V2, directing users to specific sections like the Invoices API. It also mentions the availability of legacy API V1 documentation.

```APIDOC
Harvest API V2 Documentation

Welcome to the Harvest API v2 Help Center.

Sections:
1. Harvest API V2 Documentation
2. Invoices API

This is the current API V2 documentation. You can still view the legacy API V1 documentation.

Invoices API:
  * Invoice Messages
  * Invoice Payments
  * Invoices
  * Invoice Item Categories
```

--------------------------------

### Harvest API V2 Projects Documentation

Source: <https://help.getharvest.com/api-v2/projects-api/index>

Documentation for the Projects API within Harvest API V2. This section details Project User Assignments, Project Task Assignments, and Projects.

```APIDOC
Projects API:
  - Project User Assignments
  - Project Task Assignments
  - Projects
```

--------------------------------

### Harvest API V2 Projects Documentation

Source: <https://help.getharvest.com/api-v2/projects-api>

Documentation for the Projects API within Harvest API V2. This section details Project User Assignments, Project Task Assignments, and Projects.

```APIDOC
Projects API:
  - Project User Assignments
  - Project Task Assignments
  - Projects
```

--------------------------------

### Harvest API V2 Estimates API Overview

Source: <https://help.getharvest.com/api-v2/estimates-api/index>

Provides an overview of the Estimates API within Harvest API V2, listing key components such as Estimate Messages, Estimates, and Estimate Item Categories.

```APIDOC
Estimates API:
  - Estimate Messages
  - Estimates
  - Estimate Item Categories
```

--------------------------------

### Harvest API V2 - Users Endpoints

Source: <https://help.getharvest.com/api-v2/users-api>

Documentation for the Users API in Harvest API v2. This section details endpoints for managing user teammates, billable rates, cost rates, project assignments, and general user information.

```APIDOC
Users API:
  - User Teammates
  - User Billable Rates
  - User Cost Rates
  - User Project Assignments
  - Users
```

--------------------------------

### Harvest API v2 Placeholder Replacement

Source: <https://help.getharvest.com/api-v2/introduction/overview/general>

Demonstrates how to replace placeholder values in API URLs with actual project IDs. This convention is used throughout the API documentation to indicate dynamic values.

```APIDOC
https://api.harvestapp.com/v2/projects/{PROJECT_ID}
```

```APIDOC
https://api.harvestapp.com/v2/projects/1234
```

--------------------------------

### Harvest API V2 - Users Endpoints

Source: <https://help.getharvest.com/api-v2/users-api/index>

Documentation for the Users API in Harvest API v2. This section details endpoints for managing user teammates, billable rates, cost rates, project assignments, and general user information.

```APIDOC
Users API:
  - User Teammates
  - User Billable Rates
  - User Cost Rates
  - User Project Assignments
  - Users
```

--------------------------------

### Harvest API V2 User Cost Rates

Source: <https://help.getharvest.com/api-v2/users-api/users/cost-rates>

Documentation for Harvest API v2 User Cost Rates, covering the cost rate object structure, permissions, and endpoints for listing, retrieving, creating, and updating cost rates.

```APIDOC
Cost Rate Object:
  id: integer - Unique ID for the cost rate.
  amount: decimal - The amount of the cost rate.
  start_date: date - The date the cost rate is effective.
  end_date: date - The date the cost rate is no longer effective.
  created_at: datetime - Date and time the cost rate was created.
  updated_at: datetime - Date and time the cost rate was last updated.

Permissions:
  Administrator role required for /v2/users/{USER_ID}/cost_rates endpoint.

List all cost rates for a specific user:
  GET /v2/users/{USER_ID}/cost_rates
  - Returns a list of cost rates sorted by start_date.
  - Supports pagination with 'per_page' parameter (1-2000).
  - Deprecates 'page' parameter in favor of cursor-based pagination.
  - Example Request:
    curl "https://api.harvestapp.com/v2/users/3226125/cost_rates" \
      -H "Authorization: Bearer $ACCESS_TOKEN" \
      -H "Harvest-Account-Id: $ACCOUNT_ID" \
      -H "User-Agent: MyApp (yourname@example.com)"

Retrieve a cost rate:
  GET /v2/users/{USER_ID}/cost_rates/{COST_RATE_ID}
  - Retrieves a specific cost rate by its ID.
  - Example Request:
    curl "https://api.harvestapp.com/v2/users/3226125/cost_rates/125068554" \
      -H "Authorization: Bearer $ACCESS_TOKEN" \
      -H "Harvest-Account-Id: $ACCOUNT_ID" \
      -H "User-Agent: MyApp (yourname@example.com)"

Create a cost rate:
  POST /v2/users/{USER_ID}/cost_rates
  - Creates a new cost rate object.
  - Parameters:
    - amount: decimal (required) - The amount of the cost rate.
    - start_date: date (optional) - The date the cost rate is effective. Cannot be a future date.
  - If no start_date is provided, it replaces existing rates.
  - If start_date is before existing rates, it replaces them.
```

--------------------------------

### List Projects

Source: <https://help.getharvest.com/api-v2/projects-api/projects/projects>

Retrieves a list of all projects, sorted by creation date. Supports filtering by active status, client ID, and update time. Includes pagination parameters for managing large datasets.

```APIDOC
GET /v2/projects

Parameters:
- `is_active` (boolean): Filter by active status.
- `client_id` (integer): Filter by client ID.
- `updated_since` (datetime): Filter by update timestamp.
- `per_page` (integer): Records per page (1-2000, default 2000).

Response:
- `projects` (array): Array of project objects.
- Pagination properties: `per_page`, `total_pages`, `total_entries`, `next_page`, `previous_page`, `page`, `links`.
```

```curl
curl "https://api.harvestapp.com/v2/projects" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"
```

--------------------------------

### Create User

Source: <https://help.getharvest.com/api-v2/users-api/users/users>

Creates a new user and sends an invitation email. Returns a user object and a 201 Created response code.

```APIDOC
POST /v2/users

Parameters:
- first_name (string, required): The first name of the user.
- last_name (string, required): The last name of the user.
- email (string, required): The email address of the user.
- timezone (string, optional): The user’s timezone. Defaults to the company’s timezone.
- has_access_to_all_future_projects (boolean, optional): Whether the user should be automatically added to future projects. Defaults to false.
- is_contractor (boolean, optional): Whether the user is a contractor or an employee. Defaults to false.
- is_active (boolean, optional): Whether the user is active or archived. Defaults to true.
- weekly_capacity (integer, optional): The number of hours per week this person is available to work in seconds. Defaults to 126000 seconds (35 hours).
- default_hourly_rate (decimal, optional): The billable rate to use for this user. Defaults to 0.
- cost_rate (decimal, optional): The cost rate to use for this user. Defaults to 0.
- roles (array of strings, optional): Descriptive names of the business roles assigned to this person.
- access_roles (array of strings, optional): Access role(s) that determine the user’s permissions. Possible values: administrator, manager or member. Users with the manager role can additionally be granted one or more of these roles: project_creator, billable_rates_manager, managed_projects_invoice_drafter, managed_projects_invoice_manager, client_and_task_manager, time_and_expenses_manager, estimates_manager.

Access Roles:
- administrator: For users who need the most control to manage your account.
- manager: For users who need more access to people and project reports.
- member: For users who just need to track time and expenses.

Additional Manager Access Roles:
- project_creator: User can create projects, and edit projects that they manage.
- billable_rates_manager: User can see billable rates and amounts for projects and people they manage.
- managed_projects_invoice_drafter: User can create and edit draft invoices for projects they manage.
- managed_projects_invoice_manager: User can send and fully manage all invoices for projects they manage.
- client_and_task_manager: User can create and edit all clients and tasks on the account.
- time_and_expenses_manager: User can create and edit time and expenses for people and projects they manage.
- estimates_manager: User can create and edit all estimates on the account.
```

```bash
curl "https://api.harvestapp.com/v2/users" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"email":"george@example.com","first_name":"George","last_name":"Frank","access_roles":["manager","project_creator","time_and_expenses_manager"]}'
```

--------------------------------

### Create Harvest Client

Source: <https://help.getharvest.com/api-v2/clients-api/clients/clients>

Creates a new client object in Harvest. Requires client name and optionally accepts active status, address, and currency. Returns a `201 Created` status on success.

```APIDOC
POST /v2/clients

Parameters:
- name (string, required): A textual description of the client.
- is_active (boolean, optional): Whether the client is active, or archived. Defaults to `true`.
- address (string, optional): A textual representation of the client’s physical address. May include new line characters.
- currency (string, optional): The currency used by the client. If not provided, the company’s currency will be used.
```

```curl
curl "https://api.harvestapp.com/v2/clients" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"name":"Your New Client","currency":"EUR"}'
```

--------------------------------

### Harvest API V2 OAuth Implicit Grant Flow

Source: <https://help.getharvest.com/api-v2/introduction/overview/code-samples>

Demonstrates the OAuth implicit grant flow for client-side applications using the Harvest API V2. Source code is available.

```APIDOC
OAuth Implicit Grant Flow:
  - Live demo available for client-side applications.
  - Source code for the demo is also available.
  - Focuses on the implicit grant flow.
```

--------------------------------

### Harvest API V2 Project Object Structure

Source: <https://help.getharvest.com/api-v2/projects-api/projects/projects>

Defines the structure and attributes of a project object within the Harvest API V2. This includes details on project identification, client association, naming, status, billing and budgeting configurations, financial parameters, notification settings, and temporal data.

```APIDOC
Project Object Attributes:

- id: integer (Unique ID for the project.)
- client: object (An object containing the project’s client id, name, and currency.)
- name: string (Unique name for the project.)
- code: string (The code associated with the project.)
- is_active: boolean (Whether the project is active or archived.)
- is_billable: boolean (Whether the project is billable or not.)
- is_fixed_fee: boolean (Whether the project is a fixed-fee project or not.)
- bill_by: string (The method by which the project is invoiced.)
- hourly_rate: decimal (Rate for projects billed by Project Hourly Rate.)
- budget_by: string (The method by which the project is budgeted.)
- budget_is_monthly: boolean (Option to have the budget reset every month.)
- budget: decimal (The budget in hours for the project when budgeting by time.)
- cost_budget: decimal (The monetary budget for the project when budgeting by money.)
- cost_budget_include_expenses: boolean (Option for budget of Total Project Fees projects to include tracked expenses.)
- notify_when_over_budget: boolean (Whether Project Managers should be notified when the project goes over budget.)
- over_budget_notification_percentage: decimal (Percentage value used to trigger over budget email alerts.)
- over_budget_notification_date: date (Date of last over budget notification. If none have been sent, this will be null.)
- show_budget_to_all: boolean (Option to show project budget to all employees. Does not apply to Total Project Fee projects.)
- fee: decimal (The amount you plan to invoice for the project. Only used by fixed-fee projects.)
- notes: string (Project notes.)
- starts_on: date (Date the project was started.)
- ends_on: date (Date the project will end.)
- created_at: datetime (Date and time the project was created.)
- updated_at: datetime (Date and time the project was last updated.)
```

--------------------------------

### Expenses API Documentation

Source: <https://help.getharvest.com/api-v2/expenses-api/index>

Documentation for the Expenses API, covering expenses and expense categories.

```APIDOC
Expenses API:
  - Expenses
  - Expense Categories
```

--------------------------------

### Harvest API v2: Create Task

Source: <https://help.getharvest.com/api-v2/tasks-api/tasks/tasks>

Creates a new task object. Requires a task name and optionally accepts billable status, default hourly rate, default project status, and active status. Returns the created task object and a 201 Created response.

```APIDOC
POST /v2/tasks

Parameters:
- name (string, required): The name of the task.
- billable_by_default (boolean, optional): Determines if default tasks are billable. Defaults to true.
- default_hourly_rate (decimal, optional): The default hourly rate for the task. Defaults to 0.
- is_default (boolean, optional): Whether the task is automatically added to future projects. Defaults to false.
- is_active (boolean, optional): Whether the task is active or archived. Defaults to true.
```

```bash
curl "https://api.harvestapp.com/v2/tasks" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"name":"New Task Name","hourly_rate":120.0}'
```

--------------------------------

### List All Clients - Harvest API V2

Source: <https://help.getharvest.com/api-v2/clients-api/clients/clients>

Retrieves a list of clients, sorted by creation date. Supports filtering by active status and updated since a specific date. Includes pagination parameters for managing large result sets.

```APIDOC
GET /v2/clients

Parameter | Type | Description  
---|---|---  
`is_active` | boolean | Pass `true` to only return active clients and `false` to return inactive clients.  
`updated_since` | datetime | Only return clients that have been updated since the given date and time.  
`page` | integer |  **DEPRECATED** The page number to use in pagination. (Default: 1)  
`per_page` | integer | The number of records to return per page. Can range between 1 and 2000. (Default: 2000)
```

```bash
curl "https://api.harvestapp.com/v2/clients" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"
```

--------------------------------

### Harvest API V2 User Billable Rates

Source: <https://help.getharvest.com/api-v2/users-api/users/billable-rates>

Documentation for the Harvest API V2 regarding user billable rates. This includes the structure of the billable rate object, required permissions, and endpoints for listing and retrieving rates.

```APIDOC
Billable Rate Object:
  id: integer - Unique ID for the billable rate.
  amount: decimal - The amount of the billable rate.
  start_date: date - The date the billable rate is effective.
  end_date: date - The date the billable rate is no longer effective.
  created_at: datetime - Date and time the billable rate was created.
  updated_at: datetime - Date and time the billable rate was last updated.

Required Permissions:
  Administrator or Manager with permission to edit billable rates.

List all billable rates for a specific user:
  Endpoint: GET /v2/users/{USER_ID}/billable_rates
  Description: Returns a list of billable rates for the user, sorted by start_date.
  Parameters:
    page: integer - DEPRECATED. The page number for pagination.
    per_page: integer - The number of records to return per page (1-2000).
  Example Request:
    curl "https://api.harvestapp.com/v2/users/3226125/billable_rates" \
      -H "Authorization: Bearer $ACCESS_TOKEN" \
      -H "Harvest-Account-Id: $ACCOUNT_ID" \
      -H "User-Agent: MyApp (yourname@example.com)"
  Example Response:
    {"billable_rates":[{"id":1836493,"amount":8.25,"start_date":"2019-01-01","end_date":"2019-05-31","created_at":"2020-05-01T13:17:42Z","updated_at":"2020-05-01T13:17:50Z"},...],"per_page":2000,"total_pages":1,"total_entries":4,"next_page":null,"previous_page":null,"page":1,"links":{"first":"https://api.harvestapp.com/v2/users/3226125/billable_rates?page=1&per_page=2000","next":null,"previous":null,"last":"https://api.harvestapp.com/v2/users/3226125/billable_rates?page=1&per_page=2000"}}

Retrieve a billable rate:
  Endpoint: GET /v2/users/{USER_ID}/billable_rates/{billable_RATE_ID}
  Description: Retrieves the billable rate with the given ID.
  Example Request:
    curl "https://api.harvestapp.com/v2/users/3226125/billable_rates/1836493" \
      -H "Authorization: Bearer $ACCESS_TOKEN" \
      -H "Harvest-Account-Id: $ACCOUNT_ID" \
      -H "User-Agent: MyApp (yourname@example.com)"
  Example Response:
    {"id":1836493,"amount":8.25,"start_date":"2019-01-01","end_date":"2019-05-31","created_at":"2020-05-01T13:17:42Z","updated_at":"2020-05-01T13:17:50Z"}
```

--------------------------------

### Harvest API V2 Users Endpoint

Source: <https://help.getharvest.com/api-v2/users-api/users/users>

Documentation for the Harvest API V2 Users endpoint, detailing the user object attributes, required permissions, and how to list users. Supports filtering by active status and update time, with pagination options.

```APIDOC
GET /v2/users

Parameters:
  is_active (boolean): Pass `true` to only return active users and `false` to return inactive users.
  updated_since (datetime): Only return users that have been updated since the given date and time.
  per_page (integer): The number of records to return per page. Can range between 1 and 2000. (Default: 2000)

User Object Attributes:
  id (integer): Unique ID for the user.
  first_name (string): The first name of the user.
  last_name (string): The last name of the user.
  email (string): The email address of the user.
  telephone (string): The user’s telephone number.
  timezone (string): The user’s timezone.
  has_access_to_all_future_projects (boolean): Whether the user should be automatically added to future projects.
  is_contractor (boolean): Whether the user is a contractor or an employee.
  is_active (boolean): Whether the user is active or archived.
  weekly_capacity (integer): The number of hours per week this person is available to work in seconds, in half hour increments.
  default_hourly_rate (decimal): The billable rate to use for this user when they are added to a project.
  cost_rate (decimal): The cost rate to use for this user when calculating a project’s costs vs billable amount.
  roles (array of strings): Descriptive names of the business roles assigned to this person.
  access_roles (array of strings): Access role(s) that determine the user’s permissions in Harvest. Possible values: `administrator`, `manager` or `member`.
  avatar_url (string): The URL to the user’s avatar image.
  created_at (datetime): Date and time the user was created.
  updated_at (datetime): Date and time the user was last updated.

Required Permissions:
  Administrator or Manager with assigned teammates. Managers have limitations on editing certain user attributes and archiving/restoring/deleting teammates.
```

--------------------------------

### Create User Assignment

Source: <https://help.getharvest.com/api-v2/projects-api/projects/user-assignments>

Creates a new user assignment object for a project. Requires user ID and optionally accepts settings for activity, project manager status, default rates, hourly rate, and budget. Returns a 201 Created status on success.

```APIDOC
POST /v2/projects/{PROJECT_ID}/user_assignments

Parameters:
- user_id (integer, required): The ID of the user to associate with the project.
- is_active (boolean, optional): Whether the user assignment is active or archived. Defaults to true.
- is_project_manager (boolean, optional): Determines if the user has Project Manager permissions. Defaults to false for regular users and true for managers/admins.
- use_default_rates (boolean, optional): Determines billable rate usage. true uses user's default rates, false uses custom rate. Defaults to true.
- hourly_rate (decimal, optional): Custom rate when use_default_rates is false. Defaults to 0.
- budget (decimal, optional): Budget used when the project’s budget_by is person.
```

```HTTP
POST /v2/projects/{PROJECT_ID}/user_assignments
Content-Type: application/json
Authorization: Bearer $ACCESS_TOKEN
Harvest-Account-Id: $ACCOUNT_ID
User-Agent: MyApp (yourname@example.com)

{
  "user_id":1782974,
  "use_default_rates":false,
  "hourly_rate":75.50
}
```

```curl
curl "https://api.harvestapp.com/v2/projects/14308069/user_assignments" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"user_id":1782974,"use_default_rates":false,"hourly_rate":75.50}'
```

```JSON
{
  "id":125068758,
  "is_project_manager":false,
  "is_active":true,
  "use_default_rates":false,
  "budget":null,
  "created_at":"2017-06-26T22:36:01Z",
  "updated_at":"2017-06-26T22:36:01Z",
  "hourly_rate":75.5,
  "project":{
    "id":14308069,
    "name":"Online Store - Phase 1",
    "code":"OS1"
  },
  "user":{
    "id":1782974,
    "name":"Jim Allen"
  }
}
```

--------------------------------

### Create Expense

Source: <https://help.getharvest.com/api-v2/expenses-api/expenses/expenses>

Creates a new expense entry. Requires project and expense category IDs, along with the spent date. Optionally accepts user ID, units, total cost, notes, billable status, and a receipt file. Either units or total_cost is required.

```APIDOC
POST /v2/expenses

Parameters:
- user_id (integer, optional): The ID of the user associated with this expense. Defaults to the ID of the currently authenticated user.
- project_id (integer, required): The ID of the project associated with this expense.
- expense_category_id (integer, required): The ID of the expense category this expense is being tracked against.
- spent_date (date, required): Date the expense occurred.
- units (integer, optional): The quantity of units to use in calculating the `total_cost` of the expense. Required if using a unit-based expense category.
- total_cost (decimal, optional): The total amount of the expense. Required if not using a unit-based expense category.
- notes (string, optional): Textual notes used to describe the expense.
- billable (boolean, optional): Whether this expense is billable or not. Defaults to `true`.
- receipt (file, optional): A receipt file to attach to the expense. If including a receipt, you must submit a multipart/form-data request.
```

```curl
curl "https://api.harvestapp.com/v2/expenses" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"user_id":1782959,"project_id":14308069,"expense_category_id":4195926,"spent_date":"2017-03-01","total_cost":13.59}'
```

--------------------------------

### Harvest API V2 POST Request with JSON Body

Source: <https://help.getharvest.com/api-v2/introduction/overview/general>

Illustrates making a POST request to the Harvest API V2 using JSON format for the request body. Requires setting the 'Content-Type' header to 'application/json'.

```APIDOC
curl -X POST https://api.harvestapp.com/v2/tasks \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"My New Task\"}"
```

--------------------------------

### Harvest API V2 Rate Limiting

Source: <https://help.getharvest.com/api-v2/introduction/overview/general>

Details the rate limiting policies for the Harvest API V2, including limits for general requests and reports, and how the API responds to exceeding these limits.

```APIDOC
The rate limit for general API requests is 100 requests per 15 seconds.
The rate limit for Reports API requests is 100 requests per 15 minutes.
When the rate limit is exceeded Harvest will send an HTTP 429 status code. The number of seconds until the throttle is lifted is sent via the Retry-After HTTP header, as specified in RFC 2616.
```

--------------------------------

### List All Users

Source: <https://help.getharvest.com/api-v2/users-api/users/users>

Retrieves a list of all users in the Harvest account. This endpoint returns a user object for each user and a 200 OK response code. It includes pagination details like per_page, total_pages, and links to navigate through the results.

```APIDOC
GET /v2/users

Retrieves a list of all users. Returns a user object for each user and a 200 OK response code.

Example response:
```

{"users":[{"id":3230547,"first_name":"Jim","last_name":"Allen","email":"jimallen@example.com","telephone":"","timezone":"Mountain Time (US & Canada)","has_access_to_all_future_projects":false,"is_contractor":false,"is_active":true,"created_at":"2020-05-01T22:34:41Z","updated_at":"2020-05-01T22:34:52Z","weekly_capacity":126000,"default_hourly_rate":100.0,"cost_rate":50.0,"roles":["Developer"],"access_roles":["member"],"avatar_url":"https://cache.harvestapp.com/assets/profile_images/abraj_albait_towers.png?1498516481"},{"id":1782959,"first_name":"Kim","last_name":"Allen","email":"kimallen@example.com","timezone":"Eastern Time (US & Canada)","has_access_to_all_future_projects":true,"is_contractor":false,"is_active":true,"created_at":"2020-05-01T22:15:45Z","updated_at":"2020-05-01T22:32:52Z","weekly_capacity":126000,"default_hourly_rate":100.0,"cost_rate":50.0,"roles":["Designer"],"access_roles":["member"],"avatar_url":"https://cache.harvestapp.com/assets/profile_images/cornell_clock_tower.png?1498515345"},{"id":1782884,"first_name":"Bob","last_name":"Powell","email":"bobpowell@example.com","timezone":"Mountain Time (US & Canada)","has_access_to_all_future_projects":false,"is_contractor":false,"is_active":true,"created_at":"2020-05-01T20:41:00Z","updated_at":"2020-05-01T20:42:25Z","weekly_capacity":126000,"default_hourly_rate":100.0,"cost_rate":75.0,"roles":["Founder","CEO"],"access_roles":["administrator"],"avatar_url":"https://cache.harvestapp.com/assets/profile_images/allen_bradley_clock_tower.png?1498509661"}],"per_page":2000,"total_pages":1,"total_entries":3,"next_page":null,"previous_page":null,"page":1,"links":{"first":"<https://api.harvestapp.com/v2/users?page=1&per_page=2000","next":null,"previous":null,"last":"https://api.harvestapp.com/v2/users?page=1&per_page=2000"}}>

```
```

```curl
curl "https://api.harvestapp.com/v2/users" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"
```

--------------------------------

### List User Project Assignments

Source: <https://help.getharvest.com/api-v2/users-api/users/project-assignments>

Fetches active project assignments for the authenticated user. Results are paginated and sorted by creation date. Includes details on projects, clients, and task assignments.

```APIDOC
GET /v2/users/me/project_assignments

Parameters:
- page (integer): The page number for pagination. Default: 1.
- per_page (integer): The number of records per page. Range: 1 to 2000. Default: 2000.

Response Structure:
- project_assignments (array): An array of project assignment objects.
  - id (integer): The project assignment ID.
  - is_project_manager (boolean): Whether the user is a project manager.
  - is_active (boolean): Whether the project assignment is active.
  - use_default_rates (boolean): Whether to use default rates.
  - budget (null): Budget information (currently null).
  - created_at (string): Creation timestamp.
  - updated_at (string): Update timestamp.
  - hourly_rate (number): The hourly rate.
  - project (object): Project details.
    - id (integer): Project ID.
    - name (string): Project name.
    - code (string): Project code.
  - client (object): Client details.
    - id (integer): Client ID.
    - name (string): Client name.
  - task_assignments (array): Array of task assignments.
    - id (integer): Task assignment ID.
    - billable (boolean): Whether the task is billable.
    - is_active (boolean): Whether the task assignment is active.
    - created_at (string): Creation timestamp.
    - updated_at (string): Update timestamp.
    - hourly_rate (number): The hourly rate for the task.
    - budget (null): Budget information (currently null).
    - task (object): Task details.
      - id (integer): Task ID.
      - name (string): Task name.
- per_page (integer): Number of records per page.
- total_pages (integer): Total number of pages.
- total_entries (integer): Total number of entries.
- next_page (null): Link to the next page.
- previous_page (null): Link to the previous page.
- page (integer): Current page number.
- links (object): Pagination links.
```

```HTTP
GET https://api.harvestapp.com/v2/users/me/project_assignments
```

```curl
curl "https://api.harvestapp.com/v2/users/me/project_assignments" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"
```

```JSON
{
  "project_assignments": [
    {
      "id": 125066109,
      "is_project_manager": true,
      "is_active": true,
      "use_default_rates": true,
      "budget": null,
      "created_at": "2017-06-26T21:52:18Z",
      "updated_at": "2017-06-26T21:52:18Z",
      "hourly_rate": 100.0,
      "project": {
        "id": 14308069,
        "name": "Online Store - Phase 1",
        "code": "OS1"
      },
      "client": {
        "id": 5735776,
        "name": "123 Industries"
      },
      "task_assignments": [
        {
          "id": 155505013,
          "billable": true,
          "is_active": true,
          "created_at": "2017-06-26T21:52:18Z",
          "updated_at": "2017-06-26T21:52:18Z",
          "hourly_rate": 100.0,
          "budget": null,
          "task": {
            "id": 8083365,
            "name": "Graphic Design"
          }
        },
        {
          "id": 155505014,
          "billable": true,
          "is_active": true,
          "created_at": "2017-06-26T21:52:18Z",
          "updated_at": "2017-06-26T21:52:18Z",
          "hourly_rate": 100.0,
          "budget": null,
          "task": {
            "id": 8083366,
            "name": "Programming"
          }
        },
        {
          "id": 155505015,
          "billable": true,
          "is_active": true,
          "created_at": "2017-06-26T21:52:18Z",
          "updated_at": "2017-06-26T21:52:18Z",
          "hourly_rate": 100.0,
          "budget": null,
          "task": {
            "id": 8083368,
            "name": "Project Management"
          }
        },
        {
          "id": 155505016,
          "billable": false,
          "is_active": true,
          "created_at": "2017-06-26T21:52:18Z",
          "updated_at": "2017-06-26T21:54:06Z",
          "hourly_rate": 100.0,
          "budget": null,
          "task": {
            "id": 8083369,
            "name": "Research"
          }
        }
      ]
    },
    {
      "id": 125063975,
      "is_project_manager": true,
      "is_active": true,
      "use_default_rates": false,
      "budget": null,
      "created_at": "2017-06-26T21:36:23Z",
      "updated_at": "2017-06-26T21:36:23Z",
      "hourly_rate": 100.0,
      "project": {
        "id": 14307913,
        "name": "Marketing Website",
        "code": "MW"
      },
      "client": {
        "id": 5735774,
        "name": "ABC Corp"
      },
      "task_assignments": [
        {
          "id": 155502709,
          "billable": true,
          "is_active": true,
          "created_at": "2017-06-26T21:36:23Z",
          "updated_at": "2017-06-26T21:36:23Z",
          "hourly_rate": 100.0,
          "budget": null,
          "task": {
            "id": 8083365,
            "name": "Graphic Design"
          }
        },
        {
          "id": 155502710,
          "billable": true,
          "is_active": true,
          "created_at": "2017-06-26T21:36:23Z",
          "updated_at": "2017-06-26T21:36:23Z",
          "hourly_rate": 100.0,
          "budget": null,
          "task": {
            "id": 8083366,
            "name": "Programming"
          }
        },
        {
          "id": 155502711,
          "billable": true,
          "is_active": true,
          "created_at": "2017-06-26T21:36:23Z",
          "updated_at": "2017-06-26T21:36:23Z",
          "hourly_rate": 100.0,
          "budget": null,
          "task": {
            "id": 8083368,
            "name": "Project Management"
          }
        },
        {
          "id": 155505153,
          "billable": false,
          "is_active": true,
          "created_at": "2017-06-26T21:53:20Z",
          "updated_at": "2017-06-26T21:54:31Z",
          "hourly_rate": 100.0,
          "budget": null,
          "task": {
            "id": 8083369,
            "name": "Research"
          }
        }
      ]
    }
  ],
  "per_page": 2000,
  "total_pages": 1,
  "total_entries": 2,
  "next_page": null,
  "previous_page": null,
  "page": 1,
  "links": {
    "first": "https://api.harvestapp.com/v2/users/1782884/project_assignments?page=1&per_page=2000",
    "next": null,
    "previous": null,
    "last": "https://api.harvestapp.com/v2/users/1782884/project_assignments?page=1&per_page=2000"
  }
}
```

--------------------------------

### Harvest API V2 Permissions for Projects

Source: <https://help.getharvest.com/api-v2/projects-api/projects/projects>

Details the required user permissions to interact with the `/v2/projects` endpoint in the Harvest API V2. Access is restricted to users with specific roles.

```APIDOC
Required Permissions for /v2/projects endpoint:

- Administrator role OR
- Manager role with managed projects.

Insufficient permissions will result in a 403 Forbidden status code.
```

--------------------------------

### Create Estimate Line Item

Source: <https://help.getharvest.com/api-v2/estimates-api/estimates/estimates>

Creates a new line item on an existing estimate. Returns a 200 OK response code if the call succeeded.

```APIDOC
POST /v2/estimates/{ESTIMATE_ID}

Parameters:
- line_items (array): Array of line item parameters to add.
  - kind (string): The name of an estimate item category.
  - description (string): Text description of the line item.
  - quantity (integer): The unit quantity of the item. Defaults to `1`.
  - unit_price (decimal): The individual price per unit.
  - taxed (boolean): Whether the estimate’s `tax` percentage applies to this line item. Defaults to `false`.
  - taxed2 (boolean): Whether the estimate’s `tax2` percentage applies to this line item. Defaults to `false`.
```

```curl
curl "https://api.harvestapp.com/api/v2/estimates/1439827" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-ID: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X PATCH \
  -H "Content-Type: application/json" \
  -d '{"line_items":[{"kind":"Service","description":"Another Project","unit_price":1000.0}]}'
```

--------------------------------

### Harvest API V2 User Assignment Object

Source: <https://help.getharvest.com/api-v2/projects-api/projects/user-assignments>

Defines the structure and attributes of a user assignment object in the Harvest API v2. Includes details on project and user associations, activity status, project management roles, rate and budget configurations, and timestamps.

```APIDOC
User Assignment Object:
  id (integer): Unique ID for the user assignment.
  project (object): An object containing the id, name, and code of the associated project.
  user (object): An object containing the id and name of the associated user.
  is_active (boolean): Whether the user assignment is active or archived.
  is_project_manager (boolean): Determines if the user has Project Manager permissions for the project.
  use_default_rates (boolean): Determines which billable rate(s) will be used on the project for this user when `bill_by` is `People`. When `true`, the project will use the user’s default billable rates. When `false`, the project will use the custom rate defined on this user assignment.
  hourly_rate (decimal): Custom rate used when the project’s `bill_by` is `People` and `use_default_rates` is `false`.
  budget (decimal): Budget used when the project’s `budget_by` is `person`.
  created_at (datetime): Date and time the user assignment was created.
  updated_at (datetime): Date and time the user assignment was last updated.
```

--------------------------------

### Harvest API V2 Invoice Item Categories

Source: <https://help.getharvest.com/api-v2/invoices-api/invoices/invoice-item-categories>

Documentation for Harvest API V2 Invoice Item Categories. Covers the object structure, listing, retrieving, and creating categories.

```APIDOC
Invoice Item Category Object:
  id: integer - Unique ID for the invoice item category.
  name: string - The name of the invoice item category.
  use_as_service: boolean - Whether this invoice item category is used for billable hours when generating an invoice.
  use_as_expense: boolean - Whether this invoice item category is used for expenses when generating an invoice.
  created_at: datetime - Date and time the invoice item category was created.
  updated_at: datetime - Date and time the invoice item category was last updated.

List all invoice item categories:
  GET /v2/invoice_item_categories
  Returns a list of your invoice item categories, sorted by creation date.
  Parameters:
    updated_since: datetime - Only return categories updated since this date/time.
    per_page: integer - Number of records per page (1-2000, default: 2000).
  Example Request:
    curl "https://api.harvestapp.com/v2/invoice_item_categories" \
      -H "Authorization: Bearer $ACCESS_TOKEN" \
      -H "Harvest-Account-Id: $ACCOUNT_ID" \
      -H "User-Agent: MyApp (yourname@example.com)"
  Example Response:
    {"invoice_item_categories":[{"id":1466293,"name":"Product","use_as_service":false,"use_as_expense":true,"created_at":"2017-06-26T20:41:00Z","updated_at":"2017-06-26T20:41:00Z"},{"id":1466292,"name":"Service","use_as_service":true,"use_as_expense":false,"created_at":"2017-06-26T20:41:00Z","updated_at":"2017-06-26T20:41:00Z"}],"per_page":2000,"total_pages":1,"total_entries":2,"next_page":null,"previous_page":null,"page":1,"links":{"first":"https://api.harvestapp.com/v2/invoice_item_categories?page=1&per_page=2000","next":null,"previous":null,"last":"https://api.harvestapp.com/v2/invoice_item_categories?page=1&per_page=2000"}}

Retrieve an invoice item category:
  GET /v2/invoice_item_categories/{INVOICE_ITEM_CATEGORY_ID}
  Retrieves the invoice item category with the given ID.
  Example Request:
    curl "https://api.harvestapp.com/v2/invoice_item_categories/1466293" \
      -H "Authorization: Bearer $ACCESS_TOKEN" \
      -H "Harvest-Account-Id: $ACCOUNT_ID" \
      -H "User-Agent: MyApp (yourname@example.com)"
  Example Response:
    {"id":1466293,"name":"Product","use_as_service":false,"use_as_expense":true,"created_at":"2017-06-26T20:41:00Z","updated_at":"2017-06-26T20:41:00Z"}

Create an invoice item category:
  POST /v2/invoice_item_categories
  Creates a new invoice item category object.
  Parameters:
    name: string (required) - The name of the invoice item category.
  Example Request:
    curl "https://api.harvestapp.com/v2/invoice_item_categories" \
      -H "Authorization: Bearer $ACCESS_TOKEN" \
      -H "Harvest-Account-Id: $ACCOUNT_ID" \
      -H "User-Agent: MyApp (yourname@example.com)" \
      -X POST \
      -H "Content-Type: application/json" \
      -d '{"name":"Hosting"}'
  Example Response:
    {"id":1467098,"name":"Hosting","use_as_service":false,"use_as_expense":false,"created_at":"2017-06-27T16:20:59Z","updated_at":"2017-06-27T16:20:59Z"}
```

--------------------------------

### Harvest API V2 User Project Assignments Permissions

Source: <https://help.getharvest.com/api-v2/users-api/users/project-assignments>

Details the access permissions required to view user project assignments via the Harvest API V2's `/v2/users/{USER_ID}/project_assignments` endpoint. Specifies roles and the consequences of insufficient permissions.

```APIDOC
Permissions for /v2/users/{USER_ID}/project_assignments:
  - Anyone can access their own project assignments.
  - Members can access their own project assignments using the endpoint.
  - To access other users' project assignments, Administrator or Manager roles with assigned teammates are required.
  - Insufficient permissions result in a `403 Forbidden` status code.
```

--------------------------------

### Harvest API V2 User Project Assignment Object

Source: <https://help.getharvest.com/api-v2/users-api/users/project-assignments>

Defines the structure and attributes of a user project assignment object within the Harvest API V2. Includes details on IDs, status flags, rates, budgets, timestamps, and associated project/client information.

```APIDOC
User Project Assignment Object:
  id: integer - Unique ID for the project assignment.
  is_active: boolean - Whether the project assignment is active or archived.
  is_project_manager: boolean - Determines if the user has Project Manager permissions for the project.
  use_default_rates: boolean - Determines which billable rate(s) will be used on the project for this user when `bill_by` is `People`. When `true`, the project will use the user’s default billable rates. When `false`, the project will use the custom rate defined on this user assignment.
  hourly_rate: decimal - Custom rate used when the project’s `bill_by` is `People` and `use_default_rates` is `false`.
  budget: decimal - Budget used when the project’s `budget_by` is `person`.
  created_at: datetime - Date and time the project assignment was created.
  updated_at: datetime - Date and time the project assignment was last updated.
  project: object - An object containing the assigned project id, name, and code.
  client: object - An object containing the project’s client id and name.
  task_assignments: array - Array of task assignment objects associated with the project.
```

--------------------------------

### List Expenses

Source: <https://help.getharvest.com/api-v2/expenses-api/expenses/expenses>

Retrieves a list of expenses, with options to filter by user, client, project, billed status, approval status, and date. Supports pagination for large datasets. The response includes detailed expense objects and pagination metadata.

```APIDOC
GET /v2/expenses

Parameters:
- `user_id` (integer): Filter by user ID.
- `client_id` (integer): Filter by client ID.
- `project_id` (integer): Filter by project ID.
- `is_billed` (boolean): Filter by billed status (true/false).
- `approval_status` (string): Filter by approval status ('unsubmitted', 'submitted', 'approved').
- `updated_since` (datetime): Filter by update date and time.
- `from` (date): Filter by start date for 'spent_date'.
- `to` (date): Filter by end date for 'spent_date'.
- `page` (integer): Page number for pagination (default: 1).
- `per_page` (integer): Records per page (1-2000, default: 2000).

Response Structure:
- `expenses` (array): Array of expense objects.
- `per_page` (integer): Number of records per page.
- `total_pages` (integer): Total number of pages.
- `total_entries` (integer): Total number of entries.
- `next_page` (integer | null): Next page number.
- `previous_page` (integer | null): Previous page number.
- `page` (integer): Current page number.
- `links` (object): Pagination links.
```

```curl
curl "https://api.harvestapp.com/v2/expenses" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"
```

```json
{
  "expenses": [
    {
      "id": 15296442,
      "notes": "Lunch with client",
      "total_cost": 33.35,
      "units": 1.0,
      "is_closed": false,
      "approval_status": "unsubmitted",
      "is_locked": true,
      "is_billed": true,
      "locked_reason": "Expense is invoiced.",
      "spent_date": "2017-03-03",
      "created_at": "2017-06-27T15:09:54Z",
      "updated_at": "2017-06-27T16:47:14Z",
      "billable": true,
      "receipt": {
        "url": "https://{ACCOUNT_SUBDOMAIN}.harvestapp.com/expenses/15296442/receipt",
        "file_name": "lunch_receipt.gif",
        "file_size": 39410,
        "content_type": "image/gif"
      },
      "user": {
        "id": 1782959,
        "name": "Kim Allen"
      },
      "user_assignment": {
        "id": 125068553,
        "is_project_manager": true,
        "is_active": true,
        "budget": null,
        "created_at": "2017-06-26T22:32:52Z",
        "updated_at": "2017-06-26T22:32:52Z",
        "hourly_rate": 100.0
      },
      "project": {
        "id": 14307913,
        "name": "Marketing Website",
        "code": "MW"
      },
      "expense_category": {
        "id": 4195926,
        "name": "Meals",
        "unit_price": null,
        "unit_name": null
      },
      "client": {
        "id": 5735774,
        "name": "ABC Corp",
        "currency": "USD"
      },
      "invoice": {
        "id": 13150403,
        "number": "1001"
      }
    },
    {
      "id": 15296423,
      "notes": "Hotel stay for meeting",
      "total_cost": 100.0,
      "units": 1.0,
      "is_closed": true,
      "approval_status": "approved",
      "is_locked": true,
      "is_billed": false,
      "locked_reason": "The project is locked for this time period.",
      "spent_date": "2017-03-01",
      "created_at": "2017-06-27T15:09:17Z",
      "updated_at": "2017-06-27T16:47:14Z",
      "billable": true,
      "receipt": null,
      "user": {
        "id": 1782959,
        "name": "Kim Allen"
      },
      "user_assignment": {
        "id": 125068554,
        "is_project_manager": true,
        "is_active": true,
        "budget": null,
        "created_at": "2017-06-26T22:32:52Z",
        "updated_at": "2017-06-26T22:32:52Z",
        "hourly_rate": 100.0
      },
      "project": {
        "id": 14308069,
        "name": "Online Store - Phase 1",
        "code": "OS1"
      },
      "expense_category": {
        "id": 4197501,
        "name": "Lodging",
        "unit_price": null,
        "unit_name": null
      },
      "client": {
        "id": 5735776,
        "name": "123 Industries",
        "currency": "EUR"
      },
      "invoice": null
    }
  ],
  "per_page": 2000,
  "total_pages": 1,
  "total_entries": 2,
  "next_page": null,
  "previous_page": null,
  "page": 1,
  "links": {
    "first": "https://api.harvestapp.com/v2/expenses?page=1&per_page=2000",
    "next": null,
    "previous": null,
    "last": "https://api.harvestapp.com/v2/expenses?page=1&per_page=2000"
  }
}
```

--------------------------------

### Harvest API V2 Reports

Source: <https://help.getharvest.com/api-v2/reports-api/index>

Documentation for the Harvest API V2, specifically covering various reports. This includes Expense Reports, Uninvoiced Report, Time Reports, and Project Budget Report.

```APIDOC
Reports API:
  Expense Reports
  Uninvoiced Report
  Time Reports
  Project Budget Report
```

--------------------------------

### Retrieve Harvest API V2 Company Information

Source: <https://help.getharvest.com/api-v2/company-api/company/company>

Retrieves the company details for the currently authenticated user. This API call returns a company object and a `200 OK` response code.

```APIDOC
GET /v2/company

Retrieves the company for the currently authenticated user. Returns a company object and a `200 OK` response code.

Example Request:
```bash
curl "https://api.harvestapp.com/v2/company" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"
```

Example Response:

```json
{
  "base_uri": "https://{ACCOUNT_SUBDOMAIN}.harvestapp.com",
  "full_domain": "{ACCOUNT_SUBDOMAIN}.harvestapp.com",
  "name": "API Examples",
  "is_active": true,
  "week_start_day": "Monday",
  "wants_timestamp_timers": true,
  "time_format": "hours_minutes",
  "date_format": "%Y-%m-%d",
  "plan_type": "sponsored",
  "expense_feature": true,
  "invoice_feature": true,
  "estimate_feature": true,
  "approval_feature": true,
  "clock": "12h",
  "currency_code_display": "iso_code_none",
  "currency_symbol_display": "symbol_before",
  "decimal_symbol": ".",
  "thousands_separator": ",",
  "color_scheme": "orange",
  "weekly_capacity": 126000
}
```

```

--------------------------------

### Create Invoice Payment - Harvest API v2

Source: https://help.getharvest.com/api-v2/invoices-api/invoices/invoice-payments

Creates a new invoice payment object. Requires invoice ID, amount, and optionally payment date/time, notes, and a thank you email flag. Returns a 201 Created status.

```APIDOC
POST /v2/invoices/{INVOICE_ID}/payments

Parameters:
  amount (decimal, required): The amount of the payment.
  paid_at (datetime, optional): Date and time the payment was made. Use either paid_at or paid_date.
  paid_date (date, optional): Date the payment was made. Use either paid_at or paid_date.
  notes (string, optional): Any notes to be associated with the payment.
  send_thank_you (boolean, optional): Whether to send a thank you email if the invoice is fully paid. Defaults to true.
```

```bash
curl "https://api.harvestapp.com/v2/invoices/13150378/payments" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"amount":1575.86,"paid_at":"2017-07-24T13:32:18Z","notes":"Paid by phone"}'
```

--------------------------------

### Harvest API V2 Reports

Source: <https://help.getharvest.com/api-v2/reports-api>

Documentation for the Harvest API V2, specifically covering various reports. This includes Expense Reports, Uninvoiced Report, Time Reports, and Project Budget Report.

```APIDOC
Reports API:
  Expense Reports
  Uninvoiced Report
  Time Reports
  Project Budget Report
```

--------------------------------

### Create Invoice

Source: <https://help.getharvest.com/api-v2/invoices-api/invoices/invoices>

Creates a new invoice object in Harvest v2. This endpoint allows for detailed customization of invoices by specifying client information, financial details like tax and discounts, dates, payment terms, and how to import associated time and expense data.

```APIDOC
POST /v2/invoices

Parameters:
- client_id (integer, required): The ID of the client this invoice belongs to.
- estimate_id (integer, optional): The ID of the estimate associated with this invoice.
- number (string, optional): If no value is set, the number will be automatically generated.
- purchase_order (string, optional): The purchase order number.
- tax (decimal, optional): This percentage is applied to the subtotal, including line items and discounts. Example: use 10.0 for 10.0%.
- tax2 (decimal, optional): This percentage is applied to the subtotal, including line items and discounts. Example: use 10.0 for 10.0%.
- discount (decimal, optional): This percentage is subtracted from the subtotal. Example: use 10.0 for 10.0%.
- subject (string, optional): The invoice subject.
- notes (string, optional): Any additional notes to include on the invoice.
- currency (string, optional): The currency used by the invoice. If not provided, the client’s currency will be used. See a list of supported currencies.
- issue_date (date, optional): Date the invoice was issued. Defaults to today’s date.
- due_date (date, optional): Date the invoice is due. Defaults to the `issue_date` if no `payment_term` is specified. To set a custom `due_date` the `payment_term` must also be set to `custom`, otherwise the value supplied in the request for `due_date` will be ignored and the `due_date` will be calculated using the `issue_date` and the `payment_term`.
- payment_term (string, optional): The timeframe in which the invoice should be paid. Defaults to `custom`. Options: `upon receipt`, `net 15`, `net 30`, `net 45`, `net 60`, or `custom`.
- payment_options (array, optional): The payment options available to pay the invoice. Your account must be configured with the appropriate options under Settings > Integrations > Online payment to assign them. Options: [`ach`, `credit_card`, `paypal`]
- line_items_import (object, optional): An line items import object.
  - project_ids (array, required): An array of the client’s project IDs you’d like to include time/expenses from.
  - time (object, optional): A time import object.
    - summary_type (string, required): How to summarize the time entries per line item. Options: `project`, `task`, `people`, or `detailed`.
    - from (date, optional): Start date for included time entries. Must be provided if `to` is present. If neither `from` or `to` are provided, all unbilled time entries will be included.
    - to (date, optional): End date for included time entries. Must be provided if `from` is present. If neither `from` or `to` are provided, all unbilled time entries will be included.
  - expenses (object, optional): An expense import object.
    - summary_type (string, required): How to summarize the expenses per line item. Options: `project`, `category`, `people`, or `detailed`.
    - from (date, optional): Start date for included expenses. Must be provided if `to` is present. If neither `from` or `to` are provided, all unbilled expenses will be included.
    - to (date, optional): End date for included expenses. Must be provided if `from` is present. If neither `from` or `to` are provided, all unbilled expenses will be included.
    - attach_receipts (boolean, optional): If set to `true`, a PDF containing an expense report with receipts will be attached to the invoice. Defaults to `false`.
```

--------------------------------

### List User Assignments

Source: <https://help.getharvest.com/api-v2/projects-api/projects/user-assignments>

Fetches a list of user assignments, sorted by creation date. Supports filtering by user ID, active status, and update time. Includes pagination parameters.

```APIDOC
GET /v2/user_assignments

Parameters:
- user_id (integer): Filter by user ID.
- is_active (boolean): Filter by active status (true/false).
- updated_since (datetime): Filter by update timestamp.
- page (integer): DEPRECATED. Page number for pagination.
- per_page (integer): Number of records per page (1-2000).

Response:
- user_assignments (array): Array of user assignment objects.
- per_page (integer): Records per page.
- total_pages (integer): Total number of pages.
- total_entries (integer): Total number of entries.
- next_page (string): URL for the next page.
- previous_page (string): URL for the previous page.
- page (integer): Current page number.
- links (object): Pagination links.
```

```curl
curl "https://api.harvestapp.com/v2/user_assignments" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"
```

--------------------------------

### Harvest API V2 HTTP Status Codes

Source: <https://help.getharvest.com/api-v2/introduction/overview/general>

Lists common HTTP status codes returned by the Harvest API V2 and their meanings, aiding in understanding request outcomes.

```APIDOC
Code | Explanation
---|---
200 | Your request was successful.
201 | A new object has been created. Its representation will be returned in the response body.
403 | The object you requested was found but you don’t have authorization to perform your request.
404 | The object you requested can’t be found.
422 | There were errors processing your request. Check the response body for additional information.
429 | Your request has been throttled. Refer to the Rate Limiting section for details.
500 | There was a server error. Contact support@getharvest.com for help.
```

--------------------------------

### Retrieve Project by ID

Source: <https://help.getharvest.com/api-v2/projects-api/projects/projects>

Fetches the details of a specific project using its unique ID. Returns a single project object upon successful retrieval.

```APIDOC
GET /v2/projects/{PROJECT_ID}

Parameters:
- `PROJECT_ID` (integer): The ID of the project to retrieve.

Response:
- A single project object containing all project details.
```

```curl
curl "https://api.harvestapp.com/v2/projects/14308069" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"
```

--------------------------------

### Harvest API V2 Client Object Attributes

Source: <https://help.getharvest.com/api-v2/clients-api/clients/clients>

Defines the attributes of a client object in the Harvest API V2. Includes fields like ID, name, active status, address, statement key, currency, and creation/update timestamps.

```APIDOC
Attribute | Type | Description  
---|---|---  
`id` | integer | Unique ID for the client.  
`name` | string | A textual description of the client.  
`is_active` | boolean | Whether the client is active or archived.  
`address` | string | The physical address for the client.  
`statement_key` | string | Used to build a URL to your client’s invoice dashboard:  
`https://{ACCOUNT_SUBDOMAIN}.harvestapp.com/client/statements/{STATEMENT_KEY}`  
`currency` | string | The currency code associated with this client.  
`created_at` | datetime | Date and time the client was created.  
`updated_at` | datetime | Date and time the client was last updated.
```

--------------------------------

### Harvest API V2 Permissions

Source: <https://help.getharvest.com/api-v2/estimates-api/estimates/estimates>

Outlines the required user permissions to interact with the Harvest API V2, specifically for the `/v2/estimates` endpoint. Insufficient permissions result in a 403 Forbidden status code.

```APIDOC
Required Permissions:
  - Administrator or Manager role with permission to create and edit estimates.

Error on Insufficient Permissions:
  - Status Code: 403 Forbidden
```

--------------------------------

### Harvest API V2 Estimate Line Item Object Schema

Source: <https://help.getharvest.com/api-v2/estimates-api/estimates/estimates>

Defines the structure and attributes of an estimate line item object within the Harvest API V2. Includes details on ID, kind, description, quantity, unit price, amount, and tax applicability.

```APIDOC
Estimate Line Item Object:
  id: integer - Unique ID for the line item.
  kind: string - The name of an estimate item category.
  description: string - Text description of the line item.
  quantity: integer - The unit quantity of the item.
  unit_price: decimal - The individual price per unit.
  amount: decimal - The line item subtotal (`quantity` * `unit_price`).
  taxed: boolean - Whether the estimate’s `tax` percentage applies to this line item.
  taxed2: boolean - Whether the estimate’s `tax2` percentage applies to this line item.
```

--------------------------------

### Create Contact - Harvest API v2

Source: <https://help.getharvest.com/api-v2/clients-api/clients/contacts>

Creates a new contact using a POST request. Requires `client_id` and `first_name`. Optional parameters include `title`, `last_name`, `email`, `phone_office`, `phone_mobile`, and `fax`. Returns the created contact object and a 201 Created status.

```APIDOC
POST /v2/contacts

Parameters:
  client_id (integer, required): The ID of the client associated with this contact.
  title (string, optional): The title of the contact.
  first_name (string, required): The first name of the contact.
  last_name (string, optional): The last name of the contact.
  email (string, optional): The contact’s email address.
  phone_office (string, optional): The contact’s office phone number.
  phone_mobile (string, optional): The contact’s mobile phone number.
  fax (string, optional): The contact’s fax number.
```

```curl
curl "https://api.harvestapp.com/v2/contacts" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"client_id":5735776,"first_name":"George","last_name":"Frank","email":"georgefrank@example.com"}'
```

```json
{
  "id": 4706510,
  "title": null,
  "first_name": "George",
  "last_name": "Frank",
  "email": "georgefrank@example.com",
  "phone_office": "",
  "phone_mobile": "",
  "fax": "",
  "created_at": "2019-06-26T21:44:57Z",
  "updated_at": "2019-06-26T21:44:57Z",
  "client": {
    "id": 5735776,
    "name": "123 Industries"
  }
}
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<contacts type="array">
    <contact>
        <id type="integer">4706510</id>
        <client-id type="integer">5735776</client-id>
        <title>null</title>
        <first-name>George</first-name>
        <last-name>Frank</last-name>
        <email>georgefrank@example.com</email>
        <phone-office></phone-office>
        <phone-mobile></phone-mobile>
        <fax></fax>
        <created-at type="dateTime">2019-06-26T21:44:57Z</created-at>
        <updated-at type="dateTime">2019-06-26T21:44:57Z</updated-at>
    </contact>
</contacts>
```

--------------------------------

### Update Harvest API V2 Company Settings

Source: <https://help.getharvest.com/api-v2/company-api/company/company>

Updates company settings by passing the desired parameter values. Any parameters not included in the request will remain unchanged. The API returns the updated company object and a `200 OK` response code upon successful execution.

```APIDOC
PATCH /v2/company

Updates the company setting the values of the parameters passed. Any parameters not provided will be left unchanged. Returns a company object and a `200 OK` response code if the call succeeded.

Parameters:
- `wants_timestamp_timers` (boolean): Whether time is tracked via duration or start and end times.
- `weekly_capacity` (integer): The weekly capacity in seconds.

Example Request:
```bash
curl "https://api.harvestapp.com/v2/company" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"
  -X PATCH \
  -H "Content-Type: application/json" \
  -d '{"weekly_capacity":108000, "wants_timestamp_timers":false}'
```

Example Response:

```json
{
  "base_uri": "https://{ACCOUNT_SUBDOMAIN}.harvestapp.com",
  "full_domain": "{ACCOUNT_SUBDOMAIN}.harvestapp.com",
  "name": "API Examples",
  "is_active": true,
  "week_start_day": "Monday",
  "wants_timestamp_timers": false,
  "time_format": "hours_minutes",
  "date_format": "%Y-%m-%d",
  "plan_type": "sponsored",
  "expense_feature": true,
  "invoice_feature": true,
  "estimate_feature": true,
  "approval_feature": true,
  "clock": "12h",
  "currency_code_display": "iso_code_none",
  "currency_symbol_display": "symbol_before",
  "decimal_symbol": ".",
  "thousands_separator": ",",
  "color_scheme": "orange",
  "weekly_capacity": 108000
}
```

```

--------------------------------

### Harvest API v2 Projects Report

Source: https://help.getharvest.com/api-v2/reports-api/reports/expense-reports

Retrieves a report of expenses categorized by project. Supports filtering by date range and pagination.

```APIDOC
GET /v2/reports/expenses/projects

Parameters:
  from (date, required): Only report on expenses with a spent_date on or after the given date.
  to (date, required): Only report on expenses with a spent_date on or before the given date.
  page (integer, optional): The page number to use in pagination. (Default: 1)
  per_page (integer, optional): The number of records to return per page. Can range between 1 and 2000. (Default: 2000)

Example Request:
curl
"https://api.harvestapp.com/v2/reports/expenses/projects?from=20170101&to=20171231" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"

Example Response:
{"results":[{"client_id":5735774,"client_name":"ABC Corp","project_id":14307913,"project_name":"[MW] Marketing Website","total_amount":133.35,"billable_amount":133.35,"currency":"USD"},{"client_id":5735776,"client_name":"123 Industries","project_id":14308069,"project_name":"[OS1] Online Store - Phase 1","total_amount":100,"billable_amount":100,"currency":"EUR"}],"per_page":2000,"total_pages":1,"total_entries":2,"next_page":null,"previous_page":null,"page":1,"links":{"first":"https://api.harvestapp.com/v2/reports/expenses/projects?from=20170101&page=1&per_page=2000&to=20171231","next":null,"previous":null,"last":"https://api.harvestapp.com/v2/reports/expenses/projects?from=20170101&page=1&per_page=2000&to=20171231"}}
```

```bash
curl
"https://api.harvestapp.com/v2/reports/expenses/projects?from=20170101&to=20171231" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"
```

--------------------------------

### List Project User Assignments

Source: <https://help.getharvest.com/api-v2/projects-api/projects/user-assignments>

Retrieves a paginated list of user assignments for a specific project. Supports filtering by user ID, active status, and update time. Results are sorted by creation date.

```APIDOC
GET /v2/projects/{PROJECT_ID}/user_assignments

Parameters:
- user_id (integer): Filter by user ID.
- is_active (boolean): Filter by active status (true/false).
- updated_since (datetime): Filter by update time.
- page (integer): Page number for pagination (Default: 1).
- per_page (integer): Records per page (1-2000, Default: 2000).

Response:
- user_assignments (array): Array of user assignment objects.
- per_page (integer): Number of records per page.
- total_pages (integer): Total number of pages.
- total_entries (integer): Total number of entries.
- next_page (string): URL for the next page.
- previous_page (string): URL for the previous page.
- page (integer): Current page number.
- links (object): Pagination links.
```

```curl
curl "https://api.harvestapp.com/v2/projects/14308069/user_assignments" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"
```

--------------------------------

### Harvest API V2 Estimate Object Schema

Source: <https://help.getharvest.com/api-v2/estimates-api/estimates/estimates>

Defines the structure and attributes of an estimate object within the Harvest API V2. Includes details on IDs, client information, line items, creator, purchase order, amounts, taxes, discounts, subject, notes, currency, state, and timestamps.

```APIDOC
Estimate Object:
  id: integer - Unique ID for the estimate.
  client: object - An object containing estimate’s client id and name.
  line_items: array - Array of estimate line items.
  creator: object - An object containing the id and name of the person that created the estimate.
  client_key: string - Used to build a URL to the public web invoice for your client: https://{ACCOUNT_SUBDOMAIN}.harvestapp.com/client/estimates/abc123456
  number: string - If no value is set, the number will be automatically generated.
  purchase_order: string - The purchase order number.
  amount: decimal - The total amount for the estimate, including any discounts and taxes.
  tax: decimal - This percentage is applied to the subtotal, including line items and discounts.
  tax_amount: decimal - The first amount of tax included, calculated from `tax`. If no `tax` is defined, this value will be null.
  tax2: decimal - This percentage is applied to the subtotal, including line items and discounts.
  tax2_amount: decimal - The amount calculated from `tax2`.
  discount: decimal - This percentage is subtracted from the subtotal.
  discount_amount: decimal - The amount calculated from `discount`.
  subject: string - The estimate subject.
  notes: string - Any additional notes included on the estimate.
  currency: string - The currency code associated with this estimate.
  state: string - The current state of the estimate: `draft`, `sent`, `accepted`, or `declined`.
  issue_date: date - Date the estimate was issued.
  sent_at: datetime - Date and time the estimate was sent.
  accepted_at: datetime - Date and time the estimate was accepted.
  declined_at: datetime - Date and time the estimate was declined.
  created_at: datetime - Date and time the estimate was created.
  updated_at: datetime - Date and time the estimate was last updated.
```

--------------------------------

### List Active Project Assignments

Source: <https://help.getharvest.com/api-v2/users-api/users/project-assignments>

Fetches active project assignments for a given user ID. Results are sorted by creation date in descending order. Supports filtering by update time and pagination.

```APIDOC
GET /v2/users/{USER_ID}/project_assignments

Parameters:
- `USER_ID` (path parameter): The ID of the user whose project assignments to retrieve.
- `updated_since` (query parameter, datetime): Only return project assignments that have been updated since the given date and time.
- `per_page` (query parameter, integer): The number of records to return per page. Can range between 1 and 2000. (Default: 2000)

Deprecated Parameter:
- `page` (query parameter, integer): The page number to use in pagination. This parameter is deprecated in favor of cursor-based pagination.

Response Structure:
- `project_assignments`: An array of project assignment objects.
- `per_page`: The number of records returned per page.
- `total_pages`: The total number of pages available.
- `total_entries`: The total number of project assignments.
- `next_page`: URL for the next page of results.
- `previous_page`: URL for the previous page of results.
- `page`: The current page number.
- `links`: Contains URLs for first, next, previous, and last pages.

Example Request:
```curl
curl "https://api.harvestapp.com/v2/users/1782959/project_assignments" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"
```

Example Response:

```json
{"project_assignments":[{"id":125068554,"is_project_manager":true,"is_active":true,"use_default_rates":true,"budget":null,"created_at":"2017-06-26T22:32:52Z","updated_at":"2017-06-26T22:32:52Z","hourly_rate":100.0,"project":{"id":14308069,"name":"Online Store - Phase 1","code":"OS1"},"client":{"id":5735776,"name":"123 Industries"},"task_assignments":[{"id":155505013,"billable":true,"is_active":true,"created_at":"2017-06-26T21:52:18Z","updated_at":"2017-06-26T21:52:18Z","hourly_rate":100.0,"budget":null,"task":{"id":8083365,"name":"Graphic Design"}},{"id":155505014,"billable":true,"is_active":true,"created_at":"2017-06-26T21:52:18Z","updated_at":"2017-06-26T21:52:18Z","hourly_rate":100.0,"budget":null,"task":{"id":8083366,"name":"Programming"}},{"id":155505015,"billable":true,"is_active":true,"created_at":"2017-06-26T21:52:18Z","updated_at":"2017-06-26T21:52:18Z","hourly_rate":100.0,"budget":null,"task":{"id":8083368,"name":"Project Management"}},{"id":155505016,"billable":false,"is_active":true,"created_at":"2017-06-26T21:52:18Z","updated_at":"2017-06-26T21:54:06Z","hourly_rate":100.0,"budget":null,"task":{"id":8083369,"name":"Research"}}]},{"id":125068553,"is_project_manager":true,"is_active":true,"use_default_rates":false,"budget":null,"created_at":"2017-06-26T22:32:52Z","updated_at":"2017-06-26T22:32:52Z","hourly_rate":100.0,"project":{"id":14307913,"name":"Marketing Website","code":"MW"},"client":{"id":5735774,"name":"ABC Corp"},"task_assignments":[{"id":155502709,"billable":true,"is_active":true,"created_at":"2017-06-26T21:36:23Z","updated_at":"2017-06-26T21:36:23Z","hourly_rate":100.0,"budget":null,"task":{"id":8083365,"name":"Graphic Design"}},{"id":155502710,"billable":true,"is_active":true,"created_at":"2017-06-26T21:36:23Z","updated_at":"2017-06-26T21:36:23Z","hourly_rate":100.0,"budget":null,"task":{"id":8083366,"name":"Programming"}},{"id":155502711,"billable":true,"is_active":true,"created_at":"2017-06-26T21:36:23Z","updated_at":"2017-06-26T21:36:23Z","hourly_rate":100.0,"budget":null,"task":{"id":8083368,"name":"Project Management"}},{"id":155505153,"billable":false,"is_active":true,"created_at":"2017-06-26T21:53:20Z","updated_at":"2017-06-26T21:54:31Z","hourly_rate":100.0,"budget":null,"task":{"id":8083369,"name":"Research"}}]}],"per_page":2000,"total_pages":1,"total_entries":2,"next_page":null,"previous_page":null,"page":1,"links":{"first":"https://api.harvestapp.com/v2/users/1782959/project_assignments?page=1&per_page=2000","next":null,"previous":null,"last":"https://api.harvestapp.com/v2/users/1782959/project_assignments?page=1&per_page=2000"}}

```

--------------------------------

### Update Project - Harvest API v2

Source: <https://help.getharvest.com/api-v2/projects-api/projects/projects>

Updates a specific project by setting the values of the parameters passed. Any parameters not provided will be left unchanged. Returns a project object and a 200 OK response code if the call succeeded.

```APIDOC
PATCH /v2/projects/{PROJECT_ID}

Parameters:
- client_id (integer): The ID of the client to associate this project with.
- name (string): The name of the project.
- code (string): The code associated with the project.
- is_active (boolean): Whether the project is active or archived. Defaults to true.
- is_billable (boolean): Whether the project is billable or not.
- is_fixed_fee (boolean): Whether the project is a fixed-fee project or not.
- bill_by (string): The method by which the project is invoiced. Options: Project, Tasks, People, or none.
- hourly_rate (decimal): Rate for projects billed by Project Hourly Rate.
- budget_by (string): The method by which the project is budgeted. Options: project (Hours Per Project), project_cost (Total Project Fees), task (Hours Per Task), task_fees (Fees Per Task), person (Hours Per Person), none (No Budget).
- budget_is_monthly (boolean): Option to have the budget reset every month. Defaults to false.
- budget (decimal): The budget in hours for the project when budgeting by time.
- cost_budget (decimal): The monetary budget for the project when budgeting by money.
- cost_budget_include_expenses (boolean): Option for budget of Total Project Fees projects to include tracked expenses. Defaults to false.
- notify_when_over_budget (boolean): Whether Project Managers should be notified when the project goes over budget. Defaults to false.
- over_budget_notification_percentage (decimal): Percentage value used to trigger over budget email alerts. Example: use 10.0 for 10.0%.
- show_budget_to_all (boolean): Option to show project budget to all employees. Does not apply to Total Project Fee projects. Defaults to false.
- fee (decimal): The amount you plan to invoice for the project. Only used by fixed-fee projects.
- notes (string): Project notes.
- starts_on (date): Date the project was started.
- ends_on (date): Date the project will end.
```

--------------------------------

### Harvest API V2 Supported Currencies

Source: <https://help.getharvest.com/api-v2/introduction/overview/supported-currencies>

Lists the currencies supported by the Harvest API v2. The 'Code' column provides the identifier to be used in the 'currency' field of API requests.

```APIDOC
Name | Code  
---|--  
United States Dollar | USD  
Euro | EUR  
British Pound | GBP  
Australian Dollar | AUD  
Canadian Dollar | CAD  
Japanese Yen | JPY  
United Arab Emirates Dirham | AED  
Afghan Afghani | AFN  
Albanian Lek | ALL  
Armenian Dram | AMD  
Netherlands Antillean Gulden | ANG  
Angolan Kwanza | AOA  
Argentine Peso | ARS  
Aruban Florin | AWG  
Azerbaijani Manat | AZN  
Bosnia and Herzegovina Convertible Mark | BAM  
Barbadian Dollar | BBD  
Bangladeshi Taka | BDT  
Bulgarian Lev | BGN  
Bahraini Dinar | BHD  
Burundian Franc | BIF  
Bermudian Dollar | BMD  
Brunei Dollar | BND  
Bolivian Boliviano | BOB  
Brazilian Real | BRL  
Bahamian Dollar | BSD  
Bhutanese Ngultrum | BTN  
Botswana Pula | BWP  
Belarusian Ruble | BYN  
Belarusian Ruble | BYR  
Belize Dollar | BZD  
Congolese Franc | CDF  
Swiss Franc | CHF  
Unidad de Fomento | CLF  
Chilean Peso | CLP  
Chinese Renminbi Yuan | CNY  
Colombian Peso | COP  
Costa Rican Colón | CRC  
Cuban Convertible Peso | CUC  
Cuban Peso | CUP  
Cape Verdean Escudo | CVE  
Czech Koruna | CZK  
Djiboutian Franc | DJF  
Danish Krone | DKK  
Dominican Peso | DOP  
Algerian Dinar | DZD  
Egyptian Pound | EGP  
Eritrean Nakfa | ERN  
Ethiopian Birr | ETB  
Fijian Dollar | FJD  
Falkland Pound | FKP  
Georgian Lari | GEL  
Ghanaian Cedi | GHS  
Gibraltar Pound | GIP  
Gambian Dalasi | GMD  
Guinean Franc | GNF  
Guatemalan Quetzal | GTQ  
Guyanese Dollar | GYD  
Hong Kong Dollar | HKD  
Honduran Lempira | HNL  
Croatian Kuna | HRK  
Haitian Gourde | HTG  
Hungarian Forint | HUF  
Indonesian Rupiah | IDR  
Israeli New Sheqel | ILS  
Indian Rupee | INR  
Iraqi Dinar | IQD  
Iranian Rial | IRR  
Icelandic Króna | ISK  
Jamaican Dollar | JMD  
Jordanian Dinar | JOD  
Kenyan Shilling | KES  
Kyrgyzstani Som | KGS  
Cambodian Riel | KHR  
Comorian Franc | KMF  
North Korean Won | KPW  
South Korean Won | KRW  
Kuwaiti Dinar | KWD  
Cayman Islands Dollar | KYD  
Kazakhstani Tenge | KZT  
Lao Kip | LAK  
Lebanese Pound | LBP  
Sri Lankan Rupee | LKR  
Liberian Dollar | LRD  
Lesotho Loti | LSL  
Lithuanian Litas | LTL  
Latvian Lats | LVL  
Libyan Dinar | LYD  
Moroccan Dirham | MAD  
Moldovan Leu | MDL  
Malagasy Ariary | MGA  
Macedonian Denar | MKD  
Myanmar Kyat | MMK  
Mongolian Tögrög | MNT  
Macanese Pataca | MOP  
Mauritanian Ouguiya | MRO  
Mauritian Rupee | MUR  
Maldivian Rufiyaa | MVR  
Malawian Kwacha | MWK  
Mexican Peso | MXN  
Malaysian Ringgit | MYR  
Mozambican Metical | MZN  
Namibian Dollar | NAD  
Nigerian Naira | NGN  
Nicaraguan Córdoba | NIO  
Norwegian Krone | NOK  
Nepalese Rupee | NPR  
New Zealand Dollar | NZD  
Omani Rial | OMR  
Panamanian Balboa | PAB  
Peruvian Sol | PEN  
Papua New Guinean Kina | PGK  
Philippine Peso | PHP  
Pakistani Rupee | PKR  
Polish Złoty | PLN  
Paraguayan Guaraní | PYG  
Qatari Riyal | QAR  
Romanian Leu | RON  
Serbian Dinar | RSD  
Russian Ruble | RUB  
Rwandan Franc | RWF  
Saudi Riyal | SAR  
Solomon Islands Dollar | SBD  
Seychellois Rupee | SCR  
Sudanese Pound | SDG  
Swedish Krona | SEK  
Singapore Dollar | SGD  
Saint Helenian Pound | SHP  
Slovak Koruna | SKK  
Sierra Leonean Leone | SLL  
Somali Shilling | SOS  
Surinamese Dollar | SRD  
South Sudanese Pound | SSP  
São Tomé and Príncipe Dobra | STD  
Salvadoran Colón | SVC  
Syrian Pound | SYP  
Swazi Lilangeni | SZL  
Thai Baht | THB  
Tajikistani Somoni | TJS  
Turkmenistani Manat | TMT  
Tunisian Dinar | TND  
Tongan Paʻanga | TOP  
Turkish Lira | TRY  
Trinidad and Tobago Dollar | TTD  
New Taiwan Dollar | TWD  
Tanzanian Shilling | TZS  
Ukrainian Hryvnia | UAH  
Ugandan Shilling | UGX  
Uruguayan Peso | UYU  
Uzbekistan Som | UZS  
Venezuelan Bolívar | VEF  
Vietnamese Đồng | VND  
Vanuatu Vatu | VUV  
Samoan Tala | WST  
Central African Cfa Franc | XAF  
Silver (Troy Ounce) | XAG  
Gold (Troy Ounce) | XAU  
European Composite Unit | XBA  
European Monetary Unit | XBB  
European Unit of Account 9 | XBC  
European Unit of Account 17 | XBD  
East Caribbean Dollar | XCD  
Special Drawing Rights | XDR  
West African Cfa Franc | XOF  
Palladium | XPD  
Cfp Franc | XPF  
Platinum | XPT  
Yemeni Rial | YER  
South African Rand | ZAR  
Zambian Kwacha | ZMK  
Zambian Kwacha | ZMW
```

--------------------------------

### Harvest API v2 Implicit Grant Flow (Client-Side)

Source: <https://help.getharvest.com/api-v2/authentication-api/authentication/authentication>

Initiates the OAuth2 Implicit Grant flow for client-side applications running in the browser. Redirects the user to Harvest ID for authentication and authorization, directly returning an access token.

```APIDOC
Authorization URL:
https://id.getharvest.com/oauth2/authorize?client_id={CLIENT_ID}&response_type=token

Parameters:
  client_id: Your OAuth2 application's client ID.
  response_type: Must be 'token' for Implicit Grant flow.
  state (optional): Used to pass any value that will be sent back upon redirection.
  redirect_uri (optional): Customizes the redirect URL, must start with the registered Redirect URL.

Redirect Parameters (after successful authorization):
  access_token: The access token for authenticating requests.
  token_type: Will always be 'bearer'.
  expires_in: Time in seconds until the token expires.
  state (optional): Original value of the state parameter.
  scope: Granted access scope.
```

--------------------------------

### Project Budget Report Result Object Structure

Source: <https://help.getharvest.com/api-v2/reports-api/reports/project-budget-report>

Defines the structure of each result object within the Project Budget Report. It details attributes such as client and project identifiers, budget configuration (monthly, by method), activity status, and budget amounts (total, spent, remaining). Visibility of budget amounts may be restricted based on user permissions.

```APIDOC
Result Object Attributes:
  client_id (integer): The ID of the client associated with this project.
  client_name (string): The name of the client associated with this project.
  project_id (integer): The ID of the project.
  project_name (string): The name of the project.
  budget_is_monthly (boolean): Whether the budget is reset every month.
  budget_by (string): The method by which the project is budgeted. Options: project (Hours Per Project), project_cost (Total Project Fees), task (Hours Per Task), task_fees (Fees Per Task), person (Hours Per Person), none (No Budget).
  is_active (boolean): Whether the project is active or archived.
  budget (decimal): The budget in hours or money for the project when budgeting by time. Visible to Administrators and Project Managers with 'View billable rates and amounts' permission if budgeted by money.
  budget_spent (decimal): The total hours or money spent against the project’s budget. If 'Time Rounding' is on, hours are rounded. Visible to Administrators and Project Managers with 'View billable rates and amounts' permission if budgeted by money.
  budget_remaining (decimal): The total hours or money remaining in the project’s budget. If 'Time Rounding' is on, hours are rounded. Visible to Administrators and Project Managers with 'View billable rates and amounts' permission if budgeted by money.
```

--------------------------------

### Harvest API V2 User Assignment Permissions

Source: <https://help.getharvest.com/api-v2/projects-api/projects/user-assignments>

Outlines the required permissions to interact with the /v2/user_assignments endpoint in the Harvest API v2. Access is restricted to Administrators or Managers with assigned teammates or managed projects.

```APIDOC
Required Permissions:
  - Administrator role OR
  - Manager role with assigned teammates or managed projects.

Insufficient permissions will result in a `403 Forbidden` status code.
```

--------------------------------

### Create Time Entry (Duration)

Source: <https://help.getharvest.com/api-v2/timesheets-api/timesheets/time-entries>

Creates a new time entry object when the account tracks time via duration. Returns a time entry object and a 201 Created response code.

```APIDOC
POST /v2/time_entries

Parameters:
- user_id (integer, optional): The ID of the user to associate with the time entry. Defaults to the currently authenticated user’s ID.
- project_id (integer, required): The ID of the project to associate with the time entry.
- task_id (integer, required): The ID of the task to associate with the time entry.
- spent_date (date, required): The ISO 8601 formatted date the time entry was spent.
- hours (decimal, optional): The current amount of time tracked. If provided, the time entry will be created with the specified hours and is_running will be set to false. If not provided, hours will be set to 0.0 and is_running will be set to true.
- notes (string, optional): Any notes to be associated with the time entry.
- external_reference (object, optional): An object containing the id, group_id, account_id, and permalink of the external reference.
```

```Shell
curl "https://api.harvestapp.com/v2/time_entries" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"user_id":1782959,"project_id":14307913,"task_id":8083365,"spent_date":"2017-03-21","hours":1.0}'
```

```JSON
{"id":636718192,"spent_date":"2017-03-21","user":{"id":1782959,"name":"Kim Allen"},"client":{"id":5735774,"name":"ABC Corp"},"project":{"id":14307913,"name":"Marketing Website"},"task":{"id":8083365,"name":"Graphic Design"},"user_assignment":{"id":125068553,"is_project_manager":true,"is_active":true,"budget":null,"created_at":"2017-06-26T22:32:52Z","updated_at":"2017-06-26T22:32:52Z","hourly_rate":100.0,"budget":null},"task_assignment":{"id":155502709,"billable":true,"is_active":true,"created_at":"2017-06-26T21:36:23Z","updated_at":"2017-06-26T21:36:23Z","hourly_rate":100.0,"budget":null},"hours":1.0,"rounded_hours":1.0,"notes":null,"created_at":"2017-06-27T16:01:23Z","updated_at":"2017-06-27T16:01:23Z","is_locked":false,"locked_reason":null,"is_closed":false,"approval_status":"unsubmitted","is_billed":false,"timer_started_at":null,"started_time":null,"ended_time":null,"is_running":false,"invoice":null,"external_reference":null,"billable":true,"budgeted":true,"billable_rate":100.0,"cost_rate":50.0}
```

--------------------------------

### List Invoices

Source: <https://help.getharvest.com/api-v2/invoices-api/invoices/invoices>

Fetches a list of invoices, sorted by issue date in descending order. Allows filtering by client ID, project ID, update timestamp, issue date range, and invoice state. Supports pagination with `page` and `per_page` parameters.

```APIDOC
GET /v2/invoices

Parameters:
- `client_id` (integer): Filter by client ID.
- `project_id` (integer): Filter by project ID.
- `updated_since` (datetime): Filter by update date and time.
- `from` (date): Filter by issue date on or after this date.
- `to` (date): Filter by issue date on or before this date.
- `state` (string): Filter by invoice state. Options: `draft`, `open`, `paid`, `closed`.
- `page` (integer): Page number for pagination. (Default: 1)
- `per_page` (integer): Number of records per page. (Range: 1-2000, Default: 100)

Example Request:
```curl
https://api.harvestapp.com/v2/invoices \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"
```

Example Response:

```json
{"invoices":[{"id":13150403,"client_key":"21312da13d457947a217da6775477afee8c2eba8","number":"1001","purchase_order":"","amount":288.9,"due_amount":288.9,"tax":5,"tax_amount":13.5,"tax2":2,"tax2_amount":5.4,"discount":10,"discount_amount":30,"subject":"Online Store - Phase 1","notes":"Some notes about the invoice.","state":"open","period_start":"2017-03-01","period_end":"2017-03-01","issue_date":"2017-04-01","due_date":"2017-04-01","payment_term":"upon receipt","sent_at":"2017-08-23T22:25:59Z","paid_at":null,"paid_date":null,"closed_at":null,"recurring_invoice_id":null,"created_at":"2017-06-27T16:27:16Z","updated_at":"2017-08-23T22:25:59Z","currency":"EUR","payment_options":["credit_card"],"client":{"id":5735776,"name":"123 Industries"},"estimate":null,"retainer":null,"creator":{"id":1782884,"name":"Bob Powell"},"line_items":[{"id":53341602,"kind":"Service","description":"03/01/2017 - Project Management: [9:00am - 11:00am] Planning meetings","quantity":2,"unit_price":100,"amount":200,"taxed":true,"taxed2":true,"project":{"id":14308069,"name":"Online Store - Phase 1","code":"OS1"}},{"id":53341603,"kind":"Service","description":"03/01/2017 - Programming: [1:00pm - 2:00pm] Importing products","quantity":1,"unit_price":100,"amount":100,"taxed":true,"taxed2":true,"project":{"id":14308069,"name":"Online Store - Phase 1","code":"OS1"}}]},{"id":13150378,"client_key":"9e97f4a65c5b83b1fc02f54e5a41c9dc7d458542","number":"1000","purchase_order":"1234","amount":10700.0,"due_amount":0.0,"tax":5.0,"tax_amount":500.0,"tax2":2.0,"tax2_amount":200.0,"discount":null,"discount_amount":0.0,"subject":"Online Store - Phase 1","notes":"Some notes about the invoice.","state":"paid","period_start":null,"period_end":null,"issue_date":"2017-02-01","due_date":"2017-03-03","payment_term":"custom","sent_at":"2017-02-01T07:00:00Z","paid_at":"2017-02-21T00:00:00Z","paid_date":"2017-02-21","closed_at":null,"recurring_invoice_id":null,"created_at":"2017-06-27T16:24:30Z","updated_at":"2017-06-27T16:24:57Z","currency":"USD","client":{"id":5735776,"name":"123 Industries"},"estimate":{"id":1439814},"retainer":null,"creator":{"id":1782884,"name":"Bob Powell"},"line_items":[{"id":53341450,"kind":"Service","description":"50% of Phase 1 of the Online Store","quantity":100.0,"unit_price":100.0,"amount":10000.0,"taxed":true,"taxed2":true,"project":{"id":14308069,"name":"Online Store - Phase 1","code":"OS1"}}]}],"per_page":100,"total_pages":1,"total_entries":2,"next_page":null,"previous_page":null,"page":1,"links":{"first":"https://api.harvestapp.com/v2/invoices?page=1&per_page=100","next":null,"previous":null,"last":"https://api.harvestapp.com/v2/invoices?page=1&per_page=100"}}

```

--------------------------------

### Harvest API v2 Authorization Code Flow (Server-Side)

Source: <https://help.getharvest.com/api-v2/authentication-api/authentication/authentication>

Initiates the OAuth2 Authorization Code flow for server-side applications. Redirects the user to Harvest ID for authentication and authorization. The returned authorization code is then exchanged for access and refresh tokens.

```APIDOC
Authorization URL:
https://id.getharvest.com/oauth2/authorize?client_id={CLIENT_ID}&response_type=code

Parameters:
  client_id: Your OAuth2 application's client ID.
  response_type: Must be 'code' for Authorization Code flow.
  state (optional): Used to pass any value that will be sent back upon redirection.
  redirect_uri (optional): Customizes the redirect URL, must start with the registered Redirect URL.

Redirect Parameters (after successful authorization):
  code: Authorization code to exchange for tokens.
  state (optional): Original value of the state parameter.
  scope: Granted access scope.

Token Exchange Request:
curl -X POST \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -d "code=$AUTHORIZATION_CODE" \
  -d "client_id=$CLIENT_ID" \
  -d "client_secret=$CLIENT_SECRET" \
  -d "grant_type=authorization_code" \
  'https://id.getharvest.com/api/v2/oauth2/token'

Token Exchange Response:
{"access_token":"{ACCESS_TOKEN}","refresh_token":"{REFRESH_TOKEN}","token_type":"bearer","expires_in":1209600}

Refresh Token Request:
curl -X POST \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -H "Accept: application/json" \
  -d "refresh_token=$REFRESH_TOKEN" \
  -d "client_id=$CLIENT_ID" \
  -d "client_secret=$CLIENT_SECRET" \
  -d "grant_type=refresh_token" \
  'https://id.getharvest.com/api/v2/oauth2/token'

Refresh Token Response:
{"access_token":"{NEW_ACCESS_TOKEN}","refresh_token":"{REFRESH_TOKEN}","token_type":"bearer","expires_in":1209600}
```

--------------------------------

### Create Estimate

Source: <https://help.getharvest.com/api-v2/estimates-api/estimates/estimates>

Creates a new estimate object in Harvest. This involves a POST request to the /v2/estimates endpoint with a JSON payload containing estimate details. The response includes the created estimate object and a 201 Created status code upon success.

```APIDOC
POST /v2/estimates

Parameters:
  client_id (integer, required): The ID of the client this estimate belongs to.
  number (string, optional): If no value is set, the number will be automatically generated.
  purchase_order (string, optional): The purchase order number.
  tax (decimal, optional): This percentage is applied to the subtotal, including line items and discounts. Example: use 10.0 for 10.0%.
  tax2 (decimal, optional): This percentage is applied to the subtotal, including line items and discounts. Example: use 10.0 for 10.0%.
  discount (decimal, optional): This percentage is subtracted from the subtotal. Example: use 10.0 for 10.0%.
  subject (string, optional): The estimate subject.
  notes (string, optional): Any additional notes to include on the estimate.
  currency (string, optional): The currency used by the estimate. If not provided, the client’s currency will be used. See a list of supported currencies.
  issue_date (date, optional): Date the estimate was issued. Defaults to today’s date.
  line_items (array, optional): Array of line item parameters.
    Line Item Parameter:
      kind (string, required): The name of an estimate item category.
      description (string, optional): Text description of the line item.
      quantity (integer, optional): The unit quantity of the item. Defaults to `1`.
      unit_price (decimal, required): The individual price per unit.
      taxed (boolean, optional): Whether the estimate’s `tax` percentage applies to this line item. Defaults to `false`.
      taxed2 (boolean, optional): Whether the estimate’s `tax2` percentage applies to this line item. Defaults to `false`.
```

```HTTP
POST /v2/estimates
Host: api.harvestapp.com
Authorization: Bearer $ACCESS_TOKEN
Harvest-Account-Id: $ACCOUNT_ID
User-Agent: MyApp (yourname@example.com)
Content-Type: application/json

{
  "client_id": 5735774,
  "subject": "ABC Project Quote",
  "line_items": [
    {
      "kind": "Service",
      "description": "ABC Project Quote",
      "unit_price": 5000.0
    }
  ]
}
```

```Shell
curl "https://api.harvestapp.com/v2/estimates" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"client_id":5735774,"subject":"ABC Project Quote","line_items":[{"kind":"Service","description":"ABC Project Quote","unit_price":5000.0}]}'
```

```JSON
{
  "id": 1439827,
  "client_key": "ddd4504a68fb7339138d0c2ea89ba05a3cf12aa8",
  "number": "1002",
  "purchase_order": null,
  "amount": 5000.0,
  "tax": null,
  "tax_amount": 0.0,
  "tax2": null,
  "tax2_amount": 0.0,
  "discount": null,
  "discount_amount": 0.0,
  "subject": "Project Quote",
  "notes": null,
  "state": "draft",
  "issue_date": null,
  "sent_at": null,
  "created_at": "2017-06-27T16:16:24Z",
  "updated_at": "2017-06-27T16:16:24Z",
  "accepted_at": null,
  "declined_at": null,
  "currency": "USD",
  "client": {
    "id": 5735774,
    "name": "ABC Corp"
  },
  "creator": {
    "id": 1782884,
    "name": "Bob Powell"
  },
  "line_items": [
    {
      "id": 53339199,
      "kind": "Service",
      "description": "Project Description",
      "quantity": 1.0,
      "unit_price": 5000.0,
      "amount": 5000.0,
      "taxed": false,
      "taxed2": false
    }
  ]
}
```

--------------------------------

### List Task Assignments

Source: <https://help.getharvest.com/api-v2/projects-api/projects/task-assignments>

Retrieves a list of task assignments, sorted by creation date. Supports filtering by active status and update time. Includes pagination parameters like `per_page` and a deprecated `page` parameter.

```APIDOC
GET /v2/task_assignments

Parameters:
- `is_active` (boolean): Pass `true` to only return active task assignments and `false` to return inactive task assignments.
- `updated_since` (datetime): Only return task assignments that have been updated since the given date and time.
- `page` (integer): DEPRECATED. The page number to use in pagination. (Default: 1)
- `per_page` (integer): The number of records to return per page. Can range between 1 and 2000. (Default: 2000)

This endpoint supports cursor-based pagination and therefore deprecates the `page` parameter. For more information, visit the pagination guide.
```

```curl
curl "https://api.harvestapp.com/v2/task_assignments" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"
```

--------------------------------

### List Task Assignments by Project

Source: <https://help.getharvest.com/api-v2/projects-api/projects/task-assignments>

Retrieves a list of task assignments for a specific project, sorted by creation date. Supports filtering by active/inactive status and updated since a specific date. Pagination is available via `page` and `per_page` parameters.

```APIDOC
GET /v2/projects/{PROJECT_ID}/task_assignments

Parameters:
`is_active` (boolean): Filter by active or inactive task assignments.
`updated_since` (datetime): Filter by task assignments updated since a specific date and time.
`page` (integer): Page number for pagination. Defaults to 1.
`per_page` (integer): Number of records per page. Between 1 and 2000. Defaults to 2000.
```

```curl
curl "https://api.harvestapp.com/v2/projects/14308069/task_assignments" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"
```

--------------------------------

### List Time Entries

Source: <https://help.getharvest.com/api-v2/timesheets-api/timesheets/time-entries>

Retrieves a list of time entries. Supports pagination and filtering. The response includes metadata about the pagination and the total number of entries.

```JSON
{
  "time_entries": [
    {
      "id": 636708723,
      "spent_date": "2017-03-01",
      "user": {
        "id": 1782959,
        "name": "Kim Allen"
      },
      "client": {
        "id": 5735776,
        "name": "123 Industries"
      },
      "project": {
        "id": 14308069,
        "name": "Online Store - Phase 1"
      },
      "task": {
        "id": 8083366,
        "name": "Programming"
      },
      "user_assignment": {
        "id": 125068554,
        "is_project_manager": true,
        "is_active": true,
        "budget": null,
        "created_at": "2017-06-26T22:32:52Z",
        "updated_at": "2017-06-26T22:32:52Z",
        "hourly_rate": 100.0
      },
      "task_assignment": {
        "id": 155505014,
        "billable": true,
        "is_active": true,
        "created_at": "2017-06-26T21:52:18Z",
        "updated_at": "2017-06-26T21:52:18Z",
        "hourly_rate": 100.0,
        "budget": null
      },
      "hours": 1.0,
      "hours_without_timer": 1.0,
      "rounded_hours": 1.0,
      "notes": "Importing products",
      "created_at": "2017-06-27T15:49:28Z",
      "updated_at": "2017-06-27T16:47:14Z",
      "is_locked": true,
      "locked_reason": "Item Invoiced and Approved and Locked for this Time Period",
      "is_closed": true,
      "approval_status": "approved",
      "is_billed": true,
      "timer_started_at": null,
      "started_time": "1:00pm",
      "ended_time": "2:00pm",
      "is_running": false,
      "invoice": {
        "id": 13150403,
        "number": "1001"
      },
      "external_reference": null,
      "billable": true,
      "budgeted": true,
      "billable_rate": 100.0,
      "cost_rate": 50.0
    },
    {
      "id": 636707831,
      "spent_date": "2017-03-01",
      "user": {
        "id": 1782959,
        "name": "Kim Allen"
      },
      "client": {
        "id": 5735776,
        "name": "123 Industries"
      },
      "project": {
        "id": 14308069,
        "name": "Online Store - Phase 1"
      },
      "task": {
        "id": 8083368,
        "name": "Project Management"
      },
      "user_assignment": {
        "id": 125068554,
        "is_project_manager": true,
        "is_active": true,
        "budget": null,
        "created_at": "2017-06-26T22:32:52Z",
        "updated_at": "2017-06-26T22:32:52Z",
        "hourly_rate": 100.0
      },
      "task_assignment": {
        "id": 155505015,
        "billable": true,
        "is_active": true,
        "created_at": "2017-06-26T21:52:18Z",
        "updated_at": "2017-06-26T21:52:18Z",
        "hourly_rate": 100.0,
        "budget": null
      },
      "hours": 2.0,
      "hours_without_timer": 2.0,
      "rounded_hours": 2.0,
      "notes": "Planning meetings",
      "created_at": "2017-06-27T15:48:24Z",
      "updated_at": "2017-06-27T16:47:14Z",
      "is_locked": true,
      "locked_reason": "Item Invoiced and Approved and Locked for this Time Period",
      "is_closed": true,
      "approval_status": "approved",
      "is_billed": true,
      "timer_started_at": null,
      "started_time": "9:00am",
      "ended_time": "11:00am",
      "is_running": false,
      "invoice": {
        "id": 13150403,
        "number": "1001"
      },
      "external_reference": null,
      "billable": true,
      "budgeted": true,
      "billable_rate": 100.0,
      "cost_rate": 50.0
    }
  ],
  "per_page": 2000,
  "total_pages": 1,
  "total_entries": 4,
  "next_page": null,
  "previous_page": null,
  "page": 1,
  "links": {
    "first": "https://api.harvestapp.com/v2/time_entries?page=1&per_page=2000",
    "next": null,
    "previous": null,
    "last": "https://api.harvestapp.com/v2/time_entries?page=1&per_page=2000"
  }
}
```

--------------------------------

### Harvest API V2 Invoice Line Item Object Structure

Source: <https://help.getharvest.com/api-v2/invoices-api/invoices/invoices>

Defines the structure of an invoice line item object in Harvest API V2. Includes attributes for ID, associated project, kind, description, quantity, unit price, amount, and tax applicability.

```APIDOC
The invoice line item object⚭
Attribute | Type | Description  
---|---|---  
`id` | integer | Unique ID for the line item.  
`project` | object | An object containing the associated project’s id, name, and code.  
`kind` | string | The name of an invoice item category.  
`description` | string | Text description of the line item.  
`quantity` | decimal | The unit quantity of the item.  
`unit_price` | decimal | The individual price per unit.  
`amount` | decimal | The line item subtotal (`quantity` * `unit_price`).  
`taxed` | boolean | Whether the invoice’s `tax` percentage applies to this line item.  
`taxed2` | boolean | Whether the invoice’s `tax2` percentage applies to this line item.
```

--------------------------------

### Create Invoice

Source: <https://help.getharvest.com/api-v2/invoices-api/invoices/invoices>

Creates a new invoice object by sending a POST request to the /v2/invoices endpoint. The request body should contain details about the client, invoice specifics, and line items. The API returns the created invoice object and a 201 Created status code upon success.

```APIDOC
POST /v2/invoices

Parameters:
- client_id (integer, required): The ID of the client this invoice belongs to.
- retainer_id (integer, optional): The ID of the retainer you want to add funds to with this invoice. Note: retainers cannot be fully used (created, drawn against, closed, etc.) via the API at this time. The only available action is to add funds.
- estimate_id (integer, optional): The ID of the estimate associated with this invoice.
- number (string, optional): If no value is set, the number will be automatically generated.
- purchase_order (string, optional): The purchase order number.
- tax (decimal, optional): This percentage is applied to the subtotal, including line items and discounts. Example: use 10.0 for 10.0%.
- tax2 (decimal, optional): This percentage is applied to the subtotal, including line items and discounts. Example: use 10.0 for 10.0%.
- discount (decimal, optional): This percentage is subtracted from the subtotal. Example: use 10.0 for 10.0%.
- subject (string, optional): The invoice subject.
- notes (string, optional): Any additional notes to include on the invoice.
- currency (string, optional): The currency used by the invoice. If not provided, the client’s currency will be used. See a list of supported currencies
- issue_date (date, optional): Date the invoice was issued. Defaults to today’s date.
- due_date (date, optional): Date the invoice is due. Defaults to the `issue_date` if no `payment_term` is specified. To set a custom `due_date` the `payment_term` must also be set to `custom`, otherwise the value supplied in the request for `due_date` will be ignored and the `due_date` will be calculated using the `issue_date` and the `payment_term`.
- payment_term (string, optional): The timeframe in which the invoice should be paid. Defaults to `custom`. Options: `upon receipt`, `net 15`, `net 30`, `net 45`, `net 60`, or `custom`.
- payment_options (array, optional): The payment options available to pay the invoice. Your account must be configured with the appropriate options under Settings > Integrations > Online payment to assign them. Options: [`ach`, `credit_card`, `paypal`]
- line_items (array, optional): Array of line item parameters
  Line Item Parameter:
  - project_id (integer, optional): The ID of the project associated with this line item.
  - kind (string, required): The name of an invoice item category.
  - description (string, optional): Text description of the line item.
  - quantity (decimal, optional): The unit quantity of the item. Defaults to `1`.
  - unit_price (decimal, required): The individual price per unit.
  - taxed (boolean, optional): Whether the invoice’s `tax` percentage applies to this line item. Defaults to `false`.
  - taxed2 (boolean, optional): Whether the invoice’s `tax2` percentage applies to this line item. Defaults to `false`.
```

```curl
curl "https://api.harvestapp.com/v2/invoices" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"client_id":5735774,"subject":"ABC Project Quote","due_date":"2017-07-27","line_items":[{"kind":"Service","description":"ABC Project","unit_price":5000.0}]}'
```

--------------------------------

### List Estimates

Source: <https://help.getharvest.com/api-v2/estimates-api/estimates/estimates>

Retrieves a list of estimates, sorted by issue date in descending order. Supports filtering by client ID, update time, issue date range, state, and pagination. The response includes estimate objects and pagination details.

```APIDOC
GET /v2/estimates

Parameters:
- client_id (integer): Filter by client ID.
- updated_since (datetime): Filter by update date and time.
- from (date): Filter by issue date on or after.
- to (date): Filter by issue date on or before.
- state (string): Filter by state (draft, sent, accepted, declined).
- page (integer): Page number for pagination (default: 1).
- per_page (integer): Records per page (1-2000, default: 2000).
```

```curl
curl "https://api.harvestapp.com/v2/estimates" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"
```

--------------------------------

### Create Task Assignment

Source: <https://help.getharvest.com/api-v2/projects-api/projects/task-assignments>

Creates a new task assignment object. Requires task ID and optionally accepts active status, billable status, hourly rate, and budget. Returns the created task assignment object and a 201 Created status code.

```APIDOC
POST /v2/projects/{PROJECT_ID}/task_assignments

Parameters:
- task_id (integer, required): The ID of the task to associate with the project.
- is_active (boolean, optional): Whether the task assignment is active or archived. Defaults to true.
- billable (boolean, optional): Whether the task assignment is billable or not. Defaults to false.
- hourly_rate (decimal, optional): Rate used when the project’s bill_by is Tasks. Defaults to null when billing by task hourly rate, otherwise 0.
- budget (decimal, optional): Budget used when the project’s budget_by is task or task_fees.
```

```curl
curl "https://api.harvestapp.com/v2/projects/14308069/task_assignments" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"task_id":8083800,"is_active":true,"billable":true,"hourly_rate":75.50}'
```

```JSON
{"id":155506339,"billable":true,"is_active":true,"created_at":"2017-06-26T22:10:43Z","updated_at":"2017-06-26T22:10:43Z","hourly_rate":75.5,"budget":null,"project":{"id":14308069,"name":"Online Store - Phase 1","code":"OS1"},"task":{"id":8083800,"name":"Business Development"}}
```

--------------------------------

### Harvest API V2 List User Teammates

Source: <https://help.getharvest.com/api-v2/users-api/users/teammates>

Retrieves a list of teammates assigned to a specific user. Requires Administrator permissions and the user must be a Manager. Supports pagination.

```APIDOC
GET /v2/users/{USER_ID}/teammates

Parameters:
`page` (integer, DEPRECATED): The page number for pagination. (Default: 1)
`per_page` (integer): Number of records per page. Between 1 and 2000. (Default: 2000)

Example Request:
```curl
https://api.harvestapp.com/v2/users/1782959/teammates \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"
```

Example Response:

```json
{"teammates":[{"id":3230547,"first_name":"Jim","last_name":"Allen","email":"jimallen@example.com"},{"id":1782884,"first_name":"Bob","last_name":"Powell","email":"bobpowell@example.com"}],"per_page":100,"total_pages":1,"total_entries":2,"next_page":null,"previous_page":null,"page":1,"links":{"first":"https://api.harvestapp.com/v2/users/1782959/teammates?page=1&per_page=100","next":null,"previous":null,"last":"https://api.harvestapp.com/v2/users/1782959/teammates?page=1&per_page=100"}}
```

```

--------------------------------

### Harvest API v2 Projects Report

Source: https://help.getharvest.com/api-v2/reports-api/reports/time-reports

Retrieves a report of time entries aggregated by project. Supports filtering by date range and pagination. Includes billable amounts if specified.

```APIDOC
GET /v2/reports/time/projects

Parameters:
- from (date, required): Start date for the report (inclusive).
- to (date, required): End date for the report (inclusive).
- include_fixed_fee (string, optional): Set to 'true' to include billable amounts for fixed fee projects.
- page (integer, optional): Page number for pagination. Defaults to 1.
- per_page (integer, optional): Number of records per page. Ranges from 1 to 2000. Defaults to 2000.

Example Request:
curl
"https://api.harvestapp.com/v2/reports/time/projects?from=20170101&to=20171231" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"

Example Response:
{"results":[{"project_id":14307913,"project_name":"[MW] Marketing Website","client_id":5735774,"client_name":"ABC Corp","total_hours":2,"billable_hours":2,"currency":"USD","billable_amount":200},{"project_id":14308069,"project_name":"[OS1] Online Store - Phase 1","client_id":5735776,"client_name":"123 Industries","total_hours":4,"billable_hours":3,"currency":"EUR","billable_amount":300},{"project_id":14808188,"project_name":"[TF] Task Force","client_id":5735776,"client_name":"123 Industries","total_hours":0.5,"billable_hours":0.5,"currency":"EUR","billable_amount":50}],"per_page":2000,"total_pages":1,"total_entries":3,"next_page":null,"previous_page":null,"page":1,"links":{"first":"https://api.harvestapp.com/v2/reports/time/projects?from=20170101&page=1&per_page=2000&to=20171231","next":null,"previous":null,"last":"https://api.harvestapp.com/v2/reports/time/projects?from=20170101&page=1&per_page=2000&to=20171231"}}
```

--------------------------------

### Harvest API V2 List Invoice Payments

Source: <https://help.getharvest.com/api-v2/invoices-api/invoices/invoice-payments>

Retrieves a list of payments for a given invoice, sorted by creation date. Supports filtering by update time and pagination. Requires Administrator or Manager permissions.

```APIDOC
GET /v2/invoices/{INVOICE_ID}/payments

Parameter | Type | Description  
---|---|---  
`updated_since` | datetime | Only return invoice payments that have been updated since the given date and time.  
`page` | integer |  **DEPRECATED** The page number to use in pagination. For instance, if you make a list request and receive 2000 records, your subsequent call can include `page=2` to retrieve the next page of the list. (Default: 1)  
`per_page` | integer | The number of records to return per page. Can range between 1 and 2000. (Default: 2000)  
This endpoint supports cursor-based pagination and therefore deprecates the `page` parameter. For more information, visit the pagination guide. 
```

```curl
curl "https://api.harvestapp.com/v2/invoices/13150378/payments" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"
```

```JSON
{
  "invoice_payments": [
    {
      "id": 10112854,
      "amount": 10700,
      "paid_at": "2017-02-21T00:00:00Z",
      "paid_date": "2017-02-21",
      "recorded_by": "Alice Doe",
      "recorded_by_email": "alice@example.com",
      "notes": "Paid via check #4321",
      "transaction_id": null,
      "created_at": "2017-06-27T16:24:57Z",
      "updated_at": "2017-06-27T16:24:57Z",
      "payment_gateway": {
        "id": 1234,
        "name": "Linkpoint International"
      }
    }
  ],
  "per_page": 2000,
  "total_pages": 1,
  "total_entries": 1,
  "next_page": null,
  "previous_page": null,
  "page": 1,
  "links": {
    "first": "https://api.harvestapp.com/v2/invoices/13150378/payments?page=1&per_page=2000",
    "next": null,
    "previous": null,
    "last": "https://api.harvestapp.com/v2/invoices/13150378/payments?page=1&per_page=2000"
  }
}
```

--------------------------------

### Mark Open Estimate as Accepted

Source: <https://help.getharvest.com/api-v2/estimates-api/estimates/estimate-messages>

Creates a new estimate message object and marks the estimate as accepted. This is achieved by setting the `event_type` parameter to 'accept'.

```APIDOC
POST /v2/estimates/{estimate_ID}/messages

Parameters:
- event_type (string, required): Pass “accept” to mark the estimate as accepted.
```

```curl
curl "https://api.harvestapp.com/v2/estimates/1439818/messages" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"event_type":"accept"}'
```

--------------------------------

### Create Expense Category

Source: <https://help.getharvest.com/api-v2/expenses-api/expenses/expense-categories>

Creates a new expense category object. Requires 'name' and optionally accepts 'unit_name', 'unit_price', and 'is_active'. Returns the created category object and a 201 Created status.

```APIDOC
POST /v2/expense_categories

Parameters:
- name (string, required): The name of the expense category.
- unit_name (string, optional): The unit name of the expense category.
- unit_price (decimal, optional): The unit price of the expense category.
- is_active (boolean, optional): Whether the expense category is active or archived. Defaults to true.
```

```bash
curl "https://api.harvestapp.com/v2/expense_categories" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"name":"Other"}'
```

--------------------------------

### Update Harvest Client

Source: <https://help.getharvest.com/api-v2/clients-api/clients/clients>

Updates an existing client by modifying specified parameters. Any parameters not included in the request remain unchanged. Returns a `200 OK` status on success.

```APIDOC
PATCH /v2/clients/{CLIENT_ID}

Parameters:
- name (string): A textual description of the client.
- is_active (boolean): Whether the client is active, or archived.
- address (string): A textual representation of the client’s physical address. May include new line characters.
- currency (string): The currency used by the client. See a list of supported currencies
```

```curl
curl "https://api.harvestapp.com/v2/clients/5737336" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X PATCH \
  -H "Content-Type: application/json" \
  -d '{"is_active":false}'
```

--------------------------------

### Harvest API V2 Tasks - List Tasks

Source: <https://help.getharvest.com/api-v2/tasks-api/tasks/tasks>

Retrieves a list of tasks from Harvest API V2. Supports filtering by active status, updated since a specific date, and pagination. The response includes task objects and pagination details.

```APIDOC
GET /v2/tasks

Parameters:
- is_active (boolean): Pass `true` to only return active tasks and `false` to return inactive tasks.
- updated_since (datetime): Only return tasks that have been updated since the given date and time.
- page (integer): DEPRECATED. The page number to use in pagination. (Default: 1)
- per_page (integer): The number of records to return per page. Can range between 1 and 2000. (Default: 2000)

This endpoint supports cursor-based pagination and therefore deprecates the `page` parameter. For more information, visit the pagination guide.
```

```curl
curl "https://api.harvestapp.com/v2/tasks" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"
```

--------------------------------

### Retrieve a Client - Harvest API V2

Source: <https://help.getharvest.com/api-v2/clients-api/clients/clients>

Retrieves a specific client by their unique ID. Returns a client object upon successful retrieval with a 200 OK status code.

```APIDOC
GET /v2/clients/{CLIENT_ID}
```

```bash
curl "https://api.harvestapp.com/v2/clients/5735776" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"
```

--------------------------------

### Time Entry Permissions

Source: <https://help.getharvest.com/api-v2/timesheets-api/timesheets/time-entries>

Details the permissions required for different user roles to access and manage time entries within the Harvest API v2. Administrators have full access, Managers have access based on their assignments and project management roles, and Members can only view their own time entries.

```APIDOC
Permissions:
  Administrators: Can see all time entries for the account.
  Managers: Can see time entries for themselves, assigned teammates, and time tracked to projects they manage. Managers with permission to edit assigned teammates’ time entries can create, edit, and destroy time entries on their behalf.
  Members: Can only see their own tracked time.
```

--------------------------------

### Harvest API V2 Permissions for Time Reports

Source: <https://help.getharvest.com/api-v2/reports-api/reports/time-reports>

Explains the permission levels required to view time report data in Harvest API v2. Administrators see all data, Managers see their own and managed data, and Members see only their own tracked time.

```APIDOC
Permissions:
  Administrator:
    - Access to all clients, projects, tasks, and users.
  Manager:
    - Access to own tracked time.
    - Access to time tracked against projects or teammates they manage.
  Member:
    - Access to own tracked time only.
```

--------------------------------

### List Time Entries

Source: <https://help.getharvest.com/api-v2/timesheets-api/timesheets/time-entries>

Retrieves a list of time entries, sorted by `spent_date`. Supports filtering by user, client, project, task, external reference, billed status, running status, approval status, and date ranges. Includes pagination parameters `page` and `per_page`.

```APIDOC
GET /v2/time_entries

Parameters:
- `user_id` (integer): Only return time entries belonging to the user with the given ID.
- `client_id` (integer): Only return time entries belonging to the client with the given ID.
- `project_id` (integer): Only return time entries belonging to the project with the given ID.
- `task_id` (integer): Only return time entries belonging to the task with the given ID.
- `external_reference_id` (string): Only return time entries with the given `external_reference` ID.
- `is_billed` (boolean): Pass `true` to only return time entries that have been invoiced and `false` to return time entries that have not been invoiced.
- `is_running` (boolean): Pass `true` to only return running time entries and `false` to return non-running time entries.
- `approval_status` (string): Only return time entries with the given approval status. Possible values: “unsubmitted”, “submitted”, or “approved”.
- `updated_since` (datetime): Only return time entries that have been updated since the given date and time. Use the ISO 8601 Format.
- `from` (date): Only return time entries with a `spent_date` on or after the given date.
- `to` (date): Only return time entries with a `spent_date` on or before the given date.
- `page` (integer): The page number to use in pagination. (Default: 1)
- `per_page` (integer): The number of records to return per page. Can range between 1 and 2000. (Default: 2000)

Example Request:
```curl
https://api.harvestapp.com/v2/time_entries \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"
```

Example Response:

```json
{"time_entries":[{"id":636709355,"spent_date":"2017-03-02","user":{"id":1782959,"name":"Kim Allen"},"client":{"id":5735774,"name":"ABC Corp"},"project":{"id":14307913,"name":"Marketing Website"},"task":{"id":8083365,"name":"Graphic Design"},"user_assignment":{"id":125068553,"is_project_manager":true,"is_active":true,"budget":null,"created_at":"2017-06-26T22:32:52Z","updated_at":"2017-06-26T22:32:52Z","hourly_rate":100.0},"task_assignment":{"id":155502709,"billable":true,"is_active":true,"created_at":"2017-06-26T21:36:23Z","updated_at":"2017-06-26T21:36:23Z","hourly_rate":100.0,"budget":null},"hours":2.11,"hours_without_timer":2.11,"rounded_hours":2.25,"notes":"Adding CSS styling","created_at":"2017-06-27T15:50:15Z","updated_at":"2017-06-27T16:47:14Z","is_locked":true,"locked_reason":"Item Approved and Locked for this Time Period","is_closed":true,"approval_status":"approved","is_billed":false,"timer_started_at":null,"started_time":"3:00pm","ended_time":"5:00pm","is_running":false,"invoice":null,"external_reference":null,"billable":true,"budgeted":true,"billable_rate":100.0,"cost_rate":50.0},{"id":636708723,"spent_date":"2017-03-01","user":{"id":1782959,"name":"Kim Allen"},"client":{"id":5735776,"name":"123 Industries"},"project":{"id":14308069,"name":"Online Store - Phase 1"},"task":{"id":8083366,"name":"Programming"},"user_assignment":{"id":125068554,"is_project_manager":true,"is_active":true,"budget":null,"created_at":"2017-06-26T22:32:52Z","updated_at":"2017-06-26T22:32:52Z","hourly_rate":100.0},"task_assignment":{"id":155505014,"billable":true,"is_active":true,"created_at":"2017-06-26T21:52:18Z","updated_at":"2017-06-26T21:52:18Z","hourly_rate":100.0,"budget":null},"hours":1.35,"hours_without_timer":1.35,"rounded_hours":1.5,"notes":"Importing products","created_at":"2017-06-27T15:49:28Z","updated_at":"2017-06-27T16:47:14Z","is_locked":true,"locked_reason":"Item Invoiced and Approved and Locked for this Time Period","is_closed":true,"approval_status":"approved","is_billed":true,"timer_started_at":null,"started_time":"1:00pm","ended_time":"2:00pm","is_running":false,"invoice":{"id":13150403,"number":"1001"},"external_reference":null,"billable":true,"budgeted":true,"billable_rate":100.0,"cost_rate":50.0},{"id":636708574,"spent_date":"2017-03-01","user":{"id":1782959,"name":"Kim Allen"},"client":{"id":5735776,"name":"123 Industries"},"project":{"id":14308069,"name":"Online Store - Phase 1"},"task":{"id":8083369,"name":"Research"},"user_assignment":{"id":125068554,"is_project_manager":true,"is_active":true,"budget":null,"created_at":"2017-06-26T22:32:52Z","updated_at":"2017-06-26T22:32:52Z","hourly_rate":100.0}}]}
```

--------------------------------

### Harvest API v2 Clients Report

Source: <https://help.getharvest.com/api-v2/reports-api/reports/time-reports>

Retrieves a report of time entries aggregated by client. Supports filtering by date range and pagination. Includes billable amounts if specified.

```APIDOC
GET /v2/reports/time/clients

Parameters:
- from (date, required): Start date for the report (inclusive).
- to (date, required): End date for the report (inclusive).
- include_fixed_fee (string, optional): Set to 'true' to include billable amounts for fixed fee projects.
- page (integer, optional): Page number for pagination. Defaults to 1.
- per_page (integer, optional): Number of records per page. Ranges from 1 to 2000. Defaults to 2000.

Example Request:
curl
"https://api.harvestapp.com/v2/reports/time/clients?from=20170101&to=20171231" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"

Example Response:
{"results":[{"client_id":5735776,"client_name":"123 Industries","total_hours":4.5,"billable_hours":3.5,"currency":"EUR","billable_amount":350},{"client_id":5735774,"client_name":"ABC Corp","total_hours":2,"billable_hours":2,"currency":"USD","billable_amount":200}],"per_page":2000,"total_pages":1,"total_entries":2,"next_page":null,"previous_page":null,"page":1,"links":{"first":"https://api.harvestapp.com/v2/reports/time/clients?from=20170101&page=1&per_page=2000&to=20171231","next":null,"previous":null,"last":"https://api.harvestapp.com/v2/reports/time/clients?from=20170101&page=1&per_page=2000&to=20171231"}}
```

--------------------------------

### Harvest API V2 Expense Reports - Clients

Source: <https://help.getharvest.com/api-v2/reports-api/reports/expense-reports>

Retrieves expense totals for each client within a specified timeframe. Requires 'from' and 'to' date parameters, with optional pagination. The response includes client details, total amounts, billable amounts, and currency.

```APIDOC
GET /v2/reports/expenses/clients

Parameters:
- from (date, required): Start date for the report.
- to (date, required): End date for the report.
- page (integer, optional): Page number for pagination. Default is 1.
- per_page (integer, optional): Number of records per page. Range: 1-2000. Default is 2000.

Example Request:
curl "https://api.harvestapp.com/v2/reports/expenses/clients?from=20170101&to=20171231" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"

Example Response:
{"results":[{"client_id":5735776,"client_name":"123 Industries","total_amount":100,"billable_amount":100,"currency":"EUR"},{"client_id":5735774,"client_name":"ABC Corp","total_amount":133.35,"billable_amount":133.35,"currency":"USD"}],"per_page":2000,"total_pages":1,"total_entries":2,"next_page":null,"previous_page":null,"page":1,"links":{"first":"https://api.harvestapp.com/v2/reports/expenses/clients?from=20170101&page=1&per_page=2000&to=20171231","next":null,"previous":null,"last":"https://api.harvestapp.com/v2/reports/expenses/clients?from=20170101&page=1&per_page=2000&to=20171231"}}
```

--------------------------------

### List Invoice Messages

Source: <https://help.getharvest.com/api-v2/invoices-api/invoices/invoice-messages>

Fetches all messages for a specified invoice, ordered by creation date. The response includes pagination details and a list of message objects. Supports filtering by `updated_since` and pagination via `per_page`.

```APIDOC
GET /v2/invoices/{INVOICE_ID}/messages

Parameters:
- `updated_since` (datetime): Only return invoice messages updated since this date and time.
- `per_page` (integer): Number of records to return per page. Between 1 and 2000. (Default: 2000)

Example Request:
curl "https://api.harvestapp.com/v2/invoices/13150403/messages" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"

Example Response:
{"invoice_messages":[{"id":27835209,"sent_by":"Bob Powell","sent_by_email":"bobpowell@example.com","sent_from":"Bob Powell","sent_from_email":"bobpowell@example.com","include_link_to_client_invoice":false,"send_me_a_copy":false,"thank_you":false,"reminder":false,"send_reminder_on":null,"created_at":"2017-08-23T22:15:06Z","updated_at":"2017-08-23T22:15:06Z","attach_pdf":true,"event_type":null,"recipients":[{"name":"Richard Roe","email":"richardroe@example.com"}],"subject":"Past due invoice reminder: #1001 from API Examples","body":"Dear Customer,\r\n\r\nThis is a friendly reminder to let you know that Invoice 1001 is 144 days past due. If you have already sent the payment, please disregard this message. If not, we would appreciate your prompt attention to this matter.\r\n\r\nThank you for your business.\r\n\r\nCheers,\r\nAPI Examples"},{"id":27835207,"sent_by":"Bob Powell","sent_by_email":"bobpowell@example.com","sent_from":"Bob Powell","sent_from_email":"bobpowell@example.com","include_link_to_client_invoice":false,"send_me_a_copy":true,"thank_you":false,"reminder":false,"send_reminder_on":null,"created_at":"2017-08-23T22:14:49Z","updated_at":"2017-08-23T22:14:49Z","attach_pdf":true,"event_type":null,"recipients":[{"name":"Richard Roe","email":"richardroe@example.com"},{"name":"Bob Powell","email":"bobpowell@example.com"}],"subject":"Invoice #1001 from API Examples","body":"---------------------------------------------\r\nInvoice Summary\r\n---------------------------------------------\r\nInvoice ID: 1001\r\nIssue Date: 04/01/2017\r\nClient: 123 Industries\r\nP.O. Number: \r\nAmount: €288.90\r\nDue: 04/01/2017 (upon receipt)\r\n\r\nThe detailed invoice is attached as a PDF.\r\n\r\nThank you!\r\n---------------------------------------------Invoices"}],"per_page":2000,"total_pages":1,"total_entries":2,"next_page":null,"previous_page":null,"page":1,"links":{"first":"https://api.harvestapp.com/api/v2/invoices/13150403/messages?page=1&per_page=2000","next":null,"previous":null,"last":"https://api.harvestapp.com/v2/invoices/13150403/messages?page=1&per_page=2000"}}
```

--------------------------------

### Update Estimate

Source: <https://help.getharvest.com/api-v2/estimates-api/estimates/estimates>

Updates a specific estimate by setting the values of provided parameters. Unspecified parameters remain unchanged. Returns the updated estimate object and a 200 OK response.

```APIDOC
PATCH /v2/estimates/{ESTIMATE_ID}

Parameters:
- client_id (integer): The ID of the client this estimate belongs to.
- number (string): If no value is set, the number will be automatically generated.
- purchase_order (string): The purchase order number.
- tax (decimal): This percentage is applied to the subtotal, including line items and discounts. Example: use 10.0 for 10.0%.
- tax2 (decimal): This percentage is applied to the subtotal, including line items and discounts. Example: use 10.0 for 10.0%.
- discount (decimal): This percentage is subtracted from the subtotal. Example: use 10.0 for 10.0%.
- subject (string): The estimate subject.
- notes (string): Any additional notes to include on the estimate.
- currency (string): The currency used by the estimate. If not provided, the client’s currency will be used. See a list of supported currencies.
- issue_date (date): Date the estimate was issued.
- line_items (array): Array of line item parameters.
  - id (integer): Unique ID for the line item.
  - kind (string): The name of an estimate item category.
  - description (string): Text description of the line item.
  - quantity (integer): The unit quantity of the item. Defaults to `1`.
  - unit_price (decimal): The individual price per unit.
  - taxed (boolean): Whether the estimate’s `tax` percentage applies to this line item. Defaults to `false`.
  - taxed2 (boolean): Whether the estimate’s `tax2` percentage applies to this line item. Defaults to `false`.
```

```curl
curl "https://api.harvestapp.com/v2/estimates/1439827" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X PATCH \
  -H "Content-Type: application/json" \
  -d '{"purchase_order":"2345"}'
```

--------------------------------

### Harvest API V2 Expense Object Structure

Source: <https://help.getharvest.com/api-v2/expenses-api/expenses/expenses>

Defines the structure and attributes of an expense object in the Harvest API V2. This includes details about unique identifiers, associated entities like clients and projects, cost information, billing status, approval status, and timestamps.

```APIDOC
Expense Object:
  Attributes:
    id (integer): Unique ID for the expense.
    client (object): An object containing the expense’s client id, name, and currency.
    project (object): An object containing the expense’s project id, name, and code.
    expense_category (object): An object containing the expense’s expense category id, name, unit_price, and unit_name.
    user (object): An object containing the id and name of the user that recorded the expense.
    user_assignment (object): A user assignment object of the user that recorded the expense.
    receipt (object): An object containing the expense’s receipt URL and file name.
    invoice (object): Once the expense has been invoiced, this field will include the associated invoice’s id and number.
    notes (string): Textual notes used to describe the expense.
    units (integer): The quantity of units used to calculate the `total_cost` of the expense.
    total_cost (decimal): The total amount of the expense.
    billable (boolean): Whether the expense is billable or not.
    is_closed (boolean): Whether the expense has been approved or not. Deprecated, use `approval_status` instead.
    approval_status (string): The approval status of the expense. Possible values: “unsubmitted”, “submitted”, or “approved”.
    is_locked (boolean): Whether the expense has been been invoiced, approved, or the project or person related to the expense is archived.
    is_billed (boolean): Whether or not the expense has been marked as invoiced.
    locked_reason (string): An explanation of why the expense has been locked.
    spent_date (date): Date the expense occurred.
    created_at (datetime): Date and time the expense was created.
    updated_at (datetime): Date and time the expense was last updated.
```

--------------------------------

### Harvest API V2 Permissions for Invoices

Source: <https://help.getharvest.com/api-v2/invoices-api/invoices/invoices>

Specifies the required user permissions to interact with the Harvest API V2 `/v2/invoices` endpoint. Insufficient permissions result in a 403 Forbidden status code.

```APIDOC
Required permissions⚭
You must be an Administrator or Manager with permission to create and edit invoices in order to interact with the `/v2/invoices` endpoint. Insufficient permissions will result in a `403 Forbidden` status code.
```

--------------------------------

### Harvest API V2 POST Request with Form Data

Source: <https://help.getharvest.com/api-v2/introduction/overview/general>

Shows how to send a POST request to the Harvest API V2 using form data for the request body. This method does not require a 'Content-Type' header for JSON.

```APIDOC
curl -X POST https://api.harvestapp.com/v2/tasks \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -d name="My New Task"
```

--------------------------------

### Retrieve Specific User Assignment

Source: <https://help.getharvest.com/api-v2/projects-api/projects/user-assignments>

Fetches a single user assignment by its unique ID within a specific project. Returns a 200 OK response if the identifier is valid.

```APIDOC
GET /v2/projects/{PROJECT_ID}/user_assignments/{USER_ASSIGNMENT_ID}

Response:
- A user assignment object containing details like id, is_project_manager, is_active, created_at, updated_at, hourly_rate, project, and user.
```

```curl
curl "https://api.harvestapp.com/v2/projects/14308069/user_assignments/125068554" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"
```

--------------------------------

### List Estimate Messages

Source: <https://help.getharvest.com/api-v2/estimates-api/estimates/estimate-messages>

Retrieves a list of messages associated with a specific estimate. Supports filtering by update time and pagination. Requires Administrator or Manager permissions.

```APIDOC
GET /v2/estimates/{estimate_ID}/messages

Parameter | Type | Description  
---|---|---
`updated_since` | datetime | Only return estimate messages that have been updated since the given date and time.  
`per_page` | integer | The number of records to return per page. Can range between 1 and 2000. (Default: 2000)  

Example Request:
```

curl "<https://api.harvestapp.com/v2/estimates/1439818/messages>" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (<yourname@example.com>)"

```

Example Response:
```

{"estimate_messages":[{"id":2666236,"sent_by":"Bob Powell","sent_by_email":"bobpowell@example.com","sent_from":"Bob Powell","sent_from_email":"bobpowell@example.com","send_me_a_copy":true,"created_at":"2017-08-25T21:23:40Z","updated_at":"2017-08-25T21:23:40Z","recipients":[{"name":"Richard Roe","email":"richardroe@example.com"},{"name":"Bob Powell","email":"bobpowell@example.com"}],"event_type":null,"subject":"Estimate #1001 from API Examples","body":"---------------------------------------------
Estimate Summary
---------------------------------------------

Estimate ID: 1001
Estimate Date: 06/01/2017
Client: 123 Industries
P.O. Number: 5678
Amount: $9,630.00

You can view the estimate here:

%estimate_url%

Thank you!
---------------------------------------------"}],"per_page":2000,"total_pages":1,"total_entries":1,"next_page":null,"previous_page":null,"page":1,"links":{"first":"<https://api.harvestapp.com/v2/estimates/1439818/messages?page=1&per_page=2000","next":null,"previous":null,"last":"https://api.harvestapp.com/v2/estimates/1439818/messages?page=1&per_page=2000"}}>

```
```

--------------------------------

### Harvest API v2 Time Zone Data

Source: <https://help.getharvest.com/api-v2/introduction/overview/supported-timezones>

This entry provides a comprehensive list of time zones supported by the Harvest API v2. It includes the 'Harvest Name' which should be used in API requests, the corresponding 'TZ Name' (IANA Time Zone Database name), and the standard and daylight saving time UTC offsets.

```APIDOC
Time Zones:
  Format: Harvest Name | TZ Name | UTC Offset | UTC DST Offset

  American Samoa | Pacific/Pago_Pago | -11:00 | -11:00
  International Date Line West | Pacific/Midway | -11:00 | -11:00
  Midway Island | Pacific/Midway | -11:00 | -11:00
  Hawaii | Pacific/Honolulu | -10:00 | -10:00
  Alaska | America/Juneau | -09:00 | -08:00
  Pacific Time (US & Canada) | America/Los_Angeles | -08:00 | -07:00
  Tijuana | America/Tijuana | -08:00 | -07:00
  Arizona | America/Phoenix | -07:00 | -07:00
  Chihuahua | America/Chihuahua | -07:00 | -06:00
  Mazatlan | America/Mazatlan | -07:00 | -06:00
  Mountain Time (US & Canada) | America/Denver | -07:00 | -06:00
  Central America | America/Guatemala | -06:00 | -06:00
  Central Time (US & Canada) | America/Chicago | -06:00 | -05:00
  Guadalajara | America/Mexico_City | -06:00 | -05:00
  Mexico City | America/Mexico_City | -06:00 | -05:00
  Monterrey | America/Monterrey | -06:00 | -05:00
  Saskatchewan | America/Regina | -06:00 | -06:00
  Bogota | America/Bogota | -05:00 | -05:00
  Eastern Time (US & Canada) | America/New_York | -05:00 | -04:00
  Indiana (East) | America/Indiana/Indianapolis | -05:00 | -04:00
  Lima | America/Lima | -05:00 | -05:00
  Quito | America/Lima | -05:00 | -05:00
  Atlantic Time (Canada) | America/Halifax | -04:00 | -03:00
  Caracas | America/Caracas | -04:00 | -04:00
  Georgetown | America/Guyana | -04:00 | -04:00
  La Paz | America/La_Paz | -04:00 | -04:00
  Puerto Rico | America/Puerto_Rico | -04:00 | -04:00
  Santiago | America/Santiago | -03:00 | -04:00
  Newfoundland | America/St_Johns | -03:30 | -02:30
  Brasilia | America/Sao_Paulo | -02:00 | -03:00
  Buenos Aires | America/Argentina/Buenos_Aires | -03:00 | -03:00
  Greenland | America/Godthab | -03:00 | -02:00
  Montevideo | America/Montevideo | -03:00 | -03:00
  Mid-Atlantic | Atlantic/South_Georgia | -02:00 | -02:00
  Azores | Atlantic/Azores | -01:00 | +00:00
  Cape Verde Is. | Atlantic/Cape_Verde | -01:00 | -01:00
  Casablanca | Africa/Casablanca | +00:00 | +01:00
  Dublin | Europe/Dublin | +00:00 | +01:00
  Edinburgh | Europe/London | +00:00 | +01:00
  Lisbon | Europe/Lisbon | +00:00 | +01:00
  London | Europe/London | +00:00 | +01:00
  Monrovia | Africa/Monrovia | +00:00 | +00:00
  UTC | Etc/UTC | +00:00 | +00:00
  Amsterdam | Europe/Amsterdam | +01:00 | +02:00
  Belgrade | Europe/Belgrade | +01:00 | +02:00
  Berlin | Europe/Berlin | +01:00 | +02:00
  Bern | Europe/Zurich | +01:00 | +02:00
  Bratislava | Europe/Bratislava | +01:00 | +02:00
  Brussels | Europe/Brussels | +01:00 | +02:00
  Budapest | Europe/Budapest | +01:00 | +02:00
  Copenhagen | Europe/Copenhagen | +01:00 | +02:00
  Ljubljana | Europe/Ljubljana | +01:00 | +02:00
  Madrid | Europe/Madrid | +01:00 | +02:00
  Paris | Europe/Paris | +01:00 | +02:00
  Prague | Europe/Prague | +01:00 | +02:00
  Rome | Europe/Rome | +01:00 | +02:00
  Sarajevo | Europe/Sarajevo | +01:00 | +02:00
  Skopje | Europe/Skopje | +01:00 | +02:00
  Stockholm | Europe/Stockholm | +01:00 | +02:00
  Vienna | Europe/Vienna | +01:00 | +02:00
  Warsaw | Europe/Warsaw | +01:00 | +02:00
  West Central Africa | Africa/Algiers | +01:00 | +01:00
  Zagreb | Europe/Zagreb | +01:00 | +02:00
  Zurich | Europe/Zurich | +01:00 | +02:00
  Athens | Europe/Athens | +02:00 | +03:00
  Bucharest | Europe/Bucharest | +02:00 | +03:00
  Cairo | Africa/Cairo | +02:00 | +02:00
  Harare | Africa/Harare | +02:00 | +02:00
  Helsinki | Europe/Helsinki | +02:00 | +03:00
  Jerusalem | Asia/Jerusalem | +02:00 | +03:00
  Kaliningrad | Europe/Kaliningrad | +02:00 | +02:00
  Kyiv | Europe/Kiev | +02:00 | +03:00
  Pretoria | Africa/Johannesburg | +02:00 | +02:00
  Riga | Europe/Riga | +02:00 | +03:00
  Sofia | Europe/Sofia | +02:00 | +03:00
  Tallinn | Europe/Tallinn | +02:00 | +03:00
  Vilnius | Europe/Vilnius | +02:00 | +03:00
  Baghdad | Asia/Baghdad | +03:00 | +03:00
  Istanbul | Europe/Istanbul | +03:00 | +03:00
  Kuwait | Asia/Kuwait | +03:00 | +03:00
  Minsk | Europe/Minsk | +03:00 | +03:00
  Moscow | Europe/Moscow | +03:00 | +03:00
  Nairobi | Africa/Nairobi | +03:00 | +03:00
  Riyadh | Asia/Riyadh | +03:00 | +03:00
  St. Petersburg | Europe/Moscow | +03:00 | +03:00
  Volgograd | Europe/Volgograd | +03:00 | +03:00
  Tehran | Asia/Tehran | +03:30 | +04:30
  Abu Dhabi | Asia/Muscat | +04:00 | +04:00
  Baku | Asia/Baku | +04:00 | +04:00
  Muscat | Asia/Muscat | +04:00 | +04:00
  Samara | Europe/Samara | +04:00 | +04:00
  Tbilisi | Asia/Tbilisi | +04:00 | +04:00
  Yerevan | Asia/Yerevan | +04:00 | +04:00
  Kabul | Asia/Kabul | +04:30 | +04:30
  Ekaterinburg | Asia/Yekaterinburg | +05:00 | +05:00
  Islamabad | Asia/Karachi | +05:00 | +05:00
  Karachi | Asia/Karachi | +05:00 | +05:00
  Tashkent | Asia/Tashkent | +05:00 | +05:00
  Chennai | Asia/Kolkata | +05:30 | +05:30
  Kolkata | Asia/Kolkata | +05:30 | +05:30
```

--------------------------------

### Retrieve Authenticated User

Source: <https://help.getharvest.com/api-v2/users-api/users/users>

Retrieves the details of the currently authenticated user. This endpoint returns a user object containing information such as name, email, timezone, and roles, along with a 200 OK response code.

```APIDOC
GET /v2/users/me

Retrieves the currently authenticated user. Returns a user object and a 200 OK response code.

Example response:
```

{"id":1782884,"first_name":"Bob","last_name":"Powell","email":"<bobpowell@example.com>","telephone":"","timezone":"Mountain Time (US & Canada)","has_access_to_all_future_projects":false,"is_contractor":false,"is_active":true,"created_at":"2020-05-01T20:41:00Z","updated_at":"2020-05-01T20:42:25Z","weekly_capacity":126000,"default_hourly_rate":100.0,"cost_rate":75.0,"roles":["Founder","CEO"],"access_roles":["administrator"],"avatar_url":"<https://cache.harvestapp.com/assets/profile_images/allen_bradley_clock_tower.png?1498509661"}>

```
```

```curl
curl "https://api.harvestapp.com/v2/users/me" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"
```

--------------------------------

### List Harvest API V2 Contacts

Source: <https://help.getharvest.com/api-v2/clients-api/clients/contacts>

Retrieves a list of contacts from the Harvest API v2. Supports filtering by client ID and modification date, with options for pagination. Requires Administrator or Manager permissions.

```APIDOC
GET /v2/contacts

Parameters:
`client_id` (integer): Only return contacts belonging to the client with the given ID.
`updated_since` (datetime): Only return contacts that have been updated since the given date and time.
`page` (integer): DEPRECATED. The page number to use in pagination. (Default: 1)
`per_page` (integer): The number of records to return per page. Can range between 1 and 2000. (Default: 2000)

This endpoint supports cursor-based pagination and therefore deprecates the `page` parameter. For more information, visit the pagination guide.
```

```bash
curl "https://api.harvestapp.com/v2/contacts" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"
```

```json
{
  "contacts": [
    {
      "id": 4706479,
      "title": "Owner",
      "first_name": "Jane",
      "last_name": "Doe",
      "email": "janedoe@example.com",
      "phone_office": "(203) 697-8885",
      "phone_mobile": "(203) 697-8886",
      "fax": "(203) 697-8887",
      "created_at": "2017-06-26T21:20:07Z",
      "updated_at": "2017-06-26T21:27:07Z",
      "client": {
        "id": 5735774,
        "name": "ABC Corp"
      }
    },
    {
      "id": 4706453,
      "title": "Manager",
      "first_name": "Richard",
      "last_name": "Roe",
      "email": "richardroe@example.com",
      "phone_office": "(318) 515-5905",
      "phone_mobile": "(318) 515-5906",
      "fax": "(318) 515-5907",
      "created_at": "2017-06-26T21:06:55Z",
      "updated_at": "2017-06-26T21:27:20Z",
      "client": {
        "id": 5735776,
        "name": "123 Industries"
      }
    }
  ],
  "per_page": 2000,
  "total_pages": 1,
  "total_entries": 2,
  "next_page": null,
  "previous_page": null,
  "page": 1,
  "links": {
    "first": "https://api.harvestapp.com/v2/contacts?page=1&per_page=2000",
    "next": null,
    "previous": null,
    "last": "https://api.harvestapp.com/v2/contacts?page=1&per_page=2000"
  }
}
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<contacts type="array">
    <contact>
        <id type="integer">4706479</id>
        <client-id type="integer">5735774</client-id>
        <title>Owner</title>
        <first-name>Jane</first-name>
        <last-name>Doe</last-name>
        <email>janedoe@example.com</email>
        <phone-office>(203) 697-8885</phone-office>
        <phone-mobile>(203) 697-8886</phone-mobile>
        <fax>(203) 697-8887</fax>
        <created-at type="dateTime">2013-08-12T15:30:14Z</created-at>
        <updated-at type="dateTime">2015-04-16T18:07:28Z</updated-at>
    </contact>
    <contact>
        <id type="integer">4706453</id>
        <client-id type="integer">5735776</client-id>
        <title>Manager</title>
        <first-name>Richard</first-name>
        <last-name>Roe</last-name>
        <email>richardroe@example.com</email>
        <phone-office>(318) 515-5905</phone-office>
        <phone-mobile>(318) 515-5906</phone-mobile>
        <fax>(318) 515-5907</fax>
        <created-at type="dateTime"></created-at>
        <updated-at type="dateTime"></updated-at>
    </contact>
</contacts>
```

--------------------------------

### Update Role - Harvest API v2

Source: <https://help.getharvest.com/api-v2/roles-api/roles/roles>

Updates a specific role by setting the values of provided parameters. Unspecified parameters remain unchanged. Returns the updated role object and a 200 OK response.

```APIDOC
PATCH /v2/roles/{ROLE_ID}

Parameters:
- name (string, optional): The name of the role.
- user_ids (array of integers, optional): The IDs of the users assigned to this role. Existing user IDs will be overwritten.
```

```bash
curl "https://api.harvestapp.com/v2/roles/618099" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X PATCH \
  -H "Content-Type: application/json" \
  -d '{"name":"HR","user_ids":[2084359,3122373,3122374]}'
```

--------------------------------

### Mark Estimate as Declined

Source: <https://help.getharvest.com/api-v2/estimates-api/estimates/estimate-messages>

Creates a new estimate message object and marks the estimate as declined. Returns an estimate message object and a 201 Created response code if the call succeeded.

```APIDOC
POST /v2/estimates/{estimate_ID}/messages

Parameters:
  event_type (string, required): Pass “decline” to mark the estimate as accepted.
```

```bash
curl "https://api.harvestapp.com/v2/estimates/1439818/messages" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"event_type":"decline"}'
```

```json
{"id":2666245,"sent_by":"Bob Powell","sent_by_email":"bobpowell@example.com","sent_from":"Bob Powell","sent_from_email":"bobpowell@example.com","send_me_a_copy":false,"created_at":"2017-08-25T21:31:55Z","updated_at":"2017-08-25T21:31:55Z","recipients":[],"event_type":"decline","subject":null,"body":null}
```

--------------------------------

### Retrieve Estimate by ID

Source: <https://help.getharvest.com/api-v2/estimates-api/estimates/estimates>

Fetches a specific estimate using its unique ID. Returns a 200 OK response with the estimate object if the ID is valid.

```APIDOC
GET /v2/estimates/{ESTIMATE_ID}

Parameters:
- ESTIMATE_ID (integer): The ID of the estimate to retrieve.
```

```curl
curl "https://api.harvestapp.com/v2/estimates/1439818" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"
```

--------------------------------

### Harvest API V2 Invoice Payment Object Structure

Source: <https://help.getharvest.com/api-v2/invoices-api/invoices/invoice-payments>

Defines the attributes, their types, and descriptions for an invoice payment object in the Harvest API v2. Includes fields like ID, amount, dates, recorded by, notes, transaction ID, payment gateway, and timestamps.

```APIDOC
Attribute | Type | Description  
---|---|---  
`id` | integer | Unique ID for the payment.  
`amount` | decimal | The amount of the payment.  
`paid_at` | datetime | Date and time the payment was made.  
`paid_date` | date | Date the payment was made.  
`recorded_by` | string | The name of the person who recorded the payment.  
`recorded_by_email` | string | The email of the person who recorded the payment.  
`notes` | string | Any notes associated with the payment.  
`transaction_id` | string | Either the card authorization or PayPal transaction ID.  
`payment_gateway` | object | The payment gateway id and name used to process the payment.  
`created_at` | datetime | Date and time the payment was recorded.  
`updated_at` | datetime | Date and time the payment was last updated.  
```

--------------------------------

### Harvest API V2 User Teammate Object Structure

Source: <https://help.getharvest.com/api-v2/users-api/users/teammates>

Defines the structure of a teammate object used in the Harvest API V2. It includes attributes like ID, first name, last name, and email.

```APIDOC
Attribute | Type | Description
---|---|---
id | int | Unique ID for the teammate
first_name | string | The first name of the teammate
last_name | string | The last name of the teammate
email | string | The email of the teammate
```

--------------------------------

### Harvest API v2 Expense Categories Report

Source: <https://help.getharvest.com/api-v2/reports-api/reports/expense-reports>

Retrieves a report of expenses categorized by category. Supports filtering by date range and pagination.

```APIDOC
GET /v2/reports/expenses/categories

Parameters:
  from (date, required): Only report on expenses with a spent_date on or after the given date.
  to (date, required): Only report on expenses with a spent_date on or before the given date.
  page (integer, optional): The page number to use in pagination. (Default: 1)
  per_page (integer, optional): The number of records to return per page. Can range between 1 and 2000. (Default: 2000)

Example Request:
curl
"https://api.harvestapp.com/v2/reports/expenses/categories?from=20170101&to=20171231" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"

Example Response:
{"results":[{"expense_category_id":4197501,"expense_category_name":"Lodging","total_amount":100,"billable_amount":100,"currency":"EUR"},{"expense_category_id":4195926,"expense_category_name":"Meals","total_amount":100,"billable_amount":100,"currency":"EUR"},{"expense_category_id":4195926,"expense_category_name":"Meals","total_amount":33.35,"billable_amount":33.35,"currency":"USD"}],"per_page":2000,"total_pages":1,"total_entries":3,"next_page":null,"previous_page":null,"page":1,"links":{"first":"https://api.harvestapp.com/v2/reports/expenses/categories?from=20170101&page=1&per_page=2000&to=20171231","next":null,"previous":null,"last":"https://api.harvestapp.com/v2/reports/expenses/categories?from=20170101&page=1&per_page=2000&to=20171231"}}
```

```bash
curl
"https://api.harvestapp.com/v2/reports/expenses/categories?from=20170101&to=20171231" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"
```

--------------------------------

### Harvest API V2 Project Task Assignment Object

Source: <https://help.getharvest.com/api-v2/projects-api/projects/task-assignments>

Defines the structure and attributes of a task assignment object within the Harvest API V2. This includes details about the assignment's ID, associated project and task, billable status, rates, budgets, and timestamps.

```APIDOC
Project Task Assignments:
  Permissions: Admin or Project Manager

  Task Assignment Object:
    id: integer - Unique ID for the task assignment.
    project: object - An object containing the id, name, and code of the associated project.
    task: object - An object containing the id and name of the associated task.
    is_active: boolean - Whether the task assignment is active or archived.
    billable: boolean - Whether the task assignment is billable or not. If set to true, all time tracked on this project for the associated task will be marked as billable.
    hourly_rate: decimal - Rate used when the project’s bill_by is Tasks.
    budget: decimal - Budget used when the project’s budget_by is task or task_fees.
    created_at: datetime - Date and time the task assignment was created.
    updated_at: datetime - Date and time the task assignment was last updated.
```

--------------------------------

### List Expense Categories

Source: <https://help.getharvest.com/api-v2/expenses-api/expenses/expense-categories>

Retrieves a list of all expense categories. Supports filtering by active status and update time, with pagination options. The response includes category details and pagination metadata.

```APIDOC
GET /v2/expense_categories

Parameters:
- is_active (boolean): Filter by active status.
- updated_since (datetime): Filter by update time.
- per_page (integer): Number of records per page (1-2000).

Example Request:
curl "https://api.harvestapp.com/v2/expense_categories" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"

Example Response:
{"expense_categories":[{"id":4197501,"name":"Lodging","unit_name":null,"unit_price":null,"is_active":true,"created_at":"2017-06-27T15:01:32Z","updated_at":"2017-06-27T15:01:32Z"},{"id":4195930,"name":"Mileage","unit_name":"mile","unit_price":0.535,"is_active":true,"created_at":"2017-06-26T20:41:00Z","updated_at":"2017-06-26T20:41:00Z"},{"id":4195928,"name":"Transportation","unit_name":null,"unit_price":null,"is_active":true,"created_at":"2017-06-26T20:41:00Z","updated_at":"2017-06-26T20:41:00Z"},{"id":4195926,"name":"Meals","unit_name":null,"unit_price":null,"is_active":true,"created_at":"2017-06-26T20:41:00Z","updated_at":"2017-06-26T20:41:00Z"}],"per_page":2000,"total_pages":1,"total_entries":4,"next_page":null,"previous_page":null,"page":1,"links":{"first":"https://api.harvestapp.com/v2/expense_categories?page=1&per_page=2000","next":null,"previous":null,"last":"https://api.harvestapp.com/v2/expense_categories?page=1&per_page=2000"}}
```

--------------------------------

### Archive/Unarchive User

Source: <https://help.getharvest.com/api-v2/users-api/users/users>

Archives a user by setting `is_active` to `false`. To reactivate, set `is_active` to `true`. Returns the updated user object.

```APIDOC
PATCH /v2/users/{USER_ID}

Parameter:
- is_active (boolean): Set to `false` to archive, `true` to reactivate.
```

```json
{
  "is_active": false
}
```

```bash
curl "https://api.harvestapp.com/v2/users/3226125" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X PATCH \
  -H "Content-Type: application/json" \
  -d '{"is_active":false}'
```

--------------------------------

### Update User Assignment

Source: <https://help.getharvest.com/api-v2/projects-api/projects/user-assignments>

Updates an existing user assignment for a project. Allows modification of active status, project manager permissions, default rates, hourly rate, and budget. Parameters not included in the request remain unchanged. Returns a 200 OK status on success.

```APIDOC
PATCH /v2/projects/{PROJECT_ID}/user_assignments/{USER_ASSIGNMENT_ID}

Parameters:
- is_active (boolean): Whether the user assignment is active or archived.
- is_project_manager (boolean): Determines if the user has Project Manager permissions.
- use_default_rates (boolean): Determines billable rate usage. true uses user's default rates, false uses custom rate.
- hourly_rate (decimal): Custom rate when use_default_rates is false.
- budget (decimal): Budget used when the project’s budget_by is person.
```

```HTTP
PATCH /v2/projects/{PROJECT_ID}/user_assignments/{USER_ASSIGNMENT_ID}
Content-Type: application/json
Authorization: Bearer $ACCESS_TOKEN
Harvest-Account-Id: $ACCOUNT_ID
User-Agent: MyApp (yourname@example.com)

{
  "budget":120
}
```

```curl
curl "https://api.harvestapp.com/v2/projects/14308069/user_assignments/125068758" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X PATCH \
  -H "Content-Type: application/json" \
  -d '{"budget":120}'
```

```JSON
{
  "id":125068758,
  "is_project_manager":false,
  "is_active":true,
  "use_default_rates":false,
  "budget":120.0,
  "created_at":"2017-06-26T22:36:01Z",
  "updated_at":"2017-06-26T22:36:35Z",
  "hourly_rate":75.5,
  "project":{
    "id":14308069,
    "name":"Online Store - Phase 1",
    "code":"OS1"
  },
  "user":{
    "id":1782974,
    "name":"Jim Allen"
  }
}
```

--------------------------------

### Harvest API V2 Time Reports Structure

Source: <https://help.getharvest.com/api-v2/reports-api/reports/time-reports>

Details the structure of time reports in Harvest API v2. The response includes a 'results' array containing individual report objects, along with pagination properties. Each report object contains details like client ID, project ID, task ID, user ID, total hours, billable hours, currency, and billable amount.

```APIDOC
Time Reports:
  Response Structure:
    results: Array of report objects
    Pagination Properties: Included for easy navigation

  Result Object Attributes:
    client_id (integer): ID of the client. Only in Client and Project reports.
    client_name (string): Name of the client. Only in Client and Project reports.
    project_id (integer): ID of the project. Only in Client and Project reports.
    project_name (string): Name of the project. Only in Client and Project reports.
    task_id (integer): ID of the task. Only in Task report.
    task_name (string): Name of the task. Only in Task report.
    user_id (integer): ID of the user. Only in Team report.
    user_name (string): Name of the user. Only in Team report.
    weekly_capacity (integer): User's weekly capacity in seconds (half-hour increments). Only in Team report.
    avatar_url (string): URL to the user's avatar image. Only in Team report.
    is_contractor (boolean): Contractor status of the user. Only in Team report.
    total_hours (decimal): Totaled hours for the timeframe and subject. Rounded if Time Rounding is on.
    billable_hours (decimal): Totaled billable hours for the timeframe and subject. Rounded if Time Rounding is on.
    currency (string): Currency code for tracked hours. Visible to Admins and Project Managers with specific permissions.
    billable_amount (decimal): Totaled billable amount for billable hours. Visible to Admins and Project Managers with specific permissions.

  Required Parameters:
    from (date): Start date of the timeframe.
    to (date): End date of the timeframe.

  Timeframe Limitation:
    The supplied timeframe cannot exceed 1 year (365 days).
```

--------------------------------

### Time Entry Object Attributes

Source: <https://help.getharvest.com/api-v2/timesheets-api/timesheets/time-entries>

Defines the structure and attributes of a time entry object in the Harvest API v2. This includes fields for unique identifiers, dates, associated user, client, project, and task information, invoicing details, hours tracked (decimal, rounded, without timer), notes, lock status, approval status, billing status, timer status, and timestamps for creation and updates.

```APIDOC
Time Entry Object:
  id: bigint - Unique ID for the time entry.
  spent_date: date - Date of the time entry.
  user: object - An object containing the id and name of the associated user.
  user_assignment: object - A user assignment object of the associated user.
  client: object - An object containing the id and name of the associated client.
  project: object - An object containing the id and name of the associated project.
  task: object - An object containing the id and name of the associated task.
  task_assignment: object - A task assignment object of the associated task.
  external_reference: object - An object containing the `id`, `group_id`, `account_id`, `permalink`, `service`, and `service_icon_url` of the associated external reference.
  invoice: object - Once the time entry has been invoiced, this field will include the associated invoice’s id and number.
  hours: decimal - Number of (decimal time) hours tracked in this time entry.
  hours_without_timer: decimal - Number of (decimal time) hours already tracked in this time entry, before the timer was last started.
  rounded_hours: decimal - Number of (decimal time) hours tracked in this time entry used in summary reports and invoices. This value is rounded according to the _Time Rounding_ setting in your _Preferences_.
  notes: string - Notes attached to the time entry.
  is_locked: boolean - Whether or not the time entry has been locked.
  locked_reason: string - Why the time entry has been locked.
  is_closed: boolean - Whether or not the time entry has been approved via Timesheet Approval. Deprecated, use `approval_status` instead.
  approval_status: string - The approval status of the time entry. Possible values: “unsubmitted”, “submitted”, or “approved”.
  is_billed: boolean - Whether or not the time entry has been marked as invoiced.
  timer_started_at: datetime - Date and time the running timer was started (if tracking by duration). Use the ISO 8601 Format. Returns `null` for stopped timers.
  started_time: time - Time the time entry was started (if tracking by start/end times).
  ended_time: time - Time the time entry was ended (if tracking by start/end times).
  is_running: boolean - Whether or not the time entry is currently running.
  billable: boolean - Whether or not the time entry is billable.
  budgeted: boolean - Whether or not the time entry counts towards the project budget.
  billable_rate: decimal - The billable rate for the time entry.
  cost_rate: decimal - The cost rate for the time entry.
  created_at: datetime - Date and time the time entry was created. Use the ISO 8601 Format.
  updated_at: datetime - Date and time the time entry was last updated. Use the ISO 8601 Format.
```

--------------------------------

### Harvest API V2 Invoice Object Structure

Source: <https://help.getharvest.com/api-v2/invoices-api/invoices/invoices>

Defines the structure of an invoice object in Harvest API V2. Includes attributes for ID, client, line items, estimates, retainers, creator, client key, number, purchase order, amounts (total, due, tax, discount), subject, notes, currency, state, period dates, issue/due dates, payment terms, payment options, sent/paid/closed timestamps, recurring invoice ID, and creation/update timestamps.

```APIDOC
The invoice object⚭
Attribute | Type | Description  
---|---|---  
`id` | integer | Unique ID for the invoice.  
`client` | object | An object containing invoice’s client id and name.  
`line_items` | array | Array of invoice line items.  
`estimate` | object | An object containing the associated estimate’s id.  
`retainer` | object | An object containing the associated retainer’s id.  
`creator` | object | An object containing the id and name of the person that created the invoice.  
`client_key` | string | Used to build a URL to the public web invoice for your client by adding `/client/invoices/{CLIENT_KEY}` to your account URL `https://{SUBDOMAIN}.harvestapp.com/` Note: you can also add `.pdf` to the end of this URL to access a PDF version of the invoice.  
`number` | string | If no value is set, the number will be automatically generated.  
`purchase_order` | string | The purchase order number.  
`amount` | decimal | The total amount for the invoice, including any discounts and taxes.  
`due_amount` | decimal | The total amount due at this time for this invoice.  
`tax` | decimal | This percentage is applied to the subtotal, including line items and discounts.  
`tax_amount` | decimal | The first amount of tax included, calculated from `tax`. If no `tax` is defined, this value will be null.  
`tax2` | decimal | This percentage is applied to the subtotal, including line items and discounts.  
`tax2_amount` | decimal | The amount calculated from `tax2`.  
`discount` | decimal | This percentage is subtracted from the subtotal.  
`discount_amount` | decimal | The amount calculated from `discount`.  
`subject` | string | The invoice subject.  
`notes` | string | Any additional notes included on the invoice.  
`currency` | string | The currency code associated with this invoice.  
`state` | string | The current state of the invoice: `draft`, `open`, `paid`, or `closed`.  
`period_start` | date | Start of the period during which time entries were added to this invoice.  
`period_end` | date | End of the period during which time entries were added to this invoice.  
`issue_date` | date | Date the invoice was issued.  
`due_date` | date | Date the invoice is due.  
`payment_term` | string | The timeframe in which the invoice should be paid. Options: `upon receipt`, `net 15`, `net 30`, `net 45`, `net 60`, or `custom`.  
`payment_options` | array | The list of payment options enabled for the invoice. Options: [`ach`, `credit_card`, `paypal`]  
`sent_at` | datetime | Date and time the invoice was sent.  
`paid_at` | datetime | Date and time the invoice was paid.  
`paid_date` | date | Date the invoice was paid.  
`closed_at` | datetime | Date and time the invoice was closed.  
`recurring_invoice_id` | integer | Unique ID of the associated recurring invoice.  
`created_at` | datetime | Date and time the invoice was created.  
`updated_at` | datetime | Date and time the invoice was last updated.
```

--------------------------------

### Delete Project - Harvest API v2

Source: <https://help.getharvest.com/api-v2/projects-api/projects/projects>

Deletes a project and any time entries or expenses tracked to it. Invoices associated with the project will not be deleted. Archiving the project is recommended if time entries and expenses should not be deleted.

```APIDOC
DELETE /v2/projects/{PROJECT_ID}
```

--------------------------------

### Harvest Tasks Report API

Source: <https://help.getharvest.com/api-v2/reports-api/reports/time-reports>

Retrieves a report of time entries aggregated by task. Supports filtering by date range and pagination. Requires authentication and account ID.

```APIDOC
GET /v2/reports/time/tasks

Parameters:
- `from` (date, required): Start date for filtering time entries.
- `to` (date, required): End date for filtering time entries.
- `include_fixed_fee` (string, optional): Include fixed fee project calculations.
- `page` (integer, optional): Page number for pagination. Default is 1.
- `per_page` (integer, optional): Number of records per page. Max 2000. Default is 2000.

Example Request:
curl
"https://api.harvestapp.com/v2/reports/time/tasks?from=20170101&to=20171231" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"

Example Response:
{"results":[{"task_id":8083365,"task_name":"Graphic Design","total_hours":2,"billable_hours":2,"currency":"USD","billable_amount":200},{"task_id":8083366,"task_name":"Programming","total_hours":1.5,"billable_hours":1.5,"currency":"EUR","billable_amount":150},{"task_id":8083368,"task_name":"Project Management","total_hours":1.5,"billable_hours":1.5,"currency":"EUR","billable_amount":150},{"task_id":8083368,"task_name":"Project Management","total_hours":0.5,"billable_hours":0.5,"currency":"USD","billable_amount":50},{"task_id":8083369,"task_name":"Research","total_hours":1,"billable_hours":0,"currency":"EUR","billable_amount":0}],"per_page":2000,"total_pages":1,"total_entries":5,"next_page":null,"previous_page":null,"page":1,"links":{"first":"https://api.harvestapp.com/v2/reports/time/tasks?from=20170101&page=1&per_page=2000&to=20171231","next":null,"previous":null,"last":"https://api.harvestapp.com/v2/reports/time/tasks?from=20170101&page=1&per_page=2000&to=20171231"}}
```

--------------------------------

### Update Expense - PATCH /v2/expenses/{EXPENSE_ID}

Source: <https://help.getharvest.com/api-v2/expenses-api/expenses/expenses>

Updates a specific expense by setting parameter values. Unspecified parameters remain unchanged. Returns an expense object and a 200 OK status. Changes to project_id and expense_category_id are dropped if the expense is locked, but other attributes can be updated by authorized users.

```APIDOC
PATCH /v2/expenses/{EXPENSE_ID}

Parameters:
- project_id (integer): The ID of the project associated with this expense.
- expense_category_id (integer): The ID of the expense category this expense is being tracked against.
- spent_date (date): Date the expense occurred.
- units (integer): The quantity of units to use in calculating the total_cost of the expense.
- total_cost (decimal): The total amount of the expense.
- notes (string): Textual notes used to describe the expense.
- billable (boolean): Whether this expense is billable or not. Defaults to true.
- receipt (file): A receipt file to attach to the expense. Requires multipart/form-data request.
- delete_receipt (boolean): Whether an attached expense receipt should be deleted. Set to true to delete.
```

```bash
curl "https://api.harvestapp.com/v2/expenses/15297032" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X PATCH \
  -F notes="Dinner" \
  -F receipt=@dinner-receipt.gif
```

--------------------------------

### Retrieve a Time Entry

Source: <https://help.getharvest.com/api-v2/timesheets-api/timesheets/time-entries>

Retrieves a specific time entry by its ID. Requires authentication and account ID headers. Returns a time entry object upon successful retrieval.

```APIDOC
GET /v2/time_entries/{TIME_ENTRY_ID}

Retrieves the time entry with the given ID. Returns a time entry object and a `200 OK` response code if a valid identifier was provided.
```

```bash
curl "https://api.harvestapp.com/v2/time_entries/636708723" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"
```

```JSON
{
  "id": 636708723,
  "spent_date": "2017-03-01",
  "user": {
    "id": 1782959,
    "name": "Kim Allen"
  },
  "client": {
    "id": 5735776,
    "name": "123 Industries"
  },
  "project": {
    "id": 14308069,
    "name": "Online Store - Phase 1"
  },
  "task": {
    "id": 8083366,
    "name": "Programming"
  },
  "user_assignment": {
    "id": 125068554,
    "is_project_manager": true,
    "is_active": true,
    "budget": null,
    "created_at": "2017-06-26T22:32:52Z",
    "updated_at": "2017-06-26T22:32:52Z",
    "hourly_rate": 100.0
  },
  "task_assignment": {
    "id": 155505014,
    "billable": true,
    "is_active": true,
    "created_at": "2017-06-26T21:52:18Z",
    "updated_at": "2017-06-26T21:52:18Z",
    "hourly_rate": 100.0,
    "budget": null
  },
  "hours": 1.0,
  "hours_without_timer": 1.0,
  "rounded_hours": 1.0,
  "notes": "Importing products",
  "created_at": "2017-06-27T15:49:28Z",
  "updated_at": "2017-06-27T16:47:14Z",
  "is_locked": true,
  "locked_reason": "Item Invoiced and Approved and Locked for this Time Period",
  "is_closed": true,
  "approval_status": "approved",
  "is_billed": true,
  "timer_started_at": null,
  "started_time": "1:00pm",
  "ended_time": "2:00pm",
  "is_running": false,
  "invoice": {
    "id": 13150403,
    "number": "1001"
  },
  "external_reference": null,
  "billable": true,
  "budgeted": true,
  "billable_rate": 100.0,
  "cost_rate": 50.0
}
```

--------------------------------

### Permissions for Invoice Messages Endpoint

Source: <https://help.getharvest.com/api-v2/invoices-api/invoices/invoice-messages>

Details the required user permissions to interact with the `/v2/invoices/{INVOICE_ID}/messages` endpoint in Harvest API v2. Insufficient permissions result in a 403 Forbidden status.

```APIDOC
Required Permissions:
  - Administrator or Manager role.
  - Must have permission to create and edit invoices.

Error on Insufficient Permissions:
  - Status Code: 403 Forbidden
```

--------------------------------

### Harvest API v2 Accounts Endpoint

Source: <https://help.getharvest.com/api-v2/authentication-api/authentication/authentication>

Retrieves a list of accounts accessible by the user. This is useful for determining which Harvest or Forecast accounts an application can access based on granted scopes. The request includes an Authorization header with an access token and a User-Agent header.

```APIDOC
GET https://id.getharvest.com/api/v2/accounts

Authorization: Bearer $ACCESS_TOKEN
User-Agent: MyApp (yourname@example.com)

Example Response:
{"user":{"id":1,"first_name":"Albert","last_name":"Llop","email":"albert@example.com"},"accounts":[{"id":10254,"name":"Sterling Cooper Advertising Agency","product":"harvest"},{"id":88888,"name":"Iridesco","product":"forecast"},{"id":88903,"name":"Sterling Cooper Advertising Agency","product":"forecast"}]}
```

--------------------------------

### Create Estimate Message

Source: <https://help.getharvest.com/api-v2/estimates-api/estimates/estimate-messages>

Creates a new estimate message object. This can be used to send an estimate to recipients with a subject and body, or to trigger events like sending or accepting an estimate.

```APIDOC
POST /v2/estimates/{estimate_ID}/messages

Parameters:
- recipients (array, required): Array of recipient parameters.
  - name (string, optional): Name of the message recipient.
  - email (string, required): Email of the message recipient.
- subject (string, optional): The message subject.
- body (string, optional): The message body.
- send_me_a_copy (boolean, optional): If true, a copy of the message email will be sent to the current user. Defaults to false.
- event_type (string, optional): If provided, runs an event against the estimate. Options: “accept”, “decline”, “re-open”, or “send”.
```

```curl
curl "https://api.harvestapp.com/v2/estimates/1439818/messages" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"subject":"Estimate #1001","body":"Here is our estimate.","send_me_a_copy":true,"recipients":[{"name":"Richard Roe","email":"richardroe@example.com"}]}'
```

--------------------------------

### Re-open Closed Estimate

Source: <https://help.getharvest.com/api-v2/estimates-api/estimates/estimate-messages>

Creates a new estimate message object and re-opens a closed estimate. Returns an estimate message object and a 201 Created response code if the call succeeded.

```APIDOC
POST /v2/estimates/{estimate_ID}/messages

Parameters:
  event_type (string, required): Pass “re-open” to re-open the estimate.
```

```bash
curl "https://api.harvestapp.com/v2/estimates/1439818/messages" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"event_type":"re-open"}'
```

```json
{"id":2666246,"sent_by":"Bob Powell","sent_by_email":"bobpowell@example.com","sent_from":"Bob Powell","sent_from_email":"bobpowell@example.com","send_me_a_copy":false,"created_at":"2017-08-25T21:31:55Z","updated_at":"2017-08-25T21:31:55Z","recipients":[],"event_type":"re-open","subject":null,"body":null}
```

--------------------------------

### Harvest API V2 Update User Teammates

Source: <https://help.getharvest.com/api-v2/users-api/users/teammates>

Updates the teammates assigned to a specific user. Requires Administrator permissions and the user must be a Manager. Allows adding or removing teammates.

```APIDOC
PATCH /v2/users/{USER_ID}/teammates

Parameters:
`teammate_ids` (array of user ids, required): Full list of user IDs to be assigned to the Manager.

Example Request:
```curl
https://api.harvestapp.com/v2/users/1782959/teammates \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X PATCH \
  -H "Content-Type: application/json" \
  -d '{"teammate_ids":[3230547, 3230575]}'
```

Example Response:

```json
{"teammates":[{"id":3230547,"first_name":"Jim","last_name":"Allen","email":"jimallen@example.com"},{"id":3230575,"first_name":"Gary","last_name":"Brookes","email":"gary@example.com"}]}
```

```

--------------------------------

### Retrieve Specific User by ID

Source: https://help.getharvest.com/api-v2/users-api/users/users

Retrieves a specific user's information using their unique ID. This endpoint returns a user object and a 200 OK response code if a valid user ID is provided.

```APIDOC
GET /v2/users/{USER_ID}

Retrieves the user with the given ID. Returns a user object and a 200 OK response code if a valid identifier was provided.

Example response:
```

{"id":3230547,"first_name":"Jim","last_name":"Allen","email":"<jimallen@example.com>","telephone":"","timezone":"Mountain Time (US & Canada)","has_access_to_all_future_projects":false,"is_contractor":false,"is_active":true,"created_at":"2020-05-01T22:34:41Z","updated_at":"2020-05-01T22:34:52Z","weekly_capacity":126000,"default_hourly_rate":100.0,"cost_rate":50.0,"roles":["Developer"],"access_roles":["member"],"avatar_url":"<https://cache.harvestapp.com/assets/profile_images/abraj_albait_towers.png?1498516481"}>

```
```

```curl
curl "https://api.harvestapp.com/v2/users/3230547" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"
```

--------------------------------

### Delete User

Source: <https://help.getharvest.com/api-v2/users-api/users/users>

Deletes a user. This action is only permitted if the user has no associated time entries or expenses. A `200 OK` response code indicates success.

```APIDOC
DELETE /v2/users/{USER_ID}
```

--------------------------------

### Create and Send Invoice Message

Source: <https://help.getharvest.com/api-v2/invoices-api/invoices/invoice-messages>

Creates a new invoice message object and sends it. Supports specifying recipients, subject, body, attachments, and copy preferences. The `event_type` parameter controls sending behavior.

```APIDOC
POST /v2/invoices/{INVOICE_ID}/messages

Parameters:
- recipients (array, optional): Array of recipient objects, each with 'name' (string, optional) and 'email' (string, required).
- subject (string, optional): The subject of the message.
- body (string, optional): The body of the message.
- include_link_to_client_invoice (boolean, optional, DEPRECATED): Link to client invoice URL is automatically included if payment_options are assigned. Setting to true is ignored. Setting to false clears payment_options.
- attach_pdf (boolean, optional): If true, a PDF of the invoice is attached. Defaults to false.
- send_me_a_copy (boolean, optional): If true, a copy is sent to the current user. Defaults to false.
- thank_you (boolean, optional): If true, a thank you message email is sent. Defaults to false.
- event_type (string, optional): Omit to create and send. Default is null (sends message). Options include 'close', 'draft', 're-open', or 'send'.
```

```bash
curl "https://api.harvestapp.com/v2/invoices/13150403/messages" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"subject":"Invoice #1001","body":"The invoice is attached below.","attach_pdf":true,"send_me_a_copy":true,"recipients":[{"name":"Richard Roe","email":"richardroe@example.com"}]}'
```

--------------------------------

### Harvest API V2 Client Contacts Object Schema

Source: <https://help.getharvest.com/api-v2/clients-api/clients/contacts>

Defines the structure of a contact object within the Harvest API v2. It includes attributes like ID, client information, name, contact details, and timestamps.

```APIDOC
Attribute | Type | Description  
---|---|---
`id` | integer | Unique ID for the contact.  
`client` | object | An object containing the contact’s client id and name.  
`title` | string | The title of the contact.  
`first_name` | string | The first name of the contact.  
`last_name` | string | The last name of the contact.  
`email` | string | The contact’s email address.  
`phone_office` | string | The contact’s office phone number.  
`phone_mobile` | string | The contact’s mobile phone number.  
`fax` | string | The contact’s fax number.  
`created_at` | datetime | Date and time the contact was created.  
`updated_at` | datetime | Date and time the contact was last updated.
```

--------------------------------

### Harvest API v2: Update Task

Source: <https://help.getharvest.com/api-v2/tasks-api/tasks/tasks>

Updates a specific task by modifying provided parameters. Unspecified parameters remain unchanged. Returns the updated task object and a 200 OK response.

```APIDOC
PATCH /v2/tasks/{TASK_ID}

Parameters:
- name (string): The name of the task.
- billable_by_default (boolean): Determines if default tasks are billable.
- default_hourly_rate (decimal): The default hourly rate for the task.
- is_default (boolean): Whether the task is automatically added to future projects.
- is_active (boolean): Whether the task is active or archived.
```

```bash
curl "https://api.harvestapp.com/v2/tasks/8083782" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X PATCH \
  -H "Content-Type: application/json" \
  -d '{"is_default":true}'
```

--------------------------------

### Retrieve Expense by ID

Source: <https://help.getharvest.com/api-v2/expenses-api/expenses/expenses>

Retrieves a specific expense using its unique identifier. Requires a valid expense ID. Returns the expense object upon success.

```APIDOC
GET /v2/expenses/{EXPENSE_ID}

Parameters:
- EXPENSE_ID: The unique identifier of the expense to retrieve.
```

```curl
curl "https://api.harvestapp.com/v2/expenses/15296442" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"
```

--------------------------------

### Harvest API v2 Team Expense Report

Source: <https://help.getharvest.com/api-v2/reports-api/reports/expense-reports>

Retrieves a report of expenses aggregated by team members. Supports filtering by date range and pagination.

```APIDOC
GET /v2/reports/expenses/team

Parameters:
  from (date, required): Only report on expenses with a spent_date on or after the given date.
  to (date, required): Only report on expenses with a spent_date on or before the given date.
  page (integer, optional): The page number to use in pagination. (Default: 1)
  per_page (integer, optional): The number of records to return per page. Can range between 1 and 2000. (Default: 2000)

Example Request:
curl
"https://api.harvestapp.com/v2/reports/expenses/team?from=20170101&to=20171231" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"

Example Response:
{"results":[{"user_id":1782884,"user_name":"Bob Powell","is_contractor":false,"total_amount":100,"billable_amount":100,"currency":"USD"},{"user_id":1782959,"user_name":"Kim Allen","is_contractor":false,"total_amount":100,"billable_amount":100,"currency":"EUR"},{"user_id":1782959,"user_name":"Kim Allen","is_contractor":false,"total_amount":33.35,"billable_amount":33.35,"currency":"USD"}],"per_page":2000,"total_pages":1,"total_entries":3,"next_page":null,"previous_page":null,"page":1,"links":{"first":"https://api.harvestapp.com/v2/reports/expenses/team?from=20170101&page=1&per_page=2000&to=20171231","next":null,"previous":null,"last":"https://api.harvestapp.com/v2/reports/expenses/team?from=20170101&page=1&per_page=2000&to=20171231"}}
```

--------------------------------

### Retrieve Invoice by ID - Harvest API v2

Source: <https://help.getharvest.com/api-v2/invoices-api/invoices/invoices>

Retrieves an invoice using its unique identifier. Requires authentication and account ID headers. Returns the invoice object upon successful retrieval.

```HTTP
GET /v2/invoices/{INVOICE_ID}
```

```Shell
curl "https://api.harvestapp.com/v2/invoices/13150378" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"
```

```JSON
{
  "id": 13150378,
  "client_key": "9e97f4a65c5b83b1fc02f54e5a41c9dc7d458542",
  "number": "1000",
  "purchase_order": "1234",
  "amount": 10700.0,
  "due_amount": 0.0,
  "tax": 5.0,
  "tax_amount": 500.0,
  "tax2": 2.0,
  "tax2_amount": 200.0,
  "discount": null,
  "discount_amount": 0.0,
  "subject": "Online Store - Phase 1",
  "notes": "Some notes about the invoice.",
  "state": "paid",
  "period_start": null,
  "period_end": null,
  "issue_date": "2017-02-01",
  "due_date": "2017-03-03",
  "payment_term": "custom",
  "sent_at": "2017-02-01T07:00:00Z",
  "paid_at": "2017-02-21T00:00:00Z",
  "paid_date": "2017-02-21",
  "closed_at": null,
  "recurring_invoice_id": null,
  "created_at": "2017-06-27T16:24:30Z",
  "updated_at": "2017-06-27T16:24:57Z",
  "currency": "USD",
  "payment_options": [
    "credit_card"
  ],
  "client": {
    "id": 5735776,
    "name": "123 Industries"
  },
  "estimate": {
    "id": 1439814
  },
  "retainer": null,
  "creator": {
    "id": 1782884,
    "name": "Bob Powell"
  },
  "line_items": [
    {
      "id": 53341450,
      "kind": "Service",
      "description": "50% of Phase 1 of the Online Store",
      "quantity": 100.0,
      "unit_price": 100.0,
      "amount": 10000.0,
      "taxed": true,
      "taxed2": true,
      "project": {
        "id": 14308069,
        "name": "Online Store - Phase 1",
        "code": "OS1"
      }
    }
  ]
}
```

--------------------------------

### Mark Draft Estimate as Sent

Source: <https://help.getharvest.com/api-v2/estimates-api/estimates/estimate-messages>

Creates a new estimate message object and marks the estimate as sent. This is achieved by setting the `event_type` parameter to 'send'.

```APIDOC
POST /v2/estimates/{estimate_ID}/messages

Parameters:
- event_type (string, required): Pass “send” to mark the estimate as sent.
```

```curl
curl "https://api.harvestapp.com/v2/estimates/1439818/messages" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"event_type":"send"}'
```

--------------------------------

### Harvest Team Report API

Source: <https://help.getharvest.com/api-v2/reports-api/reports/time-reports>

Retrieves a report of time entries aggregated by team member. Supports filtering by date range and pagination. Requires authentication and account ID.

```APIDOC
GET /v2/reports/time/team

Parameters:
- `from` (date, required): Start date for filtering time entries.
- `to` (date, required): End date for filtering time entries.
- `include_fixed_fee` (string, optional): Include fixed fee project calculations.
- `page` (integer, optional): Page number for pagination. Default is 1.
- `per_page` (integer, optional): Number of records per page. Max 2000. Default is 2000.

Example Request:
curl
"https://api.harvestapp.com/v2/reports/time/team?from=20170101&to=20171231" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"

Example Response:
{"results":[{"user_id":1795925,"user_name":"Jane Smith","is_contractor":false,"total_hours":0.5,"billable_hours":0.5,"currency":"EUR","billable_amount":50,"weekly_capacity":126000,"avatar_url":"https://cache.harvestapp.com/assets/profile_images/abraj_albait_towers.png?1498516481"},{"user_id":1782959,"user_name":"Kim Allen","is_contractor":false,"total_hours":4,"billable_hours":3,"currency":"EUR","billable_amount":300,"weekly_capacity":126000,"avatar_url":"https://cache.harvestapp.com/assets/profile_images/cornell_clock_tower.png?1498515345"},{"user_id":1782959,"user_name":"Kim Allen","is_contractor":false,"total_hours":2,"billable_hours":2,"currency":"USD","billable_amount":200,"weekly_capacity":126000,"avatar_url":"https://cache.harvestapp.com/assets/profile_images/allen_bradley_clock_tower.png?1498509661"}],"per_page":2000,"total_pages":1,"total_entries":3,"next_page":null,"previous_page":null,"page":1,"links":{"first":"https://api.harvestapp.com/v2/reports/time/team?from=20170101&page=1&per_page=2000&to=20171231","next":null,"previous":null,"last":"https://api.harvestapp.com/v2/reports/time/team?from=20170101&page=1&per_page=2000&to=20171231"}}
```

--------------------------------

### Update Invoice

Source: <https://help.getharvest.com/api-v2/invoices-api/invoices/invoices>

Updates a specific invoice by setting the values of the parameters passed. Any parameters not provided will be left unchanged. Returns an invoice object and a 200 OK response code if the call succeeded.

```APIDOC
PATCH /v2/invoices/{INVOICE_ID}

Parameters:
- client_id (integer): The ID of the client this invoice belongs to.
- retainer_id (integer): The ID of the retainer associated with this invoice.
- estimate_id (integer): The ID of the estimate associated with this invoice.
- number (string): If no value is set, the number will be automatically generated.
- purchase_order (string): The purchase order number.
- tax (decimal): This percentage is applied to the subtotal, including line items and discounts. Example: use 10.0 for 10.0%.
- tax2 (decimal): This percentage is applied to the subtotal, including line items and discounts. Example: use 10.0 for 10.0%.
- discount (decimal): This percentage is subtracted from the subtotal. Example: use 10.0 for 10.0%.
- subject (string): The invoice subject.
- notes (string): Any additional notes to include on the invoice.
- currency (string): The currency used by the invoice. If not provided, the client’s currency will be used. See a list of supported currencies
- issue_date (date): Date the invoice was issued.
- due_date (date): Date the invoice is due.
- payment_term (string): The timeframe in which the invoice should be paid. Options: `upon receipt`, `net 15`, `net 30`, `net 45`, or `net 60`.
- payment_options (array): The payment options available to pay the invoice. Your account must be configured with the appropriate options under Settings > Integrations > Online payment to assign them. Options: [`ach`, `credit_card`, `paypal`]
- line_items (array): Array of line item parameters
  - id (integer): Unique ID for the line item.
  - project_id (integer): The ID of the project associated with this line item.
  - kind (string): The name of an invoice item category.
  - description (string): Text description of the line item.
  - quantity (decimal): The unit quantity of the item. Defaults to `1`.
  - unit_price (decimal): The individual price per unit.
  - taxed (boolean): Whether the invoice’s `tax` percentage applies to this line item. Defaults to `false`.
  - taxed2 (boolean): Whether the invoice’s `tax2` percentage applies to this line item. Defaults to `false`.
```

--------------------------------

### Update Contact - Harvest API v2

Source: <https://help.getharvest.com/api-v2/clients-api/clients/contacts>

Updates an existing contact using a PATCH request. Requires the contact ID in the URL. Any provided parameters (`client_id`, `title`, `first_name`, `last_name`, `email`, `phone_office`, `phone_mobile`, `fax`) will be updated. Returns the updated contact object and a 200 OK status.

```APIDOC
PATCH /v2/contacts/{CONTACT_ID}

Parameters:
  CONTACT_ID: The unique identifier for the contact.
  client_id (integer, optional): The ID of the client associated with this contact.
  title (string, optional): The title of the contact.
  first_name (string, optional): The first name of the contact.
  last_name (string, optional): The last name of the contact.
  email (string, optional): The contact’s email address.
  phone_office (string, optional): The contact’s office phone number.
  phone_mobile (string, optional): The contact’s mobile phone number.
  fax (string, optional): The contact’s fax number.
```

```curl
curl "https://api.harvestapp.com/v2/contacts/4706510" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X PATCH \
  -H "Content-Type: application/json" \
  -d '{"title":"Owner"}'
```

--------------------------------

### Retrieve Specific Task Assignment

Source: <https://help.getharvest.com/api-v2/projects-api/projects/task-assignments>

Fetches a single task assignment using its unique ID. Requires the project ID and the task assignment ID in the URL path.

```APIDOC
GET /v2/projects/{PROJECT_ID}/task_assignments/{TASK_ASSIGNMENT_ID}

Example Request:
curl "https://api.harvestapp.com/v2/projects/14308069/task_assignments/155505016" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"
```

--------------------------------

### Invoice Line Item Management (Harvest API v2)

Source: <https://help.getharvest.com/api-v2/invoices-api/invoices/invoices>

Provides API endpoints for managing line items within an invoice. This includes creating new line items, updating existing ones by their ID, and deleting line items from an invoice. All operations are performed via PATCH requests to the invoice endpoint.

```APIDOC
Endpoint: PATCH /v2/invoices/{INVOICE_ID}

Functionality:
- Create an invoice line item: Add a new line item to an existing invoice.
- Update an invoice line item: Modify an existing line item on an invoice using its ID.
- Delete an invoice line item: Remove a line item from an invoice by specifying its ID and a `_destroy: true` flag.

Request Headers:
- Authorization: Bearer $ACCESS_TOKEN
- Harvest-Account-ID: $ACCOUNT_ID
- User-Agent: MyApp (yourname@example.com)
- Content-Type: application/json

Request Body (JSON):
- `line_items`: An array of line item objects. Each object can contain `kind`, `description`, `unit_price`, `id`, and `_destroy` (for deletion).

Example Request (Create/Update):
```bash
curl "https://api.harvestapp.com/api/v2/invoices/13150403" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-ID: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X PATCH \
  -H "Content-Type: application/json" \
  -d '{"line_items":[{"kind":"Service","description":"DEF Project","unit_price":1000.0}]}'
```

Example Request (Delete):

```bash
curl "https://api.harvestapp.com/api/v2/invoices/13150403" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-ID: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X PATCH \
  -H "Content-Type: application/json" \
  -d '{"line_items":[{"id":53341928,"_destroy":true}]}'
```

Response:
A `200 OK` response code indicates success. The response body contains the updated invoice object.

```

--------------------------------

### Retrieve Invoice Message Content

Source: https://help.getharvest.com/api-v2/invoices-api/invoices/invoice-messages

Retrieves the subject and body of an invoice message for a specific invoice. Can fetch the default message, thank-you message, or reminder message content.

```APIDOC
GET /v2/invoices/{INVOICE_ID}/messages/new

Parameters:
- thank_you (boolean, optional): Set to true to return the subject and body of a thank-you message.
- reminder (boolean, optional): Set to true to return the subject and body of a reminder message.
```

```bash
curl "https://api.harvestapp.com/v2/invoices/13150403/messages/new?reminder=true" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"
```

--------------------------------

### Harvest API V2 Tasks - Retrieve Task by ID

Source: <https://help.getharvest.com/api-v2/tasks-api/tasks/tasks>

Retrieves a specific task from the Harvest API V2 using its unique ID. Returns the task object upon successful retrieval.

```APIDOC
GET /v2/tasks/{TASK_ID}

Example Request:
curl "https://api.harvestapp.com/v2/tasks/8083800" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"
```

--------------------------------

### Estimate Message Recipient Object Structure

Source: <https://help.getharvest.com/api-v2/estimates-api/estimates/estimate-messages>

Defines the structure of an estimate message recipient object used within the Harvest API v2's estimate messages. Includes the recipient's name and email.

```APIDOC
Attribute | Type | Description  
---|---|---
`name` | string | Name of the message recipient.  
`email` | string | Email of the message recipient.  
```

--------------------------------

### Update User

Source: <https://help.getharvest.com/api-v2/users-api/users/users>

Updates a specific user's details by providing the parameters to be changed. Unspecified parameters remain unchanged. Returns the updated user object upon success.

```APIDOC
PATCH /v2/users/{USER_ID}

Parameters:
- first_name (string): The first name of the user. Cannot be updated if the user is inactive.
- last_name (string): The last name of the user. Cannot be updated if the user is inactive.
- email (string): The email address of the user. Cannot be updated if the user is inactive.
- timezone (string): The user’s timezone. Defaults to the company’s timezone. See a list of supported time zones.
- has_access_to_all_future_projects (boolean): Whether the user should be automatically added to future projects.
- is_contractor (boolean): Whether the user is a contractor or an employee.
- is_active (boolean): Whether the user is active or archived.
- weekly_capacity (integer): The number of hours per week this person is available to work in seconds.
- roles (array of strings): Descriptive names of the business roles assigned to this person. They can be used for filtering reports, and have no effect in their permissions in Harvest.
- access_roles (array of strings): Access role(s) that determine the user’s permissions in Harvest. Possible values: `administrator`, `manager` or `member`. Users with the manager role can additionally be granted one or more of these roles: `project_creator`, `billable_rates_manager`, `managed_projects_invoice_drafter`, `managed_projects_invoice_manager`, `client_and_task_manager`, `time_and_expenses_manager`, `estimates_manager`.
```

```json
{
  "roles": ["Product Team"],
  "access_roles": ["manager", "time_and_expenses_manager", "billable_rates_manager"]
}
```

```bash
curl "https://api.harvestapp.com/v2/users/3237198" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X PATCH \
  -H "Content-Type: application/json" \
  -d '{"roles":["Product Team"], "access_roles":["manager", "time_and_expenses_manager", "billable_rates_manager"]}'
```

--------------------------------

### Update Time Entry

Source: <https://help.getharvest.com/api-v2/timesheets-api/timesheets/time-entries>

Updates a specific time entry by setting the values of provided parameters. Unspecified parameters remain unchanged. Returns the updated time entry object and a 200 OK response.

```APIDOC
PATCH /v2/time_entries/{TIME_ENTRY_ID}

Parameters:
- `project_id` (integer): The ID of the project to associate with the time entry.
- `task_id` (integer): The ID of the task to associate with the time entry.
- `spent_date` (date): The ISO 8601 formatted date the time entry was spent.
- `started_time` (time): The time the entry started. Defaults to the current time. Example: “8:00am”.
- `ended_time` (time): The time the entry ended.
- `hours` (decimal): The current amount of time tracked.
- `notes` (string): Any notes to be associated with the time entry.
- `external_reference` (object): An object containing the `id`, `group_id`, `account_id`, and `permalink` of the external reference.
```

```curl
curl "https://api.harvestapp.com/v2/time_entries/636718192" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X PATCH \
  -H "Content-Type: application/json" \
  -d '{"notes":"Updated notes"}'
```

```JSON
{"id":636718192,"spent_date":"2017-03-21","user":{"id":1782959,"name":"Kim Allen"},"client":{"id":5735774,"name":"ABC Corp"},"project":{"id":14307913,"name":"Marketing Website"},"task":{"id":8083365,"name":"Graphic Design"},"user_assignment":{"id":125068553,"is_project_manager":true,"is_active":true,"budget":null,"created_at":"2017-06-26T22:32:52Z","updated_at":"2017-06-26T22:32:52Z","hourly_rate":100.0},"task_assignment":{"id":155502709,"billable":true,"is_active":true,"created_at":"2017-06-26T21:36:23Z","updated_at":"2017-06-26T21:36:23Z","hourly_rate":100.0,"budget":null},"hours":1.0,"hours_without_timer":1.0,"rounded_hours":1.0,"notes":"Updated notes","created_at":"2017-06-27T16:01:23Z","updated_at":"2017-06-27T16:02:40Z","is_locked":false,"locked_reason":null,"is_closed":false,"approval_status":"unsubmitted","is_billed":false,"timer_started_at":null,"started_time":null,"ended_time":null,"is_running":false,"invoice":null,"external_reference":null,"billable":true,"budgeted":true,"billable_rate":100.0,"cost_rate":50.0}
```

--------------------------------

### Estimate Message Object Structure

Source: <https://help.getharvest.com/api-v2/estimates-api/estimates/estimate-messages>

Defines the structure of an estimate message object returned by the Harvest API v2. Includes attributes like ID, sender information, recipients, subject, body, and event type.

```APIDOC
Attribute | Type | Description  
---|---|---
`id` | integer | Unique ID for the message.  
`sent_by` | string | Name of the user that created the message.  
`sent_by_email` | string | Email of the user that created the message.  
`sent_from` | string | Name of the user that the message was sent from.  
`sent_from_email` | string | Email of the user that message was sent from.  
`recipients` | array | Array of estimate message recipients.  
`subject` | string | The message subject.  
`body` | string | The message body.  
`send_me_a_copy` | boolean | Whether to email a copy of the message to the current user.  
`event_type` | string | The type of estimate event that occurred with the message: send, accept, decline, re-open, view, or invoice.  
`created_at` | datetime | Date and time the message was created.  
`updated_at` | datetime | Date and time the message was last updated.  
```

--------------------------------

### Restart Stopped Time Entry

Source: <https://help.getharvest.com/api-v2/timesheets-api/timesheets/time-entries>

Restarts a time entry that is not currently running. A 200 OK response code indicates that the operation was successful.

```APIDOC
PATCH /v2/time_entries/{TIME_ENTRY_ID}/restart
```

```curl
curl "https://api.harvestapp.com/v2/time_entries/662202797/restart" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X PATCH
```

```JSON
{"id":662204379,"spent_date":"2017-03-21","user":{"id":1795925,"name":"Jane Smith"},"client":{"id":5735776,"name":"123 Industries"},"project":{"id":14808188,"name":"Task Force"},"task":{"id":8083366,"name":"Programming"},"user_assignment":{"id":130403296,"is_project_manager":true,"is_active":true,"budget":null,"created_at":"2017-08-22T17:36:54Z","updated_at":"2017-08-22T17:36:54Z","hourly_rate":100},"task_assignment":{"id":160726645,"billable":true,"is_active":true,"created_at":"2017-08-22T17:36:54Z","updated_at":"2017-08-22T17:36:54Z","hourly_rate":100,"budget":null},"hours":0,"hours_without_timer":0,"rounded_hours":0,"notes":null,"created_at":"2017-08-22T17:40:24Z","updated_at":"2017-08-22T17:40:24Z","is_locked":false,"locked_reason":null,"is_closed":false,"approval_status":"unsubmitted","is_billed":false,"timer_started_at":"2017-08-22T17:40:24Z","started_time":"11:40am","ended_time":null,"is_running":true,"invoice":null,"external_reference":null,"billable":true,"budgeted":false,"billable_rate":100,"cost_rate":75}
```

--------------------------------

### Delete Expense - DELETE /v2/expenses/{EXPENSE_ID}

Source: <https://help.getharvest.com/api-v2/expenses-api/expenses/expenses>

Deletes a specific expense. Returns a 200 OK response code upon successful deletion.

```APIDOC
DELETE /v2/expenses/{EXPENSE_ID}

Deletes an expense. Returns a 200 OK response code if the call succeeded.
```

```bash
curl "https://api.harvestapp.com/v2/expenses/15297032" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X DELETE
```

--------------------------------

### Delete Harvest Client

Source: <https://help.getharvest.com/api-v2/clients-api/clients/clients>

Deletes a client from Harvest. This operation is only permitted if the client has no associated projects, invoices, or estimates. Returns a `200 OK` status on successful deletion.

```APIDOC
DELETE /v2/clients/{CLIENT_ID}
```

```curl
curl "https://api.harvestapp.com/v2/clients/5737336" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X DELETE
```

--------------------------------

### Update Estimate Item Category

Source: <https://help.getharvest.com/api-v2/estimates-api/estimates/estimate-item-categories>

Updates a specific estimate item category by setting the values of provided parameters. Unspecified parameters remain unchanged. Returns the updated category object and a 200 OK status.

```APIDOC
PATCH /v2/estimate_item_categories/{ESTIMATE_ITEM_CATEGORY_ID}

Parameters:
- name (string): The name of the estimate item category.
```

```bash
curl "https://api.harvestapp.com/v2/estimate_item_categories/1379244" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X PATCH \
  -H "Content-Type: application/json" \
  -d '{"name":"Transportation"}'
```

--------------------------------

### Mark Invoice as Draft

Source: <https://help.getharvest.com/api-v2/invoices-api/invoices/invoice-messages>

This API endpoint allows you to create a new invoice message and mark an existing open invoice as a draft. It requires the invoice ID in the URL and an 'event_type' parameter set to 'draft' in the request body.

```APIDOC
POST /v2/invoices/{INVOICE_ID}/messages

Parameter | Type | Required | Description  
---|---|---|---
`event_type` | string | required | Pass “draft” to mark the invoice as a draft.
```

```curl
curl "https://api.harvestapp.com/v2/invoices/13150403/messages" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"event_type":"draft"}'
```

```APIDOC
Example Response:
```json
{"id":27835328,"sent_by":"Bob Powell","sent_by_email":"bobpowell@example.com","sent_from":"Bob Powell","sent_from_email":"bobpowell@example.com","include_link_to_client_invoice":false,"send_me_a_copy":false,"thank_you":false,"reminder":false,"send_reminder_on":null,"created_at":"2017-08-23T22:25:59Z","updated_at":"2017-08-23T22:25:59Z","attach_pdf":false,"event_type":"draft","recipients":[],"subject":null,"body":null}
```

```

--------------------------------

### Harvest API v2 Delete Contact

Source: https://help.getharvest.com/api-v2/clients-api/clients/contacts

Details the process for deleting a contact using the Harvest API v2. It specifies the HTTP method, endpoint, and expected response code upon successful deletion.

```APIDOC
DELETE /v2/contacts/{CONTACT_ID}
  - Deletes a contact.
  - Returns a `200 OK` response code if the call succeeded.
```

```curl
curl "https://api.harvestapp.com/v2/contacts/4706510" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X DELETE
```

--------------------------------

### Delete Role - Harvest API v2

Source: <https://help.getharvest.com/api-v2/roles-api/roles/roles>

Deletes a role from the Harvest API v2. This action unlinks the role from any assigned users. Returns a 200 OK response code upon successful deletion.

```APIDOC
DELETE /v2/roles/{ROLE_ID}
```

```bash
curl "https://api.harvestapp.com/v2/roles/617631" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X DELETE
```

--------------------------------

### Manage Invoice Status (Send, Close, Re-open)

Source: <https://help.getharvest.com/api-v2/invoices-api/invoices/invoice-messages>

Creates a new invoice message to update the status of an invoice. This includes marking an invoice as sent, closed (written off), or re-opening a closed invoice. Successful operations return a 201 Created status code along with the invoice message object.

```APIDOC
POST /v2/invoices/{INVOICE_ID}/messages
  Creates a new invoice message to update invoice status.
  Parameters:
    INVOICE_ID: The ID of the invoice.
    event_type: (string, required) Specifies the action: 'send', 'close', or 're-open'.
  Returns: 201 Created with invoice message object on success.
  Example Response (send):
  {"id":27835325,"sent_by":"Bob Powell","sent_by_email":"bobpowell@example.com","sent_from":"Bob Powell","sent_from_email":"bobpowell@example.com","include_link_to_client_invoice":false,"send_me_a_copy":false,"thank_you":false,"reminder":false,"send_reminder_on":null,"created_at":"2017-08-23T22:25:59Z","updated_at":"2017-08-23T22:25:59Z","attach_pdf":false,"event_type":"send","recipients":[],"subject":null,"body":null}
  Example Response (close):
  {"id":27835326,"sent_by":"Bob Powell","sent_by_email":"bobpowell@example.com","sent_from":"Bob Powell","sent_from_email":"bobpowell@example.com","include_link_to_client_invoice":false,"send_me_a_copy":false,"thank_you":false,"reminder":false,"send_reminder_on":null,"created_at":"2017-08-23T22:25:59Z","updated_at":"2017-08-23T22:25:59Z","attach_pdf":false,"event_type":"close","recipients":[],"subject":null,"body":null}
  Example Response (re-open):
  {"id":27835327,"sent_by":"Bob Powell","sent_by_email":"bobpowell@example.com","sent_from":"Bob Powell","sent_from_email":"bobpowell@example.com","include_link_to_client_invoice":false,"send_me_a_copy":false,"thank_you":false,"reminder":false,"send_reminder_on":null,"created_at":"2017-08-23T22:25:59Z","updated_at":"2017-08-23T22:25:59Z","attach_pdf":false,"event_type":"re-open","recipients":[],"subject":null,"body":null}
```

```curl
# Mark as sent
curl "https://api.harvestapp.com/v2/invoices/13150403/messages" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"event_type":"send"}'

# Mark as closed
curl "https://api.harvestapp.com/v2/invoices/13150403/messages" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"event_type":"close"}'

# Re-open a closed invoice
curl "https://api.harvestapp.com/v2/invoices/13150403/messages" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"event_type":"re-open"}'
```

--------------------------------

### Retrieve Expense Category

Source: <https://help.getharvest.com/api-v2/expenses-api/expenses/expense-categories>

Retrieves a specific expense category by its unique ID. Returns the expense category object upon successful retrieval.

```APIDOC
GET /v2/expense_categories/{EXPENSE_CATEGORY_ID}

Example Request:
curl "https://api.harvestapp.com/v2/expense_categories/4197501" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"

Example Response:
{"id":4197501,"name":"Lodging","unit_name":null,"unit_price":null,"is_active":true,"created_at":"2017-06-27T15:01:32Z","updated_at":"2017-06-27T15:01:32Z"}
```

--------------------------------

### Update Expense Category

Source: <https://help.getharvest.com/api-v2/expenses-api/expenses/expense-categories>

Updates an existing expense category by setting the values of provided parameters. Unspecified parameters remain unchanged. Returns the updated category object and a 200 OK status.

```APIDOC
PATCH /v2/expense_categories/{EXPENSE_CATEGORY_ID}

Parameters:
- name (string): The name of the expense category.
- unit_name (string): The unit name of the expense category.
- unit_price (decimal): The unit price of the expense category.
- is_active (boolean): Whether the expense category is active or archived.
```

```bash
curl "https://api.harvestapp.com/v2/expense_categories/4197514" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X PATCH \
  -H "Content-Type: application/json" \
  -d '{"is_active":false}'
```

--------------------------------

### Update Task Assignment

Source: <https://help.getharvest.com/api-v2/projects-api/projects/task-assignments>

Updates a specific task assignment by modifying provided parameters. Unspecified parameters remain unchanged. Returns the updated task assignment object and a 200 OK status code.

```APIDOC
PATCH /v2/projects/{PROJECT_ID}/task_assignments/{TASK_ASSIGNMENT_ID}

Parameters:
- is_active (boolean): Whether the task assignment is active or archived.
- billable (boolean): Whether the task assignment is billable or not.
- hourly_rate (decimal): Rate used when the project’s bill_by is Tasks.
- budget (decimal): Budget used when the project’s budget_by is task or task_fees.
```

```curl
curl "https://api.harvestapp.com/v2/projects/14308069/task_assignments/155506339" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X PATCH \
  -H "Content-Type: application/json" \
  -d '{"budget":120}'
```

```JSON
{"id":155506339,"billable":true,"is_active":true,"created_at":"2017-06-26T22:10:43Z","updated_at":"2017-06-26T22:11:27Z","hourly_rate":75.5,"budget":120.0,"project":{"id":14308069,"name":"Online Store - Phase 1","code":"OS1"},"task":{"id":8083800,"name":"Business Development"}}
```

--------------------------------

### Update Estimate Line Item

Source: <https://help.getharvest.com/api-v2/estimates-api/estimates/estimates>

Updates an existing line item on an estimate. Requires authentication and specific headers. The request body is a JSON object containing an array of line items to be updated.

```bash
curl "https://api.harvestapp.com/api/v2/estimates/1439827" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-ID: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X PATCH \
  -H "Content-Type: application/json" \
  -d '{"line_items":[{"id":53339199,"description":"Project Phase 2","unit_price":5000.0}]}'
```

```JSON
{"id":1439827,"client_key":"ddd4504a68fb7339138d0c2ea89ba05a3cf12aa8","number":"1002","purchase_order":"2345","amount":6000.0,"tax":null,"tax_amount":0.0,"tax2":null,"tax2_amount":0.0,"discount":null,"discount_amount":0.0,"subject":"Project Quote","notes":null,"state":"draft","issue_date":null,"sent_at":null,"created_at":"2017-06-27T16:16:24Z","updated_at":"2017-06-27T16:17:06Z","accepted_at":null,"declined_at":null,"currency":"USD","client":{"id":5735774,"name":"ABC Corp"},"creator":{"id":1782884,"name":"Bob Powell"},"line_items":[{"id":53339199,"kind":"Service","description":"Project Phase 2","quantity":1.0,"unit_price":5000.0,"amount":5000.0,"taxed":false,"taxed2":false},{"id":53339200,"kind":"Service","description":"Another Project","quantity":1.0,"unit_price":1000.0,"amount":1000.0,"taxed":false,"taxed2":false}]}
```

--------------------------------

### Invoice Message Object Attributes

Source: <https://help.getharvest.com/api-v2/invoices-api/invoices/invoice-messages>

Defines the attributes of an invoice message object in Harvest API v2. Includes details on ID, sender information, recipients, subject, body, attachment options, event types, and timestamps.

```APIDOC
Invoice Message Object:
  id: integer - Unique ID for the message.
  sent_by: string - Name of the user that created the message.
  sent_by_email: string - Email of the user that created the message.
  sent_from: string - Name of the user that the message was sent from.
  sent_from_email: string - Email of the user that message was sent from.
  recipients: array - Array of invoice message recipients.
  subject: string - The message subject.
  body: string - The message body.
  include_link_to_client_invoice: boolean - DEPRECATED. True when payment_options are assigned, false otherwise.
  attach_pdf: boolean - Whether to attach the invoice PDF to the message email.
  send_me_a_copy: boolean - Whether to email a copy of the message to the current user.
  thank_you: boolean - Whether this is a thank you message.
  event_type: string - Type of invoice event: close, draft, re-open, or send. Null if omitted.
  reminder: boolean - Whether this is a reminder message.
  send_reminder_on: date - The date the reminder email will be sent.
  created_at: datetime - Date and time the message was created.
  updated_at: datetime - Date and time the message was last updated.
```

--------------------------------

### Harvest API V2 Uninvoiced Report

Source: <https://help.getharvest.com/api-v2/reports-api/reports/uninvoiced-report>

Retrieves a report of uninvoiced hours and expenses for billable projects within a specified date range. Supports filtering by date, inclusion of fixed-fee projects, and pagination.

```APIDOC
GET /v2/reports/uninvoiced

Parameters:
- from (date, required): Only report on time entries and expenses with a spent_date on or after the given date.
- to (date, required): Only report on time entries and expenses with a spent_date on or before the given date.
- include_fixed_fee (boolean, optional): Whether or not to include fixed-fee projects in the response. Defaults to true.
- page (integer, optional): The page number to use in pagination. Defaults to 1.
- per_page (integer, optional): The number of records to return per page. Can range between 1 and 2000. Defaults to 2000.

Example Request:
curl
"https://api.harvestapp.com/v2/reports/uninvoiced?from=20170101&to=20171231" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)"

Example Response:
{"results":[{"client_id":5735776,"client_name":"123 Industries","project_id":14308069,"project_name":"Online Store - Phase 1","currency":"EUR","total_hours":4,"uninvoiced_hours":0,"uninvoiced_expenses":100,"uninvoiced_amount":100},{"client_id":5735776,"client_name":"123 Industries","project_id":14808188,"project_name":"Task Force","currency":"EUR","total_hours":0.5,"uninvoiced_hours":0.5,"uninvoiced_expenses":0,"uninvoiced_amount":50},{"client_id":5735774,"client_name":"ABC Corp","project_id":14307913,"project_name":"Marketing Website","currency":"USD","total_hours":2,"uninvoiced_hours":0,"uninvoiced_expenses":0,"uninvoiced_amount":0}],"per_page":2000,"total_pages":1,"total_entries":3,"next_page":null,"previous_page":null,"page":1,"links":{"first":"https://api.harvestapp.com/v2/reports/uninvoiced?from=20170101&page=1&per_page=2000&to=20171231","next":null,"previous":null,"last":"https://api.harvestapp.com/v2/reports/uninvoiced?from=20170101&page=1&per_page=2000&to=20171231"}}

Result Object Attributes:
- client_id (integer): The ID of the client.
- client_name (string): The name of the client.
- project_id (integer): The ID of the project.
- project_name (string): The name of the project.
- currency (string): The currency code.
- total_hours (decimal): Total hours for the timeframe and project.
- uninvoiced_hours (decimal): Total uninvoiced hours for the timeframe and project.
- uninvoiced_expenses (decimal): Total uninvoiced expenses for the timeframe and project.
- uninvoiced_amount (decimal): Total uninvoiced amount (time and expenses) for the timeframe and project.
```

--------------------------------

### Delete User Assignment

Source: <https://help.getharvest.com/api-v2/projects-api/projects/user-assignments>

Deletes a specific user assignment from a project. This operation is only permitted if the user assignment has no associated time entries or expenses. A 200 OK response code indicates successful deletion.

```APIDOC
DELETE /v2/projects/{PROJECT_ID}/user_assignments/{USER_ASSIGNMENT_ID}
```

```curl
curl "https://api.harvestapp.com/v2/projects/14308069/user_assignments/125068758" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X DELETE
```

--------------------------------

### Harvest API v2: Delete Task

Source: <https://help.getharvest.com/api-v2/tasks-api/tasks/tasks>

Deletes a task. This operation is only possible if the task has no associated time entries. A 200 OK response code indicates success.

```APIDOC
DELETE /v2/tasks/{TASK_ID}
```

```bash
curl "https://api.harvestapp.com/v2/tasks/8083782" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X DELETE
```

--------------------------------

### Stop Running Time Entry - Harvest API v2

Source: <https://help.getharvest.com/api-v2/timesheets-api/timesheets/time-entries>

This API endpoint allows you to stop a time entry that is currently running. A successful request will return a 200 OK status code. Ensure the time entry ID provided is for an active entry.

```HTTP
PATCH /v2/time_entries/{TIME_ENTRY_ID}/stop
```

```Shell
curl "https://api.harvestapp.com/v2/time_entries/662202797/stop" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X PATCH
```

--------------------------------

### Update Invoice Item Category

Source: <https://help.getharvest.com/api-v2/invoices-api/invoices/invoice-item-categories>

Updates a specific invoice item category by setting the values of provided parameters. Unspecified parameters remain unchanged. Returns the updated invoice item category object and a 200 OK status.

```APIDOC
PATCH /v2/invoice_item_categories/{INVOICE_ITEM_CATEGORY_ID}

Parameters:
- name (string): The name of the invoice item category.
```

```curl
curl "https://api.harvestapp.com/v2/invoice_item_categories/1467098" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X PATCH \
  -H "Content-Type: application/json" \
  -d '{"name":"Expense"}'
```

--------------------------------

### Delete Estimate

Source: <https://help.getharvest.com/api-v2/estimates-api/estimates/estimates>

Deletes an entire estimate from the system. This operation uses the DELETE HTTP method on the specific estimate's endpoint.

```APIDOC
DELETE /v2/estimates/{ESTIMATE_ID}
```

```bash
curl "https://api.harvestapp.com/v2/estimates/1439827" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X DELETE
```

--------------------------------

### Delete Invoice Item Category

Source: <https://help.getharvest.com/api-v2/invoices-api/invoices/invoice-item-categories>

Deletes an invoice item category. This is only possible if 'use_as_service' and 'use_as_expense' are both false. Returns a 200 OK status code if the call succeeded.

```APIDOC
DELETE /v2/invoice_item_categories/{INVOICE_ITEM_CATEGORY_ID}
```

```curl
curl "https://api.harvestapp.com/v2/invoice_item_categories/1467098" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X DELETE
```

--------------------------------

### Delete Estimate Message

Source: <https://help.getharvest.com/api-v2/estimates-api/estimates/estimate-messages>

Deletes an existing estimate message. A `200 OK` response code indicates success.

```APIDOC
DELETE /v2/estimates/{estimate_ID}/messages/{message_ID}
```

```curl
curl "https://api.harvestapp.com/v2/estimates/1439818/messages/2666240" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X DELETE
```

--------------------------------

### Invoice Message Recipient Object Attributes

Source: <https://help.getharvest.com/api-v2/invoices-api/invoices/invoice-messages>

Defines the attributes for an invoice message recipient in Harvest API v2, including the recipient's name and email address.

```APIDOC
Invoice Message Recipient Object:
  name: string - Name of the message recipient.
  email: string - Email of the message recipient.
```

--------------------------------

### Delete Expense Category

Source: <https://help.getharvest.com/api-v2/expenses-api/expenses/expense-categories>

Deletes a specific expense category. Returns a 200 OK status code if the deletion was successful.

```APIDOC
DELETE /v2/expense_categories/{EXPENSE_CATEGORY_ID}
```

```bash
curl "https://api.harvestapp.com/v2/expense_categories/4197514" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X DELETE
```

--------------------------------

### Delete Estimate Item Category

Source: <https://help.getharvest.com/api-v2/estimates-api/estimates/estimate-item-categories>

Deletes an estimate item category. Returns a 200 OK status code if the operation is successful.

```APIDOC
DELETE /v2/estimate_item_categories/{ESTIMATE_ITEM_CATEGORY_ID}
```

```bash
curl "https://api.harvestapp.com/v2/estimate_item_categories/1379244" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X DELETE
```

--------------------------------

### Delete Time Entry External Reference

Source: <https://help.getharvest.com/api-v2/timesheets-api/timesheets/time-entries>

Deletes the external reference associated with a specific time entry. A 200 OK response code indicates success.

```APIDOC
DELETE /v2/time_entries/{TIME_ENTRY_ID}/external_reference
```

```curl
curl
"https://api.harvestapp.com/v2/time_entries/636718192/external_reference" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X DELETE
```

--------------------------------

### Delete Time Entry

Source: <https://help.getharvest.com/api-v2/timesheets-api/timesheets/time-entries>

Deletes a time entry. This operation is restricted for closed entries or entries associated with archived projects/tasks, unless performed by an Admin. A 200 OK response code signifies success.

```APIDOC
DELETE /v2/time_entries/{TIME_ENTRY_ID}
```

```curl
curl "https://api.harvestapp.com/v2/time_entries/636718192" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X DELETE
```

--------------------------------

### Delete Estimate Line Item

Source: <https://help.getharvest.com/api-v2/estimates-api/estimates/estimates>

Deletes a line item from an estimate. This is achieved by sending a PATCH request with the line item's ID and a `_destroy` flag set to true in the request body.

```bash
curl "https://api.harvestapp.com/api/v2/estimates/1439827" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-ID: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X PATCH \
  -H "Content-Type: application/json" \
  -d '{"line_items":[{"id":53339199,"_destroy":true}]}'
```

```JSON
{"id":1439827,"client_key":"ddd4504a68fb7339138d0c2ea89ba05a3cf12aa8","number":"1002","purchase_order":"2345","amount":1000.0,"tax":null,"tax_amount":0.0,"tax2":null,"tax2_amount":0.0,"discount":null,"discount_amount":0.0,"subject":"Project Quote","notes":null,"state":"draft","issue_date":null,"sent_at":null,"created_at":"2017-06-27T16:16:24Z","updated_at":"2017-06-27T16:17:06Z","accepted_at":null,"declined_at":null,"currency":"USD","client":{"id":5735774,"name":"ABC Corp"},"creator":{"id":1782884,"name":"Bob Powell"},"line_items":[{"id":53339200,"kind":"Service","description":"Another Project","quantity":1.0,"unit_price":1000.0,"amount":1000.0,"taxed":false,"taxed2":false}]}
```

--------------------------------

### Delete Task Assignment

Source: <https://help.getharvest.com/api-v2/projects-api/projects/task-assignments>

Deletes a task assignment. This operation is only possible if the task assignment has no associated time entries. A 200 OK response code indicates success.

```APIDOC
DELETE /v2/projects/{PROJECT_ID}/task_assignments/{TASK_ASSIGNMENT_ID}
```

```curl
curl "https://api.harvestapp.com/v2/projects/14308069/task_assignments/155506339" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X DELETE
```

--------------------------------

### Delete Invoice Payment - Harvest API v2

Source: <https://help.getharvest.com/api-v2/invoices-api/invoices/invoice-payments>

Deletes an existing invoice payment. Requires both the invoice ID and the specific payment ID. Returns a 200 OK status upon successful deletion.

```APIDOC
DELETE /v2/invoices/{INVOICE_ID}/payments/{PAYMENT_ID}

Example Request:
curl "https://api.harvestapp.com/v2/invoices/13150378/payments/10336386" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X DELETE
```

--------------------------------

### Delete Invoice (Harvest API v2)

Source: <https://help.getharvest.com/api-v2/invoices-api/invoices/invoices>

Allows for the deletion of an entire invoice using its ID. This operation is performed via a DELETE request to the specific invoice endpoint.

```APIDOC
Endpoint: DELETE /v2/invoices/{INVOICE_ID}

Functionality:
- Delete an invoice: Permanently removes an invoice from the system.

Request Headers:
- Authorization: Bearer $ACCESS_TOKEN
- Harvest-Account-ID: $ACCOUNT_ID
- User-Agent: MyApp (yourname@example.com)

Example Request:
```bash
curl "https://api.harvestapp.com/v2/invoices/13150453" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-ID: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X DELETE
```

Response:
A `200 OK` response code indicates success.

```

--------------------------------

### Delete Invoice Message

Source: https://help.getharvest.com/api-v2/invoices-api/invoices/invoice-messages

Deletes a specific message associated with an invoice. A successful deletion returns a 200 OK status code.

```APIDOC
DELETE /v2/invoices/{INVOICE_ID}/messages/{message_ID}
  Deletes an invoice message.
  Parameters:
    INVOICE_ID: The ID of the invoice.
    message_ID: The ID of the message to delete.
  Returns: 200 OK on success.
```

```curl
curl "https://api.harvestapp.com/v2/invoices/13150403/messages/27835324" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Harvest-Account-Id: $ACCOUNT_ID" \
  -H "User-Agent: MyApp (yourname@example.com)" \
  -X DELETE
```

=== COMPLETE CONTENT === This response contains all available snippets from this library. No additional content exists. Do not make further requests.
