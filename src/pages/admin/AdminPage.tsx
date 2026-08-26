import React, { useState } from 'react';
import {
  ShieldCheck,
  Users,
  Settings,
  Shield,
  FileSpreadsheet,
  Building,
  Mail,
  Lock,
  Check,
  X,
  Sparkles,
  Sliders,
  Globe,
  Bell
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useHRMS } from '../../context/HRMSContext';
import { useToast } from '../../context/ToastContext';
import { Card, CardHeader, CardBody } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Avatar } from '../../components/common/Avatar';
import { Tabs } from '../../components/common/Tabs';
import { UserRole } from '../../types';

export const AdminPage: React.FC = () => {
  const { availableUsers, currentUser } = useAuth();
  const { auditLogs } = useHRMS();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'rbac' | 'users' | 'company' | 'audit' | 'notifications'>('rbac');
  const [selectedRole, setSelectedRole] = useState<UserRole>('HR Manager');

  // Interactive RBAC matrix state
  const [permissionsState, setPermissionsState] = useState<Record<UserRole, Record<string, { view: boolean; create: boolean; edit: boolean; delete: boolean }>>>({
    'Super Admin': {
      Dashboard: { view: true, create: true, edit: true, delete: true },
      Projects: { view: true, create: true, edit: true, delete: true },
      CRM: { view: true, create: true, edit: true, delete: true },
      HRM: { view: true, create: true, edit: true, delete: true },
      'Finance & Accounts': { view: true, create: true, edit: true, delete: true },
      Recruitment: { view: true, create: true, edit: true, delete: true },
      Admin: { view: true, create: true, edit: true, delete: true },
      Reports: { view: true, create: true, edit: true, delete: true }
    },
    'HR Manager': {
      Dashboard: { view: true, create: true, edit: true, delete: false },
      Projects: { view: true, create: false, edit: false, delete: false },
      CRM: { view: true, create: false, edit: false, delete: false },
      HRM: { view: true, create: true, edit: true, delete: true },
      'Finance & Accounts': { view: true, create: false, edit: true, delete: false },
      Recruitment: { view: true, create: true, edit: true, delete: true },
      Admin: { view: false, create: false, edit: false, delete: false },
      Reports: { view: true, create: true, edit: true, delete: false }
    },
    'Project Manager': {
      Dashboard: { view: true, create: false, edit: false, delete: false },
      Projects: { view: true, create: true, edit: true, delete: true },
      CRM: { view: true, create: true, edit: true, delete: false },
      HRM: { view: true, create: false, edit: false, delete: false },
      'Finance & Accounts': { view: false, create: false, edit: false, delete: false },
      Recruitment: { view: false, create: false, edit: false, delete: false },
      Admin: { view: false, create: false, edit: false, delete: false },
      Reports: { view: true, create: false, edit: false, delete: false }
    },
    'Accountant': {
      Dashboard: { view: true, create: false, edit: false, delete: false },
      Projects: { view: true, create: false, edit: false, delete: false },
      CRM: { view: false, create: false, edit: false, delete: false },
      HRM: { view: true, create: false, edit: false, delete: false },
      'Finance & Accounts': { view: true, create: true, edit: true, delete: true },
      Recruitment: { view: false, create: false, edit: false, delete: false },
      Admin: { view: false, create: false, edit: false, delete: false },
      Reports: { view: true, create: true, edit: true, delete: false }
    },
    'Recruiter': {
      Dashboard: { view: true, create: false, edit: false, delete: false },
      Projects: { view: false, create: false, edit: false, delete: false },
      CRM: { view: false, create: false, edit: false, delete: false },
      HRM: { view: true, create: false, edit: false, delete: false },
      'Finance & Accounts': { view: false, create: false, edit: false, delete: false },
      Recruitment: { view: true, create: true, edit: true, delete: true },
      Admin: { view: false, create: false, edit: false, delete: false },
      Reports: { view: true, create: false, edit: false, delete: false }
    },
    'Employee': {
      Dashboard: { view: true, create: false, edit: false, delete: false },
      Projects: { view: true, create: false, edit: false, delete: false },
      CRM: { view: false, create: false, edit: false, delete: false },
      HRM: { view: true, create: false, edit: false, delete: false },
      'Finance & Accounts': { view: false, create: false, edit: false, delete: false },
      Recruitment: { view: false, create: false, edit: false, delete: false },
      Admin: { view: false, create: false, edit: false, delete: false },
      Reports: { view: false, create: false, edit: false, delete: false }
    }
  });

  const togglePermission = (moduleName: string, action: 'view' | 'create' | 'edit' | 'delete') => {
    setPermissionsState((prev) => {
      const currentRolePerms = prev[selectedRole] || {};
      const modulePerms = currentRolePerms[moduleName] || { view: false, create: false, edit: false, delete: false };
      return {
        ...prev,
        [selectedRole]: {
          ...currentRolePerms,
          [moduleName]: {
            ...modulePerms,
            [action]: !modulePerms[action]
          }
        }
      };
    });
    showToast(`Updated permission for ${selectedRole} on ${moduleName} (${action})`, 'info');
  };

  const tabs = [
    { id: 'rbac', label: 'Roles & RBAC Matrix' },
    { id: 'users', label: 'System Users', count: availableUsers.length },
    { id: 'company', label: 'Company Profile & Workspace' },
    { id: 'audit', label: 'System Audit Log', count: auditLogs.length },
    { id: 'notifications', label: 'Email & Alerts Policy' }
  ];

  const modules = [
    'Dashboard',
    'Projects',
    'CRM',
    'HRM',
    'Finance & Accounts',
    'Recruitment',
    'Admin',
    'Reports'
  ];

  const roles: UserRole[] = [
    'Super Admin',
    'HR Manager',
    'Project Manager',
    'Accountant',
    'Recruiter',
    'Employee'
  ];

  return (
    <div className="page-container">
      {/* Top Header Row */}
      <div className="page-header-row">
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
            Administration & Governance
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginTop: '0.125rem' }}>
            Configure access-control matrices, manage administrative users, audit trail, and company settings.
          </p>
        </div>

        <div className="page-actions-group">
          <Badge variant="primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8125rem' }}>
            <ShieldCheck size={14} /> Super Admin Privilege
          </Badge>
        </div>
      </div>

      {/* Main Tabs */}
      <Card>
        <CardBody style={{ padding: '0.75rem 1.25rem' }}>
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            onChange={(id: any) => setActiveTab(id)}
            variant="underline"
          />
        </CardBody>
      </Card>

      {/* TAB 1: ROLES & RBAC MATRIX */}
      {activeTab === 'rbac' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Role selector buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#64748B' }}>Configure Role:</span>
            {roles.map((r) => (
              <button
                key={r}
                onClick={() => setSelectedRole(r)}
                className={`btn btn-sm ${selectedRole === r ? 'btn-primary' : 'btn-secondary'}`}
              >
                {r}
              </button>
            ))}
          </div>

          <Card>
            <CardHeader
              title={`Access Control Matrix — ${selectedRole}`}
              subtitle="Granular permissions for module view, record creation, modification and deletion"
              action={
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => showToast(`RBAC matrix for ${selectedRole} saved successfully!`, 'success')}
                >
                  Save Policy
                </Button>
              }
            />
            <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Module / Functional Area</th>
                    <th style={{ textAlign: 'center' }}>View Access</th>
                    <th style={{ textAlign: 'center' }}>Create Records</th>
                    <th style={{ textAlign: 'center' }}>Edit / Update</th>
                    <th style={{ textAlign: 'center' }}>Delete Authority</th>
                  </tr>
                </thead>
                <tbody>
                  {modules.map((mod) => {
                    const perms = permissionsState[selectedRole]?.[mod] || { view: false, create: false, edit: false, delete: false };

                    return (
                      <tr key={mod}>
                        <td>
                          <strong style={{ color: '#1E293B' }}>{mod}</strong>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <input
                            type="checkbox"
                            style={{ width: '18px', height: '18px', accentColor: 'var(--color-primary)', cursor: 'pointer' }}
                            checked={perms.view}
                            onChange={() => togglePermission(mod, 'view')}
                          />
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <input
                            type="checkbox"
                            style={{ width: '18px', height: '18px', accentColor: 'var(--color-primary)', cursor: 'pointer' }}
                            checked={perms.create}
                            onChange={() => togglePermission(mod, 'create')}
                          />
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <input
                            type="checkbox"
                            style={{ width: '18px', height: '18px', accentColor: 'var(--color-primary)', cursor: 'pointer' }}
                            checked={perms.edit}
                            onChange={() => togglePermission(mod, 'edit')}
                          />
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <input
                            type="checkbox"
                            style={{ width: '18px', height: '18px', accentColor: 'var(--color-primary)', cursor: 'pointer' }}
                            checked={perms.delete}
                            onChange={() => togglePermission(mod, 'delete')}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* TAB 2: SYSTEM USERS */}
      {activeTab === 'users' && (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>User Account</th>
                <th>Department</th>
                <th>Role Assignment</th>
                <th>Status</th>
                <th>Last Active</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {availableUsers.map((usr) => (
                <tr key={usr.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <Avatar src={usr.avatar} name={usr.name} size="sm" />
                      <div>
                        <div style={{ fontWeight: 700, color: '#1E293B' }}>{usr.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{usr.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{usr.department}</td>
                  <td>
                    <Badge variant={usr.role === 'Super Admin' ? 'primary' : 'purple'}>
                      {usr.role}
                    </Badge>
                  </td>
                  <td>
                    <Badge variant="success" showDot>
                      {usr.status}
                    </Badge>
                  </td>
                  <td>{usr.lastActive}</td>
                  <td>
                    <Button variant="ghost" size="sm">
                      Edit Role
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 3: COMPANY PROFILE */}
      {activeTab === 'company' && (
        <Card>
          <CardHeader
            title="Avid Designers Enterprise Profile"
            subtitle="Global corporate metadata, legal branding, currency & timezone"
          />
          <CardBody style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              <div className="form-group">
                <label className="form-label">Company Legal Name</label>
                <input type="text" className="form-control" defaultValue="Avid Designers Inc." />
              </div>
              <div className="form-group">
                <label className="form-label">Corporate Website</label>
                <input type="text" className="form-control" defaultValue="https://aviddesigners.com" />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Default Currency</label>
                <select className="form-control" defaultValue="USD">
                  <option value="USD">USD ($) - US Dollar</option>
                  <option value="EUR">EUR (€) - Euro</option>
                  <option value="GBP">GBP (£) - British Pound</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">System Timezone</label>
                <select className="form-control" defaultValue="PST">
                  <option value="PST">America/Los_Angeles (PST - UTC-8)</option>
                  <option value="EST">America/New_York (EST - UTC-5)</option>
                  <option value="UTC">Universal Time (UTC)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Standard Work Week</label>
                <input type="text" className="form-control" defaultValue="Monday – Friday (40 hrs)" />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
              <Button variant="primary" onClick={() => showToast('Company profile settings updated!', 'success')}>
                Save Company Profile
              </Button>
            </div>
          </CardBody>
        </Card>
      )}

      {/* TAB 4: AUDIT LOG */}
      {activeTab === 'audit' && (
        <Card>
          <CardHeader
            title="System Audit Trail & Security Events"
            subtitle="Immutable activity records with timestamp, user identity, and IP address"
          />
          <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Actor</th>
                  <th>Action</th>
                  <th>Target Entity</th>
                  <th>IP Address</th>
                  <th>Event Type</th>
                </tr>
              </thead>
              <tbody>
                {auditLogs.map((log) => (
                  <tr key={log.id}>
                    <td style={{ fontSize: '0.75rem', color: '#64748B' }}>{log.timestamp}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Avatar src={log.avatar} name={log.user} size="xs" />
                        <span style={{ fontWeight: 600, color: '#1E293B' }}>{log.user}</span>
                      </div>
                    </td>
                    <td>{log.action}</td>
                    <td>
                      <strong style={{ color: 'var(--color-primary)' }}>{log.target}</strong>
                    </td>
                    <td>
                      <span style={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>{log.ipAddress}</span>
                    </td>
                    <td>
                      <Badge
                        variant={
                          log.type === 'create'
                            ? 'success'
                            : log.type === 'delete'
                            ? 'danger'
                            : log.type === 'auth'
                            ? 'purple'
                            : 'info'
                        }
                      >
                        {log.type}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* TAB 5: NOTIFICATIONS POLICY */}
      {activeTab === 'notifications' && (
        <Card>
          <CardHeader
            title="Email & Notification Policy"
            subtitle="Automated alerts for leaves, invoices, projects, and new applicants"
          />
          <CardBody style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid var(--color-border-subtle)' }}>
              <div>
                <div style={{ fontWeight: 600, color: '#1E293B' }}>Instant Email on Leave Submission</div>
                <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Notify HR Manager when an employee applies for time-off</div>
              </div>
              <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', accentColor: 'var(--color-primary)' }} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid var(--color-border-subtle)' }}>
              <div>
                <div style={{ fontWeight: 600, color: '#1E293B' }}>Invoice Overdue Reminders</div>
                <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Send automated payment reminder 3 days prior to due date</div>
              </div>
              <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', accentColor: 'var(--color-primary)' }} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 0' }}>
              <div>
                <div style={{ fontWeight: 600, color: '#1E293B' }}>Recruitment Interview Confirmations</div>
                <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Send Google Calendar .ics invites to candidate and panelist</div>
              </div>
              <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', accentColor: 'var(--color-primary)' }} />
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
};
