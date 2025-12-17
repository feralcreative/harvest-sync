// Harvest Sync Dashboard JavaScript

// State
let activityHistory = [];

// Timer State
let timerState = {
  selectedAccount: null,
  selectedUserId: null,
  selectedUserName: null,
  agency: {
    running: false,
    paused: false,
    seconds: 0,
    intervalId: null,
    projectId: null,
    taskId: null,
    notes: "",
  },
  contractor: {
    running: false,
    paused: false,
    seconds: 0,
    intervalId: null,
    projectId: null,
    taskId: null,
    notes: "",
  },
};

// DOM Elements
const fromDateInput = document.getElementById("fromDate");
const toDateInput = document.getElementById("toDate");
const billingYear = document.getElementById("billingYear");
const billingMonth = document.getElementById("billingMonth");
const billingHalf = document.getElementById("billingHalf");
const syncAllTime = document.getElementById("syncAllTime");
const btnPreview = document.getElementById("btnPreview");
const btnSync = document.getElementById("btnSync");
const btnClearResults = document.getElementById("btnClearResults");
const resultsSection = document.getElementById("resultsSection");
const resultsContent = document.getElementById("resultsContent");
const activityList = document.getElementById("activityList");
const loadingOverlay = document.getElementById("loadingOverlay");
const loadingText = document.getElementById("loadingText");
const toastContainer = document.getElementById("toastContainer");

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  initializeDates();
  checkConnection();
  displaySyncUsers();
  loadActivityHistory();
  setupEventListeners();
  setupNavigation();
  loadSettings();
  // TIMER DISABLED
  // initializeTimer();
});

// Initialize date inputs with default values
function initializeDates() {
  // Populate year dropdown (current year and 2 years back)
  const currentYear = new Date().getFullYear();
  for (let year = currentYear; year >= currentYear - 2; year--) {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    billingYear.appendChild(option);
  }

  // Calculate the most recently closed billing period
  const today = new Date();
  const currentDay = today.getDate();

  let defaultYear = today.getFullYear();
  let defaultMonth = today.getMonth();
  let defaultHalf = "first";

  if (currentDay <= 15) {
    // We're in the first half, so default to previous period (second half of last month)
    defaultHalf = "second";
    defaultMonth--;
    if (defaultMonth < 0) {
      defaultMonth = 11;
      defaultYear--;
    }
  } else {
    // We're in the second half, so default to first half of current month
    defaultHalf = "first";
  }

  // Set the defaults
  billingYear.value = defaultYear;
  billingMonth.value = defaultMonth;
  billingHalf.value = defaultHalf;

  // Update billing half dropdown labels
  updateBillingHalfLabels();

  // Update the date range display
  updateDateRange();
}

// Update billing half dropdown labels with actual end date
function updateBillingHalfLabels() {
  const year = parseInt(billingYear.value);
  const month = parseInt(billingMonth.value);

  // Calculate the last day of the month
  const lastDay = new Date(year, month + 1, 0).getDate();

  // Update the second half option text
  const secondOption = billingHalf.querySelector('option[value="second"]');
  if (secondOption) {
    secondOption.textContent = `Second Half: 16th - ${lastDay}th`;
  }
}

// Format date as YYYY-MM-DD
function formatDate(date) {
  return date.toISOString().split("T")[0];
}

// Format hours as hh:mm (convert decimal to time format)
function formatHours(hours) {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return `${h}:${m.toString().padStart(2, "0")}`;
}

// Update date range based on billing period selection
function updateDateRange() {
  const year = parseInt(billingYear.value);
  const month = parseInt(billingMonth.value);
  const half = billingHalf.value;

  let fromDate, toDate;

  if (half === "full") {
    // Full month
    fromDate = new Date(year, month, 1);
    toDate = new Date(year, month + 1, 0); // Last day of the month
  } else if (half === "first") {
    // 1st through 15th
    fromDate = new Date(year, month, 1);
    toDate = new Date(year, month, 15);
  } else {
    // 16th through end of month
    fromDate = new Date(year, month, 16);
    toDate = new Date(year, month + 1, 0); // Last day of the month
  }

  fromDateInput.value = formatDate(fromDate);
  toDateInput.value = formatDate(toDate);
}

// Setup event listeners
function setupEventListeners() {
  // Billing period selectors
  billingYear.addEventListener("change", () => {
    updateBillingHalfLabels();
    updateDateRange();
  });
  billingMonth.addEventListener("change", () => {
    updateBillingHalfLabels();
    updateDateRange();
  });
  billingHalf.addEventListener("change", updateDateRange);

  // Sync all time checkbox
  syncAllTime.addEventListener("change", () => {
    // Disable/enable date selectors when sync all time is checked
    billingYear.disabled = syncAllTime.checked;
    billingMonth.disabled = syncAllTime.checked;
    billingHalf.disabled = syncAllTime.checked;
  });

  // Action buttons
  btnPreview.addEventListener("click", handlePreview);
  btnSync.addEventListener("click", handleSync);
  btnClearResults.addEventListener("click", clearResults);
}

