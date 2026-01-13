# Component API Contract: TemplateCatalog

**Feature**: 001-template-catalog-react
**Date**: 2025-12-22
**Version**: 1.1.0 (Updated 2026-01-12)

## Overview

This document defines the public interface, behavior, and integration contract for the TemplateCatalog React component designed for Framer Code.

## Component Signature

```typescript
// Component has no props - fully self-contained
function TemplateCatalog(): JSX.Element
```

**Props**: None (component is self-contained)
**State**: Internal (managed via React hooks)
**Dependencies**: None (uses only React provided by Framer)

## Integration Contract

### How to Use in Framer Code

1. **Installation**: Copy entire component code into Framer Code editor
2. **Usage**: Add component to canvas via Framer UI
3. **Configuration**: Edit TEMPLATES object at top of file to update data

```javascript
// In Framer Code editor (or standalone HTML):
// Note: React import only needed for Framer version, omit for HTML

// Edit this data structure to add/remove templates:
const TEMPLATES = {
  consulfarma: [
    { name: "template_name_v1", message: "Template message..." }
  ],
  icosmetologia: [...],
  hinutrition: [...],
  seminariosconsulfarma: [...]  // Added v1.1.0
};

// Component implementation...
```

### Component Behavior Contract

#### 1. Initial Render

**Given**: Component is mounted in Framer or opened in browser
**When**: Page loads
**Then**:
- Displays Consulfarma tab as active (default)
- Renders all templates for Consulfarma in grid layout
- Shows template cards with name (title) and message (body)
- Displays carteiras footer with sales representatives
- Shows stats bar with company name and template count
- Shows empty grid if no templates exist
- Displays toast notification area (hidden by default)

**Performance SLA**: First render completes in <100ms

---

#### 2. Tab Switching

**Given**: Component is rendered with any active tab
**When**: User clicks a different company tab
**Then**:
- Active tab indicator (→ arrow prefix) moves to clicked tab
- Theme color changes to match company (red/purple/amber/cyan)
- Template grid updates to show templates for selected company
- Stats bar updates to show new company name and template count
- Carteiras footer updates to show sales team for selected company
- Previous tab becomes inactive (no arrow, neutral color)
- Grid re-renders with smooth transition (no flicker)

**Performance SLA**: Tab switch completes in <16ms (single frame at 60fps)

**Edge Cases**:
- Clicking already-active tab: No-op, no re-render
- Company with 0 templates: Shows empty grid (no error)

---

#### 3. Template Copy Operation

**Given**: User can see template cards with name (title) and message (body)
**When**: User clicks any template card
**Then**:
- Template NAME (not message) is copied to system clipboard
- Success toast appears at bottom right: "Copied to clipboard!" with ✓ icon
- Toast auto-dismisses after 2000ms
- Card shows visual feedback (hover state during interaction)

**Performance SLA**: Clipboard operation completes in <500ms

**Error Handling**:
```javascript
// If clipboard.writeText fails:
catch (error) {
  setToast({
    visible: true,
    message: 'Copy failed. Please try again.'
  });
}
```

**Edge Cases**:
- Clipboard permission denied: Shows error toast
- Rapid successive clicks: Each click triggers new toast (last wins)
- Very long template name: Copies full text regardless of UI truncation

---

#### 4. Responsive Layout

**Given**: Component is rendered at any viewport width
**When**: Viewport resizes
**Then**:
- Grid columns adjust automatically via CSS Grid auto-fill
- Cards maintain consistent sizing and spacing
- No horizontal scroll on any device size
- All interactive elements remain accessible

**Breakpoint Behavior**:
- Desktop (1920px+): 6-7 columns
- Laptop (1440px): 5 columns
- Tablet (768px): 2-3 columns
- Mobile (320px): 1 column

**Performance SLA**: Layout reflow completes in <16ms

---

#### 5. Hover Interactions

**Given**: User has pointer device (mouse/trackpad)
**When**: User hovers over interactive element
**Then**:
- Template cards: Border brightens, subtle glow appears
- Company tabs: Opacity increases
- Cursor changes to pointer
- Transition animates smoothly (200ms)

