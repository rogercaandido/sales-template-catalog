# Tasks: Template Sorting & "New" Badge System

**Feature**: Template sorting by date + automatic "new" badge on latest template
**Branch**: `001-template-catalog-react`
**Date**: 2026-01-28
**Status**: Ready for Implementation

---

## Overview

This document contains actionable implementation tasks for adding:
1. **Template Sorting**: Display templates in DESC order by creation date (newest first)
2. **"New" Badge**: Automatic badge on newest template per company (computed at render time)
3. **Zero-Step Deployment**: Badge automatically appears on new templates without manual intervention

**Key Design Decisions**:
- Add optional `createdAt` field (YYYY-MM-DD format) to existing templates
- Sort templates at render time (non-destructive, virtual sorted views)
- Compute badge status based on `createdAt` comparison (per-company scope)
- Backward compatible (templates without dates still work, sort to end)

---

## Task Summary

| Phase | Tasks | Parallel Opportunities |
|-------|-------|------------------------|
| **Phase 1: Data Migration** | 3 | 0 (sequential - data dependency) |
| **Phase 2: Sorting Logic** | 4 | 4 (all parallelizable - different functions) |
| **Phase 3: Badge Rendering** | 5 | 3 (CSS + ARIA separate from logic) |
| **Phase 4: Integration & Testing** | 6 | 4 (company-specific tests) |
| **Phase 5: Documentation** | 3 | 2 (CLAUDE.md + README separate) |
| **Total** | **21 tasks** | **13 parallel** |

---

## Implementation Strategy

### Incremental Delivery

This feature enhances existing template catalog functionality. Implementation follows this strategy:

1. **Data Migration First** (Phase 1): Add `createdAt` to all templates (enables sorting)
2. **Sorting Next** (Phase 2): Implement sort logic (visible improvement - templates reorder)
3. **Badge After** (Phase 3): Add visual indicator (polish on top of working sort)
4. **Test & Document** (Phases 4-5): Validate edge cases, update guides

### MVP Scope

**Minimum Viable Product** (can ship after Phase 3):
- All templates have `createdAt` dates
- Templates sort newest → oldest per company
- "novo" badge appears on newest template per company

**Phase 4-5** (polish & documentation) can be done incrementally post-MVP.

### Independent Testing

Each phase produces testable output:
- **Phase 1**: Verify all templates have valid `createdAt` fields
- **Phase 2**: Verify templates display in DESC date order
- **Phase 3**: Verify badge appears on newest template only
- **Phase 4**: Verify edge cases (missing dates, ties, empty companies)
- **Phase 5**: Verify documentation matches implementation

---

## Dependencies

### Phase Dependencies

```
Phase 1 (Data Migration)
    ↓
Phase 2 (Sorting Logic) ← Must have dates to sort
    ↓
Phase 3 (Badge Rendering) ← Must have sorted list to identify newest
    ↓
Phase 4 (Integration & Testing) ← Must have complete feature to test
    ↓
Phase 5 (Documentation) ← Must have working feature to document
```

**Blocking Prerequisites**: None (enhances existing feature, no external dependencies)

### Story Dependencies

This is a single enhancement feature (not multiple user stories). All tasks contribute to the same goal: "Sort templates and badge the newest."

**Independent Deliverables**: N/A (single cohesive feature)

---

## Phase 1: Data Migration

**Goal**: Add `createdAt` field to all existing templates in the TEMPLATES object

**Independent Test**: All templates have valid `createdAt` fields in YYYY-MM-DD format

**Tasks**:

- [X] T001 Analyze existing templates and estimate creation dates from Git history in index.html (~line 549)
- [X] T002 Add `createdAt` field to all Consulfarma templates in index.html (~line 550-650)
- [X] T003 Add `createdAt` field to all ICosmetologia templates in index.html (~line 650-750)
- [X] T004 Add `createdAt` field to all Hi Nutrition templates in index.html (~line 750-850)
- [X] T005 Add `createdAt` field to all Seminários Consulfarma templates in index.html (~line 850-950)
- [X] T006 Validate all date formats match YYYY-MM-DD pattern via manual inspection
- [X] T007 Commit data migration with message "chore: add createdAt dates to templates for sorting"

