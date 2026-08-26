import React from 'react';
import {
  LayoutDashboard,
  Users2,
  TrendingUp,
  FolderKanban,
  ShieldCheck
} from 'lucide-react';
import { useHRMS, DashboardTabType } from '../../context/HRMSContext';
import { AdminDashboard } from './AdminDashboard';
import { EmployeeDashboard } from './EmployeeDashboard';
import { DealsDashboard } from './DealsDashboard';
import { LeadsDashboard } from './LeadsDashboard';
import { SuperAdminDashboard } from './SuperAdminDashboard';

export const DashboardPage: React.FC = () => {
  const { dashboardTab, setDashboardTab } = useHRMS();

  const currentTab: DashboardTabType = dashboardTab || 'admin';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Top Switcher Pills Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.375rem',
          background: '#F1F5F9',
          padding: '0.375rem',
          borderRadius: 'var(--radius-lg)',
          alignSelf: 'flex-start',
          flexWrap: 'wrap'
        }}
      >
        <button
          onClick={() => setDashboardTab('admin')}
          className={`btn btn-sm ${currentTab === 'admin' ? 'btn-primary' : 'btn-ghost'}`}
          style={{ fontSize: '0.75rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '0.375rem' }}
        >
          <LayoutDashboard size={14} /> Admin Dashboard
        </button>

        <button
          onClick={() => setDashboardTab('employee')}
          className={`btn btn-sm ${currentTab === 'employee' ? 'btn-primary' : 'btn-ghost'}`}
          style={{ fontSize: '0.75rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '0.375rem' }}
        >
          <Users2 size={14} /> Employee Dashboard
        </button>

        <button
          onClick={() => setDashboardTab('deals')}
          className={`btn btn-sm ${currentTab === 'deals' ? 'btn-primary' : 'btn-ghost'}`}
          style={{ fontSize: '0.75rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '0.375rem' }}
        >
          <FolderKanban size={14} /> Deals Dashboard
        </button>

        <button
          onClick={() => setDashboardTab('leads')}
          className={`btn btn-sm ${currentTab === 'leads' ? 'btn-primary' : 'btn-ghost'}`}
          style={{ fontSize: '0.75rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '0.375rem' }}
        >
          <TrendingUp size={14} /> Leads Dashboard
        </button>

        <button
          onClick={() => setDashboardTab('superadmin')}
          className={`btn btn-sm ${currentTab === 'superadmin' ? 'btn-primary' : 'btn-ghost'}`}
          style={{ fontSize: '0.75rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '0.375rem' }}
        >
          <ShieldCheck size={14} /> Super Admin Dashboard
        </button>
      </div>

      {/* View Switcher */}
      {currentTab === 'superadmin' && <SuperAdminDashboard />}
      {currentTab === 'leads' && <LeadsDashboard />}
      {currentTab === 'deals' && <DealsDashboard />}
      {currentTab === 'employee' && <EmployeeDashboard />}
      {currentTab === 'admin' && <AdminDashboard />}
    </div>
  );
};
