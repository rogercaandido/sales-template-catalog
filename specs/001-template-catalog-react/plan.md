# Implementation Plan: Template Catalog for Sales Teams

**Branch**: `001-template-catalog-react` | **Date**: 2025-12-22 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-template-catalog-react/spec.md`

## Summary

Build a single-file React component for Framer Code that displays template catalogs for four companies (Consulfarma, ICosmetologia, Hi Nutrition, Seminários Consulfarma). Users can switch between company tabs, view template cards in a responsive grid, and click cards to copy template names to clipboard with visual confirmation. The component is self-contained with hardcoded data, inline styling, and no external dependencies.

**Update (2026-01-12)**: Adding fourth company category "Seminários Consulfarma" with 6 event-related templates and cyan color theme.

## Technical Context

**Language/Version**: JavaScript (ES6+) / React (Framer-provided runtime)
**Primary Dependencies**: None (Framer Code provides React runtime)
**Storage**: N/A (In-memory data object, no persistence)
**Testing**: Manual testing via Framer preview (no automated test framework)
**Target Platform**: Web browsers (via Framer Code embed)
**Project Type**: Single-file component (Framer Code constraint)
**Performance Goals**: <500ms clipboard copy response, 60fps animations
**Constraints**: Single file <500 lines, no external imports, inline styles only, Framer Code compatible
**Scale/Scope**: 4 companies (Consulfarma, ICosmetologia, Hi Nutrition, Seminários Consulfarma), ~6-20 templates per company (low scale)

## Constitution Check

*GATE: Constitution file is currently a template. Skipping validation for this feature.*

**Status**: N/A - Constitution not yet defined for this project

## Project Structure

### Documentation (this feature)

```text
specs/001-template-catalog-react/
├── plan.md              # This file
├── research.md          # Phase 0 output (technical decisions)
├── data-model.md        # Phase 1 output (data structures)
├── quickstart.md        # Phase 1 output (usage guide)
└── contracts/           # Phase 1 output (component interface)
    └── component-api.md # Component props and behavior
```

### Source Code (repository root)

```text
src/
└── TemplateCatalog.tsx  # Single self-contained component

# No tests/ directory - manual testing only per user constraints
```

**Structure Decision**: Single-file architecture required by Framer Code. The entire application exists in one component file with:
- Data object at top of file
- Component logic using React hooks (useState)
- Inline styles as JavaScript objects
- No separate modules, no imports beyond React (provided by Framer)

This structure optimizes for:
1. Framer Code compatibility (paste-and-go workflow)
2. Easy template updates (edit data object)
3. Maintainability (single file <500 lines)
4. Zero build/deploy complexity

## Complexity Tracking

> **No constitution violations** - Constitution not yet defined. If defined later, this simple single-file component should pass all reasonable complexity gates.

## Modification Log

### 2026-01-12: Add Seminários Consulfarma Company

**Context**: User requested addition of fourth company category for event/seminar templates.

**Changes Required**:
1. Add new color theme (cyan #06b6d4) for Seminários Consulfarma
2. Add 6 new templates to data structure
3. Extend COMPANIES array with new tab entry
4. Add carteiras assignment for new company
5. Update CSS theme classes to include `theme-seminariosconsulfarma`

**Impact**:
- Zero logic changes (existing rendering handles 4+ tabs)
- Pure data additions to existing structure
- One new CSS class for theme
- Maintains backward compatibility

**Technical Approach**: See [research.md](./research.md) for detailed color selection rationale and implementation decisions.