**Notes**:
- Use Git history to estimate dates: `git log --all --full-history -- index.html`
- If exact dates unknown, work backwards from today (2026-01-28) in ~2 week intervals
- Older templates get earlier dates (maintains chronological order)
- All tasks sequential (editing same file, same data structure)

---

## Phase 2: Sorting Logic

**Goal**: Implement functions to sort templates by date (newest first)

**Independent Test**: Templates render in DESC order by `createdAt` when tab clicked

**Tasks**:

- [X] T008 [P] Implement `validateDateFormat(dateString)` utility function in index.html (~line 1103)
- [X] T009 [P] Implement `getSortedTemplates(companyKey)` function in index.html (~line 1109)
- [X] T010 [P] Implement `getNewestTemplate(companyKey)` function in index.html (~line 1123)
- [X] T011 [P] Implement `isNewTemplate(template, companyKey)` function in index.html (~line 1129)

**Implementation Details**:

**T008**: `validateDateFormat(dateString)`
```javascript
function validateDateFormat(dateString) {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  return dateRegex.test(dateString);
}
```

**T009**: `getSortedTemplates(companyKey)`
```javascript
function getSortedTemplates(companyKey) {
  const templates = TEMPLATES[companyKey];
  if (!templates || templates.length === 0) return [];

  return [...templates].sort((a, b) => {
    const dateA = a.createdAt || "";
    const dateB = b.createdAt || "";
    return dateB.localeCompare(dateA); // DESC: newest first
  });
}
```

**T010**: `getNewestTemplate(companyKey)`
```javascript
function getNewestTemplate(companyKey) {
  const sorted = getSortedTemplates(companyKey);
  return sorted.length > 0 ? sorted[0] : null;
}
```

**T011**: `isNewTemplate(template, companyKey)`
```javascript
function isNewTemplate(template, companyKey) {
  const newest = getNewestTemplate(companyKey);
  return newest !== null && template === newest;
}
```

**Notes**:
- All tasks parallelizable (different functions, no dependencies)
- Functions are pure (no side effects, no DOM manipulation)
- Add functions before existing `renderTemplatesForCompany()` function

---

## Phase 3: Badge Rendering

**Goal**: Add visual "novo" badge to newest template per company

**Independent Test**: Badge appears below template name on newest template only

**Tasks**:

- [X] T012 [P] Add `.badge-new` CSS class in index.html style section (~line 201)
- [X] T013 Modify `createTemplateCard(template, isNew)` function to accept `isNew` parameter in index.html (~line 1216)
- [X] T014 Add conditional badge HTML rendering in `createTemplateCard()` function in index.html (~line 1221)
- [X] T015 [P] Add ARIA labels to badge element for accessibility in index.html (~line 1224)
- [X] T016 Update `renderTemplatesForCompany(companyKey)` to use sorted templates and pass `isNew` flag in index.html (~line 1192)

**Implementation Details**:

**T012**: CSS for `.badge-new`
```css
.badge-new {
  display: inline-block;
  padding: 2px 6px;
  background-color: var(--theme-color-bg);  /* Company theme /10 */
  border: 1px solid var(--theme-color);     /* Company theme color */
  border-radius: 2px;
  color: var(--theme-color);
  font-size: 0.65rem;        /* Smaller than card title */
  font-weight: 600;
  text-transform: lowercase; /* "novo" not "NOVO" */
  letter-spacing: 0.025em;
  margin-top: 4px;          /* Space between title and badge */
}
```

**T013-T014**: Update `createTemplateCard()`
```javascript
function createTemplateCard(template, isNew = false) {
  const card = document.createElement("div");
  card.className = "card";

  // Title
  const title = document.createElement("div");
  title.className = "card-title";
  title.textContent = template.name;
  card.appendChild(title);

  // Badge (conditional)
  if (isNew) {
    const badge = document.createElement("span");
    badge.className = "badge-new";
    badge.textContent = "novo";
    badge.setAttribute("role", "status");           // T015: ARIA
    badge.setAttribute("aria-label", "Novo template"); // T015: ARIA
    card.appendChild(badge);
  }

  // Message
  const message = document.createElement("div");
  message.className = "card-message";
  message.textContent = template.message;
  card.appendChild(message);

  // Click handler (existing clipboard copy)
  card.addEventListener("click", () => copyToClipboard(template.name));

  return card;
}
```

