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
  consulfarma: Template[],
  icosmetologia: Template[],
  hinutrition: Template[],
  seminariosconsulfarma: Template[]  // Added 2026-01-12
}

type Template = {
  name: string,
  message: string
}
```

**Example**:
```javascript
const TEMPLATES = {
  consulfarma: [
    {
      name: "start_x_csf_ia_v1",
      message: "Oi {{1}}! Sou a Mind, sua assistente virtual..."
    },
    {
      name: "retomada_x_geral_csf_v2",
      message: "Oi {{1}}! Notei que nossa última conversa..."
    }
  ],
  icosmetologia: [
    {
      name: "start_ic_ia_v1",
      message: "Oi {{1}}! Sou a Mind, sua assistente virtual..."
    }
  ],
  hinutrition: [
    {
      name: "start_hi_ia_v1",
      message: "Oi {{1}}! Sou a Mind, sua assistente virtual..."
    }
  ],
  seminariosconsulfarma: [
    {
      name: "tipo_1_rio_preto_congresso_mkt_prospec_2026_csf_v2",
      message: "Oii, tudo bem? 😊 É Iza, da Consulfarma, estamos levando o *Congresso Consulfarma*..."
    },
    {
      name: "grade_ano_novo_congresso_2026_csf_v1",
      message: "Oiie tudo bem? 😊 E a Iza da Consulfarma! Desejo um feliz ano novo..."
    }
  ]
};
```

**Validation Rules**:
- Each company key must exist (consulfarma, icosmetologia, hinutrition, seminariosconsulfarma)
- Each company value must be an array of Template objects
- Template.name should be non-empty strings (used for clipboard copy)
- Template.message should be non-empty strings (displayed in card)
- Both name and message can contain any characters (including special chars, emojis, Portuguese characters)
- No uniqueness constraint across companies (same template name can exist in multiple companies)
- Template names follow naming convention: `{type}_{context}_{company}_v{version}`

**Update Pattern**:
```javascript
// To add a new template:
TEMPLATES.consulfarma.push({
  name: "new_template_name_v1",
  message: "Template message content here..."
});

// To edit a template:
TEMPLATES.consulfarma[0].name = "updated_name_v2";
TEMPLATES.consulfarma[0].message = "Updated message...";

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
// Valid values: 'consulfarma' | 'icosmetologia' | 'hinutrition' | 'seminariosconsulfarma'
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
  { id: 'hinutrition', label: 'Hi Nutrition' },
  { id: 'seminariosconsulfarma', label: 'Seminários Consulfarma' }  // Added 2026-01-12
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
  ├── hinutrition → Template[]
  └── seminariosconsulfarma → Template[]
        ↑
        | filtered by activeTab
        |
Component State (activeTab)
        ↓
CARTEIRAS (data)
  ├── consulfarma → Carteira[]
  ├── icosmetologia → Carteira[]
  ├── hinutrition → Carteira[]
  └── seminariosconsulfarma → Carteira[]
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
| Company IDs hardcoded | Design decision | Fixed set of 4 companies |

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

---

## Update: 2026-01-12 - New Entities

### 4. Carteiras (Sales Representatives)

**Purpose**: Display sales team members associated with each company

**Structure**:
```javascript
const CARTEIRAS = {
  consulfarma: Carteira[],
  icosmetologia: Carteira[],
  hinutrition: Carteira[],
  seminariosconsulfarma: Carteira[]
}

type Carteira = {
  name: string,      // Sales representative name
  number: number     // Carteira identifier (1-10)
}
```

**Example**:
```javascript
const CARTEIRAS = {
  consulfarma: [
    { name: 'Wanderleia Rabelo', number: 1 },
    { name: 'Ana Carolina', number: 2 },
    { name: 'Cleo Alcantara', number: 3 }
  ],
  seminariosconsulfarma: [
    { name: 'Wanderleia Rabelo', number: 1 },
    { name: 'Ana Carolina', number: 2 }
  ]
};
```

**Validation Rules**:
- Each company key must match TEMPLATES/COMPANIES keys
- Name must be non-empty string
- Number must be positive integer
- Numbers may not be sequential (e.g., 1, 2, 3, 5, 9)

**Display**: Shown in footer section below template grid, updates when activeTab changes

---

### 5. Theme Configuration

**Purpose**: Define color themes for each company

**Structure**:
```css
/* CSS Custom Properties per company */
body.theme-consulfarma {
  --theme-color: #ef4444;           /* red-500 */
  --theme-color-bg: rgba(239, 68, 68, 0.1);
}

body.theme-icosmetologia {
  --theme-color: #a855f7;           /* purple-500 */
  --theme-color-bg: rgba(168, 85, 247, 0.1);
}

body.theme-hinutrition {
  --theme-color: #fbbf24;           /* amber-400 */
  --theme-color-bg: rgba(251, 191, 36, 0.1);
}

body.theme-seminariosconsulfarma {
  --theme-color: #06b6d4;           /* cyan-500 */
  --theme-color-bg: rgba(6, 182, 212, 0.1);
}
```

**Usage**: Body class changes on tab switch to update theme colors dynamically

**Applied To**:
- Tab active state border/background
- Card title text color
- Stats value color
- Visual accent elements
