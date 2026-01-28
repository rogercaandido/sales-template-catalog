# API Contract: Template Sorting & Badge System

**Feature**: Template sorting by date + automatic "new" badge on latest template
**Date**: 2026-01-28
**Status**: Planning Complete

---

## Overview

This document defines the public API contracts for the template sorting and badge system. Since this is a client-side application with no backend, "API" refers to internal JavaScript functions that other parts of the codebase may depend on.

---

## Data Structures

### Template Interface

```typescript
interface Template {
  name: string;           // Template identifier (required)
  message: string;        // Template message content (required)
  deployedAt?: string;     // ISO date string YYYY-MM-DD (optional)
}
```

**Contract Guarantees**:
- `name`: Always non-empty string
- `message`: Always non-empty string
- `deployedAt`: May be `undefined` (treated as oldest)

---

## Core Functions

### 1. `getSortedTemplates(companyKey: string): Template[]`

Returns templates for a company sorted by date (newest first).

**Input**:
```typescript
companyKey: string  // One of: "consulfarma" | "icosmetologia" | "hinutrition" | "seminariosconsulfarma"
```

**Output**:
```typescript
Template[]  // Sorted DESC by deployedAt (newest first)
```

**Behavior**:
- Clones original template array (does not mutate)
- Sorts DESC by `deployedAt` field (lexicographic comparison)
- Templates without `deployedAt` sort to end (oldest)
- Stable sort: ties preserve original array order
- Returns empty array if `companyKey` invalid or company has no templates

**Example**:
```javascript
const sorted = getSortedTemplates("consulfarma");
// Returns:
// [
//   { name: "newest", message: "...", deployedAt: "2026-01-28" },
//   { name: "older", message: "...", deployedAt: "2026-01-20" },
//   { name: "oldest", message: "...", deployedAt: "2026-01-15" }
// ]
```

**Implementation Signature**:
```javascript
function getSortedTemplates(companyKey) {
  const templates = TEMPLATES[companyKey];
  if (!templates || templates.length === 0) return [];

  return [...templates].sort((a, b) => {
    const dateA = a.deployedAt || "";
    const dateB = b.deployedAt || "";
    return dateB.localeCompare(dateA); // DESC: newest first
  });
}
```

**Contract**:
- ✅ Non-destructive (original `TEMPLATES` object unchanged)
- ✅ Always returns new array (safe to mutate result)
- ✅ Deterministic (same input → same output)
- ✅ O(n log n) complexity (acceptable for <1000 templates)

---

### 2. `getNewestTemplate(companyKey: string): Template | null`

Returns the newest template for a company (used for badge determination).

**Input**:
```typescript
companyKey: string  // Company identifier
```

**Output**:
```typescript
Template | null  // Newest template or null if company empty
```

**Behavior**:
- Returns template with highest `deployedAt` value
- Returns first template if all have same/missing `deployedAt`
- Returns `null` if company has 0 templates
- Does not mutate original data

**Example**:
```javascript
const newest = getNewestTemplate("consulfarma");
// Returns: { name: "template_v5", message: "...", deployedAt: "2026-01-28" }

const noTemplates = getNewestTemplate("nonexistent");
// Returns: null
```

**Implementation Signature**:
```javascript
function getNewestTemplate(companyKey) {
  const sorted = getSortedTemplates(companyKey);
  return sorted.length > 0 ? sorted[0] : null;
}
```

**Contract**:
- ✅ Returns same object reference as in `TEMPLATES` (identity check works)
- ✅ Returns `null` for invalid/empty companies (not `undefined`)
- ✅ Consistent with `getSortedTemplates()` (first item in sorted array)

---

### 3. `isNewTemplate(template: Template, companyKey: string): boolean`

Determines if a template should display the "new" badge.

**Input**:
```typescript
template: Template     // Template to check
companyKey: string     // Company context for comparison
```

**Output**:
```typescript
boolean  // true if template is newest in company, false otherwise
```

