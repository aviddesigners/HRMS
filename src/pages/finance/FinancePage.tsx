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
  UserCheck,
  Download,
  Calendar,
  ChevronDown,
  Edit2,
  Trash2,
  Search,
  FileText,
  Building2,
  Mail,
  Phone,
  Check,
  Printer
} from 'lucide-react';
import { useHRMS, FinanceTabType } from '../../context/HRMSContext';
import { useToast } from '../../context/ToastContext';
import { Invoice, Expense } from '../../types';
import { Card, CardHeader, CardBody } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Avatar } from '../../components/common/Avatar';
import { Modal } from '../../components/common/Modal';
import { InvoiceDetailModal } from './InvoiceDetailModal';
import { CreateInvoiceModal } from './CreateInvoiceModal';
import { RecordExpenseModal } from './RecordExpenseModal';

export const FinancePage: React.FC = () => {
  const { invoices, expenses, employees, financeTab, setFinanceTab } = useHRMS();
  const { showToast } = useToast();

  const activeTab: FinanceTabType = financeTab || 'expenses';

  // Selected Payslip state
  const [selectedPayslip, setSelectedPayslip] = useState<any>({
    payslipNo: '#PS4283',
    salaryMonth: 'October 2024',
    companyName: 'XYZ Technologies',
    companyAddress: '2077 Chicago Avenue Orosi, CA 93647',
    companyEmail: 'xyztech@gmail.com',
    companyPhone: '+1 987 654 3210',
    employeeName: 'Anthony Lewis',
    employeeRole: 'Web Designer',
    employeeEmail: 'anthony@gmail.com',
    employeePhone: '+1 458 268 4738',
    basicSalary: 3000,
    hra: 1000,
    conveyance: 200,
    otherAllowance: 100,
    tds: 200,
    pf: 300,
    esi: 150,
    loan: 50
  });

  // Modal States
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);
  const [isAddPfModalOpen, setIsAddPfModalOpen] = useState(false);
  const [isAddSalaryModalOpen, setIsAddSalaryModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isInvoiceDetailOpen, setIsInvoiceDetailOpen] = useState(false);
  const [isCreateInvoiceOpen, setIsCreateInvoiceOpen] = useState(false);

  // Filter & Search states
  const [searchTerm, setSearchTerm] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);

  /* ------------------------------------------------------------- */
  /* 1. EXPENSES DATASET (Screenshot 1)                           */
  /* ------------------------------------------------------------- */
  const [expenseList, setExpenseList] = useState([
    { id: 'EXP-01', name: 'Online Course', date: '14/01/2024', method: 'Cash', amount: '$3000' },
    { id: 'EXP-02', name: 'Employee Benefits', date: '21/01/2024', method: 'Cash', amount: '$2500' },
    { id: 'EXP-03', name: 'Travel', date: '20/02/2024', method: 'Cheque', amount: '$2800' },
    { id: 'EXP-04', name: 'Office Supplies', date: '15/03/2024', method: 'Cash', amount: '$3300' },
    { id: 'EXP-05', name: 'Welcome Kit', date: '12/04/2024', method: 'Cheque', amount: '$3600' },
    { id: 'EXP-06', name: 'Equipment', date: '20/05/2024', method: 'Cheque', amount: '$2000' },
    { id: 'EXP-07', name: 'Miscellaneous', date: '06/07/2024', method: 'Cash', amount: '$3400' },
    { id: 'EXP-08', name: 'Payroll', date: '02/09/2024', method: 'Cheque', amount: '$4000' },
    { id: 'EXP-09', name: 'Cafeteria', date: '15/11/2024', method: 'Cash', amount: '$4500' },
    { id: 'EXP-10', name: 'Cleaning Supplies', date: '10/12/2024', method: 'Cheque', amount: '$3800' }
  ]);

  /* ------------------------------------------------------------- */
  /* 2. PROVIDENT FUND DATASET (Screenshot 2)                      */
  /* ------------------------------------------------------------- */
  const [pfList, setPfList] = useState([
    { id: 'PF-01', name: 'Anthony Lewis', role: 'Finance', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', type: 'Employee Provident Fund', empShare: '2%', orgShare: '2%', status: 'Approved' },
    { id: 'PF-02', name: 'Brian Villalobos', role: 'Developer', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', type: 'Employee Provident Fund', empShare: '2%', orgShare: '2%', status: 'Pending' },
    { id: 'PF-03', name: 'Harvey Smith', role: 'Developer', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', type: 'Voluntary Provident Fund', empShare: '5%', orgShare: '2%', status: 'Approved' },
    { id: 'PF-04', name: 'Stephan Peralt', role: 'Executive Officer', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80', type: 'Voluntary Provident Fund', empShare: '3%', orgShare: '2%', status: 'Pending' },
    { id: 'PF-05', name: 'Doglas Martini', role: 'Manager', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80', type: 'Employee Provident Fund', empShare: '2%', orgShare: '2%', status: 'Approved' },
    { id: 'PF-06', name: 'Linda Ray', role: 'Finance', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', type: 'Employee Provident Fund', empShare: '2%', orgShare: '2%', status: 'Pending' },
    { id: 'PF-07', name: 'Elliot Murray', role: 'Developer', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80', type: 'Voluntary Provident Fund', empShare: '6%', orgShare: '2%', status: 'Approved' },
    { id: 'PF-08', name: 'Rebecca Smtih', role: 'Executive', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80', type: 'Voluntary Provident Fund', empShare: '4%', orgShare: '2%', status: 'Pending' },
    { id: 'PF-09', name: 'Connie Waters', role: 'Developer', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80', type: 'Employee Provident Fund', empShare: '2%', orgShare: '2%', status: 'Approved' },
    { id: 'PF-10', name: 'Lori Broaddus', role: 'Finance', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', type: 'Voluntary Provident Fund', empShare: '7%', orgShare: '2%', status: 'Pending' }
  ]);

  /* ------------------------------------------------------------- */
  /* 3. PAYMENTS DATASET (Screenshot 3)                            */
  /* ------------------------------------------------------------- */
  const paymentList = [
    { invId: 'Inv-001', clientName: 'Michael Walker', clientRole: 'CEO', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', company: 'BrightWave Innovations', type: 'Paypal', date: '15/01/2024', amount: '$3000' },
    { invId: 'Inv-002', clientName: 'Sophie Headrick', clientRole: 'Manager', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80', company: 'Stellar Dynamics', type: 'Paypal', date: '25/01/2024', amount: '$2500' },
    { invId: 'Inv-003', clientName: 'Cameron Drake', clientRole: 'Director', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', company: 'Quantum Nexus', type: 'Paypal', date: '22/02/2024', amount: '$2800' },
    { invId: 'Inv-004', clientName: 'Doris Crowley', clientRole: 'Consultant', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', company: 'EcoVision Enterprises', type: 'Paypal', date: '17/03/2024', amount: '$3300' },
    { invId: 'Inv-005', clientName: 'Thomas Bordelon', clientRole: 'Manager', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80', company: 'Aurora Technologies', type: 'Paypal', date: '16/04/2024', amount: '$3600' },
    { invId: 'Inv-006', clientName: 'Kathleen Gutierrez', clientRole: 'Director', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80', company: 'BlueSky Ventures', type: 'Paypal', date: '21/05/2024', amount: '$2000' },
    { invId: 'Inv-007', clientName: 'Bruce Wright', clientRole: 'CEO', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80', company: 'TerraFusion Energy', type: 'Paypal', date: '06/07/2024', amount: '$3400' },
    { invId: 'Inv-008', clientName: 'Estelle Morgan', clientRole: 'Manager', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', company: 'UrbanPulse Design', type: 'Paypal', date: '04/09/2024', amount: '$4000' },
    { invId: 'Inv-009', clientName: 'Stephen Dias', clientRole: 'CEO', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', company: 'Nimbus Networks', type: 'Paypal', date: '15/11/2024', amount: '$4500' },
    { invId: 'Inv-010', clientName: 'Angela Thomas', clientRole: 'Consultant', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80', company: 'Epicurean Delights', type: 'Paypal', date: '11/12/2024', amount: '$3800' }
  ];

  /* ------------------------------------------------------------- */
  /* 4. EMPLOYEE SALARY DATASET (Screenshot 5)                     */
  /* ------------------------------------------------------------- */
  const [salaryList, setSalaryList] = useState([
    { empId: 'Emp-001', name: 'Anthony Lewis', role: 'Finance', email: 'anthony@example.com', phone: '(123) 4567 890', designation: 'Finance', joinDate: '12/09/2024', salary: '$40000', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
    { empId: 'Emp-002', name: 'Brian Villalobos', role: 'Developer', email: 'brian@example.com', phone: '(179) 7382 829', designation: 'Developer', joinDate: '24/10/2024', salary: '$35000', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
    { empId: 'Emp-003', name: 'Harvey Smith', role: 'Developer', email: 'harvey@example.com', phone: '(184) 2719 738', designation: 'Executive', joinDate: '18/02/2024', salary: '$20000', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
    { empId: 'Emp-004', name: 'Stephan Peralt', role: 'Executive Officer', email: 'peralt@example.com', phone: '(193) 7839 748', designation: 'Executive', joinDate: '17/10/2024', salary: '$22000', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80' },
    { empId: 'Emp-005', name: 'Doglas Martini', role: 'Manager', email: 'martniwr@example.com', phone: '(183) 9302 890', designation: 'Manager', joinDate: '20/07/2024', salary: '$25000', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80' },
    { empId: 'Emp-006', name: 'Linda Ray', role: 'Finance', email: 'ray456@example.com', phone: '(120) 3728 039', designation: 'Finance', joinDate: '10/04/2024', salary: '$30000', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80' },
    { empId: 'Emp-007', name: 'Elliot Murray', role: 'Developer', email: 'murray@example.com', phone: '(102) 8480 832', designation: 'Developer', joinDate: '29/08/2024', salary: '$35000', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80' },
    { empId: 'Emp-008', name: 'Rebecca Smtih', role: 'Executive', email: 'smtih@example.com', phone: '(162) 8920 713', designation: 'Executive', joinDate: '22/02/2024', salary: '$45000', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' },
    { empId: 'Emp-009', name: 'Connie Waters', role: 'Developer', email: 'connie@example.com', phone: '(189) 0920 723', designation: 'Developer', joinDate: '03/11/2024', salary: '$50000', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
    { empId: 'Emp-010', name: 'Lori Broaddus', role: 'Finance', email: 'broaddus@example.com', phone: '(168) 8392 823', designation: 'Finance', joinDate: '17/12/2024', salary: '$25000', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' }
  ]);

  const handleGenerateSlip = (emp: any) => {
    setSelectedPayslip({
      payslipNo: `#PS${Math.floor(1000 + Math.random() * 9000)}`,
      salaryMonth: 'October 2024',
      companyName: 'XYZ Technologies',
      companyAddress: '2077 Chicago Avenue Orosi, CA 93647',
      companyEmail: 'xyztech@gmail.com',
      companyPhone: '+1 987 654 3210',
      employeeName: emp.name,
      employeeRole: emp.designation,
      employeeEmail: emp.email,
      employeePhone: emp.phone,
      basicSalary: 3000,
      hra: 1000,
      conveyance: 200,
      otherAllowance: 100,
      tds: 200,
      pf: 300,
      esi: 150,
      loan: 50
    });
    setFinanceTab('payslip');
    showToast(`Generated payslip for ${emp.name}`, 'success');
  };

  /* ------------------------------------------------------------- */
  /* TOP NAVIGATION PILLS                                          */
  /* ------------------------------------------------------------- */
  const renderNavPills = () => (
    <div style={{ display: 'flex', gap: '0.375rem', background: '#F1F5F9', padding: '0.25rem', borderRadius: 'var(--radius-lg)', flexWrap: 'wrap' }}>
      <button
        onClick={() => setFinanceTab('expenses')}
        className={`btn btn-sm ${activeTab === 'expenses' ? 'btn-primary' : 'btn-ghost'}`}
        style={{ fontSize: '0.75rem', borderRadius: 'var(--radius-md)' }}
      >
        <Receipt size={14} /> Expenses
      </button>
      <button
        onClick={() => setFinanceTab('provident-fund')}
        className={`btn btn-sm ${activeTab === 'provident-fund' ? 'btn-primary' : 'btn-ghost'}`}
        style={{ fontSize: '0.75rem', borderRadius: 'var(--radius-md)' }}
      >
        <TrendingUp size={14} /> Provident Fund
      </button>
      <button
        onClick={() => setFinanceTab('payments')}
        className={`btn btn-sm ${activeTab === 'payments' ? 'btn-primary' : 'btn-ghost'}`}
        style={{ fontSize: '0.75rem', borderRadius: 'var(--radius-md)' }}
      >
        <CreditCard size={14} /> Payments
      </button>
      <button
        onClick={() => setFinanceTab('employee-salary')}
        className={`btn btn-sm ${activeTab === 'employee-salary' ? 'btn-primary' : 'btn-ghost'}`}
        style={{ fontSize: '0.75rem', borderRadius: 'var(--radius-md)' }}
      >
        <DollarSign size={14} /> Employee Salary
      </button>
      <button
        onClick={() => setFinanceTab('payslip')}
        className={`btn btn-sm ${activeTab === 'payslip' ? 'btn-primary' : 'btn-ghost'}`}
        style={{ fontSize: '0.75rem', borderRadius: 'var(--radius-md)' }}
      >
        <FileText size={14} /> Payslip
      </button>
      <button
        onClick={() => setFinanceTab('invoices')}
        className={`btn btn-sm ${activeTab === 'invoices' ? 'btn-primary' : 'btn-ghost'}`}
        style={{ fontSize: '0.75rem', borderRadius: 'var(--radius-md)' }}
      >
        <FileSpreadsheet size={14} /> Invoices & Billing
      </button>
    </div>
  );

  /* ------------------------------------------------------------- */
  /* VIEW 1: EXPENSES VIEW (Screenshot 1)                          */
  /* ------------------------------------------------------------- */
  if (activeTab === 'expenses') {
    return (
      <div className="page-container" style={{ gap: '1.25rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#1E293B' }}>Expenses</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', color: '#94A3B8' }}>
              <span>⌂</span>
              <span>/</span>
              <span>HR</span>
              <span>/</span>
              <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Expenses</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            {renderNavPills()}

            <button className="btn btn-secondary btn-sm" onClick={() => showToast('Exporting expense records...', 'info')}>
              <Download size={14} /> Export <ChevronDown size={12} />
            </button>

            <Button
              variant="primary"
              size="sm"
              style={{ background: '#FF5B37', borderColor: '#FF5B37', fontSize: '0.8125rem' }}
              onClick={() => setIsAddExpenseModalOpen(true)}
              iconLeft={<Plus size={16} />}
            >
              Add New Expense
            </Button>
          </div>
        </div>

        {/* Filter Bar */}
        <Card>
          <CardBody style={{ padding: '0.875rem 1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1E293B' }}>Expense List</h3>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <input
                  type="text"
                  className="form-control"
                  defaultValue="dd/mm/yyyy - dd/mm/yyyy"
                  style={{ width: '180px', fontSize: '0.75rem' }}
                />
                <select className="form-control" style={{ width: '110px', fontSize: '0.75rem' }}>
                  <option>$0.00 - $00</option>
                  <option>$1000 - $3000</option>
                  <option>$3000+</option>
                </select>
                <select className="form-control" style={{ width: '120px', fontSize: '0.75rem' }}>
                  <option>Payment Type</option>
                  <option>Cash</option>
                  <option>Cheque</option>
                </select>
                <select className="form-control" style={{ width: '160px', fontSize: '0.75rem' }}>
                  <option>Sort By : Last 7 Days</option>
                </select>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Expenses Table */}
        <Card>
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
                  <th style={{ width: '40px' }}><input type="checkbox" /></th>
                  <th>Expense Name</th>
                  <th>Date ▾</th>
                  <th>Payment Method</th>
                  <th>Amount</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {expenseList.map((exp) => (
                  <tr key={exp.id}>
                    <td><input type="checkbox" /></td>
                    <td><strong>{exp.name}</strong></td>
                    <td>{exp.date}</td>
                    <td>{exp.method}</td>
                    <td><strong style={{ color: '#1E293B' }}>{exp.amount}</strong></td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.375rem' }}>
                        <button className="btn-icon-only btn-ghost" onClick={() => showToast(`Editing expense ${exp.name}`, 'info')}>
                          <Edit2 size={14} />
                        </button>
                        <button className="btn-icon-only btn-ghost" style={{ color: '#EF4444' }} onClick={() => showToast(`Deleted expense ${exp.name}`, 'warning')}>
                          <Trash2 size={14} />
                        </button>
                      </div>
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

        {/* Add Expense Modal */}
        <Modal
          isOpen={isAddExpenseModalOpen}
          onClose={() => setIsAddExpenseModalOpen(false)}
          title="Add New Expense"
          subtitle="Record operating expense in Finance"
        >
          <form onSubmit={(e) => {
            e.preventDefault();
            showToast('New expense recorded!', 'success');
            setIsAddExpenseModalOpen(false);
          }}>
            <div className="form-group">
              <label className="form-label">Expense Name <span className="required">*</span></label>
              <input type="text" className="form-control" placeholder="e.g. Cloud Server Hosting" required />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Amount</label>
                <input type="text" className="form-control" defaultValue="$2500" />
              </div>
              <div className="form-group">
                <label className="form-label">Payment Method</label>
                <select className="form-control">
                  <option>Cash</option>
                  <option>Cheque</option>
                  <option>Bank Transfer</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
              <Button type="button" variant="secondary" onClick={() => setIsAddExpenseModalOpen(false)}>Cancel</Button>
              <Button type="submit" variant="primary">Save Expense</Button>
            </div>
          </form>
        </Modal>
      </div>
    );
  }

  /* ------------------------------------------------------------- */
  /* VIEW 2: PROVIDENT FUND VIEW (Screenshot 2)                    */
  /* ------------------------------------------------------------- */
  if (activeTab === 'provident-fund') {
    return (
      <div className="page-container" style={{ gap: '1.25rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#1E293B' }}>Provident Fund</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', color: '#94A3B8' }}>
              <span>⌂</span>
              <span>/</span>
              <span>HR</span>
              <span>/</span>
              <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Provident Fund</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            {renderNavPills()}

            <button className="btn btn-secondary btn-sm" onClick={() => showToast('Exporting provident fund ledger...', 'info')}>
              <Download size={14} /> Export <ChevronDown size={12} />
            </button>

            <Button
              variant="primary"
              size="sm"
              style={{ background: '#FF5B37', borderColor: '#FF5B37', fontSize: '0.8125rem' }}
              onClick={() => setIsAddPfModalOpen(true)}
              iconLeft={<Plus size={16} />}
            >
              Add New Provident Fund
            </Button>
          </div>
        </div>

        {/* Filter Bar */}
        <Card>
          <CardBody style={{ padding: '0.875rem 1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1E293B' }}>Provident Fund List</h3>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <select className="form-control" style={{ width: '170px', fontSize: '0.75rem' }}>
                  <option>Provident Fund Type</option>
                  <option>Employee Provident Fund</option>
                  <option>Voluntary Provident Fund</option>
                </select>
                <select className="form-control" style={{ width: '130px', fontSize: '0.75rem' }}>
                  <option>Select Status</option>
                  <option>Approved</option>
                  <option>Pending</option>
                </select>
                <select className="form-control" style={{ width: '160px', fontSize: '0.75rem' }}>
                  <option>Sort By : Last 7 Days</option>
                </select>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Table */}
        <Card>
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
                  <th style={{ width: '40px' }}><input type="checkbox" /></th>
                  <th>Employee Name</th>
                  <th>Provident Fund Type</th>
                  <th>Employee Share</th>
                  <th>Organization Share</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pfList.map((pf) => (
                  <tr key={pf.id}>
                    <td><input type="checkbox" /></td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                        <Avatar src={pf.avatar} name={pf.name} size="sm" />
                        <div>
                          <strong style={{ color: '#1E293B' }}>{pf.name}</strong>
                          <div style={{ fontSize: '0.6875rem', color: '#64748B' }}>{pf.role}</div>
                        </div>
                      </div>
                    </td>
                    <td>{pf.type}</td>
                    <td>{pf.empShare}</td>
                    <td>{pf.orgShare}</td>
                    <td>
                      <span style={{
                        background: pf.status === 'Approved' ? '#ECFDF5' : '#E0F2FE',
                        color: pf.status === 'Approved' ? '#10B981' : '#0284C7',
                        padding: '0.15rem 0.5rem',
                        borderRadius: 'var(--radius-pill)',
                        fontWeight: 700,
                        fontSize: '0.6875rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                      }}>
                        • {pf.status} ▾
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.375rem' }}>
                        <button className="btn-icon-only btn-ghost" onClick={() => showToast(`Editing PF details for ${pf.name}`, 'info')}>
                          <Edit2 size={14} />
                        </button>
                        <button className="btn-icon-only btn-ghost" style={{ color: '#EF4444' }} onClick={() => showToast(`Deleted PF record`, 'warning')}>
                          <Trash2 size={14} />
                        </button>
                      </div>
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

        {/* Add PF Modal */}
        <Modal
          isOpen={isAddPfModalOpen}
          onClose={() => setIsAddPfModalOpen(false)}
          title="Add New Provident Fund"
          subtitle="Configure statutory PF contributions"
        >
          <form onSubmit={(e) => {
            e.preventDefault();
            showToast('New PF contribution record added!', 'success');
            setIsAddPfModalOpen(false);
          }}>
            <div className="form-group">
              <label className="form-label">Employee Name <span className="required">*</span></label>
              <input type="text" className="form-control" defaultValue="Anthony Lewis" required />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">PF Type</label>
                <select className="form-control">
                  <option>Employee Provident Fund</option>
                  <option>Voluntary Provident Fund</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Employee Share (%)</label>
                <input type="text" className="form-control" defaultValue="2%" />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
              <Button type="button" variant="secondary" onClick={() => setIsAddPfModalOpen(false)}>Cancel</Button>
              <Button type="submit" variant="primary">Save PF Entry</Button>
            </div>
          </form>
        </Modal>
      </div>
    );
  }

  /* ------------------------------------------------------------- */
  /* VIEW 3: PAYMENTS VIEW (Screenshot 3)                          */
  /* ------------------------------------------------------------- */
  if (activeTab === 'payments') {
    return (
      <div className="page-container" style={{ gap: '1.25rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#1E293B' }}>Payments</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', color: '#94A3B8' }}>
              <span>⌂</span>
              <span>/</span>
              <span>HR</span>
              <span>/</span>
              <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Payments</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            {renderNavPills()}

            <button className="btn btn-secondary btn-sm" onClick={() => showToast('Exporting payments ledger...', 'info')}>
              <Download size={14} /> Export <ChevronDown size={12} />
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <Card>
          <CardBody style={{ padding: '0.875rem 1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1E293B' }}>Payment List</h3>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <input
                  type="text"
                  className="form-control"
                  defaultValue="dd/mm/yyyy - dd/mm/yyyy"
                  style={{ width: '180px', fontSize: '0.75rem' }}
                />
                <select className="form-control" style={{ width: '110px', fontSize: '0.75rem' }}>
                  <option>$0.00 - $00</option>
                  <option>$1000 - $3000</option>
                  <option>$3000+</option>
                </select>
                <select className="form-control" style={{ width: '130px', fontSize: '0.75rem' }}>
                  <option>Payment Type</option>
                  <option>Paypal</option>
                  <option>Stripe</option>
                  <option>Bank Wire</option>
                </select>
                <select className="form-control" style={{ width: '160px', fontSize: '0.75rem' }}>
                  <option>Sort By : Last 7 Days</option>
                </select>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Payments Table */}
        <Card>
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
                  <th>Invoice ID ⇅</th>
                  <th>Client Name</th>
                  <th>Company Name</th>
                  <th>Payment Type</th>
                  <th>Paid Date ▾</th>
                  <th>Paid Amount</th>
                </tr>
              </thead>
              <tbody>
                {paymentList.map((p) => (
                  <tr key={p.invId}>
                    <td>
                      <span style={{ color: '#0284C7', fontWeight: 700, cursor: 'pointer' }} onClick={() => showToast(`Opening ${p.invId}`, 'info')}>
                        {p.invId}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                        <Avatar src={p.avatar} name={p.clientName} size="sm" />
                        <div>
                          <strong style={{ color: '#1E293B' }}>{p.clientName}</strong>
                          <div style={{ fontSize: '0.6875rem', color: '#64748B' }}>{p.clientRole}</div>
                        </div>
                      </div>
                    </td>
                    <td>{p.company}</td>
                    <td>{p.type}</td>
                    <td>{p.date}</td>
                    <td><strong style={{ color: '#1E293B' }}>{p.amount}</strong></td>
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
  /* VIEW 4: PAYSLIP VIEW (Screenshot 4)                           */
  /* ------------------------------------------------------------- */
  if (activeTab === 'payslip') {
    const ps = selectedPayslip;
    const totalEarnings = ps.basicSalary + ps.hra + ps.conveyance + ps.otherAllowance;
    const totalDeductions = ps.tds + ps.pf + ps.esi + ps.loan;
    const netSalary = totalEarnings - totalDeductions;

    return (
      <div className="page-container" style={{ gap: '1.25rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#1E293B' }}>Payslip</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', color: '#94A3B8' }}>
              <span>⌂</span>
              <span>/</span>
              <span>HR</span>
              <span>/</span>
              <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Payslip</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            {renderNavPills()}

            <button
              className="btn btn-sm"
              style={{ background: '#1E293B', color: '#FFFFFF', fontSize: '0.8125rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}
              onClick={() => showToast(`Downloading ${ps.payslipNo} PDF...`, 'success')}
            >
              <Download size={14} /> Download
            </button>
          </div>
        </div>

        {/* Payslip Document Card matching exact Screenshot 4 */}
        <Card style={{ background: '#FFFFFF', padding: '2rem', borderRadius: 'var(--radius-xl)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          {/* Top Brand & Payslip Number Row */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '1.5rem' }}>
            <div>
              <img src="/logo.png" alt="Avi Designers" style={{ height: '42px', objectFit: 'contain' }} />
              <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.375rem' }}>
                3099 Kennedy Court Framingham, MA 01702
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.875rem', color: '#64748B' }}>
                Payslip No <strong style={{ color: '#FF5B37', fontSize: '1rem' }}>{ps.payslipNo}</strong>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#1E293B', fontWeight: 600, marginTop: '0.2rem' }}>
                Salary Month : <strong>{ps.salaryMonth}</strong>
              </div>
            </div>
          </div>

          {/* From & To Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', padding: '1.5rem 0', borderBottom: '1px solid var(--color-border-subtle)' }}>
            <div>
              <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' }}>From</span>
              <h4 style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#1E293B', margin: '0.25rem 0' }}>{ps.companyName}</h4>
              <div style={{ fontSize: '0.75rem', color: '#64748B', lineHeight: '1.5' }}>
                <div>{ps.companyAddress}</div>
                <div>Email : <span style={{ color: '#1E293B' }}>{ps.companyEmail}</span></div>
                <div>Phone : <span style={{ color: '#1E293B' }}>{ps.companyPhone}</span></div>
              </div>
            </div>

            <div>
              <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' }}>To</span>
              <h4 style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#1E293B', margin: '0.25rem 0' }}>{ps.employeeName}</h4>
              <div style={{ fontSize: '0.75rem', color: '#64748B', lineHeight: '1.5' }}>
                <div>{ps.employeeRole}</div>
                <div>Email : <span style={{ color: '#1E293B' }}>{ps.employeeEmail}</span></div>
                <div>Phone : <span style={{ color: '#1E293B' }}>{ps.employeePhone}</span></div>
              </div>
            </div>
          </div>

          {/* Title banner */}
          <div style={{ textAlign: 'center', padding: '1.25rem 0', fontSize: '0.875rem', fontWeight: 700, color: '#1E293B' }}>
            Payslip for the month of {ps.salaryMonth}
          </div>

          {/* Side by Side Tables: Earnings & Deductions */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            {/* Earnings */}
            <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
              <div style={{ padding: '0.75rem 1rem', background: '#F8FAFC', borderBottom: '1px solid var(--color-border)', fontWeight: 800, fontSize: '0.8125rem', color: '#1E293B' }}>
                Earnings
              </div>
              <div style={{ padding: '0.75rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.625rem', fontSize: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B' }}>Basic Salary</span>
                  <strong style={{ color: '#1E293B' }}>${ps.basicSalary}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B' }}>House Rent Allowance (H.R.A.)</span>
                  <strong style={{ color: '#1E293B' }}>${ps.hra}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B' }}>Conveyance</span>
                  <strong style={{ color: '#1E293B' }}>${ps.conveyance}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B' }}>Other Allowance</span>
                  <strong style={{ color: '#1E293B' }}>${ps.otherAllowance}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '0.5rem', fontWeight: 800 }}>
                  <span style={{ color: '#1E293B' }}>Total Earnings</span>
                  <strong style={{ color: '#1E293B' }}>${totalEarnings}</strong>
                </div>
              </div>
            </div>

            {/* Deductions */}
            <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
              <div style={{ padding: '0.75rem 1rem', background: '#F8FAFC', borderBottom: '1px solid var(--color-border)', fontWeight: 800, fontSize: '0.8125rem', color: '#1E293B' }}>
                Deductions
              </div>
              <div style={{ padding: '0.75rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.625rem', fontSize: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B' }}>Tax Deducted at Source (T.D.S.)</span>
                  <strong style={{ color: '#1E293B' }}>${ps.tds}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B' }}>Provident Fund</span>
                  <strong style={{ color: '#1E293B' }}>${ps.pf}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B' }}>ESI</span>
                  <strong style={{ color: '#1E293B' }}>${ps.esi}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B' }}>Loan</span>
                  <strong style={{ color: '#1E293B' }}>${ps.loan}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '0.5rem', fontWeight: 800 }}>
                  <span style={{ color: '#1E293B' }}>Total Deductions</span>
                  <strong style={{ color: '#1E293B' }}>${totalDeductions}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Net Salary Row */}
          <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#F8FAFC', borderRadius: 'var(--radius-md)', fontSize: '0.8125rem' }}>
            <span style={{ color: '#64748B' }}>Net Salary : </span>
            <strong style={{ color: '#10B981', fontSize: '0.9375rem' }}>${netSalary}</strong>
            <span style={{ color: '#64748B', marginLeft: '0.25rem' }}>(Three thousand six hundred only)</span>
          </div>
        </Card>
      </div>
    );
  }

  /* ------------------------------------------------------------- */
  /* VIEW 5: EMPLOYEE SALARY VIEW (Screenshot 5)                   */
  /* ------------------------------------------------------------- */
  if (activeTab === 'employee-salary') {
    return (
      <div className="page-container" style={{ gap: '1.25rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#1E293B' }}>Employee Salary</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', color: '#94A3B8' }}>
              <span>⌂</span>
              <span>/</span>
              <span>HR</span>
              <span>/</span>
              <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Employee Salary</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            {renderNavPills()}

            <button className="btn btn-secondary btn-sm" onClick={() => showToast('Exporting salary records...', 'info')}>
              <Download size={14} /> Export <ChevronDown size={12} />
            </button>

            <Button
              variant="primary"
              size="sm"
              style={{ background: '#FF5B37', borderColor: '#FF5B37', fontSize: '0.8125rem' }}
              onClick={() => setIsAddSalaryModalOpen(true)}
              iconLeft={<Plus size={16} />}
            >
              Add New Salary
            </Button>
          </div>
        </div>

        {/* Filter Bar */}
        <Card>
          <CardBody style={{ padding: '0.875rem 1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1E293B' }}>Employee Salary List</h3>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <input
                  type="text"
                  className="form-control"
                  defaultValue="dd/mm/yyyy - dd/mm/yyyy"
                  style={{ width: '180px', fontSize: '0.75rem' }}
                />
                <select className="form-control" style={{ width: '130px', fontSize: '0.75rem' }}>
                  <option>Designation</option>
                  <option>Finance</option>
                  <option>Developer</option>
                  <option>Executive</option>
                  <option>Manager</option>
                </select>
                <select className="form-control" style={{ width: '110px', fontSize: '0.75rem' }}>
                  <option>$0.00 - $00</option>
                  <option>$20000 - $35000</option>
                  <option>$40000+</option>
                </select>
                <select className="form-control" style={{ width: '160px', fontSize: '0.75rem' }}>
                  <option>Sort By : Last 7 Days</option>
                </select>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Table */}
        <Card>
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
                  <th style={{ width: '40px' }}><input type="checkbox" /></th>
                  <th>Emp ID ▾</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Designation</th>
                  <th>Joining Date ▾</th>
                  <th>Salary</th>
                  <th>Payslip</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {salaryList.map((emp) => (
                  <tr key={emp.empId}>
                    <td><input type="checkbox" /></td>
                    <td>
                      <span style={{ color: '#0284C7', fontWeight: 700 }}>{emp.empId}</span>
                    </td>
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
                    <td>{emp.phone}</td>
                    <td>
                      <span style={{ border: '1px solid var(--color-border)', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-pill)', fontSize: '0.6875rem', fontWeight: 600, color: '#334155' }}>
                        {emp.designation} ▾
                      </span>
                    </td>
                    <td>{emp.joinDate}</td>
                    <td><strong style={{ color: '#1E293B' }}>{emp.salary}</strong></td>
                    <td>
                      <button
                        onClick={() => handleGenerateSlip(emp)}
                        className="btn btn-sm"
                        style={{ background: '#1E293B', color: '#FFFFFF', fontSize: '0.6875rem', padding: '0.2rem 0.6rem', borderRadius: '4px', fontWeight: 600 }}
                      >
                        Generate Slip
                      </button>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.375rem' }}>
                        <button className="btn-icon-only btn-ghost" onClick={() => showToast(`Editing salary for ${emp.name}`, 'info')}>
                          <Edit2 size={14} />
                        </button>
                        <button className="btn-icon-only btn-ghost" style={{ color: '#EF4444' }} onClick={() => showToast(`Deleted salary entry`, 'warning')}>
                          <Trash2 size={14} />
                        </button>
                      </div>
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

        {/* Add Salary Modal */}
        <Modal
          isOpen={isAddSalaryModalOpen}
          onClose={() => setIsAddSalaryModalOpen(false)}
          title="Add New Salary"
          subtitle="Set monthly salary and compensation package"
        >
          <form onSubmit={(e) => {
            e.preventDefault();
            showToast('New salary tier assigned!', 'success');
            setIsAddSalaryModalOpen(false);
          }}>
            <div className="form-group">
              <label className="form-label">Employee Name <span className="required">*</span></label>
              <input type="text" className="form-control" defaultValue="Anthony Lewis" required />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Designation</label>
                <select className="form-control">
                  <option>Finance</option>
                  <option>Developer</option>
                  <option>Executive</option>
                  <option>Manager</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Monthly Salary</label>
                <input type="text" className="form-control" defaultValue="$40000" />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
              <Button type="button" variant="secondary" onClick={() => setIsAddSalaryModalOpen(false)}>Cancel</Button>
              <Button type="submit" variant="primary">Save Salary</Button>
            </div>
          </form>
        </Modal>
      </div>
    );
  }

  /* ------------------------------------------------------------- */
  /* VIEW 6: DEFAULT / INVOICES VIEW                               */
  /* ------------------------------------------------------------- */
  return (
    <div className="page-container" style={{ gap: '1.25rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#1E293B' }}>Invoices & Billing</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', color: '#94A3B8' }}>
            <span>⌂</span>
            <span>/</span>
            <span>Finance</span>
            <span>/</span>
            <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Invoices & Billing</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          {renderNavPills()}

          <Button
            variant="primary"
            size="sm"
            style={{ background: '#FF5B37', borderColor: '#FF5B37', fontSize: '0.8125rem' }}
            onClick={() => setIsCreateInvoiceOpen(true)}
            iconLeft={<Plus size={16} />}
          >
            Create Invoice
          </Button>
        </div>
      </div>

      {/* Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
        <Card>
          <CardBody style={{ padding: '1.25rem' }}>
            <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Total Revenue Paid</span>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#10B981', margin: '0.25rem 0' }}>₹1,45,000</h3>
            <span style={{ fontSize: '0.6875rem', color: '#10B981', fontWeight: 700 }}>+18% from last month</span>
          </CardBody>
        </Card>
        <Card>
          <CardBody style={{ padding: '1.25rem' }}>
            <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Total Outstanding</span>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#EF4444', margin: '0.25rem 0' }}>₹42,500</h3>
            <span style={{ fontSize: '0.6875rem', color: '#EF4444', fontWeight: 700 }}>3 Pending Invoices</span>
          </CardBody>
        </Card>
        <Card>
          <CardBody style={{ padding: '1.25rem' }}>
            <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Monthly Operating Expenses</span>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1E293B', margin: '0.25rem 0' }}>₹32,400</h3>
            <span style={{ fontSize: '0.6875rem', color: '#0284C7', fontWeight: 700 }}>10 Categories Logged</span>
          </CardBody>
        </Card>
        <Card>
          <CardBody style={{ padding: '1.25rem' }}>
            <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Monthly Payroll Disbursed</span>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#8B5CF6', margin: '0.25rem 0' }}>₹3,20,000</h3>
            <span style={{ fontSize: '0.6875rem', color: '#10B981', fontWeight: 700 }}>100% Processed</span>
          </CardBody>
        </Card>
      </div>

      {/* Invoices Table */}
      <Card>
        <div style={{ padding: '0.75rem 1.25rem', borderBottom: '1px solid var(--color-border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1E293B' }}>Invoice Ledger</h3>
          <div style={{ position: 'relative', width: '220px' }}>
            <input
              type="text"
              className="form-control"
              placeholder="Search invoice..."
              style={{ paddingLeft: '2rem', fontSize: '0.75rem' }}
            />
            <Search size={13} style={{ position: 'absolute', left: '0.625rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
          </div>
        </div>

        <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
          <table className="table" style={{ fontSize: '0.8125rem' }}>
            <thead>
              <tr>
                <th>Invoice #</th>
                <th>Client</th>
                <th>Project</th>
                <th>Issue Date</th>
                <th>Due Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id}>
                  <td><strong style={{ color: '#0284C7', cursor: 'pointer' }} onClick={() => { setSelectedInvoice(inv); setIsInvoiceDetailOpen(true); }}>{inv.invoiceNumber}</strong></td>
                  <td>{inv.clientName}</td>
                  <td>{inv.items[0]?.description || 'Design Services'}</td>
                  <td>{inv.issueDate}</td>
                  <td>{inv.dueDate}</td>
                  <td><strong style={{ color: '#1E293B' }}>₹{inv.totalAmount.toLocaleString('en-IN')}</strong></td>
                  <td>
                    <span style={{
                      background: inv.status === 'Paid' ? '#ECFDF5' : inv.status === 'Pending' ? '#FEF3C7' : '#FEF2F2',
                      color: inv.status === 'Paid' ? '#10B981' : inv.status === 'Pending' ? '#F59E0B' : '#EF4444',
                      padding: '0.15rem 0.5rem',
                      borderRadius: 'var(--radius-pill)',
                      fontWeight: 700,
                      fontSize: '0.6875rem'
                    }}>
                      • {inv.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <Button size="sm" variant="secondary" onClick={() => { setSelectedInvoice(inv); setIsInvoiceDetailOpen(true); }}>
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <CreateInvoiceModal
        isOpen={isCreateInvoiceOpen}
        onClose={() => setIsCreateInvoiceOpen(false)}
      />

      {selectedInvoice && (
        <InvoiceDetailModal
          isOpen={isInvoiceDetailOpen}
          onClose={() => setIsInvoiceDetailOpen(false)}
          invoice={selectedInvoice}
        />
      )}
    </div>
  );
};
