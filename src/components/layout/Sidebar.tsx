import React, { useState } from 'react';
import {
  LayoutDashboard,
  FolderKanban,
  Users2,
  Building2,
  Receipt,
  UserCheck,
  ShieldCheck,
  BarChart3,
  ChevronDown,
  ChevronRight,
  Grid,
  FileText,
  UserCircle,
  Briefcase,
  TicketCheck,
  Clock,
  Layers,
  CalendarCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useHRMS, HRMTabType, CRMTabType } from '../../context/HRMSContext';
import { Avatar } from '../common/Avatar';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (c: boolean) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (o: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  setIsCollapsed,
  isMobileOpen,
  setIsMobileOpen
}) => {
  const { currentUser } = useAuth();
  const {
    activeModule,
    setActiveModule,
    hrmTab,
    setHrmTab,
    crmTab,
    setCrmTab,
    dashboardTab,
    setDashboardTab,
    financeTab,
    setFinanceTab,
    recruitmentTab,
    setRecruitmentTab,
    reportTab,
    setReportTab,
    leaveRequests,
    projects,
    leads,
    invoices
  } = useHRMS();

  const [openSubmenus, setOpenSubmenus] = useState<{ [key: string]: boolean }>({
    dashboard: true,
    crm: true,
    hrm: true,
    finance: true,
    recruitment: true,
    reports: true,
    projects: false
  });

  const toggleSubmenu = (menu: string) => {
    setOpenSubmenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const handleNavClick = (id: string, tab?: HRMTabType, crmT?: CRMTabType, dashT?: any, finT?: any, recT?: any, repT?: any) => {
    setActiveModule(id);
    if (tab) {
      setHrmTab(tab);
    }
    if (crmT) {
      setCrmTab(crmT);
    }
    if (dashT) {
      setDashboardTab(dashT);
    }
    if (finT) {
      setFinanceTab(finT);
    }
    if (recT) {
      setRecruitmentTab(recT);
    }
    if (repT) {
      setReportTab(repT);
    }
    if (isMobileOpen) {
      setIsMobileOpen(false);
    }
  };

  const pendingLeaves = leaveRequests.filter((l) => l.status === 'Pending').length;
  const activeProjectsCount = projects.filter((p) => p.status === 'Active').length;
  const activeLeadsCount = leads.filter((l) => l.stage !== 'Won' && l.stage !== 'Lost').length;
  const pendingInvoices = invoices.filter((i) => i.status === 'Pending' || i.status === 'Overdue').length;

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="modal-overlay"
          style={{ zIndex: 45 }}
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        className={`app-sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}
        aria-label="Main Navigation"
        style={{
          backgroundColor: 'var(--color-sidebar)',
          borderRight: '1px solid var(--color-sidebar-border)',
          boxShadow: '0 0 15px rgba(0, 0, 0, 0.03)'
        }}
      >
        {/* Brand Logo Header with exact Avi Designers logo image */}
        <div
          className="sidebar-header"
          style={{
            borderBottom: '1px solid var(--color-border-subtle)',
            height: '76px',
            padding: isCollapsed ? '0 0.5rem' : '0 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: isCollapsed ? 'center' : 'flex-start'
          }}
        >
          <div
            className="brand-logo"
            onClick={() => handleNavClick('Dashboard')}
            style={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              overflow: 'hidden'
            }}
          >
            <img
              src="/logo.png"
              alt="Avi Designers"
              style={{
                height: isCollapsed ? '36px' : '44px',
                width: isCollapsed ? '36px' : 'auto',
                maxWidth: isCollapsed ? '36px' : '160px',
                objectFit: 'contain'
              }}
            />
          </div>
        </div>

        {/* Navigation items list */}
        <nav className="sidebar-nav" style={{ padding: '1rem 0.75rem', gap: '0.25rem', flex: 1, overflowY: 'auto' }}>
          {/* Section: MAIN MENU */}
          {!isCollapsed && (
            <div
              style={{
                fontSize: '0.6875rem',
                fontWeight: 700,
                color: '#94A3B8',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                padding: '0.5rem 0.75rem 0.25rem'
              }}
            >
              MAIN MENU
            </div>
          )}

          {/* 1. Dashboard */}
          <div>
            <div
              className={`nav-item has-tooltip ${activeModule === 'Dashboard' ? 'active' : ''}`}
              onClick={() => handleNavClick('Dashboard')}
              data-tooltip="Admin Dashboard"
              style={{ cursor: 'pointer' }}
            >
              <LayoutDashboard size={18} className="nav-item-icon" />
              {!isCollapsed && (
                <>
                  <span style={{ flex: 1, fontWeight: activeModule === 'Dashboard' ? 700 : 500 }}>
                    Dashboard
                  </span>
                  <span
                    style={{
                      background: '#FF3B30',
                      color: '#ffffff',
                      fontSize: '0.625rem',
                      fontWeight: 700,
                      padding: '0.1rem 0.4rem',
                      borderRadius: 'var(--radius-pill)',
                      marginRight: '0.25rem'
                    }}
                  >
                    Hot
                  </span>
                  <ChevronDown size={14} style={{ color: '#94A3B8' }} />
                </>
              )}
            </div>

            {!isCollapsed && (
              <div style={{ paddingLeft: '2.5rem', display: 'flex', flexDirection: 'column', gap: '0.2rem', marginTop: '0.2rem' }}>
                <div
                  onClick={() => handleNavClick('Dashboard', undefined, undefined, 'admin')}
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: activeModule === 'Dashboard' && dashboardTab === 'admin' ? 700 : 400,
                    color: activeModule === 'Dashboard' && dashboardTab === 'admin' ? 'var(--color-primary)' : '#64748B',
                    padding: '0.3rem 0',
                    cursor: 'pointer'
                  }}
                >
                  Admin Dashboard
                </div>
                <div
                  onClick={() => handleNavClick('Dashboard', undefined, undefined, 'employee')}
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: activeModule === 'Dashboard' && dashboardTab === 'employee' ? 700 : 400,
                    color: activeModule === 'Dashboard' && dashboardTab === 'employee' ? 'var(--color-primary)' : '#64748B',
                    padding: '0.3rem 0',
                    cursor: 'pointer'
                  }}
                >
                  Employee Dashboard
                </div>
                <div
                  onClick={() => handleNavClick('Dashboard', undefined, undefined, 'deals')}
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: activeModule === 'Dashboard' && dashboardTab === 'deals' ? 700 : 400,
                    color: activeModule === 'Dashboard' && dashboardTab === 'deals' ? 'var(--color-primary)' : '#64748B',
                    padding: '0.3rem 0',
                    cursor: 'pointer'
                  }}
                >
                  Deals Dashboard
                </div>
                <div
                  onClick={() => handleNavClick('Dashboard', undefined, undefined, 'leads')}
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: activeModule === 'Dashboard' && dashboardTab === 'leads' ? 700 : 400,
                    color: activeModule === 'Dashboard' && dashboardTab === 'leads' ? 'var(--color-primary)' : '#64748B',
                    padding: '0.3rem 0',
                    cursor: 'pointer'
                  }}
                >
                  Leads Dashboard
                </div>
              </div>
            )}
          </div>

          {/* 2. Applications Section matching exact Figma left navigation */}
          {!isCollapsed && (
            <div
              style={{
                fontSize: '0.6875rem',
                fontWeight: 700,
                color: '#94A3B8',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                padding: '0.75rem 0.75rem 0.25rem'
              }}
            >
              Applications
            </div>
          )}

          {/* Clients */}
          <div
            className={`nav-item ${activeModule === 'CRM' ? 'active' : ''}`}
            onClick={() => handleNavClick('CRM')}
            style={{ cursor: 'pointer' }}
          >
            <UserCircle size={18} className="nav-item-icon" />
            {!isCollapsed && (
              <>
                <span style={{ flex: 1 }}>Clients</span>
                {activeLeadsCount > 0 && <span className="badge badge-purple">{activeLeadsCount}</span>}
              </>
            )}
          </div>

          {/* Projects */}
          <div>
            <div
              className={`nav-item ${activeModule === 'Projects' ? 'active' : ''}`}
              onClick={() => handleNavClick('Projects')}
              style={{ cursor: 'pointer' }}
            >
              <FolderKanban size={18} className="nav-item-icon" />
              {!isCollapsed && (
                <>
                  <span style={{ flex: 1 }}>Projects</span>
                  {activeProjectsCount > 0 && <span className="badge badge-info">{activeProjectsCount}</span>}
                  <ChevronDown size={14} style={{ color: '#94A3B8' }} />
                </>
              )}
            </div>
          </div>

          {/* CRM & Deals */}
          <div>
            <div
              className={`nav-item ${activeModule === 'CRM' ? 'active' : ''}`}
              onClick={() => handleNavClick('CRM', undefined, 'clients')}
              style={{ cursor: 'pointer' }}
            >
              <Users2 size={18} className="nav-item-icon" />
              {!isCollapsed && (
                <>
                  <span style={{ flex: 1 }}>CRM & Deals</span>
                  <ChevronDown size={14} style={{ color: '#94A3B8' }} />
                </>
              )}
            </div>

            {!isCollapsed && (
              <div style={{ paddingLeft: '2.5rem', display: 'flex', flexDirection: 'column', gap: '0.2rem', marginTop: '0.2rem' }}>
                <div
                  onClick={() => handleNavClick('CRM', undefined, 'contacts')}
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: activeModule === 'CRM' && (crmTab === 'contacts' || crmTab === 'clients' || crmTab === 'contact-details') ? 700 : 400,
                    color: activeModule === 'CRM' && (crmTab === 'contacts' || crmTab === 'clients' || crmTab === 'contact-details') ? 'var(--color-primary)' : '#64748B',
                    padding: '0.3rem 0',
                    cursor: 'pointer'
                  }}
                >
                  Contacts
                </div>
                <div
                  onClick={() => handleNavClick('CRM', undefined, 'companies')}
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: activeModule === 'CRM' && (crmTab === 'companies' || crmTab === 'company-details') ? 700 : 400,
                    color: activeModule === 'CRM' && (crmTab === 'companies' || crmTab === 'company-details') ? 'var(--color-primary)' : '#64748B',
                    padding: '0.3rem 0',
                    cursor: 'pointer'
                  }}
                >
                  Companies
                </div>
                <div
                  onClick={() => handleNavClick('CRM', undefined, 'deals')}
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: activeModule === 'CRM' && (crmTab === 'deals' || crmTab === 'deal-details') ? 700 : 400,
                    color: activeModule === 'CRM' && (crmTab === 'deals' || crmTab === 'deal-details') ? 'var(--color-primary)' : '#64748B',
                    padding: '0.3rem 0',
                    cursor: 'pointer'
                  }}
                >
                  Deals
                </div>
                <div
                  onClick={() => handleNavClick('CRM', undefined, 'pipeline')}
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: activeModule === 'CRM' && crmTab === 'pipeline' ? 700 : 400,
                    color: activeModule === 'CRM' && crmTab === 'pipeline' ? 'var(--color-primary)' : '#64748B',
                    padding: '0.3rem 0',
                    cursor: 'pointer'
                  }}
                >
                  Pipeline
                </div>
                <div
                  onClick={() => handleNavClick('CRM', undefined, 'activity')}
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: activeModule === 'CRM' && crmTab === 'activity' ? 700 : 400,
                    color: activeModule === 'CRM' && crmTab === 'activity' ? 'var(--color-primary)' : '#64748B',
                    padding: '0.3rem 0',
                    cursor: 'pointer'
                  }}
                >
                  Activity
                </div>
              </div>
            )}
          </div>

          {/* HRM (Employees, Attendance, Leaves, Designations, Tickets) */}
          <div>
            <div
              className={`nav-item ${activeModule === 'HRM' ? 'active' : ''}`}
              onClick={() => handleNavClick('HRM', 'employees')}
              style={{ cursor: 'pointer' }}
            >
              <Building2 size={18} className="nav-item-icon" />
              {!isCollapsed && (
                <>
                  <span style={{ flex: 1 }}>HRM</span>
                  {pendingLeaves > 0 && <span className="badge badge-warning">{pendingLeaves}</span>}
                  <ChevronDown size={14} style={{ color: '#94A3B8' }} />
                </>
              )}
            </div>

            {!isCollapsed && (
              <div style={{ paddingLeft: '2.5rem', display: 'flex', flexDirection: 'column', gap: '0.2rem', marginTop: '0.2rem' }}>
                <div
                  onClick={() => handleNavClick('HRM', 'employees')}
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: activeModule === 'HRM' && hrmTab === 'employees' ? 700 : 400,
                    color: activeModule === 'HRM' && hrmTab === 'employees' ? 'var(--color-primary)' : '#64748B',
                    padding: '0.3rem 0',
                    cursor: 'pointer'
                  }}
                >
                  Employees Grid
                </div>
                <div
                  onClick={() => handleNavClick('HRM', 'attendance')}
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: activeModule === 'HRM' && hrmTab === 'attendance' ? 700 : 400,
                    color: activeModule === 'HRM' && hrmTab === 'attendance' ? 'var(--color-primary)' : '#64748B',
                    padding: '0.3rem 0',
                    cursor: 'pointer'
                  }}
                >
                  Attendance & Timesheets
                </div>
                <div
                  onClick={() => handleNavClick('HRM', 'leaves')}
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: activeModule === 'HRM' && hrmTab === 'leaves' ? 700 : 400,
                    color: activeModule === 'HRM' && hrmTab === 'leaves' ? 'var(--color-primary)' : '#64748B',
                    padding: '0.3rem 0',
                    cursor: 'pointer'
                  }}
                >
                  Leaves Management
                </div>
                <div
                  onClick={() => handleNavClick('HRM', 'designations')}
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: activeModule === 'HRM' && hrmTab === 'designations' ? 700 : 400,
                    color: activeModule === 'HRM' && hrmTab === 'designations' ? 'var(--color-primary)' : '#64748B',
                    padding: '0.3rem 0',
                    cursor: 'pointer'
                  }}
                >
                  Designations
                </div>
              </div>
            )}
          </div>

          {/* Finance */}
          <div>
            <div
              className={`nav-item ${activeModule === 'Finance & Accounts' ? 'active' : ''}`}
              onClick={() => handleNavClick('Finance & Accounts', undefined, undefined, undefined, 'expenses')}
              style={{ cursor: 'pointer' }}
            >
              <Receipt size={18} className="nav-item-icon" />
              {!isCollapsed && (
                <>
                  <span style={{ flex: 1 }}>Finance</span>
                  {pendingInvoices > 0 && <span className="badge badge-error">{pendingInvoices}</span>}
                  <ChevronDown size={14} style={{ color: '#94A3B8' }} />
                </>
              )}
            </div>

            {!isCollapsed && (
              <div style={{ paddingLeft: '2.5rem', display: 'flex', flexDirection: 'column', gap: '0.2rem', marginTop: '0.2rem' }}>
                <div
                  onClick={() => handleNavClick('Finance & Accounts', undefined, undefined, undefined, 'expenses')}
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: activeModule === 'Finance & Accounts' && financeTab === 'expenses' ? 700 : 400,
                    color: activeModule === 'Finance & Accounts' && financeTab === 'expenses' ? 'var(--color-primary)' : '#64748B',
                    padding: '0.3rem 0',
                    cursor: 'pointer'
                  }}
                >
                  Expenses
                </div>
                <div
                  onClick={() => handleNavClick('Finance & Accounts', undefined, undefined, undefined, 'provident-fund')}
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: activeModule === 'Finance & Accounts' && financeTab === 'provident-fund' ? 700 : 400,
                    color: activeModule === 'Finance & Accounts' && financeTab === 'provident-fund' ? 'var(--color-primary)' : '#64748B',
                    padding: '0.3rem 0',
                    cursor: 'pointer'
                  }}
                >
                  Provident Fund
                </div>
                <div
                  onClick={() => handleNavClick('Finance & Accounts', undefined, undefined, undefined, 'payments')}
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: activeModule === 'Finance & Accounts' && financeTab === 'payments' ? 700 : 400,
                    color: activeModule === 'Finance & Accounts' && financeTab === 'payments' ? 'var(--color-primary)' : '#64748B',
                    padding: '0.3rem 0',
                    cursor: 'pointer'
                  }}
                >
                  Payments
                </div>
                <div
                  onClick={() => handleNavClick('Finance & Accounts', undefined, undefined, undefined, 'employee-salary')}
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: activeModule === 'Finance & Accounts' && financeTab === 'employee-salary' ? 700 : 400,
                    color: activeModule === 'Finance & Accounts' && financeTab === 'employee-salary' ? 'var(--color-primary)' : '#64748B',
                    padding: '0.3rem 0',
                    cursor: 'pointer'
                  }}
                >
                  Employee Salary
                </div>
                <div
                  onClick={() => handleNavClick('Finance & Accounts', undefined, undefined, undefined, 'payslip')}
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: activeModule === 'Finance & Accounts' && financeTab === 'payslip' ? 700 : 400,
                    color: activeModule === 'Finance & Accounts' && financeTab === 'payslip' ? 'var(--color-primary)' : '#64748B',
                    padding: '0.3rem 0',
                    cursor: 'pointer'
                  }}
                >
                  Payslip
                </div>
                <div
                  onClick={() => handleNavClick('Finance & Accounts', undefined, undefined, undefined, 'invoices')}
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: activeModule === 'Finance & Accounts' && financeTab === 'invoices' ? 700 : 400,
                    color: activeModule === 'Finance & Accounts' && financeTab === 'invoices' ? 'var(--color-primary)' : '#64748B',
                    padding: '0.3rem 0',
                    cursor: 'pointer'
                  }}
                >
                  Invoices & Billing
                </div>
              </div>
            )}
          </div>

          {/* Recruitment */}
          <div>
            <div
              className={`nav-item ${activeModule === 'Recruitment' ? 'active' : ''}`}
              onClick={() => handleNavClick('Recruitment', undefined, undefined, undefined, undefined, 'jobs')}
              style={{ cursor: 'pointer' }}
            >
              <UserCheck size={18} className="nav-item-icon" />
              {!isCollapsed && (
                <>
                  <span style={{ flex: 1 }}>Recruitment</span>
                  <ChevronDown size={14} style={{ color: '#94A3B8' }} />
                </>
              )}
            </div>

            {!isCollapsed && (
              <div style={{ paddingLeft: '2.5rem', display: 'flex', flexDirection: 'column', gap: '0.2rem', marginTop: '0.2rem' }}>
                <div
                  onClick={() => handleNavClick('Recruitment', undefined, undefined, undefined, undefined, 'jobs')}
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: activeModule === 'Recruitment' && recruitmentTab === 'jobs' ? 700 : 400,
                    color: activeModule === 'Recruitment' && recruitmentTab === 'jobs' ? 'var(--color-primary)' : '#64748B',
                    padding: '0.3rem 0',
                    cursor: 'pointer'
                  }}
                >
                  Jobs
                </div>
                <div
                  onClick={() => handleNavClick('Recruitment', undefined, undefined, undefined, undefined, 'candidates')}
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: activeModule === 'Recruitment' && recruitmentTab === 'candidates' ? 700 : 400,
                    color: activeModule === 'Recruitment' && recruitmentTab === 'candidates' ? 'var(--color-primary)' : '#64748B',
                    padding: '0.3rem 0',
                    cursor: 'pointer'
                  }}
                >
                  Candidates
                </div>
                <div
                  onClick={() => handleNavClick('Recruitment', undefined, undefined, undefined, undefined, 'referrals')}
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: activeModule === 'Recruitment' && recruitmentTab === 'referrals' ? 700 : 400,
                    color: activeModule === 'Recruitment' && recruitmentTab === 'referrals' ? 'var(--color-primary)' : '#64748B',
                    padding: '0.3rem 0',
                    cursor: 'pointer'
                  }}
                >
                  Referrals
                </div>
                <div
                  onClick={() => handleNavClick('Recruitment', undefined, undefined, undefined, undefined, 'pipeline')}
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: activeModule === 'Recruitment' && recruitmentTab === 'pipeline' ? 700 : 400,
                    color: activeModule === 'Recruitment' && recruitmentTab === 'pipeline' ? 'var(--color-primary)' : '#64748B',
                    padding: '0.3rem 0',
                    cursor: 'pointer'
                  }}
                >
                  Hiring Pipeline
                </div>
              </div>
            )}
          </div>

          {/* Reports */}
          <div>
            <div
              className={`nav-item ${activeModule === 'Reports' ? 'active' : ''}`}
              onClick={() => handleNavClick('Reports', undefined, undefined, undefined, undefined, undefined, 'daily')}
              style={{ cursor: 'pointer' }}
            >
              <BarChart3 size={18} className="nav-item-icon" />
              {!isCollapsed && (
                <>
                  <span style={{ flex: 1 }}>Reports</span>
                  <ChevronDown size={14} style={{ color: '#94A3B8' }} />
                </>
              )}
            </div>

            {!isCollapsed && (
              <div style={{ paddingLeft: '2.5rem', display: 'flex', flexDirection: 'column', gap: '0.2rem', marginTop: '0.2rem' }}>
                <div
                  onClick={() => handleNavClick('Reports', undefined, undefined, undefined, undefined, undefined, 'daily')}
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: activeModule === 'Reports' && reportTab === 'daily' ? 700 : 400,
                    color: activeModule === 'Reports' && reportTab === 'daily' ? 'var(--color-primary)' : '#64748B',
                    padding: '0.3rem 0',
                    cursor: 'pointer'
                  }}
                >
                  Daily Report
                </div>
                <div
                  onClick={() => handleNavClick('Reports', undefined, undefined, undefined, undefined, undefined, 'payslip')}
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: activeModule === 'Reports' && reportTab === 'payslip' ? 700 : 400,
                    color: activeModule === 'Reports' && reportTab === 'payslip' ? 'var(--color-primary)' : '#64748B',
                    padding: '0.3rem 0',
                    cursor: 'pointer'
                  }}
                >
                  Payslip Report
                </div>
                <div
                  onClick={() => handleNavClick('Reports', undefined, undefined, undefined, undefined, undefined, 'leave')}
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: activeModule === 'Reports' && reportTab === 'leave' ? 700 : 400,
                    color: activeModule === 'Reports' && reportTab === 'leave' ? 'var(--color-primary)' : '#64748B',
                    padding: '0.3rem 0',
                    cursor: 'pointer'
                  }}
                >
                  Leave Report
                </div>
                <div
                  onClick={() => handleNavClick('Reports', undefined, undefined, undefined, undefined, undefined, 'attendance')}
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: activeModule === 'Reports' && reportTab === 'attendance' ? 700 : 400,
                    color: activeModule === 'Reports' && reportTab === 'attendance' ? 'var(--color-primary)' : '#64748B',
                    padding: '0.3rem 0',
                    cursor: 'pointer'
                  }}
                >
                  Attendance Report
                </div>
                <div
                  onClick={() => handleNavClick('Reports', undefined, undefined, undefined, undefined, undefined, 'employee')}
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: activeModule === 'Reports' && reportTab === 'employee' ? 700 : 400,
                    color: activeModule === 'Reports' && reportTab === 'employee' ? 'var(--color-primary)' : '#64748B',
                    padding: '0.3rem 0',
                    cursor: 'pointer'
                  }}
                >
                  Employee Report
                </div>
              </div>
            )}
          </div>

          {/* Tickets */}
          <div
            className={`nav-item ${activeModule === 'Tickets' ? 'active' : ''}`}
            onClick={() => handleNavClick('Tickets')}
            style={{ cursor: 'pointer' }}
          >
            <TicketCheck size={18} className="nav-item-icon" />
            {!isCollapsed && (
              <>
                <span style={{ flex: 1 }}>Tickets</span>
                <span className="badge badge-info">12</span>
              </>
            )}
          </div>

          {/* Super Admin */}
          <div>
            <div
              className={`nav-item ${activeModule === 'Admin' || (activeModule === 'Dashboard' && dashboardTab === 'superadmin') ? 'active' : ''}`}
              onClick={() => handleNavClick('Dashboard', undefined, undefined, 'superadmin')}
              style={{ cursor: 'pointer', marginTop: '0.5rem' }}
            >
              <ShieldCheck size={18} className="nav-item-icon" />
              {!isCollapsed && (
                <>
                  <span style={{ flex: 1 }}>Super Admin</span>
                  <ChevronDown size={14} style={{ color: '#94A3B8' }} />
                </>
              )}
            </div>

            {!isCollapsed && (
              <div style={{ paddingLeft: '2.5rem', display: 'flex', flexDirection: 'column', gap: '0.2rem', marginTop: '0.2rem' }}>
                <div
                  onClick={() => handleNavClick('Dashboard', undefined, undefined, 'superadmin')}
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: activeModule === 'Dashboard' && dashboardTab === 'superadmin' ? 700 : 400,
                    color: activeModule === 'Dashboard' && dashboardTab === 'superadmin' ? 'var(--color-primary)' : '#64748B',
                    padding: '0.3rem 0',
                    cursor: 'pointer'
                  }}
                >
                  Dashboard
                </div>
                <div
                  onClick={() => handleNavClick('CRM', undefined, 'companies')}
                  style={{ fontSize: '0.75rem', color: '#64748B', padding: '0.3rem 0', cursor: 'pointer' }}
                >
                  Companies
                </div>
                <div
                  onClick={() => handleNavClick('Finance & Accounts')}
                  style={{ fontSize: '0.75rem', color: '#64748B', padding: '0.3rem 0', cursor: 'pointer' }}
                >
                  Subscription
                </div>
                <div
                  onClick={() => handleNavClick('Admin')}
                  style={{ fontSize: '0.75rem', color: '#64748B', padding: '0.3rem 0', cursor: 'pointer' }}
                >
                  Packages
                </div>
                <div
                  onClick={() => handleNavClick('Admin')}
                  style={{ fontSize: '0.75rem', color: '#64748B', padding: '0.3rem 0', cursor: 'pointer' }}
                >
                  Domain
                </div>
                <div
                  onClick={() => handleNavClick('Finance & Accounts')}
                  style={{ fontSize: '0.75rem', color: '#64748B', padding: '0.3rem 0', cursor: 'pointer' }}
                >
                  Purchase Transaction
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Sidebar Footer User Info */}
        <div
          className="sidebar-footer"
          style={{
            backgroundColor: '#FAFAFA',
            borderTop: '1px solid var(--color-border)',
            padding: '0.875rem'
          }}
        >
          {currentUser && (
            <div
              className="user-quick-profile"
              onClick={() => handleNavClick('Admin')}
              style={{ padding: '0.375rem', borderRadius: 'var(--radius-md)', color: '#1E293B' }}
            >
              <Avatar
                src={currentUser.avatar}
                name={currentUser.name}
                size={isCollapsed ? 'sm' : 'md'}
              />
              {!isCollapsed && (
                <div className="user-info">
                  <span className="user-name" style={{ color: '#1E293B', fontWeight: 700 }}>
                    {currentUser.name}
                  </span>
                  <span className="user-role" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
                    {currentUser.role}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
