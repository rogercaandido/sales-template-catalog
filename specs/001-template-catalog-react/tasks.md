# Tasks: Template Catalog for Sales Teams

**Input**: Design documents from `/specs/001-template-catalog-react/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/component-api.md

**Tests**: NOT REQUESTED - Manual testing only per feature specification

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- Single-file React component: `src/TemplateCatalog.tsx`
- No tests directory (manual testing only)

---

## Phase 1: Setup (Project Initialization)

**Purpose**: Create project structure and initial file

- [X] T001 Create `src/` directory if it doesn't exist
- [X] T002 Create empty `src/TemplateCatalog.tsx` file with React imports and component skeleton

---

## Phase 2: Foundational (Core Data & Structure)

**Purpose**: Establish the data structures and component foundation that all user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T003 Define TEMPLATES data object with all three companies (consulfarma, icosmetologia, hinutrition) in src/TemplateCatalog.tsx
- [X] T004 Define COMPANIES configuration array for tab metadata in src/TemplateCatalog.tsx
- [X] T005 Implement component state management using useState hooks (activeTab and toast state) in src/TemplateCatalog.tsx
- [X] T006 Define dark theme style objects (background, text, border colors) in src/TemplateCatalog.tsx
- [X] T007 Implement main component structure with container layout in src/TemplateCatalog.tsx

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - View and Copy Template Names (Priority: P1) 🎯 MVP

**Goal**: Enable sales team members to quickly find template names and copy them to clipboard for use in communications

**Independent Test**: Open catalog, click any template card on default company tab (Consulfarma), verify template name is copied to clipboard and confirmation toast appears

### Implementation for User Story 1

- [X] T008 [P] [US1] Implement template card component with dark theme styling (background, border, padding, hover states) in src/TemplateCatalog.tsx
- [X] T009 [P] [US1] Implement template grid layout using CSS Grid with responsive columns (repeat(auto-fill, minmax(250px, 1fr))) in src/TemplateCatalog.tsx
- [X] T010 [US1] Implement copyToClipboard function using navigator.clipboard.writeText() with error handling in src/TemplateCatalog.tsx
- [X] T011 [US1] Implement toast notification system with visibility state and auto-dismiss timeout (2 seconds) in src/TemplateCatalog.tsx
- [X] T012 [US1] Connect onClick handlers to template cards to trigger copy and toast display in src/TemplateCatalog.tsx
- [X] T013 [US1] Add visual feedback for click interaction (cursor pointer, hover border brightness) in src/TemplateCatalog.tsx
- [X] T014 [US1] Implement toast component with fixed positioning, fade-in/out animations, and dark theme styling in src/TemplateCatalog.tsx

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently. Users can view Consulfarma templates and copy them to clipboard with visual confirmation.

---

## Phase 4: User Story 2 - Switch Between Company Catalogs (Priority: P2)

**Goal**: Enable sales team members working across multiple companies to switch between different company template catalogs

**Independent Test**: Click each of the three company tabs (Consulfarma, ICosmetologia, Hi Nutrition) and verify that different template sets are displayed with proper visual indication of the active tab

### Implementation for User Story 2

- [X] T015 [US2] Implement company tabs container with horizontal layout and spacing in src/TemplateCatalog.tsx
- [X] T016 [US2] Implement individual tab components with label, active state styling, and hover effects in src/TemplateCatalog.tsx
- [X] T017 [US2] Add active tab visual indicator (blue underline with accent color #0ea5e9) in src/TemplateCatalog.tsx
- [X] T018 [US2] Connect tab onClick handlers to update activeTab state in src/TemplateCatalog.tsx
- [X] T019 [US2] Filter displayed templates based on activeTab state (TEMPLATES[activeTab]) in src/TemplateCatalog.tsx
- [X] T020 [US2] Implement idempotent tab behavior (clicking active tab does nothing) in src/TemplateCatalog.tsx

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently. Users can switch between company tabs and copy templates from any company.

---

## Phase 5: User Story 3 - Responsive Experience Across Devices (Priority: P3)

**Goal**: Ensure the catalog automatically adapts its layout to provide optimal viewing experience on any screen size (desktop, tablet, mobile)

**Independent Test**: Resize browser window from 320px to 1920px and verify that template cards reflow appropriately with all interactive elements remaining accessible

### Implementation for User Story 3

- [X] T021 [US3] Configure responsive grid breakpoints (320px: 1 col, 768px: 2-3 cols, 1440px: 5 cols, 1920px: 6-7 cols) in src/TemplateCatalog.tsx
- [X] T022 [US3] Implement mobile-friendly touch targets (minimum 44px height for cards and tabs) in src/TemplateCatalog.tsx
- [X] T023 [US3] Add responsive padding and spacing that scales with viewport size in src/TemplateCatalog.tsx
- [X] T024 [US3] Ensure toast notifications are properly sized and positioned on mobile devices in src/TemplateCatalog.tsx
- [X] T025 [US3] Add text overflow handling for long template names (ellipsis, no wrap) in src/TemplateCatalog.tsx
- [X] T026 [US3] Verify tab container wraps or scrolls gracefully on narrow screens in src/TemplateCatalog.tsx

**Checkpoint**: All user stories should now be independently functional. The catalog works seamlessly across all device sizes.

---

## Phase 6: Polish & Edge Case Handling

**Purpose**: Refinements and edge cases that affect multiple user stories

- [X] T027 [P] Handle empty template arrays (display "No templates available" message) in src/TemplateCatalog.tsx
- [X] T028 [P] Handle clipboard permission denied error (show error toast: "Copy failed. Please try again.") in src/TemplateCatalog.tsx
- [X] T029 [P] Handle rapid successive clicks (ensure toast updates correctly without stacking) in src/TemplateCatalog.tsx
- [X] T030 [P] Add typography styles (Monaco/Menlo/Courier New monospace font stack) in src/TemplateCatalog.tsx
- [X] T031 Verify component export is correct for Framer Code (export default function) in src/TemplateCatalog.tsx
- [X] T032 Add inline code comments for TEMPLATES data structure explaining update pattern in src/TemplateCatalog.tsx
- [X] T033 Verify file size is under 500 lines constraint in src/TemplateCatalog.tsx

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-5)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Builds on US1 components but independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Enhances US1 and US2 but independently testable

### Within Each User Story

**User Story 1**:
- T008 and T009 (cards & grid) can run in parallel
- T010 (clipboard function) must be before T012 (click handlers)
- T011 (toast state) must be before T014 (toast component)
- T012 (click handlers) before T013 (visual feedback)

**User Story 2**:
- All tasks sequential (each builds on previous)

**User Story 3**:
- T021, T022, T023, T024, T025 can run in parallel (different styling concerns)
- T026 depends on T021-T025 completion

### Parallel Opportunities

- Setup tasks: Both T001 and T002 can run in parallel
- Foundational tasks: T003 and T004 can run in parallel (different data structures)
- US1 implementation: T008 and T009 can run in parallel (cards vs grid)
- Polish phase: T027, T028, T029, T030 can all run in parallel (different edge cases)

---

## Parallel Example: User Story 1 Core Features

```bash
# Launch card and grid implementation together:
Task: "Implement template card component with dark theme styling in src/TemplateCatalog.tsx"
Task: "Implement template grid layout using CSS Grid in src/TemplateCatalog.tsx"

