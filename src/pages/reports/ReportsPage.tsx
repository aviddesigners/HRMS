import React, { useState } from 'react';
import {
  BarChart3,
  Calendar,
  Download,
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  TrendingUp,
  FileText,
  DollarSign,
  ChevronDown,
  Search,
  Filter,
  CheckSquare,
  UserCheck,
  AlertCircle
} from 'lucide-react';
import { useHRMS, ReportTabType } from '../../context/HRMSContext';
import { useToast } from '../../context/ToastContext';
import { Card, CardHeader, CardBody } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Avatar } from '../../components/common/Avatar';

export const ReportsPage: React.FC = () => {
  const { reportTab, setReportTab } = useHRMS();
  const { showToast } = useToast();

  const activeTab: ReportTabType = reportTab || 'daily';
  const [searchTerm, setSearchTerm] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);

  /* ------------------------------------------------------------- */
  /* DATASETS                                                      */
  /* ------------------------------------------------------------- */
  const commonEmployees = [
    { name: 'Anthony Lewis', role: 'Finance', dept: 'Finance', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', status: 'Present', checkIn: '09:00 AM', checkOut: '06:45 PM', breakT: '30 Min', late: '32 Min', overtime: '20 Min', hours: '8.55 Hrs', isHoursPositive: true, email: 'anthony@example.com', phone: '(123) 4567 890', joinDate: '12/09/2024', isActive: true, empId: 'Emp-001' },
    { name: 'Brian Villalobos', role: 'Developer', dept: 'Application Development', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', status: 'Present', checkIn: '09:00 AM', checkOut: '06:12 PM', breakT: '20 Min', late: '-', overtime: '45 Min', hours: '7.54 Hrs', isHoursPositive: false, email: 'brian@example.com', phone: '(179) 7382 829', joinDate: '24/10/2024', isActive: true, empId: 'Emp-002' },
    { name: 'Harvey Smith', role: 'Developer', dept: 'IT Management', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', status: 'Present', checkIn: '09:00 AM', checkOut: '06:13 PM', breakT: '50 Min', late: '-', overtime: '33 Min', hours: '8.45 Hrs', isHoursPositive: true, email: 'harvey@example.com', phone: '(184) 2719 738', joinDate: '18/02/2024', isActive: true, empId: 'Emp-003' },
    { name: 'Stephan Peralt', role: 'Executive Officer', dept: 'Web Development', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80', status: 'Present', checkIn: '09:00 AM', checkOut: '06:23 PM', breakT: '41 Min', late: '-', overtime: '50 Min', hours: '8.35 Hrs', isHoursPositive: true, email: 'peral@example.com', phone: '(193) 7839 748', joinDate: '17/10/2024', isActive: true, empId: 'Emp-004' },
    { name: 'Doglas Martini', role: 'Manager', dept: 'Sales', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80', status: 'Present', checkIn: '09:00 AM', checkOut: '06:43 PM', breakT: '23 Min', late: '-', overtime: '10 Min', hours: '8.22 Hrs', isHoursPositive: true, email: 'martniwr@example.com', phone: '(183) 9302 890', joinDate: '20/07/2024', isActive: true, empId: 'Emp-005' },
    { name: 'Linda Ray', role: 'Finance', dept: 'UI / UX', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', status: 'Present', checkIn: '09:00 AM', checkOut: '07:15 PM', breakT: '03 Min', late: '-', overtime: '-', hours: '8.32 Hrs', isHoursPositive: true, email: 'ray456@example.com', phone: '(120) 3728 039', joinDate: '10/04/2024', isActive: true, empId: 'Emp-006' },
    { name: 'Elliot Murray', role: 'Developer', dept: 'Account Management', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80', status: 'Present', checkIn: '09:00 AM', checkOut: '07:13 PM', breakT: '32 Min', late: '-', overtime: '-', hours: '9.15 Hrs', isHoursPositive: true, email: 'murray@example.com', phone: '(102) 8480 832', joinDate: '29/08/2024', isActive: true, empId: 'Emp-007' },
    { name: 'Rebecca Smtih', role: 'Executive', dept: 'Marketing', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80', status: 'Present', checkIn: '09:00 AM', checkOut: '09:17 PM', breakT: '14 Min', late: '12 Min', overtime: '-', hours: '9.25 Hrs', isHoursPositive: true, email: 'smtih@example.com', phone: '(162) 8920 713', joinDate: '22/02/2024', isActive: false, empId: 'Emp-008' },
    { name: 'Connie Waters', role: 'Developer', dept: 'Administration', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80', status: 'Present', checkIn: '09:00 AM', checkOut: '08:15 PM', breakT: '12 Min', late: '-', overtime: '-', hours: '8.35Hrs', isHoursPositive: true, email: 'connie@example.com', phone: '(189) 0920 723', joinDate: '03/11/2024', isActive: true, empId: 'Emp-009' },
    { name: 'Lori Broaddus', role: 'Finance', dept: 'Business Development', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', status: 'Absent', checkIn: '09:00 AM', checkOut: '09:23 PM', breakT: '10 Min', late: '-', overtime: '-', hours: '8.22 Hrs', isHoursPositive: true, email: 'broaddus@example.com', phone: '(168) 8392 823', joinDate: '17/12/2024', isActive: true, empId: 'Emp-010' }
  ];

  const leaveInvoicesList = [
    { invId: 'Inv-001', clientName: 'Michael Walker', role: 'CEO', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', company: 'BrightWave Innovations', created: '14/01/2024', due: '15/01/2024', amount: '$3000', status: 'Paid', statusColor: '#10B981' },
    { invId: 'Inv-002', clientName: 'Sophie Headrick', role: 'Manager', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80', company: 'Stellar Dynamics', created: '21/01/2024', due: '25/01/2024', amount: '$2500', status: 'Sent', statusColor: '#EC4899' },
    { invId: 'Inv-003', clientName: 'Cameron Drake', role: 'Director', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', company: 'Quantum Nexus', created: '20/02/2024', due: '22/02/2024', amount: '$2800', status: 'Partially Paid', statusColor: '#F59E0B' },
    { invId: 'Inv-004', clientName: 'Doris Crowley', role: 'Consultant', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', company: 'EcoVision Enterprises', created: '15/03/2024', due: '17/03/2024', amount: '$3300', status: 'Sent', statusColor: '#EC4899' },
    { invId: 'Inv-005', clientName: 'Thomas Bordelon', role: 'Manager', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80', company: 'Aurora Technologies', created: '12/04/2024', due: '16/04/2024', amount: '$3600', status: 'Paid', statusColor: '#10B981' },
    { invId: 'Inv-006', clientName: 'Kathleen Gutierrez', role: 'Director', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80', company: 'BlueSky Ventures', created: '20/05/2024', due: '21/05/2024', amount: '$2000', status: 'Partially Paid', statusColor: '#F59E0B' },
    { invId: 'Inv-007', clientName: 'Bruce Wright', role: 'CEO', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80', company: 'TerraFusion Energy', created: '06/07/2024', due: '06/07/2024', amount: '$3400', status: 'Sent', statusColor: '#EC4899' },
    { invId: 'Inv-008', clientName: 'Estelle Morgan', role: 'Manager', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', company: 'UrbanPulse Design', created: '02/09/2024', due: '04/09/2024', amount: '$4000', status: 'Paid', statusColor: '#10B981' },
    { invId: 'Inv-009', clientName: 'Stephen Dias', role: 'CEO', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', company: 'Nimbus Networks', created: '15/11/2024', due: '15/11/2024', amount: '$4500', status: 'Partially Paid', statusColor: '#F59E0B' },
    { invId: 'Inv-010', clientName: 'Angela Thomas', role: 'Consultant', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80', company: 'Epicurean Delights', created: '10/12/2024', due: '11/12/2024', amount: '$3800', status: 'Paid', statusColor: '#10B981' }
  ];

  /* ------------------------------------------------------------- */
  /* TOP NAVIGATION PILLS                                          */
  /* ------------------------------------------------------------- */
  const renderNavPills = () => (
    <div style={{ display: 'flex', gap: '0.375rem', background: '#F1F5F9', padding: '0.25rem', borderRadius: 'var(--radius-lg)', flexWrap: 'wrap' }}>
      <button
        onClick={() => setReportTab('daily')}
        className={`btn btn-sm ${activeTab === 'daily' ? 'btn-primary' : 'btn-ghost'}`}
        style={{ fontSize: '0.75rem', borderRadius: 'var(--radius-md)' }}
      >
        <Calendar size={14} /> Daily Report
      </button>
      <button
        onClick={() => setReportTab('payslip')}
        className={`btn btn-sm ${activeTab === 'payslip' ? 'btn-primary' : 'btn-ghost'}`}
        style={{ fontSize: '0.75rem', borderRadius: 'var(--radius-md)' }}
      >
        <DollarSign size={14} /> Payslip Report
      </button>
      <button
        onClick={() => setReportTab('leave')}
        className={`btn btn-sm ${activeTab === 'leave' ? 'btn-primary' : 'btn-ghost'}`}
        style={{ fontSize: '0.75rem', borderRadius: 'var(--radius-md)' }}
      >
        <FileText size={14} /> Leave Report
      </button>
      <button
        onClick={() => setReportTab('attendance')}
        className={`btn btn-sm ${activeTab === 'attendance' ? 'btn-primary' : 'btn-ghost'}`}
        style={{ fontSize: '0.75rem', borderRadius: 'var(--radius-md)' }}
      >
        <Clock size={14} /> Attendance Report
      </button>
      <button
        onClick={() => setReportTab('employee')}
        className={`btn btn-sm ${activeTab === 'employee' ? 'btn-primary' : 'btn-ghost'}`}
        style={{ fontSize: '0.75rem', borderRadius: 'var(--radius-md)' }}
      >
        <Users size={14} /> Employee Report
      </button>
    </div>
  );

  /* ------------------------------------------------------------- */
  /* VIEW 1: DAILY REPORT (Screenshot 1)                           */
  /* ------------------------------------------------------------- */
  if (activeTab === 'daily') {
    return (
      <div className="page-container" style={{ gap: '1.25rem' }}>
        {/* Top Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#1E293B' }}>Daily Report</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', color: '#94A3B8' }}>
              <span>⌂</span>
              <span>/</span>
              <span>HR</span>
              <span>/</span>
              <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Daily Report</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            {renderNavPills()}

            <button className="btn btn-secondary btn-sm" onClick={() => showToast('Exporting daily reports PDF...', 'info')}>
              <Download size={14} /> Export <ChevronDown size={12} />
            </button>
          </div>
        </div>

        {/* 4 Mini KPI Cards (Left) + Daily Attendance Area Chart (Right) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
          {/* 4 KPI Cards in 2x2 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <Card style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Total Present</span>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1E293B', marginTop: '0.25rem' }}>300</div>
              </div>
              <div style={{ width: 44, height: 44, borderRadius: '50%', border: '1px solid #FF5B37', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF5B37' }}>
                <Users size={20} />
              </div>
            </Card>

            <Card style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Completed Tasks</span>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1E293B', marginTop: '0.25rem' }}>100</div>
              </div>
              <div style={{ width: 44, height: 44, borderRadius: '50%', border: '1px solid #10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981' }}>
                <CheckCircle2 size={20} />
              </div>
            </Card>

            <Card style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Total Absent</span>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1E293B', marginTop: '0.25rem' }}>15</div>
              </div>
              <div style={{ width: 44, height: 44, borderRadius: '50%', border: '1px solid #EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EF4444' }}>
                <XCircle size={20} />
              </div>
            </Card>

            <Card style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Pending Tasks</span>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1E293B', marginTop: '0.25rem' }}>125</div>
              </div>
              <div style={{ width: 44, height: 44, borderRadius: '50%', border: '1px solid #06B6D4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#06B6D4' }}>
                <Clock size={20} />
              </div>
            </Card>
          </div>

          {/* Daily Attendance Chart */}
          <Card>
            <CardBody style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <TrendingUp size={16} style={{ color: '#F59E0B' }} />
                  <strong style={{ fontSize: '0.875rem', color: '#1E293B' }}>Daily Attendance</strong>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.75rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <span style={{ width: 8, height: 8, borderRadius: '2px', background: '#10B981' }} /> Present
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <span style={{ width: 8, height: 8, borderRadius: '2px', background: '#EF4444' }} /> Absent
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#64748B', border: '1px solid var(--color-border)', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                    <Calendar size={12} /> dd/mm/yyyy
                  </span>
                </div>
              </div>

              {/* Chart Graphic */}
              <div style={{ height: '140px', width: '100%', position: 'relative' }}>
                <svg viewBox="0 0 500 120" style={{ width: '100%', height: '100%' }}>
                  <line x1="0" y1="20" x2="500" y2="20" stroke="#F1F5F9" strokeDasharray="3 3" />
                  <line x1="0" y1="50" x2="500" y2="50" stroke="#F1F5F9" strokeDasharray="3 3" />
                  <line x1="0" y1="80" x2="500" y2="80" stroke="#F1F5F9" strokeDasharray="3 3" />
                  <line x1="0" y1="110" x2="500" y2="110" stroke="#F1F5F9" strokeDasharray="3 3" />

                  {/* Red Absent Curve */}
                  <path
                    d="M 10 90 Q 60 20 120 40 T 230 75 T 340 100 T 450 15 T 490 30"
                    fill="none"
                    stroke="#EF4444"
                    strokeWidth="2.5"
                  />

                  {/* Green Present Curve */}
                  <path
                    d="M 10 95 Q 60 80 120 70 T 230 40 T 340 50 T 450 90 T 490 70"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="2.5"
                  />
                </svg>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Daily Attendance List Table */}
        <Card>
          <div style={{ padding: '0.875rem 1.25rem', borderBottom: '1px solid var(--color-border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1E293B' }}>Daily Attendance List</h3>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <input type="text" className="form-control" defaultValue="dd/mm/yyyy" style={{ width: '130px', fontSize: '0.75rem' }} />
              <select className="form-control" style={{ width: '130px', fontSize: '0.75rem' }}>
                <option>Select Status</option>
                <option>Present</option>
                <option>Absent</option>
              </select>
              <select className="form-control" style={{ width: '160px', fontSize: '0.75rem' }}>
                <option>Sort By : Last 7 Days</option>
              </select>
            </div>
          </div>

          <div style={{ padding: '0.75rem 1.25rem', borderBottom: '1px solid var(--color-border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#64748B' }}>
              <span>Row Per Page</span>
              <select className="form-control" style={{ width: '60px', padding: '0.2rem 0.4rem', fontSize: '0.75rem' }} value={rowsPerPage} onChange={(e) => setRowsPerPage(Number(e.target.value))}>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
              <span>Entries</span>
            </div>

            <div style={{ position: 'relative', width: '220px' }}>
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ paddingLeft: '2rem', fontSize: '0.75rem' }}
              />
              <Search size={13} style={{ position: 'absolute', left: '0.625rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
            </div>
          </div>

          <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
            <table className="table" style={{ fontSize: '0.8125rem' }}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Department</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {commonEmployees.map((emp, i) => (
                  <tr key={i}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                        <Avatar src={emp.avatar} name={emp.name} size="sm" />
                        <div>
                          <strong style={{ color: '#1E293B' }}>{emp.name}</strong>
                          <div style={{ fontSize: '0.6875rem', color: '#64748B' }}>{emp.role}</div>
                        </div>
                      </div>
                    </td>
                    <td>14/01/2024</td>
                    <td>{emp.dept}</td>
                    <td>
                      <span style={{
                        background: emp.status === 'Present' ? '#ECFDF5' : '#FEF2F2',
                        color: emp.status === 'Present' ? '#10B981' : '#EF4444',
                        padding: '0.15rem 0.5rem',
                        borderRadius: 'var(--radius-pill)',
                        fontWeight: 700,
                        fontSize: '0.6875rem'
                      }}>
                        • {emp.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div style={{ padding: '0.875rem 1.25rem', borderTop: '1px solid var(--color-border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748B' }}>
            <span>Showing 1 to 10 of 16 entries</span>
            <div style={{ display: 'flex', gap: '0.25rem' }}>
              <button className="btn btn-secondary btn-sm" style={{ padding: '0.2rem 0.5rem' }}>&lt;</button>
              <button className="btn btn-secondary btn-sm" style={{ padding: '0.2rem 0.5rem' }}>1</button>
              <button className="btn btn-secondary btn-sm" style={{ padding: '0.2rem 0.5rem' }}>2</button>
              <button className="btn btn-secondary btn-sm" style={{ padding: '0.2rem 0.5rem' }}>3</button>
              <button className="btn btn-sm" style={{ background: '#FF5B37', color: '#FFFFFF', padding: '0.2rem 0.5rem', fontWeight: 700 }}>4</button>
              <span style={{ padding: '0.2rem 0.3rem' }}>...</span>
              <button className="btn btn-secondary btn-sm" style={{ padding: '0.2rem 0.5rem' }}>15</button>
              <button className="btn btn-secondary btn-sm" style={{ padding: '0.2rem 0.5rem' }}>&gt;</button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  /* ------------------------------------------------------------- */
  /* VIEW 2: PAYSLIP REPORT (Screenshot 2)                         */
  /* ------------------------------------------------------------- */
  if (activeTab === 'payslip') {
    return (
      <div className="page-container" style={{ gap: '1.25rem' }}>
        {/* Top Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#1E293B' }}>Payslip Report</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', color: '#94A3B8' }}>
              <span>⌂</span>
              <span>/</span>
              <span>HR</span>
              <span>/</span>
              <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Payslip Report</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            {renderNavPills()}

            <button className="btn btn-secondary btn-sm" onClick={() => showToast('Exporting payslip ledger...', 'info')}>
              <Download size={14} /> Export <ChevronDown size={12} />
            </button>
          </div>
        </div>

        {/* 4 Cards + Payroll Stepped Line Chart */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <Card style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Total Payroll</span>
                  <div style={{ fontSize: '1.375rem', fontWeight: 800, color: '#1E293B', marginTop: '0.25rem' }}>$250,000</div>
                </div>
                <div style={{ width: 38, height: 38, borderRadius: '8px', border: '1px solid #FF5B37', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF5B37' }}>
                  <FileText size={18} />
                </div>
              </div>
              <div style={{ fontSize: '0.6875rem', color: '#10B981', fontWeight: 700, marginTop: '0.5rem' }}>
                ~ +10.13% <span style={{ color: '#94A3B8', fontWeight: 400 }}>from last week</span>
              </div>
            </Card>

            <Card style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Deductions</span>
                  <div style={{ fontSize: '1.375rem', fontWeight: 800, color: '#1E293B', marginTop: '0.25rem' }}>$50,000</div>
                </div>
                <div style={{ width: 38, height: 38, borderRadius: '8px', border: '1px solid #EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EF4444' }}>
                  <FileText size={18} />
                </div>
              </div>
              <div style={{ fontSize: '0.6875rem', color: '#10B981', fontWeight: 700, marginTop: '0.5rem' }}>
                ~ +17.02% <span style={{ color: '#94A3B8', fontWeight: 400 }}>from last week</span>
              </div>
            </Card>

            <Card style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Net Pay</span>
                  <div style={{ fontSize: '1.375rem', fontWeight: 800, color: '#1E293B', marginTop: '0.25rem' }}>$200,000</div>
                </div>
                <div style={{ width: 38, height: 38, borderRadius: '8px', border: '1px solid #10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981' }}>
                  <FileText size={18} />
                </div>
              </div>
              <div style={{ fontSize: '0.6875rem', color: '#10B981', fontWeight: 700, marginTop: '0.5rem' }}>
                ~ +10.13% <span style={{ color: '#94A3B8', fontWeight: 400 }}>from last week</span>
              </div>
            </Card>

            <Card style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Allowances</span>
                  <div style={{ fontSize: '1.375rem', fontWeight: 800, color: '#1E293B', marginTop: '0.25rem' }}>$30,000</div>
                </div>
                <div style={{ width: 38, height: 38, borderRadius: '8px', border: '1px solid #06B6D4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#06B6D4' }}>
                  <FileText size={18} />
                </div>
              </div>
              <div style={{ fontSize: '0.6875rem', color: '#10B981', fontWeight: 700, marginTop: '0.5rem' }}>
                ~ +10.17% <span style={{ color: '#94A3B8', fontWeight: 400 }}>from last week</span>
              </div>
            </Card>
          </div>

          {/* Payroll Stepped Line Chart */}
          <Card>
            <CardBody style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <TrendingUp size={16} style={{ color: '#FF5B37' }} />
                  <strong style={{ fontSize: '0.875rem', color: '#1E293B' }}>Payroll</strong>
                </div>
                <select className="form-control" style={{ width: '110px', fontSize: '0.75rem' }}>
                  <option>This Year ▾</option>
                </select>
              </div>

              <div style={{ height: '140px', width: '100%', position: 'relative' }}>
                <svg viewBox="0 0 500 120" style={{ width: '100%', height: '100%' }}>
                  <line x1="0" y1="20" x2="500" y2="20" stroke="#F1F5F9" strokeDasharray="3 3" />
                  <line x1="0" y1="50" x2="500" y2="50" stroke="#F1F5F9" strokeDasharray="3 3" />
                  <line x1="0" y1="80" x2="500" y2="80" stroke="#F1F5F9" strokeDasharray="3 3" />
                  <line x1="0" y1="110" x2="500" y2="110" stroke="#F1F5F9" strokeDasharray="3 3" />

                  {/* Stepped line */}
                  <path
                    d="M 10 95 L 60 95 L 60 70 L 120 70 L 120 50 L 180 50 L 180 65 L 240 65 L 240 95 L 300 95 L 300 40 L 360 40 L 360 65 L 420 65 L 420 95 L 490 95"
                    fill="none"
                    stroke="#FF5B37"
                    strokeWidth="2.5"
                  />
                  <circle cx="490" cy="95" r="4" fill="#FF5B37" />
                </svg>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Payslip List Table */}
        <Card>
          <div style={{ padding: '0.875rem 1.25rem', borderBottom: '1px solid var(--color-border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1E293B' }}>Payslip List</h3>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <input type="text" className="form-control" defaultValue="dd/mm/yyyy - dd/mm/yyyy" style={{ width: '180px', fontSize: '0.75rem' }} />
              <select className="form-control" style={{ width: '110px', fontSize: '0.75rem' }}>
                <option>$0.00 - $0.00</option>
              </select>
              <select className="form-control" style={{ width: '130px', fontSize: '0.75rem' }}>
                <option>Select Status</option>
              </select>
              <select className="form-control" style={{ width: '160px', fontSize: '0.75rem' }}>
                <option>Sort By : Last 7 Days</option>
              </select>
            </div>
          </div>

          <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
            <table className="table" style={{ fontSize: '0.8125rem' }}>
              <thead>
                <tr>
                  <th style={{ width: '40px' }}><input type="checkbox" /></th>
                  <th>Name</th>
                  <th>Paid Amount</th>
                  <th>Paid Month</th>
                  <th>Paid Year</th>
                </tr>
              </thead>
              <tbody>
                {commonEmployees.map((emp, i) => (
                  <tr key={i}>
                    <td><input type="checkbox" /></td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                        <Avatar src={emp.avatar} name={emp.name} size="sm" />
                        <div>
                          <strong style={{ color: '#1E293B' }}>{emp.name}</strong>
                          <div style={{ fontSize: '0.6875rem', color: '#64748B' }}>{emp.role}</div>
                        </div>
                      </div>
                    </td>
                    <td><strong style={{ color: '#1E293B' }}>$3000</strong></td>
                    <td>$3000</td>
                    <td>$3000</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    );
  }

  /* ------------------------------------------------------------- */
  /* VIEW 3: LEAVE REPORT (Screenshot 3)                           */
  /* ------------------------------------------------------------- */
  if (activeTab === 'leave') {
    return (
      <div className="page-container" style={{ gap: '1.25rem' }}>
        {/* Top Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#1E293B' }}>Leave Report</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', color: '#94A3B8' }}>
              <span>⌂</span>
              <span>/</span>
              <span>HR</span>
              <span>/</span>
              <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Leave Report</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            {renderNavPills()}

            <button className="btn btn-secondary btn-sm" onClick={() => showToast('Exporting leave reports...', 'info')}>
              <Download size={14} /> Export <ChevronDown size={12} />
            </button>
          </div>
        </div>

        {/* 4 Cards + Stacked Bar Chart */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <Card style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Total Leaves</span>
                  <div style={{ fontSize: '1.375rem', fontWeight: 800, color: '#1E293B', marginTop: '0.25rem' }}>15</div>
                </div>
                <div style={{ width: 38, height: 38, borderRadius: '8px', border: '1px solid #FF5B37', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF5B37' }}>
                  <Calendar size={18} />
                </div>
              </div>
              <div style={{ fontSize: '0.6875rem', color: '#10B981', fontWeight: 700, marginTop: '0.5rem' }}>
                Last Month <span style={{ marginLeft: '0.5rem' }}>~ +17.02%</span>
              </div>
            </Card>

            <Card style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Approved Leaves</span>
                  <div style={{ fontSize: '1.375rem', fontWeight: 800, color: '#1E293B', marginTop: '0.25rem' }}>15</div>
                </div>
                <div style={{ width: 38, height: 38, borderRadius: '8px', border: '1px solid #10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981' }}>
                  <CheckCircle2 size={18} />
                </div>
              </div>
              <div style={{ fontSize: '0.6875rem', color: '#10B981', fontWeight: 700, marginTop: '0.5rem' }}>
                Last Month <span style={{ marginLeft: '0.5rem' }}>~ +17.02%</span>
              </div>
            </Card>

            <Card style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Pending Requests</span>
                  <div style={{ fontSize: '1.375rem', fontWeight: 800, color: '#1E293B', marginTop: '0.25rem' }}>5</div>
                </div>
                <div style={{ width: 38, height: 38, borderRadius: '8px', border: '1px solid #06B6D4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#06B6D4' }}>
                  <Clock size={18} />
                </div>
              </div>
              <div style={{ fontSize: '0.6875rem', color: '#10B981', fontWeight: 700, marginTop: '0.5rem' }}>
                Last Month <span style={{ marginLeft: '0.5rem' }}>~ +17.02%</span>
              </div>
            </Card>

            <Card style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Rejected Leaves</span>
                  <div style={{ fontSize: '1.375rem', fontWeight: 800, color: '#1E293B', marginTop: '0.25rem' }}>5</div>
                </div>
                <div style={{ width: 38, height: 38, borderRadius: '8px', border: '1px solid #EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EF4444' }}>
                  <XCircle size={18} />
                </div>
              </div>
              <div style={{ fontSize: '0.6875rem', color: '#10B981', fontWeight: 700, marginTop: '0.5rem' }}>
                Last Month <span style={{ marginLeft: '0.5rem' }}>~ +17.02%</span>
              </div>
            </Card>
          </div>

          {/* Leaves Stacked Bar Chart */}
          <Card>
            <CardBody style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Calendar size={16} style={{ color: '#FF5B37' }} />
                  <strong style={{ fontSize: '0.875rem', color: '#1E293B' }}>Leaves</strong>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.6875rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}><span style={{ width: 8, height: 8, background: '#10B981' }} /> Annual</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}><span style={{ width: 8, height: 8, background: '#F59E0B' }} /> Casual</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}><span style={{ width: 8, height: 8, background: '#0F172A' }} /> Medical</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}><span style={{ width: 8, height: 8, background: '#EA580C' }} /> Others</span>
                </div>
              </div>

              {/* Stacked Bars */}
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '140px', paddingTop: '1rem' }}>
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m) => (
                  <div key={m} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
                    <div style={{ width: 14, display: 'flex', flexDirection: 'column-reverse', gap: '2px' }}>
                      <div style={{ width: '100%', height: '22px', background: '#10B981', borderRadius: '1px' }} />
                      <div style={{ width: '100%', height: '20px', background: '#F59E0B', borderRadius: '1px' }} />
                      <div style={{ width: '100%', height: '25px', background: '#0F172A', borderRadius: '1px' }} />
                      <div style={{ width: '100%', height: '14px', background: '#EA580C', borderRadius: '1px' }} />
                    </div>
                    <span style={{ fontSize: '0.625rem', color: '#94A3B8' }}>{m}</span>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Invoice List Table */}
        <Card>
          <div style={{ padding: '0.875rem 1.25rem', borderBottom: '1px solid var(--color-border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1E293B' }}>Invoice List</h3>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <input type="text" className="form-control" defaultValue="dd/mm/yyyy - dd/mm/yyyy" style={{ width: '180px', fontSize: '0.75rem' }} />
              <select className="form-control" style={{ width: '110px', fontSize: '0.75rem' }}>
                <option>$0.00 - $0.00</option>
              </select>
              <select className="form-control" style={{ width: '130px', fontSize: '0.75rem' }}>
                <option>Select Status</option>
              </select>
              <select className="form-control" style={{ width: '160px', fontSize: '0.75rem' }}>
                <option>Sort By : Last 7 Days</option>
              </select>
            </div>
          </div>

          <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
            <table className="table" style={{ fontSize: '0.8125rem' }}>
              <thead>
                <tr>
                  <th style={{ width: '40px' }}><input type="checkbox" /></th>
                  <th>Invoice ID ▾</th>
                  <th>Client Name</th>
                  <th>Company Name</th>
                  <th>Created Date ▾</th>
                  <th>Due Date ▾</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {leaveInvoicesList.map((inv) => (
                  <tr key={inv.invId}>
                    <td><input type="checkbox" /></td>
                    <td><span style={{ color: '#0284C7', fontWeight: 700 }}>{inv.invId}</span></td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                        <Avatar src={inv.avatar} name={inv.clientName} size="sm" />
                        <div>
                          <strong style={{ color: '#1E293B' }}>{inv.clientName}</strong>
                          <div style={{ fontSize: '0.6875rem', color: '#64748B' }}>{inv.role}</div>
                        </div>
                      </div>
                    </td>
                    <td>{inv.company}</td>
                    <td>{inv.created}</td>
                    <td>{inv.due}</td>
                    <td><strong style={{ color: '#1E293B' }}>{inv.amount}</strong></td>
                    <td>
                      <span style={{
                        background: `${inv.statusColor}15`,
                        color: inv.statusColor,
                        padding: '0.15rem 0.5rem',
                        borderRadius: 'var(--radius-pill)',
                        fontWeight: 700,
                        fontSize: '0.6875rem'
                      }}>
                        {inv.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    );
  }

  /* ------------------------------------------------------------- */
  /* VIEW 4: ATTENDANCE REPORT (Screenshot 4)                      */
  /* ------------------------------------------------------------- */
  if (activeTab === 'attendance') {
    return (
      <div className="page-container" style={{ gap: '1.25rem' }}>
        {/* Top Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#1E293B' }}>Attendance Report</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', color: '#94A3B8' }}>
              <span>⌂</span>
              <span>/</span>
              <span>HR</span>
              <span>/</span>
              <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Attendance Report</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            {renderNavPills()}

            <button className="btn btn-secondary btn-sm" onClick={() => showToast('Exporting attendance analytics...', 'info')}>
              <Download size={14} /> Export <ChevronDown size={12} />
            </button>
          </div>
        </div>

        {/* 4 Cards with Progress Bars + Attendance Chart */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <Card style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <div style={{ width: 34, height: 34, borderRadius: '6px', border: '1px solid #FF5B37', color: '#FF5B37', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Calendar size={16} />
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Total Working Days</span>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1E293B' }}>25</div>
                </div>
              </div>
              <div style={{ width: '100%', height: '4px', background: '#F1F5F9', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ width: '75%', height: '100%', background: '#10B981' }} />
              </div>
              <div style={{ fontSize: '0.6875rem', color: '#10B981', fontWeight: 700 }}>
                ~ +20.01% <span style={{ color: '#94A3B8', fontWeight: 400 }}>from last month</span>
              </div>
            </Card>

            <Card style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <div style={{ width: 34, height: 34, borderRadius: '6px', border: '1px solid #0284C7', color: '#0284C7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Calendar size={16} />
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Total Leave Taken</span>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1E293B' }}>12</div>
                </div>
              </div>
              <div style={{ width: '100%', height: '4px', background: '#F1F5F9', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ width: '50%', height: '100%', background: '#10B981' }} />
              </div>
              <div style={{ fontSize: '0.6875rem', color: '#10B981', fontWeight: 700 }}>
                ~ +20.01% <span style={{ color: '#94A3B8', fontWeight: 400 }}>from last month</span>
              </div>
            </Card>

            <Card style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <div style={{ width: 34, height: 34, borderRadius: '6px', border: '1px solid #EC4899', color: '#EC4899', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Calendar size={16} />
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Total Holidays</span>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1E293B' }}>6</div>
                </div>
              </div>
              <div style={{ width: '100%', height: '4px', background: '#F1F5F9', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ width: '60%', height: '100%', background: '#10B981' }} />
              </div>
              <div style={{ fontSize: '0.6875rem', color: '#10B981', fontWeight: 700 }}>
                ~ +20.01% <span style={{ color: '#94A3B8', fontWeight: 400 }}>from last month</span>
              </div>
            </Card>

            <Card style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <div style={{ width: 34, height: 34, borderRadius: '6px', border: '1px solid #F59E0B', color: '#F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Calendar size={16} />
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Total Halfdays</span>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1E293B' }}>5</div>
                </div>
              </div>
              <div style={{ width: '100%', height: '4px', background: '#F1F5F9', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ width: '45%', height: '100%', background: '#10B981' }} />
              </div>
              <div style={{ fontSize: '0.6875rem', color: '#10B981', fontWeight: 700 }}>
                ~ +20.01% <span style={{ color: '#94A3B8', fontWeight: 400 }}>from last month</span>
              </div>
            </Card>
          </div>

          {/* Smooth Double Wavy Curve Chart */}
          <Card>
            <CardBody style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <TrendingUp size={16} style={{ color: '#FF5B37' }} />
                  <strong style={{ fontSize: '0.875rem', color: '#1E293B' }}>Attendance</strong>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.75rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><span style={{ width: 8, height: 8, background: '#10B981' }} /> Present</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><span style={{ width: 8, height: 8, background: '#EC4899' }} /> Absent</span>
                  <select className="form-control" style={{ width: '100px', fontSize: '0.75rem' }}>
                    <option>This Year ▾</option>
                  </select>
                </div>
              </div>

              <div style={{ height: '140px', width: '100%', position: 'relative' }}>
                <svg viewBox="0 0 500 120" style={{ width: '100%', height: '100%' }}>
                  <line x1="0" y1="20" x2="500" y2="20" stroke="#F1F5F9" strokeDasharray="3 3" />
                  <line x1="0" y1="50" x2="500" y2="50" stroke="#F1F5F9" strokeDasharray="3 3" />
                  <line x1="0" y1="80" x2="500" y2="80" stroke="#F1F5F9" strokeDasharray="3 3" />
                  <line x1="0" y1="110" x2="500" y2="110" stroke="#F1F5F9" strokeDasharray="3 3" />

                  {/* Green Curve */}
                  <path
                    d="M 10 90 Q 60 60 120 70 T 230 40 T 340 25 T 450 65 T 490 70"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="2.5"
                  />

                  {/* Pink Curve */}
                  <path
                    d="M 10 100 Q 60 85 120 80 T 230 65 T 340 30 T 450 55 T 490 65"
                    fill="none"
                    stroke="#EC4899"
                    strokeWidth="2.5"
                  />
                </svg>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Employee Attendance Table */}
        <Card>
          <div style={{ padding: '0.875rem 1.25rem', borderBottom: '1px solid var(--color-border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1E293B' }}>Employee Attendance</h3>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <input type="text" className="form-control" defaultValue="dd/mm/yyyy" style={{ width: '130px', fontSize: '0.75rem' }} />
              <select className="form-control" style={{ width: '130px', fontSize: '0.75rem' }}>
                <option>Select Status</option>
              </select>
              <select className="form-control" style={{ width: '160px', fontSize: '0.75rem' }}>
                <option>Sort By : Last 7 Days</option>
              </select>
            </div>
          </div>

          <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
            <table className="table" style={{ fontSize: '0.8125rem' }}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Check In</th>
                  <th>Status</th>
                  <th>Check Out</th>
                  <th>Break</th>
                  <th>Late</th>
                  <th>Overtime</th>
                  <th>Production Hours</th>
                </tr>
              </thead>
              <tbody>
                {commonEmployees.map((emp, i) => (
                  <tr key={i}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                        <Avatar src={emp.avatar} name={emp.name} size="sm" />
                        <div>
                          <strong style={{ color: '#1E293B' }}>{emp.name}</strong>
                          <div style={{ fontSize: '0.6875rem', color: '#64748B' }}>{emp.role}</div>
                        </div>
                      </div>
                    </td>
                    <td>14/01/2024</td>
                    <td>{emp.checkIn}</td>
                    <td>
                      <span style={{
                        background: emp.status === 'Present' ? '#ECFDF5' : '#FEF2F2',
                        color: emp.status === 'Present' ? '#10B981' : '#EF4444',
                        padding: '0.15rem 0.5rem',
                        borderRadius: 'var(--radius-pill)',
                        fontWeight: 700,
                        fontSize: '0.6875rem'
                      }}>
                        • {emp.status}
                      </span>
                    </td>
                    <td>{emp.checkOut}</td>
                    <td>{emp.breakT}</td>
                    <td>{emp.late}</td>
                    <td>{emp.overtime}</td>
                    <td>
                      <span style={{
                        background: emp.isHoursPositive ? '#ECFDF5' : '#FEF2F2',
                        color: emp.isHoursPositive ? '#10B981' : '#EF4444',
                        padding: '0.15rem 0.5rem',
                        borderRadius: 'var(--radius-pill)',
                        fontWeight: 700,
                        fontSize: '0.6875rem',
                        border: `1px solid ${emp.isHoursPositive ? '#10B981' : '#EF4444'}40`
                      }}>
                        🕒 {emp.hours}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    );
  }

  /* ------------------------------------------------------------- */
  /* VIEW 5: EMPLOYEE REPORT (Screenshot 5)                        */
  /* ------------------------------------------------------------- */
  return (
    <div className="page-container" style={{ gap: '1.25rem' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#1E293B' }}>Employee Report</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', color: '#94A3B8' }}>
            <span>⌂</span>
            <span>/</span>
            <span>HR</span>
            <span>/</span>
            <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Employee Report</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          {renderNavPills()}

          <button className="btn btn-secondary btn-sm" onClick={() => showToast('Exporting employee rosters...', 'info')}>
            <Download size={14} /> Export <ChevronDown size={12} />
          </button>
        </div>
      </div>

      {/* 4 Cards + Dual Bar Chart */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <Card style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Total Employee</span>
                <div style={{ fontSize: '1.375rem', fontWeight: 800, color: '#1E293B', marginTop: '0.25rem' }}>600</div>
              </div>
              <div style={{ width: 38, height: 38, borderRadius: '8px', border: '1px solid #FF5B37', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF5B37' }}>
                <Users size={18} />
              </div>
            </div>
            <div style={{ fontSize: '0.6875rem', color: '#10B981', fontWeight: 700, marginTop: '0.5rem' }}>
              ~ +20.01% <span style={{ color: '#94A3B8', fontWeight: 400 }}>from last week</span>
            </div>
          </Card>

          <Card style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Active Employee</span>
                <div style={{ fontSize: '1.375rem', fontWeight: 800, color: '#1E293B', marginTop: '0.25rem' }}>600</div>
              </div>
              <div style={{ width: 38, height: 38, borderRadius: '8px', border: '1px solid #10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981' }}>
                <UserCheck size={18} />
              </div>
            </div>
            <div style={{ fontSize: '0.6875rem', color: '#10B981', fontWeight: 700, marginTop: '0.5rem' }}>
              ~ +20.01% <span style={{ color: '#94A3B8', fontWeight: 400 }}>from last week</span>
            </div>
          </Card>

          <Card style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748B' }}>New Employee</span>
                <div style={{ fontSize: '1.375rem', fontWeight: 800, color: '#1E293B', marginTop: '0.25rem' }}>600</div>
              </div>
              <div style={{ width: 38, height: 38, borderRadius: '8px', border: '1px solid #06B6D4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#06B6D4' }}>
                <Users size={18} />
              </div>
            </div>
            <div style={{ fontSize: '0.6875rem', color: '#10B981', fontWeight: 700, marginTop: '0.5rem' }}>
              ~ +20.01% <span style={{ color: '#94A3B8', fontWeight: 400 }}>from last week</span>
            </div>
          </Card>

          <Card style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Inactive Employee</span>
                <div style={{ fontSize: '1.375rem', fontWeight: 800, color: '#1E293B', marginTop: '0.25rem' }}>600</div>
              </div>
              <div style={{ width: 38, height: 38, borderRadius: '8px', border: '1px solid #EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EF4444' }}>
                <Users size={18} />
              </div>
            </div>
            <div style={{ fontSize: '0.6875rem', color: '#10B981', fontWeight: 700, marginTop: '0.5rem' }}>
              ~ +20.01% <span style={{ color: '#94A3B8', fontWeight: 400 }}>from last week</span>
            </div>
          </Card>
        </div>

        {/* Dual Bar Chart */}
        <Card>
          <CardBody style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <TrendingUp size={16} style={{ color: '#FF5B37' }} />
                <strong style={{ fontSize: '0.875rem', color: '#1E293B' }}>Employee</strong>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.6875rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}><span style={{ width: 8, height: 8, background: '#10B981' }} /> Active Employees</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}><span style={{ width: 8, height: 8, background: '#E2E8F0' }} /> Inactive Employees</span>
                <select className="form-control" style={{ width: '100px', fontSize: '0.75rem' }}>
                  <option>This Year ▾</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '140px', paddingTop: '1rem' }}>
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m) => (
                <div key={m} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px' }}>
                    <div style={{ width: 8, height: '70px', background: '#10B981', borderRadius: '2px 2px 0 0' }} />
                    <div style={{ width: 8, height: '30px', background: '#F1F5F9', borderRadius: '2px 2px 0 0' }} />
                  </div>
                  <span style={{ fontSize: '0.625rem', color: '#94A3B8' }}>{m}</span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Employees List Table */}
      <Card>
        <div style={{ padding: '0.875rem 1.25rem', borderBottom: '1px solid var(--color-border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1E293B' }}>Employees List</h3>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <input type="text" className="form-control" defaultValue="dd/mm/yyyy - dd/mm/yyyy" style={{ width: '180px', fontSize: '0.75rem' }} />
            <select className="form-control" style={{ width: '120px', fontSize: '0.75rem' }}>
              <option>Designation ▾</option>
            </select>
            <select className="form-control" style={{ width: '130px', fontSize: '0.75rem' }}>
              <option>Select Status ▾</option>
            </select>
            <select className="form-control" style={{ width: '160px', fontSize: '0.75rem' }}>
              <option>Sort By : Last 7 Days ▾</option>
            </select>
          </div>
        </div>

        <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
          <table className="table" style={{ fontSize: '0.8125rem' }}>
            <thead>
              <tr>
                <th style={{ width: '40px' }}><input type="checkbox" /></th>
                <th>Emp ID ▾</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Phone</th>
                <th>Joining Date ▾</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {commonEmployees.map((emp) => (
                <tr key={emp.empId}>
                  <td><input type="checkbox" /></td>
                  <td><span style={{ color: '#0284C7', fontWeight: 700 }}>{emp.empId}</span></td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                      <Avatar src={emp.avatar} name={emp.name} size="sm" />
                      <div>
                        <strong style={{ color: '#1E293B' }}>{emp.name}</strong>
                        <div style={{ fontSize: '0.6875rem', color: '#64748B' }}>{emp.role}</div>
                      </div>
                    </div>
                  </td>
                  <td>{emp.email}</td>
                  <td>{emp.dept}</td>
                  <td>{emp.phone}</td>
                  <td>{emp.joinDate}</td>
                  <td>
                    <span style={{
                      background: emp.isActive ? '#ECFDF5' : '#FEF2F2',
                      color: emp.isActive ? '#10B981' : '#EF4444',
                      padding: '0.15rem 0.5rem',
                      borderRadius: 'var(--radius-pill)',
                      fontWeight: 700,
                      fontSize: '0.6875rem'
                    }}>
                      • {emp.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
