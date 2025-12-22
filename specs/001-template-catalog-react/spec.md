# Feature Specification: Template Catalog for Sales Teams

**Feature Branch**: `001-template-catalog-react`
**Created**: 2025-12-22
**Status**: Draft
**Input**: User description: "Build a single-page React application for Framer Code embed. This is a template reference catalog for sales teams across three companies: Consulfarma, ICosmetologia, and Hi Nutrition."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View and Copy Template Names (Priority: P1)

A sales team member needs to quickly find and reference template names during client communications. They open the catalog, browse templates for their company, and click a template card to copy its name to clipboard for pasting into emails or documents.

**Why this priority**: This is the core value proposition - enabling sales teams to quickly access and share accurate template names. Without this, the tool has no purpose.

**Independent Test**: Can be fully tested by opening the catalog, switching between company tabs, clicking any template card, and verifying the template name is copied to clipboard with a confirmation message.

**Acceptance Scenarios**:

1. **Given** the catalog is loaded with the default company tab active, **When** a user clicks on any template card, **Then** the template name is copied to clipboard and a confirmation toast appears briefly
2. **Given** a user has switched to a different company tab, **When** they click a template card, **Then** the correct template name for that company is copied to clipboard
3. **Given** multiple template cards are visible, **When** a user clicks different cards in sequence, **Then** each click copies the respective template name and shows individual confirmation toasts

---

### User Story 2 - Switch Between Company Catalogs (Priority: P2)

A sales team member who works across multiple companies needs to switch between different company template catalogs. They click on company tabs to view templates specific to Consulfarma, ICosmetologia, or Hi Nutrition.

**Why this priority**: Enables multi-company sales teams to use a single tool for all their template needs, improving efficiency and reducing tool sprawl.

**Independent Test**: Can be tested independently by clicking each of the three company tabs and verifying that different template sets are displayed with proper visual indication of the active tab.

**Acceptance Scenarios**:

1. **Given** the catalog is open on any company tab, **When** a user clicks a different company tab, **Then** the template grid updates to show only templates for the selected company and the tab indicator moves to the active tab
2. **Given** a user has already clicked several template cards on one company tab, **When** they switch to another company tab, **Then** the template grid refreshes without any clipboard or state interference
3. **Given** the user is viewing templates for one company, **When** they click the currently active tab again, **Then** nothing changes (idempotent behavior)

---

### User Story 3 - Responsive Experience Across Devices (Priority: P3)

A sales team member accesses the catalog from various devices (desktop, tablet, mobile) depending on their current work context. The catalog automatically adapts its layout to provide an optimal viewing experience on any screen size.

**Why this priority**: Sales teams work flexibly across devices. Responsive design ensures the tool is useful in all work contexts, but basic functionality works even without perfect responsive behavior.

**Independent Test**: Can be tested by resizing the browser window or opening on different device sizes and verifying that template cards reflow appropriately and all interactive elements remain accessible.

**Acceptance Scenarios**:

1. **Given** the catalog is displayed on a desktop screen, **When** the viewport is resized to tablet width, **Then** the template grid adjusts to show fewer columns while maintaining card visibility and usability
2. **Given** the catalog is viewed on a mobile device, **When** a user taps a template card, **Then** the clipboard copy works correctly and the toast notification is visible and appropriately sized
3. **Given** any viewport size, **When** a user interacts with company tabs, **Then** tabs remain accessible and clearly indicate the active state

---

### Edge Cases

- What happens when the clipboard API is not available or blocked by browser permissions?
- How does the system handle extremely long template names that might break card layouts?
- What happens when a company has zero templates defined in the data object?
- How does the interface behave if a user rapidly clicks multiple template cards in quick succession?
- What happens if template names contain special characters or emojis?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display template cards organized by company-specific tabs for Consulfarma, ICosmetologia, and Hi Nutrition
- **FR-002**: System MUST copy the selected template name to the user's clipboard when any template card is clicked
- **FR-003**: System MUST display a brief visual confirmation (toast notification) after successfully copying a template name
- **FR-004**: System MUST allow users to switch between company tabs without losing application state or causing errors
- **FR-005**: System MUST store template data in an easily editable data structure at the component level
- **FR-006**: System MUST render template cards in a responsive grid that adapts to different screen sizes
- **FR-007**: System MUST provide visual feedback on interactive elements (hover states on cards and tabs)
- **FR-008**: System MUST clearly indicate which company tab is currently active
- **FR-009**: System MUST handle clipboard copy operations gracefully, with fallback behavior if clipboard access is denied
- **FR-010**: System MUST maintain visual consistency with a developer-inspired dark theme aesthetic

### Key Entities

- **Template**: Represents a sales template with a name property. Templates are grouped by company.
- **Company**: Represents one of three organizations (Consulfarma, ICosmetologia, Hi Nutrition). Each company has an associated collection of templates.
- **Tab State**: Represents which company's templates are currently being displayed to the user.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can copy a template name to clipboard within 2 clicks (select tab, click card)
- **SC-002**: Template data can be updated by editing a single data structure without modifying component logic
- **SC-003**: The interface remains fully functional across screen widths from 320px (mobile) to 1920px (desktop)
- **SC-004**: Clipboard copy operations complete and show confirmation within 500ms of user interaction
- **SC-005**: Users can identify which company tab is active without reading text (through visual indicators)
- **SC-006**: 100% of template cards are accessible and clickable on all supported screen sizes

## Assumptions

- The catalog will be embedded within Framer Code environment which provides standard web APIs
- Framer provides access to standard clipboard API (navigator.clipboard)
- Template names are static strings that don't require internationalization or localization
- All three companies will maintain relatively similar numbers of templates (no extreme scaling needs)
- Users have modern browsers with JavaScript enabled (Framer requirement)
- No user authentication or access control is needed - all templates are publicly accessible
- Template names are unique within each company's catalog
- No search or filtering functionality is required for the MVP
- No template editing or management interface is needed - templates are managed via code
- Toast notifications can be simple and don't require complex notification management or queuing