# After those complete, launch these in parallel:
Task: "Implement copyToClipboard function in src/TemplateCatalog.tsx"
Task: "Implement toast notification system in src/TemplateCatalog.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently in Framer preview
   - Test: Click template cards on Consulfarma tab
   - Test: Verify clipboard copy works
   - Test: Verify toast notification appears and dismisses
5. Deploy/demo if ready (functional MVP without tab switching or responsive design)

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
   - **Value**: Sales team can copy Consulfarma templates
3. Add User Story 2 → Test independently → Deploy/Demo
   - **Value**: Multi-company support unlocked
4. Add User Story 3 → Test independently → Deploy/Demo
   - **Value**: Mobile-friendly, full responsiveness
5. Add Polish → Final deployment
   - **Value**: Production-ready with edge case handling

### Parallel Team Strategy

With multiple developers (not typical for this single-file project, but possible):

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (T008-T014)
   - Developer B: User Story 2 (T015-T020)
   - Developer C: User Story 3 (T021-T026)
3. Merge all stories into single file
4. Test integration
5. Apply polish together

**Note**: Given single-file constraint, sequential implementation (P1 → P2 → P3) is more practical.

---

## Manual Testing Checklist

After implementation, validate each user story independently:

### Test User Story 1 (Copy Functionality)
- [ ] Open component in Framer preview
- [ ] Verify Consulfarma templates display in grid
- [ ] Click any template card
- [ ] Verify toast appears with "Copied to clipboard!"
- [ ] Paste into external app (Ctrl/Cmd+V)
- [ ] Verify correct template name was copied

### Test User Story 2 (Tab Switching)
- [ ] Click ICosmetologia tab
- [ ] Verify different templates display
- [ ] Verify blue underline moves to active tab
- [ ] Click Hi Nutrition tab
- [ ] Verify different templates display again
- [ ] Click already-active tab
- [ ] Verify nothing changes (idempotent)

### Test User Story 3 (Responsive Design)
- [ ] Resize browser to 320px width (mobile)
- [ ] Verify 1 column layout, all cards visible
- [ ] Resize to 768px width (tablet)
- [ ] Verify 2-3 column layout
- [ ] Resize to 1920px width (desktop)
- [ ] Verify 6-7 column layout
- [ ] Verify no horizontal scroll at any width
- [ ] Tap template cards on actual mobile device
- [ ] Verify clipboard copy works on mobile

### Test Edge Cases (Polish Phase)
- [ ] Test with empty company array (temporarily remove all templates)
- [ ] Verify "No templates available" message displays
- [ ] Test rapid clicking (click 5 cards quickly)
- [ ] Verify toast updates correctly without errors
- [ ] Test with very long template name (>100 characters)
- [ ] Verify text truncates with ellipsis
- [ ] Test in private/incognito browser (clipboard permissions)
- [ ] Verify error toast if permissions denied

---

## Notes

- **[P] tasks**: Different styling concerns or data structures, no dependencies
- **[Story] label**: Maps task to specific user story for traceability
- **Each user story**: Should be independently completable and testable
- **Single file constraint**: All tasks modify the same file (src/TemplateCatalog.tsx)
- **No tests directory**: Manual testing only per specification
- **Framer Code workflow**: Save file → Framer auto-refreshes preview → Test manually
- **File size limit**: Must stay under 500 lines (current estimate: 250-300 lines)
- **Commit strategy**: Commit after each phase completion for rollback safety
- **Stop at any checkpoint**: Validate story independently before proceeding

---

## Sample Data for Testing

Use this sample data in the TEMPLATES object for comprehensive testing:

```javascript
const TEMPLATES = {
  consulfarma: [
    "Welcome Package 2024",
    "Product Catalog Q1",
    "Monthly Newsletter Template",
    "Special Offer Email",
    "Customer Thank You",
    "Appointment Confirmation",
    "Follow-up Sequence Day 1",
    "Follow-up Sequence Day 3",
    "Follow-up Sequence Day 7",
    "Re-engagement Campaign"
  ],
  icosmetologia: [
    "Initial Consultation Form",
    "Treatment Plan Overview",
    "Post-Procedure Care Instructions",
    "Product Recommendation Email",
    "Seasonal Promotion Template",
    "Birthday Special Offer",
    "Referral Program Email",
    "Testimonial Request"
  ],
  hinutrition: [
    "Nutrition Assessment Form",
    "Personalized Meal Plan Template",
    "Supplement Protocol Email",
    "Progress Check-in Template",
    "Recipe Collection Email",
    "Wellness Tips Newsletter",
    "Goal Setting Worksheet",
    "Success Story Template"
  ]
};
```

This provides:
- Varied template counts (8-10 per company)
- Realistic sales template names
- Sufficient data to test multi-column responsive grid
- Edge case: different lengths of template names

---

# PART 2: Report Admin Dashboard Implementation

**Feature Extension**: Report Admin Dashboard (`/reportadminx`)
**Date Added**: 2026-01-13
**Plan Reference**: [plan.md](./plan.md) - Modification Log 2026-01-13
**Data Model**: [data-model-reportadmin.md](./data-model-reportadmin.md)
**API Contracts**: [contracts/reportadmin-api.md](./contracts/reportadmin-api.md)

## Overview

This section contains tasks for implementing the Report Admin Dashboard feature as an extension to the existing Template Catalog. The dashboard provides marketing teams with the ability to view, filter, and manage HTML-based analytics reports.

**Implementation Target**: `index.html` (standalone HTML application)
**New Directory**: `reports/` (for storing report files and metadata)
**Implementation Approach**: Add routing layer and dashboard view to existing index.html

**Total Tasks**: 42 tasks across 6 phases

---

## Phase 7: Dashboard Setup & Prerequisites (3 tasks)

**Goal**: Prepare project structure for Report Dashboard feature

**Independent Test**: Verify existing template catalog in index.html still works, verify reports directory exists

### Tasks

