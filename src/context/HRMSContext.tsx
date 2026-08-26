import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  Employee,
  AttendanceRecord,
  LeaveRequest,
  Project,
  Lead,
  Invoice,
  Expense,
  JobOpening,
  Candidate,
  AuditLog,
  NotificationItem
} from '../types';
import {
  mockEmployees,
  mockAttendance,
  mockLeaveRequests,
  mockProjects,
  mockLeads,
  mockInvoices,
  mockExpenses,
  mockJobOpenings,
  mockCandidates,
  mockAuditLogs,
  mockNotifications
} from '../data/mockData';
import { useToast } from './ToastContext';
import confetti from 'canvas-confetti';

export type HRMTabType = 'employees' | 'attendance' | 'leaves' | 'designations';
export type DashboardTabType = 'admin' | 'employee' | 'deals' | 'leads' | 'superadmin';
export type CRMTabType =
  | 'clients'
  | 'contacts'
  | 'contact-details'
  | 'companies'
  | 'company-details'
  | 'deals'
  | 'deal-details'
  | 'pipeline'
  | 'activity';

interface HRMSContextType {
  // Navigation State
  activeModule: string;
  setActiveModule: (module: string) => void;
  dashboardTab: DashboardTabType;
  setDashboardTab: (tab: DashboardTabType) => void;
  hrmTab: HRMTabType;
  setHrmTab: (tab: HRMTabType) => void;
  crmTab: CRMTabType;
  setCrmTab: (tab: CRMTabType) => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;

  // Employees
  employees: Employee[];
  addEmployee: (emp: Omit<Employee, 'id' | 'empId'>) => void;
  updateEmployee: (id: string, updates: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;

  // Attendance
  attendanceRecords: AttendanceRecord[];
  isClockedIn: boolean;
  clockInTime: string | null;
  toggleClockInOut: () => void;
  clockInToday: () => void;
  clockOutToday: () => void;

  // Leaves
  leaveRequests: LeaveRequest[];
  applyLeave: (leave: Omit<LeaveRequest, 'id' | 'status' | 'appliedOn'>) => void;
  approveLeave: (id: string) => void;
  rejectLeave: (id: string) => void;

  // Projects
  projects: Project[];
  addProject: (proj: Omit<Project, 'id' | 'code' | 'spent' | 'progress'>) => void;
  updateProjectStatus: (id: string, status: Project['status']) => void;
  toggleProjectTask: (projectId: string, taskId: string) => void;

  // Leads
  leads: Lead[];
  addLead: (lead: Omit<Lead, 'id' | 'activities'>) => void;
  updateLeadStage: (id: string, stage: Lead['stage']) => void;
  addLeadActivity: (leadId: string, activity: { type: any; title: string; user: string }) => void;

  // Invoices & Expenses
  invoices: Invoice[];
  expenses: Expense[];
  addInvoice: (inv: Omit<Invoice, 'id' | 'invoiceNumber'>) => void;
  updateInvoiceStatus: (id: string, status: Invoice['status']) => void;
  markInvoicePaid: (id: string) => void;
  addExpense: (exp: Omit<Expense, 'id' | 'status'>) => void;
  updateExpenseStatus: (id: string, status: Expense['status']) => void;

  // Recruitment
  jobOpenings: JobOpening[];
  candidates: Candidate[];
  addJobOpening: (job: Omit<JobOpening, 'id' | 'applicantsCount' | 'postedDate'>) => void;
  updateCandidateStage: (candidateId: string, stage: Candidate['stage']) => void;
  scheduleInterview: (candidateId: string, interview: Candidate['scheduledInterview']) => void;

  // Audit Logs & Notifications
  auditLogs: AuditLog[];
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
}

const HRMSContext = createContext<HRMSContextType | undefined>(undefined);

export const HRMSProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { showToast } = useToast();

