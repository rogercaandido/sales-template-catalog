# Data Model: Report Admin Dashboard

**Feature**: `/reportadminx` - Marketing Analytics Report Viewer
**Date**: 2026-01-13
**Related**: [research-reportadmin.md](./research-reportadmin.md)

## Overview

This document defines all data entities, structures, and state management for the report admin dashboard feature.

---

## Core Entities

### 1. Report

**Description**: Represents a single marketing analytics report (HTML document with metadata)

**Storage**: `reports/index.json` (metadata) + `reports/*.html` (content)

**Schema**:
```typescript
interface Report {
  // Unique identifier (format: rpt-NNN)
  id: string;

  // Human-readable report title
  title: string;

  // Time period covered by this report
  period: {
    start: string;  // ISO 8601 date (YYYY-MM-DD)
    end: string;    // ISO 8601 date (YYYY-MM-DD)
  };

  // When the report was created/published
  dateCreated: string;  // ISO 8601 date (YYYY-MM-DD)

  // Filename of the HTML report (relative to /reports/)
  fileName: string;

  // Optional category tags for organization
  tags?: string[];

  // Optional description/summary
  description?: string;
}
```

**Example**:
```json
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
  "description": "Análise de 3.937 leads do período com foco em qualificação e benchmark"
}
```

**Validation Rules**:
- `id`: Required, unique, matches pattern `/^rpt-\d{3,}$/`
- `title`: Required, max 200 characters
- `period.start`: Required, valid ISO date, must be <= `period.end`
- `period.end`: Required, valid ISO date
- `dateCreated`: Required, valid ISO date, should be >= `period.end`
- `fileName`: Required, matches pattern `/^[a-z0-9-]+\.html$/`, file must exist in `/reports/`
- `tags`: Optional array, each tag max 50 characters, lowercase-with-hyphens
- `description`: Optional, max 500 characters

**State Transitions**: None (reports are immutable once created)

---

### 2. ReportIndex

**Description**: Collection of all available reports with metadata

**Storage**: `reports/index.json`

**Schema**:
```typescript
interface ReportIndex {
  // Array of all reports (sorted by dateCreated descending)
  reports: Report[];

  // Metadata about the index itself
  meta?: {
    lastUpdated: string;  // ISO 8601 timestamp
    version: string;      // Schema version (e.g., "1.0.0")
  };
}
```

**Example**:
```json
{
  "reports": [
    {
      "id": "rpt-002",
      "title": "Análise de Conversão - Janeiro 2026",
      "period": { "start": "2026-01-01", "end": "2026-01-31" },
      "dateCreated": "2026-02-01",
      "fileName": "conversao-janeiro-2026.html",
      "tags": ["conversão", "vendas"]
    },
    {
      "id": "rpt-001",
      "title": "Relatório Estratégico de Leads",
      "period": { "start": "2025-12-05", "end": "2026-01-12" },
      "dateCreated": "2026-01-12",
      "fileName": "leads-2026-01-12.html",
      "tags": ["leads", "meta-ads", "educação-cosmética"]
    }
  ],
  "meta": {
    "lastUpdated": "2026-02-01T14:30:00Z",
    "version": "1.0.0"
  }
}
```

**Constraints**:
- Reports array sorted by `dateCreated` descending (newest first)
- No duplicate `id` values
- No duplicate `fileName` values
- File size: Keep under 100KB (performance consideration)

---

### 3. PeriodFilter

**Description**: Defines time-based filtering options for reports

**Storage**: Component state (ephemeral)

**Schema**:
```typescript
type PeriodFilterType =
  | 'last-7-days'
  | 'last-30-days'
  | 'last-quarter'
  | 'all-time'
  | 'custom';

interface PeriodFilter {
  // Selected filter type
  type: PeriodFilterType;

  // Custom date range (only used when type === 'custom')
  customRange?: {
    start: string;  // ISO 8601 date
    end: string;    // ISO 8601 date
  };
}
```

**Example**:
```javascript
// Preset filter
{ type: 'last-30-days' }

// Custom range filter
{
  type: 'custom',
  customRange: {
    start: '2025-12-01',
    end: '2025-12-31'
  }
}
```

