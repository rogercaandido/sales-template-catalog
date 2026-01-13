# API Contract: Report Admin Dashboard

**Feature**: `/reportadminx` - Marketing Analytics Report Viewer
**Date**: 2026-01-13
**Related**: [data-model-reportadmin.md](../data-model-reportadmin.md), [research-reportadmin.md](../research-reportadmin.md)

## Overview

This document defines the component interfaces, routing contract, and external API specifications for the report admin dashboard feature.

---

## 1. Routing Contract

### Hash-based Router

**Purpose**: Navigate between template catalog (main page) and report dashboard

**API**:

```javascript
// Route definitions
const ROUTES = {
  HOME: '/',           // Template catalog (default)
  REPORTS: '/reportadminx'  // Report dashboard
};

// Get current route
function getCurrentRoute() {
  const hash = window.location.hash.slice(1); // Remove '#'
  return hash || ROUTES.HOME;
}

// Navigate to route
function navigateTo(route) {
  window.location.hash = `#${route}`;
}

// Listen for route changes
window.addEventListener('hashchange', () => {
  const route = getCurrentRoute();
  renderRoute(route);
});
```

**Usage Example**:

```javascript
// In navigation UI
<button onclick="navigateTo('/reportadminx')">
  Ver Relatórios
</button>

// Render appropriate view based on route
function renderRoute(route) {
  const appContainer = document.getElementById('app');

  if (route === ROUTES.REPORTS) {
    appContainer.innerHTML = renderReportDashboard();
  } else {
    appContainer.innerHTML = renderTemplateCatalog();
  }
}
```

**Browser Behavior**:
- **Back button**: Navigates to previous route (browser handles automatically)
- **Forward button**: Navigates to next route
- **Direct URL**: `index.html#/reportadminx` works on page load
- **Bookmark**: Routes are bookmarkable (hash included in URL)

---

## 2. ReportIndex API

### File-based Data API

**Endpoint**: `GET /reports/index.json`

**Response Schema**:

```json
{
  "reports": [
    {
      "id": "string",           // Required, unique (rpt-NNN)
      "title": "string",        // Required, max 200 chars
      "period": {
        "start": "YYYY-MM-DD",  // Required, ISO 8601
        "end": "YYYY-MM-DD"     // Required, ISO 8601
      },
      "dateCreated": "YYYY-MM-DD", // Required, ISO 8601
      "fileName": "string.html",   // Required, exists in /reports/
      "tags": ["string"],          // Optional
      "description": "string"      // Optional, max 500 chars
    }
  ],
  "meta": {
    "lastUpdated": "ISO 8601 timestamp",  // Optional
    "version": "semver"                   // Optional (default: "1.0.0")
  }
}
```

**Success Response** (200 OK):

```json
{
  "reports": [
    {
      "id": "rpt-001",
      "title": "Relatório Estratégico de Leads",
      "period": {
        "start": "2025-12-05",
        "end": "2026-01-12"
      },
      "dateCreated": "2026-01-12",
      "fileName": "leads-2026-01-12.html",
      "tags": ["leads", "meta-ads", "educação-cosmética"],
      "description": "Análise de 3.937 leads com benchmark de mercado"
    }
  ],
  "meta": {
    "lastUpdated": "2026-01-12T10:00:00Z",
    "version": "1.0.0"
  }
}
```

**Error Responses**:

- **404 Not Found**: `index.json` file doesn't exist
  ```json
  { "error": "Report index not found" }
  ```

- **500 Server Error**: Invalid JSON format
  ```json
  { "error": "Failed to parse report index" }
  ```

**Client Usage**:

```javascript
async function fetchReports() {
  try {
    const response = await fetch('/reports/index.json');

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    // Validate schema
    if (!data.reports || !Array.isArray(data.reports)) {
      throw new Error('Invalid index format');
    }

    return data.reports;

  } catch (error) {
    console.error('Failed to fetch reports:', error);
    return []; // Return empty array on error
  }
}
```

**Caching Strategy**:
- **Browser cache**: Respects standard HTTP cache headers
- **Update frequency**: Check for updates on every dashboard load (fast operation)
- **File size**: Keep under 100KB for optimal performance

