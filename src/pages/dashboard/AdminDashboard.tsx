import React, { useState } from 'react';
import {
  Users,
  FolderKanban,
  CheckSquare,
  Square,
  DollarSign,
  Receipt,
  Clock,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Cake,
  Calendar,
  Briefcase,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  Award,
  Download,
  Plus,
  ChevronDown,
  MoreVertical,
  Send,
  Video,
  Check
} from 'lucide-react';
import { useHRMS } from '../../context/HRMSContext';
import { useAuth } from '../../context/AuthContext';
import { Card, CardHeader, CardBody } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Avatar } from '../../components/common/Avatar';
import { Button } from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';

export const AdminDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const {
    employees,
    projects,
    invoices,
    jobOpenings,
    leaveRequests,
    auditLogs,
    setActiveModule
  } = useHRMS();
  const { showToast } = useToast();

  // Todo items state
  const [todos, setTodos] = useState([
    { id: 1, title: 'Add Holidays List for 2026', done: false },
    { id: 2, title: 'Add Meeting to Client (Apex Global)', done: true },
    { id: 3, title: 'Chat with Amit & Tech Team', done: false },
    { id: 4, title: 'Quarterly Management Call', done: false },
    { id: 5, title: 'Process August Payroll Batch', done: false },
    { id: 6, title: 'Add Policy for Increment & Appraisal', done: false }
  ]);

  const [applicantTab, setApplicantTab] = useState<'openings' | 'applicants'>('applicants');

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  return (
    <div className="page-container" style={{ gap: '1.25rem' }}>
      {/* Top Breadcrumb & Action Row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1E293B' }}>
            Admin Dashboard
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', color: '#94A3B8' }}>
            <span>Dashboard</span>
            <span>/</span>
            <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Admin Dashboard</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => showToast('Exporting dashboard PDF...', 'info')}
            style={{ fontSize: '0.75rem', gap: '0.25rem' }}
          >
            <Download size={14} /> Export <ChevronDown size={12} />
          </button>

          <button
            className="btn btn-secondary btn-sm"
            style={{ fontSize: '0.75rem', gap: '0.25rem' }}
          >
            <Calendar size={14} /> 2025 - 2026
          </button>
        </div>
      </div>

      {/* Welcome Banner */}
      <div
        style={{
          background: '#FFFFFF',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-xl)',
          padding: '1rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          boxShadow: 'var(--shadow-xs)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: '50%',
              background: '#FEF3C7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              border: '2px solid #F59E0B'
            }}
          >
            <img
              src={currentUser?.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"}
              alt="Admin"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#1E293B' }}>
                Welcome Back, {currentUser?.name || 'Amit Kumar'}
              </h3>
              <span style={{ color: '#10B981', display: 'flex' }}>
                <CheckCircle2 size={16} />
              </span>
            </div>
            <p style={{ fontSize: '0.8125rem', color: '#64748B', marginTop: '0.125rem' }}>
              You have <strong style={{ color: 'var(--color-primary)' }}>21 Pending Approvals</strong> & <strong style={{ color: '#F59E0B' }}>14 Leave Requests</strong>
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Button
            variant="secondary"
            size="sm"
            style={{ background: '#1E293B', color: '#FFFFFF', border: 'none', fontSize: '0.8125rem' }}
            onClick={() => setActiveModule('Recruitment')}
            iconLeft={<Plus size={14} />}
          >
            Add Schedule
          </Button>
          <Button
            variant="primary"
            size="sm"
            style={{ fontSize: '0.8125rem' }}
            onClick={() => setActiveModule('Projects')}
            iconLeft={<Plus size={14} />}
          >
            Add Project
          </Button>
        </div>
      </div>

      {/* Row 1: 8 KPI Mini Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
        <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ width: 28, height: 28, borderRadius: '6px', background: '#FFF2EF', color: '#FF5B37', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock size={14} />
            </div>
            <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#10B981' }}>+2.1%</span>
          </div>
          <div>
            <span style={{ fontSize: '0.6875rem', color: '#64748B' }}>Attendance Overview</span>
            <div style={{ fontSize: '1.125rem', fontWeight: 800, color: '#1E293B' }}>120/154</div>
          </div>
          <span style={{ fontSize: '0.6875rem', color: '#FF5B37', fontWeight: 600, cursor: 'pointer' }} onClick={() => setActiveModule('HRM')}>
            View Details →
          </span>
        </div>

        <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ width: 28, height: 28, borderRadius: '6px', background: '#ECFEFF', color: '#06B6D4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FolderKanban size={14} />
            </div>
            <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#EF4444' }}>-2.1%</span>
          </div>
          <div>
            <span style={{ fontSize: '0.6875rem', color: '#64748B' }}>Total No of Project's</span>
            <div style={{ fontSize: '1.125rem', fontWeight: 800, color: '#1E293B' }}>90/125</div>
          </div>
          <span style={{ fontSize: '0.6875rem', color: '#64748B', fontWeight: 600, cursor: 'pointer' }} onClick={() => setActiveModule('Projects')}>
            View All
          </span>
        </div>

        <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ width: 28, height: 28, borderRadius: '6px', background: '#EFF6FF', color: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={14} />
            </div>
            <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#EF4444' }}>-11.2%</span>
          </div>
          <div>
            <span style={{ fontSize: '0.6875rem', color: '#64748B' }}>Total No of Clients</span>
            <div style={{ fontSize: '1.125rem', fontWeight: 800, color: '#1E293B' }}>69/86</div>
          </div>
          <span style={{ fontSize: '0.6875rem', color: '#64748B', fontWeight: 600, cursor: 'pointer' }} onClick={() => setActiveModule('CRM')}>
            View All
          </span>
        </div>

        <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ width: 28, height: 28, borderRadius: '6px', background: '#FDF2F8', color: '#EC4899', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckSquare size={14} />
            </div>
            <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#10B981' }}>+11.2%</span>
          </div>
          <div>
            <span style={{ fontSize: '0.6875rem', color: '#64748B' }}>Total No of Tasks</span>
            <div style={{ fontSize: '1.125rem', fontWeight: 800, color: '#1E293B' }}>25/28</div>
          </div>
          <span style={{ fontSize: '0.6875rem', color: '#64748B', fontWeight: 600, cursor: 'pointer' }} onClick={() => setActiveModule('Projects')}>
            View All
          </span>
        </div>
      </div>

      {/* Row 2: Attendance / Schedules */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.25rem' }}>
        <Card>
          <CardHeader title="Attendance Overview" subtitle="Last 7 Days" />
          <CardBody>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: '140px' }}>
              {[
                { day: 'Mon', p: 92, a: 8 },
                { day: 'Tue', p: 95, a: 5 },
                { day: 'Wed', p: 88, a: 12 },
                { day: 'Thu', p: 96, a: 4 },
                { day: 'Fri', p: 90, a: 10 },
                { day: 'Sat', p: 40, a: 60 },
                { day: 'Sun', p: 0, a: 100 }
              ].map((d, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.375rem' }}>
                  <div style={{ display: 'flex', gap: '3px', alignItems: 'flex-end' }}>
                    <div style={{ width: '12px', height: `${d.p}px`, background: '#10B981', borderRadius: '3px' }} />
                    <div style={{ width: '12px', height: `${d.a}px`, background: '#EF4444', borderRadius: '3px' }} />
                  </div>
                  <span style={{ fontSize: '0.6875rem', color: '#64748B', fontWeight: 600 }}>{d.day}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1rem', fontSize: '0.75rem' }}>
              <span style={{ color: '#10B981', fontWeight: 700 }}>• Present (Avg 92%)</span>
              <span style={{ color: '#EF4444', fontWeight: 700 }}>• Absent (Avg 8%)</span>
            </div>
          </CardBody>
        </Card>

        {/* Todo Widget */}
        <Card>
          <CardHeader title="Todo Lists" subtitle="6 items" />
          <CardBody style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {todos.map((todo) => (
              <div
                key={todo.id}
                onClick={() => toggleTodo(todo.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.625rem',
                  padding: '0.4rem 0.5rem',
                  borderRadius: 'var(--radius-md)',
                  background: todo.done ? '#F8FAFC' : '#FFFFFF',
                  cursor: 'pointer'
                }}
              >
                {todo.done ? <CheckSquare size={16} color="#10B981" /> : <Square size={16} color="#94A3B8" />}
                <span
                  style={{
                    fontSize: '0.75rem',
                    color: todo.done ? '#94A3B8' : '#1E293B',
                    textDecoration: todo.done ? 'line-through' : 'none',
                    fontWeight: todo.done ? 400 : 600
                  }}
                >
                  {todo.title}
                </span>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>

      {/* Row 3: Schedules | Recent Activities | Birthdays */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
        {/* Schedules */}
        <Card>
          <CardHeader title="Schedules" subtitle="View All" />
          <CardBody style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '0.75rem' }}>
              <span style={{ background: '#0F172A', color: '#fff', fontSize: '0.625rem', fontWeight: 700, padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                UI/UX Designer
              </span>
              <h4 style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1E293B', marginTop: '0.375rem' }}>
                Interview Candidates - UI/UX Designer
              </h4>
              <div style={{ fontSize: '0.6875rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '0.375rem', marginTop: '0.25rem' }}>
                <Calendar size={12} /> Thu, 15 Feb 2026 • 09:00 AM - 10:00 AM
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                <div className="avatar-group">
                  <Avatar name="Meera Das" size="xs" />
                  <Avatar name="Ananya Sharma" size="xs" />
                </div>
                <button
                  className="btn btn-sm btn-primary"
                  style={{ fontSize: '0.6875rem', padding: '0.2rem 0.5rem' }}
                  onClick={() => showToast('Connecting to video interview room...', 'info')}
                >
                  Join Meeting
                </button>
              </div>
            </div>

            <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '0.75rem' }}>
              <span style={{ background: '#06B6D4', color: '#fff', fontSize: '0.625rem', fontWeight: 700, padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                iOS Developer
              </span>
              <h4 style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1E293B', marginTop: '0.375rem' }}>
                Interview Candidates - iOS Developer
              </h4>
              <div style={{ fontSize: '0.6875rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '0.375rem', marginTop: '0.25rem' }}>
                <Calendar size={12} /> Thu, 15 Feb 2026 • 10:00 AM - 11:00 AM
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                <div className="avatar-group">
                  <Avatar name="Kunal Verma" size="xs" />
                  <Avatar name="Rahul Verma" size="xs" />
                </div>
                <button
                  className="btn btn-sm btn-primary"
                  style={{ fontSize: '0.6875rem', padding: '0.2rem 0.5rem' }}
                  onClick={() => showToast('Connecting to video interview room...', 'info')}
                >
                  Join Meeting
                </button>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader title="Recent Activities" subtitle="View All" />
          <CardBody style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {[
              { name: 'Diya Kapoor', act: 'Added New Project', target: '+HRMS Dashboard', time: '05:30 PM' },
              { name: 'Kunal Verma', act: 'Commented on Uploaded Document', target: '', time: '06:00 PM' },
              { name: 'Harish Iyer', act: 'Approved Task Projects', target: '', time: '06:20 PM' },
              { name: 'Ananya Sen', act: 'Requesting Access to Module Tickets', target: '', time: '06:30 PM' },
              { name: 'Meera Das', act: 'Downloaded App Reports', target: '', time: '07:00 PM' }
            ].map((a, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.75rem' }}>
                <Avatar name={a.name} size="xs" />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ fontWeight: 700, color: '#1E293B' }}>{a.name} </span>
                  <span style={{ color: '#64748B' }}>{a.act} </span>
                  {a.target && <span style={{ color: '#FF5B37', fontWeight: 600 }}>{a.target}</span>}
                  <div style={{ fontSize: '0.625rem', color: '#94A3B8' }}>{a.time}</div>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>

        {/* Birthdays */}
        <Card>
          <CardHeader title="Birthdays" subtitle="View All" />
          <CardBody style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { name: 'Ananya Sen', role: 'Accountant', tag: 'Today' },
              { name: 'Diya Kapoor', role: 'Developer', tag: 'Tomorrow' },
              { name: 'Kunal Verma', role: 'Executive Officer', tag: 'Tomorrow' },
              { name: 'Harish Iyer', role: 'Team Lead', tag: '25 Jan 2026' }
            ].map((b) => (
              <div key={b.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid var(--color-border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Avatar name={b.name} size="sm" />
                  <div>
                    <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1E293B' }}>{b.name}</div>
                    <div style={{ fontSize: '0.6875rem', color: '#64748B' }}>{b.role} • <span style={{ color: '#FF5B37', fontWeight: 600 }}>{b.tag}</span></div>
                  </div>
                </div>

                <button
                  className="btn btn-sm btn-secondary"
                  style={{ fontSize: '0.6875rem', padding: '0.2rem 0.5rem', gap: '0.25rem', background: '#0F172A', color: '#fff', border: 'none' }}
                  onClick={() => showToast(`Birthday greetings dispatched to ${b.name}! 🎉`, 'success')}
                >
                  <Send size={12} /> Send
                </button>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
