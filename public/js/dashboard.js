// Harvest Sync Dashboard JavaScript

// State
let activityHistory = [];

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
  loadActivityHistory();
  setupEventListeners();
  setupNavigation();
  loadSettings();
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
  } catch (error) {
    console.error("Error checking connection:", error);
    showToast("Error", "Failed to check connection status", "error");
  }
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

  showLoading("Generating preview...");

  try {
    const response = await fetch("/api/preview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fromDate, toDate }),
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
      body: JSON.stringify({ fromDate, toDate }),
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
    history: document.getElementById("historyPage"),
    settings: document.getElementById("settingsPage"),
  };

  // Handle nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const pageName = link.getAttribute("data-page");

      // Update active nav link
      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");

      // Show selected page, hide others
      Object.keys(pages).forEach((key) => {
        if (key === pageName) {
          pages[key].style.display = "block";
        } else {
          pages[key].style.display = "none";
        }
      });
    });
  });

  // Handle logo link
  if (logoLink) {
    logoLink.addEventListener("click", (e) => {
      e.preventDefault();

      // Update active nav link to dashboard
      navLinks.forEach((l) => l.classList.remove("active"));
      const dashboardLink = document.querySelector('.nav-link[data-page="dashboard"]');
      if (dashboardLink) {
        dashboardLink.classList.add("active");
      }

      // Show dashboard page, hide others
      pages.dashboard.style.display = "block";
      pages.history.style.display = "none";
      pages.settings.style.display = "none";
    });
  }
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
  showToast("Success", "Display preferences saved successfully", "success");
}

function resetSettings() {
  if (confirm("Are you sure you want to reset all settings to defaults?")) {
    localStorage.removeItem("harvestSyncSettings");
    loadSettings();
    showToast("Success", "Settings reset to defaults", "success");
  }
}
