import React, { useState } from 'react';
import {
  UserCheck,
  Briefcase,
  Plus,
  Search,
  LayoutGrid,
  List,
  Calendar,
  Star,
  Users,
  Award,
  Clock,
  ArrowRight,
  Sparkles,
  Download,
  ChevronDown,
  Edit2,
  Trash2,
  MapPin,
  DollarSign,
  GraduationCap,
  Globe,
  CheckCircle2,
  XCircle,
  Eye,
  Mail,
  Phone
} from 'lucide-react';
import { useHRMS, RecruitmentTabType } from '../../context/HRMSContext';
import { useToast } from '../../context/ToastContext';
import { Candidate, JobOpening } from '../../types';
import { Card, CardHeader, CardBody } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Avatar } from '../../components/common/Avatar';
import { Modal } from '../../components/common/Modal';
import { CandidateProfileModal } from './CandidateProfileModal';
import { ScheduleInterviewModal } from './ScheduleInterviewModal';
import { PostJobModal } from './PostJobModal';

export const RecruitmentPage: React.FC = () => {
  const { jobOpenings, candidates, updateCandidateStage, recruitmentTab, setRecruitmentTab } = useHRMS();
  const { showToast } = useToast();

  const activeTab: RecruitmentTabType = recruitmentTab || 'jobs';

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isCandidateModalOpen, setIsCandidateModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isPostJobOpen, setIsPostJobOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);

  /* ------------------------------------------------------------- */
  /* 1. REFERRALS DATASET (Screenshot 1)                           */
  /* ------------------------------------------------------------- */
  const [referralsList, setReferralsList] = useState([
    { id: 'Reff-001', referrer: 'Anthony Lewis', referrerRole: 'Finance', referrerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', job: 'Senior IOS Developer', icon: '🍎', referee: 'Harold Gaynor', refereeEmail: 'harold@example.com', refereeAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', bonus: '$200' },
    { id: 'Reff-002', referrer: 'Brian Villalobos', referrerRole: 'Developer', referrerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', job: 'Junior PHP Developer', icon: '🐘', referee: 'Sandra Ornellas', refereeEmail: 'sandra@example.com', refereeAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', bonus: '$100' },
    { id: 'Reff-003', referrer: 'Harvey Smith', referrerRole: 'Developer', referrerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', job: 'Network Engineer', icon: '🌐', referee: 'John Harris', refereeEmail: 'john@example.com', refereeAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', bonus: '$300' },
    { id: 'Reff-004', referrer: 'Stephan Peralt', referrerRole: 'Executive Officer', referrerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80', job: 'Junior React Developer', icon: '⚛️', referee: 'Whitney Barnette', refereeEmail: 'whitney@example.com', refereeAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', bonus: '$150' },
    { id: 'Reff-005', referrer: 'Doglas Martini', referrerRole: 'Manager', referrerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80', job: 'Senior Laravel Developer', icon: '🔺', referee: 'Richard Thompson', refereeEmail: 'richard@example.com', refereeAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80', bonus: '$250' },
    { id: 'Reff-006', referrer: 'Linda Ray', referrerRole: 'Finance', referrerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', job: 'DevOps Engineer', icon: '♾️', referee: 'Kerry Drake', refereeEmail: 'kerry@example.com', refereeAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80', bonus: '$400' },
    { id: 'Reff-007', referrer: 'Elliot Murray', referrerRole: 'Developer', referrerAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80', job: 'Junior Android Developer', icon: '🤖', referee: 'David Carmona', refereeEmail: 'david@example.com', refereeAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80', bonus: '$450' },
    { id: 'Reff-008', referrer: 'Rebecca Smtih', referrerRole: 'Executive', referrerAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80', job: 'Senior HTML Developer', icon: '🌐', referee: 'Margaret Soto', refereeEmail: 'margaret@example.com', refereeAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', bonus: '$220' },
    { id: 'Reff-009', referrer: 'Connie Waters', referrerRole: 'Developer', referrerAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80', job: 'Junior UI/UX Designer', icon: '🎨', referee: 'Jeffrey Thaler', refereeEmail: 'jeffrey@example.com', refereeAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', bonus: '$180' },
    { id: 'Reff-010', referrer: 'Lori Broaddus', referrerRole: 'Finance', referrerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', job: 'Senior Graphic Designer', icon: '✒️', referee: 'Joyce Golston', refereeEmail: 'joyce@example.com', refereeAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80', bonus: '$250' }
  ]);

  /* ------------------------------------------------------------- */
  /* 2. JOBS DATASET (Screenshot 2)                                */
  /* ------------------------------------------------------------- */
  const jobsList = [
    { id: 'JOB-01', title: 'Senior IOS Developer', applicants: 25, location: 'New York, USA', salary: '$ 30, 000 - 35, 000 / month', exp: '2 years of experience', icon: '🍎', type: 'Full Time', level: 'Expert', filled: 10, total: 25 },
    { id: 'JOB-02', title: 'Junior PHP Developer', applicants: 25, location: 'Los Angeles, USA', salary: '$ 20, 000 - 25, 000 / month', exp: '4 years of experience', icon: '🐘', type: 'Full Time', level: 'Expert', filled: 10, total: 25 },
    { id: 'JOB-03', title: 'Network Engineer', applicants: 25, location: 'Bristol, UK', salary: '$ 30, 000 - 35, 000 / month', exp: '1 year of experience', icon: '🌐', type: 'Full Time', level: 'Expert', filled: 10, total: 25 },
    { id: 'JOB-04', title: 'React Developer', applicants: 25, location: 'Birmingham, UK', salary: '$ 28, 000 - 32, 000 / month', exp: '3 years of experience', icon: '⚛️', type: 'Full Time', level: 'Expert', filled: 10, total: 25 },
    { id: 'JOB-05', title: 'Laravel Developer', applicants: 25, location: 'Washington, USA', salary: '$ 32, 000 - 36, 000 / month', exp: '1 year of experience', icon: '🔺', type: 'Full Time', level: 'Expert', filled: 10, total: 25 },
    { id: 'JOB-06', title: 'DevOps Engineer', applicants: 25, location: 'Coventry, UK', salary: '$ 25, 000 - 35, 000 / month', exp: '6 years of experience', icon: '♾️', type: 'Full Time', level: 'Expert', filled: 10, total: 25 },
    { id: 'JOB-07', title: 'Android Developer', applicants: 25, location: 'Chicago, USA', salary: '$ 28, 000 - 32, 000 / month', exp: '5 years of experience', icon: '🤖', type: 'Full Time', level: 'Expert', filled: 10, total: 25 },
    { id: 'JOB-08', title: 'HTML Developer', applicants: 25, location: 'Carlisle, UK', salary: '$ 25, 000 - 28, 000 / month', exp: '3 years of experience', icon: '🌐', type: 'Full Time', level: 'Expert', filled: 10, total: 25 },
    { id: 'JOB-09', title: 'UI/UX Designer', applicants: 25, location: 'Lancaster, UK', salary: '$ 20, 000 - 25, 000 / month', exp: '4 years of experience', icon: '🎨', type: 'Full Time', level: 'Expert', filled: 10, total: 25 },
    { id: 'JOB-10', title: 'Graphic Designer', applicants: 25, location: 'San Diego, USA', salary: '$ 22, 000 - 28, 000 / month', exp: '3 years of experience', icon: '✒️', type: 'Full Time', level: 'Expert', filled: 10, total: 25 },
    { id: 'JOB-11', title: 'Angular Developer', applicants: 25, location: 'Sheffield, UK', salary: '$ 28, 000 - 30, 000 / month', exp: '2 years of experience', icon: '🅰️', type: 'Full Time', level: 'Expert', filled: 10, total: 25 },
    { id: 'JOB-12', title: 'Node js Developer', applicants: 25, location: 'Boston, USA', salary: '$ 25, 000 - 28, 000 / month', exp: '3 years of experience', icon: '🟩', type: 'Full Time', level: 'Expert', filled: 10, total: 25 }
  ];

  /* ------------------------------------------------------------- */
  /* 3. CANDIDATES DATASET (Screenshot 3)                          */
  /* ------------------------------------------------------------- */
  const candidatesList = [
    { id: 'Cand-001', name: 'Harold Gaynor', email: 'harold@example.com', role: 'Accountant', date: '12/09/2024', status: 'New', statusColor: '#8B5CF6', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
    { id: 'Cand-002', name: 'Sandra Ornellas', email: 'sandra@example.com', role: 'App Developer', date: '12/09/2024', status: 'Scheduled', statusColor: '#EC4899', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
    { id: 'Cand-003', name: 'John Harris', email: 'john@example.com', role: 'Technician', date: '12/09/2024', status: 'Interviewed', statusColor: '#0284C7', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
    { id: 'Cand-004', name: 'Carole Langan', email: 'carole@example.com', role: 'Web Developer', date: '12/09/2024', status: 'Offered', statusColor: '#F59E0B', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80' },
    { id: 'Cand-005', name: 'Charles Marks', email: 'charles@example.com', role: 'SEO', date: '12/09/2024', status: 'Hired', statusColor: '#10B981', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
    { id: 'Cand-006', name: 'Kerry Drake', email: 'kerry@example.com', role: 'Designer', date: '12/09/2024', status: 'Rejected', statusColor: '#EF4444', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80' },
    { id: 'Cand-007', name: 'David Carmona', email: 'david@example.com', role: 'Account Manager', date: '12/09/2024', status: 'Hired', statusColor: '#10B981', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' },
    { id: 'Cand-008', name: 'Margaret Soto', email: 'margaret@example.com', role: 'SEO Analyst', date: '12/09/2024', status: 'Scheduled', statusColor: '#EC4899', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
    { id: 'Cand-009', name: 'Jeffrey Thaler', email: 'jeffrey@example.com', role: 'Admin', date: '12/09/2024', status: 'New', statusColor: '#8B5CF6', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
    { id: 'Cand-010', name: 'Joyce Golston', email: 'joyce@example.com', role: 'Business Analyst', date: '12/09/2024', status: 'Hired', statusColor: '#10B981', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80' },
    { id: 'Cand-011', name: 'Cedric Rosalez', email: 'harold@example.com', role: 'Financial Analyst', date: '12/09/2024', status: 'New', statusColor: '#8B5CF6', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
    { id: 'Cand-012', name: 'Lillie Diaz', email: 'harold@example.com', role: 'Receptionist', date: '12/09/2024', status: 'Rejected', statusColor: '#EF4444', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80' }
  ];

  /* ------------------------------------------------------------- */
  /* TOP NAVIGATION PILLS                                          */
  /* ------------------------------------------------------------- */
  const renderNavPills = () => (
    <div style={{ display: 'flex', gap: '0.375rem', background: '#F1F5F9', padding: '0.25rem', borderRadius: 'var(--radius-lg)', flexWrap: 'wrap' }}>
      <button
        onClick={() => setRecruitmentTab('jobs')}
        className={`btn btn-sm ${activeTab === 'jobs' ? 'btn-primary' : 'btn-ghost'}`}
        style={{ fontSize: '0.75rem', borderRadius: 'var(--radius-md)' }}
      >
        <Briefcase size={14} /> Jobs
      </button>
      <button
        onClick={() => setRecruitmentTab('candidates')}
        className={`btn btn-sm ${activeTab === 'candidates' ? 'btn-primary' : 'btn-ghost'}`}
        style={{ fontSize: '0.75rem', borderRadius: 'var(--radius-md)' }}
      >
        <Users size={14} /> Candidates
      </button>
      <button
        onClick={() => setRecruitmentTab('referrals')}
        className={`btn btn-sm ${activeTab === 'referrals' ? 'btn-primary' : 'btn-ghost'}`}
        style={{ fontSize: '0.75rem', borderRadius: 'var(--radius-md)' }}
      >
        <Sparkles size={14} /> Referrals
      </button>
      <button
        onClick={() => setRecruitmentTab('pipeline')}
        className={`btn btn-sm ${activeTab === 'pipeline' ? 'btn-primary' : 'btn-ghost'}`}
        style={{ fontSize: '0.75rem', borderRadius: 'var(--radius-md)' }}
      >
        <UserCheck size={14} /> Hiring Pipeline
      </button>
    </div>
  );

  /* ------------------------------------------------------------- */
  /* VIEW 1: JOBS VIEW (Screenshot 2)                              */
  /* ------------------------------------------------------------- */
  if (activeTab === 'jobs') {
    return (
      <div className="page-container" style={{ gap: '1.25rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#1E293B' }}>Jobs</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', color: '#94A3B8' }}>
              <span>⌂</span>
              <span>/</span>
              <span>Administration</span>
              <span>/</span>
              <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Jobs</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            {renderNavPills()}

            <div style={{ display: 'flex', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
              <button
                className={`btn btn-sm ${viewMode === 'list' ? 'btn-primary' : 'btn-ghost'}`}
                style={{ padding: '0.3rem 0.6rem' }}
                onClick={() => setViewMode('list')}
              >
                <List size={14} />
              </button>
              <button
                className={`btn btn-sm ${viewMode === 'grid' ? 'btn-primary' : 'btn-ghost'}`}
                style={{ padding: '0.3rem 0.6rem' }}
                onClick={() => setViewMode('grid')}
              >
                <LayoutGrid size={14} />
              </button>
            </div>

            <button className="btn btn-secondary btn-sm" onClick={() => showToast('Exporting job openings...', 'info')}>
              <Download size={14} /> Export <ChevronDown size={12} />
            </button>

            <Button
              variant="primary"
              size="sm"
              style={{ background: '#FF5B37', borderColor: '#FF5B37', fontSize: '0.8125rem' }}
              onClick={() => setIsPostJobOpen(true)}
              iconLeft={<Plus size={16} />}
            >
              Post New Job
            </Button>
          </div>
        </div>

        {/* Filter Bar */}
        <Card>
          <CardBody style={{ padding: '0.875rem 1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1E293B' }}>Job Grid</h3>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <input
                  type="text"
                  className="form-control"
                  defaultValue="dd/mm/yyyy - dd/mm/yyyy"
                  style={{ width: '180px', fontSize: '0.75rem' }}
                />
                <select className="form-control" style={{ width: '110px', fontSize: '0.75rem' }}>
                  <option>Role</option>
                  <option>Developer</option>
                  <option>Designer</option>
                  <option>Engineer</option>
                </select>
                <select className="form-control" style={{ width: '130px', fontSize: '0.75rem' }}>
                  <option>Select Status</option>
                  <option>Active</option>
                  <option>Closed</option>
                </select>
                <select className="form-control" style={{ width: '160px', fontSize: '0.75rem' }}>
                  <option>Sort By : Last 7 Days</option>
                </select>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* 12 Job Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
          {jobsList.map((job) => (
            <Card key={job.id} style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', transition: 'transform 0.15s ease, box-shadow 0.15s ease' }}>
              <CardBody style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                {/* Header with Tech Icon */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: 38, height: 38, borderRadius: '8px', background: '#F8FAFC', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem' }}>
                    {job.icon}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.875rem', fontWeight: 800, color: '#1E293B', margin: 0 }}>{job.title}</h4>
                    <span style={{ fontSize: '0.6875rem', color: '#94A3B8' }}>{job.applicants} Applicants</span>
                  </div>
                </div>

                {/* Info rows */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', fontSize: '0.75rem', color: '#64748B' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                    <MapPin size={13} style={{ color: '#94A3B8' }} /> {job.location}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                    <DollarSign size={13} style={{ color: '#94A3B8' }} /> {job.salary}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                    <Briefcase size={13} style={{ color: '#94A3B8' }} /> {job.exp}
                  </div>
                </div>

                {/* Tags */}
                <div style={{ display: 'flex', gap: '0.375rem' }}>
                  <span style={{ background: '#FDF2F8', color: '#EC4899', fontSize: '0.625rem', fontWeight: 700, padding: '0.15rem 0.4rem', borderRadius: '4px' }}>
                    {job.type}
                  </span>
                  <span style={{ background: '#EFF6FF', color: '#3B82F6', fontSize: '0.625rem', fontWeight: 700, padding: '0.15rem 0.4rem', borderRadius: '4px' }}>
                    {job.level}
                  </span>
                </div>

                {/* Progress Bar */}
                <div>
                  <div style={{ width: '100%', height: '5px', background: '#F1F5F9', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${(job.filled / job.total) * 100}%`, height: '100%', background: '#F59E0B', borderRadius: '3px' }} />
                  </div>
                  <div style={{ fontSize: '0.6875rem', color: '#94A3B8', marginTop: '0.25rem' }}>
                    {job.filled} of {job.total} filled
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        <PostJobModal isOpen={isPostJobOpen} onClose={() => setIsPostJobOpen(false)} />
      </div>
    );
  }

  /* ------------------------------------------------------------- */
  /* VIEW 2: CANDIDATES VIEW (Screenshot 3)                        */
  /* ------------------------------------------------------------- */
  if (activeTab === 'candidates') {
    return (
      <div className="page-container" style={{ gap: '1.25rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#1E293B' }}>Candidates</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', color: '#94A3B8' }}>
              <span>⌂</span>
              <span>/</span>
              <span>Administration</span>
              <span>/</span>
              <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Candidates</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            {renderNavPills()}

            <div style={{ display: 'flex', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
              <button
                className={`btn btn-sm ${viewMode === 'list' ? 'btn-primary' : 'btn-ghost'}`}
                style={{ padding: '0.3rem 0.6rem' }}
                onClick={() => setViewMode('list')}
              >
                <List size={14} />
              </button>
              <button
                className={`btn btn-sm ${viewMode === 'grid' ? 'btn-primary' : 'btn-ghost'}`}
                style={{ padding: '0.3rem 0.6rem' }}
                onClick={() => setViewMode('grid')}
              >
                <LayoutGrid size={14} />
              </button>
            </div>

            <button className="btn btn-secondary btn-sm" onClick={() => showToast('Exporting candidate ledger...', 'info')}>
              <Download size={14} /> Export <ChevronDown size={12} />
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <Card>
          <CardBody style={{ padding: '0.875rem 1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1E293B' }}>Candidates Grid</h3>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <input
                  type="text"
                  className="form-control"
                  defaultValue="dd/mm/yyyy - dd/mm/yyyy"
                  style={{ width: '180px', fontSize: '0.75rem' }}
                />
                <select className="form-control" style={{ width: '110px', fontSize: '0.75rem' }}>
                  <option>Role</option>
                  <option>Developer</option>
                  <option>Accountant</option>
                  <option>Designer</option>
                </select>
                <select className="form-control" style={{ width: '130px', fontSize: '0.75rem' }}>
                  <option>Select Status</option>
                  <option>New</option>
                  <option>Scheduled</option>
                  <option>Interviewed</option>
                  <option>Hired</option>
                </select>
                <select className="form-control" style={{ width: '160px', fontSize: '0.75rem' }}>
                  <option>Sort By : Last 7 Days</option>
                </select>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* 12 Candidate Cards Grid matching Screenshot 3 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
          {candidatesList.map((cand) => (
            <Card key={cand.id} style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
              <CardBody style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                {/* Header with Avatar, Name, and Cand ID */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Avatar src={cand.avatar} name={cand.name} size="md" />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                      <strong style={{ fontSize: '0.875rem', color: '#1E293B' }}>{cand.name}</strong>
                      <span style={{ fontSize: '0.625rem', color: '#FF5B37', fontWeight: 600 }}>{cand.id}</span>
                    </div>
                    <div style={{ fontSize: '0.6875rem', color: '#94A3B8' }}>{cand.email}</div>
                  </div>
                </div>

                {/* Applied info */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.75rem', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#94A3B8' }}>Applied Role</span>
                    <strong style={{ color: '#1E293B' }}>{cand.role}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#94A3B8' }}>Applied Date</span>
                    <span style={{ color: '#64748B' }}>{cand.date}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.25rem' }}>
                    <span style={{ color: '#94A3B8' }}>Status</span>
                    <span style={{
                      background: `${cand.statusColor}15`,
                      color: cand.statusColor,
                      padding: '0.15rem 0.5rem',
                      borderRadius: 'var(--radius-pill)',
                      fontWeight: 700,
                      fontSize: '0.6875rem'
                    }}>
                      • {cand.status}
                    </span>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
          <Button
            variant="primary"
            size="sm"
            style={{ background: '#FF5B37', borderColor: '#FF5B37', padding: '0.5rem 1.5rem', fontSize: '0.8125rem' }}
            onClick={() => showToast('Loaded additional candidate profiles!', 'success')}
          >
            Load More
          </Button>
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------------- */
  /* VIEW 3: REFERRALS VIEW (Screenshot 1)                         */
  /* ------------------------------------------------------------- */
  if (activeTab === 'referrals') {
    return (
      <div className="page-container" style={{ gap: '1.25rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#1E293B' }}>Refferals</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', color: '#94A3B8' }}>
              <span>⌂</span>
              <span>/</span>
              <span>Administration</span>
              <span>/</span>
              <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Refferals</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            {renderNavPills()}

            <div style={{ display: 'flex', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
              <button
                className={`btn btn-sm ${viewMode === 'list' ? 'btn-primary' : 'btn-ghost'}`}
                style={{ padding: '0.3rem 0.6rem' }}
                onClick={() => setViewMode('list')}
              >
                <List size={14} />
              </button>
              <button
                className={`btn btn-sm ${viewMode === 'grid' ? 'btn-primary' : 'btn-ghost'}`}
                style={{ padding: '0.3rem 0.6rem' }}
                onClick={() => setViewMode('grid')}
              >
                <LayoutGrid size={14} />
              </button>
            </div>

            <button className="btn btn-secondary btn-sm" onClick={() => showToast('Exporting referral bonuses...', 'info')}>
              <Download size={14} /> Export <ChevronDown size={12} />
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <Card>
          <CardBody style={{ padding: '0.875rem 1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1E293B' }}>Refferals List</h3>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <select className="form-control" style={{ width: '110px', fontSize: '0.75rem' }}>
                  <option>Role</option>
                  <option>Finance</option>
                  <option>Developer</option>
                  <option>Manager</option>
                </select>
                <select className="form-control" style={{ width: '160px', fontSize: '0.75rem' }}>
                  <option>Sort By : Last 7 Days</option>
                </select>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Referrals Table */}
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
                  <th>Refferals ID ▾</th>
                  <th>Referrer Name</th>
                  <th>Job Reffered</th>
                  <th>Referee Name</th>
                  <th>Refferals Bonus</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {referralsList.map((ref) => (
                  <tr key={ref.id}>
                    <td><input type="checkbox" /></td>
                    <td>
                      <span style={{ color: '#0284C7', fontWeight: 700 }}>{ref.id}</span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                        <Avatar src={ref.referrerAvatar} name={ref.referrer} size="sm" />
                        <div>
                          <strong style={{ color: '#1E293B' }}>{ref.referrer}</strong>
                          <div style={{ fontSize: '0.6875rem', color: '#64748B' }}>{ref.referrerRole}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '1.125rem' }}>{ref.icon}</span>
                        <span>{ref.job}</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                        <Avatar src={ref.refereeAvatar} name={ref.referee} size="sm" />
                        <div>
                          <strong style={{ color: '#1E293B' }}>{ref.referee}</strong>
                          <div style={{ fontSize: '0.6875rem', color: '#64748B' }}>{ref.refereeEmail}</div>
                        </div>
                      </div>
                    </td>
                    <td><strong style={{ color: '#1E293B' }}>{ref.bonus}</strong></td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.375rem' }}>
                        <button className="btn-icon-only btn-ghost" onClick={() => showToast(`Editing referral ${ref.id}`, 'info')}>
                          <Edit2 size={14} />
                        </button>
                        <button className="btn-icon-only btn-ghost" style={{ color: '#EF4444' }} onClick={() => showToast(`Deleted referral ${ref.id}`, 'warning')}>
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
      </div>
    );
  }

  /* ------------------------------------------------------------- */
  /* VIEW 4: HIRING PIPELINE / KANBAN VIEW                         */
  /* ------------------------------------------------------------- */
  const stages: Candidate['stage'][] = [
    'Applied',
    'Screening',
    'Interview',
    'Assessment',
    'Offered',
    'Hired',
    'Rejected'
  ];

  return (
    <div className="page-container" style={{ gap: '1.25rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#1E293B' }}>Hiring Pipeline</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', color: '#94A3B8' }}>
            <span>⌂</span>
            <span>/</span>
            <span>Administration</span>
            <span>/</span>
            <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Hiring Pipeline</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          {renderNavPills()}

          <Button
            variant="primary"
            size="sm"
            style={{ background: '#FF5B37', borderColor: '#FF5B37', fontSize: '0.8125rem' }}
            onClick={() => setIsPostJobOpen(true)}
            iconLeft={<Plus size={16} />}
          >
            Post New Job
          </Button>
        </div>
      </div>

      {/* Kanban Board */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${stages.length}, minmax(240px, 1fr))`,
          gap: '1rem',
          overflowX: 'auto',
          paddingBottom: '1rem'
        }}
      >
        {stages.map((stg) => {
          const stageCandidates = candidates.filter((c) => c.stage === stg);
          return (
            <div
              key={stg}
              style={{
                background: '#F8FAFC',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)',
                display: 'flex',
                flexDirection: 'column',
                minHeight: '480px'
              }}
            >
              <div
                style={{
                  padding: '0.75rem 1rem',
                  borderBottom: '1px solid var(--color-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <strong style={{ fontSize: '0.8125rem', color: '#1E293B' }}>{stg}</strong>
                  <span className="badge badge-purple" style={{ fontSize: '0.625rem' }}>{stageCandidates.length}</span>
                </div>
              </div>

              <div style={{ padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
                {stageCandidates.map((cand) => (
                  <div
                    key={cand.id}
                    onClick={() => { setSelectedCandidate(cand); setIsCandidateModalOpen(true); }}
                    style={{
                      background: '#FFFFFF',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-border)',
                      padding: '0.875rem',
                      cursor: 'pointer',
                      boxShadow: 'var(--shadow-xs)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                      <Avatar src={cand.avatar} name={cand.name} size="sm" />
                      <div>
                        <strong style={{ fontSize: '0.8125rem', color: '#1E293B' }}>{cand.name}</strong>
                        <div style={{ fontSize: '0.6875rem', color: '#64748B' }}>{cand.jobTitle}</div>
                      </div>
                    </div>
                    <div style={{ fontSize: '0.6875rem', color: '#94A3B8' }}>{cand.email}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <PostJobModal isOpen={isPostJobOpen} onClose={() => setIsPostJobOpen(false)} />

      {selectedCandidate && (
        <CandidateProfileModal
          isOpen={isCandidateModalOpen}
          onClose={() => setIsCandidateModalOpen(false)}
          candidate={selectedCandidate}
          onOpenSchedule={(c) => {
            setIsCandidateModalOpen(false);
            setSelectedCandidate(c);
            setIsScheduleModalOpen(true);
          }}
        />
      )}

      {selectedCandidate && (
        <ScheduleInterviewModal
          isOpen={isScheduleModalOpen}
          onClose={() => setIsScheduleModalOpen(false)}
          candidate={selectedCandidate}
        />
      )}
    </div>
  );
};
