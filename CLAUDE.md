# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Speckit** template repository - a structured workflow system for feature development that guides AI agents through a complete software development lifecycle: specification → planning → task generation → implementation.

## Core Workflow Commands

Speckit provides a sequential workflow for feature development. Each command is available as a skill:

1. **`/speckit.specify <feature description>`** - Create a feature specification
   - Analyzes the feature description and generates a detailed spec
   - Creates a new branch (format: `###-feature-name`) and `specs/###-feature-name/` directory
   - Generates `spec.md` with user stories, requirements, and success criteria
   - Validates specification quality and may ask clarification questions (max 3)

2. **`/speckit.clarify`** - Identify underspecified areas in the spec
   - Asks up to 5 targeted clarification questions
   - Encodes answers back into the spec
   - Run this if spec needs refinement before planning

3. **`/speckit.plan`** - Generate implementation plan
   - Creates technical design documents in `specs/###-feature-name/`:
     - `plan.md` - architecture, tech stack, project structure
     - `research.md` - technical decisions and alternatives
     - `data-model.md` - entities and relationships
     - `contracts/` - API specifications
     - `quickstart.md` - integration scenarios
   - Validates against constitution.md principles
   - Updates agent context files

4. **`/speckit.tasks`** - Generate actionable task list
   - Creates `tasks.md` with dependency-ordered implementation tasks
   - Organizes tasks by user story for independent implementation
   - Identifies parallel execution opportunities
   - Format: `- [ ] T001 [P?] [Story?] Description with file path`

5. **`/speckit.implement`** - Execute the implementation
   - Processes and executes all tasks from `tasks.md`
   - Checks checklist status before starting (optional gate)
   - Creates/verifies ignore files (.gitignore, .dockerignore, etc.)
   - Marks tasks complete as work progresses

6. **`/speckit.checklist <domain>`** - Generate domain-specific checklist
   - Creates custom validation checklist for current feature
   - Examples: UX, security, performance, accessibility

7. **`/speckit.analyze`** - Analyze cross-artifact consistency
   - Validates consistency across spec.md, plan.md, and tasks.md
   - Non-destructive quality check

8. **`/speckit.taskstoissues`** - Convert tasks to GitHub issues
   - Creates GitHub issues from tasks.md with proper dependencies

9. **`/speckit.constitution`** - Create/update project constitution
   - Defines core principles and development constraints
   - Used to validate plans during `/speckit.plan`

## Key PowerShell Scripts

Located in `.specify/scripts/powershell/`:

- **`create-new-feature.ps1`** - Creates new feature branch and spec directory
  ```powershell
  # Usage
  .specify/scripts/powershell/create-new-feature.ps1 -Json "Feature description" [-ShortName "custom-name"] [-Number N]
  ```

- **`setup-plan.ps1`** - Sets up planning context for current feature
  ```powershell
  .specify/scripts/powershell/setup-plan.ps1 -Json
  ```

- **`check-prerequisites.ps1`** - Validates design documents exist
  ```powershell
  .specify/scripts/powershell/check-prerequisites.ps1 -Json [-RequireTasks] [-IncludeTasks]
  ```

- **`update-agent-context.ps1`** - Updates agent-specific context files
  ```powershell
  .specify/scripts/powershell/update-agent-context.ps1 -AgentType claude
  ```

## Repository Structure

```
.specify/
├── templates/           # Templates for all artifacts
│   ├── spec-template.md
│   ├── plan-template.md
│   ├── tasks-template.md
│   ├── checklist-template.md
│   └── agent-file-template.md
├── memory/
│   └── constitution.md  # Project principles and constraints
└── scripts/
    └── powershell/      # Workflow automation scripts

.claude/
└── commands/            # Skill definitions for Speckit commands
    ├── speckit.specify.md
    ├── speckit.plan.md
    ├── speckit.tasks.md
    └── ...

specs/                   # Generated per-feature directories
└── ###-feature-name/    # Each feature gets its own directory
    ├── spec.md
    ├── plan.md
    ├── research.md
    ├── data-model.md
    ├── tasks.md
    ├── contracts/
    └── checklists/
```

## Architecture Principles

### Workflow Philosophy

