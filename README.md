# CSV Runner Dashboard

A full-stack web application for visualizing and analyzing running data from CSV files. Built as part of the Full Stack Development Internship assignment for **Daynt Tech Services LLP**.

**Author:** Pranav Pardeshi

---

## Project Overview

This project implements a **CSV Runner Dashboard** that allows users to:
- Upload CSV files containing running data (date, person, miles run)
- Visualize data through interactive charts
- View summary statistics (overall and per-person)
- Filter and sort data in a tabular format

### Challenge Selected
**CSV Runner Dashboard** - Parse, visualize, and analyze running data from CSV files.

---

## Assumptions

### CSV Format
- **Required columns:** `date`, `person`, `miles run` (case-insensitive, variations like `miles_run` or `milesrun` are accepted)
- **Date formats supported:** 
  - `YYYY-MM-DD` (e.g., 2024-01-15)
  - `MM/DD/YYYY` (e.g., 01/15/2024)
  - `M/D/YYYY` (e.g., 1/5/2024)
- **Miles values:** Positive numbers (integers or decimals)
- **Person names:** Non-empty strings

### Data Handling
- Empty rows are skipped during parsing
- Rows with invalid data are reported as errors but don't prevent valid rows from being processed
- The application works entirely client-side (no server required for basic functionality)

### UI/UX Decisions
- Warm, professional color palette with teal primary and orange accents
- Mobile-responsive design for all screen sizes
- Accessible color contrast ratios (WCAG AA compliant)

---

## Prerequisites

- **Node.js:** v18.0.0 or higher
- **npm:** v9.0.0 or higher (comes with Node.js)
- **Modern browser:** Chrome, Firefox, Safari, or Edge (latest versions)

No database or additional tools required - the application runs entirely in the browser.

---

## Setup

