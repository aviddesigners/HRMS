import React, { useState } from 'react';
import {
  Building2,
  Users2,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  ChevronDown,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Mail,
  RotateCw,
  Search,
  CheckCircle2,
  Sparkles,
  Award
} from 'lucide-react';
import { useHRMS } from '../../context/HRMSContext';
import { useToast } from '../../context/ToastContext';
import { Card, CardHeader, CardBody } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Avatar } from '../../components/common/Avatar';
import { Button } from '../../components/common/Button';

export const SuperAdminDashboard: React.FC = () => {
  const { setActiveModule, setCrmTab, setDashboardTab } = useHRMS();
  const { showToast } = useToast();

  const [dateRange, setDateRange] = useState('15/05/2025 - 21/05/2025');
  const [selectedYear, setSelectedYear] = useState('2025');
  const [expiredFilter, setExpiredFilter] = useState('Expired');

  // Transactions dataset
  const transactions = [
    {
      id: 'TX-01',
      company: 'Stellar Dynamics',
      refNo: '#12457',
      date: '14 Jan 2025',
      amount: '+₹24,500',
      plan: 'Basic (Monthly)',
      icon: '⚡',
      iconBg: '#10B981'
    },
    {
      id: 'TX-02',
      company: 'Quantum Nexus',
      refNo: '#66974',
      date: '14 Jan 2025',
      amount: '+₹39,500',
      plan: 'Enterprise (Yearly)',
      icon: '●●',
      iconBg: '#2563EB'
    },
    {
      id: 'TX-03',
      company: 'Aurora Technologies',
      refNo: '#22457',
      date: '14 Jan 2025',
      amount: '+₹14,500',
      plan: 'Advanced (Monthly)',
      icon: '🌐',
      iconBg: '#7C3AED'
    },
    {
      id: 'TX-04',
      company: 'TerraFusion Energy',
      refNo: '#43412',
      date: '14 Jan 2025',
      amount: '+₹75,800',
      plan: 'Enterprise (Monthly)',
      icon: '⚙',
      iconBg: '#EA580C'
    },
    {
      id: 'TX-05',
      company: 'Epicurean Delights',
      refNo: '#43567',
      date: '14 Jan 2025',
      amount: '+₹97,700',
      plan: 'Premium (Yearly)',
      icon: 'C',
      iconBg: '#3B82F6'
    }
  ];

  // Recently Registered dataset
  const recentlyRegistered = [
    {
      id: 'REG-01',
      name: 'Pitch',
      users: '150 Users',
      plan: 'Basic (Monthly)',
      domain: 'pitch.example.com',
      avatarBg: '#0F172A',
      avatarText: 'Pitch'
    },
    {
      id: 'REG-02',
      name: 'Initech',
      users: '200 Users',
      plan: 'Enterprise (Yearly)',
      domain: 'initech.example.com',
      avatarBg: '#6366F1',
      avatarText: '◆'
    },
    {
      id: 'REG-03',
      name: 'Umbrella Corp',
      users: '108 Users',
      plan: 'Advanced (Monthly)',
      domain: 'umbcorp.example.com',
      avatarBg: '#EF4444',
      avatarText: '▲'
    },
    {
      id: 'REG-04',
      name: 'Capital Partners',
      users: '108 Users',
      plan: 'Enterprise (Monthly)',
      domain: 'capitalpart.example.com',
      avatarBg: '#F97316',
      avatarText: 'C'
    },
    {
      id: 'REG-05',
      name: 'Massive Dynamic',
      users: '108 Users',
      plan: 'Premium (Yearly)',
      domain: 'msdynamic.example.com',
      avatarBg: '#1E293B',
      avatarText: 'N'
    }
  ];

  // Recent Plan Expired dataset
  const [expiredPlans, setExpiredPlans] = useState([
    {
      id: 'EXP-01',
      company: 'Silicon Corp',
      expiryDate: '10 Apr 2025',
      plan: 'Basic (Monthly)',
      iconBg: '#3B82F6',
      icon: '❖',
      reminded: false
    },
    {
      id: 'EXP-02',
      company: 'Hubspot',
      expiryDate: '12 Jun 2025',
      plan: 'Enterprise (Yearly)',
      iconBg: '#F97316',
      icon: '◈',
      reminded: false
    },
    {
      id: 'EXP-03',
      company: 'Licon Industries',
      expiryDate: '16 Jun 2025',
      plan: 'Advanced (Monthly)',
      iconBg: '#0284C7',
      icon: '●',
      reminded: false
    },
    {
      id: 'EXP-04',
      company: 'TerraFusion Energy',
      expiryDate: '12 May 2025',
      plan: 'Enterprise (Monthly)',
      iconBg: '#EA580C',
      icon: '⚙',
      reminded: false
    },
    {
      id: 'EXP-05',
      company: 'Epicurean Delights',
      expiryDate: '15 May 2025',
      plan: 'Premium (Yearly)',
      iconBg: '#2563EB',
      icon: 'C',
      reminded: false
    }
  ]);

  const handleSendReminder = (id: string, name: string) => {
    setExpiredPlans((prev) =>
      prev.map((item) => (item.id === id ? { ...item, reminded: true } : item))
    );
    showToast(`Renewal reminder email dispatched to ${name}`, 'success');
  };

  return (
    <div className="page-container" style={{ gap: '1.25rem' }}>
      {/* Top Header & Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#1E293B' }}>Dashboard</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', color: '#94A3B8' }}>
            <span>⌂</span>
            <span>/</span>
            <span>Superadmin</span>
            <span>/</span>
            <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Dashboard</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            className="btn btn-secondary btn-sm"
            style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}
          >
            <Calendar size={13} /> {dateRange}
          </button>
        </div>
      </div>

      {/* Hero Banner (Vivid Orange with floating elements & action buttons) */}
      <div
        style={{
          background: 'linear-gradient(135deg, #FF6A00 0%, #FF5B37 50%, #FF4500 100%)',
          borderRadius: 'var(--radius-xl)',
          padding: '1.75rem 2rem',
          color: '#FFFFFF',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 8px 24px rgba(255, 91, 55, 0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.25rem'
        }}
      >
        {/* Background ambient lighting spheres */}
        <div style={{ position: 'absolute', top: '-40px', right: '25%', width: '140px', height: '140px', background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-50px', right: '35%', width: '160px', height: '160px', background: 'radial-gradient(circle, rgba(0,0,0,0.15) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

        <div>
          <h2 style={{ fontSize: '1.625rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em' }}>
            Welcome Back, Adrian
          </h2>
          <p style={{ margin: '0.375rem 0 0', fontSize: '0.875rem', opacity: 0.95, fontWeight: 500 }}>
            14 New Companies Subscribed Today !!!
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', zIndex: 2 }}>
          <button
            onClick={() => { setActiveModule('CRM'); setCrmTab('companies'); }}
            className="btn btn-sm"
            style={{
              background: '#1E293B',
              color: '#FFFFFF',
              border: 'none',
              fontWeight: 700,
              padding: '0.5rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.8125rem'
            }}
          >
            Companies
          </button>
          <button
            onClick={() => showToast('Opening Super Admin subscription packages...', 'info')}
            className="btn btn-sm"
            style={{
              background: '#FFFFFF',
              color: '#1E293B',
              border: 'none',
              fontWeight: 700,
              padding: '0.5rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.8125rem'
            }}
          >
            All Packages
          </button>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
        {/* Total Companies */}
        <Card>
          <CardBody style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div style={{ width: 38, height: 38, borderRadius: '8px', background: '#F1F5F9', color: '#1E293B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Building2 size={18} />
              </div>
              <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#10B981', background: '#ECFDF5', padding: '0.15rem 0.45rem', borderRadius: 'var(--radius-pill)' }}>
                +19.01%
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: '0.875rem' }}>
              <div>
                <h3 style={{ fontSize: '1.625rem', fontWeight: 800, color: '#1E293B', margin: 0 }}>5468</h3>
                <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Total Companies</span>
              </div>

              {/* Sparkline orange bars */}
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '32px' }}>
                {[12, 18, 14, 22, 28, 20, 26, 32].map((h, i) => (
                  <div key={i} style={{ width: '4px', height: `${h}px`, background: '#FF5B37', borderRadius: '2px' }} />
                ))}
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Active Companies */}
        <Card>
          <CardBody style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div style={{ width: 38, height: 38, borderRadius: '8px', background: '#F1F5F9', color: '#1E293B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Building2 size={18} />
              </div>
              <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#EF4444', background: '#FEF2F2', padding: '0.15rem 0.45rem', borderRadius: 'var(--radius-pill)' }}>
                -12%
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: '0.875rem' }}>
              <div>
                <h3 style={{ fontSize: '1.625rem', fontWeight: 800, color: '#1E293B', margin: 0 }}>4598</h3>
                <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Active Companies</span>
              </div>

              {/* Sparkline purple bars */}
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '32px' }}>
                {[14, 24, 18, 20, 16, 28, 22, 30].map((h, i) => (
                  <div key={i} style={{ width: '4px', height: `${h}px`, background: '#7C3AED', borderRadius: '2px' }} />
                ))}
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Total Subscribers */}
        <Card>
          <CardBody style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div style={{ width: 38, height: 38, borderRadius: '8px', background: '#F1F5F9', color: '#1E293B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users2 size={18} />
              </div>
              <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#10B981', background: '#ECFDF5', padding: '0.15rem 0.45rem', borderRadius: 'var(--radius-pill)' }}>
                +6%
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: '0.875rem' }}>
              <div>
                <h3 style={{ fontSize: '1.625rem', fontWeight: 800, color: '#1E293B', margin: 0 }}>3698</h3>
                <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Total Subscribers</span>
              </div>

              {/* Sparkline blue bars */}
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '32px' }}>
                {[16, 12, 22, 26, 30, 24, 28, 32].map((h, i) => (
                  <div key={i} style={{ width: '4px', height: `${h}px`, background: '#0284C7', borderRadius: '2px' }} />
                ))}
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Total Earnings */}
        <Card>
          <CardBody style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div style={{ width: 38, height: 38, borderRadius: '8px', background: '#F1F5F9', color: '#1E293B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <DollarSign size={18} />
              </div>
              <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#EF4444', background: '#FEF2F2', padding: '0.15rem 0.45rem', borderRadius: 'var(--radius-pill)' }}>
                -16%
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: '0.875rem' }}>
              <div>
                <h3 style={{ fontSize: '1.625rem', fontWeight: 800, color: '#1E293B', margin: 0 }}>₹89,878,58</h3>
                <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Total Earnings</span>
              </div>

              {/* Sparkline green bars */}
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '32px' }}>
                {[20, 28, 16, 32, 24, 30, 26, 32].map((h, i) => (
                  <div key={i} style={{ width: '4px', height: `${h}px`, background: '#10B981', borderRadius: '2px' }} />
                ))}
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Middle Row: Companies Bar Chart, Revenue Bar Chart, Top Plans Donut */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr 1fr', gap: '1.25rem' }}>
        {/* Companies (This Week) */}
        <Card>
          <CardHeader style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border-subtle)' }}>
            <strong style={{ fontSize: '0.9375rem', color: '#1E293B' }}>Companies</strong>
            <select className="form-control" style={{ width: '110px', fontSize: '0.6875rem', padding: '0.2rem 0.4rem' }}>
              <option>📅 This Week</option>
              <option>📅 This Month</option>
            </select>
          </CardHeader>
          <CardBody style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Weekday Bar Chart */}
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: '140px', paddingTop: '1.5rem', position: 'relative' }}>
              {[
                { day: 'M', h: 45, color: '#1E293B' },
                { day: 'T', h: 90, color: '#1E293B', star: true },
                { day: 'W', h: 35, color: '#1E293B' },
                { day: 'T', h: 100, color: '#FF5B37', tag: '100' },
                { day: 'F', h: 75, color: '#FF5B37' },
                { day: 'S', h: 65, color: '#1E293B' },
                { day: 'S', h: 65, color: '#1E293B' }
              ].map((b, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', position: 'relative' }}>
                  {b.star && (
                    <span style={{ position: 'absolute', top: '-18px', fontSize: '0.625rem', color: '#1E293B' }}>★</span>
                  )}
                  {b.tag && (
                    <span style={{ position: 'absolute', top: '-20px', fontSize: '0.5625rem', fontWeight: 800, background: '#FF5B37', color: '#FFFFFF', padding: '1px 4px', borderRadius: '3px' }}>
                      {b.tag}
                    </span>
                  )}
                  <div style={{ width: '14px', height: `${b.h}px`, background: b.color, borderRadius: '4px' }} />
                  <span style={{ fontSize: '0.6875rem', color: '#94A3B8', fontWeight: 600 }}>{b.day}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '0.75rem' }}>
              <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#10B981', background: '#ECFDF5', padding: '0.1rem 0.4rem', borderRadius: 'var(--radius-pill)' }}>
                +6%
              </span>
              <span style={{ color: '#64748B' }}>5 Companies from last month</span>
            </div>
          </CardBody>
        </Card>

        {/* Revenue (2025 Bar Chart) */}
        <Card>
          <CardHeader style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border-subtle)' }}>
            <strong style={{ fontSize: '0.9375rem', color: '#1E293B' }}>Revenue</strong>
            <select className="form-control" style={{ width: '80px', fontSize: '0.6875rem', padding: '0.2rem 0.4rem' }} value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
              <option>2025</option>
              <option>2024</option>
            </select>
          </CardHeader>
          <CardBody style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#1E293B', margin: 0 }}>₹45,787</h3>
                <span style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 700 }}>+40% Increased from last year</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#FF5B37' }} />
                <span>• Revenue</span>
              </div>
            </div>

            {/* 12 Months Bar Chart */}
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '130px', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '0.25rem' }}>
              {[
                { m: 'Jan', v: 45 },
                { m: 'Feb', v: 38 },
                { m: 'Mar', v: 48 },
                { m: 'Apr', v: 30 },
                { m: 'May', v: 70 },
                { m: 'Jun', v: 78 },
                { m: 'Jul', v: 68 },
                { m: 'Aug', v: 80 },
                { m: 'Sep', v: 82 },
                { m: 'Oct', v: 88 },
                { m: 'Nov', v: 24 },
                { m: 'Dec', v: 86 }
              ].map((mo, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.375rem' }}>
                  <div style={{ width: '16px', height: `${mo.v}px`, background: '#FF5B37', borderRadius: '3px' }} />
                  <span style={{ fontSize: '0.625rem', color: '#94A3B8', fontWeight: 600 }}>{mo.m}</span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Top Plans Donut Chart */}
        <Card>
          <CardHeader style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border-subtle)' }}>
            <strong style={{ fontSize: '0.9375rem', color: '#1E293B' }}>Top Plans</strong>
            <select className="form-control" style={{ width: '110px', fontSize: '0.6875rem', padding: '0.2rem 0.4rem' }}>
              <option>📅 This Month</option>
              <option>📅 This Year</option>
            </select>
          </CardHeader>
          <CardBody style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
            {/* SVG Donut Chart */}
            <div style={{ position: 'relative', width: '130px', height: '130px' }}>
              <svg width="130" height="130" viewBox="0 0 42 42">
                <circle cx="21" cy="21" r="15.91549430918954" fill="#transparent" stroke="#F1F5F9" strokeWidth="6" />
                {/* Basic 60% Orange */}
                <circle
                  cx="21"
                  cy="21"
                  r="15.91549430918954"
                  fill="transparent"
                  stroke="#FF5B37"
                  strokeWidth="6"
                  strokeDasharray="60 40"
                  strokeDashoffset="25"
                />
                {/* Premium 20% Yellow */}
                <circle
                  cx="21"
                  cy="21"
                  r="15.91549430918954"
                  fill="transparent"
                  stroke="#F59E0B"
                  strokeWidth="6"
                  strokeDasharray="20 80"
                  strokeDashoffset="65"
                />
                {/* Enterprise 20% Blue */}
                <circle
                  cx="21"
                  cy="21"
                  r="15.91549430918954"
                  fill="transparent"
                  stroke="#3B82F6"
                  strokeWidth="6"
                  strokeDasharray="20 80"
                  strokeDashoffset="45"
                />
              </svg>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#1E293B' }}>60%</span>
              </div>
            </div>

            {/* Legend Breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%', fontSize: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#FF5B37' }} />
                  <span style={{ color: '#64748B' }}>Basic</span>
                </div>
                <strong style={{ color: '#1E293B' }}>60%</strong>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#F59E0B' }} />
                  <span style={{ color: '#64748B' }}>Premium</span>
                </div>
                <strong style={{ color: '#1E293B' }}>20%</strong>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#3B82F6' }} />
                  <span style={{ color: '#64748B' }}>Enterprise</span>
                </div>
                <strong style={{ color: '#1E293B' }}>20%</strong>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Bottom Row (3 Cards): Recent Transactions, Recently Registered, Recent Plan Expired */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
        {/* 1. Recent Transactions */}
        <Card>
          <CardHeader style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border-subtle)' }}>
            <strong style={{ fontSize: '0.9375rem', color: '#1E293B' }}>Recent Transactions</strong>
            <span style={{ fontSize: '0.6875rem', color: '#94A3B8', fontWeight: 700, cursor: 'pointer' }} onClick={() => setActiveModule('Finance & Accounts')}>
              View All
            </span>
          </CardHeader>
          <CardBody style={{ padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {transactions.map((tx) => (
              <div key={tx.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: tx.iconBg, color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.875rem', fontWeight: 800 }}>
                    {tx.icon}
                  </div>
                  <div>
                    <strong style={{ fontSize: '0.8125rem', color: '#1E293B' }}>{tx.company}</strong>
                    <div style={{ fontSize: '0.6875rem', color: '#94A3B8' }}>
                      <span style={{ color: '#0284C7', fontWeight: 600 }}>{tx.refNo}</span> • {tx.date}
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <strong style={{ fontSize: '0.8125rem', color: '#10B981' }}>{tx.amount}</strong>
                  <div style={{ fontSize: '0.6875rem', color: '#64748B' }}>{tx.plan}</div>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>

        {/* 2. Recently Registered */}
        <Card>
          <CardHeader style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border-subtle)' }}>
            <strong style={{ fontSize: '0.9375rem', color: '#1E293B' }}>Recently Registered</strong>
            <span style={{ fontSize: '0.6875rem', color: '#94A3B8', fontWeight: 700, cursor: 'pointer' }} onClick={() => { setActiveModule('CRM'); setCrmTab('companies'); }}>
              View All
            </span>
          </CardHeader>
          <CardBody style={{ padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {recentlyRegistered.map((reg) => (
              <div key={reg.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: reg.avatarBg, color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800 }}>
                    {reg.avatarText}
                  </div>
                  <div>
                    <strong style={{ fontSize: '0.8125rem', color: '#1E293B' }}>{reg.name}</strong>
                    <div style={{ fontSize: '0.6875rem', color: '#64748B' }}>{reg.plan}</div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1E293B' }}>{reg.users}</div>
                  <div style={{ fontSize: '0.6875rem', color: '#94A3B8' }}>{reg.domain}</div>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>

        {/* 3. Recent Plan Expired */}
        <Card>
          <CardHeader style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border-subtle)' }}>
            <strong style={{ fontSize: '0.9375rem', color: '#1E293B' }}>Recent Plan Expired</strong>
            <select className="form-control" style={{ width: '90px', fontSize: '0.6875rem', padding: '0.2rem 0.4rem' }} value={expiredFilter} onChange={(e) => setExpiredFilter(e.target.value)}>
              <option>Expired</option>
              <option>Renewed</option>
            </select>
          </CardHeader>
          <CardBody style={{ padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {expiredPlans.map((exp) => (
              <div key={exp.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: exp.iconBg, color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.875rem', fontWeight: 800 }}>
                    {exp.icon}
                  </div>
                  <div>
                    <strong style={{ fontSize: '0.8125rem', color: '#1E293B' }}>{exp.company}</strong>
                    <div style={{ fontSize: '0.6875rem', color: '#EF4444', fontWeight: 600 }}>Expired : {exp.expiryDate}</div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  {exp.reminded ? (
                    <span style={{ fontSize: '0.6875rem', color: '#10B981', fontWeight: 700 }}>✓ Reminded</span>
                  ) : (
                    <button
                      onClick={() => handleSendReminder(exp.id, exp.company)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-primary)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        padding: 0
                      }}
                    >
                      Send Reminder
                    </button>
                  )}
                  <div style={{ fontSize: '0.6875rem', color: '#94A3B8' }}>{exp.plan}</div>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
