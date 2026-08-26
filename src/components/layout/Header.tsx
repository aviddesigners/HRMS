import React, { useState } from 'react';
import {
  Menu,
  Search,
  Bell,
  HelpCircle,
  ChevronDown,
  UserCheck,
  Plus,
  Check,
  LogOut,
  Shield,
  Clock,
  Sparkles,
  Layers,
  FileText,
  Sun,
  Moon
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useHRMS } from '../../context/HRMSContext';
import { Avatar } from '../common/Avatar';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';
import { UserRole } from '../../types';

interface HeaderProps {
  onMobileMenuToggle: () => void;
  onOpenContextualAction?: (actionName: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onMobileMenuToggle,
  onOpenContextualAction
}) => {
  const { currentUser, switchRole, logout } = useAuth();
  const {
    activeModule,
    setActiveModule,
    setIsSearchModalOpen,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    isClockedIn,
    toggleClockInOut
  } = useHRMS();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isDarkSidebar, setIsDarkSidebar] = useState(false);

  const toggleSidebarTheme = () => {
    const nextState = !isDarkSidebar;
    setIsDarkSidebar(nextState);
    if (nextState) {
      document.documentElement.setAttribute('data-sidebar-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-sidebar-theme');
    }
  };

  const unreadNotifs = notifications.filter((n) => !n.read);

  const roles: UserRole[] = [
    'Super Admin',
    'HR Manager',
    'Project Manager',
    'Accountant',
    'Recruiter',
    'Employee'
  ];

  // Contextual primary action config based on active module
  const getContextualAction = () => {
    switch (activeModule) {
      case 'Projects':
        return { label: 'Create Project', action: 'create_project' };
      case 'CRM':
        return { label: 'Add Lead', action: 'add_lead' };
      case 'HRM':
        return { label: 'Add Employee', action: 'add_employee' };
      case 'Finance & Accounts':
        return { label: 'Create Invoice', action: 'create_invoice' };
      case 'Recruitment':
        return { label: 'Post New Job', action: 'post_job' };
      default:
        return null;
    }
  };

  const contextualAction = getContextualAction();

  return (
    <>
      <header className="app-header">
        {/* Left Section: Breadcrumb & Title */}
        <div className="header-left">
          <button
            className="mobile-menu-btn"
            onClick={onMobileMenuToggle}
            aria-label="Toggle navigation menu"
          >
            <Menu size={20} />
          </button>

          <div className="page-title-area">
            <h1 className="page-title">{activeModule}</h1>
            <div className="breadcrumb-nav">
              <span>Avi Designers</span>
              <span>/</span>
              <span className="breadcrumb-item">{activeModule}</span>
            </div>
          </div>
        </div>

        {/* Center Section: Global Search */}
        <div className="header-center">
          <button
            className="global-search-trigger"
            onClick={() => setIsSearchModalOpen(true)}
            aria-label="Open global search dialog"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Search size={16} />
              <span>Search in HRMS (₹)...</span>
            </div>
            <kbd className="search-kbd-shortcut">⌘K</kbd>
          </button>
        </div>

        {/* Right Section: Role Switcher, Quick Action, Alerts, User Profile */}
        <div className="header-right">
          {/* Theme Switcher (White vs Dark Sidebar) */}
          <button
            className="header-action-btn"
            onClick={toggleSidebarTheme}
            title={isDarkSidebar ? 'Switch to White Sidebar' : 'Switch to Dark Sidebar'}
          >
            {isDarkSidebar ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* Quick Clock-in/Clock-out widget */}
          <button
            className={`btn btn-sm ${isClockedIn ? 'btn-outline' : 'btn-success'}`}
            onClick={toggleClockInOut}
            title={isClockedIn ? 'Click to Clock Out' : 'Click to Clock In'}
            style={{ fontSize: '0.75rem', gap: '0.375rem' }}
          >
            <Clock size={14} />
            <span>{isClockedIn ? 'Clocked In (09:00 AM)' : 'Clock In Now'}</span>
          </button>

          {/* Contextual Action Button */}
          {contextualAction && onOpenContextualAction && (
            <Button
              variant="primary"
              size="sm"
              iconLeft={<Plus size={16} />}
              onClick={() => onOpenContextualAction(contextualAction.action)}
            >
              {contextualAction.label}
            </Button>
          )}

          {/* Role Switcher Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              className="role-switcher-badge"
              onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
              style={{ cursor: 'pointer', background: '#ffffff' }}
              title="Test system as different organizational role"
            >
              <Shield size={14} className="text-primary" />
              <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>
                {currentUser?.role}
              </span>
              <ChevronDown size={14} />
            </button>

            {isRoleMenuOpen && (
              <div
                className="notifications-dropdown"
                style={{ width: '220px', padding: '0.5rem' }}
                onClick={(e) => e.stopPropagation()}
              >
                <div style={{ padding: '0.375rem 0.5rem', fontSize: '0.6875rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' }}>
                  Switch Active Role
                </div>
                {roles.map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      switchRole(r);
                      setIsRoleMenuOpen(false);
                    }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.5rem 0.75rem',
                      borderRadius: 'var(--radius-md)',
                      background: currentUser?.role === r ? 'var(--color-primary-light)' : 'transparent',
                      border: 'none',
                      color: currentUser?.role === r ? 'var(--color-primary)' : 'var(--color-text-primary)',
                      fontWeight: currentUser?.role === r ? 600 : 400,
                      fontSize: '0.8125rem',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <span>{r}</span>
                    {currentUser?.role === r && <Check size={14} />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications Trigger */}
          <div style={{ position: 'relative' }}>
            <button
              className="header-action-btn"
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              aria-label="Notifications"
              title="Notifications"
            >
              <Bell size={18} />
              {unreadNotifs.length > 0 && <span className="header-badge-dot" />}
            </button>

            {isNotifOpen && (
              <div className="notifications-dropdown" onClick={(e) => e.stopPropagation()}>
                <div className="notifications-header">
                  <div>
                    <span style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--color-text-primary)' }}>
                      Notifications
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginLeft: '0.5rem' }}>
                      ({unreadNotifs.length} new)
                    </span>
                  </div>
                  {unreadNotifs.length > 0 && (
                    <button
                      onClick={markAllNotificationsAsRead}
                      style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                <div className="notifications-list">
                  {notifications.length === 0 ? (
                    <div style={{ padding: '2rem', textAlign: 'center', color: '#94A3B8' }}>
                      No notifications
                    </div>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`notification-item ${!n.read ? 'unread' : ''}`}
                        onClick={() => markNotificationAsRead(n.id)}
                      >
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ fontWeight: 600, fontSize: '0.8125rem', color: '#1E293B' }}>
                              {n.title}
                            </span>
                            <span style={{ fontSize: '0.6875rem', color: '#94A3B8' }}>{n.timestamp}</span>
                          </div>
                          <p style={{ fontSize: '0.75rem', color: '#475569', marginTop: '0.25rem', lineHeight: 1.4 }}>
                            {n.message}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Help Center */}
          <button
            className="header-action-btn"
            onClick={() => setIsHelpModalOpen(true)}
            aria-label="Help & Documentation"
            title="Help Center"
          >
            <HelpCircle size={18} />
          </button>

          {/* User Profile Dropdown */}
          <div style={{ position: 'relative' }}>
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            >
              <Avatar
                src={currentUser?.avatar}
                name={currentUser?.name || 'User'}
                size="md"
              />
              <ChevronDown size={14} color="#64748B" />
            </div>

            {isProfileMenuOpen && (
              <div
                className="notifications-dropdown"
                style={{ width: '240px', padding: '0.75rem' }}
                onClick={(e) => e.stopPropagation()}
              >
                <div style={{ padding: '0.5rem', borderBottom: '1px solid var(--color-border)' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#0F172A' }}>
                    {currentUser?.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{currentUser?.email}</div>
                  <Badge variant="primary" className="mt-1" style={{ marginTop: '0.375rem' }}>
                    {currentUser?.role}
                  </Badge>
                </div>

                <div style={{ padding: '0.5rem 0' }}>
                  <button
                    onClick={() => {
                      setActiveModule('Admin');
                      setIsProfileMenuOpen(false);
                    }}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      fontSize: '0.8125rem',
                      color: '#334155',
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    Account & Company Settings
                  </button>

                  <button
                    onClick={() => {
                      setActiveModule('HRM');
                      setIsProfileMenuOpen(false);
                    }}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      fontSize: '0.8125rem',
                      color: '#334155',
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    My Employee Profile
                  </button>
                </div>

                <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '0.5rem' }}>
                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      logout();
                    }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem',
                      background: 'none',
                      border: 'none',
                      color: '#EF4444',
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      borderRadius: 'var(--radius-md)'
                    }}
                  >
                    <LogOut size={14} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Help & System Manual Modal */}
      <Modal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
        title="Avi Designers — HRMS Knowledge & Quick Guide"
        subtitle="Enterprise Operational Workflow Documentation"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.875rem', color: '#334155' }}>
          <div>
            <h4 style={{ fontWeight: 700, color: '#0F172A', marginBottom: '0.25rem' }}>
              🎯 Module Overview
            </h4>
            <p>
              Avi Designers HRMS integrates 9 essential enterprise management suites:
              Employees directory, Recruitment Kanban, CRM Deal Pipeline, Project Milestones,
              Financial Invoicing & Expenses (₹ INR), RBAC Security, and Multi-Format Reports.
            </p>
          </div>

          <div>
            <h4 style={{ fontWeight: 700, color: '#0F172A', marginBottom: '0.25rem' }}>
              ⌨️ Keyboard Shortcuts
            </h4>
            <ul style={{ paddingLeft: '1.25rem', lineHeight: 1.6 }}>
              <li><strong>⌘K / Ctrl+K</strong> : Open Universal Cross-Module Search</li>
              <li><strong>ESC</strong> : Dismiss any active Modal, Drawer, or Dropdown</li>
              <li><strong>Tab / Shift+Tab</strong> : Full keyboard focus navigation across all tables and forms</li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontWeight: 700, color: '#0F172A', marginBottom: '0.25rem' }}>
              👥 Role Simulation (RBAC)
            </h4>
            <p>
              Use the Role Switcher badge in the top header to test views as Super Admin, HR Manager,
              Project Manager, Accountant, Recruiter, or Employee.
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
};
