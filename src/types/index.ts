export type UserRole =
  | 'Super Admin'
  | 'HR Manager'
  | 'Project Manager'
  | 'Accountant'
  | 'Recruiter'
  | 'Employee';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  department: string;
  status: 'Active' | 'Inactive';
  lastActive: string;
}

export interface PermissionMatrix {
  module: string;
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
}

export interface Employee {
  id: string;
  empId: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  department: string;
  designation: string;
  joiningDate: string;
  employmentType: 'Full-time' | 'Part-time' | 'Contract' | 'Intern';
  status: 'Active' | 'On Leave' | 'Terminated' | 'Probation';
  salary: number;
  location: string;
  dob: string;
  gender: 'Male' | 'Female' | 'Other';
  address: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  bankDetails: {
    bankName: string;
    accountNumber: string;
    ifsc: string;
    pan: string;
  };
  documents: {
    name: string;
    type: string;
    size: string;
    date: string;
  }[];
}

export interface AttendanceRecord {
  id: string;
  empId: string;
  empName: string;
  avatar: string;
  date: string;
  clockIn: string;
  clockOut: string;
  workHours: string;
  status: 'Present' | 'Late' | 'Absent' | 'Half Day' | 'On Leave';
  location: string;
}

export interface LeaveRequest {
  id: string;
  empId: string;
  empName: string;
  avatar: string;
  department: string;
  leaveType: 'Casual Leave' | 'Sick Leave' | 'Annual Leave' | 'Maternity/Paternity' | 'Unpaid';
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  appliedOn: string;
  approvedBy?: string;
}

export interface ProjectTask {
  id: string;
  title: string;
  completed: boolean;
  assignee: string;
  dueDate: string;
  priority: 'Low' | 'Medium' | 'High';
}

export interface ProjectMilestone {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
}

export interface Project {
  id: string;
  title: string;
  code: string;
  client: string;
  description: string;
  status: 'Planning' | 'Active' | 'On Hold' | 'Completed' | 'Overdue';
  priority: 'Low' | 'Medium' | 'High';
  startDate: string;
  deadline: string;
  budget: number;
  spent: number;
  progress: number;
  leader: {
    name: string;
    avatar: string;
    role: string;
  };
  team: {
    id: string;
    name: string;
    avatar: string;
    role: string;
  }[];
  tasks: ProjectTask[];
  milestones: ProjectMilestone[];
  category: 'UI/UX Design' | 'Web Development' | 'Mobile App' | 'Brand Identity' | 'Consulting';
}

export interface LeadActivity {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'note' | 'status_change';
  title: string;
  timestamp: string;
  user: string;
}

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  dealValue: number;
  stage: 'New' | 'Contacted' | 'Qualified' | 'Proposal' | 'Won' | 'Lost';
  source: 'Website' | 'Referral' | 'LinkedIn' | 'Cold Outreach' | 'Events';
  assignedTo: {
    name: string;
    avatar: string;
  };
  probability: number;
  expectedClose: string;
  notes: string;
  activities: LeadActivity[];
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  issueDate: string;
  dueDate: string;
  status: 'Paid' | 'Pending' | 'Overdue' | 'Draft';
  items: InvoiceItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  discount: number;
  totalAmount: number;
  notes: string;
  paymentMethod?: string;
  paidDate?: string;
}

export interface Expense {
  id: string;
  title: string;
  category: 'Software & Tools' | 'Office Supplies' | 'Travel' | 'Marketing' | 'Equipment' | 'Utilities';
  amount: number;
  date: string;
  recordedBy: string;
  paymentMethod: 'Credit Card' | 'Bank Transfer' | 'Cash' | 'Corporate Card';
  status: 'Approved' | 'Pending' | 'Rejected';
  receiptAttached: boolean;
}

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  experience: string;
  openings: number;
  applicantsCount: number;
  status: 'Active' | 'Draft' | 'Closed';
  postedDate: string;
  deadline: string;
  salaryRange: string;
  description: string;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  jobId: string;
  jobTitle: string;
  stage: 'Applied' | 'Screening' | 'Interview' | 'Assessment' | 'Offered' | 'Hired' | 'Rejected';
  rating: number;
  appliedDate: string;
  experienceYears: number;
  currentCompany: string;
  expectedSalary: string;
  resumeUrl: string;
  skills: string[];
  interviewNotes?: string;
  scheduledInterview?: {
    date: string;
    time: string;
    interviewer: string;
    type: 'Technical' | 'HR' | 'Cultural Fit' | 'Final';
  };
}

export interface AuditLog {
  id: string;
  user: string;
  avatar: string;
  action: string;
  target: string;
  timestamp: string;
  ipAddress: string;
  type: 'create' | 'update' | 'delete' | 'auth' | 'export';
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  link?: string;
}