**Accessibility**: Touch devices skip hover states (uses :hover CSS only)

---

## Data Update Contract

### How to Add/Edit/Remove Templates

**Add Template** (v1.1.0 format):
```javascript
// Edit TEMPLATES object directly:
const TEMPLATES = {
  seminariosconsulfarma: [
    {
      name: "existing_template_v1",
      message: "Existing message..."
    },
    {
      name: "new_template_name_v1",  // Add new template here
      message: "New template message content..."
    }
  ]
};
```

**Edit Template** (v1.1.0 format):
```javascript
const TEMPLATES = {
  seminariosconsulfarma: [
    {
      name: "updated_template_name_v2",  // Change name
      message: "Updated message content..."  // Change message
    }
  ]
};
```

**Remove Template**:
```javascript
const TEMPLATES = {
  seminariosconsulfarma: [
    // Remove entire object block
    {
      name: "template_to_keep_v1",
      message: "Keep this one..."
    }
  ]
};
```

**Behavior After Edit**:
- Save file in Framer Code editor
- Framer auto-refreshes preview
- New data appears immediately
- No cache clearing needed

---

## Visual Contract

### Color Specifications

**Base Theme (Developer Dark Mode)**:
```javascript
const BASE_THEME = {
  background: '#0a0a0a',     // neutral-950
  cardBackground: '#171717', // neutral-900
  text: '#f5f5f5',          // neutral-100
  textSecondary: '#d4d4d4',  // neutral-300
  textTertiary: '#737373',   // neutral-500
  border: '#262626',         // neutral-800
  borderHover: '#404040',    // neutral-700
  toastSuccess: '#10b981',   // emerald-500
  toastError: '#ef4444'      // red-500
};
```

**Company Theme Colors** (v1.1.0 - Updated):
```javascript
const COMPANY_COLORS = {
  consulfarma: {
    primary: '#ef4444',      // red-500
    background: 'rgba(239, 68, 68, 0.1)'
  },
  icosmetologia: {
    primary: '#a855f7',      // purple-500
    background: 'rgba(168, 85, 247, 0.1)'
  },
  hinutrition: {
    primary: '#fbbf24',      // amber-400
    background: 'rgba(251, 191, 36, 0.1)'
  },
  seminariosconsulfarma: {  // NEW in v1.1.0
    primary: '#06b6d4',      // cyan-500
    background: 'rgba(6, 182, 212, 0.1)'
  }
};
```

**Color Usage**:
- Company primary: Active tab border/background, card title, stats values
- Company background: Active tab background (10% opacity)
- Base colors: All non-accent UI elements

### Typography Contract

```javascript
const TYPOGRAPHY = {
  fontFamily: "'Monaco', 'Menlo', 'Courier New', monospace",
  tabSize: '14px',
  tabWeight: '600',
  templateSize: '15px',
  templateWeight: '400',
  toastSize: '14px'
};
```

### Spacing Contract

```javascript
const SPACING = {
  containerPadding: '24px',
  gridGap: '16px',
  cardPadding: '20px',
  tabPadding: '12px 24px',
  toastPadding: '12px 24px'
};
```

---

## Browser Support Contract

**Minimum Browser Versions**:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Required Web APIs**:
- `navigator.clipboard` (Clipboard API)
- CSS Grid Layout
- CSS Transitions
- React Hooks (useState)

**Graceful Degradation**:
- Clipboard API unavailable: Shows error toast
- CSS Grid unsupported: Falls back to block layout (older browsers)

---

## Performance Contract

| Operation | Max Duration | Measurement Point |
|-----------|--------------|-------------------|
| Initial render | 100ms | Mount to paint |
| Tab switch | 16ms | State update to re-render |
| Clipboard copy | 500ms | Click to toast display |
| Hover animation | 200ms | Transition duration |
| Toast display | 2000ms | Auto-dismiss timeout |

---

## Error Handling Contract

### 1. Clipboard Errors

