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

**Tasks Generated**: 2026-01-13
**Ready for Implementation**: Run `/speckit.implement` to execute tasks sequentially