**Behavior**:
- Returns `true` if `template` is newest in its company
- Uses object identity check (`template === newest`)
- Returns `false` if company empty or template not in company

**Example**:
```javascript
const template = TEMPLATES.consulfarma[0];
const isNew = isNewTemplate(template, "consulfarma");
// Returns: true (if template is newest) or false

const otherCompanyTemplate = TEMPLATES.icosmetologia[0];
const isNew2 = isNewTemplate(otherCompanyTemplate, "consulfarma");
// Returns: false (template not in Consulfarma)
```

**Implementation Signature**:
```javascript
function isNewTemplate(template, companyKey) {
  const newest = getNewestTemplate(companyKey);
  return newest !== null && template === newest;
}
```

**Contract**:
- ✅ Uses identity check (`===`) not equality check (works with object references)
- ✅ Returns `false` for null/invalid inputs (safe defaults)
- ✅ Per-company scope (each company has independent newest)

---

### 4. `validateTemplate(template: Template): string[]`

Validates template structure and returns list of errors.

**Input**:
```typescript
template: Template  // Template to validate
```

**Output**:
```typescript
string[]  // Array of error messages (empty if valid)
```

**Behavior**:
- Checks required fields (`name`, `message`)
- Validates `deployedAt` format (YYYY-MM-DD)
- Returns empty array if valid
- Non-blocking (warnings only)

**Example**:
```javascript
const valid = { name: "T1", message: "Hello", deployedAt: "2026-01-28" };
validateTemplate(valid);
// Returns: []

const invalid = { name: "", message: "Hello", deployedAt: "2026-13-45" };
validateTemplate(invalid);
// Returns: [
//   "Template missing 'name' field",
//   "Invalid deployedAt format '2026-13-45'. Expected YYYY-MM-DD."
// ]
```

**Implementation Signature**:
```javascript
function validateTemplate(template) {
  const errors = [];

  if (!template.name || template.name.trim() === "") {
    errors.push("Template missing 'name' field");
  }

  if (!template.message || template.message.trim() === "") {
    errors.push("Template missing 'message' field");
  }

  if (template.deployedAt) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(template.deployedAt)) {
      errors.push(
        `Invalid deployedAt format '${template.deployedAt}'. Expected YYYY-MM-DD.`
      );
    }
  }

  return errors;
}
```

**Contract**:
- ✅ Non-blocking (never throws errors)
- ✅ Returns human-readable error messages
- ✅ Empty array = valid template

---

## Rendering Functions

### 5. `renderTemplatesForCompany(companyKey: string): void`

Renders templates for a company with sorting and badge logic applied.

**Input**:
```typescript
companyKey: string  // Company identifier
```

**Output**:
```typescript
void  // Mutates DOM (side effect)
```

**Behavior**:
1. Fetch sorted templates via `getSortedTemplates(companyKey)`
2. Identify newest template via `getNewestTemplate(companyKey)`
3. Render each template card with badge if newest
4. Update DOM with rendered cards

**Example Usage**:
```javascript
// User clicks "Consulfarma" tab
renderTemplatesForCompany("consulfarma");
// DOM now shows:
// - Template cards sorted newest → oldest
// - "novo" badge on newest template only
```

**Implementation Signature**:
```javascript
function renderTemplatesForCompany(companyKey) {
  const sorted = getSortedTemplates(companyKey);
  const newest = getNewestTemplate(companyKey);

  const gridContainer = document.querySelector(".grid");
  gridContainer.innerHTML = ""; // Clear existing cards

  sorted.forEach(template => {
    const isNew = (template === newest);
    const cardElement = createTemplateCard(template, isNew);
    gridContainer.appendChild(cardElement);
  });
}
```

**Contract**:
- ✅ Idempotent (calling multiple times with same input produces same output)
- ✅ Clears existing cards before rendering (no duplication)
- ✅ Handles empty companies gracefully (renders nothing)