**Filter Logic**:
```javascript
function applyPeriodFilter(reports, filter) {
  const now = new Date();

  switch (filter.type) {
    case 'last-7-days':
      return reports.filter(r =>
        daysBetween(r.dateCreated, now) <= 7
      );

    case 'last-30-days':
      return reports.filter(r =>
        daysBetween(r.dateCreated, now) <= 30
      );

    case 'last-quarter':
      return reports.filter(r =>
        daysBetween(r.dateCreated, now) <= 90
      );

    case 'all-time':
      return reports;

    case 'custom':
      return reports.filter(r => {
        const created = new Date(r.dateCreated);
        const start = new Date(filter.customRange.start);
        const end = new Date(filter.customRange.end);
        return created >= start && created <= end;
      });
  }
}
```

---

### 4. DashboardState

**Description**: UI state for the report dashboard (ephemeral, not persisted)

**Storage**: Component state (React useState or vanilla JS object)

**Schema**:
```typescript
interface DashboardState {
  // All available reports (loaded from index.json)
  allReports: Report[];

  // Reports after applying current filter
  filteredReports: Report[];

  // Currently applied period filter
  currentFilter: PeriodFilter;

  // Currently selected report (null if none selected)
  selectedReport: Report | null;

  // Loading state for async operations
  loading: {
    index: boolean;     // Loading reports/index.json
    report: boolean;    // Loading report HTML in iframe
  };

  // Error state
  error: string | null;
}
```

**Initial State**:
```javascript
const initialState = {
  allReports: [],
  filteredReports: [],
  currentFilter: { type: 'all-time' },
  selectedReport: null,
  loading: { index: false, report: false },
  error: null
};
```

**State Transitions**:

```
┌─────────────────────────────────────────────┐
│  INITIAL                                    │
│  - allReports: []                           │
│  - selectedReport: null                     │
│  - loading.index: false                     │
└───────────────┬─────────────────────────────┘
                │
                │ fetchReports()
                ▼
┌─────────────────────────────────────────────┐
│  LOADING_INDEX                              │
│  - loading.index: true                      │
└───────────┬─────────────────┬───────────────┘
            │                 │
            │ success         │ failure
            ▼                 ▼
┌────────────────────┐  ┌─────────────────────┐
│  REPORTS_LOADED    │  │  ERROR              │
│  - allReports: [...│  │  - error: "..."     │
│  - filtered: [...]  │  │  - loading.index:   │
│  - loading: false   │  │    false            │
└─────┬──────────────┘  └─────────────────────┘
      │
      │ selectReport(report)
      ▼
┌─────────────────────────────────────────────┐
│  LOADING_REPORT                             │
│  - selectedReport: {...}                    │
│  - loading.report: true                     │
└───────────┬─────────────────────────────────┘
            │
            │ iframe onload
            ▼
┌─────────────────────────────────────────────┐
│  REPORT_VIEWING                             │
│  - selectedReport: {...}                    │
│  - loading.report: false                    │
└─────────────────────────────────────────────┘
```

---

## Derived Data

### 1. Report Period Summary

**Description**: Human-readable period string for display

**Derivation**:
```javascript
function formatReportPeriod(report) {
  const start = new Date(report.period.start);
  const end = new Date(report.period.end);
  const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

  return `${formatDate(start)} → ${formatDate(end)} (${days} dias)`;
}

// Example output: "05.12.2025 → 12.01.2026 (38 dias)"
```

### 2. Report Age

**Description**: How long ago the report was created

**Derivation**:
```javascript
function getReportAge(report) {
  const now = new Date();
  const created = new Date(report.dateCreated);
  const days = Math.floor((now - created) / (1000 * 60 * 60 * 24));

  if (days === 0) return 'hoje';
  if (days === 1) return 'ontem';
  if (days < 7) return `${days} dias atrás`;
  if (days < 30) return `${Math.floor(days / 7)} semanas atrás`;
  if (days < 365) return `${Math.floor(days / 30)} meses atrás`;
  return `${Math.floor(days / 365)} anos atrás`;
}
```

### 3. Report Count by Period

**Description**: Number of reports matching current filter

**Derivation**:
```javascript
function getReportCount(state) {
  return state.filteredReports.length;
}
```

---

## Relationships

```
ReportIndex
    │
    │ contains (1:N)
    ▼
  Report ──────────────┐
    │                  │
    │ references       │ filtered by
    │ (1:1)            │ (N:1)
    ▼                  │
  HTML File            ▼
(/reports/*.html)  PeriodFilter
                       │
                       │ applied to
                       │ (1:1)
                       ▼
                  DashboardState
                       │
                       │ selects (1:1)
                       ▼
                    Report
```

---

## Data Flow

### Initial Load

