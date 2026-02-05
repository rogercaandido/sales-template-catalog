# Quickstart: Template Sorting & "New" Badge System

**Feature**: Template sorting by date + automatic "new" badge on latest template
**Date**: 2026-01-28
**Audience**: Developers and marketing teams deploying new templates

---

## Overview

This guide explains how to:
1. Add new templates with dates (for sorting)
2. Deploy templates (automatic badge management)
3. Update existing templates with dates (migration)

**Key Benefit**: Zero-step badge management. Just add `deployedAt` field, and the system automatically:
- Sorts templates newest → oldest
- Adds "novo" badge to newest template per company
- Removes badge from previous templates

---

## Quick Start: Adding a New Template

### Step 1: Open `index.html`

Locate the `TEMPLATES` object (around line 549):

```javascript
const TEMPLATES = {
  consulfarma: [
    // Templates here
  ],
  icosmetologia: [
    // Templates here
  ],
  // ...
};
```

### Step 2: Add Your Template (WITH deployedAt)

Add new template **at any position** in the array with `deployedAt` set to today's date:

```javascript
consulfarma: [
  // Existing templates...
  {
    name: "your_new_template_v1",
    message: "Your template message here with {{1}} placeholders",
    deployedAt: "2026-01-28"  // Today's date in YYYY-MM-DD format
  }
]
```

**Important**:
- ✅ Add `name`, `message`, and `deployedAt`
- ✅ Use today's date in YYYY-MM-DD format
- ✅ Date auto-populates when template first deployed (no manual tracking needed)
- ✅ System automatically manages badge based on this date

### Step 3: Save and Deploy

```bash
# Commit changes (no timestamp needed in commit)
git add index.html
git commit -m "feat: add new template your_new_template_v1"
git push origin 001-template-catalog-react

# Deploy (if using Netlify/Vercel)
# Auto-deploys on push (if configured)
# Or manually: netlify deploy --prod
```

### Step 4: Verify (Automatic Badge)

1. Open deployed site (or `index.html` locally)
2. Navigate to company tab (e.g., Consulfarma)
3. Check:
   - ✅ New template appears first (newest → oldest sort)
   - ✅ New template shows "novo" badge below name
   - ✅ Old templates no longer have badge
   - ✅ Badge color matches company theme

**Behind the Scenes**:
```javascript
// On render, system automatically:
// 1. Sorts templates by deployedAt (DESC)
// 2. Identifies newest template (first after sort)
// 3. Adds "novo" badge to newest template only
// 4. Removes badge from all other templates
```

---

## Complete Example

### Before: Existing Templates

```javascript
const TEMPLATES = {
  consulfarma: [
    {
      name: "start_x_csf_ia_v1",
      message: "Oi {{1}}! Sou a Mind...",
      deployedAt: "2026-01-20"  // Old newest (had badge)
    },
    {
      name: "retomada_x_geral_csf_v2",
      message: "Oi {{1}}! Notei que...",
      deployedAt: "2026-01-15"  // Older (no badge)
    }
  ]
};
```

**Result**: "start_x_csf_ia_v1" shows "novo" badge (newest: 2026-01-20)

---

### After: New Template Added

```javascript
const TEMPLATES = {
  consulfarma: [
    {
      name: "start_x_csf_ia_v1",
      message: "Oi {{1}}! Sou a Mind...",
      deployedAt: "2026-01-20"  // No longer newest (loses badge)
    },
    {
      name: "retomada_x_geral_csf_v2",
      message: "Oi {{1}}! Notei que...",
      deployedAt: "2026-01-15"  // Still old (no badge)
    },
    {
      name: "apresentacao_x_cursos_csf_v3",  // ← NEW
      message: "Olá {{1}}! Temos novos cursos...",
      deployedAt: "2026-01-28"  // ← Newest (gets badge automatically)
    }
  ]
};
```

**Result**: "apresentacao_x_cursos_csf_v3" shows "novo" badge (newest: 2026-01-28)

**Automatic Behaviors**:
- ✅ New template sorted to top (regardless of array position)
- ✅ "novo" badge moves to new template
- ✅ Old badge removed from previous templates

---

## Migration: Adding Dates to Existing Templates

If your templates don't have `deployedAt` fields yet, follow this one-time migration:

### Step 1: Estimate Dates

**Option A**: Use Git history (most accurate)
```bash
# See when templates were added
git log --all --full-history -- index.html | grep -A 5 "template_name"
```

**Option B**: Estimate dates (if Git history unclear)
- Newest template: Today's date
- Work backwards: Subtract ~2 weeks per template

### Step 2: Add Dates to All Templates

