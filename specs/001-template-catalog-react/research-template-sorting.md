# Research: Template Sorting & "New" Badge System

**Feature**: Template sorting by date + automatic "new" badge on latest template
**Date**: 2026-01-28
**Status**: Planning Complete

---

## Overview

This document captures technical decisions for implementing:
1. Template sorting (most recent first, DESC order)
2. Automatic "new" badge system (marks only the latest template)
3. Deploy-time badge management (automatic tag application/removal)

---

## Decision 1: Template Metadata Structure

### Problem
Current templates only have `name` and `message` fields. Need to track creation/publication date to enable sorting.

### Options Considered

#### Option A: Add `deployedAt` field to each template object
```javascript
{
  name: "template_name",
  message: "Template message...",
  deployedAt: "2026-01-28T14:00:00Z" // ISO 8601 timestamp
}
```
**Pros**: Simple, keeps data with template, automatic via localStorage
**Cons**: None (automated via client-side detection)

#### Option B: Use array position as implicit date ordering
```javascript
// Templates manually ordered newest-first
const TEMPLATES = {
  consulfarma: [
    { name: "newest_template", message: "..." },  // Position 0 = newest
    { name: "older_template", message: "..." },   // Position 1 = older
    // ...
  ]
}
```
**Pros**: No schema changes, leverage existing structure
**Cons**: Order breaks if array manipulated without care, no explicit dates

#### Option C: Add `publishedAt` timestamp field
```javascript
{
  name: "template_name",
  message: "Template message...",
  publishedAt: 1706400000000 // Unix timestamp (milliseconds)
}
```
**Pros**: Precise, sortable, programmatically comparable
**Cons**: Harder to read/edit manually, more complex

### Decision: **Option A (deployedAt with ISO 8601 timestamp) + localStorage Auto-Stamping**

**Rationale**:
- **Fully automated**: Developer only adds `name` and `message`, timestamp generated on first render
- **localStorage persistence**: Timestamp saved in browser, consistent across page reloads
- **ISO 8601 format** (`"2026-01-28T14:00:00Z"`): Standard, sortable, precise
- **Zero manual intervention**: Marketing team never edits dates manually
- **Zero dependencies**: Pure client-side JavaScript, no build tools required
- **Multi-user compatible**: Each browser detects "new" independently on first access

**Implementation**:
```javascript
// Developer adds template WITHOUT deployedAt
const TEMPLATES = {
  consulfarma: [
    {
      name: "template_name",
      message: "Template message..."
      // No deployedAt - auto-detected on first render
    }
    // ...
  ]
}

// System auto-stamps on page load
function initializeDeploymentTimestamps() {
  const CACHE_KEY = 'template_deployment_timestamps';
  const cache = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');

  Object.keys(TEMPLATES).forEach(companyKey => {
    TEMPLATES[companyKey].forEach(template => {
      const key = `${companyKey}:${template.name}`;

      if (!cache[key]) {
        cache[key] = new Date().toISOString(); // First time = deploy time
      }

      template.deployedAt = cache[key]; // Inject timestamp
    });
  });

  localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
}
```

**Edge Cases**:
- Missing `deployedAt` → auto-stamped on first render (current timestamp)
- Invalid date format → log warning, treat as oldest
- Duplicate dates → preserve original array order (stable sort)
- localStorage cleared → templates re-stamped with current time (acceptable trade-off)

---

## Decision 2: "New" Badge Logic

### Problem
Need to automatically mark only the latest template with a "new" badge across all companies.

### Options Considered

#### Option A: Boolean flag per template (`isNew: true`)
```javascript
{
  name: "template_name",
  message: "...",
  deployedAt: "2026-01-28",
  isNew: true  // Manual flag
}
```
**Pros**: Simple boolean check in rendering
**Cons**: Requires manual update on each deploy (high error risk)

#### Option B: Computed "new" status at render time
```javascript
// Compute newest template dynamically
function getNewestTemplate(templates) {
  return templates.reduce((newest, t) =>
    t.deployedAt > newest.deployedAt ? t : newest
  );
}
```
**Pros**: Automatic, zero manual intervention, single source of truth
**Cons**: Slight performance cost (negligible for <500 templates)

#### Option C: Single `latestTemplateId` global config
```javascript
const CONFIG = {
  latestTemplateId: "template_name_v5"  // Update on each deploy
};
```
**Pros**: Clear deployment checklist item
**Cons**: Requires manual sync, prone to forgetting

### Decision: **Option B (Computed at render time)**