- [ ] T034 Verify existing template catalog functionality in index.html remains unaffected
- [ ] T035 Create /reports/ directory in project root
- [ ] T036 [P] Update .gitignore to include appropriate patterns for reports directory (*.log, .env*, but NOT reports/*.html or reports/index.json)

**Validation**:
- Template catalog loads and functions correctly
- /reports/ directory exists
- .gitignore configured properly

---

## Phase 8: Routing Layer Implementation (7 tasks)

**Goal**: Implement hash-based routing to enable navigation between template catalog and report dashboard

**Independent Test**: Navigate to `index.html#/reportadminx` and back to `index.html`, verify browser back/forward buttons work correctly

### Tasks

- [ ] T037 [US-ROUTING] Extract existing template catalog HTML/JS into renderTemplateCatalog() function in index.html
- [ ] T038 [US-ROUTING] Define ROUTES constant object with '/' and '/reportadminx' paths in index.html
- [ ] T039 [US-ROUTING] Implement getCurrentRoute() function to parse window.location.hash in index.html
- [ ] T040 [US-ROUTING] Implement navigateTo(route) function to update window.location.hash in index.html
- [ ] T041 [US-ROUTING] Implement renderRoute(route) function with view switching logic in index.html
- [ ] T042 [US-ROUTING] Implement initRouter() function with hashchange event listener in index.html
- [ ] T043 [US-ROUTING] Update DOMContentLoaded handler to call initRouter() and initial route render in index.html

**Validation**:
- Navigating to `/` or empty hash renders template catalog
- Navigating to `#/reportadminx` renders dashboard placeholder
- Browser back/forward buttons work correctly
- Refreshing page maintains current route
- Direct URL navigation works (e.g., `index.html#/reportadminx`)

---

## Phase 9: Report Data Layer (7 tasks)

**Goal**: Create report storage structure and implement data fetching/validation logic

**Independent Test**: Navigate to `#/reportadminx`, verify dashboard attempts to load reports/index.json, handles missing file gracefully with error message

### Tasks

- [ ] T044 [US-DATA] Create reports/index.json with Report schema and one example report metadata entry
- [ ] T045 [US-DATA] Create reports/leads-2026-01-12.html sample report file (use user-provided example HTML)
- [ ] T046 [US-DATA] Define dashboardState object for state management (allReports, filteredReports, selectedReport, currentFilter, loading, error) in index.html
- [ ] T047 [US-DATA] Implement fetchReports() async function with fetch() API and error handling in index.html
- [ ] T048 [US-DATA] Implement validateReport(report) function to check required fields (id, title, period, dateCreated, fileName) in index.html
- [ ] T049 [US-DATA] Implement updateDashboardState(updates) function to modify state and trigger re-render in index.html
- [ ] T050 [US-DATA] Implement error state rendering function renderError(error) in index.html

**Validation**:
- reports/index.json exists with valid schema
- Sample report HTML file exists and contains provided report HTML
- fetchReports() successfully loads and parses reports/index.json
- Validation catches malformed report entries
- Error handling displays user-friendly messages for 404, JSON parse errors
- dashboardState updates trigger UI re-renders

---

## Phase 10: Report Dashboard UI - List & Viewer (10 tasks)

**Goal**: Build report list sidebar and iframe-based report viewer

**Independent Test**: Navigate to `#/reportadminx`, see list of reports in left sidebar, click report card, see report load in right-pane iframe

### Tasks

- [ ] T051 [US-UI] Implement renderReportDashboard() main function with header and dashboard-layout structure in index.html
- [ ] T052 [US-UI] Implement renderDashboardHeader() function with title and "Voltar ao Catálogo" navigation link in index.html
- [ ] T053 [US-UI] Implement renderReportList() function to render sidebar with report cards in index.html
- [ ] T054 [US-UI] Implement renderReportItem(report, isSelected) function with metadata display (title, period, age, tags) in index.html
- [ ] T055 [US-UI] Implement renderReportViewer() function with iframe element and loading state in index.html
- [ ] T056 [US-UI] Implement renderReportEmptyState() function for zero reports scenario in index.html
- [ ] T057 [US-UI] Implement selectReport(reportId) event handler to update selectedReport state in index.html
- [ ] T058 [US-UI] Implement handleReportLoad() iframe onload event handler to clear loading state in index.html
- [ ] T059 [US-UI] Implement handleReportError() iframe onerror event handler to display error in viewer in index.html
- [ ] T060 [US-UI] Add CSS for dashboard layout (.dashboard-header, .dashboard-layout grid, .report-sidebar, .report-list, .report-item, .report-viewer, .report-empty-state) in index.html

**Validation**:
- Report list displays all reports from index.json
- Report cards show title, period, age, tags
- Clicking report card highlights it (left border color)
- Selected report loads in iframe viewer (right pane)
- Report HTML displays correctly without style conflicts (iframe isolation)
- Empty state shows when reports array is empty
- Loading spinner shows while iframe loads
- Error message displays if report HTML file not found

---

## Phase 11: Period Filtering (9 tasks)

**Goal**: Implement time-based filtering to show reports by period (last 7/30/90 days, all time, custom)

**Independent Test**: Select different filters from period dropdown, verify report list updates to show only matching reports, verify report count updates

### Tasks

- [ ] T061 [US-FILTER] Implement renderPeriodFilter(currentFilter) function with select dropdown UI in index.html
- [ ] T062 [US-FILTER] Implement applyPeriodFilter(reports, filter) function with filtering logic for each period type in index.html
- [ ] T063 [US-FILTER] Implement handleFilterChange(filterType) event handler with custom range prompt logic in index.html
- [ ] T064 [P] [US-FILTER] Implement daysBetween(date1, date2) utility function to calculate days between dates in index.html
- [ ] T065 [P] [US-FILTER] Implement getReportAge(report) utility function to return human-readable age string in index.html
- [ ] T066 [P] [US-FILTER] Implement formatReportPeriod(report) utility function to format period display string in index.html
- [ ] T067 [P] [US-FILTER] Implement formatDate(date) utility function for DD.MM.YYYY format in index.html
- [ ] T068 [US-FILTER] Add CSS for period filter (.period-filter, .filter-label, .filter-select) in index.html
- [ ] T069 [US-FILTER] Integrate period filter into renderReportDashboard() at top of report sidebar in index.html

**Validation**:
- Filter dropdown appears at top of report list
- "Todos os períodos" filter shows all reports
- "Últimos 7 dias" shows reports created in last 7 days
- "Últimos 30 dias" shows reports created in last 30 days
- "Último trimestre" shows reports created in last 90 days
- "Período personalizado" prompts for start/end dates and filters accordingly
- Report count indicator updates after filter selection
- Selected report clears if not in filtered results

---

## Phase 12: Polish, Accessibility & Documentation (6 tasks)

**Goal**: Add keyboard navigation, ARIA labels, accessibility features, and update project documentation

**Independent Test**: Navigate dashboard using Tab/Enter/Arrow keys, verify screen reader announces elements, test all error scenarios

### Tasks

- [ ] T070 [US-POLISH] Implement keyboard navigation event listeners (Tab, Enter, Arrow Up/Down) for report list in index.html
- [ ] T071 [US-POLISH] Add ARIA labels and roles (role="list", role="listitem", aria-pressed, aria-label) to interactive elements in index.html
- [ ] T072 [US-POLISH] Add CSS focus indicators (:focus, :focus-visible) for all interactive elements in index.html
- [ ] T073 [US-POLISH] Implement escapeHtml(str) utility function for XSS prevention in user-generated content in index.html
- [ ] T074 [US-POLISH] Add announceToScreenReader(message) function with live region for status updates in index.html
- [ ] T075 Update CLAUDE.md with Report Dashboard implementation status, file structure, and usage instructions

**Validation**:
- Tab key navigates: filter → report list → iframe
- Enter key selects focused report
- Arrow Up/Down navigate report list items
- Screen reader announces: "Report list", "X reports", report titles, selection status
- Focus indicators visible on all focusable elements (filter, report items)
- No XSS vulnerabilities from report metadata (title, description)
- CLAUDE.md updated with accurate feature status

---

## Task Dependencies & Execution Order

### Phase Dependencies (Report Dashboard)

```
Phase 7 (Dashboard Setup)
    ↓
Phase 8 (Routing) - MUST complete before any dashboard UI
    ↓
Phase 9 (Data Layer) - MUST complete before UI rendering
    ↓
Phase 10 (Dashboard UI) - MUST complete before filtering
    ↓
Phase 11 (Period Filtering) - Can overlap with polish
    ↓
Phase 12 (Polish & Accessibility)
```

### Critical Path

1. **T037-T043** (Routing): Blocking - nothing works without routing
2. **T044-T050** (Data Layer): Blocking - UI needs data
3. **T051-T060** (Dashboard UI): Blocking - filtering needs UI
4. **T061-T069** (Filtering): Can partially parallelize with polish
5. **T070-T075** (Polish): Can mostly parallelize

### Parallelization Opportunities

**Phase 7** (Setup):
- T036 can run in parallel with T034, T035

**Phase 8** (Routing):
- All tasks must be sequential (each builds on previous)

**Phase 9** (Data Layer):
- T044, T045 (file creation) can run in parallel
- T046-T050 (implementation) must be sequential

**Phase 10** (Dashboard UI):
- T051-T059 (JS functions) mostly sequential
- T060 (CSS) can run in parallel with later JS tasks (T058-T059)

**Phase 11** (Filtering):
- T064, T065, T066, T067 (utility functions) can all run in parallel [P]
- T061-T063, T068-T069 must be mostly sequential

**Phase 12** (Polish):
- T070, T071, T072, T073, T074 can run in parallel by different concerns
- T075 (documentation) should be last

---

## Testing Strategy - Report Dashboard

### Manual Testing Checklist

**Routing** (after Phase 8):
- [ ] Navigate from catalog to dashboard via added link
- [ ] Navigate from dashboard to catalog via "Voltar" link
- [ ] Direct URL: `index.html#/reportadminx` loads dashboard
- [ ] Direct URL: `index.html` or `index.html#/` loads catalog
- [ ] Browser back button navigates correctly
- [ ] Browser forward button navigates correctly
- [ ] Refresh page maintains current route/view

**Data Loading** (after Phase 9):
- [ ] Dashboard loads report list from reports/index.json
- [ ] Report count indicator shows correct count
- [ ] Error message displays when index.json not found (delete file to test)
- [ ] Error message displays when index.json has invalid JSON
- [ ] Loading state shows while fetching

**Report Selection** (after Phase 10):
- [ ] Report list displays all reports with correct metadata
- [ ] Clicking report card highlights it (left border)
- [ ] Selected report HTML loads in iframe viewer
- [ ] Report content displays without style conflicts
- [ ] Loading spinner shows while report loads
- [ ] Error displays in viewer if report HTML file missing
- [ ] Empty state shows when reports array is empty

**Period Filtering** (after Phase 11):
- [ ] Filter dropdown appears and is functional
- [ ] "Todos os períodos" shows all reports
- [ ] "Últimos 7 dias" filters correctly
- [ ] "Últimos 30 dias" filters correctly
- [ ] "Último trimestre" filters correctly
- [ ] "Período personalizado" prompts for dates
- [ ] Report count updates after filter change
- [ ] Selected report clears if not in filtered results

**Accessibility** (after Phase 12):
- [ ] Tab key navigates through all interactive elements
- [ ] Enter key selects focused report
- [ ] Arrow keys navigate report list
- [ ] Screen reader announces all elements correctly
- [ ] Focus indicators visible and clear
- [ ] No console errors or warnings

**Responsive Design** (continuous):
- [ ] Mobile (320px): Report list stacks above viewer
- [ ] Tablet (768px): Two-column layout visible
- [ ] Desktop (1920px+): Optimal spacing, no overflow

**Edge Cases** (continuous):
- [ ] 0 reports: Empty state renders with helpful message
- [ ] 1 report: UI works correctly (no layout issues)
- [ ] 100+ reports: List scrolls smoothly, no performance issues
- [ ] Invalid JSON: Clear error message, no crash
- [ ] Missing report file: Error in viewer, list still visible
- [ ] Large report (>1MB): Loads without browser freeze

---

## Implementation Notes - Report Dashboard

### Code Organization in index.html

Organize code in clear sections with comments:

```html
<script>
  // ========== SECTION 1: ROUTING ==========
  const ROUTES = { HOME: '/', REPORTS: '/reportadminx' };
  function getCurrentRoute() { /* ... */ }
  function navigateTo(route) { /* ... */ }
  function renderRoute(route) { /* ... */ }
  function initRouter() { /* ... */ }

  // ========== SECTION 2: DATA LAYER ==========
  const dashboardState = { /* ... */ };
  async function fetchReports() { /* ... */ }
  function validateReport(report) { /* ... */ }
  function updateDashboardState(updates) { /* ... */ }

  // ========== SECTION 3: UI RENDERING ==========
  function renderReportDashboard() { /* ... */ }
  function renderDashboardHeader() { /* ... */ }
  function renderReportList() { /* ... */ }
  function renderReportItem(report, isSelected) { /* ... */ }
  function renderReportViewer() { /* ... */ }
  function renderReportEmptyState() { /* ... */ }
  function renderError(error) { /* ... */ }

  // ========== SECTION 4: EVENT HANDLERS ==========
  function selectReport(reportId) { /* ... */ }
  function handleReportLoad() { /* ... */ }
  function handleReportError() { /* ... */ }
  function handleFilterChange(filterType) { /* ... */ }

  // ========== SECTION 5: FILTERING ==========
  function renderPeriodFilter(currentFilter) { /* ... */ }
  function applyPeriodFilter(reports, filter) { /* ... */ }

  // ========== SECTION 6: UTILITY FUNCTIONS ==========
  function daysBetween(date1, date2) { /* ... */ }
  function getReportAge(report) { /* ... */ }
  function formatReportPeriod(report) { /* ... */ }
  function formatDate(date) { /* ... */ }
  function escapeHtml(str) { /* ... */ }
  function announceToScreenReader(message) { /* ... */ }

  // ========== SECTION 7: TEMPLATE CATALOG (existing) ==========
  function renderTemplateCatalog() { /* existing code wrapped */ }

  // ========== SECTION 8: INITIALIZATION ==========
  document.addEventListener('DOMContentLoaded', () => {
    initRouter();
  });