---

### 6. `createTemplateCard(template: Template, isNew: boolean): HTMLElement`

Creates a template card DOM element with optional badge.

**Input**:
```typescript
template: Template  // Template data
isNew: boolean      // Whether to show "novo" badge
```

**Output**:
```typescript
HTMLElement  // <div class="card"> element
```

**Behavior**:
- Creates card with title, message, and optional badge
- Adds click handler for clipboard copy
- Applies theme color via CSS variables
- Handles long messages with scrollbar

**Example**:
```javascript
const template = { name: "T1", message: "Hello", deployedAt: "2026-01-28" };
const cardElement = createTemplateCard(template, true);
// Returns:
// <div class="card">
//   <div class="card-title">T1</div>
//   <span class="badge-new">novo</span>
//   <div class="card-message">Hello</div>
// </div>
```

**Implementation Signature**:
```javascript
function createTemplateCard(template, isNew) {
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
    badge.setAttribute("role", "status");
    badge.setAttribute("aria-label", "Novo template");
    card.appendChild(badge);
  }

  // Message
  const message = document.createElement("div");
  message.className = "card-message";
  message.textContent = template.message;
  card.appendChild(message);

  // Click handler (clipboard copy)
  card.addEventListener("click", () => copyToClipboard(template.name));

  return card;
}
```

**Contract**:
- ✅ Returns new DOM element (safe to append)
- ✅ Badge appears only if `isNew === true`
- ✅ Accessible (ARIA labels on badge)
- ✅ Click handler attached

---

## Utility Functions

### 7. `validateDateFormat(dateString: string): boolean`

Validates ISO date string format.

**Input**:
```typescript
dateString: string  // Date to validate
```

**Output**:
```typescript
boolean  // true if valid YYYY-MM-DD format
```

**Example**:
```javascript
validateDateFormat("2026-01-28");  // true
validateDateFormat("2026-13-45");  // false (invalid month/day)
validateDateFormat("26-01-28");    // false (2-digit year)
validateDateFormat("2026/01/28");  // false (wrong separator)
```

**Implementation Signature**:
```javascript
function validateDateFormat(dateString) {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  return dateRegex.test(dateString);
}
```

---

## Events

### Template Card Click Event

**Trigger**: User clicks template card

**Handler**:
```javascript
card.addEventListener("click", () => {
  copyToClipboard(template.name);
  showToast(`✓ Copiado: ${template.name}`);
});
```

**Behavior**:
- Copies template name to clipboard
- Shows success toast notification
- Does not trigger badge recalculation (badge is render-time only)

---

## CSS Classes

### Badge Styling Contract

**Class**: `.badge-new`

**Expected Structure**:
```html
<span class="badge-new" role="status" aria-label="Novo template">
  novo
</span>
```

**CSS Contract**:
```css
.badge-new {
  display: inline-block;
  padding: 2px 6px;
  background-color: var(--theme-color-bg);  /* Company theme /10 */
  border: 1px solid var(--theme-color);     /* Company theme color */
  border-radius: 2px;
  color: var(--theme-color);
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: lowercase;
  letter-spacing: 0.025em;
  margin-top: 4px;
}
```

**Contract Guarantees**:
- Badge inherits company theme via CSS variables
- Badge appears below card title (within card flex layout)
- Badge does not break card layout on mobile (320px+)

---

## Error Handling

### Invalid Company Key

```javascript
getSortedTemplates("nonexistent");
// Returns: [] (empty array, not null)

getNewestTemplate("nonexistent");
// Returns: null

isNewTemplate(template, "nonexistent");
// Returns: false
```

### Missing `deployedAt` Field

```javascript
const template = { name: "T1", message: "Hello" };  // No deployedAt
getSortedTemplates("consulfarma");
// Behavior: Template sorts to end (treated as oldest)
// No errors thrown
```

### Invalid `deployedAt` Format