  const [activeModule, setActiveModule] = useState<string>('Dashboard');
  const [dashboardTab, setDashboardTab] = useState<DashboardTabType>('admin');
  const [hrmTab, setHrmTab] = useState<HRMTabType>('employees');
  const [crmTab, setCrmTab] = useState<CRMTabType>('clients');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);

  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(mockAttendance);
  const [isClockedIn, setIsClockedIn] = useState<boolean>(true);
  const [clockInTime, setClockInTime] = useState<string | null>('09:00 AM');

  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(mockLeaveRequests);
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses);
  const [jobOpenings, setJobOpenings] = useState<JobOpening[]>(mockJobOpenings);
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(mockAuditLogs);
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);

  // Helper for audit logging
  const logAction = (action: string, target: string, type: AuditLog['type'] = 'update') => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      user: 'Amit Kumar',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      action,
      target,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      ipAddress: '192.168.1.101',
      type
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // Employee Handlers
  const addEmployee = (empData: Omit<Employee, 'id' | 'empId'>) => {
    const newId = `emp-${Date.now()}`;
    const nextCode = `AD-${1000 + employees.length + 1}`;
    const newEmp: Employee = {
      id: newId,
      empId: nextCode,
      ...empData
    };
    setEmployees((prev) => [newEmp, ...prev]);
    logAction('Added new employee profile', `${newEmp.name} (${newEmp.empId})`, 'create');
    showToast(`Employee ${newEmp.name} registered successfully!`, 'success', 'Employee Added');
  };

  const updateEmployee = (id: string, updates: Partial<Employee>) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === id ? { ...emp, ...updates } : emp))
    );
    showToast('Employee profile updated.', 'success');
  };

  const deleteEmployee = (id: string) => {
    const target = employees.find((e) => e.id === id);
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    logAction('Deleted employee profile', target ? target.name : id, 'delete');
    showToast('Employee profile deleted.', 'warning', 'Removed');
  };

  // Attendance Simulator
  const clockInToday = () => {
    setIsClockedIn(true);
    setClockInTime('09:00 AM');
    showToast('Clocked in successfully at 09:00 AM. Have a productive day!', 'success', 'Clocked In');
  };

  const clockOutToday = () => {
    setIsClockedIn(false);
    setClockInTime(null);
    showToast('Clocked out successfully for the day.', 'info', 'Clocked Out');
  };

  const toggleClockInOut = () => {
    if (isClockedIn) {
      clockOutToday();
    } else {
      clockInToday();
    }
  };

  // Leaves
  const applyLeave = (leaveData: Omit<LeaveRequest, 'id' | 'status' | 'appliedOn'>) => {
    const newLeave: LeaveRequest = {
      id: `leave-${Date.now()}`,
      status: 'Pending',
      appliedOn: new Date().toISOString().split('T')[0],
      ...leaveData
    };
    setLeaveRequests((prev) => [newLeave, ...prev]);
    showToast('Leave request submitted to HR for approval.', 'success', 'Leave Applied');
    logAction('Submitted leave request', `${leaveData.empName} (${leaveData.leaveType})`, 'create');
  };

  const approveLeave = (id: string) => {
    setLeaveRequests((prev) =>
      prev.map((lr) => (lr.id === id ? { ...lr, status: 'Approved', approvedBy: 'Priya Sharma' } : lr))
    );
    const item = leaveRequests.find((l) => l.id === id);
    showToast(`Leave approved for ${item?.empName}.`, 'success', 'Leave Approved');
    logAction('Approved leave request', item ? item.empName : id, 'update');
  };

  const rejectLeave = (id: string) => {
    setLeaveRequests((prev) =>
      prev.map((lr) => (lr.id === id ? { ...lr, status: 'Rejected' } : lr))
    );
    const item = leaveRequests.find((l) => l.id === id);
    showToast(`Leave request for ${item?.empName} rejected.`, 'error', 'Leave Rejected');
    logAction('Rejected leave request', item ? item.empName : id, 'update');
  };

  // Projects
  const addProject = (projData: Omit<Project, 'id' | 'code' | 'spent' | 'progress'>) => {
    const newCode = `PRO-00${projects.length + 1}`;
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      code: newCode,
      spent: 0,
      progress: 0,
      ...projData
    };
    setProjects((prev) => [newProj, ...prev]);
    logAction('Created project workspace', `${newProj.title} (${newProj.code})`, 'create');
    showToast(`Project "${newProj.title}" launched successfully!`, 'success', 'Project Created');
  };

  const updateProjectStatus = (id: string, status: Project['status']) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status } : p))
    );
    showToast(`Project status changed to ${status}`, 'info');
  };

  const toggleProjectTask = (projectId: string, taskId: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projectId) return p;
        const updatedTasks = p.tasks.map((t) =>
          t.id === taskId ? { ...t, completed: !t.completed } : t
        );
        const completedCount = updatedTasks.filter((t) => t.completed).length;
        const progress = updatedTasks.length > 0 ? Math.round((completedCount / updatedTasks.length) * 100) : p.progress;
        return { ...p, tasks: updatedTasks, progress };
      })
    );
  };

  // Leads
  const addLead = (leadData: Omit<Lead, 'id' | 'activities'>) => {
    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      activities: [
        {
          id: `act-${Date.now()}`,
          type: 'note',
          title: 'Lead registered in CRM',
          timestamp: new Date().toLocaleString(),
          user: 'Amit Kumar'
        }
      ],
      ...leadData
    };
    setLeads((prev) => [newLead, ...prev]);
    logAction('Added new sales lead', `${newLead.company} (₹${newLead.dealValue.toLocaleString('en-IN')})`, 'create');
    showToast(`New deal lead "${newLead.company}" added.`, 'success', 'Lead Created');
  };

  const updateLeadStage = (id: string, stage: Lead['stage']) => {
    setLeads((prev) =>
      prev.map((l) => {
        if (l.id !== id) return l;
        const updatedActivities = [
          {
            id: `act-${Date.now()}`,
            type: 'status_change' as const,
            title: `Stage moved to ${stage.toUpperCase()}`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            user: 'Active User'
          },
          ...l.activities
        ];
        return { ...l, stage, activities: updatedActivities };
      })
    );

    if (stage === 'Won') {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
      showToast('Deal won! Revenue added to pipeline.', 'success', '🎉 Deal Closed!');
    } else {
      showToast(`Lead moved to ${stage} stage.`, 'info');
    }
  };

  const addLeadActivity = (leadId: string, activity: { type: any; title: string; user: string }) => {
    setLeads((prev) =>
      prev.map((l) => {
        if (l.id !== leadId) return l;
        const newAct = {
          id: `act-${Date.now()}`,
          type: activity.type,
          title: activity.title,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          user: activity.user
        };
        return { ...l, activities: [newAct, ...l.activities] };
      })
    );
    showToast('Activity note saved.', 'success');
  };

  // Invoices & Expenses
  const addInvoice = (invData: Omit<Invoice, 'id' | 'invoiceNumber'>) => {
    const num = `#INV-00${invoices.length + 1}`;
    const newInv: Invoice = {
      id: `inv-${Date.now()}`,
      invoiceNumber: num,
      ...invData
    };
    setInvoices((prev) => [newInv, ...prev]);
    logAction('Generated invoice', `${newInv.invoiceNumber} (${newInv.clientName})`, 'create');
    showToast(`Invoice ${newInv.invoiceNumber} generated!`, 'success', 'Invoice Ready');
  };

  const updateInvoiceStatus = (id: string, status: Invoice['status']) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, status, paidDate: status === 'Paid' ? new Date().toISOString().split('T')[0] : undefined } : inv))
    );
    showToast(`Invoice status updated to ${status}.`, 'info');
  };

  const markInvoicePaid = (id: string) => {
    updateInvoiceStatus(id, 'Paid');
  };

  const addExpense = (expData: Omit<Expense, 'id' | 'status'>) => {
    const newExp: Expense = {
      id: `exp-${Date.now()}`,
      status: 'Approved',
      ...expData
    };
    setExpenses((prev) => [newExp, ...prev]);
    showToast(`Expense of ₹${newExp.amount.toLocaleString('en-IN')} recorded.`, 'success', 'Expense Logged');
  };

  const updateExpenseStatus = (id: string, status: Expense['status']) => {
    setExpenses((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status } : e))
    );
    showToast(`Expense marked as ${status}.`, 'info');
  };

  // Recruitment
  const addJobOpening = (jobData: Omit<JobOpening, 'id' | 'applicantsCount' | 'postedDate'>) => {
    const newJob: JobOpening = {
      id: `job-${Date.now()}`,
      applicantsCount: 0,
      postedDate: new Date().toISOString().split('T')[0],
      ...jobData
    };
    setJobOpenings((prev) => [newJob, ...prev]);
    logAction('Posted new job listing', newJob.title, 'create');
    showToast(`Job listing "${newJob.title}" published!`, 'success', 'Job Posted');
  };

  const updateCandidateStage = (candidateId: string, stage: Candidate['stage']) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === candidateId ? { ...c, stage } : c))
    );
    if (stage === 'Hired') {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 }
      });
      showToast('Candidate officially hired! Sent welcome packet.', 'success', '🎉 Welcome to Avid Designers!');
    } else {
      showToast(`Candidate moved to ${stage}.`, 'info');
    }
  };

  const scheduleInterview = (candidateId: string, interview: Candidate['scheduledInterview']) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === candidateId ? { ...c, scheduledInterview: interview, stage: 'Interview' } : c))
    );
    showToast('Interview confirmed and calendar invites dispatched.', 'success', 'Interview Scheduled');
  };

  // Notifications
  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('All notifications marked as read.', 'info');
  };

  return (
    <HRMSContext.Provider
      value={{
        activeModule,
        setActiveModule,
        dashboardTab,
        setDashboardTab,
        hrmTab,
        setHrmTab,
        crmTab,
        setCrmTab,
        searchQuery,
        setSearchQuery,
        isSearchModalOpen,
        setIsSearchModalOpen,
        employees,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        attendanceRecords,
        isClockedIn,
        clockInTime,
        toggleClockInOut,
        clockInToday,
        clockOutToday,
        leaveRequests,
        applyLeave,
        approveLeave,
        rejectLeave,
        projects,
        addProject,
        updateProjectStatus,
        toggleProjectTask,
        leads,
        addLead,
        updateLeadStage,
        addLeadActivity,
        invoices,
        expenses,
        addInvoice,
        updateInvoiceStatus,
        markInvoicePaid,
        addExpense,
        updateExpenseStatus,
        jobOpenings,
        candidates,
        addJobOpening,
        updateCandidateStage,
        scheduleInterview,
        auditLogs,
        notifications,
        markNotificationAsRead,
        markAllNotificationsAsRead
      }}
    >
      {children}
    </HRMSContext.Provider>
  );
};

export const useHRMS = () => {
  const context = useContext(HRMSContext);
  if (!context) {
    throw new Error('useHRMS must be used within an HRMSProvider');
  }
  return context;
};
