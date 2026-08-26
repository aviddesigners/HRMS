import React, { useState } from 'react';
import {
  Users2,
  Building2,
  Calendar,
  Clock,
  Plus,
  Grid,
  List,
  LayoutGrid,
  CheckCircle2,
  CheckCircle,
  AlertTriangle,
  ArrowLeft,
  Download,
  ChevronDown,
  ChevronUp,
  MoreVertical,
  Mail,
  Phone,
  MapPin,
  FileText,
  Briefcase,
  ShieldCheck,
  Award,
  Globe,
  DollarSign,
  UserCheck,
  Edit2,
  Trash2,
  Info,
  Layers,
  CalendarCheck,
  RotateCw,
  Copy,
  MessageSquare,
  Check
} from 'lucide-react';
import { useHRMS } from '../../context/HRMSContext';
import { useToast } from '../../context/ToastContext';
import { Avatar } from '../../components/common/Avatar';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Card, CardHeader, CardBody } from '../../components/common/Card';
import { Modal } from '../../components/common/Modal';
import { AddEmployeeModal } from './AddEmployeeModal';

export const HRMPage: React.FC = () => {
  const { employees, isClockedIn, clockInTime, toggleClockInOut, leaveRequests, applyLeave, hrmTab, setHrmTab } = useHRMS();
  const { showToast } = useToast();

  const hrmSection = hrmTab;
  const setHrmSection = setHrmTab;
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
  
  // Modals
  const [isAddEmpOpen, setIsAddEmpOpen] = useState(false);
  const [isAddLeaveOpen, setIsAddLeaveOpen] = useState(false);
  const [isAddDesignationOpen, setIsAddDesignationOpen] = useState(false);
  const [activeProjectTab, setActiveProjectTab] = useState<'projects' | 'assets'>('projects');

  // Form states for Add Designation
  const [newDesigTitle, setNewDesigTitle] = useState('');
  const [newDesigDept, setNewDesigDept] = useState('UI / UX');

  // Form states for Add Leave
  const [leaveEmp, setLeaveEmp] = useState('Stephan Peralt');
  const [leaveType, setLeaveType] = useState<'Casual Leave' | 'Sick Leave' | 'Annual Leave' | 'Maternity/Paternity' | 'Unpaid'>('Casual Leave');
  const [leaveFrom, setLeaveFrom] = useState('2026-09-01');
  const [leaveTo, setLeaveTo] = useState('2026-09-03');
  const [leaveReason, setLeaveReason] = useState('');

  // 12 Employee records matching Figma Image 2 exactly
  const employeeGridItems = [
    {
      id: 'EMP-0001',
      name: 'Anthony Lewis',
      role: 'Software Developer',
      roleColor: '#EC4899',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      borderColor: '#FF7A00',
      projects: 20,
      done: 13,
      progress: 7,
      productivity: 85,
      prodColor: '#8B5CF6'
    },
    {
      id: 'EMP-0002',
      name: 'Brian Villalobos',
      role: 'Developer',
      roleColor: '#8B5CF6',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      borderColor: '#0284C7',
      projects: 30,
      done: 10,
      progress: 20,
      productivity: 30,
      prodColor: '#F59E0B'
    },
    {
      id: 'EMP-0003',
      name: 'Harvey Smith',
      role: 'Developer',
      roleColor: '#8B5CF6',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      borderColor: '#B45309',
      projects: 25,
      done: 7,
      progress: 18,
      productivity: 20,
      prodColor: '#EF4444'
    },
    {
      id: 'EMP-0004',
      name: 'Stephan Peralt',
      role: 'Software Developer',
      roleColor: '#64748B',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
      borderColor: '#B45309',
      projects: 15,
      done: 13,
      progress: 2,
      productivity: 90,
      prodColor: '#10B981',
      experience: '10+ years of Experience',
      team: 'UI/UX Design',
      dateOfJoin: '1st Jan 2023',
      reportOffice: { name: 'Doglas Martini', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
      phone: '+1 458 7877 879',
      email: 'perralt12@example.com',
      gender: 'Male',
      dob: '24th July 2000',
      address: '1861 Bayonne Ave, Manchester, NJ, 08759',
      passportNo: 'QRET4566FGRT',
      passportExp: '15 May 2029',
      nationality: 'Indian',
      religion: 'Christianity',
      maritalStatus: 'Yes',
      spouseEmployment: 'No',
      children: '2',
      emergencyPrimary: 'Adrian Peralt • Father',
      emergencyPrimaryPhone: '+1 127 2685 598',
      emergencySecondary: 'Karen Wills • Mother',
      emergencySecondaryPhone: '+1 989 7774 787',
      bankName: 'Swiz International Bank',
      accountNo: '159843014641',
      ifsc: 'ICI24504',
      branch: 'Alabama USA',
      family: { name: 'Hendry Peralt', relation: 'Brother', dob: '25 May 2014', phone: '+1 265 6956 961' }
    },
    {
      id: 'EMP-0005',
      name: 'Doglas Martini',
      role: 'Full Stack Developer',
      roleColor: '#0284C7',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      borderColor: '#FF7A00',
      projects: 15,
      done: 2,
      progress: 13,
      productivity: 10,
      prodColor: '#EF4444'
    },
    {
      id: 'EMP-0006',
      name: 'Linda Ray',
      role: 'Software Developer',
      roleColor: '#EC4899',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      borderColor: '#0284C7',
      projects: 20,
      done: 10,
      progress: 10,
      productivity: 50,
      prodColor: '#8B5CF6'
    },
    {
      id: 'EMP-0007',
      name: 'Elliot Murray',
      role: 'Developer',
      roleColor: '#8B5CF6',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
      borderColor: '#B45309',
      projects: 40,
      done: 35,
      progress: 5,
      productivity: 93,
      prodColor: '#10B981'
    },
    {
      id: 'EMP-0008',
      name: 'Rebecca Smith',
      role: 'Tester',
      roleColor: '#0284C7',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      borderColor: '#0284C7',
      projects: 30,
      done: 22,
      progress: 8,
      productivity: 80,
      prodColor: '#EC4899'
    },
    {
      id: 'EMP-0009',
      name: 'Connie Waters',
      role: 'Software Developer',
      roleColor: '#EC4899',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      borderColor: '#EC4899',
      projects: 25,
      done: 11,
      progress: 14,
      productivity: 35,
      prodColor: '#F59E0B'
    },
    {
      id: 'EMP-0010',
      name: 'Lori Broaddus',
      role: 'Full Stack Developer',
      roleColor: '#0284C7',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      borderColor: '#0284C7',
      projects: 40,
      done: 27,
      progress: 16,
      productivity: 75,
      prodColor: '#EC4899'
    },
    {
      id: 'EMP-0011',
      name: 'Trent Frazier',
      role: 'Software Developer',
      roleColor: '#8B5CF6',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
      borderColor: '#B45309',
      projects: 30,
      done: 17,
      progress: 13,
      productivity: 60,
      prodColor: '#8B5CF6'
    },
    {
      id: 'EMP-0012',
      name: 'Norene Valle',
      role: 'Trainee',
      roleColor: '#EF4444',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
      borderColor: '#0284C7',
      projects: 10,
      done: 1,
      progress: 9,
      productivity: 10,
      prodColor: '#EF4444'
    }
  ];

  // 10 Designations matching Figma
  const [designations, setDesignations] = useState([
    { id: 'DES-01', title: 'Accountant', dept: 'Finance', count: '10', status: 'Active' },
    { id: 'DES-02', title: 'App Developer', dept: 'Application Development', count: '15', status: 'Active' },
    { id: 'DES-03', title: 'Technician', dept: 'IT Management', count: '08', status: 'Active' },
    { id: 'DES-04', title: 'Web Developer', dept: 'Web Development', count: '10', status: 'Active' },
    { id: 'DES-05', title: 'Sales Executive Officer', dept: 'Sales', count: '10', status: 'Active' },
    { id: 'DES-06', title: 'Designer', dept: 'UI / UX', count: '15', status: 'Active' },
    { id: 'DES-07', title: 'Account Manager', dept: 'Account Management', count: '08', status: 'Active' },
    { id: 'DES-08', title: 'SEO Analyst', dept: 'Marketing', count: '10', status: 'Inactive' },
    { id: 'DES-09', title: 'Admin', dept: 'Administration', count: '05', status: 'Active' },
    { id: 'DES-10', title: 'Business Analyst', dept: 'Business Development', count: '07', status: 'Active' }
  ]);

  // 10 Leaves matching Figma
  const leaveRows = [
    { name: 'Rajesh Malhotra', dept: 'Finance', type: 'Medical Leave', from: '14/01/2026', to: '15/01/2026', days: '2 Days', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
    { name: 'Vikram Singhania', dept: 'Developer', type: 'Casual Leave', from: '21/01/2026', to: '25/01/2026', days: '5 Days', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
    { name: 'Amit Kumar', dept: 'Developer', type: 'Medical Leave', from: '20/02/2026', to: '22/02/2026', days: '3 Days', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
    { name: 'Rahul Verma', dept: 'Executive Officer', type: 'Annual Leave', from: '15/03/2026', to: '17/03/2026', days: '3 Days', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
    { name: 'Diya Kapoor', dept: 'Manager', type: 'Casual Leave', from: '12/04/2026', to: '16/04/2026', days: '5 Days', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
    { name: 'Sneha Patel', dept: 'Finance', type: 'Medical Leave', from: '20/05/2026', to: '21/05/2026', days: '2 Days', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80' },
    { name: 'Ishaan Roy', dept: 'Developer', type: 'Casual Leave', from: '06/07/2026', to: '06/07/2026', days: '1 Day', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' },
    { name: 'Ananya Sharma', dept: 'Executive', type: 'Medical Leave', from: '02/09/2026', to: '04/09/2026', days: '3 Days', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80' },
    { name: 'Priya Sharma', dept: 'Developer', type: 'Annual Leave', from: '15/11/2026', to: '15/11/2026', days: '1 Day', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80' },
    { name: 'Kunal Verma', dept: 'Finance', type: 'Casual Leave', from: '10/12/2026', to: '11/12/2026', days: '2 Days', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' }
  ];

  const handleCreateDesignation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDesigTitle) return;
    setDesignations((prev) => [
      { id: `DES-0${prev.length + 1}`, title: newDesigTitle, dept: newDesigDept, count: '01', status: 'Active' },
      ...prev
    ]);
    showToast(`Designation "${newDesigTitle}" created.`, 'success');
    setIsAddDesignationOpen(false);
    setNewDesigTitle('');
  };

  const handleApplyLeave = (e: React.FormEvent) => {
    e.preventDefault();
    applyLeave({
      empName: leaveEmp,
      empId: 'AD-1001',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      department: 'Engineering',
      leaveType,
      startDate: leaveFrom,
      endDate: leaveTo,
      days: 3,
      reason: leaveReason || 'Personal work'
    });
    showToast(`Leave application submitted for ${leaveEmp}.`, 'success');
    setIsAddLeaveOpen(false);
  };

  /* Navigation Header Pills */
  const renderNavPills = () => (
    <div style={{ display: 'flex', gap: '0.375rem', background: '#F1F5F9', padding: '0.25rem', borderRadius: 'var(--radius-lg)', flexWrap: 'wrap' }}>
      <button
        onClick={() => { setHrmSection('employees'); setSelectedEmployeeId(null); }}
        className={`btn btn-sm ${hrmSection === 'employees' ? 'btn-primary' : 'btn-ghost'}`}
        style={{ fontSize: '0.75rem', borderRadius: 'var(--radius-md)' }}
      >
        <Users2 size={14} /> Employees
      </button>
      <button
        onClick={() => { setHrmSection('attendance'); setSelectedEmployeeId(null); }}
        className={`btn btn-sm ${hrmSection === 'attendance' ? 'btn-primary' : 'btn-ghost'}`}
        style={{ fontSize: '0.75rem', borderRadius: 'var(--radius-md)' }}
      >
        <Clock size={14} /> Attendance
      </button>
      <button
        onClick={() => { setHrmSection('leaves'); setSelectedEmployeeId(null); }}
        className={`btn btn-sm ${hrmSection === 'leaves' ? 'btn-primary' : 'btn-ghost'}`}
        style={{ fontSize: '0.75rem', borderRadius: 'var(--radius-md)' }}
      >
        <CalendarCheck size={14} /> Leaves
      </button>
      <button
        onClick={() => { setHrmSection('designations'); setSelectedEmployeeId(null); }}
        className={`btn btn-sm ${hrmSection === 'designations' ? 'btn-primary' : 'btn-ghost'}`}
        style={{ fontSize: '0.75rem', borderRadius: 'var(--radius-md)' }}
      >
        <Layers size={14} /> Designations
      </button>
    </div>
  );

  /* ------------------------------------------------------------- */
  /* SINGLE EMPLOYEE DETAILS VIEW (Matching Figma Image 1 Exactly) */
  /* ------------------------------------------------------------- */
  if (selectedEmployeeId) {
    const activeEmp = employeeGridItems.find((e) => e.id === selectedEmployeeId) || employeeGridItems[3];

    return (
      <div className="page-container" style={{ gap: '1.25rem' }}>
        {/* Top Header matching Figma Image 1 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <button
            onClick={() => setSelectedEmployeeId(null)}
            className="btn btn-secondary btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8125rem', fontWeight: 600 }}
          >
            <ArrowLeft size={16} /> Employee Details
          </button>

          <Button
            variant="primary"
            size="sm"
            style={{ background: '#FF5B37', borderColor: '#FF5B37', fontWeight: 700, fontSize: '0.8125rem' }}
            onClick={() => showToast('Viewing Bank & Statutory Details...', 'info')}
          >
            Bank &amp; Statutory
          </Button>
        </div>

        {/* 2-Column Main Layout matching Figma Image 1 */}
        <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: '1.25rem', alignItems: 'flex-start' }}>
          {/* Left Column (Hero Card + Basic + Personal + Emergency) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* 1. Hero Card */}
            <Card>
              <div
                style={{
                  background: 'linear-gradient(135deg, #FF7A00 0%, #FF5B37 100%)',
                  height: '90px',
                  borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0',
                  position: 'relative'
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-38px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '76px',
                    height: '76px',
                    borderRadius: '50%',
                    border: '4px solid #FFFFFF',
                    overflow: 'hidden',
                    background: '#FFFFFF',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                >
                  <img src={activeEmp.avatar} alt={activeEmp.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>

              <div style={{ padding: '3rem 1.25rem 1.25rem', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem' }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#1E293B' }}>{activeEmp.name}</h3>
                  <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                    <Check size={10} strokeWidth={3} />
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#FFFFFF', background: '#1E293B', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-pill)' }}>
                    • {activeEmp.role}
                  </span>
                  <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#0284C7', background: '#E0F2FE', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-pill)' }}>
                    10+ years of Experience
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.75rem', color: '#64748B', marginTop: '0.75rem', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Employee ID</span>
                    <strong style={{ color: '#1E293B' }}>{activeEmp.id}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Team</span>
                    <strong style={{ color: '#1E293B' }}>{activeEmp.team || 'UI/UX Design'}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Date Of Join</span>
                    <strong style={{ color: '#1E293B' }}>{activeEmp.dateOfJoin || '1st Jan 2023'}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Report Office</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                      <Avatar src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" name="Doglas Martini" size="xs" />
                      <strong style={{ color: '#1E293B' }}>Doglas Martini</strong>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '0.75rem' }}>
                  <button
                    className="btn btn-sm"
                    style={{ background: '#1E293B', color: '#FFFFFF', fontWeight: 700, fontSize: '0.75rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}
                    onClick={() => showToast('Editing employee profile...', 'info')}
                  >
                    <Edit2 size={12} /> Edit Info
                  </button>
                  <button
                    className="btn btn-sm"
                    style={{ background: '#FF5B37', color: '#FFFFFF', fontWeight: 700, fontSize: '0.75rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}
                    onClick={() => showToast(`Sending message to ${activeEmp.name}...`, 'info')}
                  >
                    <MessageSquare size={12} /> Message
                  </button>
                </div>
              </div>
            </Card>

            {/* 2. Basic Information */}
            <Card>
              <div style={{ padding: '0.875rem 1rem', borderBottom: '1px solid var(--color-border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <strong style={{ fontSize: '0.875rem', color: '#1E293B' }}>Basic information</strong>
                <div style={{ display: 'flex', gap: '0.375rem', color: '#94A3B8' }}>
                  <Edit2 size={13} style={{ cursor: 'pointer' }} />
                  <ChevronDown size={14} style={{ cursor: 'pointer' }} />
                </div>
              </div>
              <CardBody style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94A3B8' }}>Phone</span>
                  <strong style={{ color: '#1E293B' }}>+1 458 7877 879</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#94A3B8' }}>Email</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-primary)', fontWeight: 600 }}>
                    <span>perralt12@example.com</span>
                    <Copy size={11} style={{ cursor: 'pointer' }} onClick={() => showToast('Email copied to clipboard', 'success')} />
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94A3B8' }}>Gender</span>
                  <strong style={{ color: '#1E293B' }}>Male</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94A3B8' }}>Birthday</span>
                  <strong style={{ color: '#1E293B' }}>24th July 2000</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ color: '#94A3B8' }}>Address</span>
                  <strong style={{ color: '#1E293B', textAlign: 'right', maxWidth: '170px' }}>1861 Bayonne Ave, Manchester, NJ, 08759</strong>
                </div>
              </CardBody>
            </Card>

            {/* 3. Personal Information */}
            <Card>
              <div style={{ padding: '0.875rem 1rem', borderBottom: '1px solid var(--color-border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <strong style={{ fontSize: '0.875rem', color: '#1E293B' }}>Personal Information</strong>
                <div style={{ display: 'flex', gap: '0.375rem', color: '#94A3B8' }}>
                  <Edit2 size={13} style={{ cursor: 'pointer' }} />
                  <ChevronDown size={14} style={{ cursor: 'pointer' }} />
                </div>
              </div>
              <CardBody style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94A3B8' }}>Passport No</span>
                  <strong style={{ color: '#1E293B' }}>QRET4566FGRT</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94A3B8' }}>Passport Exp Date</span>
                  <strong style={{ color: '#1E293B' }}>15 May 2029</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94A3B8' }}>Nationality</span>
                  <strong style={{ color: '#1E293B' }}>Indian</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94A3B8' }}>Religion</span>
                  <strong style={{ color: '#1E293B' }}>Christianity</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94A3B8' }}>Marital status</span>
                  <strong style={{ color: '#1E293B' }}>Yes</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94A3B8' }}>Employment of spouse</span>
                  <strong style={{ color: '#1E293B' }}>No</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94A3B8' }}>No. of children</span>
                  <strong style={{ color: '#1E293B' }}>2</strong>
                </div>
              </CardBody>
            </Card>

            {/* 4. Emergency Contact Number */}
            <Card>
              <div style={{ padding: '0.875rem 1rem', borderBottom: '1px solid var(--color-border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <strong style={{ fontSize: '0.875rem', color: '#1E293B' }}>Emergency Contact Number</strong>
                <Edit2 size={13} style={{ color: '#94A3B8', cursor: 'pointer' }} />
              </div>
              <CardBody style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.75rem' }}>
                <div>
                  <span style={{ color: '#94A3B8' }}>Primary</span>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.15rem' }}>
                    <strong style={{ color: '#1E293B' }}>Adrian Peralt • Father</strong>
                    <span style={{ color: '#64748B' }}>+1 127 2685 598</span>
                  </div>
                </div>
                <div style={{ borderTop: '1px solid var(--color-border-subtle)', paddingTop: '0.5rem' }}>
                  <span style={{ color: '#94A3B8' }}>Secondry</span>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.15rem' }}>
                    <strong style={{ color: '#1E293B' }}>Karen Wills • Mother</strong>
                    <span style={{ color: '#64748B' }}>+1 989 7774 787</span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Right Column (About + Bank + Family + Education/Experience + Projects/Assets) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* 1. About Employee */}
            <Card>
              <div style={{ padding: '0.875rem 1.25rem', borderBottom: '1px solid var(--color-border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <strong style={{ fontSize: '0.9375rem', color: '#1E293B' }}>About Employee</strong>
                <div style={{ display: 'flex', gap: '0.375rem', color: '#94A3B8' }}>
                  <Edit2 size={13} style={{ cursor: 'pointer' }} />
                  <ChevronDown size={14} style={{ cursor: 'pointer' }} />
                </div>
              </div>
              <CardBody style={{ padding: '1.25rem', fontSize: '0.8125rem', color: '#475569', lineHeight: 1.65 }}>
                As an award winning designer, I deliver exceptional quality work and bring value to your brand! With 10 years of experience and 350+ projects completed worldwide with satisfied customers, I developed the 360° brand approach, which helped me to create numerous brands that are relevant, meaningful and loved.
              </CardBody>
            </Card>

            {/* 2. Bank Information */}
            <Card>
              <div style={{ padding: '0.875rem 1.25rem', borderBottom: '1px solid var(--color-border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <strong style={{ fontSize: '0.9375rem', color: '#1E293B' }}>Bank Information</strong>
                <div style={{ display: 'flex', gap: '0.375rem', color: '#94A3B8' }}>
                  <Edit2 size={13} style={{ cursor: 'pointer' }} />
                  <ChevronDown size={14} style={{ cursor: 'pointer' }} />
                </div>
              </div>
              <CardBody style={{ padding: '1.25rem', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', fontSize: '0.75rem' }}>
                <div>
                  <span style={{ color: '#94A3B8' }}>Bank name</span>
                  <div style={{ fontWeight: 700, color: '#1E293B', marginTop: '0.2rem' }}>Swiz International Bank</div>
                </div>
                <div>
                  <span style={{ color: '#94A3B8' }}>Bank account no</span>
                  <div style={{ fontWeight: 700, color: '#1E293B', marginTop: '0.2rem' }}>159843014641</div>
                </div>
                <div>
                  <span style={{ color: '#94A3B8' }}>IFSC Code</span>
                  <div style={{ fontWeight: 700, color: '#1E293B', marginTop: '0.2rem' }}>ICI24504</div>
                </div>
                <div>
                  <span style={{ color: '#94A3B8' }}>Branch</span>
                  <div style={{ fontWeight: 700, color: '#1E293B', marginTop: '0.2rem' }}>Alabama USA</div>
                </div>
              </CardBody>
            </Card>

            {/* 3. Family Information */}
            <Card>
              <div style={{ padding: '0.875rem 1.25rem', borderBottom: '1px solid var(--color-border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <strong style={{ fontSize: '0.9375rem', color: '#1E293B' }}>Family Information</strong>
                <div style={{ display: 'flex', gap: '0.375rem', color: '#94A3B8' }}>
                  <Edit2 size={13} style={{ cursor: 'pointer' }} />
                  <ChevronDown size={14} style={{ cursor: 'pointer' }} />
                </div>
              </div>
              <CardBody style={{ padding: '1.25rem', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', fontSize: '0.75rem' }}>
                <div>
                  <span style={{ color: '#94A3B8' }}>Name</span>
                  <div style={{ fontWeight: 700, color: '#1E293B', marginTop: '0.2rem' }}>Hendry Peralt</div>
                </div>
                <div>
                  <span style={{ color: '#94A3B8' }}>Relationship</span>
                  <div style={{ fontWeight: 700, color: '#1E293B', marginTop: '0.2rem' }}>Brother</div>
                </div>
                <div>
                  <span style={{ color: '#94A3B8' }}>Date of birth</span>
                  <div style={{ fontWeight: 700, color: '#1E293B', marginTop: '0.2rem' }}>25 May 2014</div>
                </div>
                <div>
                  <span style={{ color: '#94A3B8' }}>Phone</span>
                  <div style={{ fontWeight: 700, color: '#1E293B', marginTop: '0.2rem' }}>+1 265 6956 961</div>
                </div>
              </CardBody>
            </Card>

            {/* 4. Education & Experience 2-Column Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              {/* Education Details */}
              <Card>
                <div style={{ padding: '0.875rem 1.25rem', borderBottom: '1px solid var(--color-border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <strong style={{ fontSize: '0.9375rem', color: '#1E293B' }}>Education Details</strong>
                  <div style={{ display: 'flex', gap: '0.375rem', color: '#94A3B8' }}>
                    <Edit2 size={13} style={{ cursor: 'pointer' }} />
                    <ChevronDown size={14} style={{ cursor: 'pointer' }} />
                  </div>
                </div>
                <CardBody style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <strong style={{ fontSize: '0.8125rem', color: '#1E293B' }}>Oxford University</strong>
                      <div style={{ color: '#64748B' }}>Computer Science</div>
                    </div>
                    <span style={{ color: '#94A3B8' }}>2020 - 2022</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '0.75rem' }}>
                    <div>
                      <strong style={{ fontSize: '0.8125rem', color: '#1E293B' }}>Cambridge University</strong>
                      <div style={{ color: '#64748B' }}>Computer Network &amp; Systems</div>
                    </div>
                    <span style={{ color: '#94A3B8' }}>2016- 2019</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '0.75rem' }}>
                    <div>
                      <strong style={{ fontSize: '0.8125rem', color: '#1E293B' }}>Oxford School</strong>
                      <div style={{ color: '#64748B' }}>Grade X</div>
                    </div>
                    <span style={{ color: '#94A3B8' }}>2012 - 2016</span>
                  </div>
                </CardBody>
              </Card>

              {/* Experience */}
              <Card>
                <div style={{ padding: '0.875rem 1.25rem', borderBottom: '1px solid var(--color-border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <strong style={{ fontSize: '0.9375rem', color: '#1E293B' }}>Experience</strong>
                  <div style={{ display: 'flex', gap: '0.375rem', color: '#94A3B8' }}>
                    <Edit2 size={13} style={{ cursor: 'pointer' }} />
                    <ChevronDown size={14} style={{ cursor: 'pointer' }} />
                  </div>
                </div>
                <CardBody style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <strong style={{ fontSize: '0.8125rem', color: '#1E293B' }}>Google</strong>
                      <div>
                        <span style={{ background: '#EFF6FF', color: '#0284C7', padding: '0.1rem 0.4rem', borderRadius: '4px', fontSize: '0.6875rem', fontWeight: 700 }}>
                          • UI/UX Developer
                        </span>
                      </div>
                    </div>
                    <span style={{ color: '#94A3B8' }}>Jan 2013 - Present</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '0.75rem' }}>
                    <div>
                      <strong style={{ fontSize: '0.8125rem', color: '#1E293B' }}>Salesforce</strong>
                      <div>
                        <span style={{ background: '#EFF6FF', color: '#0284C7', padding: '0.1rem 0.4rem', borderRadius: '4px', fontSize: '0.6875rem', fontWeight: 700 }}>
                          • Web Developer
                        </span>
                      </div>
                    </div>
                    <span style={{ color: '#94A3B8' }}>Dec 2012- Jan 2015</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '0.75rem' }}>
                    <div>
                      <strong style={{ fontSize: '0.8125rem', color: '#1E293B' }}>HubSpot</strong>
                      <div>
                        <span style={{ background: '#EFF6FF', color: '#0284C7', padding: '0.1rem 0.4rem', borderRadius: '4px', fontSize: '0.6875rem', fontWeight: 700 }}>
                          • Product Designer
                        </span>
                      </div>
                    </div>
                    <span style={{ color: '#94A3B8' }}>Dec 2011- Jan 2012</span>
                  </div>
                </CardBody>
              </Card>
            </div>

            {/* 5. Projects & Assets Card */}
            <Card>
              <div style={{ padding: '0.75rem 1.25rem', borderBottom: '1px solid var(--color-border-subtle)', display: 'flex', gap: '1.5rem' }}>
                <button
                  onClick={() => setActiveProjectTab('projects')}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: '0.25rem 0',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    color: activeProjectTab === 'projects' ? 'var(--color-primary)' : '#64748B',
                    borderBottom: activeProjectTab === 'projects' ? '2px solid var(--color-primary)' : '2px solid transparent',
                    cursor: 'pointer'
                  }}
                >
                  Projects
                </button>
                <button
                  onClick={() => setActiveProjectTab('assets')}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: '0.25rem 0',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    color: activeProjectTab === 'assets' ? 'var(--color-primary)' : '#64748B',
                    borderBottom: activeProjectTab === 'assets' ? '2px solid var(--color-primary)' : '2px solid transparent',
                    cursor: 'pointer'
                  }}
                >
                  Assets
                </button>
              </div>

              <CardBody style={{ padding: '1.25rem' }}>
                {activeProjectTab === 'projects' ? (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                    {/* Project 1 */}
                    <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                        <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#0284C7', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                          C
                        </div>
                        <div>
                          <strong style={{ fontSize: '0.8125rem', color: '#1E293B' }}>World Health</strong>
                          <div style={{ fontSize: '0.6875rem', color: '#94A3B8' }}>1 tasks • 9 Completed</div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '0.5rem', fontSize: '0.75rem' }}>
                        <div>
                          <span style={{ color: '#94A3B8', fontSize: '0.6875rem' }}>Deadline</span>
                          <div style={{ fontWeight: 700, color: '#1E293B' }}>22 Aug 2025</div>
                        </div>
                        <div>
                          <span style={{ color: '#94A3B8', fontSize: '0.6875rem' }}>Project Lead</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 700, color: '#1E293B' }}>
                            <Avatar src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" name="Young" size="xs" />
                            <span>Young</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Project 2 */}
                    <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                        <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#6366F1', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                          ◉
                        </div>
                        <div>
                          <strong style={{ fontSize: '0.8125rem', color: '#1E293B' }}>Hospital Administration</strong>
                          <div style={{ fontSize: '0.6875rem', color: '#94A3B8' }}>8 tasks • 15 Completed</div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '0.5rem', fontSize: '0.75rem' }}>
                        <div>
                          <span style={{ color: '#94A3B8', fontSize: '0.6875rem' }}>Deadline</span>
                          <div style={{ fontWeight: 700, color: '#1E293B' }}>31 July 2025</div>
                        </div>
                        <div>
                          <span style={{ color: '#94A3B8', fontSize: '0.6875rem' }}>Project Lead</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 700, color: '#1E293B' }}>
                            <Avatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" name="Leona" size="xs" />
                            <span>Leona</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Project 3 */}
                    <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                        <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#EF4444', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                          ≡
                        </div>
                        <div>
                          <strong style={{ fontSize: '0.8125rem', color: '#1E293B' }}>Video Calling App</strong>
                          <div style={{ fontSize: '0.6875rem', color: '#94A3B8' }}>22 tasks • 15 Completed</div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '0.5rem', fontSize: '0.75rem' }}>
                        <div>
                          <span style={{ color: '#94A3B8', fontSize: '0.6875rem' }}>Deadline</span>
                          <div style={{ fontWeight: 700, color: '#1E293B' }}>16 Jan 2025</div>
                        </div>
                        <div>
                          <span style={{ color: '#94A3B8', fontSize: '0.6875rem' }}>Project Lead</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 700, color: '#1E293B' }}>
                            <Avatar src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80" name="Mathis" size="xs" />
                            <span>Mathis</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={{ fontSize: '0.8125rem', color: '#64748B', textAlign: 'center', padding: '2rem' }}>
                    No physical assets assigned currently.
                  </div>
                )}
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------------- */
  /* DESIGNATIONS LIST VIEW                                        */
  /* ------------------------------------------------------------- */
  if (hrmSection === 'designations') {
    return (
      <div className="page-container" style={{ gap: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#1E293B' }}>Designations</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', color: '#94A3B8' }}>
              <span>Employee</span>
              <span>/</span>
              <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Designations</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            {renderNavPills()}

            <button className="btn btn-secondary btn-sm" onClick={() => showToast('Exporting designations...', 'info')}>
              <Download size={14} /> Export <ChevronDown size={12} />
            </button>

            <Button variant="primary" size="sm" onClick={() => setIsAddDesignationOpen(true)} iconLeft={<Plus size={14} />}>
              Add New Designation
            </Button>
          </div>
        </div>

        <Card>
          <CardBody style={{ padding: '0.875rem 1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1E293B' }}>Designation List</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <select className="form-control" style={{ width: '150px', fontSize: '0.75rem' }}>
                  <option>Department</option>
                  <option>Finance</option>
                  <option>Application Development</option>
                  <option>UI / UX</option>
                </select>
                <select className="form-control" style={{ width: '140px', fontSize: '0.75rem' }}>
                  <option>Select Status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
                <select className="form-control" style={{ width: '160px', fontSize: '0.75rem' }}>
                  <option>Sort By : Last 7 Days</option>
                </select>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
            <table className="table" style={{ fontSize: '0.8125rem' }}>
              <thead>
                <tr>
                  <th style={{ width: '40px' }}><input type="checkbox" /></th>
                  <th>Designation</th>
                  <th>Department</th>
                  <th>No of Employees</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {designations.map((d) => (
                  <tr key={d.id}>
                    <td><input type="checkbox" /></td>
                    <td><strong>{d.title}</strong></td>
                    <td style={{ color: '#64748B' }}>{d.dept}</td>
                    <td><strong>{d.count}</strong></td>
                    <td>
                      <span style={{ background: d.status === 'Active' ? '#ECFDF5' : '#FEF2F2', color: d.status === 'Active' ? '#10B981' : '#EF4444', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-pill)', fontWeight: 700, fontSize: '0.6875rem' }}>
                        • {d.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.375rem' }}>
                        <button className="btn-icon-only btn-ghost" onClick={() => showToast(`Editing ${d.title}`, 'info')}>
                          <Edit2 size={14} />
                        </button>
                        <button className="btn-icon-only btn-ghost" style={{ color: '#EF4444' }} onClick={() => showToast(`Deleted ${d.title}`, 'warning')}>
                          <Trash2 size={14} />
                        </button>
                      </div>
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
  /* LEAVES SECTION                                                */
  /* ------------------------------------------------------------- */
  if (hrmSection === 'leaves') {
    return (
      <div className="page-container" style={{ gap: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#1E293B' }}>Leaves</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', color: '#94A3B8' }}>
              <span>Employee</span>
              <span>/</span>
              <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Leaves</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            {renderNavPills()}

            <button className="btn btn-secondary btn-sm" onClick={() => showToast('Exporting leaves list...', 'info')}>
              <Download size={14} /> Export <ChevronDown size={12} />
            </button>

            <Button variant="primary" size="sm" onClick={() => setIsAddLeaveOpen(true)} iconLeft={<Plus size={14} />}>
              Add New Leave
            </Button>
          </div>
        </div>

        {/* 4 Top Metric Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
          <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#10B981', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <UserCheck size={22} />
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.6875rem', color: '#64748B' }}>Total Present</span>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1E293B' }}>180/200</div>
            </div>
          </div>

          <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#EC4899', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Calendar size={22} />
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.6875rem', color: '#64748B' }}>Planned Leaves</span>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1E293B' }}>10</div>
            </div>
          </div>

          <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#F59E0B', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock size={22} />
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.6875rem', color: '#64748B' }}>Unplanned Leaves</span>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1E293B' }}>10</div>
            </div>
          </div>

          <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#0284C7', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Plus size={22} />
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.6875rem', color: '#64748B' }}>Pending Requests</span>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1E293B' }}>15</div>
            </div>
          </div>
        </div>

        <Card>
          <CardBody style={{ padding: '0.875rem 1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1E293B' }}>Leave List</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <input type="text" className="form-control" defaultValue="01/08/2026 - 31/08/2026" style={{ width: '180px', fontSize: '0.75rem' }} />
                <select className="form-control" style={{ width: '140px', fontSize: '0.75rem' }}>
                  <option>Leave Type</option>
                  <option>Medical Leave</option>
                  <option>Casual Leave</option>
                  <option>Annual Leave</option>
                </select>
                <select className="form-control" style={{ width: '160px', fontSize: '0.75rem' }}>
                  <option>Sort By : Last 7 Days</option>
                </select>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
            <table className="table" style={{ fontSize: '0.8125rem' }}>
              <thead>
                <tr>
                  <th style={{ width: '40px' }}><input type="checkbox" /></th>
                  <th>Employee</th>
                  <th>Leave Type</th>
                  <th>From</th>
                  <th>To</th>
                  <th>No of Days</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {leaveRows.map((l, i) => (
                  <tr key={i}>
                    <td><input type="checkbox" /></td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                        <Avatar src={l.avatar} name={l.name} size="sm" />
                        <div>
                          <strong style={{ color: '#1E293B' }}>{l.name}</strong>
                          <div style={{ fontSize: '0.6875rem', color: '#64748B' }}>{l.dept}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: '#1E293B', fontWeight: 600 }}>
                        {l.type} <Info size={13} color="#3B82F6" />
                      </span>
                    </td>
                    <td>{l.from}</td>
                    <td>{l.to}</td>
                    <td><strong>{l.days}</strong></td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.375rem' }}>
                        <button className="btn-icon-only btn-ghost" onClick={() => showToast(`Editing leave for ${l.name}`, 'info')}>
                          <Edit2 size={14} />
                        </button>
                        <button className="btn-icon-only btn-ghost" style={{ color: '#EF4444' }} onClick={() => showToast(`Cancelled leave for ${l.name}`, 'warning')}>
                          <Trash2 size={14} />
                        </button>
                      </div>
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
  /* ATTENDANCE SECTION                                            */
  /* ------------------------------------------------------------- */
  if (hrmSection === 'attendance') {
    return (
      <div className="page-container" style={{ gap: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#1E293B' }}>Employee Attendance</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', color: '#94A3B8' }}>
              <span>Employee</span>
              <span>/</span>
              <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Leaves &amp; Timesheets</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            {renderNavPills()}

            <button className="btn btn-secondary btn-sm" onClick={() => showToast('Exporting attendance records...', 'info')}>
              <Download size={14} /> Export <ChevronDown size={12} />
            </button>
            <Button variant="primary" size="sm" onClick={() => showToast('Generating attendance report...', 'info')}>
              Report
            </Button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '1rem', alignItems: 'stretch' }}>
          <Card>
            <CardBody style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', padding: '1.25rem' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Good Morning, Amit</span>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#1E293B' }}>08:35 AM, 11 Mar 2026</h3>
              <div style={{ width: 68, height: 68, borderRadius: '50%', overflow: 'hidden', border: '3px solid #10B981', margin: '0.25rem 0' }}>
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" alt="user" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <span style={{ background: '#FFF2EF', color: '#FF5B37', padding: '0.15rem 0.6rem', borderRadius: 'var(--radius-pill)', fontWeight: 700, fontSize: '0.75rem' }}>
                Production : 3.45 hrs
              </span>
              <button className="btn btn-sm" style={{ background: isClockedIn ? '#0F172A' : '#FF5B37', color: '#FFFFFF', width: '100%', marginTop: '0.5rem' }} onClick={toggleClockInOut}>
                {isClockedIn ? 'Punch Out' : 'Punch In'}
              </button>
            </CardBody>
          </Card>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
              <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '0.875rem' }}>
                <div style={{ fontSize: '1.125rem', fontWeight: 800, color: '#1E293B' }}>8.36 / 9</div>
                <span style={{ fontSize: '0.625rem', color: '#64748B' }}>Total Hours Today</span>
              </div>
              <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '0.875rem' }}>
                <div style={{ fontSize: '1.125rem', fontWeight: 800, color: '#1E293B' }}>8.36 / 40</div>
                <span style={{ fontSize: '0.625rem', color: '#64748B' }}>Total Hours Week</span>
              </div>
              <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '0.875rem' }}>
                <div style={{ fontSize: '1.125rem', fontWeight: 800, color: '#1E293B' }}>126 / 160</div>
                <span style={{ fontSize: '0.625rem', color: '#64748B' }}>Total Hours Month</span>
              </div>
              <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '0.875rem' }}>
                <div style={{ fontSize: '1.125rem', fontWeight: 800, color: '#1E293B' }}>16 / 28</div>
                <span style={{ fontSize: '0.625rem', color: '#64748B' }}>Overtime this Month</span>
              </div>
            </div>

            <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                <span>Total: <strong>12h 36m</strong></span>
                <span style={{ color: '#10B981' }}>● Productive: <strong>08h 36m</strong></span>
                <span style={{ color: '#F59E0B' }}>● Break: <strong>22m</strong></span>
                <span style={{ color: '#3B82F6' }}>● Overtime: <strong>02h 15m</strong></span>
              </div>
              <div style={{ display: 'flex', height: '14px', borderRadius: 'var(--radius-pill)', overflow: 'hidden', gap: '2px' }}>
                <div style={{ width: '45%', background: '#10B981' }} />
                <div style={{ width: '10%', background: '#F59E0B' }} />
                <div style={{ width: '30%', background: '#10B981' }} />
                <div style={{ width: '15%', background: '#3B82F6' }} />
              </div>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader title="Employee Attendance" subtitle="Daily punch & timesheet logs" />
          <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
            <table className="table" style={{ fontSize: '0.75rem' }}>
              <thead>
                <tr><th>Date</th><th>Check In</th><th>Status</th><th>Check Out</th><th>Break</th><th>Late</th><th>Overtime</th><th>Production Hours</th></tr>
              </thead>
              <tbody>
                {[
                  { date: '14/01/2026', in: '09:00 AM', status: 'Present', out: '06:45 PM', brk: '30 Min', late: '32 Min', ot: '20 Min', prod: '8.55 Hrs', color: '#10B981' },
                  { date: '21/01/2026', in: '09:00 AM', status: 'Present', out: '06:12 PM', brk: '20 Min', late: '-', ot: '45 Min', prod: '7.54 Hrs', color: '#EF4444' },
                  { date: '20/02/2026', in: '09:00 AM', status: 'Present', out: '06:13 PM', brk: '50 Min', late: '-', ot: '33 Min', prod: '8.45 Hrs', color: '#10B981' }
                ].map((row, idx) => (
                  <tr key={idx}>
                    <td><strong>{row.date}</strong></td>
                    <td>{row.in}</td>
                    <td><span style={{ color: row.status === 'Present' ? '#10B981' : '#EF4444', fontWeight: 700 }}>• {row.status}</span></td>
                    <td>{row.out}</td>
                    <td>{row.brk}</td>
                    <td>{row.late}</td>
                    <td>{row.ot}</td>
                    <td><span style={{ background: `${row.color}15`, color: row.color, padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 800 }}>{row.prod}</span></td>
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
  /* EMPLOYEES GRID (Default View - Matching Figma Image 2)        */
  /* ------------------------------------------------------------- */
  return (
    <div className="page-container" style={{ gap: '1.25rem' }}>
      {/* Top Header matching Figma Image 2 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#1E293B' }}>Employee</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', color: '#94A3B8' }}>
            <span>⌂</span>
            <span>/</span>
            <span>Employee</span>
            <span>/</span>
            <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Employee Grid</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          {renderNavPills()}

          <div style={{ display: 'flex', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: '#FFFFFF' }}>
            <button className="btn-icon-only btn-ghost" style={{ padding: '0.4rem', borderRight: '1px solid var(--color-border-subtle)' }}>
              <List size={15} color="#94A3B8" />
            </button>
            <button className="btn-icon-only btn-ghost" style={{ padding: '0.4rem' }}>
              <LayoutGrid size={15} color="#FF5B37" />
            </button>
          </div>

          <button className="btn btn-secondary btn-sm" onClick={() => showToast('Exporting employee grid...', 'info')}>
            <Download size={14} /> Export <ChevronDown size={12} />
          </button>

          <Button
            variant="primary"
            size="sm"
            style={{ fontSize: '0.8125rem', background: '#FF5B37', borderColor: '#FF5B37' }}
            onClick={() => setIsAddEmpOpen(true)}
            iconLeft={<Plus size={16} />}
          >
            Add New Employee
          </Button>
        </div>
      </div>

      {/* 4 Top Metric Cards matching Figma Image 2 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
        {/* Total Employee */}
        <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#FF7A00', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users2 size={18} />
            </div>
            <div>
              <span style={{ fontSize: '0.6875rem', color: '#64748B' }}>Total Employee</span>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1E293B' }}>1007</div>
            </div>
          </div>
          <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#8B5CF6', background: '#F5F3FF', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-pill)' }}>~ +19.01%</span>
        </div>

        {/* Active */}
        <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#10B981', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle2 size={18} />
            </div>
            <div>
              <span style={{ fontSize: '0.6875rem', color: '#64748B' }}>Active</span>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1E293B' }}>1007</div>
            </div>
          </div>
          <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#8B5CF6', background: '#F5F3FF', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-pill)' }}>~ +19.01%</span>
        </div>

        {/* InActive */}
        <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#EF4444', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock size={18} />
            </div>
            <div>
              <span style={{ fontSize: '0.6875rem', color: '#64748B' }}>InActive</span>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1E293B' }}>1007</div>
            </div>
          </div>
          <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#8B5CF6', background: '#F5F3FF', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-pill)' }}>~ +19.01%</span>
        </div>

        {/* New Joiners */}
        <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#0284C7', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Plus size={18} />
            </div>
            <div>
              <span style={{ fontSize: '0.6875rem', color: '#64748B' }}>New Joiners</span>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1E293B' }}>67</div>
            </div>
          </div>
          <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#8B5CF6', background: '#F5F3FF', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-pill)' }}>~ +19.01%</span>
        </div>
      </div>

      {/* Filter Row matching Figma Image 2 */}
      <Card>
        <CardBody style={{ padding: '0.875rem 1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1E293B' }}>Employees Grid</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <select className="form-control" style={{ width: '150px', fontSize: '0.75rem' }}>
                <option>Designation</option>
                <option>Software Developer</option>
                <option>Developer</option>
                <option>Full Stack Developer</option>
                <option>Tester</option>
                <option>Trainee</option>
              </select>
              <select className="form-control" style={{ width: '160px', fontSize: '0.75rem' }}>
                <option>Sort By : Last 7 Days</option>
              </select>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* 12 Employee Cards Grid matching Figma Image 2 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
        {employeeGridItems.map((emp) => (
          <div
            key={emp.id}
            onClick={() => setSelectedEmployeeId(emp.id)}
            style={{
              background: '#FFFFFF',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-xl)',
              padding: '1.25rem',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.875rem',
              transition: 'all 0.2s ease',
              boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-primary)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-border)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {/* Top row: Checkbox & 3-dots */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <input type="checkbox" onClick={(e) => e.stopPropagation()} />
              <button
                className="btn-icon-only btn-ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  showToast(`Options for ${emp.name}`, 'info');
                }}
                style={{ padding: '0.2rem', color: '#94A3B8' }}
              >
                <MoreVertical size={14} />
              </button>
            </div>

            {/* Avatar & Role */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '0.375rem' }}>
              <div style={{ width: 60, height: 60, borderRadius: '50%', overflow: 'hidden', border: `2px solid ${emp.borderColor}`, position: 'relative' }}>
                <img src={emp.avatar} alt={emp.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <span style={{ position: 'absolute', bottom: '2px', right: '2px', width: '10px', height: '10px', borderRadius: '50%', background: '#10B981', border: '2px solid #fff' }} />
              </div>
              <h4 style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#1E293B', marginTop: '0.25rem' }}>{emp.name}</h4>
              <span style={{ fontSize: '0.625rem', fontWeight: 700, color: emp.roleColor, background: `${emp.roleColor}15`, padding: '0.1rem 0.5rem', borderRadius: 'var(--radius-pill)' }}>
                {emp.role}
              </span>
            </div>

            {/* Metrics: Projects / Done / Progress */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', textAlign: 'center', fontSize: '0.6875rem', color: '#64748B', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '0.625rem' }}>
              <div>
                <span>Projects</span>
                <div style={{ fontWeight: 800, color: '#1E293B', fontSize: '0.875rem' }}>{emp.projects}</div>
              </div>
              <div>
                <span>Done</span>
                <div style={{ fontWeight: 800, color: '#1E293B', fontSize: '0.875rem' }}>{emp.done}</div>
              </div>
              <div>
                <span>Progress</span>
                <div style={{ fontWeight: 800, color: '#1E293B', fontSize: '0.875rem' }}>{emp.progress}</div>
              </div>
            </div>

            {/* Productivity bar */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6875rem' }}>
                <span style={{ color: '#64748B' }}>Productivity : <strong style={{ color: emp.prodColor }}>{emp.productivity}%</strong></span>
              </div>
              <div style={{ height: '5px', background: '#F1F5F9', borderRadius: 'var(--radius-pill)', overflow: 'hidden', marginTop: '0.35rem' }}>
                <div style={{ width: `${emp.productivity}%`, height: '100%', background: emp.prodColor }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button matching Figma Image 2 */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.25rem' }}>
        <button
          className="btn btn-sm"
          style={{ background: '#FF5B37', color: '#FFFFFF', fontWeight: 700, fontSize: '0.8125rem', borderRadius: 'var(--radius-md)', padding: '0.5rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}
          onClick={() => showToast('All 12 employees currently loaded.', 'info')}
        >
          <RotateCw size={14} /> Load More
        </button>
      </div>

      <AddEmployeeModal
        isOpen={isAddEmpOpen}
        onClose={() => setIsAddEmpOpen(false)}
      />
    </div>
  );
};
