import React, { useState } from 'react';
import {
  Download,
  Printer,
  Calendar,
  Users,
  Clock,
  DollarSign,
  FolderKanban,
  UserCheck,
  Building,
  TrendingUp,
  FileText
} from 'lucide-react';
import { useHRMS } from '../../context/HRMSContext';
import { useToast } from '../../context/ToastContext';
import { Card, CardHeader, CardBody } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Tabs } from '../../components/common/Tabs';
import {
  AttendanceChart,
  RevenueExpenseChart,
  DepartmentDoughnutChart,
  RecruitmentFunnelChart
} from '../../components/charts/ChartComponents';

export const ReportsPage: React.FC = () => {
  const { employees, projects, leads, invoices } = useHRMS();
  const { showToast } = useToast();

  const [reportDomain, setReportDomain] = useState<'hr' | 'attendance' | 'payroll' | 'projects' | 'crm' | 'finance' | 'recruitment'>('hr');
  const [dateRange, setDateRange] = useState('This Month (August 2026)');
  const [deptFilter, setDeptFilter] = useState('All');

  const reportTabs = [
    { id: 'hr', label: 'HR Analytics', icon: <Users size={14} /> },
    { id: 'attendance', label: 'Attendance Reports', icon: <Clock size={14} /> },
    { id: 'payroll', label: 'Payroll & Compensation (₹)', icon: <span style={{ fontWeight: 700 }}>₹</span> },
    { id: 'projects', label: 'Project Performance (₹)', icon: <FolderKanban size={14} /> },
    { id: 'crm', label: 'CRM Sales Conversion (₹)', icon: <TrendingUp size={14} /> },
    { id: 'finance', label: 'Financial Statements (₹)', icon: <FileText size={14} /> },
    { id: 'recruitment', label: 'Recruitment Metrics', icon: <UserCheck size={14} /> }
  ];

  // Export handlers
  const handleExportCSV = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';

    if (reportDomain === 'hr') {
      csvContent += 'Emp ID,Name,Department,Designation,Annual CTC (INR),Status,Joining Date\n';
      employees.forEach((e) => {
        csvContent += `${e.empId},"${e.name}","${e.department}","${e.designation}",${e.salary},${e.status},${e.joiningDate}\n`;
      });
    } else if (reportDomain === 'finance') {
      csvContent += 'Invoice Number,Client,Issue Date,Due Date,Total Amount (INR),Status\n';
      invoices.forEach((i) => {
        csvContent += `${i.invoiceNumber},"${i.clientName}",${i.issueDate},${i.dueDate},${i.totalAmount},${i.status}\n`;
      });
    } else if (reportDomain === 'projects') {
      csvContent += 'Code,Project Title,Client,Budget (INR),Spent (INR),Progress,Deadline,Status\n';
      projects.forEach((p) => {
        csvContent += `${p.code},"${p.title}","${p.client}",${p.budget},${p.spent},${p.progress}%,${p.deadline},${p.status}\n`;
      });
    } else {
      csvContent += 'Entity,Metric,Timestamp,Status\n';
      csvContent += `Avid Designers,${reportDomain.toUpperCase()} Dataset,${new Date().toISOString()},Active\n`;
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Avid_Designers_${reportDomain}_Report_INR_2026.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(`Exported ${reportDomain.toUpperCase()} report as CSV in INR (₹)!`, 'success', 'Export Complete');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header-row">
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
            Enterprise Reports & Business Intelligence
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginTop: '0.125rem' }}>
            Multi-domain analytics, customized date filters, compliance logs, and export engines in INR (₹).
          </p>
        </div>

        <div className="page-actions-group">
          <Button
            variant="secondary"
            iconLeft={<Printer size={16} />}
            onClick={handlePrint}
          >
            Print View (PDF)
          </Button>

          <Button
            variant="primary"
            iconLeft={<Download size={16} />}
            onClick={handleExportCSV}
          >
            Export to CSV / Excel
          </Button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <Card>
        <CardBody style={{ padding: '1rem 1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Calendar size={16} className="text-primary" />
                <select
                  className="form-control"
                  style={{ width: '220px', padding: '0.5rem 0.75rem', fontSize: '0.8125rem' }}
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                >
                  <option value="This Month (August 2026)">This Month (August 2026)</option>
                  <option value="Q3 2026 (Jul - Sep)">Q3 2026 (Jul - Sep)</option>
                  <option value="Year-to-Date (2026)">Year-to-Date (2026)</option>
                  <option value="Past 12 Months">Past 12 Months</option>
                </select>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Building size={16} className="text-muted" />
                <select
                  className="form-control"
                  style={{ width: '180px', padding: '0.5rem 0.75rem', fontSize: '0.8125rem' }}
                  value={deptFilter}
                  onChange={(e) => setDeptFilter(e.target.value)}
                >
                  <option value="All">All Departments</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Human Resources">Human Resources</option>
                  <option value="Marketing & Sales">Marketing & Sales</option>
                  <option value="Finance & Accounts">Finance & Accounts</option>
                </select>
              </div>
            </div>

            <Badge variant="primary">
              Filtered for {dateRange} • {deptFilter}
            </Badge>
          </div>
        </CardBody>
      </Card>

      {/* Domain Navigation Tabs */}
      <Card>
        <CardBody style={{ padding: '0.75rem 1.25rem' }}>
          <Tabs
            tabs={reportTabs}
            activeTab={reportDomain}
            onChange={(id: any) => setReportDomain(id)}
            variant="pills"
          />
        </CardBody>
      </Card>

      {/* REPORT CONTENT BY DOMAIN */}

      {/* DOMAIN 1: HR ANALYTICS */}
      {reportDomain === 'hr' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem' }}>
            <Card>
              <CardHeader title="Department Headcount Distribution" subtitle="Active employee allocation" />
              <CardBody>
                <DepartmentDoughnutChart />
              </CardBody>
            </Card>

            <Card>
              <CardHeader title="Headcount Breakdown Table" subtitle="Summary by department" />
              <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Department</th>
                      <th>Headcount</th>
                      <th>Avg CTC (₹)</th>
                      <th>Retention</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>UI/UX Design</strong></td>
                      <td>6</td>
                      <td>₹18,50,000</td>
                      <td><Badge variant="success">96%</Badge></td>
                    </tr>
                    <tr>
                      <td><strong>Engineering</strong></td>
                      <td>8</td>
                      <td>₹22,00,000</td>
                      <td><Badge variant="success">94%</Badge></td>
                    </tr>
                    <tr>
                      <td><strong>Human Resources</strong></td>
                      <td>3</td>
                      <td>₹16,00,000</td>
                      <td><Badge variant="success">100%</Badge></td>
                    </tr>
                    <tr>
                      <td><strong>Marketing & Sales</strong></td>
                      <td>4</td>
                      <td>₹17,50,000</td>
                      <td><Badge variant="success">92%</Badge></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* DOMAIN 2: ATTENDANCE */}
      {reportDomain === 'attendance' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Card>
            <CardHeader title="Weekly Attendance & Punctuality Trends" subtitle="Present vs late vs leaves" />
            <CardBody>
              <AttendanceChart />
            </CardBody>
          </Card>
        </div>
      )}

      {/* DOMAIN 3: PAYROLL */}
      {reportDomain === 'payroll' && (
        <Card>
          <CardHeader title="Annual Compensation & Tax TDS Outflow Analysis (₹ INR)" subtitle="Calculated monthly CTC" />
          <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Annual CTC</th>
                  <th>Monthly Gross</th>
                  <th>TDS Withholdings</th>
                  <th>Net Monthly Disbursed</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((e) => (
                  <tr key={e.id}>
                    <td><strong>{e.name}</strong> ({e.empId})</td>
                    <td>₹{e.salary.toLocaleString('en-IN')}</td>
                    <td>₹{Math.round(e.salary / 12).toLocaleString('en-IN')}</td>
                    <td>₹{Math.round((e.salary / 12) * 0.18).toLocaleString('en-IN')}</td>
                    <td><strong style={{ color: '#10B981' }}>₹{(Math.round(e.salary / 12) - Math.round((e.salary / 12) * 0.18)).toLocaleString('en-IN')}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* DOMAIN 4: PROJECTS */}
      {reportDomain === 'projects' && (
        <Card>
          <CardHeader title="Project Budget vs Actual Expenditure (₹ INR)" subtitle="Variance tracking" />
          <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Project Code</th>
                  <th>Title</th>
                  <th>Client</th>
                  <th>Allocated Budget</th>
                  <th>Spent to Date</th>
                  <th>Variance Remaining</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => (
                  <tr key={p.id}>
                    <td><strong style={{ color: 'var(--color-primary)' }}>{p.code}</strong></td>
                    <td>{p.title}</td>
                    <td>{p.client}</td>
                    <td>₹{p.budget.toLocaleString('en-IN')}</td>
                    <td>₹{p.spent.toLocaleString('en-IN')}</td>
                    <td><strong style={{ color: '#10B981' }}>₹{(p.budget - p.spent).toLocaleString('en-IN')}</strong></td>
                    <td><Badge variant={p.status === 'Active' ? 'success' : 'neutral'}>{p.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* DOMAIN 5: CRM */}
      {reportDomain === 'crm' && (
        <Card>
          <CardHeader title="CRM Lead Conversion & Pipeline Value (₹ INR)" subtitle="Deal stage progression" />
          <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Prospect Company</th>
                  <th>Deal Value</th>
                  <th>Lead Source</th>
                  <th>Win Probability</th>
                  <th>Stage</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((l) => (
                  <tr key={l.id}>
                    <td><strong>{l.company}</strong> ({l.name})</td>
                    <td>₹{l.dealValue.toLocaleString('en-IN')}</td>
                    <td>{l.source}</td>
                    <td>{l.probability}%</td>
                    <td><Badge variant={l.stage === 'Won' ? 'success' : 'purple'}>{l.stage}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* DOMAIN 6: FINANCE */}
      {reportDomain === 'finance' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Card>
            <CardHeader title="Revenue vs Operating Expenses (₹ INR)" subtitle="Trailing 6-month comparison" />
            <CardBody>
              <RevenueExpenseChart />
            </CardBody>
          </Card>
        </div>
      )}

      {/* DOMAIN 7: RECRUITMENT */}
      {reportDomain === 'recruitment' && (
        <Card>
          <CardHeader title="Recruitment Pipeline Funnel & Stage Drop-off" subtitle="From applicants to offers" />
          <CardBody>
            <RecruitmentFunnelChart />
          </CardBody>
        </Card>
      )}
    </div>
  );
};
