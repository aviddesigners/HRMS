import React, { useState } from 'react';
import {
  Receipt,
  DollarSign,
  TrendingUp,
  CreditCard,
  Plus,
  FileSpreadsheet,
  CheckCircle2,
  Clock,
  AlertCircle,
  Building,
  UserCheck
} from 'lucide-react';
import { useHRMS } from '../../context/HRMSContext';
import { Invoice, Expense } from '../../types';
import { MetricCard } from '../../components/common/MetricCard';
import { Card, CardHeader, CardBody } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Avatar } from '../../components/common/Avatar';
import { SearchInput } from '../../components/common/SearchInput';
import { Tabs } from '../../components/common/Tabs';
import { RevenueExpenseChart } from '../../components/charts/ChartComponents';
import { InvoiceDetailModal } from './InvoiceDetailModal';
import { CreateInvoiceModal } from './CreateInvoiceModal';
import { RecordExpenseModal } from './RecordExpenseModal';

export const FinancePage: React.FC = () => {
  const { invoices, expenses, employees } = useHRMS();

  const [activeTab, setActiveTab] = useState<'invoices' | 'expenses' | 'payroll' | 'analytics'>('invoices');
  const [invoiceStatusFilter, setInvoiceStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isInvoiceDetailOpen, setIsInvoiceDetailOpen] = useState(false);
  const [isCreateInvoiceOpen, setIsCreateInvoiceOpen] = useState(false);
  const [isRecordExpenseOpen, setIsRecordExpenseOpen] = useState(false);

  const mainTabs = [
    { id: 'invoices', label: 'Invoices & Billing', count: invoices.length },
    { id: 'expenses', label: 'Operating Expenses', count: expenses.length },
    { id: 'payroll', label: 'Monthly Payroll', count: employees.length },
    { id: 'analytics', label: 'Profit & Loss Statement' }
  ];

  // Financial Calculations
  const totalRevenuePaid = invoices
    .filter((i) => i.status === 'Paid')
    .reduce((sum, i) => sum + i.totalAmount, 0);

  const totalOutstanding = invoices
    .filter((i) => i.status === 'Pending' || i.status === 'Overdue')
    .reduce((sum, i) => sum + i.totalAmount, 0);

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const monthlyPayroll = employees.reduce((sum, e) => sum + Math.round(e.salary / 12), 0);

  const filteredInvoices = invoices.filter((inv) => {
    const matchesStatus = invoiceStatusFilter === 'All' || inv.status === invoiceStatusFilter;
    const matchesSearch =
      inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.clientName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleOpenInvoice = (inv: Invoice) => {
    setSelectedInvoice(inv);
    setIsInvoiceDetailOpen(true);
  };

  return (
    <div className="page-container">
      {/* Top Header Row */}
      <div className="page-header-row">
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
            Finance & Accounts
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginTop: '0.125rem' }}>
            GST Invoicing, corporate expense tracking, monthly payroll disbursement, and financial statements in INR (₹).
          </p>
        </div>

        <div className="page-actions-group">
          <Button
            variant="secondary"
            iconLeft={<Plus size={16} />}
            onClick={() => setIsRecordExpenseOpen(true)}
          >
            Record Expense
          </Button>

          <Button
            variant="primary"
            iconLeft={<Plus size={16} />}
            onClick={() => setIsCreateInvoiceOpen(true)}
          >
            Create Invoice
          </Button>
        </div>
      </div>

      {/* Financial KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
        <MetricCard
          label="Total Collected (Paid)"
          value={`₹${(totalRevenuePaid / 100000).toFixed(2)} Lakh`}
          icon={<span style={{ fontWeight: 800, fontSize: '1.25rem' }}>₹</span>}
          iconColor="emerald"
          trend={{ value: '+18.4% MoM', isUp: true }}
        />
        <MetricCard
          label="Outstanding Receivables"
          value={`₹${(totalOutstanding / 100000).toFixed(2)} Lakh`}
          icon={<Clock size={22} />}
          iconColor="amber"
          subtitle={`${invoices.filter((i) => i.status !== 'Paid').length} invoices pending`}
        />
        <MetricCard
          label="Operating Expenses"
          value={`₹${(totalExpenses / 100000).toFixed(2)} Lakh`}
          icon={<CreditCard size={22} />}
          iconColor="coral"
          trend={{ value: '-4.2% below budget', isUp: true }}
        />
        <MetricCard
          label="Monthly Payroll Outflow"
          value={`₹${(monthlyPayroll / 100000).toFixed(2)} Lakh`}
          icon={<Receipt size={22} />}
          iconColor="purple"
          subtitle="6 Active Employees"
        />
      </div>

      {/* Main Tab Navigation */}
      <Card>
        <CardBody style={{ padding: '0.75rem 1.25rem' }}>
          <Tabs
            tabs={mainTabs}
            activeTab={activeTab}
            onChange={(id: any) => setActiveTab(id)}
            variant="underline"
          />
        </CardBody>
      </Card>

      {/* TAB 1: INVOICES */}
      {activeTab === 'invoices' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <Card>
            <CardBody style={{ padding: '1rem 1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <SearchInput
                  value={searchQuery}
                  onValueChange={setSearchQuery}
                  placeholder="Search invoice number, client..."
                />

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {['All', 'Paid', 'Pending', 'Overdue'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setInvoiceStatusFilter(st)}
                      className={`btn btn-sm ${invoiceStatusFilter === st ? 'btn-primary' : 'btn-secondary'}`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </CardBody>
          </Card>

          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Invoice #</th>
                  <th>Client</th>
                  <th>Issue Date</th>
                  <th>Due Date</th>
                  <th>Tax (GST 18%)</th>
                  <th>Total Amount (₹)</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map((inv) => (
                  <tr key={inv.id} onClick={() => handleOpenInvoice(inv)} style={{ cursor: 'pointer' }}>
                    <td>
                      <strong style={{ color: 'var(--color-primary)' }}>{inv.invoiceNumber}</strong>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, color: '#1E293B' }}>{inv.clientName}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{inv.clientEmail}</div>
                    </td>
                    <td>{inv.issueDate}</td>
                    <td>{inv.dueDate}</td>
                    <td>₹{inv.taxAmount.toLocaleString('en-IN')}</td>
                    <td>
                      <strong style={{ fontSize: '0.9375rem', color: '#1E293B' }}>
                        ₹{inv.totalAmount.toLocaleString('en-IN')}
                      </strong>
                    </td>
                    <td>
                      <Badge
                        variant={
                          inv.status === 'Paid'
                            ? 'success'
                            : inv.status === 'Overdue'
                            ? 'danger'
                            : 'warning'
                        }
                        showDot
                      >
                        {inv.status}
                      </Badge>
                    </td>
                    <td>
                      <Button variant="ghost" size="sm">
                        View Invoice
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: EXPENSES */}
      {activeTab === 'expenses' && (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Expense Item</th>
                <th>Category</th>
                <th>Recorded By</th>
                <th>Date</th>
                <th>Payment Mode</th>
                <th>Amount (₹)</th>
                <th>Audit Status</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((exp) => (
                <tr key={exp.id}>
                  <td>
                    <div style={{ fontWeight: 600, color: '#1E293B' }}>{exp.title}</div>
                    {exp.receiptAttached && (
                      <span style={{ fontSize: '0.6875rem', color: '#3B82F6' }}>
                        ✓ Verified GST Tax Invoice
                      </span>
                    )}
                  </td>
                  <td>
                    <Badge variant="purple">{exp.category}</Badge>
                  </td>
                  <td>{exp.recordedBy}</td>
                  <td>{exp.date}</td>
                  <td>{exp.paymentMethod}</td>
                  <td>
                    <strong style={{ color: '#1E293B' }}>₹{exp.amount.toLocaleString('en-IN')}</strong>
                  </td>
                  <td>
                    <Badge variant={exp.status === 'Approved' ? 'success' : 'warning'}>
                      {exp.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 3: PAYROLL */}
      {activeTab === 'payroll' && (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Designation</th>
                <th>Bank & Account</th>
                <th>Annual CTC</th>
                <th>Monthly Gross</th>
                <th>TDS Withholding</th>
                <th>Net Disbursed</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => {
                const monthly = Math.round(emp.salary / 12);
                const tax = Math.round(monthly * 0.18);
                const net = monthly - tax;

                return (
                  <tr key={emp.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Avatar src={emp.avatar} name={emp.name} size="sm" />
                        <div>
                          <div style={{ fontWeight: 700, color: '#1E293B' }}>{emp.name}</div>
                          <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{emp.empId}</div>
                        </div>
                      </div>
                    </td>
                    <td>{emp.designation}</td>
                    <td>
                      <div style={{ fontSize: '0.8125rem' }}>{emp.bankDetails?.bankName}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                        {emp.bankDetails?.accountNumber} ({emp.bankDetails?.ifsc})
                      </div>
                    </td>
                    <td>₹{emp.salary.toLocaleString('en-IN')}</td>
                    <td>₹{monthly.toLocaleString('en-IN')}</td>
                    <td style={{ color: '#EF4444' }}>-₹{tax.toLocaleString('en-IN')}</td>
                    <td>
                      <strong style={{ color: '#10B981', fontSize: '0.9375rem' }}>
                        ₹{net.toLocaleString('en-IN')}
                      </strong>
                    </td>
                    <td>
                      <Badge variant="success">Auto-Disbursed</Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 4: P&L CHARTS */}
      {activeTab === 'analytics' && (
        <Card>
          <CardHeader
            title="Monthly Revenue vs Operating Expenses (₹ INR)"
            subtitle="Trailing 6-month financial trajectory & net margins"
          />
          <CardBody>
            <RevenueExpenseChart />
          </CardBody>
        </Card>
      )}

      {/* Invoice Detail Modal */}
      <InvoiceDetailModal
        invoice={selectedInvoice}
        isOpen={isInvoiceDetailOpen}
        onClose={() => setIsInvoiceDetailOpen(false)}
      />

      {/* Create Invoice Modal */}
      <CreateInvoiceModal
        isOpen={isCreateInvoiceOpen}
        onClose={() => setIsCreateInvoiceOpen(false)}
      />

      {/* Record Expense Modal */}
      <RecordExpenseModal
        isOpen={isRecordExpenseOpen}
        onClose={() => setIsRecordExpenseOpen(false)}
      />
    </div>
  );
};