// Check connection status
async function checkConnection() {
  try {
    const response = await fetch("/api/status");
    const data = await response.json();

    updateConnectionStatus("agency", data.agency);
    updateConnectionStatus("contractor", data.contractor);

    // Apply brand colors
    applyBrandColors(data.agency.brandColor, data.contractor.brandColor);
  } catch (error) {
    console.error("Error checking connection:", error);
    showToast("Error", "Failed to check connection status", "error");
  }
}

// Apply brand colors to the page
function applyBrandColors(agencyColor, contractorColor) {
  // Set CSS custom properties for brand colors
  document.documentElement.style.setProperty("--agency-brand-color", agencyColor);
  document.documentElement.style.setProperty("--contractor-brand-color", contractorColor);
}

// Update connection status UI
function updateConnectionStatus(type, status) {
  const statusIcon = document.getElementById(`${type}Status`);
  const statusName = document.getElementById(`${type}Name`);

  if (status.connected) {
    statusIcon.classList.remove("status-icon--pending", "status-icon--error");
    statusIcon.classList.add("status-icon--success");
    statusIcon.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    `;
    statusName.textContent = status.name;
  } else {
    statusIcon.classList.remove("status-icon--pending", "status-icon--success");
    statusIcon.classList.add("status-icon--error");
    statusIcon.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    `;
    statusName.textContent = status.error || "Not connected";
  }
}

// Get selected users from settings (now from .env via API)
async function getSelectedSyncUsers() {
  try {
    const response = await fetch("/api/sync/users");
    if (!response.ok) {
      throw new Error("Failed to fetch sync users");
    }
    const data = await response.json();
    // Return array of agency user IDs
    return data.users.filter((u) => u.agency.found).map((u) => u.agency.userId);
  } catch (error) {
    console.error("Error fetching sync users:", error);
    return [];
  }
}

// Display sync users on the dashboard
async function displaySyncUsers() {
  try {
    const response = await fetch("/api/sync/users");
    if (!response.ok) {
      throw new Error("Failed to fetch sync users");
    }
    const data = await response.json();

    // Find the sync users display element (we'll need to add this to the HTML)
    const syncUsersElement = document.getElementById("syncUsersDisplay");
    if (syncUsersElement) {
      const userNames = data.users.map((u) => u.name).join(", ");
      syncUsersElement.textContent = userNames || "No users configured";
    }
  } catch (error) {
    console.error("Error displaying sync users:", error);
  }
}

// Handle preview
async function handlePreview() {
  let fromDate, toDate;

  if (syncAllTime.checked) {
    // Use a very early date to get all entries
    fromDate = "2000-01-01";
    toDate = new Date().toISOString().split("T")[0]; // Today
  } else {
    fromDate = fromDateInput.value;
    toDate = toDateInput.value;

    if (!fromDate || !toDate) {
      showToast("Error", "Please select both from and to dates", "error");
      return;
    }
  }

  // Get selected users from settings
  const selectedUsers = await getSelectedSyncUsers();
  if (selectedUsers.length === 0) {
    showToast("Error", "Please configure sync users in .env (EMPLOYEE_1_NAME, EMPLOYEE_2_NAME)", "error");
    return;
  }

  showLoading("Generating preview...");

  try {
    const response = await fetch("/api/preview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fromDate, toDate, userIds: selectedUsers }),
    });

    const data = await response.json();

    if (response.ok) {
      displayResults(data, "preview");
      const displayFrom = syncAllTime.checked ? "All Time" : fromDate;
      const displayTo = syncAllTime.checked ? "" : toDate;
      addToActivity("Preview", displayFrom, displayTo, data.summary, data);
      showToast("Success", "Preview generated successfully", "success");
    } else {
      throw new Error(data.error || "Preview failed");
    }
  } catch (error) {
    console.error("Preview error:", error);
    showToast("Error", error.message, "error");
  } finally {
    hideLoading();
  }
}

// Handle sync
async function handleSync() {
  let fromDate, toDate;

  if (syncAllTime.checked) {
    // Use a very early date to get all entries
    fromDate = "2000-01-01";
    toDate = new Date().toISOString().split("T")[0]; // Today
  } else {
    fromDate = fromDateInput.value;
    toDate = toDateInput.value;

    if (!fromDate || !toDate) {
      showToast("Error", "Please select both from and to dates", "error");
      return;
    }
  }

  // Get selected users from settings
  const selectedUsers = await getSelectedSyncUsers();
  if (selectedUsers.length === 0) {
    showToast("Error", "Please configure sync users in .env (EMPLOYEE_1_NAME, EMPLOYEE_2_NAME)", "error");
    return;
  }

  const confirmMessage = syncAllTime.checked
    ? "Are you sure you want to sync ALL time entries from all time periods? This will create entries in your contractor account."
    : "Are you sure you want to sync time entries? This will create entries in your contractor account.";

  if (!confirm(confirmMessage)) {
    return;
  }

  showLoading("Syncing time entries...");

  try {
    const response = await fetch("/api/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fromDate, toDate, userIds: selectedUsers }),
    });

    const data = await response.json();

    if (response.ok) {
      displayResults(data, "sync");
      const displayFrom = syncAllTime.checked ? "All Time" : fromDate;
      const displayTo = syncAllTime.checked ? "" : toDate;
      addToActivity("Sync", displayFrom, displayTo, data.summary, data);
      showToast("Success", `Synced ${data.summary.entriesCreated} entries successfully`, "success");
    } else {
      throw new Error(data.error || "Sync failed");
    }
  } catch (error) {
    console.error("Sync error:", error);
    showToast("Error", error.message, "error");
  } finally {
    hideLoading();
  }
}

