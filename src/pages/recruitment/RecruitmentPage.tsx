import React, { useState } from 'react';
import {
  UserCheck,
  Briefcase,
  Plus,
  Search,
  Kanban,
  List,
  Calendar,
  Star,
  Users,
  Award,
  Clock,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useHRMS } from '../../context/HRMSContext';
import { Candidate, JobOpening } from '../../types';
import { MetricCard } from '../../components/common/MetricCard';
import { Card, CardHeader, CardBody } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Avatar } from '../../components/common/Avatar';
import { SearchInput } from '../../components/common/SearchInput';
import { Tabs } from '../../components/common/Tabs';
import { RecruitmentFunnelChart } from '../../components/charts/ChartComponents';
import { CandidateProfileModal } from './CandidateProfileModal';
import { ScheduleInterviewModal } from './ScheduleInterviewModal';
import { PostJobModal } from './PostJobModal';

export const RecruitmentPage: React.FC = () => {
  const { jobOpenings, candidates, updateCandidateStage } = useHRMS();

  const [activeTab, setActiveTab] = useState<'pipeline' | 'jobs' | 'candidates' | 'analytics'>('pipeline');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJobFilter, setSelectedJobFilter] = useState('All');

  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isCandidateModalOpen, setIsCandidateModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isPostJobOpen, setIsPostJobOpen] = useState(false);

  const stages: Candidate['stage'][] = [
    'Applied',
    'Screening',
    'Interview',
    'Assessment',
    'Offered',
    'Hired',
    'Rejected'
  ];

  const mainTabs = [
    { id: 'pipeline', label: 'Kanban Hiring Pipeline', count: candidates.length },
    { id: 'jobs', label: 'Active Job Openings', count: jobOpenings.length },
    { id: 'candidates', label: 'Candidate Directory' },
    { id: 'analytics', label: 'Recruitment Funnel' }
  ];

  const filteredCandidates = candidates.filter((c) => {
    const matchesJob = selectedJobFilter === 'All' || c.jobId === selectedJobFilter;
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesJob && matchesSearch;
  });

  const totalOpenings = jobOpenings.reduce((sum, j) => sum + j.openings, 0);
  const scheduledInterviewsCount = candidates.filter((c) => !!c.scheduledInterview).length;
  const offersCount = candidates.filter((c) => c.stage === 'Offered' || c.stage === 'Hired').length;

  const handleOpenCandidate = (cand: Candidate) => {
    setSelectedCandidate(cand);
    setIsCandidateModalOpen(true);
  };

  const handleOpenSchedule = (cand: Candidate) => {
    setSelectedCandidate(cand);
    setIsScheduleModalOpen(true);
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header-row">
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
            Talent Acquisition & Recruitment
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginTop: '0.125rem' }}>
            Interactive hiring pipeline, candidate assessments, interview scheduling, and job postings.
          </p>
        </div>

        <div className="page-actions-group">
          <Button
            variant="primary"
            iconLeft={<Plus size={16} />}
            onClick={() => setIsPostJobOpen(true)}
          >
            Post Job Opening
          </Button>
        </div>
      </div>

      {/* Recruitment KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
        <MetricCard
          label="Open Positions"
          value={totalOpenings}
          icon={<Briefcase size={22} />}
          iconColor="coral"
          trend={{ value: `${jobOpenings.length} Active Posts`, isUp: true }}
        />
        <MetricCard
          label="Candidate Pipeline"
          value={candidates.length}
          icon={<Users size={22} />}
          iconColor="blue"
          subtitle="In active review stages"
        />
        <MetricCard
          label="Interviews Scheduled"
          value={scheduledInterviewsCount}
          icon={<Calendar size={22} />}
          iconColor="emerald"
          subtitle="This week's panel rounds"
        />
        <MetricCard
          label="Offers Released"
          value={offersCount}
          icon={<Award size={22} />}
          iconColor="purple"
          trend={{ value: '88% Acceptance', isUp: true }}
        />
      </div>

      {/* Tabs */}
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

      {/* TAB 1: KANBAN PIPELINE */}
      {activeTab === 'pipeline' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <Card>
            <CardBody style={{ padding: '1rem 1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <SearchInput
                  value={searchQuery}
                  onValueChange={setSearchQuery}
                  placeholder="Search candidates, skills, roles..."
                />

                <select
                  className="form-control"
                  style={{ width: '220px', padding: '0.5rem 0.75rem', fontSize: '0.8125rem' }}
                  value={selectedJobFilter}
                  onChange={(e) => setSelectedJobFilter(e.target.value)}
                >
                  <option value="All">All Job Openings</option>
                  {jobOpenings.map((job) => (
                    <option key={job.id} value={job.id}>
                      {job.title}
                    </option>
                  ))}
                </select>
              </div>
            </CardBody>
          </Card>

          {/* Kanban Board */}
          <div className="kanban-board">
            {stages.map((stg) => {
              const stageCandidates = filteredCandidates.filter((c) => c.stage === stg);

              return (
                <div key={stg} className="kanban-column">
                  <div className="kanban-column-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.875rem', color: '#1E293B' }}>{stg}</span>
                      <span
                        style={{
                          backgroundColor: '#ffffff',
                          padding: '0.125rem 0.5rem',
                          borderRadius: 'var(--radius-pill)',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          color: 'var(--color-text-secondary)'
                        }}
                      >
                        {stageCandidates.length}
                      </span>
                    </div>
                  </div>

                  <div className="kanban-cards-list">
                    {stageCandidates.length === 0 ? (
                      <div style={{ padding: '2rem 1rem', textAlign: 'center', color: '#94A3B8', fontSize: '0.75rem' }}>
                        No applicants in {stg}
                      </div>
                    ) : (
                      stageCandidates.map((cand) => (
                        <div
                          key={cand.id}
                          className="kanban-card"
                          onClick={() => handleOpenCandidate(cand)}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                            <Avatar src={cand.avatar} name={cand.name} size="md" />
                            <div style={{ minWidth: 0, flex: 1 }}>
                              <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {cand.name}
                              </h4>
                              <p style={{ fontSize: '0.75rem', color: '#64748B' }}>
                                {cand.currentCompany}
                              </p>
                            </div>
                          </div>

                          <div style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: 600, marginBottom: '0.5rem' }}>
                            {cand.jobTitle}
                          </div>

                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginBottom: '0.75rem' }}>
                            {cand.skills.slice(0, 2).map((s, idx) => (
                              <span
                                key={idx}
                                style={{
                                  fontSize: '0.6875rem',
                                  background: '#F1F5F9',
                                  color: '#475569',
                                  padding: '0.1rem 0.4rem',
                                  borderRadius: '4px'
                                }}
                              >
                                {s}
                              </span>
                            ))}
                            {cand.skills.length > 2 && (
                              <span style={{ fontSize: '0.6875rem', color: '#94A3B8' }}>
                                +{cand.skills.length - 2}
                              </span>
                            )}
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.5rem', borderTop: '1px solid var(--color-border-subtle)', fontSize: '0.75rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#F59E0B', fontWeight: 700 }}>
                              <Star size={12} fill="#F59E0B" /> {cand.rating.toFixed(1)}
                            </div>
                            <span style={{ color: '#64748B' }}>{cand.experienceYears}y exp</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: ACTIVE JOB OPENINGS */}
      {activeTab === 'jobs' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.25rem' }}>
          {jobOpenings.map((job) => (
            <Card key={job.id}>
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase' }}>
                    {job.department}
                  </span>
                  <Badge variant={job.status === 'Active' ? 'success' : 'neutral'}>
                    {job.status}
                  </Badge>
                </div>

                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#1E293B' }}>{job.title}</h3>
                  <p style={{ fontSize: '0.8125rem', color: '#64748B', marginTop: '0.25rem' }}>
                    {job.location} • {job.type}
                  </p>
                </div>

                <p style={{ fontSize: '0.8125rem', color: '#475569', lineHeight: 1.5 }}>
                  {job.description}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', padding: '0.75rem', background: 'var(--color-surface-muted)', borderRadius: 'var(--radius-md)', fontSize: '0.75rem' }}>
                  <div>
                    <span style={{ color: '#94A3B8' }}>Salary Band:</span>
                    <div style={{ fontWeight: 700, color: '#1E293B' }}>{job.salaryRange}</div>
                  </div>
                  <div>
                    <span style={{ color: '#94A3B8' }}>Open Positions:</span>
                    <div style={{ fontWeight: 700, color: 'var(--color-primary)' }}>{job.openings} Headcount</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid var(--color-border-subtle)', fontSize: '0.75rem', color: '#64748B' }}>
                  <span>{job.applicantsCount} Applicants</span>
                  <span>Deadline: {job.deadline}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* TAB 3: CANDIDATE DIRECTORY TABLE */}
      {activeTab === 'candidates' && (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Target Role</th>
                <th>Current Employer</th>
                <th>Experience</th>
                <th>Rating</th>
                <th>Expected Salary</th>
                <th>Stage</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCandidates.map((cand) => (
                <tr key={cand.id} onClick={() => handleOpenCandidate(cand)} style={{ cursor: 'pointer' }}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <Avatar src={cand.avatar} name={cand.name} size="sm" />
                      <div>
                        <div style={{ fontWeight: 700, color: '#1E293B' }}>{cand.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{cand.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <strong style={{ color: 'var(--color-primary)' }}>{cand.jobTitle}</strong>
                  </td>
                  <td>{cand.currentCompany}</td>
                  <td>{cand.experienceYears} Years</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#F59E0B', fontWeight: 700 }}>
                      <Star size={14} fill="#F59E0B" /> {cand.rating.toFixed(1)}
                    </div>
                  </td>
                  <td>{cand.expectedSalary}</td>
                  <td>
                    <Badge variant="purple">{cand.stage}</Badge>
                  </td>
                  <td>
                    <Button variant="ghost" size="sm">
                      Profile
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 4: RECRUITMENT FUNNEL ANALYTICS */}
      {activeTab === 'analytics' && (
        <Card>
          <CardHeader
            title="Applicant Conversion Funnel"
            subtitle="Drop-off and progression rates from application to hired offers"
          />
          <CardBody>
            <RecruitmentFunnelChart />
          </CardBody>
        </Card>
      )}

      {/* Modals */}
      <CandidateProfileModal
        candidate={selectedCandidate}
        isOpen={isCandidateModalOpen}
        onClose={() => setIsCandidateModalOpen(false)}
        onOpenSchedule={(c) => {
          setSelectedCandidate(c);
          setIsScheduleModalOpen(true);
        }}
      />

      <ScheduleInterviewModal
        candidate={selectedCandidate}
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
      />

      <PostJobModal
        isOpen={isPostJobOpen}
        onClose={() => setIsPostJobOpen(false)}
      />
    </div>
  );
};