**Error**: `navigator.clipboard.writeText()` rejects
**Handling**: Catch error, show toast: "Copy failed. Please try again."
**Recovery**: User can retry by clicking card again

### 2. Empty Data

**Error**: `TEMPLATES[company]` is empty array
**Handling**: Render empty state message (not an error)
**Display**: "No templates available for this company"

### 3. Invalid Data

**Error**: `TEMPLATES` object malformed
**Handling**: Component may crash (no validation layer)
**Prevention**: Document expected data structure in code comments

---

## Testing Contract

### Manual Test Scenarios

**Test 1: Basic Copy Operation**
1. Open component in Framer preview
2. Click any template card
3. Verify toast appears with "Copied to clipboard!"
4. Paste into external app (Ctrl/Cmd+V)
5. Verify correct template name pasted

**Test 2: Tab Switching**
1. Click each company tab in sequence
2. Verify different templates display
3. Verify active tab indicator moves
4. Click active tab again, verify no change

**Test 3: Responsive Behavior**
1. Resize browser from 320px to 1920px
2. Verify grid adjusts column count smoothly
3. Verify no horizontal scroll at any width
4. Verify all cards remain clickable

**Test 4: Hover States**
1. Hover over template cards
2. Verify border brightens and glow appears
3. Hover over tabs
4. Verify opacity increases

**Test 5: Rapid Interactions**
1. Click multiple cards rapidly
2. Verify each click copies correctly
3. Verify toast updates (no stacking)
4. Switch tabs rapidly
5. Verify smooth transitions, no errors

---

## Maintenance Contract

### Code Size Limit

**Constraint**: Component must remain under 500 lines
**Current Estimate**: ~250-300 lines including:
- Data object: ~50 lines
- Component logic: ~80 lines
- Styles: ~120 lines
- Event handlers: ~40 lines

**To Stay Under Limit**:
- No feature additions beyond spec
- No extensive comments (code should be self-documenting)
- No extracted utility functions (keep inline)

### Update Frequency

**Expected Changes**:
- Template data updates: Weekly/monthly (edit TEMPLATES object)
- Code updates: Rare (component is feature-complete)
- No dependency updates (no dependencies)

**Update Process**:
1. Edit TEMPLATES object in code
2. Save in Framer Code editor
3. Test in Framer preview
4. Publish Framer project

---

## Integration Checklist

Before deploying to Framer or production:

- [ ] TEMPLATES object contains data for all 4 companies (v1.1.0)
- [ ] Each template has both `name` and `message` properties
- [ ] Each company has at least 1 template (or intentionally empty)
- [ ] Template names are non-empty strings
- [ ] CARTEIRAS object contains data for all 4 companies (v1.1.0)
- [ ] CSS includes all 4 theme classes including `theme-seminariosconsulfarma` (v1.1.0)
- [ ] Component code is <800 lines (increased for additional features)
- [ ] No external imports beyond React (Framer) or pure vanilla JS (HTML)
- [ ] All styles are inline CSS or JavaScript objects
- [ ] Tested in browser/Framer preview at multiple viewport sizes (320px-1920px)
- [ ] Clipboard copy works and copies template NAME not message
- [ ] Toast notifications display correctly with ✓/✕ icons
- [ ] Theme color changes when switching tabs
- [ ] Stats bar updates correctly
- [ ] Carteiras footer displays for all companies

---

## Version History

**v1.1.0** (2026-01-12)
- Added 4th company: Seminários Consulfarma
- Added cyan (#06b6d4) theme color for new company
- Added 6 new event/seminar templates
- Template structure changed from `string[]` to `Template[]` objects with `name` and `message`
- Added carteiras (sales representatives) footer
- Added stats bar showing company name and template count
- Card displays both template name (title) and message (body)
- Clipboard copies template name only
- Support for Portuguese characters and emojis in all text

**v1.0.0** (2025-12-22)
- Initial component specification
- Supports 3 companies (Consulfarma, ICosmetologia, Hi Nutrition)
- Clipboard copy functionality
- Responsive grid layout
- Toast notifications
- Developer Dark Mode theme with hover effects