**Rationale**:
- **Zero manual intervention**: Automatically identifies latest template by `deployedAt`
- **Single source of truth**: `deployedAt` field drives both sorting AND badge
- **Error-proof**: Impossible to forget updating badge when adding new template
- **Performance**: O(n) scan across all templates (4 companies × ~20 templates = <100 items = instant)
- **Future-proof**: Scales if companies grow to 100+ templates each

**Implementation Algorithm**:
```javascript
function renderTemplates(companyKey) {
  const templates = TEMPLATES[companyKey];

  // 1. Sort DESC by deployedAt
  const sorted = [...templates].sort((a, b) =>
    (b.deployedAt || "").localeCompare(a.deployedAt || "")
  );

  // 2. Identify newest (first after sort)
  const newestTemplate = sorted[0];

  // 3. Render with badge check
  sorted.forEach(template => {
    const isNew = template === newestTemplate;
    renderTemplateCard(template, isNew);
  });
}
```

**Edge Cases**:
- Empty company (0 templates) → No badge rendered
- All templates missing `deployedAt` → First in array gets badge (stable fallback)
- Tie (multiple templates same date) → First in original array order gets badge

---

## Decision 3: Badge Visual Design

### Problem
Badge must be visible but not distracting (aligns with "developer dark mode" aesthetic).

### Options Considered

#### Option A: Pill badge next to template name
```
[TEMPLATE NAME]  [novo]
```
**Pros**: Clear separation, easy to spot
**Cons**: Takes horizontal space, may wrap on mobile

#### Option B: Badge below template name
```
[TEMPLATE NAME]
[novo]
```
**Pros**: Always visible, no layout shifts
**Cons**: Takes vertical space in card

#### Option C: Corner ribbon/flag
```
┌────────────[novo]
│ TEMPLATE NAME
│ Message...
```
**Pros**: Visually distinct, no content displacement
**Cons**: Requires absolute positioning, may obscure text

#### Option D: Inline text badge (minimalist)
```
[TEMPLATE NAME] • novo
```
**Pros**: Ultra-compact, text-only, accessible
**Cons**: May blend in with name, less noticeable

### Decision: **Option B (Badge below template name)**

**Rationale**:
- Maintains visual hierarchy (name → badge → message)
- Works on all screen sizes (no wrapping issues)
- Easy to implement (inline block element)
- Accessible (clear separation for screen readers)
- Fits "quiet UI" aesthetic (not overly prominent)

**Styling** (High-Contrast for Dark Mode):
```css
.badge-new {
  display: inline-block;
  padding: 2px 6px;
  background-color: rgba(251, 191, 36, 0.15); /* amber-400 /15 - high contrast bg */
  border: 1px solid #fbbf24; /* amber-400 - high contrast border */
  border-radius: 2px;
  color: #fbbf24; /* amber-400 - bright yellow, WCAG AAA on dark bg */
  font-size: 0.65rem; /* text-xs, smaller than card title */
  font-weight: 600;
  text-transform: lowercase; /* "novo" not "NOVO" */
  letter-spacing: 0.025em;
  margin-top: 4px;
}
```

