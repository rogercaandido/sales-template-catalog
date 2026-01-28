# Data Model: Template Sorting & "New" Badge System

**Feature**: Template sorting by date + automatic "new" badge on latest template
**Date**: 2026-01-28
**Status**: Planning Complete

---

## Overview

This document defines the data structures and relationships for implementing template sorting and automatic badge management.

---

## Core Entities

### Template (Updated Schema)

Represents a sales template message with metadata for sorting and badge display.

**Schema**:
```typescript
interface Template {
  name: string;           // Template identifier (e.g., "start_x_csf_ia_v1")
  message: string;        // Template message content (supports {{placeholders}})
  deployedAt: string;      // ISO date string (YYYY-MM-DD format) - NEW FIELD
}
```

**Field Definitions**:

| Field | Type | Required | Constraints | Description |
|-------|------|----------|-------------|-------------|
| `name` | `string` | ✅ Yes | Non-empty, unique per company | Template identifier used for clipboard copy |
| `message` | `string` | ✅ Yes | Non-empty | Template message content (supports {{1}}, {{2}} placeholders) |
| `deployedAt` | `string` | ❌ No | ISO 8601 timestamp | Deployment timestamp for sorting (auto-generated via localStorage) |

**Validation Rules**:
- `name`: Must be unique within company (no duplicates in same array)
- `message`: No validation (allows emojis, special chars, multiline)
- `deployedAt`:
  - Format: ISO 8601 timestamp (e.g., `"2026-01-28T14:00:00Z"`)
  - Validation: Regex `^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$`
  - Missing: Auto-generated on first render via localStorage
  - Auto-stamped: System detects missing field and injects `new Date().toISOString()`
  - Invalid: Log warning, treat as oldest

**Example**:
```javascript
{
  name: "start_x_csf_ia_v1",
  message: "Oi {{1}}! Sou a Mind, sua assistente virtual da *Consulfarma* 😃",
  deployedAt: "2026-01-28T14:00:00Z"  // Auto-generated via localStorage
}
```

**Backward Compatibility**:
- Existing templates without `deployedAt` → auto-stamped on first render
- No manual migration needed: System handles timestamp injection automatically
- Legacy templates: Sort alphabetically by name at end of list (after dated templates)

---

### Company Template Collection

Represents all templates for a single company.

**Schema**:
```typescript
interface CompanyTemplates {
  [companyKey: string]: Template[];
}
```

**Current Companies**:
- `consulfarma`: Consulfarma templates
- `icosmetologia`: ICosmetologia templates
- `hinutrition`: Hi Nutrition templates
- `seminariosconsulfarma`: Seminários Consulfarma templates

**Example**:
```javascript
const TEMPLATES = {
  consulfarma: [
    {
      name: "template_v5",
      message: "Latest template...",
      deployedAt: "2026-01-28"  // Newest (badge: yes)
    },
    {
      name: "template_v4",
      message: "Previous template...",
      deployedAt: "2026-01-20"  // Older (badge: no)
    },
    {
      name: "template_v3",
      message: "Old template...",
      deployedAt: "2026-01-15"  // Oldest (badge: no)
    }
  ],
  icosmetologia: [
    // ...
  ]
};
```

**Constraints**:
- Each company array: 0-500 templates (soft limit)
- Template names unique within company (not across companies)
- Array order: **No longer matters** (sorting computed at render time)

---

## Computed Properties

### "New" Badge Status

Not stored in data model. Computed at render time based on `deployedAt` field.