// Display results
function displayResults(data, type) {
  const summary = data.summary;
  const lineItems = data.lineItems || [];

  let html = `
    <div class="results-summary">
      <h3>${type === "preview" ? "Preview" : "Sync"} Summary</h3>
      <div class="summary-grid">
        <div class="summary-item">
          <div class="summary-label">Total Entries</div>
          <div class="summary-value">${summary.totalEntries || 0}</div>
        </div>
        <div class="summary-item">
          <div class="summary-label">Total Hours</div>
          <div class="summary-value">${formatHours(summary.totalHours || 0)}</div>
        </div>
        <div class="summary-item">
          <div class="summary-label">Projects</div>
          <div class="summary-value">${summary.totalProjects || 0}</div>
        </div>
        ${
          type === "sync"
            ? `
        <div class="summary-item">
          <div class="summary-label">Created</div>
          <div class="summary-value">${summary.entriesCreated || 0}</div>
        </div>
        <div class="summary-item">
          <div class="summary-label">Skipped</div>
          <div class="summary-value">${summary.entriesSkipped || 0}</div>
        </div>
        `
            : `
        <div class="summary-item">
          <div class="summary-label">New Projects</div>
          <div class="summary-value">${summary.newProjects || 0}</div>
        </div>
        <div class="summary-item">
          <div class="summary-label">New Tasks</div>
          <div class="summary-value">${summary.newTasks || 0}</div>
        </div>
        `
        }
      </div>
    </div>
  `;

  // Add hours by user section if available
  if (summary.hoursByUser && Object.keys(summary.hoursByUser).length > 0) {
    html += `
      <div class="hours-by-user-section">
        <h3>Hours by Worker</h3>
        <div class="hours-by-user-grid">
          ${Object.entries(summary.hoursByUser)
            .map(
              ([user, hours]) => `
            <div class="user-hours-card">
              <div class="user-name">${user}</div>
              <div class="user-hours">${formatHours(hours)}</div>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `;
  }

  // Add line items table (always show, even if empty)
  html += `
    <div class="line-items-section">
      <h3>Line Items</h3>
      ${
        type === "preview"
          ? '<p class="status-legend"><strong>Status Guide:</strong> <span class="status-badge pending">Pending</span> = Will be synced <span class="status-badge duplicate">Duplicate</span> = Already exists, will be skipped</p>'
          : '<p class="status-legend"><strong>Status Guide:</strong> <span class="status-badge created">Created</span> = Successfully synced <span class="status-badge duplicate">Duplicate</span> = Already existed, skipped</p>'
      }
      <div class="table-container">
        <table class="line-items-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>User</th>
              <th>Project</th>
              <th>Task</th>
              <th>Hours</th>
              <th>Notes</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${
              lineItems.length > 0
                ? lineItems
                    .map(
                      (item) => `
                    <tr class="line-item-row ${item.entryStatus}">
                      <td>${item.date}</td>
                      <td>${item.user}</td>
                      <td>
                        ${item.project}
                        ${
                          item.projectCode
                            ? `<br><small style="color: var(--harvest-gray-600);">Code: ${item.projectCode}</small>`
                            : ""
                        }
                        ${
                          item.projectStatus === "new"
                            ? '<span class="status-badge new-project">New Project</span>'
                            : '<span class="status-badge exists">Exists</span>'
                        }
                      </td>
                      <td>
                        ${item.task}
                        ${item.taskStatus === "new" ? '<span class="status-badge new-task">New Task</span>' : ""}
                      </td>
                      <td>${formatHours(item.hours)}</td>
                      <td class="notes-cell">${item.notes || "-"}</td>
                      <td>
                        ${
                          item.entryStatus === "duplicate"
                            ? '<span class="status-badge duplicate">Duplicate</span>'
                            : item.entryStatus === "created"
                            ? '<span class="status-badge created">Created</span>'
                            : '<span class="status-badge pending">Pending</span>'
                        }
                      </td>
                    </tr>
                  `
                    )
                    .join("")
                : `
                <tr>
                  <td colspan="7" style="text-align: center; padding: 2rem; color: var(--harvest-gray-600);">
                    No time entries found for the selected period
                  </td>
                </tr>
              `
            }
          </tbody>
        </table>
      </div>
    </div>
  `;

  resultsContent.innerHTML = html;
  resultsSection.style.display = "block";
  resultsSection.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// Clear results
function clearResults() {
  resultsSection.style.display = "none";
  resultsContent.innerHTML = "";
}

// Add to activity history
function addToActivity(type, fromDate, toDate, summary, fullData = null) {
  const activity = {
    type,
    fromDate,
    toDate,
    summary,
    timestamp: new Date().toISOString(),
    data: fullData, // Store full data for later retrieval
  };

  activityHistory.unshift(activity);
  if (activityHistory.length > 10) {
    activityHistory = activityHistory.slice(0, 10);
  }

  saveActivityHistory();
  renderActivityList();
}

// Save activity history to localStorage
function saveActivityHistory() {
  localStorage.setItem("harvestSyncActivity", JSON.stringify(activityHistory));
}

// Load activity history from localStorage
function loadActivityHistory() {
  const saved = localStorage.getItem("harvestSyncActivity");
  if (saved) {
    activityHistory = JSON.parse(saved);
    renderActivityList();
  }
}

// Render activity list
function renderActivityList() {
  if (activityHistory.length === 0) {
    activityList.innerHTML = `
      <div class="empty-state">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
        <p>No recent activity</p>
      </div>
    `;
    return;
  }

  const html = activityHistory
    .map((activity, index) => {
      const date = new Date(activity.timestamp);
      const timeAgo = getTimeAgo(date);
      const dateRange = activity.toDate ? `${activity.fromDate} to ${activity.toDate}` : activity.fromDate;

      return `
      <div class="activity-item" onclick="window.showActivityDetails(${index})" style="cursor: pointer;">
        <div class="activity-info">
          <h3>${activity.type} - ${dateRange}</h3>
          <p>${timeAgo} • ${activity.summary.totalEntries || 0} entries</p>
        </div>
        <span class="activity-badge activity-badge--${activity.type.toLowerCase()}">${activity.type}</span>
      </div>
    `;
    })
    .join("");

  activityList.innerHTML = html;
}

// Show activity details (make it globally accessible)
window.showActivityDetails = function (index) {
  const activity = activityHistory[index];
  if (activity) {
    // Switch to dashboard page
    const dashboardPage = document.getElementById("dashboardPage");
    const historyPage = document.getElementById("historyPage");
    const settingsPage = document.getElementById("settingsPage");

    dashboardPage.style.display = "block";
    historyPage.style.display = "none";
    settingsPage.style.display = "none";

    // Update nav links
    document.querySelectorAll(".nav-link").forEach((link) => {
      if (link.getAttribute("data-page") === "dashboard") {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    // Display results
    if (activity.data) {
      displayResults(activity.data, activity.type.toLowerCase());
    } else {
      // For old activity items without full data, show summary only
      const data = {
        summary: activity.summary,
        lineItems: [], // No line items available for old entries
      };
      displayResults(data, activity.type.toLowerCase());
    }

    // Scroll to results
    setTimeout(() => {
      resultsSection.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }
};

// Get time ago string
function getTimeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return `${interval} ${unit}${interval > 1 ? "s" : ""} ago`;
    }
  }

  return "Just now";
}

// Show loading overlay
function showLoading(message = "Processing...") {
  loadingText.textContent = message;
  loadingOverlay.style.display = "flex";
}

// Hide loading overlay
function hideLoading() {
  loadingOverlay.style.display = "none";
}

// Show toast notification
function showToast(title, message, type = "info") {
  const toast = document.createElement("div");
  toast.className = `toast toast--${type}`;

  const icon = getToastIcon(type);

  toast.innerHTML = `
    <div class="toast-icon">${icon}</div>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = "slideIn 0.3s ease-out reverse";
    setTimeout(() => toast.remove(), 300);
  }, 5000);
}

