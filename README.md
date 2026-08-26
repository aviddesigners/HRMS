# 🏢 Avid Designers – Human Resource & Enterprise Management System (HRMS)

A modern, high-performance, enterprise-grade Human Resource Management, CRM, and Financial Operations platform built for **Avid Designers**.

![Avid Designers HRMS Banner](public/logo.svg)

---

## 🌟 Key Features

### 1. 📊 Executive Dashboards
- **Admin Dashboard**: Real-time KPI summaries, attendance overview, recruitment interview schedules, celebratory reminders, and task trackers.
- **Employee Dashboard**: Self-service portal with one-click punch in/out, shift counters, leave balances, assigned tickets, and team rosters.
- **Deals Dashboard**: Comprehensive financial metrics in Indian Rupees (`₹ INR`), 6 KPI cards, vertical funnel pipelines, top deals radar analytics, and regional lead distributions.
- **Leads Dashboard**: Stage progression funnels, weekly activity heatmaps, reason-for-loss analytics, lead company trackers, and interactive notification approval queues.
- **Super Admin Dashboard**: Multi-tenant metrics, enterprise subscription plans, billing histories, domain verifications, and automated renewal reminder dispatchers.

### 2. 👥 CRM & Deals Suite
- **Contacts & Clients**: 12 detailed profiles with online status, verification badges, direct email copying, role tags, and 5-tab activity feeds (`Activities`, `Notes`, `Calls`, `Files`, `Email`).
- **Company Management**: Directory of enterprise partners, team hierarchy avatars, registered domains, and direct communication history.
- **Deals Kanban Board**: 4-column drag-and-drop lifecycle board (`New`, `Prospect`, `Proposal`, `Won`) with chevron stage pipeline indicators.
- **Pipeline & Activity Tables**: Filterable data tables with custom date range selectors and export capabilities.

### 3. 💼 Human Resource Management (HRM)
- **Employee Directory**: Complete employee management with department sorting, designators, compensation bands, and profile views.
- **Attendance & Timesheets**: Live clock-in tracking, attendance status tags, and late/early departure audits.
- **Leave Management**: Multi-tier leave approval workflow (Casual, Sick, Earned) with balance counters.

### 4. 💰 Finance & Accounts
- Invoicing suite with tax calculations in `₹ INR`, recurring client billing, invoice generation modals, and transaction export.

### 5. 🎯 Recruitment & Talent Acquisition
- Candidate pipeline, job opening manager, applicant tracking, and video interview scheduling.

### 6. 🎫 Helpdesk & Tickets
- Priority-ranked support tickets with SLA timers, agent assignment, and resolution history.

---

## 🛠️ Technology Stack

- **Frontend**: [React 19](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 5](https://vitejs.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Styling**: Tailored Modern CSS Design System with CSS variables and glassmorphism
- **Charts & Visualizations**: Chart.js, React-Chartjs-2 & Custom SVG Data Visualizations
- **Micro-Interactions**: Canvas Confetti

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/aviddesigners/HRMS.git
   cd HRMS
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```

4. **Start local development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` (or `http://localhost:5174`) in your browser.

---

## 📦 Production Build

To create an optimized production bundle:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## 🌐 Deployment

### Vercel / Netlify
1. Connect this repository to your Vercel or Netlify account.
2. Build Settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
3. Client-side routing is handled automatically with Vite SPA configuration.

---

## 📄 License
Copyright © 2026 Avid Designers. All rights reserved.