**Algorithm**:
```javascript
function getSortedTemplates(companyKey) {
  const templates = TEMPLATES[companyKey];
  if (!templates || templates.length === 0) return [];

  // Partition: with deployedAt vs without deployedAt
  const withDate = templates.filter(t => t.deployedAt);
  const withoutDate = templates.filter(t => !t.deployedAt);

  // Sort templates WITH date DESC (newest first)
  withDate.sort((a, b) => b.deployedAt.localeCompare(a.deployedAt));

  // Sort templates WITHOUT date alphabetically by name (A-Z)
  withoutDate.sort((a, b) => a.name.localeCompare(b.name));

  // Concatenate: [dated DESC] + [undated A-Z]
  return [...withDate, ...withoutDate];
}

function getNewestTemplate(companyKey) {
  const templates = TEMPLATES[companyKey];

  // Only consider templates WITH deployedAt
  const withDate = templates.filter(t => t.deployedAt);

  if (withDate.length === 0) {
    return null; // No badge if all templates lack date
  }

  // Return template with highest deployedAt
  return withDate.reduce((newest, t) =>
    t.deployedAt > newest.deployedAt ? t : newest
  );
}

function isNewTemplate(template, companyKey) {
  const newest = getNewestTemplate(companyKey);
  return newest !== null && template === newest;
}
```

**Logic**:
- **Newest template** = template with highest `deployedAt` value (lexicographic comparison)
- **Badge** = appears only on newest template per company
- **Ties** = if multiple templates have same `deployedAt`, first in original array gets badge

**Edge Cases**:
| Scenario | Behavior |
|----------|----------|
| No `deployedAt` on any template | First template in array gets badge (fallback) |
| All templates same date | First in array gets badge (stable sort) |
| Empty company (0 templates) | No badge rendered |
| Invalid date format | Treated as oldest (empty string in sort) |

---

## Data Relationships

### Entity Relationship Diagram

```
TEMPLATES (object)
    │
    ├── consulfarma (array)
    │       ├── Template 1 { name, message, deployedAt }
    │       ├── Template 2 { name, message, deployedAt }
    │       └── Template N { name, message, deployedAt }
    │
    ├── icosmetologia (array)
    │       └── Template 1..N
    │
    ├── hinutrition (array)
    │       └── Template 1..N
    │
    └── seminariosconsulfarma (array)
            └── Template 1..N

Each company array:
  - Independently sorted at render time
  - First item after sort = newest → gets badge
  - No cross-company relationships
```

**Key Points**:
- **No relational database** (flat in-memory structure)
- **No foreign keys** (companies isolated)
- **No shared templates** (each company has distinct set)
- **No template IDs** (name is unique identifier within company)

---

## State Management

### Runtime State (In-Memory)

**Original Data** (immutable):
```javascript
const TEMPLATES = { /* ... */ };  // Never modified
```

**Sorted View** (ephemeral, computed on demand):
```javascript
function renderTemplatesForCompany(companyKey) {
  const originalTemplates = TEMPLATES[companyKey];

  // Clone and sort (does not mutate original)
  const sortedTemplates = [...originalTemplates].sort((a, b) =>
    (b.deployedAt || "").localeCompare(a.deployedAt || "")
  );

  // Render with badge info
  const newestTemplate = sortedTemplates[0];
  sortedTemplates.forEach(template => {
    const isNew = (template === newestTemplate);
    renderTemplateCard(template, isNew);
  });
}
```

**No Persistence**:
- Sorted order not stored (recomputed on tab switch)
- Badge status not stored (recomputed on render)
- No localStorage, sessionStorage, or cookies

---

## Data Validation

### Template Validation

**Client-side validation** (defensive programming):

```javascript
function validateTemplate(template, companyKey, index) {
  const errors = [];

  // Required fields
  if (!template.name || template.name.trim() === "") {
    errors.push(`Template ${index} in ${companyKey}: missing 'name' field`);
  }

  if (!template.message || template.message.trim() === "") {
    errors.push(`Template ${index} in ${companyKey}: missing 'message' field`);
  }

  // Optional field validation
  if (template.deployedAt) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(template.deployedAt)) {
      console.warn(
        `Template "${template.name}" in ${companyKey}: invalid deployedAt format "${template.deployedAt}". ` +
        `Expected YYYY-MM-DD. Template will sort as oldest.`
      );
    }
  }

  return errors;
}

// Run validation on page load (development mode)
function validateAllTemplates() {
  const allErrors = [];
  Object.keys(TEMPLATES).forEach(companyKey => {
    TEMPLATES[companyKey].forEach((template, index) => {
      const errors = validateTemplate(template, companyKey, index);
      allErrors.push(...errors);
    });
  });

  if (allErrors.length > 0) {
    console.error("Template validation errors:", allErrors);
  }

  return allErrors.length === 0;
}
```