1. **Specification-first**: Features start with WHAT and WHY, not HOW
2. **User story organization**: Tasks grouped by user story for independent implementation
3. **Incremental delivery**: Each user story is independently testable and deployable
4. **Constitution validation**: Plans must align with project principles in constitution.md
5. **Technology-agnostic specs**: Specifications contain no implementation details

### Task Organization

Tasks follow strict dependency phases:
- **Phase 1: Setup** - Project initialization
- **Phase 2: Foundational** - Blocking prerequisites for all stories
- **Phase 3+: User Stories** - One phase per story, in priority order (P1, P2, P3)
- **Final Phase: Polish** - Cross-cutting concerns

Tasks marked `[P]` can run in parallel (different files, no dependencies).
Tasks marked `[US#]` belong to specific user stories.

### Clarification Limits

When generating specs from user descriptions:
- Maximum 3 `[NEEDS CLARIFICATION]` markers allowed
- Make informed guesses based on context and industry standards
- Only ask about critical decisions affecting scope, security, or UX
- Document assumptions in spec's Assumptions section

### Branch Naming

Format: `###-feature-name` where:
- `###` is auto-incremented based on highest existing branch/spec number
- `feature-name` is 2-4 words extracted from feature description
- Automatically handles GitHub's 244-byte branch name limit

## Important Conventions

### Specification Quality Gates

Before planning, specs must pass validation:
- No implementation details (languages, frameworks, APIs)
- All requirements testable and unambiguous
- Success criteria measurable and technology-agnostic
- All `[NEEDS CLARIFICATION]` markers resolved
- Edge cases identified

### Implementation Rules

From `/speckit.implement`:
1. Check checklists status before starting (if checklists exist)
2. Create/verify ignore files based on detected technologies
3. Execute tasks phase-by-phase, respecting dependencies
4. Mark tasks complete (`[X]`) as work progresses
5. Follow TDD if tests are included (tests before implementation)

### File Path Requirements

- All PowerShell scripts must use absolute paths
- Task descriptions must include exact file paths
- Use repository root as base for all paths

### Tests Optional by Default

Tests are OPTIONAL unless explicitly requested in the feature specification. Don't generate test tasks unless:
- User specifically requests TDD approach
- Feature spec explicitly requires tests
- Tests mentioned in success criteria

## Constitution Structure

Located at `.specify/memory/constitution.md`, defines:
- Core development principles (e.g., library-first, CLI interface, TDD)
- Testing requirements (contract, integration, unit)
- Technology constraints
- Complexity justification requirements
- Governance rules

Plans are validated against constitution during `/speckit.plan`.

## Agent Context Files

Template at `.specify/templates/agent-file-template.md` shows structure for agent-specific guidance:
- Active technologies extracted from feature plans
- Project structure
- Technology-specific commands
- Code style guidelines
- Recent changes

Updated via `update-agent-context.ps1` during planning phase.

## Active Features & Technologies

### Feature: 001-template-catalog-react

**Status**: ✅ Implementation Complete (33/33 tasks) | 📋 Planning Phase: Template Sorting & Badge System (2026-01-28)
**Branch**: `001-template-catalog-react`
**Type**: Multi-view web application (Template Catalog + Report Dashboard)

**Technology Stack**:
- Language: JavaScript (ES6+) / Pure HTML/CSS
- Framework: None required (vanilla JS) / React (optional for Framer)
- Styling: Embedded CSS (Developer Dark Mode theme)
- Data: Hardcoded JavaScript object (no database/API)
- Platform: Any web browser / Framer Code embed
- Companies: 4 (Consulfarma, ICosmetologia, Hi Nutrition, Seminários Consulfarma)

