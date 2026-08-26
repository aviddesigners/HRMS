import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  ChevronDown,
  Download,
  Mail,
  Phone,
  MessageSquare,
  Users2,
  FileText,
  CheckCircle2,
  XCircle,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight,
  Globe,
  Filter,
  Check
} from 'lucide-react';
import { useHRMS } from '../../context/HRMSContext';
import { useToast } from '../../context/ToastContext';
import { Card, CardHeader, CardBody } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Avatar } from '../../components/common/Avatar';
import { Button } from '../../components/common/Button';

interface LeadNotification {
  id: string;
  user: string;
  avatar: string;
  action: string;
  time: string;
  attachment?: string;
  hasActions?: boolean;
  status?: 'approved' | 'declined' | null;
}

export const LeadsDashboard: React.FC = () => {
  const { setActiveModule, setCrmTab } = useHRMS();
  const { showToast } = useToast();

  const [dateRange, setDateRange] = useState('15/05/2025 - 21/05/2025');

  // Notifications State (with interactive Approve/Decline)
  const [notifications, setNotifications] = useState<LeadNotification[]>([
    {
      id: 'NOTIF-01',
      user: 'Troy Marte',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      action: 'submitted the employee review',
      time: 'Today at 9:42 AM',
      attachment: 'EY_review.pdf'
    },
    {
      id: 'NOTIF-02',
      user: 'Linda Ray',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      action: 'request leave on 28 Oct 2024',
      time: 'Today at 9:00 AM'
    },
    {
      id: 'NOTIF-03',
      user: 'Harvey Smith',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      action: 'requested access to UNIX',
      time: 'Today at 8:15 AM',
      hasActions: true,
      status: null
    },
    {
      id: 'NOTIF-04',
      user: 'Anthony Lewis',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      action: 'commented on new post',
      time: 'Today at 7:45 AM'
    }
  ]);

  const handleAction = (id: string, action: 'approved' | 'declined') => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, status: action } : n))
    );
    showToast(`UNIX request has been ${action}.`, action === 'approved' ? 'success' : 'info');
  };

  return (
    <div className="page-container" style={{ gap: '1.25rem' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#1E293B' }}>Leads Dashboard</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', color: '#94A3B8' }}>
            <span>⌂</span>
            <span>/</span>
            <span>Dashboard</span>
            <span>/</span>
            <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Leads Dashboard</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button className="btn btn-secondary btn-sm" onClick={() => showToast('Exporting leads report...', 'info')} style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <Download size={13} /> Export <ChevronDown size={12} />
          </button>
          <button className="btn btn-secondary btn-sm" style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <Calendar size={13} /> {dateRange}
          </button>
        </div>
      </div>

      {/* 4 Top KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
        {/* Total No of Leads */}
        <Card style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, right: 0, width: 0, height: 0, borderTop: '26px solid #FF5B37', borderLeft: '26px solid transparent' }} />
          <CardBody style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: 38, height: 38, borderRadius: '8px', background: '#FFF1EE', color: '#FF5B37', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <TrendingUp size={18} />
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Total No of Leads</span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1E293B', margin: 0 }}>6000</h3>
              </div>
            </div>
            <div style={{ marginTop: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.6875rem', color: '#EF4444', fontWeight: 700 }}>
              <span>~ -4.01%</span>
              <span style={{ color: '#94A3B8', fontWeight: 500 }}>from last week</span>
            </div>
          </CardBody>
        </Card>

        {/* No of New Leads */}
        <Card style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, right: 0, width: 0, height: 0, borderTop: '26px solid #0284C7', borderLeft: '26px solid transparent' }} />
          <CardBody style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: 38, height: 38, borderRadius: '8px', background: '#E0F2FE', color: '#0284C7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users2 size={18} />
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>No of New Leads</span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1E293B', margin: 0 }}>120</h3>
              </div>
            </div>
            <div style={{ marginTop: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.6875rem', color: '#10B981', fontWeight: 700 }}>
              <span>~ +20.01%</span>
              <span style={{ color: '#94A3B8', fontWeight: 500 }}>from last week</span>
            </div>
          </CardBody>
        </Card>

        {/* No of Lost Leads */}
        <Card style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, right: 0, width: 0, height: 0, borderTop: '26px solid #EF4444', borderLeft: '26px solid transparent' }} />
          <CardBody style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: 38, height: 38, borderRadius: '8px', background: '#FEF2F2', color: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <TrendingDown size={18} />
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>No of Lost Leads</span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1E293B', margin: 0 }}>30</h3>
              </div>
            </div>
            <div style={{ marginTop: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.6875rem', color: '#10B981', fontWeight: 700 }}>
              <span>~ +55%</span>
              <span style={{ color: '#94A3B8', fontWeight: 500 }}>from last week</span>
            </div>
          </CardBody>
        </Card>

        {/* No of Total Customers */}
        <Card style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, right: 0, width: 0, height: 0, borderTop: '26px solid #8B5CF6', borderLeft: '26px solid transparent' }} />
          <CardBody style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: 38, height: 38, borderRadius: '8px', background: '#F5F3FF', color: '#8B5CF6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users2 size={18} />
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>No of Total Customers</span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1E293B', margin: 0 }}>9895</h3>
              </div>
            </div>
            <div style={{ marginTop: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.6875rem', color: '#10B981', fontWeight: 700 }}>
              <span>~ +65%</span>
              <span style={{ color: '#94A3B8', fontWeight: 500 }}>from last week</span>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Row 2: Pipeline Stages Funnel & New Leads Heatmap */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.25rem' }}>
        {/* Pipeline Stages */}
        <Card>
          <CardHeader style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border-subtle)' }}>
            <strong style={{ fontSize: '0.9375rem', color: '#1E293B' }}>Pipeline Stages</strong>
            <select className="form-control" style={{ width: '120px', fontSize: '0.6875rem', padding: '0.2rem 0.4rem' }}>
              <option>📅 2025 - 2026</option>
            </select>
          </CardHeader>
          <CardBody style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Top Stage Indicators */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.5rem' }}>
              {[
                { title: 'Contacted', value: '50000', color: '#FF5B37' },
                { title: 'Opportunity', value: '25885', color: '#F97316' },
                { title: 'Not Contacted', value: '12566', color: '#F59E0B' },
                { title: 'Closed', value: '8865', color: '#10B981' },
                { title: 'Lost', value: '2452', color: '#EF4444' }
              ].map((st, i) => (
                <div key={i} style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '0.625rem', background: '#FAFAFA' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.6875rem', color: '#64748B' }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: st.color }} />
                    <span>{st.title}</span>
                  </div>
                  <strong style={{ fontSize: '0.9375rem', color: '#1E293B', marginTop: '0.25rem', display: 'block' }}>{st.value}</strong>
                </div>
              ))}
            </div>

            {/* Horizontal Funnel Graphic */}
            <div style={{ position: 'relative', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="100%" height="90" viewBox="0 0 600 90" preserveAspectRatio="none">
                {/* Stage 1: 40% */}
                <polygon points="0,5 150,15 150,75 0,85" fill="#FF5B37" />
                <text x="75" y="48" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle">40%</text>

                {/* Stage 2: 20% */}
                <polygon points="150,15 280,25 280,65 150,75" fill="#FF7A45" opacity="0.9" />
                <text x="215" y="48" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle">20%</text>

                {/* Stage 3: 30% */}
                <polygon points="280,25 400,32 400,58 280,65" fill="#FFA380" opacity="0.85" />
                <text x="340" y="48" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle">30%</text>

                {/* Stage 4: 10% */}
                <polygon points="400,32 500,38 500,52 400,58" fill="#FFC2AD" opacity="0.8" />
                <text x="450" y="48" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">10%</text>

                {/* Stage 5: 5% */}
                <polygon points="500,38 600,42 600,48 500,52" fill="#FFE0D6" opacity="0.75" />
                <text x="550" y="48" fill="#1E293B" fontSize="9" fontWeight="bold" textAnchor="middle">5%</text>
              </svg>
            </div>
          </CardBody>
        </Card>

        {/* New Leads Heatmap */}
        <Card>
          <CardHeader style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border-subtle)' }}>
            <strong style={{ fontSize: '0.9375rem', color: '#1E293B' }}>New Leads</strong>
            <select className="form-control" style={{ width: '110px', fontSize: '0.6875rem', padding: '0.2rem 0.4rem' }}>
              <option>📅 This Week</option>
            </select>
          </CardHeader>
          <CardBody style={{ padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {/* Heatmap Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px', textAlign: 'center' }}>
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
                <span key={idx} style={{ fontSize: '0.625rem', color: '#94A3B8', fontWeight: 600 }}>{day}</span>
              ))}

              {[
                { val: 35, bg: '#F97316' },
                { val: 72, bg: '#F97316' },
                { val: 75, bg: '#EA580C' },
                { val: 21, bg: '#F97316' },
                { val: 25, bg: '#FB923C' },
                { val: 25, bg: '#FB923C' },
                { val: 60, bg: '#EA580C' }
              ].map((c, i) => (
                <div
                  key={i}
                  style={{
                    background: c.bg,
                    color: '#FFFFFF',
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.6875rem',
                    fontWeight: 800,
                    margin: '0 auto'
                  }}
                >
                  {c.val}
                </div>
              ))}

              {/* Dim row elements */}
              {Array.from({ length: 28 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    background: '#F1F5F9',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    margin: '2px auto'
                  }}
                />
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Row 3: Lost Leads By Reason, Leads By Companies, Leads by Source */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr 1fr', gap: '1.25rem' }}>
        {/* Lost Leads By Reason */}
        <Card>
          <CardHeader style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border-subtle)' }}>
            <strong style={{ fontSize: '0.9375rem', color: '#1E293B' }}>Lost Leads By Reason</strong>
            <select className="form-control" style={{ width: '120px', fontSize: '0.6875rem', padding: '0.2rem 0.4rem' }}>
              <option>Sales Pipeline</option>
            </select>
          </CardHeader>
          <CardBody style={{ padding: '1.25rem', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: '160px' }}>
            {[
              { reason: 'Competitor', val: 85 },
              { reason: 'Budget', val: 50 },
              { reason: 'Unresponsive', val: 65 },
              { reason: 'Timing', val: 45 }
            ].map((r, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.375rem' }}>
                <div style={{ width: '28px', height: `${r.val}px`, background: '#FF5B37', borderRadius: '4px' }} />
                <span style={{ fontSize: '0.6875rem', color: '#64748B', fontWeight: 600 }}>{r.reason}</span>
              </div>
            ))}
          </CardBody>
        </Card>

        {/* Leads By Companies */}
        <Card>
          <CardHeader style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border-subtle)' }}>
            <strong style={{ fontSize: '0.9375rem', color: '#1E293B' }}>Leads By Companies</strong>
            <select className="form-control" style={{ width: '110px', fontSize: '0.6875rem', padding: '0.2rem 0.4rem' }}>
              <option>📅 This Week</option>
            </select>
          </CardHeader>
          <CardBody style={{ padding: '0.875rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { name: 'Pitch', val: 'Value : ₹45,685', stage: 'Not Contacted', color: '#8B5CF6', bg: '#F5F3FF', icon: 'P', iconBg: '#0F172A' },
              { name: 'Initech', val: 'Value : ₹21,145', stage: 'Closed', color: '#10B981', bg: '#ECFDF5', icon: '◆', iconBg: '#6366F1' },
              { name: 'Umbrella Corp', val: 'Value : ₹15,685', stage: 'Contacted', color: '#0284C7', bg: '#EFF6FF', icon: '▲', iconBg: '#EF4444' },
              { name: 'Capital Partners', val: 'Value : ₹12,106', stage: 'Contacted', color: '#0284C7', bg: '#EFF6FF', icon: 'C', iconBg: '#F97316' },
              { name: 'Massive Dynamic', val: 'Value : ₹2,546', stage: 'Lost', color: '#EF4444', bg: '#FEF2F2', icon: 'N', iconBg: '#1E293B' }
            ].map((comp, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: comp.iconBg, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6875rem', fontWeight: 800 }}>
                    {comp.icon}
                  </div>
                  <div>
                    <strong style={{ fontSize: '0.8125rem', color: '#1E293B' }}>{comp.name}</strong>
                    <div style={{ fontSize: '0.6875rem', color: '#64748B' }}>{comp.val}</div>
                  </div>
                </div>

                <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: comp.color, background: comp.bg, padding: '0.125rem 0.5rem', borderRadius: 'var(--radius-pill)' }}>
                  • {comp.stage}
                </span>
              </div>
            ))}
          </CardBody>
        </Card>

        {/* Leads by Source */}
        <Card>
          <CardHeader style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border-subtle)' }}>
            <strong style={{ fontSize: '0.9375rem', color: '#1E293B' }}>Leads by Source</strong>
            <select className="form-control" style={{ width: '110px', fontSize: '0.6875rem', padding: '0.2rem 0.4rem' }}>
              <option>📅 This Week</option>
            </select>
          </CardHeader>
          <CardBody style={{ padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <div style={{ position: 'relative', width: '120px', height: '120px' }}>
              <svg width="120" height="120" viewBox="0 0 42 42">
                <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#F1F5F9" strokeWidth="6" />
                <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#0284C7" strokeWidth="6" strokeDasharray="40 60" strokeDashoffset="25" />
                <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#F59E0B" strokeWidth="6" strokeDasharray="35 65" strokeDashoffset="85" />
                <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#EC4899" strokeWidth="6" strokeDasharray="15 85" strokeDashoffset="50" />
                <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#10B981" strokeWidth="6" strokeDasharray="10 90" strokeDashoffset="35" />
              </svg>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                <span style={{ fontSize: '0.625rem', color: '#64748B' }}>Google</span>
                <strong style={{ display: 'block', fontSize: '0.8125rem', color: '#1E293B' }}>40%</strong>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', width: '100%', fontSize: '0.6875rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: '#0284C7' }} /> Google: <strong>40%</strong></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: '#F59E0B' }} /> Paid: <strong>35%</strong></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: '#EC4899' }} /> Campaigns: <strong>15%</strong></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }} /> Referrals: <strong>10%</strong></div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Row 4: Recent Follow Up, Recent Activities, Notifications */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
        {/* Recent Follow Up */}
        <Card>
          <CardHeader style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border-subtle)' }}>
            <strong style={{ fontSize: '0.9375rem', color: '#1E293B' }}>Recent Follow Up</strong>
            <span style={{ fontSize: '0.6875rem', color: '#94A3B8', fontWeight: 700, cursor: 'pointer' }} onClick={() => { setActiveModule('CRM'); setCrmTab('activity'); }}>View All</span>
          </CardHeader>
          <CardBody style={{ padding: '0.875rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { name: 'Brian Villalobos', action: 'Next Step : Send email in 2 days', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', icon: <Mail size={12} /> },
              { name: 'Stephan Peralt', action: 'Next Step : Call in 5 days', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', icon: <Phone size={12} /> },
              { name: 'Elliot Murray', action: 'Next Step : Send email in 4 days', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', icon: <Mail size={12} /> },
              { name: 'Connie Waters', action: 'Next Step : Call in 2 days', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80', icon: <Phone size={12} /> },
              { name: 'Lori Broaddus', action: 'When would be a good time for the demo?', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', icon: <MessageSquare size={12} /> }
            ].map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Avatar src={f.avatar} name={f.name} size="xs" />
                  <div>
                    <strong style={{ fontSize: '0.8125rem', color: '#1E293B' }}>{f.name}</strong>
                    <div style={{ fontSize: '0.6875rem', color: '#64748B' }}>{f.action}</div>
                  </div>
                </div>
                <button className="btn-icon-only btn-ghost" style={{ padding: '0.2rem', color: '#94A3B8' }} onClick={() => showToast(`Action dispatched for ${f.name}`, 'info')}>
                  {f.icon}
                </button>
              </div>
            ))}
          </CardBody>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border-subtle)' }}>
            <strong style={{ fontSize: '0.9375rem', color: '#1E293B' }}>Recent Activities</strong>
            <span style={{ fontSize: '0.6875rem', color: '#94A3B8', fontWeight: 700, cursor: 'pointer' }} onClick={() => { setActiveModule('CRM'); setCrmTab('activity'); }}>View All</span>
          </CardHeader>
          <CardBody style={{ padding: '0.875rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { text: 'Drain responded to your appointment schedule question.', time: '09:25 PM', icon: <Phone size={14} />, color: '#10B981', bg: '#ECFDF5' },
              { text: 'You sent 1 Message to the James.', time: '10:25 PM', icon: <MessageSquare size={14} />, color: '#0284C7', bg: '#E0F2FE' },
              { text: 'Denwar responded to your appointment on 25 Jan 2025, 08:15 PM', time: '09:25 PM', icon: <Phone size={14} />, color: '#10B981', bg: '#ECFDF5' },
              { text: 'Meeting With Abraham', time: '05:00 PM', icon: <Users2 size={14} />, color: '#8B5CF6', bg: '#F5F3FF' }
            ].map((act, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: act.bg, color: act.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                  {act.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.75rem', color: '#1E293B', fontWeight: 600 }}>{act.text}</div>
                  <span style={{ fontSize: '0.6875rem', color: '#94A3B8' }}>{act.time}</span>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border-subtle)' }}>
            <strong style={{ fontSize: '0.9375rem', color: '#1E293B' }}>Notifications</strong>
            <span style={{ fontSize: '0.6875rem', color: '#94A3B8', fontWeight: 700, cursor: 'pointer' }} onClick={() => showToast('Opening all system notifications...', 'info')}>View All</span>
          </CardHeader>
          <CardBody style={{ padding: '0.875rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {notifications.map((n) => (
              <div key={n.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem' }}>
                <Avatar src={n.avatar} name={n.user} size="xs" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.75rem', color: '#1E293B' }}>
                    <strong>{n.user}</strong> {n.action}
                  </div>
                  <span style={{ fontSize: '0.6875rem', color: '#94A3B8' }}>{n.time}</span>

                  {n.attachment && (
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', background: '#F8FAFC', border: '1px solid var(--color-border-subtle)', borderRadius: '4px', padding: '0.15rem 0.4rem', fontSize: '0.6875rem', marginTop: '0.25rem' }}>
                      <FileText size={11} color="#EF4444" />
                      <span>{n.attachment}</span>
                    </div>
                  )}

                  {n.hasActions && (
                    <div style={{ display: 'flex', gap: '0.375rem', marginTop: '0.35rem' }}>
                      {n.status ? (
                        <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: n.status === 'approved' ? '#10B981' : '#EF4444' }}>
                          ✓ {n.status.toUpperCase()}
                        </span>
                      ) : (
                        <>
                          <button
                            onClick={() => handleAction(n.id, 'approved')}
                            className="btn btn-sm"
                            style={{ background: '#FF5B37', color: '#FFFFFF', fontSize: '0.6875rem', padding: '0.15rem 0.5rem', borderRadius: '4px' }}
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleAction(n.id, 'declined')}
                            className="btn btn-secondary btn-sm"
                            style={{ fontSize: '0.6875rem', padding: '0.15rem 0.5rem', borderRadius: '4px' }}
                          >
                            Decline
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>

      {/* Row 5: Top Countries & Recent Leads Table */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.25rem' }}>
        {/* Top Countries */}
        <Card>
          <CardHeader style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border-subtle)' }}>
            <strong style={{ fontSize: '0.9375rem', color: '#1E293B' }}>Top Countries</strong>
            <select className="form-control" style={{ width: '100px', fontSize: '0.6875rem', padding: '0.2rem 0.4rem' }}>
              <option>Referrals</option>
            </select>
          </CardHeader>
          <CardBody style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            {/* Country list */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.625rem', fontSize: '0.75rem' }}>
              {[
                { name: 'Singapore', count: 'Leads : 236', flag: '🇸🇬' },
                { name: 'France', count: 'Leads : 589', flag: '🇫🇷' },
                { name: 'Norway', count: 'Leads : 221', flag: '🇳🇴' },
                { name: 'USA', count: 'Deals : 350', flag: '🇺🇸' },
                { name: 'UAE', count: 'Leads : 221', flag: '🇦🇪' }
              ].map((c, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1rem' }}>{c.flag}</span>
                  <div>
                    <strong style={{ fontSize: '0.8125rem', color: '#1E293B' }}>{c.name}</strong>
                    <div style={{ fontSize: '0.6875rem', color: '#64748B' }}>{c.count}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Donut Chart */}
            <div style={{ position: 'relative', width: '110px', height: '110px' }}>
              <svg width="110" height="110" viewBox="0 0 42 42">
                <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#F1F5F9" strokeWidth="6" />
                <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#0F766E" strokeWidth="6" strokeDasharray="50 50" strokeDashoffset="25" />
                <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#F59E0B" strokeWidth="6" strokeDasharray="25 75" strokeDashoffset="75" />
                <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#3B82F6" strokeWidth="6" strokeDasharray="15 85" strokeDashoffset="50" />
                <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#EF4444" strokeWidth="6" strokeDasharray="10 90" strokeDashoffset="35" />
              </svg>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                <span style={{ fontSize: '0.625rem', color: '#64748B' }}>Leads</span>
                <strong style={{ display: 'block', fontSize: '0.8125rem', color: '#1E293B' }}>589</strong>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Recent Leads Table */}
        <Card>
          <CardHeader style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border-subtle)' }}>
            <strong style={{ fontSize: '0.9375rem', color: '#1E293B' }}>Recent Leads</strong>
            <span style={{ fontSize: '0.6875rem', color: '#94A3B8', fontWeight: 700, cursor: 'pointer' }} onClick={() => { setActiveModule('CRM'); setCrmTab('contacts'); }}>View All</span>
          </CardHeader>
          <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
            <table className="table" style={{ fontSize: '0.75rem' }}>
              <thead>
                <tr>
                  <th>Deal Name</th>
                  <th>Company Name</th>
                  <th>Stage</th>
                  <th>Created Date ▾</th>
                  <th>Lead Owner</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { deal: 'Collins', comp: 'BrightWave Innovations', compIcon: '⬡', compBg: '#8B5CF6', stage: 'Contacted', stageColor: '#0284C7', stageBg: '#EFF6FF', date: '14/01/2024', owner: 'Hendry' },
                  { deal: 'Konopelski', comp: 'Stellar Dynamics', compIcon: '⚡', compBg: '#10B981', stage: 'Closed', stageColor: '#10B981', stageBg: '#ECFDF5', date: '21/01/2024', owner: 'Guilory' },
                  { deal: 'Adams', comp: 'Quantum Nexus', compIcon: '●●', compBg: '#2563EB', stage: 'Lost', stageColor: '#EF4444', stageBg: '#FEF2F2', date: '20/02/2024', owner: 'Jami' },
                  { deal: 'Schumm', comp: 'EcoVision Enterprises', compIcon: '◈', compBg: '#0284C7', stage: 'Not Contacted', stageColor: '#8B5CF6', stageBg: '#F5F3FF', date: '15/03/2024', owner: 'Theresa' },
                  { deal: 'Wisozk', comp: 'Aurora Technologies', compIcon: '🌐', compBg: '#7C3AED', stage: 'Closed', stageColor: '#10B981', stageBg: '#ECFDF5', date: '12/04/2024', owner: 'Smith' }
                ].map((lead, idx) => (
                  <tr key={idx}>
                    <td><strong>{lead.deal}</strong></td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                        <span style={{ width: 18, height: 18, borderRadius: '50%', background: lead.compBg, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.625rem' }}>
                          {lead.compIcon}
                        </span>
                        <span>{lead.comp}</span>
                      </div>
                    </td>
                    <td>
                      <span style={{ background: lead.stageBg, color: lead.stageColor, padding: '0.125rem 0.45rem', borderRadius: 'var(--radius-pill)', fontWeight: 700, fontSize: '0.6875rem' }}>
                        • {lead.stage}
                      </span>
                    </td>
                    <td>{lead.date}</td>
                    <td><strong style={{ color: '#1E293B' }}>{lead.owner}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};
