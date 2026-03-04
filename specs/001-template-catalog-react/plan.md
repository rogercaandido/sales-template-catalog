# Implementation Plan: Template Catalog for Sales Teams

**Branch**: `001-template-catalog-react` | **Date**: 2025-12-22 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-template-catalog-react/spec.md`

## Summary

Build a multi-feature web application with two main views:

1. **Template Catalog** (main page): Display template catalogs for four companies (Consulfarma, ICosmetologia, Hi Nutrition, Seminários Consulfarma). Users can switch between company tabs, view template cards in a responsive grid, and click cards to copy template names to clipboard.

2. **Report Admin Dashboard** (`/reportadminx`): Marketing analytics report viewer with period-based filtering. Marketing team can upload HTML reports via Git, filter by time period, and view full reports in isolated iframe viewer.

**Update (2026-01-12)**: Adding fourth company category "Seminários Consulfarma" with 6 event-related templates and cyan color theme.

**Update (2026-01-13)**: Adding Report Admin Dashboard feature for marketing team to view and manage analytics reports.

**Update (2026-01-28)**: Adding template sorting (newest first) and automatic "new" badge system for latest templates.

**Update (2026-03-04)**: Fix admin panel GitHub token persistence — switch from `sessionStorage` to `localStorage` so token survives browser session restarts. Pre-fill token field on login.

## Technical Context

### Template Catalog (Existing)

**Language/Version**: JavaScript (ES6+) / React (Framer-provided runtime)
**Primary Dependencies**: None (Framer Code provides React runtime)
**Storage**: In-memory data object (no persistence)
**Testing**: Manual testing via browser
**Target Platform**: Web browsers (standalone HTML + optional Framer Code embed)
**Project Type**: Single-file application with optional React component variant
**Performance Goals**: <500ms clipboard copy response, 60fps animations
**Constraints**: Single file <500 lines (React version), inline styles only, Framer Code compatible
**Scale/Scope**: 4 companies, ~6-20 templates per company (low scale)

### Report Admin Dashboard (New - 2026-01-13)

**Language/Version**: JavaScript (ES6+) / Vanilla JS or React
**Primary Dependencies**: None (may use React if refactoring entire app)
**Storage**: Static JSON (`reports/index.json`) + HTML files (`reports/*.html`)
**Testing**: Manual testing via browser
**Target Platform**: Web browsers (same deployment as template catalog)
**Project Type**: Multi-view SPA with hash-based routing
**Performance Goals**: <2s dashboard load, <3s report render in iframe
**Constraints**: No backend/database, Git-based workflow for adding reports
**Scale/Scope**: 0-500 reports initially (pagination if exceeding)

## Constitution Check

*GATE: Constitution file is currently a template. Skipping validation for this feature.*

**Status**: N/A - Constitution not yet defined for this project

## Project Structure

### Documentation (this feature)

```text
specs/001-template-catalog-react/
├── plan.md                      # This file (overall implementation plan)
│
├── research.md                  # Template catalog technical decisions
├── data-model.md                # Template catalog data structures
├── quickstart.md                # Template catalog usage guide
│
├── research-reportadmin.md      # Report dashboard technical decisions
├── data-model-reportadmin.md    # Report dashboard data structures
├── quickstart-reportadmin.md    # Report dashboard usage guide
│
├── research-template-sorting.md # Template sorting technical decisions (NEW 2026-01-28)
├── data-model-sorting.md        # Template sorting data structures (NEW 2026-01-28)
├── quickstart-sorting.md        # Template sorting deployment guide (NEW 2026-01-28)
│
└── contracts/
    ├── component-api.md         # Template catalog component interface
    ├── reportadmin-api.md       # Report dashboard API contract
    └── template-sorting-api.md  # Template sorting API contract (NEW 2026-01-28)
```

### Source Code (repository root)

```text
index.html               # Main application (template catalog + routing)
src/
└── TemplateCatalog.tsx  # React component variant (Framer Code)

reports/                 # Report dashboard storage (NEW)
├── index.json          # Report metadata index (NEW)
└── *.html              # Individual report HTML files (NEW)

# No tests/ directory - manual testing only per user constraints
```

**Structure Decision**:

**Template Catalog**: Single-file architecture with both standalone HTML and React variants. The standalone `index.html` is the primary implementation, with `src/TemplateCatalog.tsx` as an optional React component for Framer Code embedding.

**Report Dashboard**: Integrated into existing `index.html` using hash-based routing:
- `/` (or `#/`) → Template catalog (default view)
- `#/reportadminx` → Report dashboard view

**Report Storage**: File-based system in `/reports/` directory:
- `index.json`: Metadata for all reports (title, period, tags, etc.)
- `*.html`: Self-contained HTML report files (generated by marketing team)

This structure optimizes for:
1. Zero backend infrastructure (static hosting only)
2. Git-based workflow (reports tracked in version control)
3. Simple deployment (single HTML file + reports directory)
4. Easy report additions (edit JSON + add HTML file)
5. Visual consistency (both views share dark theme)

## Complexity Tracking

> **No constitution violations** - Constitution not yet defined. If defined later, this simple single-file component should pass all reasonable complexity gates.

## Modification Log

### 2026-02-05: Fix Carteiras Grid Layout Distribution

**Context**: Carteiras footer grid items don't distribute uniformly when there are fewer items than maximum columns. Items leave empty gaps at the end of rows instead of expanding to fill available space.

**Problem**: Current CSS uses `auto-fill` which creates grid tracks (columns) but doesn't collapse empty tracks. This results in uneven distribution, especially visible with:
- Hi Nutrition (5 items)
- Seminários Consulfarma (1 item)

**Solution**: Change `auto-fill` to `auto-fit` in `.carteiras-grid` CSS. This collapses empty tracks, allowing items to expand uniformly.

**Changes Required**:

1. **CSS Update** (single-line change):
   ```diff
   .carteiras-grid {
     display: grid;
   -  grid-template-columns: repeat(auto-fill, minmax(min(180px, 100%), 1fr));
   +  grid-template-columns: repeat(auto-fit, minmax(min(180px, 100%), 1fr));
     gap: 6px;
     /* ... */
   }
   ```

2. **Optional Enhancement** (if single item stretches excessively):
   ```css
   .carteira-item {
     display: flex;
     align-items: baseline;
     gap: 6px;
     max-width: 300px; /* Prevent excessive expansion */
   }
   ```

3. **Testing**:
   - Verify uniform distribution on all 4 company tabs
   - Test mobile breakpoint (≤768px) still works (single column)
   - Test edge case: Seminários Consulfarma (1 item)
   - Test cross-browser (Chrome, Firefox, Safari)

**Impact**:
- Single-line CSS change (minimal risk)
- Zero JavaScript or HTML changes
- Maintains existing mobile breakpoint behavior
- No breaking changes

**Technical Approach**: See [research-carteiras-layout.md](./research-carteiras-layout.md) for detailed analysis, [quickstart-carteiras-layout.md](./quickstart-carteiras-layout.md) for testing workflow, and [contracts/carteiras-layout-api.md](./contracts/carteiras-layout-api.md) for CSS API contract.

---

### 2026-01-28: Add Template Sorting & "New" Badge System

**Context**: Users need templates sorted by date (newest first) and want visual indication of the most recent template via an automatic "new" badge.

**Changes Required**:

1. **Data Model Update**:
   - Add optional `createdAt` field to Template interface (YYYY-MM-DD format)
   - Backfill existing templates with estimated dates
   - Document field in data-model-sorting.md

2. **Sorting Logic**:
   - Implement `getSortedTemplates(companyKey)` function (DESC sort by date)
   - Clone template arrays before sorting (non-destructive)
   - Handle missing/invalid dates (treat as oldest)
   - Stable sort for ties (preserve original array order)

3. **Badge System**:
   - Implement `getNewestTemplate(companyKey)` function
   - Compute badge status at render time (no stored state)
   - Per-company scope (each company has independent newest)
   - Add `.badge-new` CSS class (minimalist design, company theme color)

4. **Rendering Updates**:
   - Modify `renderTemplatesForCompany()` to use sorted templates
   - Add badge HTML to newest template card
   - Position badge below template name, above message
   - Ensure responsive layout (320px+ mobile support)

5. **Documentation**:
   - Create quickstart-sorting.md (deployment workflow)
   - Update CLAUDE.md with new template schema
   - Add troubleshooting guide for common issues

**Impact**:
- Adds ~150-200 lines to `index.html` (sorting + badge logic)
- Modifies template data structure (additive, backward compatible)
- Zero impact on existing functionality (templates without dates still work)
- Automatic badge management (no manual deployment steps)

**Technical Approach**: See [research-template-sorting.md](./research-template-sorting.md) for architecture decisions, [data-model-sorting.md](./data-model-sorting.md) for data structures, and [contracts/template-sorting-api.md](./contracts/template-sorting-api.md) for API contracts.

---

### 2026-01-13: Add Report Admin Dashboard

**Context**: Marketing team needs a way to upload, view, and filter HTML-based analytics reports (lead analysis, conversion metrics, etc.).

**Changes Required**:

1. **Routing System**:
   - Implement hash-based routing in `index.html`
   - Route `/` → template catalog (existing)
   - Route `#/reportadminx` → report dashboard (new)
   - Add navigation link between views