</script>
```

### Key Technical Decisions

**Routing**:
- Hash-based routing (`window.location.hash`) - no server config needed
- Works on any static host (Netlify, Vercel, GitHub Pages)
- Browser back/forward button support via `hashchange` event

**Data Storage**:
- Static JSON file (`reports/index.json`) for metadata
- Individual HTML files for report content
- Git-based workflow (no database, no backend API)

**Report Rendering**:
- iframe with `sandbox="allow-same-origin"` for security
- Style isolation (report styles don't leak to dashboard)
- Lazy loading (report HTML loads only when selected)

**State Management**:
- Simple object (`dashboardState`) for all UI state
- Manual re-rendering on state updates
- No React/Vue needed (vanilla JS sufficient for this scope)

**Performance**:
- Reports index fetched once on dashboard load
- Individual reports loaded on demand (not all at once)
- No pagination needed for <500 reports (future enhancement if needed)

### Error Handling

| Scenario | User Experience | Implementation |
|----------|----------------|----------------|
| reports/index.json not found | "Nenhum relatório disponível. Adicione relatórios via Git." | renderReportEmptyState() |
| Invalid JSON | "Erro ao carregar índice de relatórios. Verifique o formato JSON." | renderError() with link to docs |
| Report HTML not found | "Relatório não encontrado: {fileName}" | Error in viewer pane, list stays visible |
| Network error | "Sem conexão. Verifique sua internet." | renderError() with retry button |

---

## Sample Data for Testing - Report Dashboard

### reports/index.json Example

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
    },
    {
      "id": "rpt-002",
      "title": "Análise de Conversão - Janeiro 2026",
      "period": {
        "start": "2026-01-01",
        "end": "2026-01-31"
      },
      "dateCreated": "2026-02-01",
      "fileName": "conversao-janeiro-2026.html",
      "tags": ["conversão", "vendas"],
      "description": "Análise de taxa de conversão por canal"
    }
  ],
  "meta": {
    "lastUpdated": "2026-02-01T14:30:00Z",
    "version": "1.0.0"
  }
}
```

