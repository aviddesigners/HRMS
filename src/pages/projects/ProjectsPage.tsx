import React, { useState } from 'react';
import {
  FolderKanban,
  Plus,
  Grid,
  List,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  Calendar,
  Clock,
  Download,
  ChevronDown,
  MoreVertical,
  FileText,
  Paperclip,
  Image as ImageIcon,
  CheckSquare,
  Square,
  TrendingUp,
  Receipt,
  User,
  Users,
  Send
} from 'lucide-react';
import { useHRMS } from '../../context/HRMSContext';
import { useToast } from '../../context/ToastContext';
import { Avatar } from '../../components/common/Avatar';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Card, CardHeader, CardBody } from '../../components/common/Card';
import { CreateProjectModal } from './CreateProjectModal';

export const ProjectsPage: React.FC = () => {
  const { projects } = useHRMS();
  const { showToast } = useToast();

  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // 12 Projects matching Figma Image 2 exact 4-column layout
  const projectGridItems = [
    {
      id: 'PRO-001',
      title: 'Office Management',
      desc: 'An office management app project streamlines administrative tasks by integrating tools for scheduling, communication, and attendance.',
      leader: 'Rajesh Malhotra',
      leaderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      deadline: '12/09/2026',
      tasks: '6/10',
      client: 'EcoVision Enterprises',
      cost: '₹14,00,000',
      hours: '150 hrs',
      createdOn: '14 Nov 2026',
      startedOn: '15 Jan 2026',
      status: 'InProgress',
      priority: 'High',
      teamCount: 2
    },
    {
      id: 'PRO-002',
      title: 'Clinic Management',
      desc: 'A clinic management project streamlines patient records, appointments, and billing processes to improve operational efficiency.',
      leader: 'Vikram Singhania',
      leaderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      deadline: '24/10/2026',
      tasks: '6/10',
      client: 'Apollo Healthcare',
      cost: '₹18,50,000',
      hours: '210 hrs',
      createdOn: '10 Nov 2026',
      startedOn: '12 Jan 2026',
      status: 'InProgress',
      priority: 'Low',
      teamCount: 2
    },
    {
      id: 'PRO-003',
      title: 'Educational Platform',
      desc: 'An educational platform project provides a centralized space for delivering online courses, tracking progress, and managing interactive quizzes.',
      leader: 'Amit Kumar',
      leaderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      deadline: '18/02/2026',
      tasks: '6/10',
      client: 'Vidya EdTech',
      cost: '₹12,00,000',
      hours: '120 hrs',
      createdOn: '05 Nov 2026',
      startedOn: '08 Jan 2026',
      status: 'Completed',
      priority: 'Medium',
      teamCount: 2
    },
    {
      id: 'PRO-004',
      title: 'Chat & Call Mobile App',
      desc: 'A chat and call mobile app enables users to send messages, make voice and video calls, and share media seamlessly across devices.',
      leader: 'Rahul Verma',
      leaderAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
      deadline: '17/10/2026',
      tasks: '6/10',
      client: 'Tata Digital Services',
      cost: '₹22,00,000',
      hours: '180 hrs',
      createdOn: '18 Nov 2026',
      startedOn: '20 Jan 2026',
      status: 'InProgress',
      priority: 'Low',
      teamCount: 2
    },
    {
      id: 'PRO-005',
      title: 'Travel Planning Website',
      desc: 'A travel planning website helps users explore destinations, compare flights and accommodations, and create personalized itineraries.',
      leader: 'Diya Kapoor',
      leaderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      deadline: '20/07/2026',
      tasks: '6/10',
      client: 'MakeMyTrip Ecosystem',
      cost: '₹16,00,000',
      hours: '140 hrs',
      createdOn: '12 Nov 2026',
      startedOn: '15 Jan 2026',
      status: 'InProgress',
      priority: 'High',
      teamCount: 2
    },
    {
      id: 'PRO-006',
      title: 'Service Booking Software',
      desc: 'Service booking software enables users to schedule appointments, manage bookings, and handle payments for various on-demand services.',
      leader: 'Sneha Patel',
      leaderAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      deadline: '10/04/2026',
      tasks: '6/10',
      client: 'Urban Company',
      cost: '₹19,00,000',
      hours: '160 hrs',
      createdOn: '08 Nov 2026',
      startedOn: '10 Jan 2026',
      status: 'InProgress',
      priority: 'Medium',
      teamCount: 2
    },
    {
      id: 'PRO-007',
      title: 'Hotel Booking App',
      desc: 'A hotel booking app allows users to search, compare, and book hotel rooms with ease, offering a wide selection of accommodations.',
      leader: 'Ishaan Roy',
      leaderAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
      deadline: '29/08/2026',
      tasks: '6/10',
      client: 'OYO Hospitality',
      cost: '₹15,00,000',
      hours: '130 hrs',
      createdOn: '04 Nov 2026',
      startedOn: '06 Jan 2026',
      status: 'InProgress',
      priority: 'Low',
      teamCount: 2
    },
    {
      id: 'PRO-008',
      title: 'Car & Bike Rental Software',
      desc: 'Car and bike rental software allows users to browse, reserve, and rent vehicles efficiently through an online platform with telemetry.',
      leader: 'Ananya Sharma',
      leaderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      deadline: '22/09/2026',
      tasks: '6/10',
      client: 'Zoomcar Mobility',
      cost: '₹17,50,000',
      hours: '155 hrs',
      createdOn: '16 Nov 2026',
      startedOn: '18 Jan 2026',
      status: 'InProgress',
      priority: 'High',
      teamCount: 2
    },
    {
      id: 'PRO-009',
      title: 'Navigation and Safety App',
      desc: 'A navigation and safety app provides real-time GPS guidance, traffic updates, and route optimization to help users reach destinations.',
      leader: 'Priya Sharma',
      leaderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      deadline: '03/11/2026',
      tasks: '6/10',
      client: 'MapmyIndia',
      cost: '₹21,00,000',
      hours: '190 hrs',
      createdOn: '20 Nov 2026',
      startedOn: '22 Jan 2026',
      status: 'InProgress',
      priority: 'Medium',
      teamCount: 2
    },
    {
      id: 'PRO-010',
      title: 'Food Order App',
      desc: 'A food order app allows users to browse menus, place orders, and track delivery from their favorite restaurants with ease.',
      leader: 'Kunal Verma',
      leaderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      deadline: '17/12/2026',
      tasks: '6/10',
      client: 'Zomato Labs',
      cost: '₹24,00,000',
      hours: '200 hrs',
      createdOn: '22 Nov 2026',
      startedOn: '25 Jan 2026',
      status: 'InProgress',
      priority: 'High',
      teamCount: 2
    },
    {
      id: 'PRO-011',
      title: 'POS Admin Software',
      desc: 'POS admin software enables businesses to manage sales, track inventory, and process transactions efficiently through a unified hub.',
      leader: 'Pooja Saxena',
      leaderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      deadline: '20/12/2026',
      tasks: '6/10',
      client: 'Pine Labs',
      cost: '₹13,50,000',
      hours: '110 hrs',
      createdOn: '15 Nov 2026',
      startedOn: '17 Jan 2026',
      status: 'InProgress',
      priority: 'Low',
      teamCount: 2
    },
    {
      id: 'PRO-012',
      title: 'Invoicing & Billing Software',
      desc: 'Invoicing and billing software automates the creation, sending, and tracking of invoices, making payment processes quick and compliant.',
      leader: 'Harish Iyer',
      leaderAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
      deadline: '27/12/2026',
      tasks: '6/10',
      client: 'ClearTax Corporate',
      cost: '₹16,80,000',
      hours: '145 hrs',
      createdOn: '19 Nov 2026',
      startedOn: '21 Jan 2026',
      status: 'InProgress',
      priority: 'High',
      teamCount: 2
    }
  ];

  /* ------------------------------------------------------------- */
  /* SINGLE PROJECT DETAIL VIEW (Matching Figma Image 4)           */
  /* ------------------------------------------------------------- */
  if (selectedProject) {
    return (
      <div className="page-container" style={{ gap: '1.25rem' }}>
        {/* Top Breadcrumbs & Edit Action */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button
            onClick={() => setSelectedProject(null)}
            className="btn btn-secondary btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8125rem' }}
          >
            <ArrowLeft size={16} /> Back to Projects Grid
          </button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => showToast('Editing project scope...', 'info')}
          >
            Edit Project
          </Button>
        </div>

        {/* 2-Column Layout matching Figma Image 4 */}
        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '1.25rem', alignItems: 'flex-start' }}>
          {/* Left Column: Project Metadata */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Card>
              <CardHeader title="Project Details" subtitle="" />
              <CardBody style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.8125rem' }}>
                <div>
                  <span style={{ color: '#94A3B8', fontSize: '0.6875rem' }}>Client</span>
                  <div style={{ fontWeight: 700, color: '#1E293B' }}>{selectedProject.client}</div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B' }}>Project Total Cost:</span>
                  <strong style={{ color: 'var(--color-primary)' }}>{selectedProject.cost}</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B' }}>Hours of Work:</span>
                  <strong>{selectedProject.hours}</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B' }}>Created on:</span>
                  <span>{selectedProject.createdOn}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B' }}>Started on:</span>
                  <span>{selectedProject.startedOn}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#64748B' }}>Due Date:</span>
                  <span style={{ background: '#FEF2F2', color: '#EF4444', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 700, fontSize: '0.75rem' }}>
                    {selectedProject.deadline} ⚠️
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.5rem', borderTop: '1px solid var(--color-border-subtle)' }}>
                  <span style={{ color: '#64748B' }}>Created by:</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                    <Avatar name="Amit Kumar" size="xs" />
                    <strong>Amit Kumar</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#64748B' }}>Priority:</span>
                  <span style={{ background: '#FFF2EF', color: '#FF5B37', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 700, fontSize: '0.75rem' }}>
                    • High
                  </span>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardHeader title="Tasks Details" subtitle="" />
              <CardBody style={{ fontSize: '0.8125rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
                  <span>Tasks Done:</span>
                  <strong>0 / 0</strong>
                </div>
                <div style={{ color: '#10B981', fontWeight: 700, fontSize: '0.75rem', marginTop: '0.25rem' }}>
                  0% Completed
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Right Column: Project Details, Tasks, Images, Files, Notes, Activity */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Title & Team Banner */}
            <Card>
              <CardBody style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#EFF6FF', color: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <FolderKanban size={20} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#1E293B' }}>
                        {selectedProject.title}
                      </h3>
                      <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
                        Project ID : <strong style={{ color: 'var(--color-primary)' }}>{selectedProject.id}</strong>
                      </span>
                    </div>
                  </div>

                  <span style={{ background: '#F5F3FF', color: '#8B5CF6', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-pill)', fontWeight: 700, fontSize: '0.75rem' }}>
                    • {selectedProject.status}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', fontSize: '0.75rem', padding: '0.75rem', background: '#F8FAFC', borderRadius: 'var(--radius-lg)' }}>
                  <div>
                    <span style={{ color: '#94A3B8' }}>Team:</span>
                    <div className="avatar-group" style={{ marginTop: '0.25rem' }}>
                      <Avatar name="Ananya Sharma" size="xs" />
                      <Avatar name="Rahul Verma" size="xs" />
                      <Avatar name="Ishaan Roy" size="xs" />
                    </div>
                  </div>

                  <div>
                    <span style={{ color: '#94A3B8' }}>Team Lead:</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginTop: '0.25rem' }}>
                      <Avatar src={selectedProject.leaderAvatar} name={selectedProject.leader} size="xs" />
                      <strong>{selectedProject.leader}</strong>
                    </div>
                  </div>

                  <div>
                    <span style={{ color: '#94A3B8' }}>Tags:</span>
                    <div style={{ display: 'flex', gap: '0.25rem', marginTop: '0.25rem' }}>
                      <span style={{ background: '#FFF2EF', color: '#FF5B37', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: 600 }}>Admin Panel</span>
                      <span style={{ background: '#EFF6FF', color: '#3B82F6', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: 600 }}>High Tech</span>
                    </div>
                  </div>
                </div>

                <p style={{ fontSize: '0.8125rem', color: '#475569', lineHeight: 1.6 }}>
                  {selectedProject.desc}
                </p>

                {/* Time Spent Banner */}
                <div
                  style={{
                    background: '#E0F2FE',
                    color: '#0369A1',
                    padding: '0.625rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.8125rem',
                    fontWeight: 700
                  }}
                >
                  <span>Time Spent on this project</span>
                  <span style={{ fontSize: '1rem', color: '#0284C7' }}>65/120 Hrs</span>
                </div>
              </CardBody>
            </Card>

            {/* Tasks Section */}
            <Card>
              <CardHeader
                title="Tasks"
                subtitle="Sprint checklist"
                action={<Button variant="ghost" size="sm" iconLeft={<Plus size={14} />}>New Task</Button>}
              />
              <CardBody style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {[
                  { name: 'Patient appointment booking', status: 'On Hold', statusColor: '#F59E0B', done: false },
                  { name: 'Appointment booking with payment gateway', status: 'In Progress', statusColor: '#8B5CF6', done: false },
                  { name: 'Patient and Doctor video conferencing', status: 'Completed', statusColor: '#10B981', done: true },
                  { name: 'Private chat module', status: 'In Progress', statusColor: '#8B5CF6', done: false },
                  { name: 'Go Live and Post-Implementation Support', status: 'In Progress', statusColor: '#8B5CF6', done: false }
                ].map((t, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.75rem',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: t.done ? '#FFF2EF' : '#FFFFFF'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                      {t.done ? <CheckSquare size={16} color="#FF5B37" /> : <Square size={16} color="#94A3B8" />}
                      <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: t.done ? '#94A3B8' : '#1E293B', textDecoration: t.done ? 'line-through' : 'none' }}>
                        {t.name}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: t.statusColor, background: `${t.statusColor}15`, padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                        {t.status}
                      </span>
                      <div className="avatar-group">
                        <Avatar name="Ananya Sharma" size="xs" />
                        <Avatar name="Rahul Verma" size="xs" />
                      </div>
                    </div>
                  </div>
                ))}
              </CardBody>
            </Card>

            {/* Images Gallery */}
            <Card>
              <CardHeader title="Images" subtitle="Design previews & mocks" action={<Button variant="ghost" size="sm" iconLeft={<Plus size={14} />}>Add New</Button>} />
              <CardBody>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem' }}>
                  {[
                    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&auto=format&fit=crop&q=80',
                    'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=150&auto=format&fit=crop&q=80',
                    'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=150&auto=format&fit=crop&q=80',
                    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=150&auto=format&fit=crop&q=80',
                    'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=150&auto=format&fit=crop&q=80',
                    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=150&auto=format&fit=crop&q=80',
                    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=150&auto=format&fit=crop&q=80'
                  ].map((img, i) => (
                    <div key={i} style={{ height: '70px', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
                      <img src={img} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* Files Section */}
            <Card>
              <CardHeader title="Files" subtitle="Deliverable assets" action={<Button variant="ghost" size="sm" iconLeft={<Plus size={14} />}>Add New</Button>} />
              <CardBody style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                {[
                  { name: 'Project_1.docx', size: '7.6 MB', date: '15 May 2026, 8:53 PM' },
                  { name: 'Proposal.pdf', size: '12.8 MB', date: '15 May 2026, 8:53 PM' },
                  { name: 'Logo-Img.zip', size: '6.7 MB', date: '15 May 2026, 8:53 PM' }
                ].map((f) => (
                  <div key={f.name} style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <FileText size={16} className="text-primary" />
                      <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1E293B' }}>{f.name}</div>
                        <div style={{ fontSize: '0.6875rem', color: '#94A3B8' }}>{f.size}</div>
                      </div>
                    </div>
                    <button className="btn-icon-only btn-ghost" onClick={() => showToast(`Downloading ${f.name}...`, 'info')}>
                      <Download size={14} />
                    </button>
                  </div>
                ))}
              </CardBody>
            </Card>

            {/* Notes & Activity (2 Columns) */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {/* Notes */}
              <Card>
                <CardHeader title="Notes" subtitle="Project briefs" action={<Button variant="ghost" size="sm" iconLeft={<Plus size={14} />}>Add New</Button>} />
                <CardBody style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {[
                    { title: 'Changes in design', date: '15 May 2026', desc: 'An office management app project streamlines administrative tasks.' },
                    { title: 'Phase 1 Completion', date: '15 May 2026', desc: 'All sprint deliverables approved by product owner.' }
                  ].map((n, idx) => (
                    <div key={idx} style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '0.75rem', fontSize: '0.75rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: '#1E293B' }}>
                        <span>• {n.title}</span>
                        <span style={{ color: '#94A3B8' }}>{n.date}</span>
                      </div>
                      <p style={{ color: '#64748B', marginTop: '0.25rem' }}>{n.desc}</p>
                    </div>
                  ))}
                </CardBody>
              </Card>

              {/* Activity Stream */}
              <Card>
                <CardHeader title="Activity" subtitle="Live updates" />
                <CardBody style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', fontSize: '0.75rem' }}>
                  {[
                    { user: 'Amit Kumar', act: 'added a New Task', time: '15 May 2026, 6:53 PM' },
                    { user: 'Rahul Verma', act: 'Moved task "Private chat module"', time: '15 May 2026, 6:53 PM' },
                    { user: 'Diya Kapoor', act: 'Updated image "logo.jpg"', time: '15 May 2026, 6:53 PM' }
                  ].map((a, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <Avatar name={a.user} size="xs" />
                      <div>
                        <span style={{ fontWeight: 700, color: '#1E293B' }}>{a.user} </span>
                        <span style={{ color: '#64748B' }}>{a.act}</span>
                        <div style={{ fontSize: '0.625rem', color: '#94A3B8' }}>{a.time}</div>
                      </div>
                    </div>
                  ))}
                </CardBody>
              </Card>
            </div>

            {/* Invoices */}
            <Card>
              <CardHeader title="Invoices" subtitle="Project billings" action={<Button variant="ghost" size="sm" iconLeft={<Plus size={14} />}>Add New</Button>} />
              <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
                <table className="table" style={{ fontSize: '0.75rem' }}>
                  <thead>
                    <tr>
                      <th>Invoice ID & Title</th>
                      <th>Date</th>
                      <th>Amount (₹)</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: '#INV-123', title: 'Phase 2 Completion', date: '11 Sep 2026, 05:35 PM', amt: '₹6,500', status: 'Paid', statusColor: '#10B981' },
                      { id: '#INV-124', title: 'Advance for Project', date: '11 Sep 2026, 05:35 PM', amt: '₹3,312', status: 'Hold', statusColor: '#F59E0B' },
                      { id: '#INV-125', title: 'Changes in design Alignments', date: '11 Sep 2026, 05:35 PM', amt: '₹4,154', status: 'Paid', statusColor: '#10B981' },
                      { id: '#INV-126', title: 'Added New Functionality', date: '11 Sep 2026, 05:35 PM', amt: '₹658', status: 'Paid', statusColor: '#10B981' },
                      { id: '#INV-127', title: 'Phase 1 Completion', date: '11 Sep 2026, 05:35 PM', amt: '₹1,250', status: 'Unpaid', statusColor: '#EF4444' }
                    ].map((inv) => (
                      <tr key={inv.id}>
                        <td>
                          <strong>{inv.title}</strong>
                          <div style={{ color: 'var(--color-primary)', fontSize: '0.6875rem' }}>{inv.id}</div>
                        </td>
                        <td>{inv.date}</td>
                        <td><strong>{inv.amt}</strong></td>
                        <td>
                          <span style={{ background: `${inv.statusColor}15`, color: inv.statusColor, padding: '0.125rem 0.4rem', borderRadius: '4px', fontWeight: 700 }}>
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
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------------- */
  /* PROJECTS GRID VIEW (Matching Figma Image 2)                   */
  /* ------------------------------------------------------------- */
  return (
    <div className="page-container" style={{ gap: '1.25rem' }}>
      {/* Top Header Row matching Figma Image 2 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#1E293B' }}>
            Projects
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', color: '#94A3B8' }}>
            <span>Employee</span>
            <span>/</span>
            <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Projects Grid</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <div className="pills-nav" style={{ padding: '0.2rem' }}>
            <button
              className={`pill-btn ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => setViewMode('table')}
              title="Table View"
            >
              <List size={16} />
            </button>
            <button
              className={`pill-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid View"
            >
              <Grid size={16} />
            </button>
          </div>

          <button
            className="btn btn-secondary btn-sm"
            onClick={() => showToast('Exporting projects grid data...', 'info')}
            style={{ fontSize: '0.75rem', gap: '0.25rem' }}
          >
            <Download size={14} /> Export <ChevronDown size={12} />
          </button>

          <Button
            variant="primary"
            size="sm"
            style={{ fontSize: '0.8125rem' }}
            onClick={() => setIsCreateOpen(true)}
            iconLeft={<Plus size={16} />}
          >
            Add New Project
          </Button>
        </div>
      </div>

      {/* Filter Row matching Figma Image 2 */}
      <Card>
        <CardBody style={{ padding: '0.875rem 1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1E293B' }}>
              Projects Grid
            </h3>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <select
                className="form-control"
                style={{ width: '150px', padding: '0.4rem 0.75rem', fontSize: '0.75rem' }}
              >
                <option>Designation</option>
                <option>Tech Director</option>
                <option>Project Manager</option>
                <option>Lead Designer</option>
              </select>

              <select
                className="form-control"
                style={{ width: '160px', padding: '0.4rem 0.75rem', fontSize: '0.75rem' }}
              >
                <option>Sort By : Last 7 Days</option>
                <option>Sort By : Newest</option>
                <option>Sort By : Priority</option>
              </select>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* 12 Project Cards in 4-column Grid matching Figma Image 2 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
        {projectGridItems.map((proj) => (
          <div
            key={proj.id}
            onClick={() => setSelectedProject(proj)}
            style={{
              background: '#FFFFFF',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-xl)',
              padding: '1.25rem',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              boxShadow: 'var(--shadow-xs)',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            {/* Top Row: Title & 3-dots Menu */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#1E293B', lineHeight: 1.3 }}>
                {proj.title}
              </h3>
              <button
                style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
                onClick={(e) => {
                  e.stopPropagation();
                  showToast(`Options for ${proj.title}`, 'info');
                }}
              >
                <MoreVertical size={16} />
              </button>
            </div>

            {/* Description */}
            <p
              style={{
                fontSize: '0.75rem',
                color: '#64748B',
                lineHeight: 1.5,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                minHeight: '54px'
              }}
            >
              {proj.desc}
            </p>

            {/* Project Leader & Deadline */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6875rem', color: '#64748B', paddingTop: '0.5rem', borderTop: '1px solid var(--color-border-subtle)' }}>
              <div>
                <span style={{ color: '#94A3B8', display: 'block' }}>Project Leader</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginTop: '0.2rem' }}>
                  <Avatar src={proj.leaderAvatar} name={proj.leader} size="xs" />
                  <strong style={{ color: '#1E293B' }}>{proj.leader}</strong>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span style={{ color: '#94A3B8', display: 'block' }}>Deadline</span>
                <strong style={{ color: '#1E293B', display: 'block', marginTop: '0.2rem' }}>{proj.deadline}</strong>
              </div>
            </div>

            {/* Bottom Bar: Tasks Counter & Team Avatars */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.5rem', borderTop: '1px solid var(--color-border-subtle)', fontSize: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: '#10B981', fontWeight: 700 }}>
                <CheckCircle2 size={14} /> Tasks: {proj.tasks}
              </div>

              <div className="avatar-group">
                <Avatar name="Ananya Sharma" size="xs" />
                <Avatar name="Rahul Verma" size="xs" />
                <span style={{ fontSize: '0.625rem', background: '#FF5B37', color: '#fff', borderRadius: '50%', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '-6px' }}>
                  +{proj.teamCount}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '1rem 0' }}>
        <Button
          variant="primary"
          onClick={() => showToast('Loaded additional project records.', 'info')}
          iconLeft={<Plus size={16} />}
        >
          Load More
        </Button>
      </div>

      {/* Create Project Modal */}
      <CreateProjectModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />
    </div>
  );
};
