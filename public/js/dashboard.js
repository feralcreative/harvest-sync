// Harvest Sync Dashboard JavaScript

// State
let activityHistory = [];

// DOM Elements
const fromDateInput = document.getElementById("fromDate");
const toDateInput = document.getElementById("toDate");
const btnToday = document.getElementById("btnToday");
const btnWeek = document.getElementById("btnWeek");
const btnMonth = document.getElementById("btnMonth");
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
});

// Initialize date inputs with default values
function initializeDates() {
  const today = new Date();
  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 7);

  toDateInput.value = formatDate(today);
  fromDateInput.value = formatDate(weekAgo);
}

// Format date as YYYY-MM-DD
function formatDate(date) {
  return date.toISOString().split("T")[0];
}

// Setup event listeners
function setupEventListeners() {
  btnToday.addEventListener("click", () => {
    const today = new Date();
    fromDateInput.value = formatDate(today);
    toDateInput.value = formatDate(today);
  });

  btnWeek.addEventListener("click", () => {
    const today = new Date();
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    fromDateInput.value = formatDate(weekAgo);
    toDateInput.value = formatDate(today);
  });

  btnMonth.addEventListener("click", () => {
    const today = new Date();
    const monthAgo = new Date(today);
    monthAgo.setDate(monthAgo.getDate() - 30);
    fromDateInput.value = formatDate(monthAgo);
    toDateInput.value = formatDate(today);
  });

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
  const fromDate = fromDateInput.value;
  const toDate = toDateInput.value;

  if (!fromDate || !toDate) {
    showToast("Error", "Please select both from and to dates", "error");
    return;
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
      addToActivity("Preview", fromDate, toDate, data.summary);
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
  const fromDate = fromDateInput.value;
  const toDate = toDateInput.value;

  if (!fromDate || !toDate) {
    showToast("Error", "Please select both from and to dates", "error");
    return;
  }

  if (!confirm("Are you sure you want to sync time entries? This will create entries in your contractor account.")) {
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
      addToActivity("Sync", fromDate, toDate, data.summary);
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
          <div class="summary-value">${(summary.totalHours || 0).toFixed(2)}h</div>
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
function addToActivity(type, fromDate, toDate, summary) {
  const activity = {
    type,
    fromDate,
    toDate,
    summary,
    timestamp: new Date().toISOString(),
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
    .map((activity) => {
      const date = new Date(activity.timestamp);
      const timeAgo = getTimeAgo(date);

      return `
      <div class="activity-item">
        <div class="activity-info">
          <h3>${activity.type} - ${activity.fromDate} to ${activity.toDate}</h3>
          <p>${timeAgo} • ${activity.summary.totalEntries || 0} entries • ${(activity.summary.totalHours || 0).toFixed(
        2
      )} hours</p>
        </div>
        <span class="activity-badge activity-badge--${activity.type.toLowerCase()}">${activity.type}</span>
      </div>
    `;
    })
    .join("");

  activityList.innerHTML = html;
}

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
