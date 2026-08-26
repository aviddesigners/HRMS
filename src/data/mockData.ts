import {
  User,
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

export const mockUsers: User[] = [
  {
    id: 'usr-1',
    name: 'Amit Kumar',
    email: 'amit.kumar@aviddesigners.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'Super Admin',
    department: 'Executive Leadership',
    status: 'Active',
    lastActive: 'Just now'
  },
  {
    id: 'usr-2',
    name: 'Priya Sharma',
    email: 'priya.sharma@aviddesigners.com',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    role: 'HR Manager',
    department: 'Human Resources',
    status: 'Active',
    lastActive: '10 mins ago'
  },
  {
    id: 'usr-3',
    name: 'Rajesh Malhotra',
    email: 'rajesh.m@aviddesigners.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    role: 'Project Manager',
    department: 'Product & Design',
    status: 'Active',
    lastActive: '25 mins ago'
  },
  {
    id: 'usr-4',
    name: 'Sneha Patel',
    email: 'sneha.p@aviddesigners.com',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    role: 'Accountant',
    department: 'Finance & Accounts',
    status: 'Active',
    lastActive: '1 hour ago'
  },
  {
    id: 'usr-5',
    name: 'Vikram Singhania',
    email: 'vikram.s@aviddesigners.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    role: 'Recruiter',
    department: 'Talent Acquisition',
    status: 'Active',
    lastActive: '2 hours ago'
  },
  {
    id: 'usr-6',
    name: 'Ananya Sharma',
    email: 'ananya.s@aviddesigners.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    role: 'Employee',
    department: 'UI/UX Design',
    status: 'Active',
    lastActive: '45 mins ago'
  }
];

export const mockEmployees: Employee[] = [
  {
    id: 'emp-1',
    empId: 'AD-1001',
    name: 'Ananya Sharma',
    email: 'ananya.s@aviddesigners.com',
    phone: '+91 98201 44521',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    department: 'UI/UX Design',
    designation: 'Senior Product Designer',
    joiningDate: '2023-03-15',
    employmentType: 'Full-time',
    status: 'Active',
    salary: 1850000,
    location: 'Bengaluru, Karnataka',
    dob: '1995-06-18',
    gender: 'Female',
    address: 'Indiranagar 100ft Road, Bengaluru, Karnataka 560038',
    emergencyContact: {
      name: 'Ramesh Sharma',
      relationship: 'Father',
      phone: '+91 98200 11223'
    },
    bankDetails: {
      bankName: 'HDFC Bank Ltd',
      accountNumber: '••••••••4892',
      ifsc: 'HDFC000189',
      pan: 'ANAPS9912K'
    },
    documents: [
      { name: 'Offer_Letter_Ananya_Sharma.pdf', type: 'PDF', size: '1.8 MB', date: '2023-03-10' },
      { name: 'NDA_Signed_2023.pdf', type: 'PDF', size: '640 KB', date: '2023-03-12' },
      { name: 'Form16_Tax_2024.pdf', type: 'PDF', size: '420 KB', date: '2024-01-05' }
    ]
  },
  {
    id: 'emp-2',
    empId: 'AD-1002',
    name: 'Rahul Verma',
    email: 'rahul.verma@aviddesigners.com',
    phone: '+91 97110 88234',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    department: 'Engineering',
    designation: 'Lead Frontend Architect',
    joiningDate: '2022-08-01',
    employmentType: 'Full-time',
    status: 'Active',
    salary: 2400000,
    location: 'Mumbai, Maharashtra',
    dob: '1992-11-22',
    gender: 'Male',
    address: 'Bandra West, Hill Road, Mumbai 400050',
    emergencyContact: {
      name: 'Pooja Verma',
      relationship: 'Spouse',
      phone: '+91 98450 99881'
    },
    bankDetails: {
      bankName: 'ICICI Bank Ltd',
      accountNumber: '••••••••7721',
      ifsc: 'ICIC0000921',
      pan: 'RAHUV77189L'
    },
    documents: [
      { name: 'Offer_Letter_Rahul.pdf', type: 'PDF', size: '2.1 MB', date: '2022-07-28' },
      { name: 'Aadhaar_PAN_Verification.pdf', type: 'PDF', size: '1.2 MB', date: '2022-08-01' }
    ]
  },
  {
    id: 'emp-3',
    empId: 'AD-1003',
    name: 'Priya Sharma',
    email: 'priya.sharma@aviddesigners.com',
    phone: '+91 99234 55678',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    department: 'Human Resources',
    designation: 'Head of People & Culture',
    joiningDate: '2021-05-10',
    employmentType: 'Full-time',
    status: 'Active',
    salary: 2100000,
    location: 'Delhi NCR',
    dob: '1991-09-04',
    gender: 'Female',
    address: 'DLF Phase 5, Gurugram, Haryana 122009',
    emergencyContact: {
      name: 'Dr. Alok Sharma',
      relationship: 'Brother',
      phone: '+91 99110 33445'
    },
    bankDetails: {
      bankName: 'State Bank of India',
      accountNumber: '••••••••3119',
      ifsc: 'SBIN000088',
      pan: 'PRIYS4552A'
    },
    documents: [
      { name: 'HR_Director_Agreement.pdf', type: 'PDF', size: '2.5 MB', date: '2021-05-08' }
    ]
  },
  {
    id: 'emp-4',
    empId: 'AD-1004',
    name: 'Rajesh Malhotra',
    email: 'rajesh.m@aviddesigners.com',
    phone: '+91 98450 12345',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    department: 'Product & Design',
    designation: 'Senior Project Manager',
    joiningDate: '2023-01-16',
    employmentType: 'Full-time',
    status: 'Active',
    salary: 2250000,
    location: 'Hyderabad, Telangana',
    dob: '1993-02-14',
    gender: 'Male',
    address: 'Hitech City, Madhapur, Hyderabad 500081',
    emergencyContact: {
      name: 'Sunita Malhotra',
      relationship: 'Mother',
      phone: '+91 98765 43210'
    },
    bankDetails: {
      bankName: 'Axis Bank Ltd',
      accountNumber: '••••••••9044',
      ifsc: 'UTIB000044',
      pan: 'RAJEM8812N'
    },
    documents: [
      { name: 'PM_Offer_Pack.pdf', type: 'PDF', size: '1.9 MB', date: '2023-01-10' }
    ]
  },
  {
    id: 'emp-5',
    empId: 'AD-1005',
    name: 'Diya Kapoor',
    email: 'diya.kapoor@aviddesigners.com',
    phone: '+91 97654 32109',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    department: 'Marketing & Sales',
    designation: 'Growth Marketing Lead',
    joiningDate: '2023-09-01',
    employmentType: 'Full-time',
    status: 'On Leave',
    salary: 1750000,
    location: 'Pune, Maharashtra',
    dob: '1996-08-30',
    gender: 'Female',
    address: 'Koregaon Park, Lane 7, Pune 411001',
    emergencyContact: {
      name: 'Aman Kapoor',
      relationship: 'Brother',
      phone: '+91 98220 11998'
    },
    bankDetails: {
      bankName: 'Kotak Mahindra Bank',
      accountNumber: '••••••••5561',
      ifsc: 'KKBK000012',
      pan: 'DIYAK3390B'
    },
    documents: [
      { name: 'Contract_Diya.pdf', type: 'PDF', size: '1.4 MB', date: '2023-08-25' }
    ]
  },
  {
    id: 'emp-6',
    empId: 'AD-1006',
    name: 'Ishaan Roy',
    email: 'ishaan.roy@aviddesigners.com',
    phone: '+91 98300 77889',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    department: 'Engineering',
    designation: 'Full Stack Engineer',
    joiningDate: '2024-02-01',
    employmentType: 'Full-time',
    status: 'Probation',
    salary: 1600000,
    location: 'Chennai, Tamil Nadu',
    dob: '1998-04-12',
    gender: 'Male',
    address: 'OMR Road, Thoraipakkam, Chennai 600097',
    emergencyContact: {
      name: 'Suresh Roy',
      relationship: 'Father',
      phone: '+91 94440 22334'
    },
    bankDetails: {
      bankName: 'HDFC Bank Ltd',
      accountNumber: '••••••••1209',
      ifsc: 'HDFC0000921',
      pan: 'ISHAR44091M'
    },
    documents: [
      { name: 'Probation_Offer_Ishaan.pdf', type: 'PDF', size: '1.1 MB', date: '2024-01-20' }
    ]
  }
];

export const mockAttendance: AttendanceRecord[] = [
  {
    id: 'att-1',
    empId: 'AD-1001',
    empName: 'Ananya Sharma',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    date: '2026-08-26',
    clockIn: '09:02 AM',
    clockOut: '06:15 PM',
    workHours: '9h 13m',
    status: 'Present',
    location: 'Bengaluru HQ'
  },
  {
    id: 'att-2',
    empId: 'AD-1002',
    empName: 'Rahul Verma',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    date: '2026-08-26',
    clockIn: '08:45 AM',
    clockOut: '05:50 PM',
    workHours: '9h 05m',
    status: 'Present',
    location: 'Mumbai Office'
  },
  {
    id: 'att-3',
    empId: 'AD-1003',
    empName: 'Priya Sharma',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    date: '2026-08-26',
    clockIn: '09:35 AM',
    clockOut: '06:30 PM',
    workHours: '8h 55m',
    status: 'Late',
    location: 'Delhi NCR Office'
  },
  {
    id: 'att-4',
    empId: 'AD-1004',
    empName: 'Rajesh Malhotra',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    date: '2026-08-26',
    clockIn: '09:00 AM',
    clockOut: '06:00 PM',
    workHours: '9h 00m',
    status: 'Present',
    location: 'Hyderabad Office'
  },
  {
    id: 'att-5',
    empId: 'AD-1005',
    empName: 'Diya Kapoor',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    date: '2026-08-26',
    clockIn: '--',
    clockOut: '--',
    workHours: '0h 00m',
    status: 'On Leave',
    location: 'Remote'
  },
  {
    id: 'att-6',
    empId: 'AD-1006',
    empName: 'Ishaan Roy',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    date: '2026-08-26',
    clockIn: '09:12 AM',
    clockOut: '06:10 PM',
    workHours: '8h 58m',
    status: 'Present',
    location: 'Chennai Office'
  }
];

export const mockLeaveRequests: LeaveRequest[] = [
  {
    id: 'leave-1',
    empId: 'AD-1005',
    empName: 'Diya Kapoor',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    department: 'Marketing & Sales',
    leaveType: 'Annual Leave',
    startDate: '2026-08-25',
    endDate: '2026-08-28',
    days: 4,
    reason: 'Family vacation and personal downtime.',
    status: 'Approved',
    appliedOn: '2026-08-18',
    approvedBy: 'Priya Sharma'
  },
  {
    id: 'leave-2',
    empId: 'AD-1002',
    empName: 'Rahul Verma',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    department: 'Engineering',
    leaveType: 'Sick Leave',
    startDate: '2026-08-30',
    endDate: '2026-08-31',
    days: 2,
    reason: 'Medical checkup and recovery.',
    status: 'Pending',
    appliedOn: '2026-08-25'
  },
  {
    id: 'leave-3',
    empId: 'AD-1001',
    empName: 'Ananya Sharma',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    department: 'UI/UX Design',
    leaveType: 'Casual Leave',
    startDate: '2026-09-04',
    endDate: '2026-09-04',
    days: 1,
    reason: 'Personal errands in Bengaluru.',
    status: 'Pending',
    appliedOn: '2026-08-26'
  }
];

export const mockProjects: Project[] = [
  {
    id: 'proj-1',
    title: 'Office Management App',
    code: 'PRO-001',
    client: 'Apex Global Financial Technologies',
    description: 'Enterprise biometric authentication, micro-investments, and AI transaction insights mobile application.',
    status: 'Active',
    priority: 'High',
    startDate: '2026-06-01',
    deadline: '12/09/2026',
    budget: 6850000,
    spent: 3420000,
    progress: 68,
    category: 'Mobile App',
    leader: {
      name: 'Rajesh Malhotra',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      role: 'Project Manager'
    },
    team: [
      { id: 'emp-1', name: 'Ananya Sharma', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', role: 'UI Lead' },
      { id: 'emp-2', name: 'Rahul Verma', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80', role: 'Frontend Lead' },
      { id: 'emp-6', name: 'Ishaan Roy', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80', role: 'React Native Dev' }
    ],
    milestones: [
      { id: 'm-1', title: 'UX Research & Wireframing', dueDate: '2026-06-25', completed: true },
      { id: 'm-2', title: 'Design System & Hi-Fi Figma Kit', dueDate: '2026-07-20', completed: true },
      { id: 'm-3', title: 'React Native Core Architecture', dueDate: '2026-08-30', completed: false },
      { id: 'm-4', title: 'Security Audit & Sandbox QA', dueDate: '2026-10-15', completed: false }
    ],
    tasks: [
      { id: 't-1', title: 'Design dark mode color tokens', completed: true, assignee: 'Ananya Sharma', dueDate: '2026-08-20', priority: 'High' },
      { id: 't-2', title: 'Integrate UPI / Biometric SDK', completed: false, assignee: 'Rahul Verma', dueDate: '2026-08-28', priority: 'High' },
      { id: 't-3', title: 'Build portfolio card chart', completed: false, assignee: 'Ishaan Roy', dueDate: '2026-09-02', priority: 'Medium' }
    ]
  },
  {
    id: 'proj-2',
    title: 'Clinic Management',
    code: 'PRO-002',
    client: 'Apollo Health Ecosystem',
    description: 'Multi-center health platform with electronic medical records (EMR) and tele-consultation sync.',
    status: 'Active',
    priority: 'Low',
    startDate: '2026-05-15',
    deadline: '24/10/2026',
    budget: 4950000,
    spent: 3840000,
    progress: 82,
    category: 'Web Development',
    leader: {
      name: 'Amit Kumar',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      role: 'Tech Director'
    },
    team: [
      { id: 'emp-2', name: 'Rahul Verma', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80', role: 'Next.js Dev' },
      { id: 'emp-1', name: 'Ananya Sharma', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', role: 'UX Designer' }
    ],
    milestones: [
      { id: 'm-21', title: 'Architecture Schema Setup', dueDate: '2026-06-01', completed: true },
      { id: 'm-22', title: 'Payment Gateway Integration', dueDate: '2026-08-10', completed: true }
    ],
    tasks: [
      { id: 't-21', title: 'Setup Redis caching for doctor schedules', completed: true, assignee: 'Rahul Verma', dueDate: '2026-08-15', priority: 'High' }
    ]
  },
  {
    id: 'proj-3',
    title: 'Educational Platform',
    code: 'PRO-003',
    client: 'Vidya EdTech Network',
    description: 'Comprehensive interactive student portal, live video classes, and quiz assessment engine.',
    status: 'Completed',
    priority: 'Medium',
    startDate: '2026-04-01',
    deadline: '15/02/2026',
    budget: 2750000,
    spent: 2500000,
    progress: 100,
    category: 'Brand Identity',
    leader: {
      name: 'Ananya Sharma',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      role: 'Design Lead'
    },
    team: [
      { id: 'emp-1', name: 'Ananya Sharma', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', role: 'Brand Designer' }
    ],
    milestones: [],
    tasks: []
  },
  {
    id: 'proj-4',
    title: 'Chat & Call Mobile App',
    code: 'PRO-004',
    client: 'Tata Digital Services',
    description: 'High-concurrency WebRTC voice and video calling application with end-to-end encryption.',
    status: 'Overdue',
    priority: 'Low',
    startDate: '2026-03-01',
    deadline: '17/12/2026',
    budget: 7600000,
    spent: 7120000,
    progress: 90,
    category: 'Mobile App',
    leader: {
      name: 'Rajesh Malhotra',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      role: 'Project Manager'
    },
    team: [
      { id: 'emp-2', name: 'Rahul Verma', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80', role: 'Tech Lead' },
      { id: 'emp-6', name: 'Ishaan Roy', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80', role: 'Developer' }
    ],
    milestones: [],
    tasks: []
  },
  {
    id: 'proj-5',
    title: 'B2B Logistics & Supply Hub',
    code: 'PRO-005',
    client: 'Reliance Supply Logistics',
    description: 'Real-time GPS fleet tracking, automated dispatch assignment, and driver analytics.',
    status: 'Active',
    priority: 'Medium',
    startDate: '2026-08-01',
    deadline: '17/10/2026',
    budget: 9500000,
    spent: 4200000,
    progress: 45,
    category: 'Consulting',
    leader: {
      name: 'Amit Kumar',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      role: 'Enterprise Architect'
    },
    team: [
      { id: 'emp-4', name: 'Rajesh Malhotra', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', role: 'Scrum Master' }
    ],
    milestones: [],
    tasks: []
  }
];

export const mockLeads: Lead[] = [
  {
    id: 'lead-1',
    name: 'Sunil Gavaskar',
    company: 'Quantum Dynamics Infotech',
    email: 'sunil.g@quantumdyn.in',
    phone: '+91 98210 55432',
    dealValue: 3850000,
    stage: 'Proposal',
    source: 'Referral',
    assignedTo: {
      name: 'Diya Kapoor',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    },
    probability: 75,
    expectedClose: '2026-09-15',
    notes: 'Interested in complete UI/UX overhaul of their B2B analytics platform.',
    activities: [
      { id: 'act-1', type: 'meeting', title: 'Discovery video conference with CTO & Head of Product', timestamp: '2026-08-20 14:00', user: 'Diya Kapoor' },
      { id: 'act-2', type: 'note', title: 'Sent commercial proposal v1.2 with 3-phase delivery timeline', timestamp: '2026-08-24 10:30', user: 'Diya Kapoor' }
    ]
  },
  {
    id: 'lead-2',
    name: 'Karan Mehra',
    company: 'IndiGo Aviation Labs',
    email: 'karan@indigoaviation.in',
    phone: '+91 99100 23456',
    dealValue: 5200000,
    stage: 'Qualified',
    source: 'Website',
    assignedTo: {
      name: 'Amit Kumar',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    },
    probability: 60,
    expectedClose: '2026-10-01',
    notes: 'Looking for flight dispatch tracking dashboard with high concurrency WebSockets.',
    activities: [
      { id: 'act-3', type: 'call', title: 'Initial 30-min qualification call', timestamp: '2026-08-22 16:15', user: 'Amit Kumar' }
    ]
  },
  {
    id: 'lead-3',
    name: 'Ritu Nambiar',
    company: 'Solaria Clean Energy India',
    email: 'r.nambiar@solariaenergy.in',
    phone: '+91 98401 77654',
    dealValue: 7400000,
    stage: 'Won',
    source: 'LinkedIn',
    assignedTo: {
      name: 'Diya Kapoor',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    },
    probability: 100,
    expectedClose: '2026-08-25',
    notes: 'Contract signed! Master services agreement executed.',
    activities: [
      { id: 'act-4', type: 'status_change', title: 'Deal marked as WON (₹74,00,000)', timestamp: '2026-08-25 11:00', user: 'Diya Kapoor' }
    ]
  },
  {
    id: 'lead-4',
    name: 'Sanjay Deshmukh',
    company: 'Taj Luxury Resorts Ltd',
    email: 'sanjay.d@tajhospitality.in',
    phone: '+91 98220 90001',
    dealValue: 2800000,
    stage: 'Contacted',
    source: 'Events',
    assignedTo: {
      name: 'Rajesh Malhotra',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    },
    probability: 40,
    expectedClose: '2026-10-15',
    notes: 'Met at Bengaluru Tech Expo. Follow up scheduled for next Monday.',
    activities: [
      { id: 'act-5', type: 'email', title: 'Sent portfolio case studies and rate card', timestamp: '2026-08-24 09:00', user: 'Rajesh Malhotra' }
    ]
  },
  {
    id: 'lead-5',
    name: 'Pooja Saxena',
    company: 'FinShiksha EdTech',
    email: 'pooja.s@finshiksha.in',
    phone: '+91 97110 99887',
    dealValue: 1950000,
    stage: 'New',
    source: 'Website',
    assignedTo: {
      name: 'Diya Kapoor',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    },
    probability: 20,
    expectedClose: '2026-11-01',
    notes: 'Inbound web lead requesting mobile app redesign.',
    activities: [
      { id: 'act-6', type: 'note', title: 'Lead submitted web inquiry form', timestamp: '2026-08-26 08:30', user: 'System' }
    ]
  }
];

export const mockInvoices: Invoice[] = [
  {
    id: 'inv-1',
    invoiceNumber: '#INV-001',
    clientName: 'Redesign Website (Logistics Corp)',
    clientEmail: 'billing@logisticscorp.in',
    clientAddress: 'Nariman Point, Marine Drive, Mumbai 400021',
    issueDate: '2026-08-01',
    dueDate: '2026-08-31',
    status: 'Paid',
    subtotal: 2370000,
    taxRate: 18,
    taxAmount: 426600,
    discount: 0,
    totalAmount: 2796600,
    notes: 'Payment received via NEFT/RTGS Transfer.',
    paymentMethod: 'RTGS / Bank Transfer',
    paidDate: '2026-08-15',
    items: [
      { id: 'ii-1', description: 'Logistics Web App UI/UX Redesign Sprint 1 & 2', quantity: 1, unitPrice: 1600000, amount: 1600000 },
      { id: 'ii-2', description: 'Real-time Tracking Map Telemetry Integration', quantity: 1, unitPrice: 770000, amount: 770000 }
    ]
  },
  {
    id: 'inv-2',
    invoiceNumber: '#INV-002',
    clientName: 'Module Completion (VIP Corp)',
    clientEmail: 'accounts@vipcorp.in',
    clientAddress: 'MG Road, Bengaluru 560001',
    issueDate: '2026-08-10',
    dueDate: '2026-09-10',
    status: 'Pending',
    subtotal: 1920000,
    taxRate: 18,
    taxAmount: 345600,
    discount: 80000,
    totalAmount: 2185600,
    notes: 'Net 30 payment terms. Please include #INV-002 in remittance remarks.',
    items: [
      { id: 'ii-3', description: 'Headless E-Commerce Architecture Setup', quantity: 1, unitPrice: 1440000, amount: 1440000 },
      { id: 'ii-4', description: 'Payment Gateway Integration', quantity: 1, unitPrice: 480000, amount: 480000 }
    ]
  },
  {
    id: 'inv-3',
    invoiceNumber: '#INV-003',
    clientName: 'Change on Emp Module (Ignis LLP)',
    clientEmail: 'ap@ignisllp.in',
    clientAddress: 'Cyber City, Phase 2, Gurugram 122002',
    issueDate: '2026-07-15',
    dueDate: '2026-08-15',
    status: 'Overdue',
    subtotal: 3600000,
    taxRate: 18,
    taxAmount: 648000,
    discount: 0,
    totalAmount: 4248000,
    notes: 'Past due notice sent. Please expedite wire remittance.',
    items: [
      { id: 'ii-5', description: 'Employee Self Service Portal Architecture', quantity: 1, unitPrice: 3600000, amount: 3600000 }
    ]
  },
  {
    id: 'inv-4',
    invoiceNumber: '#INV-004',
    clientName: 'Hospital Management (HCL Corp)',
    clientEmail: 'finance@hclcorp.in',
    clientAddress: 'OMR Road, Chennai 600119',
    issueDate: '2026-08-25',
    dueDate: '2026-09-25',
    status: 'Paid',
    subtotal: 2240000,
    taxRate: 18,
    taxAmount: 403200,
    discount: 0,
    totalAmount: 2643200,
    notes: 'Initial milestone payment settled in full.',
    paymentMethod: 'Corporate Net Banking',
    paidDate: '2026-08-26',
    items: [
      { id: 'ii-6', description: 'Hospital OPD & Pharmacy Sync Engine', quantity: 1, unitPrice: 2240000, amount: 2240000 }
    ]
  }
];

export const mockExpenses: Expense[] = [
  {
    id: 'exp-1',
    title: 'Figma Enterprise Organization Annual Plan',
    category: 'Software & Tools',
    amount: 365000,
    date: '2026-08-12',
    recordedBy: 'Amit Kumar',
    paymentMethod: 'Corporate Card',
    status: 'Approved',
    receiptAttached: true
  },
  {
    id: 'exp-2',
    title: 'AWS Mumbai Cloud Hosting & RDS Database',
    category: 'Software & Tools',
    amount: 268000,
    date: '2026-08-01',
    recordedBy: 'Rahul Verma',
    paymentMethod: 'Credit Card',
    status: 'Approved',
    receiptAttached: true
  },
  {
    id: 'exp-3',
    title: 'Client Onsite Workshop Flights (BLR - BOM)',
    category: 'Travel',
    amount: 148000,
    date: '2026-08-18',
    recordedBy: 'Rajesh Malhotra',
    paymentMethod: 'Corporate Card',
    status: 'Pending',
    receiptAttached: true
  },
  {
    id: 'exp-4',
    title: 'Ergonomic Office Desks & 4K Displays',
    category: 'Equipment',
    amount: 415000,
    date: '2026-08-05',
    recordedBy: 'Priya Sharma',
    paymentMethod: 'Bank Transfer',
    status: 'Approved',
    receiptAttached: true
  },
  {
    id: 'exp-5',
    title: 'Q3 LinkedIn & Digital Ads Campaign',
    category: 'Marketing',
    amount: 545000,
    date: '2026-08-20',
    recordedBy: 'Diya Kapoor',
    paymentMethod: 'Corporate Card',
    status: 'Approved',
    receiptAttached: true
  }
];

export const mockJobOpenings: JobOpening[] = [
  {
    id: 'job-1',
    title: 'Senior Staff UI/UX Designer',
    department: 'Product & Design',
    location: 'Bengaluru / Hybrid',
    type: 'Full-time',
    experience: '5+ years',
    openings: 2,
    applicantsCount: 48,
    status: 'Active',
    postedDate: '2026-08-01',
    deadline: '2026-09-30',
    salaryRange: '₹18,00,000 - ₹24,00,000',
    description: 'We are looking for a visionary Lead UI/UX designer to craft world-class SaaS enterprise experiences and define our high-craft design systems.'
  },
  {
    id: 'job-2',
    title: 'Principal React / Next.js Engineer',
    department: 'Engineering',
    location: 'Mumbai / Hybrid',
    type: 'Full-time',
    experience: '6+ years',
    openings: 3,
    applicantsCount: 62,
    status: 'Active',
    postedDate: '2026-08-05',
    deadline: '2026-09-15',
    salaryRange: '₹24,00,000 - ₹32,00,000',
    description: 'Drive frontend architecture, WebGL/Canvas micro-interactions, state management, and high-performance web applications.'
  },
  {
    id: 'job-3',
    title: 'Enterprise Account Executive (CRM)',
    department: 'Marketing & Sales',
    location: 'Delhi NCR',
    type: 'Full-time',
    experience: '4+ years',
    openings: 1,
    applicantsCount: 29,
    status: 'Active',
    postedDate: '2026-08-10',
    deadline: '2026-09-20',
    salaryRange: '₹15,00,000 + OTE',
    description: 'Lead high-value design agency client acquisitions and strategic technical consulting deals.'
  },
  {
    id: 'job-4',
    title: 'HR Operations & People Partner',
    department: 'Human Resources',
    location: 'Hyderabad',
    type: 'Full-time',
    experience: '3+ years',
    openings: 1,
    applicantsCount: 19,
    status: 'Draft',
    postedDate: '2026-08-22',
    deadline: '2026-10-15',
    salaryRange: '₹12,00,000 - ₹15,00,000',
    description: 'Manage onboarding, benefits administration, employee engagement, and performance review cycles.'
  }
];

export const mockCandidates: Candidate[] = [
  {
    id: 'cand-1',
    name: 'Meera Das',
    email: 'meera.das@gmail.com',
    phone: '+91 98451 22334',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    jobId: 'job-1',
    jobTitle: 'Senior Staff UI/UX Designer',
    stage: 'Interview',
    rating: 4.8,
    appliedDate: '2026-08-12',
    experienceYears: 6,
    currentCompany: 'Flipkart Design Studio',
    expectedSalary: '₹22,00,000',
    resumeUrl: 'Resume_Meera_Das.pdf',
    skills: ['Figma Tokens', 'Design Systems', 'Prototyping', 'User Research'],
    scheduledInterview: {
      date: '2026-08-28',
      time: '11:00 AM',
      interviewer: 'Ananya Sharma',
      type: 'Technical'
    }
  },
  {
    id: 'cand-2',
    name: 'Kunal Verma',
    email: 'kunal.verma@devmail.in',
    phone: '+91 97110 55667',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    jobId: 'job-2',
    jobTitle: 'Principal React / Next.js Engineer',
    stage: 'Assessment',
    rating: 4.9,
    appliedDate: '2026-08-10',
    experienceYears: 7,
    currentCompany: 'Swiggy Tech Labs',
    expectedSalary: '₹28,00,000',
    resumeUrl: 'Resume_Kunal_Verma.pdf',
    skills: ['React 18', 'TypeScript', 'Next.js', 'Turborepo', 'Node.js']
  },
  {
    id: 'cand-3',
    name: 'Pooja Saxena',
    email: 'pooja.saxena@designmail.in',
    phone: '+91 98200 44556',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    jobId: 'job-1',
    jobTitle: 'Senior Staff UI/UX Designer',
    stage: 'Offered',
    rating: 5.0,
    appliedDate: '2026-08-05',
    experienceYears: 8,
    currentCompany: 'CRED Product Studio',
    expectedSalary: '₹24,00,000',
    resumeUrl: 'Resume_Pooja_Saxena.pdf',
    skills: ['Design Systems', 'Micro-interactions', 'Product Strategy']
  },
  {
    id: 'cand-4',
    name: 'Harish Iyer',
    email: 'harish.iyer@salescloud.in',
    phone: '+91 98400 33221',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    jobId: 'job-3',
    jobTitle: 'Enterprise Account Executive (CRM)',
    stage: 'Screening',
    rating: 4.2,
    appliedDate: '2026-08-20',
    experienceYears: 5,
    currentCompany: 'Zoho Partner Ecosystem',
    expectedSalary: '₹16,00,000',
    resumeUrl: 'Resume_Harish_Iyer.pdf',
    skills: ['B2B Sales', 'HubSpot', 'Contract Negotiation', 'SaaS GTM']
  },
  {
    id: 'cand-5',
    name: 'Ananya Sen',
    email: 'ananya.sen@frontenddaily.in',
    phone: '+91 98310 99881',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    jobId: 'job-2',
    jobTitle: 'Principal React / Next.js Engineer',
    stage: 'Applied',
    rating: 4.5,
    appliedDate: '2026-08-24',
    experienceYears: 4,
    currentCompany: 'Razorpay Labs',
    expectedSalary: '₹20,00,000',
    resumeUrl: 'Resume_Ananya_Sen.pdf',
    skills: ['React', 'TypeScript', 'Tailwind', 'GraphQL']
  }
];

export const mockAuditLogs: AuditLog[] = [
  {
    id: 'log-1',
    user: 'Priya Sharma',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    action: 'Approved annual leave request',
    target: 'Diya Kapoor (4 days)',
    timestamp: '2026-08-26 14:15:32',
    ipAddress: '192.168.1.104',
    type: 'update'
  },
  {
    id: 'log-2',
    user: 'Amit Kumar',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    action: 'Created new project record',
    target: 'PRO-005 B2B Logistics Hub',
    timestamp: '2026-08-26 11:20:04',
    ipAddress: '192.168.1.101',
    type: 'create'
  },
  {
    id: 'log-3',
    user: 'Sneha Patel',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    action: 'Disbursed monthly payroll & generated tax slips',
    target: 'August 2026 Batch (6 employees)',
    timestamp: '2026-08-25 17:45:00',
    ipAddress: '192.168.1.112',
    type: 'update'
  },
  {
    id: 'log-4',
    user: 'Vikram Singhania',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    action: 'Released official offer letter',
    target: 'Pooja Saxena (Senior Staff UI/UX Designer)',
    timestamp: '2026-08-25 15:30:18',
    ipAddress: '192.168.1.108',
    type: 'create'
  },
  {
    id: 'log-5',
    user: 'Amit Kumar',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    action: 'Updated RBAC permissions for Project Managers',
    target: 'Module: Finance (View only)',
    timestamp: '2026-08-24 16:00:22',
    ipAddress: '192.168.1.101',
    type: 'update'
  }
];

export const mockNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'New Leave Request',
    message: 'Rahul Verma requested 2 days Sick Leave starting Aug 30.',
    timestamp: '15 mins ago',
    type: 'warning',
    read: false
  },
  {
    id: 'notif-2',
    title: 'Invoice Payment Received',
    message: 'HCL Corp settled Invoice #INV-004 for ₹26,43,200.',
    timestamp: '1 hour ago',
    type: 'success',
    read: false
  },
  {
    id: 'notif-3',
    title: 'Candidate Interview Scheduled',
    message: 'Meera Das interview confirmed for tomorrow at 11:00 AM.',
    timestamp: '3 hours ago',
    type: 'info',
    read: true
  },
  {
    id: 'notif-4',
    title: 'Project Milestone Pending',
    message: 'Chat & Call Mobile App security audit requires sign-off.',
    timestamp: '5 hours ago',
    type: 'error',
    read: true
  }
];

export const mockBirthdaysAndEvents = [
  {
    id: 'evt-1',
    name: 'Ananya Sen',
    type: 'Today',
    date: 'Today',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'Accountant'
  },
  {
    id: 'evt-2',
    name: 'Diya Kapoor',
    type: 'Tomorrow',
    date: 'Tomorrow',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    role: 'Developer'
  },
  {
    id: 'evt-3',
    name: 'Kunal Verma',
    type: 'Tomorrow',
    date: 'Tomorrow',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    role: 'Executive Officer'
  },
  {
    id: 'evt-4',
    name: 'Harish Iyer',
    type: '25 Jan 2026',
    date: '25 Jan 2026',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    role: 'Team Lead'
  }
];