**Validation Timing**:
- Run on page load (development builds)
- Log warnings/errors to console (not user-facing)
- Non-blocking (app still renders even with warnings)

---

## Migration Path

### Phase 1: Auto-Stamp Missing `deployedAt` (Automatic via localStorage)

**Goal**: Automatically detect and timestamp templates on first render without manual intervention.

**Strategy**: Use localStorage to persist timestamps across page reloads. System auto-detects templates without cached timestamps and stamps them on first access.

**Implementation**:
```javascript
// System automatically runs on page load
function initializeDeploymentTimestamps() {
  const CACHE_KEY = 'template_deployment_timestamps';
  const cache = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');

  Object.keys(TEMPLATES).forEach(companyKey => {
    TEMPLATES[companyKey].forEach(template => {
      const key = `${companyKey}:${template.name}`;

      if (!cache[key]) {
        // First time seeing this template = deployment time
        cache[key] = new Date().toISOString();
      }

      // Inject timestamp into template object
      template.deployedAt = cache[key];
    });
  });

  // Persist cache back to localStorage
  localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
}

// Call on DOMContentLoaded
initializeDeploymentTimestamps();
```

**Outcome**:
```javascript
// Before auto-stamp (source code)
{ name: "template_v1", message: "..." }

// After auto-stamp (runtime, in memory)
{ name: "template_v1", message: "...", deployedAt: "2026-01-28T14:35:22.123Z" }
```

**Behavior**:
- **First user visit**: Template gets stamped with current timestamp, saved to localStorage
- **Subsequent visits**: Template loads cached timestamp (consistent across reloads)
- **New deploy**: New templates auto-detected, stamped with current time
- **localStorage cleared**: Templates re-stamped (acceptable edge case)

### Phase 2: Update Rendering Logic

**Changes**:
1. Clone template array before rendering
2. Sort cloned array DESC by `deployedAt`
3. Identify first template in sorted array as newest
4. Pass `isNew` flag to card renderer
5. Render badge if `isNew === true`

### Phase 3: Document Deployment Workflow

**Update documentation**:
- CLAUDE.md: Add `deployedAt` to template schema
- quickstart.md: Add deployment checklist (include date when adding template)
- README.md: Explain badge behavior

---

## Data Examples

### Complete Example (All Companies)

```javascript
const TEMPLATES = {
  consulfarma: [
    {
      name: "start_x_csf_ia_v1",
      message: "Oi {{1}}! Sou a Mind, sua assistente virtual da *Consulfarma* 😃",
      deployedAt: "2026-01-28"  // ← NEWEST (gets badge)
    },
    {
      name: "start_x_geral_csf_v2",
      message: "Oi, {{1}}! Preparei algumas informações que podem te interessar.",
      deployedAt: "2026-01-20"  // Older (no badge)
    },
    {
      name: "retomada_x_geral_csf_v2",
      message: "Oi {{1}}! Notei que nossa última conversa ficou pendente.",
      deployedAt: "2026-01-15"  // Oldest (no badge)
    }
  ],

  icosmetologia: [
    {
      name: "start_x_ico_ia_v1",
      message: "Olá {{1}}! Sou a assistente da *ICosmetologia*.",
      deployedAt: "2026-01-25"  // ← NEWEST FOR ICOSMETOLOGIA (gets badge)
    },
    {
      name: "retomada_x_ico_v1",
      message: "Oi {{1}}! Vamos retomar nossa conversa?",
      deployedAt: "2026-01-18"  // Older (no badge)
    }
  ],

  hinutrition: [
    {
      name: "start_x_hi_ia_v1",
      message: "Oi {{1}}! Sou a Mind, assistente da *Hi Nutrition*.",
      deployedAt: "2026-01-22"  // ← NEWEST FOR HI NUTRITION (gets badge)
    }
  ],

  seminariosconsulfarma: [
    {
      name: "start_x_seminarios_v1",
      message: "Olá {{1}}! Bem-vindo ao *Seminários Consulfarma*.",
      deployedAt: "2026-01-10"  // ← NEWEST FOR SEMINÁRIOS (gets badge)
    }
  ]
};
```