This provides:
- Valid schema with 2 sample reports
- Different date ranges for testing filters
- Tags for visual testing
- Metadata for validation testing

---

## MVP Scope Recommendation - Report Dashboard

For initial delivery of Report Dashboard, consider implementing through Phase 10:

**MVP Includes**:
- Phase 7: Dashboard Setup ✓
- Phase 8: Routing Layer ✓
- Phase 9: Report Data Layer ✓
- Phase 10: Dashboard UI ✓

**MVP Provides**:
- Navigation between catalog and dashboard
- View list of all reports
- Select and view individual reports
- Basic functionality without filtering

**Post-MVP** (Phases 11-12):
- Phase 11: Period Filtering
- Phase 12: Polish & Accessibility

This delivers core value quickly while deferring nice-to-have features.

---

## Task Summary - Report Dashboard

**Total**: 42 new tasks (T034-T075)
- Phase 7 (Setup): 3 tasks
- Phase 8 (Routing): 7 tasks
- Phase 9 (Data Layer): 7 tasks
- Phase 10 (Dashboard UI): 10 tasks
- Phase 11 (Period Filtering): 9 tasks
- Phase 12 (Polish & Accessibility): 6 tasks

**Parallel Opportunities**: ~12 tasks can run in parallel with others in their phase
**Estimated LOC**: 430-560 lines in index.html + 50-100 lines in reports/index.json
**File Modified**: index.html (existing file, extended with dashboard code)
**New Files Created**: reports/index.json, reports/leads-2026-01-12.html

---

## Phase 13: Carteiras Grid Layout Fix (2026-02-05) 🆕

**Goal**: Fix uneven distribution of carteiras (sales team) items in footer grid

**Context**: Current CSS uses `auto-fill` which creates empty grid tracks that don't collapse, causing uneven distribution when there are fewer items than maximum columns. This is especially visible on Hi Nutrition (5 items) and Seminários Consulfarma (1 item) tabs.

**Solution**: Change `auto-fill` to `auto-fit` in `.carteiras-grid` CSS class. This collapses empty tracks, allowing items to expand uniformly to fill available width.

**Scope**: Single-line CSS modification with comprehensive visual testing.

**Related User Stories**: Enhances US2 (company tab switching) and US3 (responsive design) by improving visual quality of carteiras footer across all device sizes.

### Phase 13.1: CSS Modification

- [X] T076 Locate `.carteiras-grid` CSS class in index.html (approximately line 299-306)
- [X] T077 Change `grid-template-columns` from `repeat(auto-fill, minmax(min(180px, 100%), 1fr))` to `repeat(auto-fit, minmax(min(180px, 100%), 1fr))` in index.html
- [X] T078 [P] Verify mobile breakpoint CSS remains unchanged `@media (max-width: 768px) { .carteiras-grid { grid-template-columns: 1fr; } }` in index.html
- [X] T079 Save index.html and open in browser for initial visual check

**Checkpoint**: CSS change applied, ready for visual validation

### Phase 13.2: Desktop Testing (1920px Viewport)

- [ ] T080 Test **Consulfarma** tab (8 items) - verify uniform distribution across 3-4 columns
- [ ] T081 Test **ICosmetologia** tab (9 items) - verify multi-row wrapping with uniform last row
- [ ] T082 Test **Hi Nutrition** tab (5 items) - verify items expand to fill width uniformly with no gaps ✅ **PRIMARY FIX**
- [ ] T083 Test **Seminários Consulfarma** tab (1 item) - verify single item doesn't stretch excessively beyond reasonable width

**Success Indicator**: Hi Nutrition tab should show 5 items distributed evenly with no empty gaps at end of rows.

### Phase 13.3: Responsive Testing

- [ ] T084 Test all 4 company tabs at 1024px viewport (tablet) - verify 2-3 column grid wrapping
- [ ] T085 Test all 4 company tabs at 768px viewport (mobile breakpoint) - verify single column layout active
- [ ] T086 Test all 4 company tabs at 320px viewport (small mobile) - verify single column with no horizontal overflow
- [ ] T087 [P] Test viewport resize from 1920px → 320px - verify smooth responsive transitions without visual jumps

**Checkpoint**: Responsive behavior validated across all breakpoints

### Phase 13.4: Edge Case Validation

- [ ] T088 Switch rapidly between all 4 company tabs - verify carteiras footer updates correctly without layout breaks
- [ ] T089 Test Seminários Consulfarma (1 item) - if item stretches beyond 300px width, add optional `max-width: 300px;` to `.carteira-item` CSS in index.html
- [ ] T090 [P] Test long name rendering (e.g., "Aline da Silva Longo") across all tabs - verify text wraps gracefully without breaking layout
- [ ] T091 [P] Verify baseline alignment between `.carteira-name` and `.carteira-number` maintained across all tabs

**Decision Point**: T089 - Only add `max-width` if single item visually stretches too wide (subjective judgment).

### Phase 13.5: Cross-Browser Testing

- [ ] T092 [P] Test in Chrome/Edge (Chromium) - verify grid layout works correctly across all 4 company tabs
- [ ] T093 [P] Test in Firefox - verify grid layout works correctly across all 4 company tabs
- [ ] T094 [P] Test in Safari (if available) - verify grid layout works correctly across all 4 company tabs
- [ ] T095 [P] Test in mobile browser (Chrome Mobile or Safari iOS) - verify mobile layout and carteiras footer rendering

**Note**: CSS Grid `auto-fit` has 98%+ browser support (Chrome 57+, Firefox 52+, Safari 10.1+, all from March 2017).

### Phase 13.6: Final Validation & Documentation