// Get toast icon SVG
function getToastIcon(type) {
  const icons = {
    success: `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#28A745" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="16 8 10 14 8 12"></polyline>
      </svg>
    `,
    error: `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#DC3545" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="15" y1="9" x2="9" y2="15"></line>
        <line x1="9" y1="9" x2="15" y2="15"></line>
      </svg>
    `,
    info: `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#007BFF" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
      </svg>
    `,
  };

  return icons[type] || icons.info;
}

// Page Navigation
function setupNavigation() {
  const navLinks = document.querySelectorAll(".nav-link");
  const logoLink = document.querySelector(".logo-link");
  const pages = {
    dashboard: document.getElementById("dashboardPage"),
    timer: document.getElementById("timerPage"),
    history: document.getElementById("historyPage"),
    settings: document.getElementById("settingsPage"),
  };

  // Map paths to page names
  const pathToPage = {
    "/": "dashboard",
    "/timers": "timer",
    "/activity": "history",
    "/settings": "settings",
  };

  // Function to show page based on path
  function showPage(path) {
    const pageName = pathToPage[path] || "dashboard";

    // Update active nav link
    navLinks.forEach((l) => l.classList.remove("active"));
    const activeLink = document.querySelector(`.nav-link[data-page="${pageName}"]`);
    if (activeLink) {
      activeLink.classList.add("active");
    }

    // Show selected page, hide others
    Object.keys(pages).forEach((key) => {
      if (key === pageName) {
        pages[key].style.display = "block";
      } else {
        pages[key].style.display = "none";
      }
    });
  }

  // Handle nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const href = link.getAttribute("href");
      history.pushState(null, "", href);
      showPage(href);
    });
  });

  // Handle logo link
  if (logoLink) {
    logoLink.addEventListener("click", (e) => {
      e.preventDefault();
      history.pushState(null, "", "/");
      showPage("/");
    });
  }

  // Handle browser back/forward buttons
  window.addEventListener("popstate", () => {
    showPage(window.location.pathname);
  });

  // Show initial page based on current path
  showPage(window.location.pathname);
}