2. **Report Dashboard UI**:
   - Two-column layout (report list + viewer)
   - Period filter dropdown (last 7/30/90 days, all time, custom)
   - Report list component (shows metadata cards)
   - Report viewer component (iframe for HTML reports)
   - Loading and empty states

3. **Data Layer**:
   - Create `/reports/` directory
   - Create `reports/index.json` schema (report metadata)
   - Add sample report HTML (from user's example)
   - Implement fetch logic for JSON index

4. **Styling**:
   - Extend existing developer dark mode theme
   - Add dashboard-specific CSS classes
   - Maintain visual consistency with template catalog

**Impact**:
- Adds ~300-400 lines to `index.html` (routing + dashboard)
- Creates new `/reports/` directory structure
- Zero impact on existing template catalog functionality
- Maintains static hosting compatibility (no backend needed)

**Technical Approach**: See [research-reportadmin.md](./research-reportadmin.md) for architecture decisions, [data-model-reportadmin.md](./data-model-reportadmin.md) for data structures, and [contracts/reportadmin-api.md](./contracts/reportadmin-api.md) for API contracts.

---

### 2026-01-12: Add Seminários Consulfarma Company

**Context**: User requested addition of fourth company category for event/seminar templates.

**Changes Required**:
1. Add new color theme (cyan #06b6d4) for Seminários Consulfarma
2. Add 6 new templates to data structure
3. Extend COMPANIES array with new tab entry
4. Add carteiras assignment for new company
5. Update CSS theme classes to include `theme-seminariosconsulfarma`

**Impact**:
- Zero logic changes (existing rendering handles 4+ tabs)
- Pure data additions to existing structure
- One new CSS class for theme
- Maintains backward compatibility

**Technical Approach**: See [research.md](./research.md) for detailed color selection rationale and implementation decisions.

---

## Architecture Overview

### Application Flow

```
User navigates to application
        ↓
Load index.html (main entry point)
        ↓
Check window.location.hash
        ↓
    ┌───┴───┐
    │       │
    ↓       ↓
  '/' or  '#/reportadminx'
  empty
    │       │
    ↓       ↓
Template   Report
Catalog    Dashboard
    │           │
    │           ↓
    │      Fetch reports/index.json
    │           │
    │           ↓
    │      Render report list
    │           │
    │           ↓
    │      User selects report
    │           │
    │           ↓
    │      Load report HTML in iframe
    │           │
    └───────────┘
         │
         ↓
User can navigate between views via hash links
```

### Component Hierarchy

**Template Catalog View**:
```
<body class="theme-{company}">
  <div id="app">
    <header>
      <h1>Template Catalog</h1>
      <a href="#/reportadminx">Ver Relatórios</a>
    </header>

    <div class="tab-container">
      <button class="tab active">Consulfarma</button>
      ...
    </div>

    <div class="template-grid">
      <div class="template-card">...</div>
      ...
    </div>

    <div class="stats-bar">...</div>
    <div class="carteiras">...</div>
  </div>

  <div id="toast-container"></div>
</body>
```

**Report Dashboard View**:
```
<body>
  <div id="app">
    <header class="dashboard-header">
      <h1>Report Dashboard</h1>
      <a href="#/">Voltar ao Catálogo</a>
    </header>

    <div class="dashboard-layout">
      <aside class="report-sidebar">
        <div class="period-filter">
          <select>...</select>
        </div>

        <div class="report-count">...</div>

        <div class="report-items">
          <div class="report-item">...</div>
          ...
        </div>
      </aside>

      <main class="report-content">
        <div class="report-viewer">
          <iframe src="/reports/{fileName}"></iframe>
        </div>
      </main>
    </div>
  </div>
</body>
```

### Data Flow

**Template Catalog**:
```
TEMPLATES (hardcoded object)
    ↓
User selects company tab
    ↓
Filter templates by company
    ↓
Render template cards
    ↓
User clicks card
    ↓
Copy template name to clipboard
    ↓
Show toast notification
```

**Report Dashboard**:
```
Page load
    ↓
Fetch /reports/index.json
    ↓
Parse JSON → allReports[]
    ↓
Apply default filter (all-time) → filteredReports[]
    ↓
Render report list (left sidebar)
    ↓
User selects report
    ↓
Load report HTML in iframe (right pane)
    ↓
User changes filter
    ↓
Re-filter allReports[] → filteredReports[]
    ↓
Re-render report list
```

---

## Implementation Phases

### Phase 0: Planning ✅ COMPLETE

- [x] Research technical decisions ([research-reportadmin.md](./research-reportadmin.md))
- [x] Define data model ([data-model-reportadmin.md](./data-model-reportadmin.md))
- [x] Create API contracts ([contracts/reportadmin-api.md](./contracts/reportadmin-api.md))
- [x] Write quickstart guide ([quickstart-reportadmin.md](./quickstart-reportadmin.md))
- [x] Update implementation plan (this file)

### Phase 1: Routing Layer (Foundation)

**Goal**: Enable navigation between template catalog and report dashboard

**Tasks**:
1. Extract template catalog HTML into function: `renderTemplateCatalog()`
2. Create router initialization: `initRouter()`
3. Implement route detection: `getCurrentRoute()`
4. Implement route rendering: `renderRoute(route)`
5. Add navigation links to both views
6. Test browser back/forward buttons
7. Test direct URL navigation (`index.html#/reportadminx`)

**Deliverables**:
- Hash-based routing system working
- Template catalog unaffected by routing changes
- Navigation between views functional

**Estimated Lines**: ~50-70 lines in `index.html`

### Phase 2: Report Data Layer

**Goal**: Create report storage structure and fetch logic

**Tasks**:
1. Create `/reports/` directory
2. Create `reports/index.json` with schema
3. Add user's example report (`leads-2026-01-12.html`)
4. Implement `fetchReports()` function
5. Implement `validateReport()` function
6. Implement error handling for fetch failures
7. Test JSON parsing and validation

**Deliverables**:
- `/reports/` directory with index and sample report
- Working data fetching logic
- Error handling for common failure modes

**Estimated Lines**: ~80-100 lines in `index.html` + JSON file

### Phase 3: Report Dashboard UI

**Goal**: Build report list and viewer components

**Tasks**:
1. Create dashboard state management: `dashboardState` object
2. Implement `renderReportDashboard()` function
3. Implement `renderReportList()` function
4. Implement `renderReportItem(report)` function
5. Implement `renderReportViewer()` function
6. Implement `selectReport(reportId)` event handler
7. Implement loading and empty states
8. Add CSS for dashboard layout (two-column grid)
9. Add CSS for report list items
10. Add CSS for iframe viewer

**Deliverables**:
- Functional report list (left sidebar)
- Functional report viewer (right pane, iframe)
- Report selection working
- Responsive layout (mobile/desktop)

**Estimated Lines**: ~150-200 lines in `index.html` (JS + CSS)

### Phase 4: Period Filtering

**Goal**: Enable time-based report filtering

**Tasks**:
1. Implement `renderPeriodFilter()` function
2. Implement `applyPeriodFilter(reports, filter)` function
3. Implement `handleFilterChange(filterType)` event handler
4. Implement utility functions: `daysBetween()`, `getReportAge()`
5. Add CSS for filter dropdown
6. Test all preset periods (last 7/30/90 days, all time)
7. Implement custom date range (prompt-based for MVP)

**Deliverables**:
- Working period filter dropdown
- Report list updates when filter changes
- Report count indicator shows filtered count

**Estimated Lines**: ~100-120 lines in `index.html`

### Phase 5: Polish & Testing

**Goal**: Ensure quality, accessibility, and edge case handling

**Tasks**:
1. Add keyboard navigation (Tab, Enter, Arrow keys)
2. Add ARIA labels for screen readers
3. Add focus indicators
4. Test on mobile (320px - 768px)
5. Test on desktop (1920px+)
6. Test with 0 reports (empty state)
7. Test with 100+ reports (performance)
8. Test with large report HTML files (>1MB)
9. Test error scenarios (404, invalid JSON, etc.)
10. Add console logging for debugging
11. Update CLAUDE.md with new feature documentation

**Deliverables**:
- Accessible dashboard (keyboard + screen reader)
- Responsive design validated
- Edge cases handled gracefully
- Documentation updated

**Estimated Lines**: ~50-70 lines (polish + error handling)

---

### Phase 6: Template Sorting & "New" Badge (2026-01-28) 🆕

**Goal**: Enable chronological template sorting and automatic badge on newest template

**Tasks**:

1. **Data Migration**:
   - Add `createdAt` field to all existing templates (backfill with estimated dates)
   - Validate date formats (YYYY-MM-DD) for all templates
   - Document date estimation strategy in commit message

2. **Sorting Functions**:
   - Implement `getSortedTemplates(companyKey)` function
   - Implement `getNewestTemplate(companyKey)` function
   - Implement `isNewTemplate(template, companyKey)` function
   - Add `validateDateFormat(dateString)` utility function

3. **Badge Rendering**:
   - Add `.badge-new` CSS class (below template name, company theme color)
   - Update `createTemplateCard()` to accept `isNew` parameter
   - Conditionally render badge HTML with ARIA labels
   - Test badge on all 4 company themes (red, purple, amber, cyan)

4. **Rendering Updates**:
   - Modify `renderTemplatesForCompany()` to use sorted templates
   - Pass badge status to card creation
   - Ensure stable sort for templates with same date

5. **Validation & Error Handling**:
   - Log warnings for invalid date formats (non-blocking)
   - Handle missing `createdAt` fields gracefully (sort to end)
   - Validate all templates on page load (dev mode)

6. **Testing**:
   - Test sorting with mixed dates (newest first)
   - Test badge on newest template per company
   - Test missing/invalid dates (fallback behavior)
   - Test all same dates (tie-breaking with stable sort)
   - Test empty company (0 templates)
   - Test mobile layout (320px+)

7. **Documentation**:
   - Update CLAUDE.md with template schema change
   - Document deployment workflow in quickstart-sorting.md
   - Add troubleshooting guide for common issues

**Deliverables**:
- All templates sorted DESC by `createdAt` (newest first)
- "novo" badge on newest template per company
- Backward compatible (templates without dates still work)
- Zero-step deployment (automatic badge management)

**Estimated Lines**: ~150-200 lines in `index.html` (functions + CSS)

**Design Artifacts**:
- Research: [research-template-sorting.md](./research-template-sorting.md)
- Data model: [data-model-sorting.md](./data-model-sorting.md)
- API contracts: [contracts/template-sorting-api.md](./contracts/template-sorting-api.md)
- Deployment guide: [quickstart-sorting.md](./quickstart-sorting.md)

---

## Total Estimated Code Changes

| Component | Lines of Code | Location |
|-----------|---------------|----------|
| Routing system | 50-70 | `index.html` |
| Data fetching | 80-100 | `index.html` |
| Dashboard UI | 150-200 | `index.html` |
| Period filtering | 100-120 | `index.html` |
| Polish & a11y | 50-70 | `index.html` |
| Template sorting & badges (NEW) | 150-200 | `index.html` |
| **Total** | **580-760** | `index.html` |

**Additional Files**:
- `reports/index.json` (metadata, ~50-100 lines)
- `reports/*.html` (reports, variable size)

---

## Testing Strategy

### Manual Testing Checklist

**Routing**:
- [ ] Navigate from catalog to dashboard via link
- [ ] Navigate from dashboard to catalog via link
- [ ] Direct URL: `index.html#/reportadminx` loads dashboard
- [ ] Direct URL: `index.html` loads catalog
- [ ] Browser back button works correctly
- [ ] Browser forward button works correctly
- [ ] Refresh page maintains current view

**Report Loading**:
- [ ] Dashboard loads report list from `reports/index.json`
- [ ] Report count indicator shows correct number
- [ ] Report metadata displays correctly (title, period, tags)
- [ ] Empty state shows when no reports exist
- [ ] Error state shows when `index.json` not found
- [ ] Loading spinner shows while fetching

**Report Selection**:
- [ ] Click report card selects report
- [ ] Selected report highlights (left border)
- [ ] Report HTML loads in iframe viewer
- [ ] Report content displays correctly (no style conflicts)
- [ ] Loading spinner shows while report loads
- [ ] Error state shows if report HTML not found

**Period Filtering**:
- [ ] "Todos os períodos" shows all reports
- [ ] "Últimos 7 dias" filters correctly
- [ ] "Últimos 30 dias" filters correctly
- [ ] "Último trimestre" filters correctly
- [ ] "Período personalizado" prompts for dates
- [ ] Report count updates after filter change
- [ ] Selected report clears if not in filtered results

**Responsive Design**:
- [ ] Mobile (320px): Single column, report list stacks above viewer
- [ ] Tablet (768px): Two columns visible
- [ ] Desktop (1920px): Optimal spacing, no overflow

**Accessibility**:
- [ ] Tab key navigates through filter, reports, and viewer
- [ ] Enter key selects focused report
- [ ] Arrow keys navigate report list
- [ ] ARIA labels present on interactive elements
- [ ] Focus indicators visible

**Edge Cases**:
- [ ] 0 reports: Empty state renders
- [ ] 1 report: UI works correctly
- [ ] 100+ reports: List scrolls smoothly
- [ ] Invalid JSON: Error message displays

---

**Template Sorting & Badges** (NEW 2026-01-28):
- [ ] Templates sort DESC by `createdAt` (newest first)
- [ ] Newest template per company shows "novo" badge
- [ ] Badge appears below template name, above message
- [ ] Badge uses correct company theme color (red/purple/amber/cyan)
- [ ] Only 1 badge per company (not multiple)
- [ ] Templates without `createdAt` sort to end (oldest)
- [ ] Templates with invalid date format sort to end (with console warning)
- [ ] Templates with same date maintain original array order (stable sort)
- [ ] Empty company (0 templates) renders without error
- [ ] Badge visible on mobile (320px+)
- [ ] Badge accessible (ARIA label present)
- [ ] Switching tabs updates badge correctly
- [ ] Adding new template with newer date moves badge automatically
- [ ] Missing report file: Error shows in viewer
- [ ] Large report (>5MB): Loads without crashing

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| iframe CORS issues | Ensure reports served from same origin (static host) |
| Report styles leak into dashboard | Use iframe sandboxing (`sandbox="allow-same-origin"`) |
| Large reports slow browser | Add loading spinner, consider pagination for 500+ reports |
| Git workflow too complex for marketing | Provide clear quickstart guide, consider upload UI in Phase 2 |
| Hash routing breaks on some hosts | Hash routing works universally (no server config required) |

---

## Next Steps After Implementation

1. **Deploy to production**: Push to main branch, auto-deploy to Netlify/Vercel
2. **Add first real report**: Marketing team adds their first report via Git
3. **Gather feedback**: Marketing team tests filtering, viewing, navigation
4. **Plan Phase 2 enhancements**:
   - Drag-and-drop report upload UI
   - Tag-based filtering
   - Search functionality
   - Report comparison view (side-by-side)
   - Export report list as CSV

---

## Success Criteria

**Functional**:
- ✅ Users can navigate between template catalog and report dashboard
- ✅ Users can view list of available reports
- ✅ Users can filter reports by time period
- ✅ Users can select and view full HTML reports
- ✅ Marketing team can add new reports via Git workflow

**Non-Functional**:
- ✅ Dashboard loads in <2 seconds
- ✅ Individual reports load in <3 seconds
- ✅ Responsive design works 320px → 1920px
- ✅ No console errors or warnings
- ✅ Accessible via keyboard and screen reader

**Documentation**:
- ✅ Technical research complete ([research-reportadmin.md](./research-reportadmin.md))
- ✅ Data model documented ([data-model-reportadmin.md](./data-model-reportadmin.md))
- ✅ API contracts defined ([contracts/reportadmin-api.md](./contracts/reportadmin-api.md))
- ✅ Quickstart guide available ([quickstart-reportadmin.md](./quickstart-reportadmin.md))

---

## Plan Complete ✅

All design artifacts generated. Ready for implementation via `/speckit.tasks` or manual development.