- [ ] T096 Verify no console errors or warnings in browser DevTools after CSS change
- [ ] T097 Verify 6px gap spacing maintained between all carteira items (horizontal and vertical)
- [ ] T098 [P] Take before/after screenshots for Hi Nutrition tab (demonstrates the fix most clearly)
- [X] T099 Update CLAUDE.md "Active Features & Technologies" section with: "Carteiras layout: Fixed grid distribution using auto-fit (2026-02-05)"
- [X] T100 Commit changes with message: `fix: change carteiras grid from auto-fill to auto-fit for uniform distribution`

**Checkpoint**: Implementation complete, validated, and documented

---

## Testing Checklist - Carteiras Layout Fix

### Visual Quality Validation

- [ ] **Consulfarma** (8 items): 3-4 items per row on desktop, uniform distribution
- [ ] **ICosmetologia** (9 items): Multi-row wrapping, no gaps on last row
- [ ] **Hi Nutrition** (5 items): 2-3 items per row, fills space uniformly ✅ **PRIMARY FIX INDICATOR**
- [ ] **Seminários Consulfarma** (1 item): Doesn't stretch excessively (stays within reasonable width)

### Responsive Validation

- [ ] 1920px (desktop): Multi-column grid, uniform distribution
- [ ] 1024px (tablet): 2-4 columns depending on company, items wrap naturally
- [ ] 768px (mobile breakpoint): Single column layout active
- [ ] 320px (small mobile): Single column, no horizontal overflow

### Functional Validation

- [ ] Tab switching: Carteiras footer updates correctly for each company
- [ ] Long names: Text wraps gracefully (e.g., "Aline da Silva Longo")
- [ ] Baseline alignment: Name and number visually aligned
- [ ] Gap spacing: Consistent 6px between all items

### Cross-Browser Validation

- [ ] Chrome/Edge (Chromium): Works correctly
- [ ] Firefox: Works correctly
- [ ] Safari (desktop): Works correctly
- [ ] Mobile browsers (iOS/Android): Works correctly

---

## Implementation Notes - Carteiras Layout Fix

### The Change (One Line)

**File**: `index.html` (approximately line 301)

**Before**:
```css
.carteiras-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(180px, 100%), 1fr));
  gap: 6px;
  /* ... */
}
```

**After**:
```css
.carteiras-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(180px, 100%), 1fr));
  gap: 6px;
  /* ... */
}
```

**Why it works**:
- `auto-fill`: Creates grid tracks but doesn't collapse empty tracks → leaves gaps
- `auto-fit`: Creates grid tracks AND collapses empty tracks → items expand uniformly ✅

### Optional Enhancement (T089)

If single item (Seminários Consulfarma) stretches too wide on ultra-wide monitors:

```css
.carteira-item {
  display: flex;
  align-items: baseline;
  gap: 6px;
  max-width: 300px; /* Optional: prevent excessive expansion */
}
```

**When to add**: Only if visual testing reveals excessive stretching. Most likely NOT needed.

### Success Criteria

**Functional**:
- ✅ Items distribute uniformly regardless of company tab
- ✅ No empty gaps when container has excess space
- ✅ Name length variations don't break layout
- ✅ Mobile breakpoint maintains single-column layout

**Visual**:
- ✅ Consistent 6px gap between items
- ✅ Baseline alignment preserved between name and number
- ✅ No horizontal overflow on any viewport size
- ✅ Text wraps gracefully for long names

**Technical**:
- ✅ Single CSS property change (minimal risk)
- ✅ Zero JavaScript changes
- ✅ Zero HTML changes
- ✅ Backward compatible with existing mobile breakpoint

### Rollback Plan

If issues arise during implementation:

1. **Immediate rollback**: Revert T077 change
   ```css
   - grid-template-columns: repeat(auto-fit, minmax(min(180px, 100%), 1fr));
   + grid-template-columns: repeat(auto-fill, minmax(min(180px, 100%), 1fr));
   ```

2. **Verify rollback**: Test that original behavior is restored

3. **Investigate**: Review browser console, compare screenshots, test specific viewports

4. **Alternative**: If `auto-fit` doesn't work, consider Flexbox approach (see research-carteiras-layout.md Option 3)

---

## Task Summary - Carteiras Layout Fix

**Total**: 25 new tasks (T076-T100)
- Phase 13.1 (CSS Modification): 4 tasks
- Phase 13.2 (Desktop Testing): 4 tasks
- Phase 13.3 (Responsive Testing): 4 tasks
- Phase 13.4 (Edge Cases): 4 tasks
- Phase 13.5 (Cross-Browser): 4 tasks
- Phase 13.6 (Validation & Commit): 5 tasks

**Parallel Opportunities**: 9 tasks can run in parallel (marked with [P])
**File Modified**: index.html (single-line CSS change)
**New Files**: None (CSS-only change)
**Estimated Time**: ~60 minutes (mostly testing)

---

## References - Carteiras Layout Fix

- **Research**: [research-carteiras-layout.md](./research-carteiras-layout.md) - Technical analysis and solution evaluation
- **Quickstart**: [quickstart-carteiras-layout.md](./quickstart-carteiras-layout.md) - Detailed testing workflow
- **Contract**: [contracts/carteiras-layout-api.md](./contracts/carteiras-layout-api.md) - CSS API specification
- **Plan**: [plan.md](./plan.md) - See "2026-02-05: Fix Carteiras Grid Layout Distribution" section

---

**Tasks Generated**: 2026-01-13 (original), 2026-02-05 (carteiras layout fix added), 2026-03-04 (admin panel added)
**Ready for Implementation**: Run `/speckit.implement` to execute tasks sequentially

---

## Phase 14: Admin Panel — Routing (Prerequisite)

**Purpose**: Registrar a nova rota `/admindev` no sistema de roteamento existente

**⚠️ NOTA**: Os marcadores `// ADMIN_DATA_START` e `// ADMIN_DATA_END` já foram adicionados manualmente em `index.html` antes de `const TEMPLATES` e depois de `const CARTEIRAS`. Não adicionar novamente.

- [X] T101 Verificar que os marcadores `// ADMIN_DATA_START` e `// ADMIN_DATA_END` estão presentes em `index.html` (um antes de `const TEMPLATES`, outro após o fechamento `};` de `CARTEIRAS`)
- [X] T102 Adicionar `ADMIN: '/admindev'` ao objeto `ROUTES` em `index.html` (linha ~510, após `REPORTS: '/reportadminx'`)
- [X] T103 Adicionar branch `else if (route === ROUTES.ADMIN) { renderAdminPanel(); }` na função `renderRoute()` em `index.html`, antes do bloco `else` de rota desconhecida

**Checkpoint**: Navegar para `/#/admindev` deve resultar em chamada a `renderAdminPanel()` (ainda inexistente — erro no console é esperado)

---

## Phase 15: Admin Panel — CSS

**Purpose**: Adicionar estilos do painel admin sem colidir com estilos existentes