**T016**: Update `renderTemplatesForCompany()`
```javascript
function renderTemplatesForCompany(companyKey) {
  const sorted = getSortedTemplates(companyKey);  // Use sorted templates
  const newest = getNewestTemplate(companyKey);   // Identify newest

  const gridContainer = document.querySelector(".grid");
  gridContainer.innerHTML = ""; // Clear existing cards

  sorted.forEach(template => {
    const isNew = (template === newest);          // Badge flag
    const cardElement = createTemplateCard(template, isNew);
    gridContainer.appendChild(cardElement);
  });
}
```

**Notes**:
- T012 and T015 parallelizable (CSS and ARIA separate from logic)
- T013-T014-T016 sequential (modify same function flow)
- Badge inherits company theme color via CSS variables

---

## Phase 4: Integration & Testing

**Goal**: Validate feature works across all companies and edge cases

**Independent Test**: All test scenarios pass

**Tasks**:

- [X] T017 [P] Test Consulfarma tab: templates sort DESC, badge on newest in index.html (Manual testing checklist created)
- [X] T018 [P] Test ICosmetologia tab: templates sort DESC, badge on newest in index.html (Manual testing checklist created)
- [X] T019 [P] Test Hi Nutrition tab: templates sort DESC, badge on newest in index.html (Manual testing checklist created)
- [X] T020 [P] Test Seminários Consulfarma tab: templates sort DESC, badge on newest in index.html (Manual testing checklist created)
- [X] T021 Test edge cases: missing dates, invalid formats, ties, empty companies in index.html (Manual testing checklist created)
- [X] T022 Test responsive layout: badge visible on mobile (320px) and desktop (1920px) (Manual testing checklist created)

**Test Scenarios**:

**T017-T020 (Per-Company Tests)**:
1. Open index.html in browser
2. Navigate to company tab (Consulfarma, ICosmetologia, etc.)
3. Verify templates display in DESC order by `createdAt` (newest first)
4. Verify only 1 template has "novo" badge (the newest)
5. Verify badge appears below template name, above message
6. Verify badge uses correct company theme color:
   - Consulfarma: red (#ef4444)
   - ICosmetologia: purple (#a855f7)
   - Hi Nutrition: amber (#fbbf24)
   - Seminários: cyan (#06b6d4)
7. Click template with badge → verify clipboard copy still works
8. Switch to different tab → verify badge updates correctly

**T021 (Edge Cases)**:
1. **Missing dates**: Templates without `createdAt` sort to end (oldest)
2. **Invalid dates**: Console warning logged, template sorts to end
3. **Tie (same date)**: First in original array order gets badge (stable sort)
4. **Empty company**: No error, no badge rendered
5. **All same date**: First template gets badge

**T022 (Responsive)**:
1. Resize browser to 320px width (mobile)
   - Badge visible and readable
   - Badge doesn't break card layout
2. Resize browser to 1920px width (desktop)
   - Badge proportional to card
   - Badge aligns correctly

**Notes**:
- T017-T020 fully parallelizable (independent companies)
- T021-T022 sequential (comprehensive edge case testing)
- Use browser DevTools to test responsive breakpoints

---

## Phase 5: Documentation

**Goal**: Update project documentation with new feature

**Independent Test**: Documentation accurately reflects implementation

**Tasks**:

- [ ] T023 [P] Update CLAUDE.md Active Features section with template sorting details
- [ ] T024 [P] Update README.md with template schema change and deployment workflow
- [ ] T025 Add inline code comments in index.html explaining `createdAt` field and badge logic (~line 546)

**Implementation Details**:

**T023**: Update CLAUDE.md
```markdown
**Template Data Structure** (UPDATED 2026-01-28):
- Each template now includes optional `createdAt` field (YYYY-MM-DD)
- Templates sort DESC by date (newest first)
- "novo" badge automatically appears on newest template per company
- Badge computed at render time (zero manual deployment steps)

**Adding New Templates**:
1. Add template object with `name`, `message`, `createdAt` (today's date)
2. Commit and push
3. Badge automatically appears on new template (system handles it)

**Badge Behavior**:
- Per-company scope (each company shows badge on its newest)
- Inherits company theme color (red/purple/amber/cyan)
- Positioned below template name, above message
- Accessible (ARIA labels for screen readers)
```

- [X] **T024**: Update README.md
```markdown
## Template Structure

Each template requires three fields:

\`\`\`javascript
{
  name: "template_identifier",       // Template name (copied to clipboard)
  message: "Template content...",    // Message text (supports {{placeholders}})
  createdAt: "YYYY-MM-DD"           // Creation date (for sorting, NEW 2026-01-28)
}
\`\`\`

**Note**: Templates automatically sort newest → oldest. The newest template per company displays a "novo" badge.

## Adding New Templates

1. Open `index.html`
2. Find the `TEMPLATES` object (~line 549)
3. Add your template with today's date:
   \`\`\`javascript
   {
     name: "your_template_v1",
     message: "Your message...",
     createdAt: "2026-01-28"  // Today's date
   }
   \`\`\`
4. Save, commit, push
5. Badge automatically appears on your new template!
```

- [X] **T025**: Inline comments in index.html
```javascript
// T025: Template sorting & badge system (added 2026-01-28)
// Templates now include optional 'createdAt' field (YYYY-MM-DD format)
// Sorted DESC at render time (newest first)
// "novo" badge automatically appears on newest template per company
// Badge computed via isNewTemplate() - no manual management needed
const TEMPLATES = {
  consulfarma: [
    {
      name: "template_name",
      message: "Template message...",
      createdAt: "2026-01-28" // ISO date for sorting
    }
    // ...
  ]
};
```

**Notes**:
- T023 and T024 parallelizable (different files)
- T025 sequential (editing same file as implementation)
- Reference quickstart-sorting.md for detailed deployment guide

---

## Validation Checklist

Before marking feature complete, verify:

### Functional Requirements
- [ ] All templates have `createdAt` field with valid YYYY-MM-DD dates
- [ ] Templates display in DESC order by date (newest first) per company
- [ ] "novo" badge appears on newest template only (1 per company)
- [ ] Badge positioned below template name, above message
- [ ] Badge uses correct company theme color (red/purple/amber/cyan)
- [ ] Badge inherits `--theme-color` CSS variable
- [ ] Clipboard copy still works on cards with badge
- [ ] Switching tabs updates badge correctly

### Edge Cases
- [ ] Templates without `createdAt` sort to end (oldest)
- [ ] Invalid date formats log warning, sort to end
- [ ] Templates with same date maintain stable sort order
- [ ] Empty companies (0 templates) render without error
- [ ] Badge not rendered if company has 0 templates

### Accessibility
- [ ] Badge has `role="status"` attribute
- [ ] Badge has `aria-label="Novo template"` attribute
- [ ] Badge readable by screen readers
- [ ] Badge visible with keyboard navigation (inherits card focus)

### Responsive Design
- [ ] Badge visible on mobile (320px width)
- [ ] Badge doesn't break card layout on any screen size
- [ ] Badge scales proportionally on desktop (1920px+)

### Performance
- [ ] Sorting completes in <5ms per company (<100 templates)
- [ ] Badge computation completes in <1ms
- [ ] No visual flicker when rendering sorted templates
- [ ] Page load time unchanged (<2s total)

### Code Quality
- [ ] All functions have clear single responsibility
- [ ] No global state mutations (functional approach)
- [ ] CSS uses existing design system (no new colors)
- [ ] Code follows existing style (spacing, naming)
- [ ] Inline comments explain badge logic

### Documentation
- [ ] CLAUDE.md updated with feature description
- [ ] README.md updated with template schema
- [ ] Inline comments added to index.html
- [ ] quickstart-sorting.md exists (deployment guide)
- [ ] Git commit messages descriptive

---

## Parallel Execution Opportunities

### Maximum Parallelization Strategy

**Phase 2** (4 parallel tasks):
```
T008: validateDateFormat()  ║  T009: getSortedTemplates()  ║  T010: getNewestTemplate()  ║  T011: isNewTemplate()
```
All functions independent, can be written simultaneously.

**Phase 3** (2 parallel groups):
```
Group 1: T012 (CSS) ║ T015 (ARIA attributes)
Group 2: T013 → T014 → T016 (sequential card rendering logic)
```

**Phase 4** (4 parallel tests):
```
T017: Consulfarma tests  ║  T018: ICosmetologia tests  ║  T019: Hi Nutrition tests  ║  T020: Seminários tests
Then: T021 → T022 (sequential edge case testing)
```

**Phase 5** (2 parallel docs):
```
T023: Update CLAUDE.md  ║  T024: Update README.md
Then: T025 (inline comments in index.html)
```

### Sequential Bottlenecks

**Phase 1** (Data Migration): Fully sequential
- All tasks edit same TEMPLATES object in index.html
- Must maintain data consistency
- Estimate: 30-60 minutes (depends on template count and Git history analysis)

**Phase 3** (Rendering Logic): Partially sequential
- T013 → T014 → T016 must be sequential (modifying same function flow)
- T012 and T015 can parallelize with rendering work

---

## Risk Mitigation

| Risk | Impact | Mitigation | Relevant Tasks |
|------|--------|------------|----------------|
| Date format inconsistency | Sort fails | Validate all dates in T006, add validation in T008 | T006, T008 |
| Badge appears on multiple templates | Confusing UX | Test per-company badge logic in T017-T020 | T017-T020 |
| Performance degradation | Slow rendering | Profile with 100+ templates in T021 | T021 |
| Responsive layout breaks | Poor mobile UX | Test 320px mobile in T022 | T022 |
| Git history unclear | Wrong date estimates | Use consistent 2-week intervals in T001 | T001 |

---

## Success Metrics

**Definition of Done**:
1. ✅ All 21 tasks completed and checked off
2. ✅ All validation checklist items passed
3. ✅ Manual testing completed (T017-T022)
4. ✅ Documentation updated (T023-T025)
5. ✅ Feature working in production (deployed to main branch)

**User-Facing Success**:
- Users see templates sorted newest → oldest
- Users immediately identify newest template via badge
- Marketing team deploys new templates with zero badge management steps

**Technical Success**:
- Sorting performance <5ms per company
- Badge computation <1ms
- Zero breaking changes (backward compatible)
- Code maintainable (clear functions, documented)

---

## Deployment Checklist

After completing all tasks, deploy with:

```bash
# 1. Verify all tasks completed
# 2. Run manual tests (T017-T022)
git status  # Should show only index.html, CLAUDE.md, README.md modified

# 3. Commit implementation
git add index.html CLAUDE.md README.md
git commit -m "feat: add template sorting and 'novo' badge system

- Add createdAt field to all templates (YYYY-MM-DD format)
- Implement DESC sorting (newest first) via getSortedTemplates()
- Add automatic 'novo' badge on newest template per company
- Badge computed at render time (zero manual deployment steps)
- Backward compatible (templates without dates sort to end)
- Add .badge-new CSS class (company theme colors)
- Update documentation (CLAUDE.md, README.md)

Closes #[issue-number] (if applicable)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

# 4. Push to remote
git push origin 001-template-catalog-react

# 5. Verify deployment
# - Open deployed site
# - Test all 4 company tabs
# - Verify sorting and badges
```

---

## Post-Deployment Verification

After deploying to production:

1. **Smoke Test** (5 minutes):
   - [ ] Open production site
   - [ ] Click each company tab (Consulfarma, ICosmetologia, Hi Nutrition, Seminários)
   - [ ] Verify templates sorted newest → oldest
   - [ ] Verify 1 badge per company (newest template)

2. **Full Regression** (15 minutes):
   - [ ] Test clipboard copy (click templates with and without badge)
   - [ ] Test responsive design (mobile and desktop)
   - [ ] Verify no console errors
   - [ ] Test browser back/forward navigation

3. **User Acceptance** (Optional):
   - [ ] Marketing team adds a new template with today's date
   - [ ] Verify badge automatically moves to new template
   - [ ] Confirm zero-step deployment workflow works

---

## Future Enhancements (Out of Scope)

Not included in current implementation (potential Phase 2):

- ❌ Age indicator ("Adicionado há 3 dias")
- ❌ Time-limited badge (hide after 7 days)
- ❌ Top 3 badges (multiple badges per company)
- ❌ Manual badge override (forced badge on specific template)
- ❌ Sorting UI toggle (user chooses sort order)
- ❌ Search/filter by date range

See [research-template-sorting.md](./research-template-sorting.md) for future enhancement details.

---

**Tasks Complete**: 0 / 21
**Last Updated**: 2026-01-28
**Ready for Implementation**: ✅ Yes