---

## 3. Report HTML API

### Individual Report Access

**Endpoint**: `GET /reports/{fileName}`

**Parameters**:
- `fileName`: Report HTML file name (from `Report.fileName`)

**Response**: Full HTML document (Content-Type: text/html)

**Success Response** (200 OK):

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Relatório de Leads</title>
  <!-- Report styles (self-contained) -->
</head>
<body>
  <!-- Report content -->
</body>
</html>
```

**Error Responses**:

- **404 Not Found**: Report file doesn't exist
  ```html
  <!DOCTYPE html>
  <html><body>Report not found</body></html>
  ```

**Client Usage** (via iframe):

```html
<iframe
  id="report-viewer"
  src="/reports/leads-2026-01-12.html"
  sandbox="allow-same-origin"
  style="width: 100%; height: 100vh; border: none;"
  onload="handleReportLoad()"
  onerror="handleReportError()"
></iframe>
```

**Security**:
- **Sandbox**: `allow-same-origin` only (no scripts from untrusted sources)
- **CSP**: Content-Security-Policy can be applied if needed
- **CORS**: Not applicable (same-origin)

---

## 4. ReportDashboard Component

### Main Dashboard Container

**Purpose**: Top-level component that manages dashboard state and renders sub-components

**Interface**:

```javascript
/**
 * Initialize and render the report dashboard
 * @returns {string} HTML string for dashboard UI
 */
function renderReportDashboard() {
  return `
    <div class="report-dashboard">
      <div class="dashboard-header">
        ${renderDashboardHeader()}
      </div>

      <div class="dashboard-layout">
        <aside class="report-sidebar">
          ${renderReportList()}
        </aside>

        <main class="report-content">
          ${renderReportViewer()}
        </main>
      </div>
    </div>
  `;
}
```

**State Management**:

```javascript
// Global state (can be refactored to React state)
const dashboardState = {
  allReports: [],
  filteredReports: [],
  selectedReport: null,
  currentFilter: { type: 'all-time' },
  loading: { index: false, report: false },
  error: null
};

// State update function (triggers re-render)
function updateDashboardState(updates) {
  Object.assign(dashboardState, updates);
  renderReportDashboard();
}
```

**Lifecycle**:

```javascript
// 1. Component mount
async function initDashboard() {
  updateDashboardState({ loading: { ...dashboardState.loading, index: true } });

  const reports = await fetchReports();

  updateDashboardState({
    allReports: reports,
    filteredReports: reports,
    loading: { ...dashboardState.loading, index: false }
  });
}

// 2. Component unmount (if needed)
function cleanupDashboard() {
  // Clear event listeners, etc.
}
```

**CSS Classes**:

```css
.report-dashboard {
  min-height: 100vh;
  background: #0a0a0a; /* neutral-950 */
}

.dashboard-header {
  padding: 24px;
  border-bottom: 1px solid #262626; /* neutral-800 */
}

.dashboard-layout {
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 0;
  height: calc(100vh - 80px); /* Adjust based on header height */
}

@media (max-width: 768px) {
  .dashboard-layout {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }
}
```

---

## 5. ReportList Component

### Sidebar with Filterable Report List

**Purpose**: Display report metadata with period filtering

**Interface**:

```javascript
/**
 * Render the report list sidebar
 * @returns {string} HTML string for report list
 */
function renderReportList() {
  const { filteredReports, selectedReport, loading, currentFilter } = dashboardState;

  if (loading.index) {
    return `<div class="report-list-loading">Carregando relatórios...</div>`;
  }

  if (filteredReports.length === 0) {
    return renderEmptyState();
  }

  return `
    <div class="report-list">
      ${renderPeriodFilter(currentFilter)}

      <div class="report-count">
        ${filteredReports.length} ${filteredReports.length === 1 ? 'relatório' : 'relatórios'}
      </div>

      <div class="report-items">
        ${filteredReports.map(report =>
          renderReportItem(report, report.id === selectedReport?.id)
        ).join('')}
      </div>
    </div>
  `;
}
```

**Report Item Template**:

```javascript
/**
 * Render a single report list item
 * @param {Report} report - Report metadata
 * @param {boolean} isSelected - Whether this report is currently selected
 * @returns {string} HTML string for report item
 */
