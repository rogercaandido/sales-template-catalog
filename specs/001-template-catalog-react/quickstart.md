# Quickstart Guide: Template Catalog

**Feature**: 001-template-catalog-react
**Audience**: Developers & Sales Team Administrators
**Last Updated**: 2026-01-12 (v1.1.0 - Added Seminários Consulfarma)

## Overview

This guide shows you how to set up, configure, and use the Template Catalog component in Framer Code.

## Prerequisites

- Framer account with access to Framer Code
- Basic understanding of Framer's code component workflow
- Modern web browser (Chrome, Firefox, Safari, or Edge)

## Installation (5 minutes)

### Step 1: Create Code Component in Framer

1. Open your Framer project
2. Click the **Assets** panel
3. Click **+** (Plus button)
4. Select **Code** → **New Component**
5. Name it `TemplateCatalog`

### Step 2: Paste Component Code

1. Copy the entire TemplateCatalog component code
2. Paste into the Framer Code editor
3. Framer will automatically:
   - Import React
   - Detect the component export
   - Make it available in your component library

### Step 3: Add to Canvas

1. In the **Assets** panel, find `TemplateCatalog` under Code Components
2. Drag it onto your canvas
3. Resize the frame to your desired dimensions
4. Component is now live!

---

## Configuration (2 minutes)

### Adding Your Template Data

Edit the `TEMPLATES` object at the top of the component file:

```javascript
const TEMPLATES = {
  consulfarma: [
    {
      name: "welcome_email_template_v1",
      message: "Oi {{1}}! Sou a Mind, sua assistente virtual da *Consulfarma*..."
    },
    {
      name: "product_catalog_2024_v1",
      message: "Olá {{1}}! Preparei algumas informações..."
    }
    // Add more templates here
  ],
  icosmetologia: [
    {
      name: "service_introduction_v1",
      message: "Oi {{1}}! Sou a Mind, sua assistente virtual do *ICosmetologia*..."
    }
    // Add more templates here
  ],
  hinutrition: [
    {
      name: "nutrition_plan_template_v1",
      message: "Oi {{1}}! Sou a Mind, sua assistente virtual da *Hi Nutrition*..."
    }
    // Add more templates here
  ],
  seminariosconsulfarma: [
    {
      name: "tipo_1_rio_preto_congresso_mkt_prospec_2026_csf_v2",
      message: "Oii, tudo bem? 😊 É Iza, da Consulfarma..."
    }
    // Add more templates here
  ]
};
```

**Tips**:
- Keep template names descriptive and concise
- Use title case for consistency
- No need to escape special characters
- Emojis are supported ✅

### Save and Preview

1. Save the file (Ctrl/Cmd + S)
2. Framer automatically refreshes the preview
3. Your templates appear immediately

---

## Usage Guide

### For Sales Team Members

#### Viewing Templates

1. Open the published Framer page or standalone HTML
2. See four company tabs at the top:
   - **Consulfarma** (red theme)
   - **ICosmetologia** (purple theme)
   - **Hi Nutrition** (amber theme)
   - **Seminários Consulfarma** (cyan theme) ← NEW
3. Default view shows Consulfarma templates

#### Switching Companies

1. Click any company tab
2. Template grid updates to show that company's templates
3. Active tab shows → arrow indicator and company theme color
4. Page theme color changes to match company (red/purple/amber/cyan)
5. Stats bar updates to show company name and template count
6. Carteiras footer updates to show sales team for that company

#### Copying Template Names

1. View template card showing:
   - **Title**: Template name (in company theme color)
   - **Body**: Template message content
2. Click any template card
3. Template NAME (not message) is copied to clipboard
4. Toast notification appears: "Copied to clipboard!" with ✓ icon
5. Paste the template name anywhere (Ctrl/Cmd + V)
6. Use in Sellflux, emails, documents, CRM systems, etc.

**Pro Tips**:
- Click multiple templates rapidly to quickly gather names
- Works on desktop, tablet, and mobile devices
- No login required - instant access

---

## Maintenance Guide

### For Administrators

#### Adding New Templates

1. Open Framer project
2. Find TemplateCatalog code component
3. Locate the `TEMPLATES` object
4. Add new template name to the appropriate company array:

```javascript
const TEMPLATES = {
  consulfarma: [
    "Existing Template 1",
    "Existing Template 2",
    "New Template Here" // ← Add this line
  ],
  // ...
};
```

5. Save file
6. Republish Framer project (if live)

#### Editing Template Names

1. Find the template name in the code
2. Edit the string directly:

```javascript
// Before:
"Old Template Name"

// After:
"Updated Template Name"
```

3. Save and republish

#### Removing Templates

1. Find the template line in the code
2. Delete the entire line (including comma)
3. Save and republish

**Example**:
```javascript
// Before:
const TEMPLATES = {
  consulfarma: [
    "Template to Keep",
    "Template to Remove", // ← Delete this line
    "Another Template"
  ]
};

// After:
const TEMPLATES = {
  consulfarma: [
    "Template to Keep",
    "Another Template"
  ]
};
```

#### Organizing Templates

**Best Practices**:
- Group related templates together
- Use consistent naming patterns per company
- Keep most-used templates at the top
- Remove outdated templates regularly

