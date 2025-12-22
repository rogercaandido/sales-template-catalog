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
