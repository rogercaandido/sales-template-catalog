import React, { useState } from 'react';

// T003: Define TEMPLATES data object with all three companies
// T032: Inline code comments explaining update pattern:
// To update templates:
// 1. Add/remove/edit template names in the arrays below
// 2. No component logic changes needed - just edit this data object
// 3. Save file and Framer will auto-refresh the preview
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

// T004: Define COMPANIES configuration array for tab metadata
const COMPANIES = [
  { id: 'consulfarma', label: 'Consulfarma' },
  { id: 'icosmetologia', label: 'ICosmetologia' },
  { id: 'hinutrition', label: 'Hi Nutrition' }
];

// T006: Define dark theme style objects - Developer Dark Mode
const styles = {
  container: {
    backgroundColor: '#0a0a0a', // neutral-950
    minHeight: '100vh',
    padding: 'clamp(16px, 4vw, 24px)',
    fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
    color: '#f5f5f5', // neutral-100
    fontSize: '0.875rem',
    lineHeight: '1.5'
  },
  header: {
    marginBottom: 'clamp(20px, 4vw, 32px)',
    paddingBottom: '12px',
    borderBottom: '1px solid #262626' // neutral-800
  },
  headerTitle: {
    fontSize: '0.75rem',
    color: '#a3a3a3', // neutral-400
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '8px'
  },
  headerSubtitle: {
    fontSize: '1rem',
    color: '#f5f5f5', // neutral-100
    fontWeight: '500'
  },
  stats: {
    display: 'flex',
    gap: '16px',
    marginBottom: '12px',
    fontSize: '0.75rem',
    color: '#737373' // neutral-500
  },
  statsItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  statsValue: {
    color: '#fbbf24', // amber-400
    fontWeight: '600'
  },
  tabContainer: {
    display: 'flex',
    gap: '4px',
    marginBottom: 'clamp(16px, 3vw, 24px)',
    flexWrap: 'wrap',
    overflowX: 'auto'
  },
  tab: {
    padding: '6px 12px',
    minHeight: '32px',
    backgroundColor: '#171717', // neutral-900
    border: '1px solid #262626', // neutral-800
    borderRadius: '4px',
    color: '#737373', // neutral-500
    cursor: 'pointer',
    fontSize: '0.75rem',
    fontFamily: 'inherit',
    transition: 'all 0.15s ease',
    whiteSpace: 'nowrap',
    position: 'relative'
  },
  tabHover: {
    backgroundColor: '#262626',
    color: '#d4d4d4'
  },
  tabActive: {
    backgroundColor: 'rgba(251, 191, 36, 0.1)', // amber-500/10
    borderColor: '#fbbf24', // amber-400
    color: '#fbbf24'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(min(240px, 100%), 1fr))',
    gap: '8px',
    marginTop: 'clamp(12px, 2vw, 16px)'
  },
  card: {
    backgroundColor: '#171717', // neutral-900
    border: '1px solid #262626', // neutral-800
    borderRadius: '4px',
    padding: '12px',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    minHeight: '44px',
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontSize: '0.875rem',
    color: '#d4d4d4' // neutral-300
  },
  cardHover: {
    backgroundColor: '#262626',
    borderColor: '#404040', // neutral-700
    color: '#f5f5f5',
    transform: 'translateY(-1px)'
  },
  toast: {
    position: 'fixed',
    bottom: '16px',
    right: '16px',
    maxWidth: 'calc(100vw - 32px)',
    backgroundColor: 'rgba(16, 185, 129, 0.95)', // emerald-500
    color: '#0a0a0a',
    padding: '10px 16px',
    borderRadius: '4px',
    fontSize: '0.75rem',
    fontWeight: '600',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
    zIndex: 1000,
    border: '1px solid #10b981'
  },
  toastError: {
    backgroundColor: 'rgba(239, 68, 68, 0.95)',
    borderColor: '#ef4444'
  }
};

// Template Catalog Component for Sales Teams
export default function TemplateCatalog() {
  // T005: Implement component state management using useState hooks
  const [activeTab, setActiveTab] = useState('consulfarma');
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [hoveredCard, setHoveredCard] = useState(null);

  // T010: Implement copyToClipboard function using navigator.clipboard.writeText()
  const copyToClipboard = async (templateName) => {
    try {
      await navigator.clipboard.writeText(templateName);
      // T011: Show toast notification with auto-dismiss
      // T029: Handle rapid successive clicks - update toast message correctly
      setToastMessage(`Copied to clipboard!`);
      setToastVisible(true);

      // Auto-dismiss after 2 seconds
      setTimeout(() => {
        setToastVisible(false);
      }, 2000);
    } catch (error) {
      // T028: Handle clipboard permission denied error
      setToastMessage('Copy failed. Please try again.');
      setToastVisible(true);
      setTimeout(() => {
        setToastVisible(false);
      }, 2000);
    }
  };

  // Get current templates based on active tab
  const currentTemplates = TEMPLATES[activeTab] || [];

  // T018: Connect tab onClick handlers to update activeTab state
  const handleTabClick = (companyId) => {
    // T020: Implement idempotent tab behavior (clicking active tab does nothing)
    if (companyId !== activeTab) {
      setActiveTab(companyId);
    }
  };

  // T007: Implement main component structure with container layout
  return (
    <div style={styles.container}>
      {/* T015: Implement company tabs container with horizontal layout and spacing */}
      <div style={styles.tabContainer}>
        {COMPANIES.map((company) => {
          const isActive = activeTab === company.id;

          return (
            // T016: Implement individual tab components with label, active state styling, and hover effects
            <button
              key={company.id}
              style={{
                ...styles.tab,
                // T016: Active state styling
                ...(isActive ? styles.tabActive : {})
              }}
              onClick={() => handleTabClick(company.id)}
            >
              {company.label}
              {/* T017: Add active tab visual indicator (blue underline) */}
              {isActive && <div style={styles.tabIndicator} />}
            </button>
          );
        })}
      </div>

      {/* T009: Implement template grid layout using CSS Grid with responsive columns */}
      <div style={styles.grid}>
        {/* T027: Handle empty template arrays */}
        {currentTemplates.length === 0 ? (
          <div style={{
            gridColumn: '1 / -1',
            textAlign: 'center',
            padding: '48px 24px',
            color: '#64748b',
            fontSize: '16px'
          }}>
            No templates available
          </div>
        ) : (
          currentTemplates.map((template, index) => (
            // T008: Implement template card component with dark theme styling
            <div
              key={index}
              style={{
                ...styles.card,
                // T013: Add visual feedback for click interaction
                ...(hoveredCard === index ? styles.cardHover : {})
              }}
              // T012: Connect onClick handlers to trigger copy and toast display
              onClick={() => copyToClipboard(template)}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {template}
            </div>
          ))
        )}
      </div>

      {/* T014: Implement toast component with fixed positioning and dark theme styling */}
      {toastVisible && (
        <div style={styles.toast}>
          {toastMessage}
        </div>
      )}
    </div>
  );
}