function renderReportItem(report, isSelected) {
  const periodStr = formatReportPeriod(report);
  const ageStr = getReportAge(report);

  return `
    <div
      class="report-item ${isSelected ? 'selected' : ''}"
      data-report-id="${report.id}"
      onclick="selectReport('${report.id}')"
      tabindex="0"
      role="button"
      aria-pressed="${isSelected}"
    >
      <div class="report-item-header">
        <h3 class="report-item-title">${escapeHtml(report.title)}</h3>
        <span class="report-item-age">${ageStr}</span>
      </div>

      <div class="report-item-period">${periodStr}</div>

      ${report.tags && report.tags.length > 0 ? `
        <div class="report-item-tags">
          ${report.tags.map(tag => `
            <span class="tag">${escapeHtml(tag)}</span>
          `).join('')}
        </div>
      ` : ''}

      ${report.description ? `
        <p class="report-item-description">${escapeHtml(report.description)}</p>
      ` : ''}
    </div>
  `;
}
```

**Event Handlers**:

```javascript
/**
 * Handle report selection
 * @param {string} reportId - ID of report to select
 */
function selectReport(reportId) {
  const report = dashboardState.allReports.find(r => r.id === reportId);

  if (!report) {
    console.error(`Report not found: ${reportId}`);
    return;
  }

  updateDashboardState({
    selectedReport: report,
    loading: { ...dashboardState.loading, report: true }
  });
}
```

**CSS Classes**:

```css
.report-list {
  height: 100%;
  overflow-y: auto;
  background: #171717; /* neutral-900 */
  border-right: 1px solid #262626; /* neutral-800 */
}

.report-item {
  padding: 16px;
  border-bottom: 1px solid #262626;
  cursor: pointer;
  transition: background 0.15s ease;
}

.report-item:hover {
  background: #262626; /* neutral-800 */
}

.report-item.selected {
  background: #262626;
  border-left: 2px solid var(--theme-color, #06b6d4);
}

.report-item-title {
  font-size: 0.875rem;
  color: #f5f5f5; /* neutral-100 */
  margin-bottom: 4px;
}

.report-item-period {
  font-size: 0.75rem;
  color: #737373; /* neutral-500 */
  font-family: monospace;
}

.report-item-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 8px;
}

.tag {
  padding: 2px 6px;
  font-size: 0.65rem;
  background: rgba(6, 182, 212, 0.1);
  border: 1px solid #06b6d4;
  color: #06b6d4;
  border-radius: 2px;
  text-transform: uppercase;
}
```

---

## 6. PeriodFilter Component

### Dropdown for Time-based Filtering

**Purpose**: Allow users to filter reports by time period

**Interface**:

```javascript
/**
 * Render period filter dropdown
 * @param {PeriodFilter} currentFilter - Currently applied filter
 * @returns {string} HTML string for filter UI
 */
function renderPeriodFilter(currentFilter) {
  return `
    <div class="period-filter">
      <label for="period-select" class="filter-label">Período:</label>

      <select
        id="period-select"
        class="filter-select"
        onchange="handleFilterChange(this.value)"
      >
        <option value="all-time" ${currentFilter.type === 'all-time' ? 'selected' : ''}>
          Todos os períodos
        </option>
        <option value="last-7-days" ${currentFilter.type === 'last-7-days' ? 'selected' : ''}>
          Últimos 7 dias
        </option>
        <option value="last-30-days" ${currentFilter.type === 'last-30-days' ? 'selected' : ''}>
          Últimos 30 dias
        </option>
        <option value="last-quarter" ${currentFilter.type === 'last-quarter' ? 'selected' : ''}>
          Último trimestre
        </option>
        <option value="custom" ${currentFilter.type === 'custom' ? 'selected' : ''}>
          Período personalizado...
        </option>
      </select>
    </div>

    ${currentFilter.type === 'custom' ? renderCustomDatePicker(currentFilter) : ''}
  `;
}
```

**Event Handler**:

```javascript
/**
 * Handle filter change
 * @param {PeriodFilterType} filterType - New filter type
 */
