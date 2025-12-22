# Data Model: Template Catalog for Sales Teams

**Feature**: 001-template-catalog-react
**Date**: 2025-12-22
**Status**: Complete

## Overview

This document defines the data structures used in the template catalog component. Since this is a single-file React component with no backend or database, all data is defined as in-memory JavaScript structures.

## Entities

### 1. Template Data Object

**Purpose**: Store all template names organized by company

**Structure**:
```javascript
const TEMPLATES = {
  consulfarma: string[],
  icosmetologia: string[],
  hinutrition: string[]
}
```

**Example**:
```javascript
const TEMPLATES = {
  consulfarma: [
    "Welcome Email Template",
    "Product Catalog 2024",
    "Monthly Newsletter"
  ],
  icosmetologia: [
    "Service Introduction",
    "Appointment Reminder",
    "Post-Treatment Follow-up"
  ],
  hinutrition: [
    "Nutrition Plan Template",
    "Supplement Guide",
    "Consultation Form"
  ]
};
```

**Validation Rules**:
- Each company key must exist (consulfarma, icosmetologia, hinutrition)
- Each company value must be an array of strings
- Template names should be non-empty strings
- Template names can contain any characters (including special chars, emojis)
- No uniqueness constraint across companies (same template name can exist in multiple companies)

**Update Pattern**:
```javascript
// To add a new template:
TEMPLATES.consulfarma.push("New Template Name");

// To edit a template:
TEMPLATES.consulfarma[0] = "Updated Name";

// To remove a template:
TEMPLATES.consulfarma.splice(index, 1);
```

---

### 2. Component State (React)

**Purpose**: Manage runtime state for active tab and toast notifications

**Active Tab State**:
```javascript
const [activeTab, setActiveTab] = useState('consulfarma');
// Type: string
// Valid values: 'consulfarma' | 'icosmetologia' | 'hinutrition'
// Default: 'consulfarma'
```

**Toast State**:
```javascript
const [toast, setToast] = useState({ visible: false, message: '' });
// Type: { visible: boolean, message: string }
// Default: { visible: false, message: '' }
```

**State Transitions**:
```
[Initial] -> activeTab: 'consulfarma', toast: { visible: false, message: '' }

[Tab Click] -> activeTab changes to clicked tab
[Card Click] -> toast: { visible: true, message: 'Template name copied!' }
[After 2s] -> toast: { visible: false, message: '' }
```

---

### 3. Company Configuration

**Purpose**: Define company metadata for tabs

**Structure**:
```javascript
const COMPANIES = [
  { id: 'consulfarma', label: 'Consulfarma' },
  { id: 'icosmetologia', label: 'ICosmetologia' },
  { id: 'hinutrition', label: 'Hi Nutrition' }
];
```

**Fields**:
- `id` (string): Unique identifier matching TEMPLATES keys
- `label` (string): Display name for tab

**Usage**: Iterate to render tabs dynamically

---

## Data Relationships

```
COMPANIES (config)
    |
    | 1:1 mapping via 'id'
    ↓
TEMPLATES (data)
  ├── consulfarma → Template[]
  ├── icosmetologia → Template[]
  └── hinutrition → Template[]
        ↑
        | filtered by activeTab
        |
Component State (activeTab)
```

## Data Flow

### 1. Initial Load
```
1. Component mounts
2. TEMPLATES object loaded into memory
3. State initialized: activeTab = 'consulfarma'
4. Render templates for 'consulfarma'
```

### 2. Tab Switch
```
User clicks tab → setActiveTab(newTab) → Component re-renders → Display TEMPLATES[newTab]
```

### 3. Template Copy
```
User clicks card
  → copyToClipboard(templateName)
  → navigator.clipboard.writeText(templateName)
  → setToast({ visible: true, message: 'Copied!' })
  → setTimeout(() => setToast({ visible: false, message: '' }), 2000)
```

## Edge Case Handling

### Empty Template Array
```javascript
// If TEMPLATES[company] is empty array:
if (TEMPLATES[activeTab].length === 0) {
  return <div>No templates available for this company</div>;
}
```

### Long Template Names
```javascript
// CSS handles with overflow:
const cardStyles = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
};
```

### Clipboard API Failure
```javascript
try {
  await navigator.clipboard.writeText(text);
  setToast({ visible: true, message: 'Copied to clipboard!' });
} catch (err) {
  setToast({ visible: true, message: 'Copy failed. Please try again.' });
}
```

### Rapid Clicks
```javascript
// Toast state simply updates - new toast replaces old:
// Click 1 → toast shows "Copied!"
// Click 2 (before timeout) → toast resets, shows "Copied!" again
// No queue needed - last click wins
```

## Data Constraints

| Constraint | Enforcement | Rationale |
|-----------|-------------|-----------|
| No persistence | Design decision | Templates managed via code edits |
| No API calls | Design decision | Self-contained component |
| No localStorage | Design decision | Framer Code constraint |
| Max ~100 templates/company | Soft limit | UI performance, no virtualization |
| Template names are strings | JavaScript type | Simplest data model |
| Company IDs hardcoded | Design decision | Fixed set of 3 companies |

## Sample Data for Testing

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

This sample data provides:
- Varied template counts (8-10 per company)
- Realistic template names for sales contexts
- Different naming patterns per company
- Sufficient data to test responsive grid (1-3 columns depending on viewport)