**Example Organization**:
```javascript
const TEMPLATES = {
  consulfarma: [
    // Welcome sequence
    "Welcome Email",
    "Onboarding Day 1",
    "Onboarding Day 3",

    // Product-related
    "Product Catalog Q1",
    "Product Catalog Q2",

    // Promotions
    "Monthly Special Offer",
    "Holiday Campaign"
  ]
};
```

---

## Troubleshooting

### Problem: Toast notification doesn't appear

**Possible Causes**:
- Browser blocking clipboard access
- Rapid clicking (toast is still visible from previous click)

**Solutions**:
1. Check browser console for errors
2. Ensure page is served over HTTPS (clipboard API requirement)
3. Wait for previous toast to dismiss before clicking again

---

### Problem: Templates not displaying after update

**Possible Causes**:
- Syntax error in TEMPLATES object
- Missing comma between array items
- Framer cache issue

**Solutions**:
1. Check browser console for JavaScript errors
2. Verify TEMPLATES object syntax:
   ```javascript
   const TEMPLATES = {
     company: ["item1", "item2"], // ← comma after array
     company2: ["item3", "item4"]  // ← no comma on last item
   };
   ```
3. Hard refresh Framer preview (Ctrl/Cmd + Shift + R)

---

### Problem: Layout broken on mobile

**Possible Causes**:
- Framer frame constraints preventing resize
- Browser zoom level affecting layout

**Solutions**:
1. In Framer, set component frame constraints to "Fill"
2. Reset browser zoom to 100%
3. Test in actual mobile browser (not just DevTools)

---

### Problem: Card text truncated

**Behavior**: This is intentional for long template names

**How to See Full Name**:
1. Click the card to copy full name
2. Paste into text editor to see complete text
3. Or shorten the template name in the code

---

## Integration Examples

### Example 1: Embedded in Sales Dashboard

```html
<!-- In Framer, create a page with: -->
- Header: Company logo + navigation
- Main content: TemplateCatalog component (full width)
- Footer: Contact information

<!-- Set component frame to: -->
Width: Fill container
Height: Auto (or fixed height with scroll)
```

### Example 2: Popup/Modal Usage

```javascript
// In Framer:
1. Create TemplateCatalog component
2. Wrap in a frame with fixed dimensions (600px x 400px)
3. Add scroll if needed
4. Attach to button click interaction
```

### Example 3: Standalone Page

```javascript
// Full-page catalog:
1. Create new Framer page
2. Add TemplateCatalog component
3. Set to fill viewport (100vw x 100vh)
4. Publish and share URL with sales team
```

---

## Performance Tips

### Keep Component Fast

✅ **Do**:
- Keep template count under 100 per company
- Use concise template names (<50 characters)
- Avoid special formatting in names

❌ **Don't**:
- Add hundreds of templates (no virtualization)
- Include very long template names (>200 characters)
- Modify component code unless necessary

### Optimize for Mobile

✅ **Do**:
- Test on actual mobile devices
- Keep frame responsive (fill width)
- Ensure adequate tap targets (min 44px)

❌ **Don't**:
- Set fixed desktop width
- Use small fonts (<14px)
- Overcomplicate layout

---

## Publishing Checklist

Before going live:

- [ ] All 4 company template arrays populated (v1.1.0)
- [ ] All templates have both `name` and `message` properties
- [ ] Template names are accurate and up-to-date
- [ ] No typos in template names
- [ ] All 4 CARTEIRAS entries populated (v1.1.0)
- [ ] CSS includes all 4 theme classes including cyan (v1.1.0)
- [ ] Tested on desktop browser
- [ ] Tested on tablet
- [ ] Tested on mobile device
- [ ] Clipboard copy works correctly (copies NAME not message)
- [ ] All four company tabs work with correct theme colors
- [ ] Theme color changes when switching tabs
- [ ] Stats bar updates correctly
- [ ] Carteiras footer displays for all companies
- [ ] Toast notifications display properly with ✓/✕ icons
- [ ] Hover states work on desktop
- [ ] No console errors in browser DevTools

---

## FAQ

**Q: Can I add more than 4 companies?**
A: Yes, but requires code modification. Add new company key to TEMPLATES, update COMPANIES array, add CARTEIRAS entry, and add CSS theme class.

**Q: Can users edit templates themselves?**
A: No, templates are hardcoded. Only developers with Framer access can edit.

**Q: Does this work offline?**
A: Component works offline, but clipboard API requires HTTPS (may not work on localhost).

**Q: Can I style the component differently?**
A: Yes, edit the style objects in the code. All styling is inline JavaScript.

**Q: Will this work in older browsers?**
A: Requires modern browsers (2020+). IE11 not supported.

**Q: How do I track which templates are copied most?**
A: Not supported in MVP. Would require analytics integration.

---

## Support & Resources

**Code Issues**:
- Check browser console for errors
- Verify TEMPLATES object syntax
- Test in Framer preview before publishing

**Framer-Specific Questions**:
- [Framer Code Documentation](https://www.framer.com/developers/)
- Framer Community Forum

**Feature Requests**:
- Document desired changes
- Contact development team

---

## Next Steps

✅ **You're ready to go!**

1. Add your template data
2. Publish your Framer project
3. Share link with sales team
4. Update templates as needed

**Typical workflow**:
- Sales team uses daily → Administrator updates monthly
