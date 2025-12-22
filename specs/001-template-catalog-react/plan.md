# Implementation Plan: Template Catalog for Sales Teams

**Branch**: `001-template-catalog-react` | **Date**: 2025-12-22 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-template-catalog-react/spec.md`

## Summary

Build a single-file React component for Framer Code that displays template catalogs for three companies (Consulfarma, ICosmetologia, Hi Nutrition). Users can switch between company tabs, view template cards in a responsive grid, and click cards to copy template names to clipboard with visual confirmation. The component is self-contained with hardcoded data, inline styling, and no external dependencies.

## Technical Context

**Language/Version**: JavaScript (ES6+) / React (Framer-provided runtime)
**Primary Dependencies**: None (Framer Code provides React runtime)
**Storage**: N/A (In-memory data object, no persistence)
**Testing**: Manual testing via Framer preview (no automated test framework)
**Target Platform**: Web browsers (via Framer Code embed)
**Project Type**: Single-file component (Framer Code constraint)
**Performance Goals**: <500ms clipboard copy response, 60fps animations
**Constraints**: Single file <500 lines, no external imports, inline styles only, Framer Code compatible
**Scale/Scope**: 3 companies, ~10-30 templates per company (low scale)

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