- [X] T104 Adicionar bloco CSS do admin panel antes de `</style>` em `index.html`, incluindo: `.admin-header`, `.admin-header-title`, `.admin-btn`, `.admin-btn-primary`, `.admin-btn-danger`, `.admin-btn-icon`
- [X] T105 Adicionar CSS para layout de lista de templates: `.admin-section-header`, `.admin-section-title`, `.admin-row` (grid: `1fr 2fr 100px auto auto`), `.admin-row:hover`, `.admin-row-name`, `.admin-row-preview`, `.admin-row-date`
- [X] T106 Adicionar CSS para modal de edição: `.admin-modal-backdrop`, `.admin-modal`, `.admin-modal-title`, `.admin-modal-errors`, `.admin-modal-actions`
- [X] T107 Adicionar CSS para campos de formulário: `.admin-field`, `.admin-label`, `.admin-input`, `.admin-textarea`, `.admin-select` com focus states
- [X] T108 Adicionar CSS para tela de login: `.admin-login-container`, `.admin-login-title`, `.admin-login-error`
- [X] T109 Adicionar responsive breakpoint `@media (max-width: 640px)` que oculta `.admin-row-preview` e `.admin-row-date` e simplifica o grid para `1fr auto auto`

**Checkpoint**: Classes CSS definidas (sem elementos visíveis ainda)

---

## Phase 16: Admin Panel — Configuração e Auth

**Purpose**: Credenciais hardcoded e wrapper de sessionStorage para controle de sessão

- [X] T110 Adicionar `SECTION 10: ADMIN PANEL - CONFIGURATION` antes de `SECTION 7: INITIALIZATION` em `index.html`, com constante `ADMIN_CONFIG` contendo: `USERNAME`, `PASSWORD`, `GITHUB_TOKEN` (placeholder `'CONFIGURE_ME'`), `GITHUB_OWNER` (placeholder `'CONFIGURE_ME'`), `GITHUB_REPO` (placeholder `'CONFIGURE_ME'`), `GITHUB_BRANCH: 'main'`, `GITHUB_FILE_PATH: 'index.html'`, `SESSION_KEY: 'admindev_auth'`
- [X] T111 Adicionar `SECTION 11: ADMIN PANEL - AUTH` com objeto `adminAuth` contendo métodos: `login(username, password)` (valida e grava `'1'` no sessionStorage), `logout()` (remove chave e chama `navigateTo(ROUTES.HOME)`), `isLoggedIn()` (retorna true se sessionStorage tem `'1'`)
- [X] T112 Adicionar função `AdminLoginForm()` retornando HTML string com: container `.admin-login-container`, título "admin panel", form `id="admin-login-form"`, input username `id="admin-username"`, input password `id="admin-password"`, botão submit, div de erro `id="admin-login-error"` (display:none por padrão)
- [X] T113 Adicionar função `handleAdminLogin(event)` que: previne submit padrão, lê username/password, chama `adminAuth.login()`, se sucesso chama `renderAdminPanel()`, se falha exibe mensagem no `#admin-login-error`

**Checkpoint**: Navegar para `/#/admindev` mostra formulário de login; credenciais incorretas exibem erro; credenciais corretas passam para o painel (ainda a ser construído)

---

## Phase 17: Admin Panel — Estado e CRUD

**Purpose**: Working copy dos dados em memória com operações de CRUD

- [X] T114 Adicionar início de `SECTION 12: ADMIN PANEL - STATE & CRUD` com objeto `adminState` contendo: `templates: null`, `companies: null`, `carteiras: null`, `activeTab: 'consulfarma'`, `modal: null`, `saving: false`, `saveError: null`
- [X] T115 Adicionar função `adminInitWorkingCopy()` que deep-clona `TEMPLATES`, `COMPANIES`, `CARTEIRAS` para `adminState` usando `JSON.parse(JSON.stringify(...))`
- [X] T116 Adicionar funções CRUD: `adminAddTemplate(company, template)` (unshift no array), `adminUpdateTemplate(company, index, template)` (substituição por índice), `adminDeleteTemplate(company, index)` (splice), `adminFindTemplateIndex(company, name)` (findIndex por name)

**Checkpoint**: CRUD functions definidas (não visíveis — só testáveis via console do browser)

---

## Phase 18: Admin Panel — Componentes de UI

**Purpose**: Construir o painel de administração visual completo

- [X] T117 Adicionar função `AdminPanelLayout()` retornando HTML string com: header bar (título "admin panel", botão `id="admin-save-btn"` com texto "Salvar", botão link "← Catalog", botão `id="admin-logout-btn"` com texto "Sair"), tabs de empresa (um botão por empresa em `adminState.companies` com `data-admin-tab`), seção de lista de templates para `adminState.activeTab`
- [X] T118 Adicionar função `AdminTemplateRow(template, company)` retornando HTML string com: `div.admin-row`, nome do template em `.admin-row-name`, preview da mensagem truncada a 60 chars em `.admin-row-preview`, data em `.admin-row-date`, botão edit com `onclick="adminOpenEditModal('${company}', '${template.name}')"`, botão delete com `onclick="adminConfirmDelete('${company}', '${template.name}')"`
- [X] T119 Adicionar função `AdminModal()` retornando HTML string com: backdrop `id="admin-modal-backdrop"`, modal container, título dinâmico ("Novo Template" ou "Editar Template"), select de empresa `id="modal-company"` (desabilitado no modo edit), input nome `id="modal-name"`, textarea mensagem `id="modal-message"` (6 rows), input data `id="modal-date"` (type="date"), div erros `id="modal-errors"`, botões Cancelar e Salvar
- [X] T120 Adicionar funções de controle do modal: `adminOpenEditModal(company, templateName)` (seta `adminState.modal = { mode: 'edit', company, templateName }` e chama `renderAdminPanel()`), `adminOpenAddModal(company)` (mode: 'add'), `adminCloseModal()` (seta `null` e re-renderiza)
- [X] T121 Adicionar `handleModalSubmit(event)` que: previne submit, lê campos do formulário, valida (nome não vazio, padrão `/^[a-z0-9_]+$/`, mensagem não vazia, data válida via `validateDateFormat()` se preenchida, nome único no modo add), se válido chama `adminAddTemplate` ou `adminUpdateTemplate`, fecha modal
- [X] T122 Adicionar `adminConfirmDelete(company, templateName)` que exibe `window.confirm()` e se confirmado chama `adminDeleteTemplate` + `renderAdminPanel()`
- [X] T123 Adicionar `attachAdminEventListeners()` que vincula: click no `#admin-save-btn` → `commitToGitHub`, click no `#admin-logout-btn` → `adminAuth.logout()`, click em cada `[data-admin-tab]` → atualiza `adminState.activeTab` e re-renderiza, click no `#admin-add-btn` → `adminOpenAddModal(adminState.activeTab)`
- [X] T124 Adicionar `attachModalEventListeners()` que vincula: submit do `#modal-form` → `handleModalSubmit`, click no `#modal-cancel-btn` → `adminCloseModal()`, click no `#admin-modal-backdrop` (só no próprio backdrop, não filhos) → `adminCloseModal()`
- [X] T125 Adicionar função `renderAdminPanel()` (dispatcher principal) que: se `!adminAuth.isLoggedIn()` → renderiza `AdminLoginForm()` e vincula submit; caso contrário, se `adminState.templates === null` chama `adminInitWorkingCopy()`; renderiza `AdminPanelLayout()` e chama `attachAdminEventListeners()`; se `adminState.modal !== null`, appenda `AdminModal()` ao body e chama `attachModalEventListeners()`