### 1. Clone the Repository
```bash
git clone https://github.com/pranavpardeshi/csv-runner-dashboard.git
cd csv-runner-dashboard
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
No environment variables are required for this project. The application runs entirely client-side.

If you need to add environment variables in the future:
```bash
cp .env.example .env
# Edit .env with your values
```

---

## Run & Verify

### Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

### Build for Production
```bash
npm run build
npm run preview
```

---

## Verification Steps

### 1. Sample CSV Instructions
Click **"Download Sample CSV"** button or **"Load Sample Data"** to test with pre-made data.

**Sample CSV format:**
```csv
date,person,miles run
2024-01-01,Alice,3.5
2024-01-01,Bob,4.2
2024-01-02,Alice,2.8
2024-01-02,Bob,5.0
2024-01-03,Alice,4.0
```

### 2. Test Each Acceptance Criterion

| Criterion | How to Verify |
|-----------|---------------|
| **CSV Parsing** | Upload a valid CSV → Data appears in charts and table |
| **Header Validation** | Upload CSV with wrong headers → Error message displayed |
| **Type Validation** | Upload CSV with invalid miles (negative/text) → Row-level errors shown |
| **Overall Charts** | After upload → Line chart shows all runners' progress over time |
| **Per-Person View** | Click a person's name → Charts filter to show only their data |
| **Metrics (Overall)** | Stats cards show total miles, average, min, max across all data |
| **Metrics (Per-Person)** | Person cards show individual stats with ranking |
| **Error Handling** | Upload invalid file → Clear error messages with line numbers |

### 3. Test Invalid CSV Scenarios
Try uploading:
- A file with missing required columns
- A file with non-numeric miles values
- A file with invalid date formats
- An empty file
- A non-CSV file

Each should display appropriate error messages.

---

## Features & Limitations

### Features
- **Drag-and-drop file upload** with visual feedback
- **Real-time CSV parsing** with detailed error reporting
- **Interactive line chart** showing running progress over time
- **Bar chart comparison** of total miles per person
- **Sortable data table** with all run entries
- **Per-person filtering** for focused analysis
- **Statistics dashboard** with key metrics
- **Sample data generation** for quick testing
- **Responsive design** for all devices
- **Accessible UI** with proper ARIA labels and keyboard navigation

### Known Limitations
- Large CSV files (>10,000 rows) may cause performance slowdowns
- Date parsing assumes consistent format within a single file
- No data persistence (refreshing clears uploaded data)
- Charts may become crowded with many runners (>10)

### Future Improvements
- Add local storage for data persistence
- Implement CSV export functionality
- Add date range filtering
- Support for additional chart types (pie, area)
- Add data editing capabilities
- Implement undo/redo for data changes

---

## Architecture Notes

### Folder Structure
```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components (shadcn/ui)
│   ├── Header.tsx      # App header with branding
│   ├── Footer.tsx      # App footer
│   ├── FileUpload.tsx  # CSV upload component
│   ├── StatsCards.tsx  # Overall statistics display
│   ├── PersonSelector.tsx    # Person filter buttons
│   ├── PersonStatsCard.tsx   # Individual stats card
│   ├── RunningChart.tsx      # Line chart component
│   ├── TotalMilesChart.tsx   # Bar chart component
│   ├── DataTable.tsx         # Sortable data table
│   └── EmptyState.tsx        # Empty state placeholder
├── pages/
│   └── Index.tsx       # Main application page
├── types/
│   └── runner.ts       # TypeScript interfaces
├── utils/
│   ├── csvParser.ts    # CSV parsing logic
│   └── statsCalculator.ts  # Statistics calculations
├── hooks/              # Custom React hooks
├── lib/
│   └── utils.ts        # Utility functions
├── index.css           # Global styles & design tokens
└── main.tsx            # Application entry point
```

### Key Components
| Component | Responsibility |
|-----------|---------------|
| `FileUpload` | Handles file selection, validation, and parsing |
| `StatsCards` | Displays overall metrics in card format |
| `RunningChart` | Renders time-series line chart |
| `TotalMilesChart` | Renders comparison bar chart |
| `DataTable` | Displays sortable, filterable data table |
| `PersonSelector` | Manages person filter state |

### State & Data Flow
- **State Management:** React useState + useMemo for derived data
- **Data Flow:** Unidirectional (parent → child via props)
- **Computed Values:** Statistics calculated on-demand using useMemo
- **No External State:** All state lives in the Index component

### Design System
- **Colors:** HSL-based semantic tokens in CSS variables
- **Typography:** DM Sans (body) + Space Grotesk (display)
- **Spacing:** Consistent 4px grid system
- **Components:** shadcn/ui with custom theming

---

## Accessibility & UI

### Accessibility Features
- **Focus Management:** Visible focus rings on all interactive elements
- **ARIA Labels:** Descriptive labels for screen readers
- **Keyboard Navigation:** Full keyboard support for all interactions
- **Color Contrast:** WCAG AA compliant contrast ratios
- **Semantic HTML:** Proper heading hierarchy and landmark regions
- **Error Announcements:** Screen reader-friendly error messages

### UI Design Principles
- **Clarity:** Clean layout with clear visual hierarchy
- **Consistency:** Uniform spacing, colors, and typography
- **Feedback:** Visual feedback for all user actions
- **Responsiveness:** Adapts gracefully to all screen sizes
- **Loading States:** Skeleton loaders and progress indicators
- **Empty States:** Helpful guidance when no data is present

### Typography
- **Headings:** Space Grotesk (geometric, modern)
- **Body Text:** DM Sans (readable, friendly)
- **Font Sizes:** Responsive scale from 14px to 32px

### Color Palette
- **Primary:** Teal (#0D9488) - actions, links, charts
- **Accent:** Orange (#F97316) - highlights, badges
- **Background:** Warm gray (#FAF9F7) - comfortable viewing
- **Text:** Dark gray (#1C1917) - high readability

---

## Technology Stack

- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS with custom design tokens
- **UI Components:** shadcn/ui (Radix UI primitives)
- **Charts:** Recharts
- **Icons:** Lucide React
- **Routing:** React Router DOM

---

## License

This project was created for educational purposes as part of an internship assignment.

**Created by:** Pranav Pardeshi  
**For:** Daynt Tech Services LLP - Full Stack Development Internship