function handleFilterChange(filterType) {
  const newFilter = { type: filterType };

  // If custom, prompt for date range (simplified for MVP)
  if (filterType === 'custom') {
    const start = prompt('Data de início (YYYY-MM-DD):');
    const end = prompt('Data de fim (YYYY-MM-DD):');

    if (start && end) {
      newFilter.customRange = { start, end };
    } else {
      return; // Cancel if no dates provided
    }
  }

  // Apply filter
  const filtered = applyPeriodFilter(dashboardState.allReports, newFilter);

  updateDashboardState({
    currentFilter: newFilter,
    filteredReports: filtered,
    selectedReport: null // Clear selection when filtering
  });
}
```

**CSS Classes**:

```css
.period-filter {
  padding: 16px;
  border-bottom: 1px solid #262626;
}

.filter-label {
  display: block;
  font-size: 0.75rem;
  color: #737373;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.filter-select {
  width: 100%;
  padding: 8px 12px;
  background: #0a0a0a;
  border: 1px solid #262626;
  border-radius: 4px;
  color: #f5f5f5;
  font-family: inherit;
  font-size: 0.875rem;
  cursor: pointer;
}

.filter-select:focus {
  outline: none;
  border-color: var(--theme-color, #06b6d4);
}
```

---

## 7. ReportViewer Component

### iframe-based Report Display

**Purpose**: Render selected report HTML in isolated iframe

**Interface**:

```javascript
/**
 * Render the report viewer (right pane)
 * @returns {string} HTML string for report viewer
 */
function renderReportViewer() {
  const { selectedReport, loading } = dashboardState;

  if (!selectedReport) {
    return renderReportEmptyState();
  }

  if (loading.report) {
    return `<div class="report-loading">Carregando relatório...</div>`;
  }

  return `
    <div class="report-viewer">
      <iframe
        id="report-iframe"
        src="/reports/${selectedReport.fileName}"
        sandbox="allow-same-origin"
        onload="handleReportLoad()"
        onerror="handleReportError()"
        title="${escapeHtml(selectedReport.title)}"
      ></iframe>
    </div>
  `;
}
```

**Event Handlers**:

```javascript
/**
 * Handle successful report load
 */
function handleReportLoad() {
  updateDashboardState({
    loading: { ...dashboardState.loading, report: false }
  });
}

/**
 * Handle report load error
 */
function handleReportError() {
  updateDashboardState({
    loading: { ...dashboardState.loading, report: false },
    error: `Falha ao carregar relatório: ${dashboardState.selectedReport?.fileName}`
  });
}
```

**Empty State**:

```javascript
function renderReportEmptyState() {
  return `
    <div class="report-empty-state">
      <div class="empty-icon">📊</div>
      <h2>Selecione um relatório</h2>
      <p>Escolha um relatório na lista à esquerda para visualizá-lo aqui.</p>
    </div>
  `;
}
```

**CSS Classes**:

```css
.report-viewer {
  position: relative;
  height: 100%;
  background: #0a0a0a;
}

#report-iframe {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
}

.report-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #737373;
  font-size: 0.875rem;
}

.report-empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #737373;
  text-align: center;
  padding: 24px;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 16px;
  opacity: 0.5;
}

.report-empty-state h2 {
  font-size: 1.125rem;
  color: #f5f5f5;
  margin-bottom: 8px;
}

.report-empty-state p {
  font-size: 0.875rem;
  max-width: 400px;
}
```

---

## 8. Utility Functions

### Helper Functions for Components

```javascript
/**
 * Format date for display (DD.MM.YYYY)
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date
 */