// Settings Management
function loadSettings() {
  const settings = JSON.parse(localStorage.getItem("harvestSyncSettings") || "{}");

  // Load display preferences
  const timeFormat = settings.timeFormat || "hhmm";
  const dateFormat = settings.dateFormat || "yyyy-mm-dd";

  const timeFormatSelect = document.getElementById("settingsTimeFormat");
  const dateFormatSelect = document.getElementById("settingsDateFormat");

  if (timeFormatSelect) timeFormatSelect.value = timeFormat;
  if (dateFormatSelect) dateFormatSelect.value = dateFormat;

  // Setup save button
  const btnSaveSettings = document.getElementById("btnSaveSettings");
  const btnResetSettings = document.getElementById("btnResetSettings");

  if (btnSaveSettings) {
    btnSaveSettings.addEventListener("click", saveSettings);
  }

  if (btnResetSettings) {
    btnResetSettings.addEventListener("click", resetSettings);
  }
}

function saveSettings() {
  const timeFormat = document.getElementById("settingsTimeFormat").value;
  const dateFormat = document.getElementById("settingsDateFormat").value;

  const settings = {
    timeFormat,
    dateFormat,
  };

  localStorage.setItem("harvestSyncSettings", JSON.stringify(settings));
  showToast("Success", "Settings saved successfully", "success");
}

function resetSettings() {
  if (confirm("Are you sure you want to reset all settings to defaults?")) {
    localStorage.removeItem("harvestSyncSettings");
    loadSettings();
    showToast("Success", "Settings reset to defaults", "success");
  }
}

// Timer Page Functions
function initializeTimer() {
  // Update account names
  updateTimerAccountNames();

  // Display selected timer user
  updateTimerUserDisplay();

  // Load projects for selected user
  loadTimerProjects();

  // Check for running timers
  checkRunningTimers();

  // Setup timer event listeners
  setupTimerEventListeners();

  // Start polling for timer changes every 30 seconds
  setInterval(() => {
    checkRunningTimers();
    loadTodayEntries(); // Also refresh today's list
  }, 30000); // Poll every 30 seconds

  // Load today's entries initially
  loadTodayEntries();
}

async function updateTimerAccountNames() {
  const agencyNameEl = document.getElementById("agencyTimerName");
  const contractorNameEl = document.getElementById("contractorTimerName");
  const agencyStatusNameEl = document.getElementById("agencyTimerNameStatus");
  const contractorStatusNameEl = document.getElementById("contractorTimerNameStatus");
  const agencyStatusIcon = document.getElementById("agencyTimerStatusIcon");
  const contractorStatusIcon = document.getElementById("contractorTimerStatusIcon");

  try {
    // Fetch status to get account names
    const response = await fetch("/api/status");
    if (response.ok) {
      const data = await response.json();

      if (data.agency) {
        if (data.agency.name) {
          agencyNameEl.textContent = data.agency.name;
          agencyStatusNameEl.textContent = data.agency.name;
        }
        if (data.agency.connected) {
          agencyStatusIcon.classList.remove("status-icon--pending", "status-icon--error");
          agencyStatusIcon.classList.add("status-icon--success");
          agencyStatusIcon.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          `;
        } else {
          agencyStatusIcon.classList.remove("status-icon--pending", "status-icon--success");
          agencyStatusIcon.classList.add("status-icon--error");
          agencyStatusIcon.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          `;
        }
      }

      if (data.contractor) {
        if (data.contractor.name) {
          contractorNameEl.textContent = data.contractor.name;
          contractorStatusNameEl.textContent = data.contractor.name;
        }
        if (data.contractor.connected) {
          contractorStatusIcon.classList.remove("status-icon--pending", "status-icon--error");
          contractorStatusIcon.classList.add("status-icon--success");
          contractorStatusIcon.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          `;
        } else {
          contractorStatusIcon.classList.remove("status-icon--pending", "status-icon--success");
          contractorStatusIcon.classList.add("status-icon--error");
          contractorStatusIcon.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          `;
        }
      }
    }
  } catch (error) {
    console.error("Error fetching account names:", error);
  }
}

// Update timer user display
async function updateTimerUserDisplay() {
  const displayEl = document.getElementById("timerUserDisplay");

  try {
    const response = await fetch("/api/timer/user");
    if (response.ok) {
      const data = await response.json();
      displayEl.textContent = data.userName;
      // Store in state for later use
      timerState.selectedUserId = data.userId;
      timerState.selectedUserName = data.userName;
    } else {
      const error = await response.json();
      displayEl.textContent = `Error: ${error.error}`;
    }
  } catch (error) {
    console.error("Error fetching timer user:", error);
    displayEl.textContent = "Error loading timer user";
  }
}

