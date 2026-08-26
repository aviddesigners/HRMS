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
  FolderKanban,
  FileText,
  DollarSign,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight,
  Globe,
  Sparkles,
  Award,
  Star
} from 'lucide-react';
import { useHRMS } from '../../context/HRMSContext';
import { useToast } from '../../context/ToastContext';
import { Card, CardHeader, CardBody } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Avatar } from '../../components/common/Avatar';
import { Button } from '../../components/common/Button';

export const DealsDashboard: React.FC = () => {
  const { setActiveModule, setCrmTab } = useHRMS();
  const { showToast } = useToast();

  const [dateRange, setDateRange] = useState('15/05/2025 - 21/05/2025');

  return (
    <div className="page-container" style={{ gap: '1.25rem' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#1E293B' }}>Deals Dashboard</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', color: '#94A3B8' }}>
            <span>⌂</span>
            <span>/</span>
            <span>Dashboard</span>
            <span>/</span>
            <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Deals Dashboard</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button className="btn btn-secondary btn-sm" onClick={() => showToast('Exporting deals report...', 'info')} style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <Download size={13} /> Export <ChevronDown size={12} />
          </button>
          <button className="btn btn-secondary btn-sm" style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <Calendar size={13} /> {dateRange}
          </button>
        </div>
      </div>

      {/* Top Grid: 6 KPI Cards (Left) + Pipeline Stages Funnel (Right) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '1.25rem' }}>
        {/* 6 Metric Cards in 2x3 grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {/* Card 1: Total Deals */}
          <Card>
            <CardBody style={{ padding: '1rem 1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Total Deals</span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1E293B', margin: '0.2rem 0' }}>₹45,221,45</h3>
                  <span style={{ fontSize: '0.6875rem', color: '#EF4444', fontWeight: 700 }}>~ -4.01% <span style={{ color: '#94A3B8', fontWeight: 500 }}>from last week</span></span>
                </div>
                <div style={{ width: 34, height: 34, borderRadius: '8px', background: '#FFF1EE', color: '#FF5B37', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  ▲
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Card 2: Total Customers */}
          <Card>
            <CardBody style={{ padding: '1rem 1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Total Customers</span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1E293B', margin: '0.2rem 0' }}>9895</h3>
                  <span style={{ fontSize: '0.6875rem', color: '#10B981', fontWeight: 700 }}>~ +65% <span style={{ color: '#94A3B8', fontWeight: 500 }}>from last week</span></span>
                </div>
                <div style={{ width: 34, height: 34, borderRadius: '8px', background: '#F5F3FF', color: '#8B5CF6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  👥
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Card 3: Deal Value */}
          <Card>
            <CardBody style={{ padding: '1rem 1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Deal Value</span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1E293B', margin: '0.2rem 0' }}>₹12,545,68</h3>
                  <span style={{ fontSize: '0.6875rem', color: '#10B981', fontWeight: 700 }}>~ +20.01% <span style={{ color: '#94A3B8', fontWeight: 500 }}>from last week</span></span>
                </div>
                <div style={{ width: 34, height: 34, borderRadius: '8px', background: '#E0F2FE', color: '#0284C7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  🔄
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Card 4: Conversion Rate */}
          <Card>
            <CardBody style={{ padding: '1rem 1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Conversion Rate</span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1E293B', margin: '0.2rem 0' }}>51.96%</h3>
                  <span style={{ fontSize: '0.6875rem', color: '#EF4444', fontWeight: 700 }}>~ -6.01% <span style={{ color: '#94A3B8', fontWeight: 500 }}>from last week</span></span>
                </div>
                <div style={{ width: 34, height: 34, borderRadius: '8px', background: '#EFF6FF', color: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  🤝
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Card 5: Revenue this month */}
          <Card>
            <CardBody style={{ padding: '1rem 1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Revenue this month</span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1E293B', margin: '0.2rem 0' }}>₹46,548,48</h3>
                  <span style={{ fontSize: '0.6875rem', color: '#10B981', fontWeight: 700 }}>~ +55% <span style={{ color: '#94A3B8', fontWeight: 500 }}>from last week</span></span>
                </div>
                <div style={{ width: 34, height: 34, borderRadius: '8px', background: '#FDF2F8', color: '#EC4899', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  ❖
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Card 6: Active Customers */}
          <Card>
            <CardBody style={{ padding: '1rem 1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Active Customers</span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1E293B', margin: '0.2rem 0' }}>8987</h3>
                  <span style={{ fontSize: '0.6875rem', color: '#EF4444', fontWeight: 700 }}>~ -3.22% <span style={{ color: '#94A3B8', fontWeight: 500 }}>from last week</span></span>
                </div>
                <div style={{ width: 34, height: 34, borderRadius: '8px', background: '#FEF3C7', color: '#F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  ★
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Right Column: Pipeline Stages Vertical Funnel */}
        <Card>
          <CardHeader style={{ padding: '0.875rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border-subtle)' }}>
            <strong style={{ fontSize: '0.9375rem', color: '#1E293B' }}>Pipeline Stages</strong>
            <select className="form-control" style={{ width: '110px', fontSize: '0.6875rem', padding: '0.2rem 0.4rem' }}>
              <option>📅 This Week</option>
            </select>
          </CardHeader>
          <CardBody style={{ padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
            {/* Funnel Layers */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: '4px' }}>
              {[
                { label: 'Marketing : 7,888', w: '95%', bg: '#EA580C' },
                { label: 'Sales : 4658', w: '85%', bg: '#F97316' },
                { label: 'Email : 2898', w: '75%', bg: '#FB923C' },
                { label: 'Chat : 789', w: '65%', bg: '#FDBA74' },
                { label: 'Operational : 666', w: '55%', bg: '#FED7AA' },
                { label: 'Calls : 454', w: '45%', bg: '#FFEDD5', textColor: '#1E293B' }
              ].map((layer, idx) => (
                <div
                  key={idx}
                  style={{
                    width: layer.w,
                    height: '24px',
                    background: layer.bg,
                    color: layer.textColor || '#FFFFFF',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.6875rem',
                    fontWeight: 700
                  }}
                >
                  {layer.label}
                </div>
              ))}
            </div>

            {/* Leads Values By Stages breakdown */}
            <div style={{ borderTop: '1px solid var(--color-border-subtle)', paddingTop: '0.5rem', width: '100%' }}>
              <span style={{ fontSize: '0.6875rem', color: '#94A3B8', fontWeight: 700 }}>Leads Values By Stages</span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.375rem', marginTop: '0.375rem', fontSize: '0.6875rem' }}>
                <div><span style={{ color: '#EA580C' }}>• Marketing</span>: <strong>₹5,221,45</strong></div>
                <div><span style={{ color: '#F97316' }}>• Sales</span>: <strong>₹30,424</strong></div>
                <div><span style={{ color: '#FB923C' }}>• Email</span>: <strong>₹21,135</strong></div>
                <div><span style={{ color: '#FDBA74' }}>• Chat</span>: <strong>₹15,235</strong></div>
                <div><span style={{ color: '#FED7AA' }}>• Operational</span>: <strong>₹10,557</strong></div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Row 2: Deals by Stage, Deals By Companies, Top Deals */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr 1fr', gap: '1.25rem' }}>
        {/* Deals by Stage */}
        <Card>
          <CardHeader style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border-subtle)' }}>
            <strong style={{ fontSize: '0.9375rem', color: '#1E293B' }}>Deals by Stage</strong>
            <select className="form-control" style={{ width: '110px', fontSize: '0.6875rem', padding: '0.2rem 0.4rem' }}>
              <option>📅 This Week</option>
            </select>
          </CardHeader>
          <CardBody style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1E293B', margin: 0 }}>₹20,245</h3>
              <span style={{ fontSize: '0.6875rem', color: '#10B981', fontWeight: 700 }}>+12% vs last years</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: '120px' }}>
              {[
                { label: 'Inpipeline', h: 70 },
                { label: 'Follow Up', h: 40 },
                { label: 'Schedule', h: 95 },
                { label: 'Conversion', h: 18 }
              ].map((st, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.375rem' }}>
                  <div style={{ width: '26px', height: `${st.h}px`, background: '#FF5B37', borderRadius: '4px' }} />
                  <span style={{ fontSize: '0.6875rem', color: '#64748B', fontWeight: 600 }}>{st.label}</span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Deals By Companies */}
        <Card>
          <CardHeader style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border-subtle)' }}>
            <strong style={{ fontSize: '0.9375rem', color: '#1E293B' }}>Deals By Companies</strong>
            <select className="form-control" style={{ width: '110px', fontSize: '0.6875rem', padding: '0.2rem 0.4rem' }}>
              <option>📅 This Week</option>
            </select>
          </CardHeader>
          <CardBody style={{ padding: '0.875rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { name: 'Pitch', date: 'Closing Deal date 05 April, 2025', val: '₹3655', icon: 'P', iconBg: '#0F172A' },
              { name: 'Initech', date: 'Closing Deal date 05 May, 2025', val: '₹2185', icon: '◆', iconBg: '#6366F1' },
              { name: 'Umbrella Corp', date: 'Closing Deal date 29 April, 2025', val: '₹1583', icon: '▲', iconBg: '#EF4444' },
              { name: 'Capital Partners', date: 'Closing Deal date 23 Mar, 2025', val: '₹6584', icon: 'C', iconBg: '#F97316' },
              { name: 'Massive Dynamic', date: 'Closing Deal date 23 Feb, 2025', val: '₹2153', icon: 'N', iconBg: '#1E293B' }
            ].map((d, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: d.iconBg, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6875rem', fontWeight: 800 }}>
                    {d.icon}
                  </div>
                  <div>
                    <strong style={{ fontSize: '0.8125rem', color: '#1E293B' }}>{d.name}</strong>
                    <div style={{ fontSize: '0.6875rem', color: '#94A3B8' }}>{d.date}</div>
                  </div>
                </div>

                <strong style={{ fontSize: '0.8125rem', color: '#1E293B' }}>{d.val}</strong>
              </div>
            ))}
          </CardBody>
        </Card>

        {/* Top Deals Radar Chart */}
        <Card>
          <CardHeader style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border-subtle)' }}>
            <strong style={{ fontSize: '0.9375rem', color: '#1E293B' }}>Top Deals</strong>
            <select className="form-control" style={{ width: '110px', fontSize: '0.6875rem', padding: '0.2rem 0.4rem' }}>
              <option>📅 This Week</option>
            </select>
          </CardHeader>
          <CardBody style={{ padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
            {/* Multi-axis Polar/Radar Graphic */}
            <div style={{ position: 'relative', width: '130px', height: '130px' }}>
              <svg width="130" height="130" viewBox="0 0 100 100">
                {/* Concentric rings */}
                <circle cx="50" cy="50" r="40" fill="none" stroke="#E2E8F0" strokeWidth="0.8" />
                <circle cx="50" cy="50" r="28" fill="none" stroke="#E2E8F0" strokeWidth="0.8" />
                <circle cx="50" cy="50" r="16" fill="none" stroke="#E2E8F0" strokeWidth="0.8" />

                {/* Axes */}
                <line x1="50" y1="10" x2="50" y2="90" stroke="#E2E8F0" strokeWidth="0.8" />
                <line x1="10" y1="50" x2="90" y2="50" stroke="#E2E8F0" strokeWidth="0.8" />
                <line x1="22" y1="22" x2="78" y2="78" stroke="#E2E8F0" strokeWidth="0.8" />
                <line x1="22" y1="78" x2="78" y2="22" stroke="#E2E8F0" strokeWidth="0.8" />

                {/* Radar polygon shapes */}
                <polygon points="50,22 75,38 68,68 40,72 25,48" fill="#10B981" opacity="0.6" />
                <polygon points="50,15 82,45 60,78 30,60 38,30" fill="#8B5CF6" opacity="0.5" />
                <polygon points="50,30 65,42 55,62 35,55 42,38" fill="#F59E0B" opacity="0.7" />
              </svg>
            </div>

            <div style={{ width: '100%', fontSize: '0.6875rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#8B5CF6' }}>• Marketing</span>
                <strong>₹5,68,877</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#0284C7' }}>• Chat</span>
                <strong>₹1,84,575</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#10B981' }}>• Email</span>
                <strong>₹1,84,575</strong>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Row 3: Deals By Country, Won Deals Stage, Recent Follow Up */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1.2fr', gap: '1.25rem' }}>
        {/* Deals By Country */}
        <Card>
          <CardHeader style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--color-border-subtle)' }}>
            <strong style={{ fontSize: '0.9375rem', color: '#1E293B' }}>Deals By Country</strong>
          </CardHeader>
          <CardBody style={{ padding: '0.875rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { flag: '🇺🇸', name: 'USA', deals: 'Deals : 350', val: '₹1085.00', trendColor: '#10B981' },
              { flag: '🇦🇪', name: 'UAE', deals: 'Deals : 221', val: '₹986.00', trendColor: '#F59E0B' },
              { flag: '🇸🇬', name: 'Singapore', deals: 'Deals : 236', val: '₹959.00', trendColor: '#EF4444' },
              { flag: '🇫🇷', name: 'France', deals: 'Deals : 589', val: '₹879.00', trendColor: '#10B981' },
              { flag: '🇳🇴', name: 'Norway', deals: 'Deals : 221', val: '₹632.00', trendColor: '#EF4444' }
            ].map((c, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1.125rem' }}>{c.flag}</span>
                  <div>
                    <strong style={{ fontSize: '0.8125rem', color: '#1E293B' }}>{c.name}</strong>
                    <div style={{ fontSize: '0.6875rem', color: '#94A3B8' }}>{c.deals}</div>
                  </div>
                </div>

                {/* SVG trend sparkline */}
                <div style={{ width: '40px', height: '16px' }}>
                  <svg width="40" height="16">
                    <polyline fill="none" stroke={c.trendColor} strokeWidth="2" points="0,12 10,6 20,10 30,4 40,8" />
                  </svg>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.625rem', color: '#94A3B8' }}>Total Value</span>
                  <strong style={{ display: 'block', fontSize: '0.8125rem', color: '#1E293B' }}>{c.val}</strong>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>

        {/* Won Deals Stage Overlapping Chart */}
        <Card>
          <CardHeader style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border-subtle)' }}>
            <strong style={{ fontSize: '0.9375rem', color: '#1E293B' }}>Won Deals Stage</strong>
            <select className="form-control" style={{ width: '120px', fontSize: '0.6875rem', padding: '0.2rem 0.4rem' }}>
              <option>Sales Pipeline</option>
            </select>
          </CardHeader>
          <CardBody style={{ padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '0.6875rem', color: '#64748B' }}>Stages Won This Year</span>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem' }}>
                <strong style={{ fontSize: '1.125rem', color: '#1E293B' }}>₹45,899,79</strong>
                <span style={{ fontSize: '0.6875rem', color: '#EF4444', fontWeight: 700 }}>↓ 12%</span>
              </div>
            </div>

            {/* Overlapping Circles Chart */}
            <div style={{ position: 'relative', width: '130px', height: '110px' }}>
              {/* Conversion Circle */}
              <div style={{ position: 'absolute', left: 0, top: '20px', width: '65px', height: '65px', borderRadius: '50%', background: '#0F766E', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontSize: '0.5625rem', fontWeight: 700, zIndex: 1 }}>
                <span>Conversion</span>
                <span>48%</span>
              </div>

              {/* Calls Circle */}
              <div style={{ position: 'absolute', right: '35px', top: '0', width: '45px', height: '45px', borderRadius: '50%', background: '#EF4444', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontSize: '0.5625rem', fontWeight: 700, zIndex: 2 }}>
                <span>Calls</span>
                <span>24%</span>
              </div>

              {/* Email Circle */}
              <div style={{ position: 'absolute', right: 0, top: '30px', width: '55px', height: '55px', borderRadius: '50%', background: '#F59E0B', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontSize: '0.5625rem', fontWeight: 700, zIndex: 3 }}>
                <span>Email</span>
                <span>38%</span>
              </div>

              {/* Chats Circle */}
              <div style={{ position: 'absolute', left: '40px', bottom: 0, width: '45px', height: '45px', borderRadius: '50%', background: '#10B981', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontSize: '0.5625rem', fontWeight: 700, zIndex: 4 }}>
                <span>Chats</span>
                <span>20%</span>
              </div>
            </div>
          </CardBody>
        </Card>

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
              { name: 'Connie Waters', action: 'Next Step : Chat in 2 days', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80', icon: <MessageSquare size={12} /> },
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
                <button className="btn-icon-only btn-ghost" style={{ padding: '0.2rem', color: '#94A3B8' }} onClick={() => showToast(`Dispatched follow up to ${f.name}`, 'info')}>
                  {f.icon}
                </button>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>

      {/* Row 4: Recent Deals Table & Recent Activities */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.25rem' }}>
        {/* Recent Deals Table */}
        <Card>
          <CardHeader style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border-subtle)' }}>
            <strong style={{ fontSize: '0.9375rem', color: '#1E293B' }}>Recent Deals</strong>
            <span style={{ fontSize: '0.6875rem', color: '#94A3B8', fontWeight: 700, cursor: 'pointer' }} onClick={() => { setActiveModule('CRM'); setCrmTab('deals'); }}>View All</span>
          </CardHeader>
          <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
            <table className="table" style={{ fontSize: '0.75rem' }}>
              <thead>
                <tr>
                  <th>Deal Name</th>
                  <th>Stage</th>
                  <th>Deal Value</th>
                  <th>Owner</th>
                  <th>Closed Date ▾</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { deal: 'Collins', stage: 'Quality To Buy', val: '₹4,50,000', owner: 'Anthony Lewis', ownerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', date: '14/01/2024' },
                  { deal: 'Konopelski', stage: 'Proposal Made', val: '₹3,15,000', owner: 'Brian Villalobos', ownerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', date: '21/01/2024' },
                  { deal: 'Adams', stage: 'Contact Made', val: '₹8,40,000', owner: 'Harvey Smith', ownerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', date: '20/02/2024' },
                  { deal: 'Schumm', stage: 'Quality To Buy', val: '₹6,10,000', owner: 'Stephan Peralt', ownerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80', date: '15/03/2024' },
                  { deal: 'Wisozk', stage: 'Presentation', val: '₹4,70,000', owner: 'Doglas Martini', ownerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', date: '12/04/2024' }
                ].map((row, idx) => (
                  <tr key={idx}>
                    <td><strong>{row.deal}</strong></td>
                    <td><span style={{ color: '#64748B', fontWeight: 600 }}>{row.stage}</span></td>
                    <td><strong style={{ color: '#1E293B' }}>{row.val}</strong></td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                        <Avatar src={row.ownerAvatar} name={row.owner} size="xs" />
                        <span>{row.owner}</span>
                      </div>
                    </td>
                    <td>{row.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
      </div>
    </div>
  );
};
