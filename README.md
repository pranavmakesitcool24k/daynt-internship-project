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

## Sample CSV (Required for Verification)

A sample CSV file is included in the repository at:

```
public/sample_runner.csv
```

This file can be used to quickly verify:
- CSV parsing and validation
- Overall and per-person charts
- Summary statistics (average, min, max)
- Error-free end-to-end functionality

Reviewers can upload this file directly in the application to validate all acceptance criteria without creating custom test data.

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
git clone https://github.com/pranavpardeshi/daynt-internship-project.git
cd csv-runner-dashboard
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
No environment variables are required for this project. The application runs entirely client-side.

---

## Run & Verify

### Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

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