// Check for running timers
async function checkRunningTimers() {
  try {
    const timerUserResponse = await fetch("/api/timer/user");
    if (!timerUserResponse.ok) {
      console.warn("Failed to get timer user");
      return;
    }

    const timerUser = await timerUserResponse.json();

    // Check both agency and contractor accounts for running timers
    const accounts = ["agency", "contractor"];

    for (const account of accounts) {
      const accountUser = timerUser[account];
      if (!accountUser) {
        console.log(`Timer user not found in ${account} account`);
        continue;
      }

      const response = await fetch(`/api/timer/running/${account}/${accountUser.userId}`);
      if (response.ok) {
        const data = await response.json();

        if (data.running) {
          // Check if this is a new timer or the same one
          const isNewTimer = !timerState[account].running || timerState[account].entryId !== data.entry.id;

          // Calculate elapsed seconds from timer_started_at
          const startTime = new Date(data.entry.timerStartedAt);
          const now = new Date();
          const elapsedSeconds = Math.floor((now - startTime) / 1000);

          // Clear existing interval if this is a new timer
          if (isNewTimer && timerState[account].intervalId) {
            clearInterval(timerState[account].intervalId);
          }

          // Update timer state
          timerState[account].running = true;
          timerState[account].paused = false;
          timerState[account].seconds = elapsedSeconds;
          timerState[account].projectId = data.entry.projectId;
          timerState[account].taskId = data.entry.taskId;
          timerState[account].notes = data.entry.notes;
          timerState[account].entryId = data.entry.id; // Store the running entry ID

          // Update UI
          updateTimerUI(account);
          updateTimerDisplay(account);

          // Set the project and task dropdowns to the running timer's values (only if new timer)
          if (isNewTimer) {
            const projectSelect = document.getElementById(`${account}Project`);
            const taskSelect = document.getElementById(`${account}Task`);
            const notesInput = document.getElementById(`${account}Notes`);

            if (projectSelect) {
              projectSelect.value = data.entry.projectId;
              // Load tasks for this project
              await loadTimerTasks(account, data.entry.projectId);
              // Then set the task
              if (taskSelect) {
                taskSelect.value = data.entry.taskId;
              }
            }

            if (notesInput) {
              notesInput.value = data.entry.notes || "";
            }

            // Start the interval to keep timer running
            timerState[account].intervalId = setInterval(() => {
              timerState[account].seconds++;
              updateTimerDisplay(account);
            }, 1000);

            console.log(`Found new running timer on ${account}:`, data.entry);
          }
        } else {
          // Timer is not running on Harvest, but it is locally - stop it
          if (timerState[account].running) {
            console.log(`Timer stopped on Harvest for ${account}, stopping locally`);
            clearInterval(timerState[account].intervalId);
            resetTimer(account);
          }
        }
      }
    }
  } catch (error) {
    console.error("Error checking running timers:", error);
  }
}

// Load projects for selected timer user
async function loadTimerProjects() {
  // Get timer user from API
  try {
    const response = await fetch("/api/timer/user");
    if (!response.ok) {
      console.warn("Failed to get timer user");
      return;
    }

    const timerUser = await response.json();

    const agencyProjectSelect = document.getElementById("agencyProject");
    const contractorProjectSelect = document.getElementById("contractorProject");

    if (!agencyProjectSelect || !contractorProjectSelect) {
      console.warn("Project select elements not found");
      return;
    }

    // Clear existing options
    agencyProjectSelect.innerHTML = '<option value="">Select a project...</option>';
    contractorProjectSelect.innerHTML = '<option value="">Select a project...</option>';

    // Load agency projects if user exists in agency account
    if (timerUser.agency) {
      const agencyProjectsResponse = await fetch(`/api/timer/projects/agency/${timerUser.agency.userId}`);
      if (agencyProjectsResponse.ok) {
        const agencyData = await agencyProjectsResponse.json();
        if (agencyData.projects && Array.isArray(agencyData.projects)) {
          agencyData.projects.forEach((project) => {
            const projectName = project.code ? `${project.code} - ${project.name}` : project.name;
            const option = document.createElement("option");
            option.value = project.id;
            option.textContent = projectName;
            agencyProjectSelect.appendChild(option);
          });
        }
      }
    }

    // Load contractor projects if user exists in contractor account
    if (timerUser.contractor) {
      const contractorProjectsResponse = await fetch(`/api/timer/projects/contractor/${timerUser.contractor.userId}`);
      if (contractorProjectsResponse.ok) {
        const contractorData = await contractorProjectsResponse.json();
        if (contractorData.projects && Array.isArray(contractorData.projects)) {
          contractorData.projects.forEach((project) => {
            const projectName = project.code ? `${project.code} - ${project.name}` : project.name;
            const option = document.createElement("option");
            option.value = project.id;
            option.textContent = projectName;
            contractorProjectSelect.appendChild(option);
          });
        }
      }
    }

    // Setup task loading when project changes
    agencyProjectSelect.addEventListener("change", () => {
      loadTimerTasks("agency", agencyProjectSelect.value);
    });

    contractorProjectSelect.addEventListener("change", () => {
      loadTimerTasks("contractor", contractorProjectSelect.value);
    });
  } catch (error) {
    console.error("Error loading timer projects:", error);
  }
}