**Checkpoint**: CRUD visual completo funcionando em memória — adicionar, editar, deletar templates refletem na lista. O botão "Salvar" existe mas ainda não persiste.

---

## Phase 19: Admin Panel — GitHub API

**Purpose**: Persistir mudanças via commit direto no GitHub (Netlify auto-redeploya)

- [X] T126 Adicionar início de `SECTION 13: ADMIN PANEL - GITHUB API` com função `buildDataBlock()` que: serializa `adminState.templates`, `adminState.companies`, `adminState.carteiras` via `JSON.stringify` com indent 2, aplica regex `/"([a-zA-Z_][a-zA-Z0-9_]*)":/g` para remover aspas das chaves, retorna string completa com marcadores `// ADMIN_DATA_START` e `// ADMIN_DATA_END` e os três `const` declarations
- [X] T127 Adicionar função auxiliar `indentLines(str, spaces)` que adiciona N espaços no início de cada linha (exceto a primeira) de uma string multiline — usada por `buildDataBlock()` para indentar corretamente o JSON serializado
- [X] T128 Adicionar função `commitToGitHub()` async com: set `adminState.saving = true` + re-render; fetch GET para `https://api.github.com/repos/${ADMIN_CONFIG.GITHUB_OWNER}/${ADMIN_CONFIG.GITHUB_REPO}/contents/${ADMIN_CONFIG.GITHUB_FILE_PATH}?ref=${ADMIN_CONFIG.GITHUB_BRANCH}` com header `Authorization: token ${ADMIN_CONFIG.GITHUB_TOKEN}`; decode base64 do conteúdo com `decodeURIComponent(escape(atob(response.content.replace(/\n/g,''))))`; verifica presença dos marcadores (lança erro se ausentes); replace via regex `/    \/\/ ADMIN_DATA_START\n[\s\S]*?    \/\/ ADMIN_DATA_END\n/` com `buildDataBlock()`; encode UTF-8-safe com `btoa(unescape(encodeURIComponent(newContent)))`; fetch PUT com body `{ message, content, sha, branch }`; set `adminState.saving = false`; exibe toast de sucesso ou erro

**Checkpoint**: Clicar "Salvar" faz commit no GitHub; verificar no repositório que o commit foi criado com os dados corretos entre os marcadores

---

## Phase 20: Configuração Final

**Purpose**: Substituir placeholders de configuração pelos valores reais

- [ ] T129 Substituir `'CONFIGURE_ME'` em `ADMIN_CONFIG.GITHUB_TOKEN` pelo GitHub Personal Access Token real (permissão: `Contents: write` em fine-grained, ou `repo` em classic token) em `index.html`
- [ ] T130 Substituir `'CONFIGURE_ME'` em `ADMIN_CONFIG.GITHUB_OWNER` pelo username ou org do GitHub em `index.html`
- [ ] T131 Substituir `'CONFIGURE_ME'` em `ADMIN_CONFIG.GITHUB_REPO` pelo nome do repositório em `index.html`
- [ ] T132 [P] Definir `ADMIN_CONFIG.PASSWORD` com a senha desejada (padrão atual: `'consulfarma2026'`) em `index.html`
- [ ] T133 [P] Definir `ADMIN_CONFIG.GITHUB_BRANCH` com o branch correto do Netlify (padrão: `'main'`) em `index.html`

**Checkpoint**: Admin panel totalmente funcional — login, CRUD de templates, salvar persiste via GitHub, Netlify redeploya automaticamente

---

## Phase 21: Admin Panel — Token Persistence Fix (2026-03-04) 🆕

**Goal**: Corrigir o erro "bad credentials" ao salvar templates pelo admin, e eliminar a necessidade de re-informar o token GitHub a cada sessão do browser.

**Context**: O token GitHub está armazenado em `sessionStorage`, que é limpo ao fechar a aba ou o browser. O usuário precisa redigitar o token a cada nova sessão. A tentativa anterior de hardcodar o token no código foi revogada pelo secret scanning do GitHub.

**Solution**: Mover o armazenamento do token de `sessionStorage` → `localStorage` (persiste entre sessões). A sessão de autenticação (username/password) permanece em `sessionStorage` por segurança.

**Research**: [research-admin-token-persistence.md](./research-admin-token-persistence.md)
**Contract**: [contracts/admin-token-api.md](./contracts/admin-token-api.md)
**Quickstart**: [quickstart-admin-token.md](./quickstart-admin-token.md)

**Scope**: 4 alterações cirúrgicas em `index.html` — nenhuma lógica nova, só troca de storage.

### Tasks

- [X] T134 Em `handleAdminLogin(event)` (line ~2408), alterar `sessionStorage.setItem(ADMIN_CONFIG.TOKEN_KEY, token)` para `localStorage.setItem(ADMIN_CONFIG.TOKEN_KEY, token)` em `index.html`
- [X] T135 Em `AdminLoginForm()` (line ~2368), adicionar `const storedToken = localStorage.getItem(ADMIN_CONFIG.TOKEN_KEY) || '';` e atribuir `value="${storedToken}"` ao input `#admin-github-token`; alterar o atributo `required` para ser condicional: presente apenas quando `storedToken` estiver vazio em `index.html`
- [X] T136 Em `adminAuth.logout()` (line ~2324), remover `sessionStorage.removeItem(ADMIN_CONFIG.TOKEN_KEY)` — o token deve permanecer em `localStorage` para a próxima sessão em `index.html`
- [X] T137 Em `commitToGitHub()` (line ~2682), alterar `sessionStorage.getItem(ADMIN_CONFIG.TOKEN_KEY)` para `localStorage.getItem(ADMIN_CONFIG.TOKEN_KEY)` em `index.html`

**Checkpoint**:
- Primeiro login: usuário informa token → salvo em `localStorage` → commit funciona sem "bad credentials"
- Login seguinte: campo token já preenchido automaticamente → usuário só informa username/password
- Logout e re-login: token permanece no campo, não precisa redigitar

### Manual Test Checklist

- [ ] Abrir admin em nova aba (simula sessão nova)
- [ ] Fazer login informando username, password e GitHub token
- [ ] Adicionar um template qualquer
- [ ] Clicar "Salvar" — verificar que o commit foi criado no GitHub sem erro "bad credentials"
- [ ] Fazer logout
- [ ] Fazer login novamente — verificar que o campo token já está preenchido
- [ ] Salvar novamente — verificar que funciona sem redigitar o token
- [ ] Fechar o browser completamente, reabrir e acessar o admin
- [ ] Verificar que o campo token ainda está preenchido (localStorage persiste)

---

## Task Summary - Token Persistence Fix

**Total**: 4 tasks (T134-T137)
**Parallel opportunities**: T134 e T137 podem rodar em paralelo (funções diferentes)
**File modified**: `index.html` (4 linhas alteradas, zero lógica nova)
**New files**: None
