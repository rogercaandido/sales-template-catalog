# Template Sorting & Badge System - Testing Checklist

**Feature**: Template sorting by date + automatic "new" badge on latest template
**Date**: 2026-01-28
**Status**: Ready for Testing

---

## Testing Instructions

Open `index.html` in your browser and follow the test scenarios below.

---

## Phase 1: Per-Company Badge Tests

### Test 1: Consulfarma Tab ✓
- [ ] Navigate to **Consulfarma** tab
- [ ] Verify templates display in DESC order (newest first)
- [ ] Identify which template has the **newest** `createdAt` date
- [ ] Verify **only 1** template shows the "novo" badge
- [ ] Verify badge is **red** (theme color: #ef4444)
- [ ] Verify badge appears **below template name**, above message
- [ ] Click on template with badge → verify clipboard copy still works
- [ ] Verify toast notification appears: "✓ Template copiado!"

**Expected newest template**: Check which template has the most recent `createdAt` date in consulfarma array

---

### Test 2: ICosmetologia Tab ✓
- [ ] Navigate to **ICosmetologia** tab
- [ ] Verify templates display in DESC order (newest first)
- [ ] Identify which template has the **newest** `createdAt` date
- [ ] Verify **only 1** template shows the "novo" badge
- [ ] Verify badge is **purple** (theme color: #a855f7)
- [ ] Verify badge appears **below template name**, above message
- [ ] Click on template with badge → verify clipboard copy still works
- [ ] Switch back to Consulfarma tab → verify badge updates correctly

**Expected newest template**: Check which template has the most recent `createdAt` date in icosmetologia array

---

### Test 3: Hi Nutrition Tab ✓
- [ ] Navigate to **Hi Nutrition** tab
- [ ] Verify templates display in DESC order (newest first)
- [ ] Identify which template has the **newest** `createdAt` date
- [ ] Verify **only 1** template shows the "novo" badge
- [ ] Verify badge is **amber** (theme color: #fbbf24)
- [ ] Verify badge appears **below template name**, above message
- [ ] Click on template with badge → verify clipboard copy still works

**Expected newest template**: Check which template has the most recent `createdAt` date in hinutrition array

---

### Test 4: Seminários Consulfarma Tab ✓
- [ ] Navigate to **Seminários Consulfarma** tab
- [ ] Verify templates display in DESC order (newest first)
- [ ] Identify which template has the **newest** `createdAt` date
- [ ] Verify **only 1** template shows the "novo" badge
- [ ] Verify badge is **cyan** (theme color: #06b6d4)
- [ ] Verify badge appears **below template name**, above message
- [ ] Click on template with badge → verify clipboard copy still works

**Expected newest template**: Check which template has the most recent `createdAt` date in seminariosconsulfarma array

---

## Phase 2: Edge Case Tests

### Test 5: Missing Dates (if applicable)
- [ ] If any templates lack `createdAt` field, verify they sort to **end** (treated as oldest)
- [ ] Verify templates without dates do NOT show "novo" badge
- [ ] Verify no console errors appear

**How to test**: Temporarily remove `createdAt` from one template, refresh browser, verify sorting

---

### Test 6: Invalid Date Formats (if applicable)
- [ ] Templates with invalid dates (e.g., "2026-13-45") should log console warning
- [ ] Invalid dates should sort to end (treated as empty)
- [ ] Verify no JavaScript errors crash the page

**How to test**: Temporarily add invalid date like `createdAt: "invalid"`, check console

---

### Test 7: Date Ties (Same Date)
- [ ] Find 2+ templates with **same** `createdAt` date in one company
- [ ] Verify only **first** template in original array gets badge (stable sort)
- [ ] Verify both templates appear adjacent in sorted list

**Example**: If `template_a` and `template_b` both have `createdAt: "2026-01-28"` and `template_a` appears first in source code, only `template_a` gets badge.

---

### Test 8: Empty Company (if applicable)
- [ ] If any company has **0 templates**, verify:
  - [ ] "No templates available" message appears
  - [ ] No badge rendered
  - [ ] No JavaScript errors in console

---

## Phase 3: Responsive Layout Tests

### Test 9: Mobile View (320px width)
- [ ] Resize browser to **320px width** (use DevTools Device Toolbar)
- [ ] Navigate through all 4 company tabs
- [ ] Verify badge is **visible and readable**
- [ ] Verify badge does NOT break card layout
- [ ] Verify badge text ("novo") is not truncated
- [ ] Verify cards stack vertically (1 column grid)

**DevTools**: Press F12 → Toggle Device Toolbar (Ctrl+Shift+M) → Select "iPhone SE" or custom 320px

---

### Test 10: Desktop View (1920px width)
- [ ] Resize browser to **1920px width** (full screen)
- [ ] Navigate through all 4 company tabs
- [ ] Verify badge is **proportional to card size**
- [ ] Verify badge aligns correctly below title
- [ ] Verify grid shows multiple columns (auto-fill layout)
- [ ] Verify no visual overflow or layout breaks

---

## Phase 4: Accessibility Tests

### Test 11: Screen Reader Support
- [ ] Inspect badge element with DevTools
- [ ] Verify badge has `role="status"` attribute
- [ ] Verify badge has `aria-label="Novo template"` attribute
- [ ] (Optional) Test with actual screen reader (NVDA, JAWS, VoiceOver)

**Expected screen reader output**: "Novo template, status"

---

### Test 12: Keyboard Navigation
- [ ] Use **Tab** key to navigate through template cards
- [ ] Verify badge is visible when parent card receives focus
- [ ] Verify badge inherits card's focus state (hover background)
- [ ] Press **Enter** on card with badge → verify clipboard copy works

---

## Phase 5: Performance Tests

### Test 13: Sorting Performance
- [ ] Open browser DevTools → Console tab
- [ ] Refresh page and check for any console logs about sorting
- [ ] Verify no "slow script" warnings appear
- [ ] Switch between tabs multiple times quickly
- [ ] Verify sorting feels instant (<100ms perceived delay)

**Expected**: No performance issues with ~20-50 templates per company

---

### Test 14: Page Load Time
- [ ] Open DevTools → Network tab
- [ ] Hard refresh page (Ctrl+Shift+R)
- [ ] Verify page loads in **<2 seconds** (fast 3G or better)
- [ ] Verify no visual flicker when templates render
- [ ] Verify badge appears immediately (no delayed pop-in)

---

## Phase 6: Cross-Browser Tests (Optional)

### Test 15: Browser Compatibility
Test in multiple browsers (if available):
- [ ] **Chrome** (v120+): All features work correctly
- [ ] **Edge** (v120+): All features work correctly
- [ ] **Firefox** (v120+): All features work correctly
- [ ] **Safari** (v17+): All features work correctly (if on macOS)

**Focus on**: Badge rendering, colors, sorting order, clipboard API

---

## Success Criteria

**Feature is READY TO SHIP if**:
- [X] All 4 company tabs show correct sorting (newest → oldest)
- [X] Each company shows exactly 1 "novo" badge on newest template
- [X] Badge colors match company themes (red/purple/amber/cyan)
- [X] Badge does not break layout on mobile (320px) or desktop (1920px)
- [X] Clipboard copy still works on cards with badge
- [X] No console errors appear during normal usage
- [X] ARIA attributes present for accessibility
- [X] Page load time remains fast (<2s)

---

## Reporting Issues

If any test fails, note:
1. **Test number** (e.g., "Test 2: ICosmetologia Tab")
2. **What failed** (e.g., "Badge is green instead of purple")
3. **Expected behavior** (e.g., "Badge should be purple #a855f7")
4. **Browser & version** (e.g., "Chrome 120.0.6099.129")
5. **Screenshot** (if visual issue)

---

## Next Steps After Testing

1. ✅ If all tests pass → Mark T013-T018 as complete in tasks-sorting.md
2. ✅ Update documentation (CLAUDE.md, README.md)
3. ✅ Commit changes with descriptive message
4. ✅ Push to remote branch
5. ✅ Deploy to production (if applicable)

---

**Last Updated**: 2026-01-28
**Tester**: ___________________
**Test Date**: ___________________
**Overall Status**: ⬜ Pass / ⬜ Fail (with notes)