```
1. User navigates to #/reportadminx
   ↓
2. DashboardState initialized (empty)
   ↓
3. Fetch /reports/index.json
   ↓
4. Parse JSON → allReports
   ↓
5. Apply default filter (all-time) → filteredReports
   ↓
6. Render report list (left column)
```

### Report Selection

```
1. User clicks report in list
   ↓
2. Update selectedReport in state
   ↓
3. Set loading.report = true
   ↓
4. Render iframe with src="/reports/{fileName}"
   ↓
5. iframe fires onload event
   ↓
6. Set loading.report = false
```

### Filter Change

```
1. User selects filter (e.g., "Last 30 days")
   ↓
2. Update currentFilter in state
   ↓
3. Re-apply filter to allReports → filteredReports
   ↓
4. Re-render report list
   ↓
5. If selectedReport not in filteredReports:
   - Clear selectedReport (show empty state in preview)
```

---

## Storage Considerations

### Performance
- **index.json**: Keep under 100KB (approx 500 reports @ 200 bytes each)
- **Individual reports**: No size limit, but consider lazy loading for >1MB files

### Scalability
- **Current approach works for**: 0-500 reports
- **If exceeding 500 reports**:
  - Implement pagination in index.json (e.g., `reports-2026.json`, `reports-2025.json`)
  - Add year-based navigation in UI
  - Consider server-side API for search/filter

### Caching
- **index.json**: Cache with ETag/Last-Modified headers (browser handles automatically)
- **Report HTML files**: Immutable (never change after creation), aggressive caching OK

---

## Example Data Set

**File**: `reports/index.json`

```json
{
  "reports": [
    {
      "id": "rpt-003",
      "title": "Performance de Campanhas Q1 2026",
      "period": { "start": "2026-01-01", "end": "2026-03-31" },
      "dateCreated": "2026-04-05",
      "fileName": "campanhas-q1-2026.html",
      "tags": ["campanhas", "google-ads", "meta-ads"],
      "description": "Comparativo de performance entre Google Ads e Meta Ads no primeiro trimestre"
    },
    {
      "id": "rpt-002",
      "title": "Análise de Conversão - Janeiro 2026",
      "period": { "start": "2026-01-01", "end": "2026-01-31" },
      "dateCreated": "2026-02-01",
      "fileName": "conversao-janeiro-2026.html",
      "tags": ["conversão", "vendas", "educação-cosmética"]
    },
    {
      "id": "rpt-001",
      "title": "Relatório Estratégico de Leads",
      "period": { "start": "2025-12-05", "end": "2026-01-12" },
      "dateCreated": "2026-01-12",
      "fileName": "leads-2026-01-12.html",
      "tags": ["leads", "meta-ads", "educação-cosmética"],
      "description": "Análise de 3.937 leads com benchmark de mercado e diagnóstico de qualificação"
    }
  ],
  "meta": {
    "lastUpdated": "2026-04-05T10:00:00Z",
    "version": "1.0.0"
  }
}
```

---

## Validation & Error Handling

### Data Validation

```javascript
function validateReport(report) {
  const errors = [];

  if (!report.id || !/^rpt-\d{3,}$/.test(report.id)) {
    errors.push('Invalid report ID format');
  }

  if (!report.title || report.title.length > 200) {
    errors.push('Title required and must be <= 200 characters');
  }

  const start = new Date(report.period.start);
  const end = new Date(report.period.end);

  if (isNaN(start) || isNaN(end)) {
    errors.push('Invalid period dates');
  }

  if (start > end) {
    errors.push('Period start must be before end');
  }

  if (!report.fileName || !/^[a-z0-9-]+\.html$/.test(report.fileName)) {
    errors.push('Invalid fileName format');
  }

  return errors;
}
```

### Error States

| Error Scenario | Error Message | User Action |
|---------------|---------------|-------------|
| index.json not found | "Nenhum relatório disponível. Adicione relatórios via Git." | Show empty state with instructions |
| index.json parse error | "Erro ao carregar índice de relatórios. Verifique o formato JSON." | Show error + link to documentation |
| Report HTML not found | "Relatório não encontrado: {fileName}" | Show error in preview pane, keep list visible |
| iframe load timeout | "Tempo limite para carregar relatório. Tente novamente." | Retry button |
| Network error | "Sem conexão. Verifique sua internet." | Retry button |

---

## Data Model Complete

All entities, relationships, and data flows defined. Ready for API contracts and implementation.