```javascript
const TEMPLATES = {
  consulfarma: [
    {
      name: "template_v5",
      message: "...",
      deployedAt: "2026-01-28"  // ← Add today
    },
    {
      name: "template_v4",
      message: "...",
      deployedAt: "2026-01-14"  // ← Add 2 weeks ago
    },
    {
      name: "template_v3",
      message: "...",
      deployedAt: "2025-12-31"  // ← Add 4 weeks ago
    },
    {
      name: "template_v2",
      message: "...",
      deployedAt: "2025-12-17"  // ← Add 6 weeks ago
    },
    {
      name: "template_v1",
      message: "...",
      deployedAt: "2025-12-03"  // ← Add 8 weeks ago (oldest)
    }
  ]
};
```

### Step 3: Commit Migration

```bash
git add index.html
git commit -m "chore: add deployedAt dates to all templates for sorting"
git push
```

### Step 4: Future Additions

From now on, always include `deployedAt` when adding new templates.

---

## Troubleshooting

### Problem: Badge Not Appearing

**Symptoms**: New template added but no "novo" badge visible

**Checklist**:
1. ✅ Did you add `deployedAt` field?
2. ✅ Is `deployedAt` in correct format (`"YYYY-MM-DD"`)?
3. ✅ Is `deployedAt` the newest date in the company array?
4. ✅ Did you clear browser cache? (Hard refresh: Ctrl+Shift+R / Cmd+Shift+R)

**Debug**:
```javascript
// Open browser console (F12)
// Check sorted templates
const sorted = getSortedTemplates("consulfarma");
console.log(sorted);  // Should show newest first

// Check newest template
const newest = getNewestTemplate("consulfarma");
console.log(newest);  // Should be your new template
```

---

### Problem: Badge on Wrong Template

**Symptoms**: Badge appears on old template, not new one

**Cause**: New template has older `deployedAt` date

**Fix**:
```javascript
// Check dates
consulfarma: [
  {
    name: "old_template",
    deployedAt: "2026-01-28"  // ← Newest date → gets badge
  },
  {
    name: "new_template",
    deployedAt: "2026-01-20"  // ← Older date → no badge
  }
]

// Correct the date
{
  name: "new_template",
  deployedAt: "2026-01-29"  // ← Update to today
}
```

---

### Problem: Multiple Badges Visible

**Symptoms**: More than one template per company shows "novo" badge

**Cause**: Browser cached old version

**Fix**:
```bash
# Hard refresh browser
Ctrl + Shift + R  (Windows/Linux)
Cmd + Shift + R   (Mac)

# Or clear cache manually
Browser Settings → Privacy → Clear Cache → Reload page
```

**Verify Logic**:
- Only **one** template per company should have badge
- Badge determined by highest `deployedAt` value
- If tied (same date), first in array gets badge

---

### Problem: Templates Not Sorting

**Symptoms**: Templates appear in wrong order (not newest first)

**Checklist**:
1. ✅ Are all templates in the company missing `deployedAt`? (If so, uses array order)
2. ✅ Are dates in correct format? (Invalid dates sort to end)
3. ✅ Did you hard refresh? (Ctrl+Shift+R)

**Debug**:
```javascript
// Check raw template data
console.log(TEMPLATES.consulfarma);

// Check sorted output
console.log(getSortedTemplates("consulfarma"));
```

---

## Best Practices

### ✅ DO

- **Add `deployedAt` with today's date** (`"YYYY-MM-DD"`) when creating template
- **Use correct date format** (YYYY-MM-DD, e.g., "2026-01-28")
- **Keep dates accurate** (reflects actual deployment date)
- **Test locally first** (open `index.html` in browser before pushing)
- **Commit with descriptive message** (e.g., "feat: add new onboarding template")

### ❌ DON'T

- **Don't forget `deployedAt`** (template will sort to end, no badge)
- **Don't use wrong format** (e.g., `"01/28/2026"` or `"2026/01/28"` won't sort correctly)
- **Don't manually manage badge** (system handles it automatically based on dates)
- **Don't reorder array manually** (sorting is automatic based on deployedAt)
- **Don't backdate new templates** (defeats purpose of "new" badge)

---

## Deployment Checklist

Use this checklist when adding a new template:

```markdown
- [ ] Open index.html
- [ ] Locate TEMPLATES object
- [ ] Find correct company array (consulfarma, icosmetologia, etc.)
- [ ] Add new template object with:
  - [ ] name: "template_identifier"
  - [ ] message: "Template content with {{placeholders}}"
  - [ ] deployedAt: "YYYY-MM-DD" (today's date)
- [ ] Save file
- [ ] Test locally (open index.html in browser)
  - [ ] Navigate to company tab
  - [ ] Verify new template appears first
  - [ ] Verify "novo" badge visible on new template
  - [ ] Verify old templates no longer have badge
- [ ] Commit changes: git add index.html && git commit -m "feat: add [template_name]"
- [ ] Push to remote: git push origin 001-template-catalog-react
- [ ] Verify deployment (if auto-deploy enabled)
- [ ] Test production site (same checks as local)
```

---

## Advanced: Bulk Template Import

If adding many templates at once (e.g., 10+ templates):

### Step 1: Prepare Template Data

Create a CSV or spreadsheet:

| name | message | deployedAt |
|------|---------|-----------|
| template_1 | Message 1... | 2026-01-01 |
| template_2 | Message 2... | 2026-01-15 |
| template_3 | Message 3... | 2026-01-28 |

### Step 2: Convert to JavaScript

Use a script or manually format:

```javascript
const newTemplates = [
  { name: "template_1", message: "Message 1...", deployedAt: "2026-01-01" },
  { name: "template_2", message: "Message 2...", deployedAt: "2026-01-15" },
  { name: "template_3", message: "Message 3...", deployedAt: "2026-01-28" }
];
```

### Step 3: Append to Company Array

```javascript
consulfarma: [
  // Existing templates...
  ...newTemplates  // Spread new templates
]
```

### Step 4: Verify

- Check sorting (newest first)
- Check badge (only on most recent: 2026-01-28)

---

## FAQ

### Q: Can I change the badge text from "novo"?

**A**: Yes, edit CSS:
```css
.badge-new::after {
  content: "new";  /* or "recente", "✨", etc. */
}
```

Or change HTML rendering in `createTemplateCard()` function.

---

### Q: Can I show badge for X days only?

**A**: Not currently supported. Badge always shows on newest template. To implement:

```javascript
function isNewTemplate(template, companyKey) {
  const newest = getNewestTemplate(companyKey);
  if (template !== newest) return false;

  // Check if template is <7 days old
  const createdDate = new Date(template.deployedAt);
  const now = new Date();
  const daysSinceCreated = (now - createdDate) / (1000 * 60 * 60 * 24);

  return daysSinceCreated <= 7;  // Badge for 7 days only
}
```

---

### Q: Can I have badges on top 3 newest templates?

**A**: Yes, modify logic:

```javascript
function getNewestTemplates(companyKey, count = 3) {
  const sorted = getSortedTemplates(companyKey);
  return sorted.slice(0, count);  // Top 3 newest
}

function isNewTemplate(template, companyKey) {
  const topThree = getNewestTemplates(companyKey, 3);
  return topThree.includes(template);
}
```

---

### Q: What if I delete a template?

**A**: Just remove the object from the array. Badge automatically moves to next newest template.

```javascript
// Before: 3 templates
consulfarma: [
  { name: "T1", deployedAt: "2026-01-28" },  // Badge
  { name: "T2", deployedAt: "2026-01-20" },
  { name: "T3", deployedAt: "2026-01-15" }
]

// After: Delete T1
consulfarma: [
  { name: "T2", deployedAt: "2026-01-20" },  // Badge moves here automatically
  { name: "T3", deployedAt: "2026-01-15" }
]
```

---

### Q: Can I manually override which template gets the badge?

**A**: Not recommended (defeats automatic system), but possible:

```javascript
// Add this override in rendering logic
const MANUAL_BADGE_OVERRIDES = {
  consulfarma: "specific_template_name"  // Force badge on this template
};

function isNewTemplate(template, companyKey) {
  const override = MANUAL_BADGE_OVERRIDES[companyKey];
  if (override) return template.name === override;

  // Fall back to automatic logic
  const newest = getNewestTemplate(companyKey);
  return template === newest;
}
```

---

## Performance Notes

### Expected Performance

| Action | Time | Notes |
|--------|------|-------|
| Sort 50 templates | <2ms | Per company, on tab switch |
| Render 50 cards | <10ms | Includes badge computation |
| Total tab switch | <20ms | Perceived as instant |

### Optimization (if >500 templates per company)

**Pre-sort on page load** (sort once, render many times):

```javascript
// Run once on page load
const SORTED_TEMPLATES = {};
Object.keys(TEMPLATES).forEach(companyKey => {
  SORTED_TEMPLATES[companyKey] = getSortedTemplates(companyKey);
});

// Use pre-sorted data
function renderTemplatesForCompany(companyKey) {
  const sorted = SORTED_TEMPLATES[companyKey];  // Already sorted
  // Render...
}
```

**Trade-off**: Mutates data on load, but reduces per-render cost.

---

## References

- **Research decisions**: [research-template-sorting.md](./research-template-sorting.md)
- **Data model**: [data-model-sorting.md](./data-model-sorting.md)
- **API contracts**: [contracts/template-sorting-api.md](./contracts/template-sorting-api.md)
- **Feature spec**: [spec.md](./spec.md)
- **Implementation plan**: [plan.md](./plan.md)

---

## Support

### Reporting Issues

If you encounter problems:

1. Check [Troubleshooting](#troubleshooting) section above
2. Verify template format (name, message, deployedAt all present)
3. Hard refresh browser (Ctrl+Shift+R)
4. Open browser console (F12) for error messages
5. Report issue with:
   - Template data (redact sensitive info)
   - Console errors (screenshot)
   - Expected vs actual behavior

### Contact

- GitHub Issues: [templates-usuarios/issues](https://github.com/your-org/templates-usuarios/issues)
- Project maintainer: [Your contact info]

---

**Status**: ✅ Quickstart Complete | **Last Updated**: 2026-01-28