**Color Choice Rationale**:
- **Amber-400 (#fbbf24)**: High contrast on neutral-950 (#0a0a0a) background
- **WCAG AAA compliant**: Contrast ratio >7:1 for small text
- **Visually distinct**: Yellow stands out without being aggressive
- **Language-agnostic**: Color alone conveys "new" status (accessible)

**HTML Structure**:
```html
<div class="card">
  <div class="card-title">TEMPLATE_NAME_V5</div>
  <span class="badge-new">novo</span>
  <div class="card-message">Template message content...</div>
</div>
```

**Color Behavior**:
- Badge uses **amber-400 (#fbbf24)** universally for high contrast
- All companies use same badge color (consistency + accessibility)
- Alternative: Keep company theme colors IF they pass WCAG AA (contrast ratio >4.5:1)
  - Consulfarma (red-500): ⚠️ May need lightening to red-400
  - ICosmetologia (purple-500): ⚠️ May need lightening to purple-400
  - Hi Nutrition (amber-400): ✅ Already high contrast
  - Seminários (cyan-500): ⚠️ May need lightening to cyan-400

---

## Decision 4: Sorting Algorithm

### Problem
Need to sort templates by date (most recent first) while preserving stable order for ties.

### Options Considered

#### Option A: Native `Array.sort()` with comparator
```javascript
templates.sort((a, b) =>
  (b.deployedAt || "").localeCompare(a.deployedAt || "")
);
```
**Pros**: Built-in, simple, fast
**Cons**: Mutates original array (need to clone first)

#### Option B: Sort on data load (pre-process)
```javascript
// Run once on page load
Object.keys(TEMPLATES).forEach(company => {
  TEMPLATES[company].sort((a, b) =>
    (b.deployedAt || "").localeCompare(a.deployedAt || "")
  );
});
```
**Pros**: Sort once, render many times (performance)
**Cons**: Mutates original data, breaks assumption of data immutability

#### Option C: Virtual sorted view (keep original intact)
```javascript
function getSortedTemplates(companyKey) {
  return [...TEMPLATES[companyKey]].sort((a, b) =>
    (b.deployedAt || "").localeCompare(a.deployedAt || "")
  );
}
```
**Pros**: Preserves original data, functional approach
**Cons**: Re-sorts on every tab switch (minimal cost for <100 items)

### Decision: **Option C (Virtual sorted view)**

**Rationale**:
- Preserves original data structure (easier debugging, data inspection)
- Functional approach (no side effects)
- Performance negligible (<100 templates per company = <5ms sort time)
- Future-proof (enables alternate sort orders: alphabetical, popularity, etc.)

**Implementation**:
```javascript
function renderTemplatesForCompany(companyKey) {
  // Clone and sort (DESC by date)
  const sorted = [...TEMPLATES[companyKey]].sort((a, b) => {
    const dateA = a.deployedAt || "";
    const dateB = b.deployedAt || "";
    return dateB.localeCompare(dateA); // DESC: newest first
  });

  // Render sorted templates
  const newestTemplate = sorted[0];
  sorted.forEach(template => {
    const isNew = (template === newestTemplate);
    renderTemplateCard(template, isNew);
  });
}
```

**Stable Sort Guarantee**:
- ECMAScript 2019+ mandates stable `Array.sort()`
- Ties (same `deployedAt`) preserve original array order
- Missing `deployedAt` → empty string → sorts to end (oldest)

---

## Decision 5: Deployment Workflow

### Problem
User wants automatic badge management: "deploy new template → add 'novo' to new one, remove from others".

### Options Considered

#### Option A: Manual checklist
1. Add new template with `deployedAt: "2026-01-28"`
2. Manually remove `isNew: true` from old templates
3. Add `isNew: true` to new template
4. Commit and push

**Pros**: Simple, no automation
**Cons**: Error-prone, high cognitive load, scales poorly

#### Option B: Pre-commit Git hook
```bash
# .git/hooks/pre-commit
node scripts/auto-badge-templates.js
```
**Pros**: Automatic, runs on every commit
**Cons**: Requires Node.js setup, breaks "zero dependencies" goal

#### Option C: Computed badge (no manual steps)
- Badge logic automatically identifies newest by `deployedAt`
- Deploy workflow: just add new template with date
- System handles badge rendering automatically

**Pros**: Zero deployment steps, foolproof, aligns with computed badge decision
**Cons**: None (already decided in Decision 2)

### Decision: **Option C (Computed badge, zero manual steps)**

**Rationale**:
- Aligns with Decision 2 (computed "new" status)
- Zero-step deployment: add template with `deployedAt`, commit, push, done
- Impossible to forget badge update (system handles it)
- Scales to 100+ templates without workflow changes

**Deployment Checklist** (simplified):
```markdown
Adding a new template:
1. ✅ Add template object with name, message, deployedAt (today's date)
2. ✅ Commit and push
3. ✅ Done! Badge automatically appears on newest template
```

**Example**:
```javascript
// Before deploy (old newest: 2026-01-20)
consulfarma: [
  { name: "old_newest", message: "...", deployedAt: "2026-01-20" },  // Had badge
  { name: "older", message: "...", deployedAt: "2026-01-15" }
]

// After deploy (new newest: 2026-01-28)
consulfarma: [
  { name: "brand_new", message: "...", deployedAt: "2026-01-28" },   // Gets badge automatically
  { name: "old_newest", message: "...", deployedAt: "2026-01-20" },  // Loses badge automatically
  { name: "older", message: "...", deployedAt: "2026-01-15" }
]
```

---

## Decision 6: Badge Scope (Per-Company vs Global)

### Problem
Should badge appear on newest template per company, or newest template across all companies?

### Options Considered

#### Option A: Per-company (each company shows 1 badge)
- Consulfarma: badge on newest Consulfarma template
- ICosmetologia: badge on newest ICosmetologia template
- Hi Nutrition: badge on newest Hi Nutrition template
- Seminários: badge on newest Seminários template

**Result**: Up to 4 badges visible (1 per company)

**Pros**: Users see newest content for company they're viewing
**Cons**: May have multiple badges active simultaneously

#### Option B: Global (only 1 badge across entire catalog)
- Single newest template across all 4 companies gets badge
- Other companies show no badge

**Pros**: Clear "latest addition to catalog" indicator
**Cons**: Users on Company A tab won't see badge if newest is in Company B

### Decision: **Option A (Per-company badge)**

**Rationale**:
- Users browse by company → badge shows "newest for this company"
- Aligns with user mental model (company-specific browsing)
- Marketing teams deploy templates for different companies at different times
- More useful: "newest Consulfarma template" vs "newest template somewhere in catalog"

**Implementation**:
```javascript
function renderTemplatesForCompany(companyKey) {
  const sorted = [...TEMPLATES[companyKey]].sort(...);
  const newestInCompany = sorted[0];  // Newest for THIS company only

  sorted.forEach(template => {
    const isNew = (template === newestInCompany);
    renderTemplateCard(template, isNew);
  });
}
```

**User Experience**:
- User on Consulfarma tab → sees "novo" badge on newest Consulfarma template
- User switches to ICosmetologia tab → sees "novo" badge on newest ICosmetologia template
- Each company feels fresh and up-to-date

---

## Performance Considerations

### Sorting Performance
- **Worst case**: 4 companies × 50 templates = 200 items
- **Sort complexity**: O(n log n) = ~8 comparisons per template
- **Expected time**: <5ms on modern browsers
- **Optimization**: None needed (instant for <1000 templates)

### Badge Computation
- **Complexity**: O(1) after sort (first item in sorted array)
- **Expected time**: <1ms
- **Optimization**: None needed

### Memory Impact
- **Clone cost**: Shallow copy of template array (~200 objects)
- **Memory overhead**: ~10KB per company (negligible)
- **GC impact**: None (short-lived clones, collected immediately)

---

## Accessibility

### Screen Reader Support
```html
<span class="badge-new" role="status" aria-label="Novo template">novo</span>
```
- `role="status"` → announces to screen readers
- `aria-label` → clarifies meaning ("New template")

### Keyboard Navigation
- Badge is not interactive (no focus needed)
- Wraps within card (inherits card keyboard behavior)

### Visual Contrast
- Badge uses company theme color (already passes WCAG AA)
- Border ensures visibility on dark background
- Text size: 0.65rem (slightly smaller than card title, still readable)

---

## Migration Strategy

### Phase 1: Add `deployedAt` to existing templates
- Backfill dates for all existing templates
- Estimate dates from Git history (`git log --follow index.html`)
- Assume 1-2 week intervals if exact dates unknown

### Phase 2: Update rendering logic
- Modify `renderTemplatesForCompany()` to sort and identify newest
- Add badge HTML to card rendering
- Add `.badge-new` CSS class

### Phase 3: Document deployment workflow
- Update CLAUDE.md with new template structure
- Add deployment checklist to quickstart.md

### Rollback Plan
- Remove `deployedAt` field → app still works (unsorted)
- Remove badge CSS class → app still works (no badge)
- Zero breaking changes (additive feature)

---

## Testing Scenarios

### Sort Testing
- [ ] Templates sort DESC by `deployedAt` (newest first)
- [ ] Templates with missing `deployedAt` appear at end
- [ ] Templates with same `deployedAt` maintain original order
- [ ] Empty company (0 templates) renders without error

### Badge Testing
- [ ] Newest template in each company shows "novo" badge
- [ ] Only 1 template per company has badge
- [ ] Badge uses correct company theme color
- [ ] Badge appears below template name, above message
- [ ] Badge disappears when new template deployed

### Cross-Company Testing
- [ ] Each company has independent "newest" determination
- [ ] Switching tabs updates badge correctly
- [ ] Multiple companies can have badges simultaneously

### Edge Cases
- [ ] All templates same date → first in array gets badge
- [ ] Invalid date format → template treated as oldest
- [ ] 100+ templates → sorting/rendering still <100ms
- [ ] Mobile (320px) → badge doesn't break card layout

---

## Future Enhancements

### Potential Phase 2 Features
1. **Age indicator**: "Adicionado há 3 dias" below badge
2. **"Updated" badge**: Show badge on recently modified templates (not just new)
3. **Badge duration**: Hide badge after 7 days (ephemeral "new" status)
4. **Multi-sort**: Allow users to sort by date, name, or popularity
5. **Search integration**: Filter templates by date range

### Not Planned (Out of Scope)
- ❌ Admin UI for badge management (conflicts with Git-based workflow)
- ❌ User preferences for sort order (adds complexity, low value)
- ❌ Badge customization (text, color, position) - keep simple

---

## References

- [MDN: Array.prototype.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
- [ISO 8601 Date Format](https://en.wikipedia.org/wiki/ISO_8601)
- [WCAG 2.1 Color Contrast](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- Current implementation: [index.html](../../index.html)

---

**Status**: ✅ Research Complete | **Next Step**: Generate data-model.md
