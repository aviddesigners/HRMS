import React, { useState } from 'react';
import {
  Clock,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  Users2,
  Send,
  Coffee,
  CheckSquare,
  Award,
  ChevronRight,
  TrendingUp,
  FolderKanban,
  FileText
} from 'lucide-react';
import { useHRMS } from '../../context/HRMSContext';
import { useAuth } from '../../context/AuthContext';
import { Card, CardHeader, CardBody } from '../../components/common/Card';
import { Avatar } from '../../components/common/Avatar';
import { Button } from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';

export const EmployeeDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const { isClockedIn, clockInTime, toggleClockInOut, setActiveModule, setHrmTab } = useHRMS();
  const { showToast } = useToast();

  const [currentTime] = useState('09:45 AM');

  return (
    <div className="page-container" style={{ gap: '1.25rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#1E293B' }}>Employee Dashboard</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', color: '#94A3B8' }}>
            <span>Dashboard</span>
            <span>/</span>
            <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Employee Dashboard</span>
          </div>
        </div>

        <button className="btn btn-secondary btn-sm" style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
          <Calendar size={13} /> {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
        </button>
      </div>

      {/* Hero Welcome Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
          borderRadius: 'var(--radius-xl)',
          padding: '1.5rem 2rem',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          boxShadow: 'var(--shadow-md)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <Avatar src={currentUser?.avatar} name={currentUser?.name || 'Employee'} size="lg" />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
                Hello, {currentUser?.name || 'Amit Kumar'}
              </h3>
              <span style={{ background: '#10B981', color: '#fff', fontSize: '0.625rem', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: 700 }}>
                {currentUser?.role || 'Senior Developer'}
              </span>
            </div>
            <p style={{ margin: '0.25rem 0 0', fontSize: '0.8125rem', opacity: 0.8 }}>
              Have a productive day! You have 3 tasks due today & 1 team meeting at 03:00 PM.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Button
            variant="secondary"
            size="sm"
            style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}
            onClick={() => { setActiveModule('HRM'); setHrmTab('leaves'); }}
          >
            Apply Leave
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={toggleClockInOut}
            style={{ background: isClockedIn ? '#EF4444' : '#10B981', borderColor: isClockedIn ? '#EF4444' : '#10B981' }}
          >
            {isClockedIn ? 'Clock Out (09:45 AM)' : 'Clock In (09:00 AM)'}
          </Button>
        </div>
      </div>

      {/* Row 1: Attendance & Punch Widget + Leaves Balance */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '1.25rem' }}>
        {/* Attendance Widget */}
        <Card>
          <CardHeader title="Today's Attendance" subtitle={new Date().toDateString()} />
          <CardBody style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', textAlign: 'center' }}>
            <div
              style={{
                width: 100,
                height: 100,
                borderRadius: '50%',
                border: '4px solid #FF5B37',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#FFF1EE'
              }}
            >
              <Clock size={20} color="#FF5B37" />
              <strong style={{ fontSize: '1.125rem', color: '#1E293B', marginTop: '0.2rem' }}>
                {isClockedIn ? '8 hrs 45m' : '0 hrs 0m'}
              </strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '0.75rem', fontSize: '0.75rem' }}>
              <div>
                <span style={{ color: '#94A3B8' }}>Clock In</span>
                <div style={{ fontWeight: 700, color: '#10B981' }}>{clockInTime || '09:00 AM'}</div>
              </div>
              <div>
                <span style={{ color: '#94A3B8' }}>Break</span>
                <div style={{ fontWeight: 700, color: '#F59E0B' }}>00:45 min</div>
              </div>
              <div>
                <span style={{ color: '#94A3B8' }}>Clock Out</span>
                <div style={{ fontWeight: 700, color: '#64748B' }}>06:00 PM</div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Leaves Balances */}
        <Card>
          <CardHeader title="My Leave Balances" subtitle="2025 - 2026 Policy" />
          <CardBody style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1rem', background: '#FAFAFA' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Casual Leaves</span>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1E293B', margin: '0.25rem 0' }}>8 / 12</h3>
              <span style={{ fontSize: '0.6875rem', color: '#10B981', fontWeight: 700 }}>4 Days Remaining</span>
            </div>
            <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1rem', background: '#FAFAFA' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Sick Leaves</span>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1E293B', margin: '0.25rem 0' }}>10 / 12</h3>
              <span style={{ fontSize: '0.6875rem', color: '#10B981', fontWeight: 700 }}>2 Days Remaining</span>
            </div>
            <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1rem', background: '#FAFAFA' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Earned Leaves</span>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1E293B', margin: '0.25rem 0' }}>14 / 15</h3>
              <span style={{ fontSize: '0.6875rem', color: '#10B981', fontWeight: 700 }}>1 Day Remaining</span>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Row 2: Assigned Tasks & My Projects */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1.25rem' }}>
        <Card>
          <CardHeader title="My Assigned Tasks" subtitle="Due this week" />
          <CardBody style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {[
              { title: 'Update HRMS CRM Grid views to Figma 1:1', project: 'HRMS Portal', due: 'Today, 05:00 PM', priority: 'High', color: '#EF4444' },
              { title: 'Connect Supabase Auth session tokens', project: 'Auth Module', due: 'Tomorrow', priority: 'Medium', color: '#F59E0B' },
              { title: 'Test payroll payslip PDF download batch', project: 'Finance & Payroll', due: '28 Aug 2026', priority: 'Low', color: '#10B981' }
            ].map((task, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                  <CheckSquare size={16} color="#FF5B37" />
                  <div>
                    <strong style={{ fontSize: '0.8125rem', color: '#1E293B' }}>{task.title}</strong>
                    <div style={{ fontSize: '0.6875rem', color: '#64748B' }}>{task.project} • Due: {task.due}</div>
                  </div>
                </div>
                <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: task.color, border: `1px solid ${task.color}30`, padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                  {task.priority}
                </span>
              </div>
            ))}
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="My Team Members" subtitle="Dev & Design" />
          <CardBody style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { name: 'Sharon Roy', role: 'UI/UX Designer', status: 'Online', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80' },
              { name: 'Vaughan Lewis', role: 'Team Lead', status: 'In Meeting', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
              { name: 'Jessica Louise', role: 'QA Engineer', status: 'Online', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' }
            ].map((m, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Avatar src={m.avatar} name={m.name} size="xs" />
                  <div>
                    <strong style={{ fontSize: '0.8125rem', color: '#1E293B' }}>{m.name}</strong>
                    <div style={{ fontSize: '0.6875rem', color: '#64748B' }}>{m.role}</div>
                  </div>
                </div>
                <span style={{ fontSize: '0.6875rem', color: m.status === 'Online' ? '#10B981' : '#F59E0B', fontWeight: 600 }}>
                  • {m.status}
                </span>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