function formatDate(date) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}.${month}.${year}`;
}

/**
 * Calculate days between two dates
 * @param {Date|string} date1
 * @param {Date|string} date2
 * @returns {number} Days between dates
 */
function daysBetween(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diff = Math.abs(d2 - d1);
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

/**
 * Escape HTML to prevent XSS
 * @param {string} str - String to escape
 * @returns {string} Escaped string
 */
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/**
 * Get human-readable report age
 * @param {Report} report
 * @returns {string} Age string (e.g., "2 dias atrás")
 */
function getReportAge(report) {
  const now = new Date();
  const created = new Date(report.dateCreated);
  const days = daysBetween(created, now);

  if (days === 0) return 'hoje';
  if (days === 1) return 'ontem';
  if (days < 7) return `${days} dias atrás`;
  if (days < 30) return `${Math.floor(days / 7)} semanas atrás`;
  if (days < 365) return `${Math.floor(days / 30)} meses atrás`;
  return `${Math.floor(days / 365)} anos atrás`;
}

/**
 * Format report period for display
 * @param {Report} report
 * @returns {string} Period string (e.g., "05.12.2025 → 12.01.2026 (38 dias)")
 */
function formatReportPeriod(report) {
  const start = formatDate(report.period.start);
  const end = formatDate(report.period.end);
  const days = daysBetween(report.period.start, report.period.end);

  return `${start} → ${end} (${days} dias)`;
}
```

---

## 9. Accessibility (a11y) Contract

### Keyboard Navigation

| Key | Action |
|-----|--------|
| Tab | Navigate between filter, report items, and iframe |
| Enter/Space | Select report item (when focused) |
| Arrow Up/Down | Navigate report list (when focused on list item) |
| Escape | Clear selection / return to report list |

### ARIA Attributes

```html
<!-- Report list container -->
<div class="report-items" role="list" aria-label="Lista de relatórios">
  <!-- Report item -->
  <div
    class="report-item"
    role="listitem"
    tabindex="0"
    aria-pressed="false"
    aria-label="Relatório: Relatório Estratégico de Leads, período 05.12.2025 a 12.01.2026"
  >
    ...
  </div>
</div>

<!-- Report viewer iframe -->
<iframe
  role="document"
  aria-label="Visualizador de relatório: Relatório Estratégico de Leads"
  title="Relatório Estratégico de Leads"
>
</iframe>
```

### Screen Reader Announcements

```javascript
/**
 * Announce to screen readers (live region)
 * @param {string} message - Message to announce
 */
function announceToScreenReader(message) {
  const liveRegion = document.getElementById('sr-live-region');
  if (liveRegion) {
    liveRegion.textContent = message;
  }
}

// Usage
selectReport('rpt-001');
announceToScreenReader('Relatório Estratégico de Leads selecionado');
```

---

## 10. Error Handling Contract

### Error Types

```javascript
const ERROR_TYPES = {
  NETWORK: 'network',
  PARSE: 'parse',
  NOT_FOUND: 'not_found',
  INVALID_DATA: 'invalid_data',
  TIMEOUT: 'timeout'
};

class ReportError extends Error {
  constructor(type, message, details = {}) {
    super(message);
    this.type = type;
    this.details = details;
  }
}
```

### Error Handling Examples

```javascript
// Network error
try {
  const reports = await fetchReports();
} catch (error) {
  if (error instanceof TypeError) {
    throw new ReportError(
      ERROR_TYPES.NETWORK,
      'Falha de rede ao carregar relatórios',
      { originalError: error }
    );
  }
}

// Parse error
try {
  const data = JSON.parse(responseText);
} catch (error) {
  throw new ReportError(
    ERROR_TYPES.PARSE,
    'Formato inválido em reports/index.json',
    { originalError: error }
  );
}

// Not found error
if (response.status === 404) {
  throw new ReportError(
    ERROR_TYPES.NOT_FOUND,
    'Arquivo de índice não encontrado',
    { url: response.url }
  );
}
```

### Error Display

```javascript
function renderError(error) {
  return `
    <div class="error-message" role="alert">
      <div class="error-icon">⚠️</div>
      <h3>${escapeHtml(error.message)}</h3>
      <button onclick="retryLastAction()">Tentar Novamente</button>
    </div>
  `;
}
```

---

## API Contract Complete

All component interfaces, routing, data fetching, and error handling contracts defined. Ready for implementation.