**Result**:
- Consulfarma tab: "start_x_csf_ia_v1" shows badge (newest: 2026-01-28)
- ICosmetologia tab: "start_x_ico_ia_v1" shows badge (newest: 2026-01-25)
- Hi Nutrition tab: "start_x_hi_ia_v1" shows badge (newest: 2026-01-22)
- Seminários tab: "start_x_seminarios_v1" shows badge (newest: 2026-01-10)

---

## Performance Characteristics

### Data Size

**Current State**:
- 4 companies
- ~6-20 templates per company
- Total: ~60-80 templates

**Expected Growth**:
- 10 companies (future)
- ~50 templates per company (future)
- Total: ~500 templates (5-10 year horizon)

**Memory Footprint**:
```
Single template: ~200 bytes (name + message + date)
500 templates: ~100 KB (negligible)
```

### Sort Performance

**Complexity**: O(n log n) per company

**Benchmarks**:
| Templates per Company | Sort Time | Badge Computation |
|-----------------------|-----------|-------------------|
| 20 (current) | <1ms | <0.1ms |
| 50 (expected) | ~2ms | <0.1ms |
| 500 (max) | ~15ms | <0.1ms |

**Optimization**: None needed (instant for <1000 templates)

---

## Testing Data

### Test Case 1: Normal Sorting

```javascript
const testTemplates = [
  { name: "T1", message: "First", deployedAt: "2026-01-10" },
  { name: "T2", message: "Second", deployedAt: "2026-01-25" },  // ← Should get badge
  { name: "T3", message: "Third", deployedAt: "2026-01-15" }
];

// After sort: [T2, T3, T1]
// Badge on: T2 (newest: 2026-01-25)
```

### Test Case 2: Missing Dates

```javascript
const testTemplates = [
  { name: "T1", message: "First" },                             // No date → oldest
  { name: "T2", message: "Second", deployedAt: "2026-01-20" },  // ← Should get badge
  { name: "T3", message: "Third" }                              // No date → oldest
];

// After sort: [T2, T1, T3]
// Badge on: T2 (only one with date)
```

### Test Case 3: All Same Date (Tie)

```javascript
const testTemplates = [
  { name: "T1", message: "First", deployedAt: "2026-01-20" },  // ← Badge (first in array)
  { name: "T2", message: "Second", deployedAt: "2026-01-20" },
  { name: "T3", message: "Third", deployedAt: "2026-01-20" }
];

// After stable sort: [T1, T2, T3] (order preserved)
// Badge on: T1 (first in original array)
```

### Test Case 4: Empty Company

```javascript
const testTemplates = [];

// After sort: []
// Badge on: (none - no templates to render)
```

---

## Future Data Model Extensions

### Potential Phase 2 Fields

**Template Analytics**:
```javascript
{
  name: "template_v5",
  message: "...",
  deployedAt: "2026-01-28",
  updatedAt: "2026-01-30",     // Last modified date (for "updated" badge)
  usageCount: 142,              // Click/copy count (for popularity sort)
  tags: ["onboarding", "ia"]    // Categorization (for filtering)
}
```

**Badge Configuration** (global settings):
```javascript
const BADGE_CONFIG = {
  showBadgeForDays: 7,          // Hide badge after 7 days
  badgeText: "novo",            // Customizable badge text
  enableBadge: true             // Global toggle
};
```

**Not Planned**:
- ❌ User-specific data (favorites, read status) - no auth system
- ❌ Version history (diffs, changelog) - Git handles this
- ❌ Template relationships (variants, A/B tests) - out of scope

---

## References

- Feature specification: [spec.md](./spec.md)
- Technical research: [research-template-sorting.md](./research-template-sorting.md)
- Current implementation: [index.html](../../index.html)

---

**Status**: ✅ Data Model Complete | **Next Step**: Generate API contracts
