# Quickstart Guide: Report Admin Dashboard

**Feature**: `/reportadminx` - Marketing Analytics Report Viewer
**Date**: 2026-01-13
**For**: Marketing team members, developers, and administrators

## Table of Contents

1. [Overview](#overview)
2. [Quick Start (Users)](#quick-start-users)
3. [Adding a New Report](#adding-a-new-report)
4. [Viewing Reports](#viewing-reports)
5. [Filtering Reports](#filtering-reports)
6. [Development Setup](#development-setup)
7. [Troubleshooting](#troubleshooting)
8. [FAQ](#faq)

---

## Overview

The Report Admin Dashboard is a web-based interface for viewing marketing analytics reports. Reports are stored as HTML files and displayed with period-based filtering.

**Key Features**:
- 📊 View full HTML reports in isolated viewer
- 📅 Filter reports by time period (last 7/30/90 days, or custom range)
- 🏷️ Tag-based organization
- 📱 Responsive design (works on mobile/tablet/desktop)
- 🎨 Developer dark mode aesthetic

**Tech Stack**: Vanilla HTML/CSS/JavaScript (no build tools required)

---

## Quick Start (Users)

### Accessing the Dashboard

1. **Open the application** in your browser:
   ```
   https://your-domain.com/index.html#/reportadminx
   ```

2. **Navigate from template catalog**:
   - Click "Ver Relatórios" button in navigation
   - Or manually change URL hash to `#/reportadminx`

3. **Dashboard Layout**:
   ```
   ┌────────────────────────────────────────┐
   │  Report Dashboard                      │
   ├──────────────┬─────────────────────────┤
   │              │                         │
   │  [Filter]    │                         │
   │              │                         │
   │  Report 1    │    [Report Viewer]      │
   │  Report 2    │    (Selected report     │
   │  Report 3    │     displays here)      │
   │  ...         │                         │
   └──────────────┴─────────────────────────┘
   ```

---

## Adding a New Report

### Prerequisites

- Git installed on your machine
- Access to the repository
- Report HTML file ready (generated from analytics tool)

### Step-by-Step Process

#### Step 1: Prepare Your Report HTML

Ensure your report is a **self-contained HTML file**:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Your Report Title</title>
  <!-- All styles inline or in <style> tag -->
  <style>
    body { /* Your styles */ }
  </style>
</head>
<body>
  <!-- Your report content -->
</body>
</html>
```

**Requirements**:
- Self-contained (no external dependencies)
- Uses JetBrains Mono font (or includes via Google Fonts)
- Dark theme recommended (matches dashboard aesthetic)

#### Step 2: Name Your Report File

Use this naming convention:

```
{type}-{date}.html

Examples:
- leads-2026-01-12.html
- conversao-janeiro-2026.html
- campanhas-q1-2026.html
```

**Rules**:
- Lowercase only
- Use hyphens (not spaces or underscores)
- Include date for clarity
- `.html` extension required

#### Step 3: Add Report to Repository

1. **Clone the repository** (if not already done):
   ```bash
   git clone <repository-url>
   cd templates-usuarios
   ```

2. **Copy your report HTML** to `/reports/` directory:
   ```bash
   cp /path/to/your-report.html reports/leads-2026-01-12.html
   ```

3. **Verify file is in correct location**:
   ```bash
   ls reports/
   # Should show: index.json, leads-2026-01-12.html, ...
   ```

#### Step 4: Update the Report Index

1. **Open** `reports/index.json` in your editor

2. **Add new entry** to the `reports` array:

   ```json
   {
     "reports": [
       {
         "id": "rpt-003",
         "title": "Relatório Estratégico de Leads",
         "period": {
           "start": "2025-12-05",
           "end": "2026-01-12"
         },
         "dateCreated": "2026-01-12",
         "fileName": "leads-2026-01-12.html",
         "tags": ["leads", "meta-ads", "educação-cosmética"],
         "description": "Análise de 3.937 leads com benchmark de mercado"
       }
     ]
   }
   ```

3. **Fill in metadata**:

   | Field | Description | Example |
   |-------|-------------|---------|
   | `id` | Unique ID (rpt-NNN) | `"rpt-003"` |
   | `title` | Report title | `"Relatório de Leads"` |
   | `period.start` | Start date (YYYY-MM-DD) | `"2025-12-05"` |
   | `period.end` | End date (YYYY-MM-DD) | `"2026-01-12"` |
   | `dateCreated` | Creation date (YYYY-MM-DD) | `"2026-01-12"` |
   | `fileName` | HTML file name | `"leads-2026-01-12.html"` |
   | `tags` | Categories (optional) | `["leads", "meta-ads"]` |
   | `description` | Summary (optional) | `"Análise de 3.937 leads..."` |

4. **Get next report ID**:
   - Look at highest existing ID (e.g., `rpt-002`)
   - Increment by 1 (e.g., `rpt-003`)

5. **Choose appropriate tags**:

   **Type tags**: `leads`, `conversão`, `campanhas`, `engajamento`
   **Channel tags**: `meta-ads`, `google-ads`, `email`, `organic`
   **Sector tags**: `educação-cosmética`, `suplementos`, `eventos`

6. **Sort reports by date** (newest first):
   ```json
   {
     "reports": [
       { "dateCreated": "2026-02-01", ... },  ← Newest
       { "dateCreated": "2026-01-12", ... },
       { "dateCreated": "2025-12-15", ... }   ← Oldest
     ]
   }
   ```

#### Step 5: Validate Your Changes

1. **Check JSON syntax**:
   ```bash
   # Use online validator or:
   cat reports/index.json | python -m json.tool
   ```

2. **Verify file exists**:
   ```bash
   ls reports/leads-2026-01-12.html
   ```

3. **Test locally** (open in browser):
   ```bash
   # Windows
   start index.html#/reportadminx

   # Mac/Linux
   open index.html#/reportadminx
   ```

4. **Check dashboard**:
   - Report appears in list ✓
   - Period filter works ✓
   - Report loads in viewer ✓

#### Step 6: Commit and Push

1. **Stage changes**:
   ```bash
   git add reports/leads-2026-01-12.html
   git add reports/index.json
   ```

2. **Commit with descriptive message**:
   ```bash
   git commit -m "feat: add Relatório Estratégico de Leads (Dec 2025 - Jan 2026)

   - Add leads-2026-01-12.html report
   - Update index.json with rpt-003 metadata
   - Tags: leads, meta-ads, educação-cosmética"
   ```

3. **Push to remote**:
   ```bash
   git push origin <branch-name>
   ```

4. **Verify deployment** (if auto-deploy is configured):
   - Visit production URL
   - Navigate to `/reportadminx`
   - Confirm new report appears

---

## Viewing Reports

### Selecting a Report

1. **Navigate to dashboard**: `#/reportadminx`

2. **Browse report list** (left sidebar):
   - Reports sorted by creation date (newest first)
   - Each card shows:
     - Title
     - Period covered
     - Age (e.g., "2 dias atrás")
     - Tags
     - Description (if available)

3. **Click a report card** to view:
   - Report loads in right pane (iframe)
   - Report card highlights (left border)
   - Loading spinner shows while loading

4. **Scroll through report**:
   - Report is fully interactive (tables, hover effects work)
   - Use mouse wheel or scrollbar in viewer

### Keyboard Navigation

| Key | Action |
|-----|--------|
| Tab | Navigate between filter, reports, and viewer |
| Enter | Select focused report |
| Arrow Up/Down | Navigate report list |
| Escape | Clear selection |

---

## Filtering Reports

### Preset Time Periods

1. **Open period filter** (top of report list)

2. **Select a preset**:
   - **Todos os períodos**: Show all reports (default)
   - **Últimos 7 dias**: Reports created in last 7 days
   - **Últimos 30 dias**: Reports created in last 30 days
   - **Último trimestre**: Reports created in last 90 days
   - **Período personalizado**: Choose custom date range

3. **Report count updates** to show filtered results

4. **Selected report clears** if not in filtered results

### Custom Date Range (Future Enhancement)

1. Select "Período personalizado" from filter

2. Enter dates in prompt:
   - Start date: `YYYY-MM-DD`
   - End date: `YYYY-MM-DD`

3. Reports within date range appear

**Note**: In MVP, custom range uses browser prompt. Future versions will have date picker UI.

---

## Development Setup

### Local Development

1. **Clone repository**:
   ```bash
   git clone <repository-url>
   cd templates-usuarios
   ```

2. **Create sample reports** (optional):
   ```bash
   mkdir -p reports
   echo '{"reports":[],"meta":{"version":"1.0.0"}}' > reports/index.json
   ```

3. **Open in browser**:
   ```bash
   # Windows
   start index.html#/reportadminx

   # Mac
   open index.html#/reportadminx

   # Linux
   xdg-open index.html#/reportadminx
   ```

4. **No build step required** - pure HTML/CSS/JS

### Live Reload (Optional)

Use a static server for live reload during development:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (npx)
npx serve -l 8000

# Then open: http://localhost:8000/#/reportadminx
```

### Browser Console

1. Open DevTools: `F12` (Windows/Linux) or `Cmd+Opt+I` (Mac)

2. Check for errors in Console tab

3. Inspect network requests (Reports tab → Network)

4. View dashboard state:
   ```javascript
   console.log(dashboardState);
   ```

---

## Troubleshooting

### Report List is Empty

**Symptom**: Dashboard loads but shows "Nenhum relatório disponível"

**Causes & Fixes**:

1. **`index.json` doesn't exist**:
   ```bash
   # Check file exists
   ls reports/index.json

   # Create if missing
   echo '{"reports":[],"meta":{"version":"1.0.0"}}' > reports/index.json
   ```

2. **`index.json` has invalid JSON**:
   ```bash
   # Validate JSON syntax
   cat reports/index.json | python -m json.tool

   # Or use online validator: jsonlint.com
   ```

3. **Network error** (check browser console):
   - Open DevTools → Network tab
   - Look for failed request to `reports/index.json`
   - Verify file is being served correctly

---

### Report Doesn't Load in Viewer

**Symptom**: Report selected but viewer shows error or blank

**Causes & Fixes**:

1. **File doesn't exist**:
   ```bash
   # Check file exists
   ls reports/leads-2026-01-12.html
   ```

2. **Wrong fileName in index.json**:
   ```json
   // ❌ Wrong
   "fileName": "report.html"

   // ✓ Correct
   "fileName": "leads-2026-01-12.html"
   ```

3. **CORS issues** (if using `file://` protocol):
   - Use a local server instead: `python -m http.server`
   - Or deploy to hosting (Netlify, Vercel)

4. **Invalid HTML** in report:
   - Open report directly: `reports/leads-2026-01-12.html`
   - Check browser console for errors
   - Validate HTML: validator.w3.org

---

### Filter Doesn't Work

**Symptom**: Selecting filter doesn't change report list

**Causes & Fixes**:

1. **No reports match filter**:
   - Check `dateCreated` values in `index.json`
   - Try "Todos os períodos" to see all reports

2. **Invalid dates in index.json**:
   ```json
   // ❌ Wrong format
   "dateCreated": "12-01-2026"

   // ✓ Correct format (ISO 8601)
   "dateCreated": "2026-01-12"
   ```

3. **JavaScript error** (check browser console):
   - Look for errors in Console tab
   - Report issue if bug found

---

### Styling Looks Wrong

**Symptom**: Report styles conflict with dashboard, or dashboard styles broken

**Causes & Fixes**:

1. **Report not using iframe isolation**:
   - Ensure report loads in iframe (not direct injection)
   - Check `renderReportViewer()` function

2. **Missing CSS variables**:
   - Verify `body` tag has theme class (e.g., `.theme-consulfarma`)
   - Check CSS variables defined in `index.html`

3. **Report HTML missing styles**:
   - Ensure report HTML is self-contained
   - All styles in `<style>` tag or inline

---

### Can't Navigate Back from Dashboard

**Symptom**: Browser back button doesn't work, or goes to external site

**Causes & Fixes**:

1. **Hash routing not configured**:
   - Ensure URL has hash: `index.html#/reportadminx`
   - Check `hashchange` event listener is registered

2. **Navigation link wrong**:
   ```html
   <!-- ❌ Wrong (full page reload) -->
   <a href="/reportadminx">Reports</a>

   <!-- ✓ Correct (hash navigation) -->
   <a href="#/reportadminx">Reports</a>
   ```

---

## FAQ

### Q: Can I upload reports through the UI?

**A**: Not in MVP. Reports must be added via Git (see [Adding a New Report](#adding-a-new-report)). Upload UI is planned for Phase 2.

---

### Q: What's the maximum file size for reports?

**A**: No hard limit, but keep under **1MB per HTML file** for optimal performance. Large reports (>5MB) may cause browser slowdowns.

---

### Q: Can I edit reports after uploading?

**A**: Reports are immutable once added. To update:
1. Edit the HTML file in `/reports/`
2. Commit changes
3. Push to repository

Or create a new version with updated date (e.g., `leads-2026-01-12-v2.html`).

---

### Q: How do I delete a report?

**A**:
1. Remove entry from `reports/index.json`
2. (Optional) Delete HTML file from `/reports/` directory
3. Commit and push changes

---

### Q: Can I share a direct link to a specific report?

**A**: Not in MVP (requires URL parameters or additional routing). Planned for Phase 2:
```
index.html#/reportadminx?report=rpt-001
```

---

### Q: Why use hash-based routing instead of real URLs?

**A**: Hash routing works on static hosts (Netlify, GitHub Pages) without server configuration. Real URL routing requires server-side rewrites.

---

### Q: Can non-technical users add reports?

**A**: Current workflow requires Git operations. Options for non-technical users:
1. Request developer support to add reports
2. Use automation script (future enhancement)
3. Wait for drag-and-drop upload UI (Phase 2)

---

### Q: What happens if two reports have the same ID?

**A**: Dashboard will load both, but selection may behave unexpectedly. **Always use unique IDs** (increment from highest existing ID).

---

### Q: Can I use the dashboard offline?

**A**: Yes, if you've loaded the page at least once (browser caches resources). However, new reports added to the repository won't appear until you're back online and refresh.

---

### Q: How do I customize the dashboard theme?

**A**: Edit CSS variables in `index.html`:

```css
body {
  --theme-color: #06b6d4;  /* Change accent color */
  --bg-primary: #0a0a0a;   /* Change background */
  /* ... */
}
```

---

### Q: Can I add more filter options?

**A**: Yes. Edit the `renderPeriodFilter()` function in `index.html` to add custom options:

```javascript
<option value="last-year">Último ano</option>
```

Then add filter logic in `applyPeriodFilter()`.

---

## Support

### Reporting Issues

1. **Check this guide first** for common solutions

2. **Open GitHub issue** with:
   - Description of problem
   - Steps to reproduce
   - Browser/OS version
   - Screenshots (if applicable)

3. **Provide context**:
   - `reports/index.json` (sanitize if needed)
   - Browser console errors (screenshot)
   - Expected vs actual behavior

### Getting Help

- **Documentation**: See [research-reportadmin.md](./research-reportadmin.md) for technical details
- **Data model**: See [data-model-reportadmin.md](./data-model-reportadmin.md)
- **API contracts**: See [contracts/reportadmin-api.md](./contracts/reportadmin-api.md)

---

## Next Steps

1. ✅ **Add your first report** (follow [Adding a New Report](#adding-a-new-report))
2. ✅ **Explore filtering** (try different time periods)
3. ✅ **Test on mobile** (responsive design)
4. ✅ **Share with team** (send dashboard URL)
5. ⏭️ **Request enhancements** (Phase 2 features)

---

**Document Version**: 1.0.0
**Last Updated**: 2026-01-13
**Maintained By**: Development Team
