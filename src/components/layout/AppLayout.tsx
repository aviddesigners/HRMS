import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useHRMS } from '../../context/HRMSContext';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { GlobalSearchModal } from './GlobalSearchModal';
import { Users, Sliders, Sun, Moon } from 'lucide-react';

// Pages
import { DashboardPage } from '../../pages/dashboard/DashboardPage';
import { ProjectsPage } from '../../pages/projects/ProjectsPage';
import { CRMPage } from '../../pages/crm/CRMPage';
import { HRMPage } from '../../pages/hrm/HRMPage';
import { FinancePage } from '../../pages/finance/FinancePage';
import { RecruitmentPage } from '../../pages/recruitment/RecruitmentPage';
import { AdminPage } from '../../pages/admin/AdminPage';
import { ReportsPage } from '../../pages/reports/ReportsPage';
import { TicketsPage } from '../../pages/tickets/TicketsPage';
import { AuthPage } from '../../pages/auth/AuthPage';

// Contextual Modals
import { CreateProjectModal } from '../../pages/projects/CreateProjectModal';
import { AddLeadModal } from '../../pages/crm/AddLeadModal';
import { AddEmployeeModal } from '../../pages/hrm/AddEmployeeModal';
import { CreateInvoiceModal } from '../../pages/finance/CreateInvoiceModal';
import { PostJobModal } from '../../pages/recruitment/PostJobModal';

export const AppLayout: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { activeModule, setActiveModule } = useHRMS();

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Contextual Modals
  const [isCreateProjOpen, setIsCreateProjOpen] = useState(false);
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);
  const [isAddEmpOpen, setIsAddEmpOpen] = useState(false);
  const [isCreateInvOpen, setIsCreateInvOpen] = useState(false);
  const [isPostJobOpen, setIsPostJobOpen] = useState(false);

  const handleContextualAction = (actionName: string) => {
    switch (actionName) {
      case 'create_project':
        setIsCreateProjOpen(true);
        break;
      case 'add_lead':
        setIsAddLeadOpen(true);
        break;
      case 'add_employee':
        setIsAddEmpOpen(true);
        break;
      case 'create_invoice':
        setIsCreateInvOpen(true);
        break;
      case 'post_job':
        setIsPostJobOpen(true);
        break;
    }
  };

  // If not authenticated or explicit Auth page selected
  if (!isAuthenticated || activeModule === 'Auth') {
    return <AuthPage onAuthenticated={() => setActiveModule('Dashboard')} />;
  }

  const renderModuleContent = () => {
    switch (activeModule) {
      case 'Dashboard':
        return <DashboardPage />;
      case 'Projects':
        return <ProjectsPage />;
      case 'CRM':
        return <CRMPage />;
      case 'HRM':
        return <HRMPage />;
      case 'Tickets':
        return <TicketsPage />;
      case 'Finance & Accounts':
        return <FinancePage />;
      case 'Recruitment':
        return <RecruitmentPage />;
      case 'Admin':
        return <AdminPage />;
      case 'Reports':
        return <ReportsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="app-shell">
      {/* Collapsible Sidebar Navigation */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        isMobileOpen={isMobileMenuOpen}
        setIsMobileOpen={setIsMobileMenuOpen}
      />

      {/* Main Workspace Layout */}
      <div className={`app-main ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        {/* Sticky Top Header */}
        <Header
          onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          onOpenContextualAction={handleContextualAction}
        />

        {/* Dynamic Page Outlet */}
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {renderModuleContent()}
        </main>

        {/* App Footer matching exact Figma screenshot */}
        <footer
          style={{
            padding: '1rem 1.5rem',
            borderTop: '1px solid var(--color-border)',
            background: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.75rem',
            color: '#64748B'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#94A3B8' }}>
              <Users size={14} style={{ cursor: 'pointer' }} onClick={() => setActiveModule('HRM')} />
              <Sliders size={14} style={{ cursor: 'pointer' }} onClick={() => setActiveModule('Admin')} />
              <Sun size={14} style={{ cursor: 'pointer' }} />
            </div>
            <span>2026 © Avi Designers</span>
          </div>

          <div>
            <span>Designed &amp; Developed By <strong style={{ color: 'var(--color-primary)' }}>Dreams</strong></span>
          </div>
        </footer>
      </div>

      {/* Global Search Dialog Modal (⌘K / Ctrl+K) */}
      <GlobalSearchModal />

      {/* Contextual Global Modals */}
      <CreateProjectModal
        isOpen={isCreateProjOpen}
        onClose={() => setIsCreateProjOpen(false)}
      />

      <AddLeadModal
        isOpen={isAddLeadOpen}
        onClose={() => setIsAddLeadOpen(false)}
      />

      <AddEmployeeModal
        isOpen={isAddEmpOpen}
        onClose={() => setIsAddEmpOpen(false)}
      />

      <CreateInvoiceModal
        isOpen={isCreateInvOpen}
        onClose={() => setIsCreateInvOpen(false)}
      />

      <PostJobModal
        isOpen={isPostJobOpen}
        onClose={() => setIsPostJobOpen(false)}
      />
    </div>
  );
};