async function loadTimerTasks(account, projectId) {
  if (!projectId) {
    const taskSelect = document.getElementById(`${account}Task`);
    taskSelect.innerHTML = '<option value="">Select a task...</option>';
    return;
  }

  try {
    const response = await fetch(`/api/timer/tasks/${account}/${projectId}`);
    const data = await response.json();

    if (response.ok && data.tasks) {
      const taskSelect = document.getElementById(`${account}Task`);
      taskSelect.innerHTML = '<option value="">Select a task...</option>';

      data.tasks.forEach((task) => {
        const option = document.createElement("option");
        option.value = task.id;
        option.textContent = task.name;
        taskSelect.appendChild(option);
      });
    }
  } catch (error) {
    console.error(`Error loading tasks for ${account}:`, error);
  }
}

function setupTimerEventListeners() {
  // Agency timer buttons
  document.getElementById("agencyStartBtn").addEventListener("click", () => startTimer("agency"));
  document.getElementById("agencyPauseBtn").addEventListener("click", () => pauseTimer("agency"));
  document.getElementById("agencyStopBtn").addEventListener("click", () => stopTimer("agency"));

  // Contractor timer buttons
  document.getElementById("contractorStartBtn").addEventListener("click", () => startTimer("contractor"));
  document.getElementById("contractorPauseBtn").addEventListener("click", () => pauseTimer("contractor"));
  document.getElementById("contractorStopBtn").addEventListener("click", () => stopTimer("contractor"));
}

function formatSeconds(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
}

async function startTimer(account) {
  // Check if the other timer is running (mutually exclusive)
  const otherAccount = account === "agency" ? "contractor" : "agency";
  if (timerState[otherAccount].running) {
    showToast(
      "Error",
      `${otherAccount.charAt(0).toUpperCase() + otherAccount.slice(1)} timer is already running. Stop it first.`,
      "error"
    );
    return;
  }

  const projectSelect = document.getElementById(`${account}Project`);
  const taskSelect = document.getElementById(`${account}Task`);
  const notesInput = document.getElementById(`${account}Notes`);

  if (!projectSelect.value || !taskSelect.value) {
    showToast("Error", "Please select both project and task", "error");
    return;
  }

  // Get timer user from API
  let timerUser;
  try {
    const response = await fetch("/api/timer/user");
    if (!response.ok) {
      throw new Error("Failed to get timer user");
    }
    timerUser = await response.json();
  } catch (error) {
    showToast("Error", "Failed to get timer user configuration", "error");
    return;
  }

  const accountUser = timerUser[account];
  if (!accountUser) {
    showToast("Error", `Timer user not found in ${account} account`, "error");
    return;
  }

  showLoading("Starting timer in Harvest...");

  try {
    // Create a running time entry in Harvest
    const response = await fetch("/api/timer/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        account: account,
        userId: accountUser.userId,
        projectId: projectSelect.value,
        taskId: taskSelect.value,
        notes: notesInput.value,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to start timer");
    }

    // Store the entry ID so we can stop it later
    timerState[account].entryId = data.timeEntry.id;
    timerState[account].projectId = projectSelect.value;
    timerState[account].taskId = taskSelect.value;
    timerState[account].notes = notesInput.value;
    timerState[account].running = true;
    timerState[account].paused = false;

    hideLoading();
    showToast("Success", "Timer started in Harvest", "success");

    updateTimerUI(account);

    // Start the local interval to update the display
    timerState[account].intervalId = setInterval(() => {
      timerState[account].seconds++;
      updateTimerDisplay(account);
    }, 1000);
  } catch (error) {
    hideLoading();
    showToast("Error", error.message, "error");
  }
}

function pauseTimer(account) {
  timerState[account].paused = !timerState[account].paused;

  if (timerState[account].paused) {
    clearInterval(timerState[account].intervalId);
  } else {
    timerState[account].intervalId = setInterval(() => {
      timerState[account].seconds++;
      updateTimerDisplay(account);
    }, 1000);
  }

  updateTimerUI(account);
}

async function stopTimer(account) {
  clearInterval(timerState[account].intervalId);

  if (timerState[account].seconds === 0) {
    showToast("Error", "No time tracked", "error");
    return;
  }

  // Get timer user from API
  let timerUser;
  try {
    const response = await fetch("/api/timer/user");
    if (!response.ok) {
      throw new Error("Failed to get timer user");
    }
    timerUser = await response.json();
  } catch (error) {
    showToast("Error", "Failed to get timer user configuration", "error");
    return;
  }

  showLoading("Saving time entry...");

  try {
    const accountUser = timerUser[account];
    if (!accountUser) {
      throw new Error(`Timer user not found in ${account} account`);
    }

    const response = await fetch("/api/timer/stop", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        account: account,
        userId: accountUser.userId,
        projectId: timerState[account].projectId,
        taskId: timerState[account].taskId,
        seconds: timerState[account].seconds,
        notes: timerState[account].notes,
        entryId: timerState[account].entryId || null, // Send entry ID if it exists
      }),
    });

    const data = await response.json();

    if (response.ok) {
      showToast("Success", `Time entry created: ${formatSeconds(timerState[account].seconds)}`, "success");
      resetTimer(account);
    } else {
      throw new Error(data.error || "Failed to save time entry");
    }
  } catch (error) {
    console.error("Error stopping timer:", error);
    showToast("Error", error.message, "error");
  } finally {
    hideLoading();
  }
}