```javascript
const template = { name: "T1", message: "Hello", deployedAt: "invalid" };
getSortedTemplates("consulfarma");
// Behavior: Template sorts to end (invalid date treated as empty string)
// Warning logged to console (non-blocking)
```

---

## Performance Contracts

### Time Complexity

| Function | Complexity | Expected Time (50 templates) |
|----------|------------|------------------------------|
| `getSortedTemplates()` | O(n log n) | <2ms |
| `getNewestTemplate()` | O(n log n) | <2ms (calls getSortedTemplates) |
| `isNewTemplate()` | O(n log n) | <2ms (calls getNewestTemplate) |
| `renderTemplatesForCompany()` | O(n log n) | <10ms (includes DOM ops) |

### Space Complexity

| Function | Space | Notes |
|----------|-------|-------|
| `getSortedTemplates()` | O(n) | Clones template array |
| `getNewestTemplate()` | O(n) | Calls getSortedTemplates (clone) |
| `renderTemplatesForCompany()` | O(n) | Creates DOM nodes for each template |

---

## Testing Contracts

### Unit Test Expectations

**Test: Sorting Order**
```javascript
// Given
const templates = [
  { name: "T1", deployedAt: "2026-01-10" },
  { name: "T2", deployedAt: "2026-01-25" },
  { name: "T3", deployedAt: "2026-01-15" }
];
TEMPLATES.test = templates;

// When
const sorted = getSortedTemplates("test");

// Then
expect(sorted[0].name).toBe("T2");  // Newest first
expect(sorted[1].name).toBe("T3");
expect(sorted[2].name).toBe("T1");  // Oldest last
```

**Test: Badge Assignment**
```javascript
// Given
const newest = getNewestTemplate("test");

// When
const isNew1 = isNewTemplate(templates[1], "test");  // T2 (newest)
const isNew2 = isNewTemplate(templates[0], "test");  // T1 (oldest)

// Then
expect(isNew1).toBe(true);   // T2 gets badge
expect(isNew2).toBe(false);  // T1 no badge
```

**Test: Missing Dates**
```javascript
// Given
const templatesWithMissingDates = [
  { name: "T1", deployedAt: "2026-01-20" },
  { name: "T2" },  // No date
  { name: "T3", deployedAt: "2026-01-25" }
];
TEMPLATES.test = templatesWithMissingDates;

// When
const sorted = getSortedTemplates("test");

// Then
expect(sorted[0].name).toBe("T3");  // Newest (2026-01-25)
expect(sorted[1].name).toBe("T1");  // Older (2026-01-20)
expect(sorted[2].name).toBe("T2");  // No date → oldest
```

---

## Breaking Changes

### What Breaks This API

❌ **Breaking Changes** (would require API update):
- Changing `deployedAt` field name to `publishedAt` (field rename)
- Changing date format from YYYY-MM-DD to Unix timestamp (format change)
- Changing badge scope from per-company to global (logic change)
- Changing sort order from DESC to ASC (behavior change)

✅ **Non-Breaking Changes** (backward compatible):
- Adding new optional fields to Template (e.g., `updatedAt`, `tags`)
- Adding new companies to `TEMPLATES` object
- Changing badge CSS styles (visual only)
- Adding validation warnings (non-blocking)

---

## Versioning

**Current Version**: v1.0.0 (initial implementation)

**Semantic Versioning Contract**:
- **Major** (X.0.0): Breaking API changes (see above)
- **Minor** (1.X.0): New features, backward compatible (e.g., add updatedAt field)
- **Patch** (1.0.X): Bug fixes, no API changes (e.g., fix date parsing edge case)

---

## References

- Feature specification: [spec.md](../spec.md)
- Technical research: [research-template-sorting.md](../research-template-sorting.md)
- Data model: [data-model-sorting.md](../data-model-sorting.md)
- Current implementation: [index.html](../../../index.html)

---

**Status**: ✅ API Contract Complete | **Next Step**: Generate quickstart.md