**Visual Design: Developer Dark Mode**
- Style: Terminal/IDE-inspired interface
- Background: neutral-950 (#0a0a0a) - deep black
- Typography: Monospace (ui-monospace, SF Mono, Menlo)
- Accents: Amber-400 (active state), Emerald-500 (success)
- Philosophy: Quiet UI, high density, minimal distractions

**Key Features**:

**Template Catalog (Main Page)**:
- ✅ 4 company tabs with → indicator on active (Updated 2026-01-12)
- ✅ One-click clipboard copy functionality (copies template name)
- ✅ Stats bar showing company + template count
- ✅ Toast notifications with ✓ (success) / ✕ (error) icons
- ✅ Carteiras (sales team) footer for each company
- ✅ Template cards display name + message content
- ✅ Chronological sorting: templates display newest → oldest (DESC by `createdAt`) (NEW 2026-01-28)
- ✅ "Novo" badge: automatically appears on newest template per company (NEW 2026-01-28)
- ✅ Badge inherits company theme color (red/purple/amber/cyan)
- ✅ Fully responsive (320px mobile → 1920px+ desktop)
- ✅ Zero dependencies, works offline

**Report Admin Dashboard (/reportadminx)** (NEW - 2026-01-13):
- 📊 View marketing analytics reports (HTML files)
- 📅 Filter reports by time period (last 7/30/90 days, all time, custom)
- 🏷️ Tag-based organization (leads, conversions, campaigns)
- 📱 Responsive two-column layout (list + viewer)
- 🔒 iframe isolation for report rendering (security)
- 📂 Git-based workflow for adding reports
- 🎨 Extends developer dark mode theme

**Implementation Deliverables**:
```
index.html              # ✅ Primary implementation with routing (~13KB + ~5KB for dashboard)
src/TemplateCatalog.tsx # ✅ React version for Framer Code (257 lines)
reports/                # 🔄 Report storage directory (NEW - 2026-01-13)
├── index.json          # Report metadata index
└── *.html              # Individual report HTML files
README.md               # ✅ User documentation
.gitignore              # ✅ Git configuration
```

**Development Commands**:
```bash
# Open template catalog (no build required)
start index.html               # Windows
open index.html                # Mac

# Open report dashboard
start "index.html#/reportadminx"   # Windows
open "index.html#/reportadminx"    # Mac

# Add a new report (Git workflow)
# 1. Add HTML file to reports/ directory
# 2. Update reports/index.json with metadata
# 3. Commit and push

# Deploy online
netlify deploy --prod
vercel deploy
# Or GitHub Pages (push to main branch)

# No installation needed - pure HTML/CSS/JavaScript
# No dependencies - works completely offline
# No build tools - double-click to run
```

**Project Structure**:
```
.
├── index.html              # Main application (template catalog + routing)
├── src/
│   └── TemplateCatalog.tsx # React version for Framer
├── reports/                # Report dashboard storage (NEW 2026-01-13)
│   ├── index.json          # Report metadata
│   └── *.html              # Report HTML files
├── specs/
│   └── 001-template-catalog-react/
│       ├── spec.md                   # Feature specification
│       ├── plan.md                      # Implementation plan (UPDATED 2026-01-28)
│       ├── tasks.md                     # ✅ 33/33 tasks completed
│       ├── data-model.md                # Template catalog data model
│       ├── research.md                  # Template catalog technical decisions
│       ├── research-reportadmin.md      # Report dashboard research
│       ├── data-model-reportadmin.md    # Report dashboard data model
│       ├── quickstart-reportadmin.md    # Report dashboard usage guide
│       ├── research-template-sorting.md # Template sorting research (NEW 2026-01-28)
│       ├── data-model-sorting.md        # Template sorting data model (NEW 2026-01-28)
│       ├── quickstart-sorting.md        # Template sorting deployment guide (NEW 2026-01-28)
│       ├── contracts/
│       │   ├── component-api.md         # Template catalog API
│       │   ├── reportadmin-api.md       # Report dashboard API
│       │   └── template-sorting-api.md  # Template sorting API (NEW 2026-01-28)
│       └── checklists/
│           └── requirements.md       # ✅ All checks passed
├── README.md               # User documentation
└── .gitignore
```

**Color Palette**:
```css
/* Backgrounds */
#0a0a0a  /* neutral-950 - main */
#171717  /* neutral-900 - cards */
#262626  /* neutral-800 - borders */

/* Text */
#f5f5f5  /* neutral-100 - primary */
#d4d4d4  /* neutral-300 - secondary */
#737373  /* neutral-500 - tertiary */

/* Company Theme Colors */
#ef4444  /* red-500 - Consulfarma */
#a855f7  /* purple-500 - ICosmetologia */
#fbbf24  /* amber-400 - Hi Nutrition */
#06b6d4  /* cyan-500 - Seminários Consulfarma (NEW 2026-01-12) */

/* UI Feedback */
#10b981  /* emerald-500 - success */
#ef4444  /* red-500 - error */
```

**Planning Updates**:

- **2026-01-28**: Template Sorting & "New" Badge System planned
  - Add `createdAt` field to templates (YYYY-MM-DD format)
  - Automatic DESC sorting (newest → oldest)
  - Computed "novo" badge on newest template per company
  - Zero-step deployment (automatic badge management)
  - See [research-template-sorting.md](specs/001-template-catalog-react/research-template-sorting.md) for technical decisions
  - See [quickstart-sorting.md](specs/001-template-catalog-react/quickstart-sorting.md) for deployment workflow
  - See [data-model-sorting.md](specs/001-template-catalog-react/data-model-sorting.md) for schema
  - See [template-sorting-api.md](specs/001-template-catalog-react/contracts/template-sorting-api.md) for API

- **2026-01-13**: Report Admin Dashboard feature planned
  - Hash-based routing for multi-view navigation
  - Report storage via Git (JSON index + HTML files)
  - Period filtering (7/30/90 days, custom range)
  - iframe-based report viewer with style isolation
  - See [plan.md](specs/001-template-catalog-react/plan.md) for implementation phases
  - See [quickstart-reportadmin.md](specs/001-template-catalog-react/quickstart-reportadmin.md) for usage guide

- **2026-01-12**: Seminários Consulfarma company with cyan theme color

**Template Data Structure** (UPDATED 2026-01-28):

Each template now includes a `createdAt` field for automatic sorting and badge display:

```javascript
{
  name: "template_identifier",       // Template name (copied to clipboard)
  message: "Template content...",     // Message text (supports {{1}}, {{2}} placeholders)
  createdAt: "2026-01-28"            // ISO 8601 date (YYYY-MM-DD) for sorting
}
```

**Sorting Behavior**:
- Templates automatically sort DESC by `createdAt` (newest first)
- Templates without `createdAt` sort to end (treated as oldest)
- Stable sort preserves original order for templates with same date

**Badge System**:
- "novo" badge automatically appears on newest template per company
- Badge computed at render time (zero manual deployment steps)
- Badge color matches company theme (red/purple/amber/cyan)
- Each company tab shows its own newest template independently

**Adding New Templates**:
1. Add template object with `name`, `message`, `createdAt` (today's date in YYYY-MM-DD format)
2. Save file and refresh browser
3. Badge automatically appears on new template (system handles it)

**Implementation Status** (2026-01-28):
- [X] All templates have `createdAt` field (data migration complete)
- [X] Implemented `getSortedTemplates(companyKey)` function
- [X] Implemented `getNewestTemplate(companyKey)` function
- [X] Implemented `isNewTemplate(template, companyKey)` function
- [X] Implemented `validateDateFormat()` utility function
- [X] Added `.badge-new` CSS class (below title, company theme color)
- [X] Updated `renderTemplates()` to use sorted templates and badges
- [X] Added ARIA labels for accessibility (`role="status"`, `aria-label`)
- [ ] Manual testing in progress (see [TESTING-CHECKLIST.md](TESTING-CHECKLIST.md))
- [ ] Documentation updates in progress

**Pending Implementation**:

*Report Dashboard*:
- [ ] Implement hash-based routing system
- [ ] Create `/reports/` directory with index.json
- [ ] Build report list component (left sidebar)
- [ ] Build report viewer component (iframe, right pane)
- [ ] Implement period filtering dropdown
- [ ] Add keyboard navigation and accessibility
- [ ] Test responsive layout (mobile/desktop)
- [ ] Update documentation

*Seminários Consulfarma*:
- [ ] Add `seminariosconsulfarma` key to TEMPLATES with 6 new templates
- [ ] Add `seminariosconsulfarma` to COMPANIES array with label "Seminários Consulfarma"
- [ ] Add `seminariosconsulfarma` to CARTEIRAS with sales team data
- [ ] Add CSS theme class `.theme-seminariosconsulfarma` with cyan color variables
- [ ] Update tab ordering: Consulfarma → ICosmetologia → Hi Nutrition → Seminários Consulfarma

**Last Updated**: 2026-01-28