function resetTimer(account) {
  timerState[account].running = false;
  timerState[account].paused = false;
  timerState[account].seconds = 0;
  timerState[account].projectId = null;
  timerState[account].taskId = null;
  timerState[account].notes = "";
  timerState[account].entryId = null; // Clear entry ID

  document.getElementById(`${account}Project`).value = "";
  document.getElementById(`${account}Task`).value = "";
  document.getElementById(`${account}Notes`).value = "";

  updateTimerUI(account);
  updateTimerDisplay(account);
}

function updateTimerDisplay(account) {
  const display = document.getElementById(`${account}TimerDisplay`);
  display.textContent = formatSeconds(timerState[account].seconds);
}

function updateTimerUI(account) {
  const startBtn = document.getElementById(`${account}StartBtn`);
  const pauseBtn = document.getElementById(`${account}PauseBtn`);
  const stopBtn = document.getElementById(`${account}StopBtn`);
  const statusEl = document.getElementById(`${account}TimerStatus`);

  if (timerState[account].running) {
    startBtn.style.display = "none";
    pauseBtn.style.display = "block";
    stopBtn.style.display = "block";

    if (timerState[account].paused) {
      statusEl.textContent = "Paused";
      statusEl.classList.remove("running");
      statusEl.classList.add("paused");
      pauseBtn.textContent = "Resume";
    } else {
      statusEl.textContent = "Running";
      statusEl.classList.add("running");
      statusEl.classList.remove("paused");
      pauseBtn.textContent = "Pause";
    }
  } else {
    startBtn.style.display = "block";
    pauseBtn.style.display = "none";
    stopBtn.style.display = "none";
    statusEl.textContent = "Stopped";
    statusEl.classList.remove("running", "paused");
  }
}

// Load today's time entries
async function loadTodayEntries() {
  try {
    const response = await fetch("/api/timer/user");
    if (!response.ok) return;

    const userData = await response.json();

    // Load entries for both accounts
    if (userData.agency && userData.agency.userId) {
      await loadTodayEntriesForAccount("agency", userData.agency.userId);
    }
    if (userData.contractor && userData.contractor.userId) {
      await loadTodayEntriesForAccount("contractor", userData.contractor.userId);
    }
  } catch (error) {
    console.error("Error loading today's entries:", error);
  }
}

async function loadTodayEntriesForAccount(account, userId) {
  try {
    const response = await fetch(`/api/timer/today/${account}/${userId}`);
    if (!response.ok) return;

    const data = await response.json();
    const listEl = document.getElementById(`${account}TodayList`);
    const totalEl = document.getElementById(`${account}TodayTotal`);

    if (!listEl || !totalEl) return;

    if (data.entries && data.entries.length > 0) {
      // Clear the list
      listEl.innerHTML = "";

      // Calculate total hours
      const totalHours = data.entries.reduce((sum, entry) => sum + entry.hours, 0);
      totalEl.textContent = formatHours(totalHours);

      // Display each entry
      data.entries.forEach((entry) => {
        const entryEl = document.createElement("div");
        entryEl.className = "today-entry";
        if (entry.isRunning) {
          entryEl.classList.add("today-entry--running");
        }

        const projectName = entry.projectCode ? `${entry.projectCode} - ${entry.projectName}` : entry.projectName;

        entryEl.innerHTML = `
          <div class="today-entry-info">
            <div class="today-entry-project">${projectName}</div>
            <div class="today-entry-task">${entry.taskName}</div>
            ${entry.notes ? `<div class="today-entry-notes">${entry.notes}</div>` : ""}
          </div>
          <div class="today-entry-hours">${formatHours(entry.hours)}</div>
        `;

        // Make it clickable to restart the timer
        entryEl.style.cursor = "pointer";
        entryEl.addEventListener("click", () => {
          restartTimer(account, entry.projectId, entry.taskId, entry.notes);
        });

        listEl.appendChild(entryEl);
      });
    } else {
      listEl.innerHTML = '<p class="empty-message">No time entries today</p>';
      totalEl.textContent = "0:00";
    }
  } catch (error) {
    console.error(`Error loading today's entries for ${account}:`, error);
  }
}

// Format hours as H:MM
function formatHours(hours) {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return `${h}:${m.toString().padStart(2, "0")}`;
}

// Restart a timer with the same project/task/notes
async function restartTimer(account, projectId, taskId, notes) {
  try {
    // Set the project and task dropdowns
    const projectSelect = document.getElementById(`${account}Project`);
    const taskSelect = document.getElementById(`${account}Task`);
    const notesInput = document.getElementById(`${account}Notes`);

    if (projectSelect) {
      projectSelect.value = projectId;
      // Trigger change event to load tasks
      projectSelect.dispatchEvent(new Event("change"));

      // Wait a bit for tasks to load, then set the task
      setTimeout(() => {
        if (taskSelect) {
          taskSelect.value = taskId;
        }
        if (notesInput) {
          notesInput.value = notes || "";
        }

        // Click the start button
        const startBtn = document.getElementById(`${account}StartBtn`);
        if (startBtn) {
          startBtn.click();
        }
      }, 500);
    }
  } catch (error) {
    console.error("Error restarting timer:", error);
    showToast("Error", "Failed to restart timer", "error");
  }
}
