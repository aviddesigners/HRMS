import React, { useState } from 'react';
import {
  TicketCheck,
  Plus,
  Download,
  ChevronDown,
  ArrowLeft,
  Send,
  MessageSquare,
  Phone,
  MoreVertical,
  RotateCw,
  SlidersHorizontal,
  LayoutGrid,
  List,
  Paperclip,
  CheckCircle,
  Clock,
  Inbox,
  AlertCircle,
  FileText,
  Eye,
  CornerDownRight,
  TrendingUp
} from 'lucide-react';
import { useHRMS } from '../../context/HRMSContext';
import { useToast } from '../../context/ToastContext';
import { Avatar } from '../../components/common/Avatar';
import { Button } from '../../components/common/Button';
import { Card, CardHeader, CardBody } from '../../components/common/Card';
import { Modal } from '../../components/common/Modal';

interface TicketItem {
  id: string;
  title: string;
  category: string;
  status: 'Open' | 'Resolved' | 'Pending';
  priority: 'High' | 'Low' | 'Medium';
  priorityColor: string;
  userAvatar: string;
  assignedTo: {
    name: string;
    avatar: string;
  };
  commentsCount: number;
}

export const TicketsPage: React.FC = () => {
  const { showToast } = useToast();
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [isAddTicketOpen, setIsAddTicketOpen] = useState(false);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [ticketPriority, setTicketPriority] = useState('High');
  const [ticketAssignee, setTicketAssignee] = useState('Edgar Hansel');
  const [ticketStatus, setTicketStatus] = useState('Open');

  // Filter states
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // 12 Tickets matching Figma Image 1 exactly
  const tickets: TicketItem[] = [
    {
      id: 'Tic - 001',
      title: 'Laptop Issue',
      category: 'Hardware Issues',
      status: 'Open',
      priority: 'Low',
      priorityColor: '#10B981',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      assignedTo: { name: 'Edgar Hansel', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80' },
      commentsCount: 9
    },
    {
      id: 'Tic - 002',
      title: 'Payment Issue',
      category: 'Software Issues',
      status: 'Open',
      priority: 'High',
      priorityColor: '#EF4444',
      userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      assignedTo: { name: 'Edgar Hansel', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80' },
      commentsCount: 4
    },
    {
      id: 'Tic - 003',
      title: 'Bug Report',
      category: 'IT Support',
      status: 'Open',
      priority: 'High',
      priorityColor: '#EF4444',
      userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      assignedTo: { name: 'Edgar Hansel', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80' },
      commentsCount: 6
    },
    {
      id: 'Tic - 004',
      title: 'Access Denied',
      category: 'IT Support',
      status: 'Open',
      priority: 'High',
      priorityColor: '#EF4444',
      userAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
      assignedTo: { name: 'Edgar Hansel', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80' },
      commentsCount: 2
    },
    {
      id: 'Tic - 005',
      title: 'Display Glitch',
      category: 'Hardware Issues',
      status: 'Open',
      priority: 'High',
      priorityColor: '#EF4444',
      userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      assignedTo: { name: 'Edgar Hansel', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80' },
      commentsCount: 5
    },
    {
      id: 'Tic - 006',
      title: 'Security Alert',
      category: 'IT Support',
      status: 'Open',
      priority: 'High',
      priorityColor: '#EF4444',
      userAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      assignedTo: { name: 'Edgar Hansel', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80' },
      commentsCount: 8
    },
    {
      id: 'Tic - 007',
      title: 'Connectivity Issue',
      category: 'Connectivity',
      status: 'Open',
      priority: 'High',
      priorityColor: '#EF4444',
      userAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      assignedTo: { name: 'Edgar Hansel', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80' },
      commentsCount: 3
    },
    {
      id: 'Tic - 008',
      title: 'Update Error',
      category: 'IT Support',
      status: 'Open',
      priority: 'High',
      priorityColor: '#EF4444',
      userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      assignedTo: { name: 'Edgar Hansel', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80' },
      commentsCount: 7
    },
    {
      id: 'Tic - 009',
      title: 'Login Failure',
      category: 'IT Support',
      status: 'Open',
      priority: 'High',
      priorityColor: '#EF4444',
      userAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
      assignedTo: { name: 'Edgar Hansel', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80' },
      commentsCount: 1
    },
    {
      id: 'Tic - 010',
      title: 'Server Timeout',
      category: 'Connectivity',
      status: 'Open',
      priority: 'High',
      priorityColor: '#EF4444',
      userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      assignedTo: { name: 'Edgar Hansel', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80' },
      commentsCount: 4
    },
    {
      id: 'Tic - 011',
      title: 'Email Client Setup',
      category: 'IT Support',
      status: 'Open',
      priority: 'High',
      priorityColor: '#EF4444',
      userAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
      assignedTo: { name: 'Edgar Hansel', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80' },
      commentsCount: 2
    },
    {
      id: 'Tic - 012',
      title: 'Application Crashing',
      category: 'Software Issues',
      status: 'Open',
      priority: 'High',
      priorityColor: '#EF4444',
      userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
      assignedTo: { name: 'Edgar Hansel', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80' },
      commentsCount: 5
    }
  ];

  // Detailed Comments matching Figma Image 2
  const [comments, setComments] = useState([
    {
      id: 'c1',
      name: 'James Hendriques',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      updated: 'Updated 5 hours ago',
      text: 'This issue disrupts meetings, delays task completion, and affects my overall productivity.',
      attachments: ['Screenshot.png'],
      replyCount: 1
    },
    {
      id: 'c2',
      name: 'Jessica Louise',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      updated: 'Updated 5 hours ago',
      text: 'Switch on the side panel & update the OS, Login in to the device manager and update the password',
      attachments: ['Screenshot.png'],
      replyCount: 5
    },
    {
      id: 'c3',
      name: 'Vaughan Lewis',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      updated: 'Updated 5 hours ago',
      text: 'Check the System and Application logs in the Event Viewer for warnings or errors that coincide with the times the freezes occur.',
      attachments: ['Screenshot.png', 'Screenshot.png', 'Screenshot.png', 'Screenshot.png'],
      replyCount: 7
    },
    {
      id: 'c4',
      name: 'Jonelle Curtiss',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      updated: 'Updated 5 hours ago',
      text: 'Check for any pending updates and installing them to see if it resolves the issue',
      attachments: [],
      replyCount: 9
    }
  ]);

  const handlePostReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    const newComment = {
      id: `c-${Date.now()}`,
      name: 'Amit Kumar',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      updated: 'Just now',
      text: replyText,
      attachments: [],
      replyCount: 0
    };
    setComments((prev) => [...prev, newComment]);
    setReplyText('');
    setIsReplyModalOpen(false);
    showToast('Reply posted to ticket thread.', 'success');
  };

  /* ------------------------------------------------------------- */
  /* TICKET DETAILS VIEW (Matching Figma Image 2 Exactly)          */
  /* ------------------------------------------------------------- */
  if (selectedTicketId) {
    const activeTic = tickets.find((t) => t.id === selectedTicketId) || tickets[0];

    return (
      <div className="page-container" style={{ gap: '1.25rem' }}>
        {/* Top Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <button
            onClick={() => setSelectedTicketId(null)}
            className="btn btn-secondary btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8125rem', fontWeight: 600 }}
          >
            <ArrowLeft size={16} /> Ticket Details
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ display: 'flex', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: '#FFFFFF' }}>
              <button className="btn-icon-only btn-ghost" style={{ padding: '0.4rem', borderRight: '1px solid var(--color-border-subtle)' }}>
                <List size={15} color="#94A3B8" />
              </button>
              <button className="btn-icon-only btn-ghost" style={{ padding: '0.4rem' }}>
                <LayoutGrid size={15} color="#FF5B37" />
              </button>
            </div>

            <button className="btn btn-secondary btn-sm" onClick={() => showToast('Exporting ticket report...', 'info')}>
              <Download size={14} /> Export <ChevronDown size={12} />
            </button>

            <Button variant="primary" size="sm" onClick={() => setIsAddTicketOpen(true)} iconLeft={<Plus size={14} />}>
              Add New Ticket
            </Button>
          </div>
        </div>

        {/* 2-Column Content Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '1.25rem', alignItems: 'flex-start' }}>
          {/* Left Main Thread Card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <Card>
              <CardBody style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {/* Title and Post Reply Button */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1E293B' }}>IT Support</h3>
                    <span style={{ background: '#EF4444', color: '#FFFFFF', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 700, fontSize: '0.6875rem' }}>
                      • High
                    </span>
                    <button className="btn btn-secondary btn-sm" style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}>
                      Mark as Private <ChevronDown size={12} />
                    </button>
                  </div>

                  <button
                    onClick={() => setIsReplyModalOpen(true)}
                    className="btn btn-sm"
                    style={{ background: '#1E293B', color: '#FFFFFF', fontSize: '0.8125rem', fontWeight: 700, borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0.45rem 0.875rem' }}
                  >
                    <Send size={13} /> Post Reply
                  </button>
                </div>

                {/* Ticket Summary Line */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span style={{ background: '#0284C7', color: '#FFFFFF', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-pill)', fontSize: '0.6875rem' }}>
                      {activeTic.id}
                    </span>
                    <h4 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#1E293B' }}>{activeTic.title}</h4>
                    <span style={{ background: '#FFF2EF', color: '#FF5B37', border: '1px solid #FFD8CE', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-pill)', fontSize: '0.6875rem', fontWeight: 700 }}>
                      • Open
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.75rem', color: '#64748B', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                      <Avatar src={activeTic.assignedTo.avatar} name={activeTic.assignedTo.name} size="xs" />
                      <span>Assigned to <strong style={{ color: '#1E293B' }}>{activeTic.assignedTo.name}</strong></span>
                    </div>
                    <span>• Updated 10 hours ago</span>
                    <span>• {activeTic.commentsCount} Comments</span>
                  </div>
                </div>

                {/* Issue Description matching Figma text */}
                <div style={{ fontSize: '0.8125rem', color: '#475569', lineHeight: 1.65, borderTop: '1px solid var(--color-border-subtle)', paddingTop: '1rem' }}>
                  <p>
                    For the past week, my laptop has been experiencing intermittent freezing issues. The freezes occur randomly, approximately 3-4 times a day, and last about 30-60 seconds each time. During these freezes, the cursor becomes unresponsive, and I am unable to click on anything or use keyboard shortcuts. The issue usually resolves itself, but it significantly disrupts my work.
                  </p>

                  <ul style={{ margin: '0.75rem 0 0 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <li>
                      I first noticed the problem on February 1, 2026, while using Google Meet for a video conference. Since then, the issue has occurred during various tasks, including browsing with Chrome, using Microsoft Office applications, and even when the laptop is idle.
                    </li>
                    <li>
                      Error messages: No specific error messages have appeared, but the Task Manager (when accessible) shows a spike in CPU usage to 100% during these freezes.
                    </li>
                  </ul>
                </div>

                {/* Detailed Comment Thread Cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '0.5rem', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '1.25rem' }}>
                  {comments.map((c) => (
                    <div key={c.id} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                      <Avatar src={c.avatar} name={c.name} size="md" />

                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div>
                            <strong style={{ fontSize: '0.875rem', color: '#1E293B' }}>{c.name}</strong>
                            <div style={{ fontSize: '0.6875rem', color: '#94A3B8' }}>{c.updated}</div>
                          </div>
                        </div>

                        <p style={{ fontSize: '0.8125rem', color: '#334155', lineHeight: 1.6 }}>{c.text}</p>

                        {/* Attachments */}
                        {c.attachments.length > 0 && (
                          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
                            {c.attachments.map((att, idx) => (
                              <button
                                key={idx}
                                onClick={() => showToast(`Downloading ${att}...`, 'info')}
                                className="btn btn-secondary btn-sm"
                                style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem', display: 'flex', alignItems: 'center', gap: '0.375rem', background: '#F8FAFC' }}
                              >
                                <Paperclip size={12} /> {att} <Download size={11} color="#64748B" />
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Reply Action */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.25rem', fontSize: '0.75rem' }}>
                          <button
                            onClick={() => setIsReplyModalOpen(true)}
                            style={{ background: 'none', border: 'none', color: '#FF5B37', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', padding: 0 }}
                          >
                            <CornerDownRight size={13} /> Reply
                          </button>
                          <span style={{ color: '#94A3B8' }}>{c.replyCount} Comments</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Load More Button */}
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                  <button
                    className="btn btn-sm"
                    style={{ background: '#FF5B37', color: '#FFFFFF', fontWeight: 700, fontSize: '0.8125rem', borderRadius: 'var(--radius-md)', padding: '0.5rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}
                    onClick={() => showToast('Loading older comments...', 'info')}
                  >
                    <RotateCw size={13} /> Load More
                  </button>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Right Ticket Info Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Card>
              <CardHeader title="Ticket Info" subtitle="" />
              <CardBody style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.8125rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.6875rem', color: '#64748B' }}>Change Priority</label>
                  <select className="form-control" value={ticketPriority} onChange={(e) => setTicketPriority(e.target.value)} style={{ fontSize: '0.8125rem' }}>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.6875rem', color: '#64748B' }}>Assign To</label>
                  <select className="form-control" value={ticketAssignee} onChange={(e) => setTicketAssignee(e.target.value)} style={{ fontSize: '0.8125rem' }}>
                    <option value="Edgar Hansel">Edgar Hansel</option>
                    <option value="Amit Kumar">Amit Kumar</option>
                    <option value="Rajesh Malhotra">Rajesh Malhotra</option>
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.6875rem', color: '#64748B' }}>Ticket Status</label>
                  <select className="form-control" value={ticketStatus} onChange={(e) => setTicketStatus(e.target.value)} style={{ fontSize: '0.8125rem' }}>
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>

                <div style={{ borderTop: '1px solid var(--color-border-subtle)', paddingTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                  <Avatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" name="Anthony Lewis" size="sm" />
                  <div>
                    <div style={{ fontSize: '0.6875rem', color: '#94A3B8' }}>User</div>
                    <strong style={{ color: '#1E293B' }}>Anthony Lewis</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                  <Avatar src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80" name="Edgar Hansel" size="sm" />
                  <div>
                    <div style={{ fontSize: '0.6875rem', color: '#94A3B8' }}>Support Agent</div>
                    <strong style={{ color: '#1E293B' }}>Edgar Hansel</strong>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid var(--color-border-subtle)', paddingTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                  <div>
                    <span style={{ fontSize: '0.6875rem', color: '#94A3B8' }}>Category</span>
                    <div style={{ fontWeight: 700, color: '#1E293B' }}>Repair &amp; Service</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.6875rem', color: '#94A3B8' }}>Email</span>
                    <div style={{ fontWeight: 600, color: 'var(--color-primary)' }}>Hellana@gmail.com</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.6875rem', color: '#94A3B8' }}>Last Updated / Closed On</span>
                    <div style={{ fontWeight: 700, color: '#1E293B' }}>25 May 2026</div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>

        {/* Post Reply Modal */}
        <Modal
          isOpen={isReplyModalOpen}
          onClose={() => setIsReplyModalOpen(false)}
          title="Post Reply to Ticket"
          subtitle={`Adding response to ${activeTic.id} - ${activeTic.title}`}
        >
          <form onSubmit={handlePostReply}>
            <div className="form-group">
              <label className="form-label">Your Response <span className="required">*</span></label>
              <textarea
                className="form-control"
                rows={4}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write troubleshooting steps or resolution comments..."
                required
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
              <Button type="button" variant="secondary" onClick={() => setIsReplyModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Post Reply
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    );
  }

  /* ------------------------------------------------------------- */
  /* TICKETS GRID VIEW (Matching Figma Image 1 Exactly)            */
  /* ------------------------------------------------------------- */
  return (
    <div className="page-container" style={{ gap: '1.25rem' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#1E293B' }}>Tickets</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', color: '#94A3B8' }}>
            <span>⌂</span>
            <span>/</span>
            <span>Employee</span>
            <span>/</span>
            <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Tickets</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ display: 'flex', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: '#FFFFFF' }}>
            <button className="btn-icon-only btn-ghost" style={{ padding: '0.4rem', borderRight: '1px solid var(--color-border-subtle)' }}>
              <List size={15} color="#94A3B8" />
            </button>
            <button className="btn-icon-only btn-ghost" style={{ padding: '0.4rem' }}>
              <LayoutGrid size={15} color="#FF5B37" />
            </button>
          </div>

          <button className="btn btn-secondary btn-sm" onClick={() => showToast('Exporting tickets...', 'info')}>
            <Download size={14} /> Export <ChevronDown size={12} />
          </button>

          <Button
            variant="primary"
            size="sm"
            style={{ fontSize: '0.8125rem' }}
            onClick={() => setIsAddTicketOpen(true)}
            iconLeft={<Plus size={16} />}
          >
            Add New Ticket
          </Button>
        </div>
      </div>

      {/* Top 4 KPI Cards with Mini Vertical Bar Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
        {/* 1. New Tickets */}
        <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ width: 38, height: 38, borderRadius: '50%', border: '2px dashed #FF7A00', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF7A00' }}>
              <TicketCheck size={18} />
            </div>
            <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#8B5CF6', background: '#F5F3FF', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-pill)' }}>
              ~ +19.01%
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: '0.6875rem', color: '#64748B' }}>New Tickets</span>
              <div style={{ fontSize: '1.375rem', fontWeight: 800, color: '#1E293B' }}>120</div>
            </div>

            {/* Orange Mini Bar Chart */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '36px' }}>
              {[12, 24, 18, 30, 20, 26, 36, 18, 32, 28].map((h, i) => (
                <div key={i} style={{ width: '4px', height: `${h}px`, background: '#FF7A00', borderRadius: '2px' }} />
              ))}
            </div>
          </div>
        </div>

        {/* 2. Open Tickets */}
        <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ width: 38, height: 38, borderRadius: '50%', border: '2px dashed #8B5CF6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8B5CF6' }}>
              <Inbox size={18} />
            </div>
            <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#8B5CF6', background: '#F5F3FF', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-pill)' }}>
              ~ +19.01%
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: '0.6875rem', color: '#64748B' }}>Open Tickets</span>
              <div style={{ fontSize: '1.375rem', fontWeight: 800, color: '#1E293B' }}>60</div>
            </div>

            {/* Purple Mini Bar Chart */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '36px' }}>
              {[20, 32, 16, 26, 18, 30, 22, 36, 28, 34].map((h, i) => (
                <div key={i} style={{ width: '4px', height: `${h}px`, background: '#8B5CF6', borderRadius: '2px' }} />
              ))}
            </div>
          </div>
        </div>

        {/* 3. Solved Tickets */}
        <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ width: 38, height: 38, borderRadius: '50%', border: '2px dashed #10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981' }}>
              <CheckCircle size={18} />
            </div>
            <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#0284C7', background: '#EFF6FF', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-pill)' }}>
              ~ +19.01%
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: '0.6875rem', color: '#64748B' }}>Solved Tickets</span>
              <div style={{ fontSize: '1.375rem', fontWeight: 800, color: '#1E293B' }}>50</div>
            </div>

            {/* Green Mini Bar Chart */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '36px' }}>
              {[22, 28, 14, 34, 20, 30, 26, 32, 18, 36].map((h, i) => (
                <div key={i} style={{ width: '4px', height: `${h}px`, background: '#10B981', borderRadius: '2px' }} />
              ))}
            </div>
          </div>
        </div>

        {/* 4. Pending Tickets */}
        <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ width: 38, height: 38, borderRadius: '50%', border: '2px dashed #0284C7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0284C7' }}>
              <Clock size={18} />
            </div>
            <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#0284C7', background: '#EFF6FF', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-pill)' }}>
              ~ +19.01%
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: '0.6875rem', color: '#64748B' }}>Pending Tickets</span>
              <div style={{ fontSize: '1.375rem', fontWeight: 800, color: '#1E293B' }}>10</div>
            </div>

            {/* Cyan Mini Bar Chart */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '36px' }}>
              {[15, 30, 24, 36, 18, 28, 22, 34, 26, 32].map((h, i) => (
                <div key={i} style={{ width: '4px', height: `${h}px`, background: '#0284C7', borderRadius: '2px' }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Filter Row matching Figma Image 1 */}
      <Card>
        <CardBody style={{ padding: '0.875rem 1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1E293B' }}>Ticket Grid</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <select className="form-control" style={{ width: '130px', fontSize: '0.75rem' }} value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
                <option value="All">Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>

              <select className="form-control" style={{ width: '140px', fontSize: '0.75rem' }} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="All">Select Status</option>
                <option value="Open">Open</option>
                <option value="Resolved">Resolved</option>
                <option value="Pending">Pending</option>
              </select>

              <select className="form-control" style={{ width: '160px', fontSize: '0.75rem' }}>
                <option>Sort By : Last 7 Days</option>
              </select>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* 12 Ticket Cards Grid matching Figma Image 1 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
        {tickets.map((tic) => (
          <div
            key={tic.id}
            onClick={() => setSelectedTicketId(tic.id)}
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
            {/* Top Row: Checkbox & 3-dots */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <input type="checkbox" onClick={(e) => e.stopPropagation()} />
              <button
                className="btn-icon-only btn-ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  showToast(`Options for ${tic.id}`, 'info');
                }}
                style={{ padding: '0.2rem', color: '#94A3B8' }}
              >
                <MoreVertical size={14} />
              </button>
            </div>

            {/* Center Avatar & Ticket Code */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '0.375rem' }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', overflow: 'hidden', border: '2px solid #FF5B37', position: 'relative' }}>
                <img src={tic.userAvatar} alt={tic.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <span style={{ position: 'absolute', bottom: '2px', right: '2px', width: '10px', height: '10px', borderRadius: '50%', background: '#10B981', border: '2px solid #fff' }} />
              </div>

              <h4 style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#1E293B', marginTop: '0.25rem' }}>{tic.title}</h4>

              <span style={{ fontSize: '0.625rem', fontWeight: 700, color: '#0284C7', background: '#EFF6FF', border: '1px solid #BAE6FD', padding: '0.1rem 0.5rem', borderRadius: 'var(--radius-pill)' }}>
                {tic.id}
              </span>
            </div>

            {/* Info Key-Values */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.75rem', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '0.625rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#94A3B8' }}>Category</span>
                <strong style={{ color: '#1E293B' }}>{tic.category}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#94A3B8' }}>Status</span>
                <span style={{ background: '#FFF2EF', color: '#FF5B37', padding: '0.1rem 0.45rem', borderRadius: 'var(--radius-pill)', fontWeight: 700, fontSize: '0.6875rem' }}>
                  • {tic.status}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#94A3B8' }}>Priority</span>
                <span style={{ background: tic.priority === 'Low' ? '#ECFDF5' : '#FEF2F2', color: tic.priority === 'Low' ? '#10B981' : '#EF4444', border: `1px solid ${tic.priority === 'Low' ? '#A7F3D0' : '#FECACA'}`, padding: '0.1rem 0.45rem', borderRadius: 'var(--radius-pill)', fontWeight: 700, fontSize: '0.6875rem' }}>
                  • {tic.priority}
                </span>
              </div>
            </div>

            {/* Bottom Row: Assigned To + Chat/Call action icons */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '0.625rem', fontSize: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <Avatar src={tic.assignedTo.avatar} name={tic.assignedTo.name} size="xs" />
                <span style={{ color: '#1E293B', fontWeight: 600, fontSize: '0.6875rem' }}>{tic.assignedTo.name}</span>
              </div>

              <div style={{ display: 'flex', gap: '0.375rem' }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedTicketId(tic.id);
                  }}
                  style={{ width: 26, height: 26, borderRadius: '50%', background: '#FFF2EF', border: 'none', color: '#FF5B37', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                >
                  <MessageSquare size={12} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    showToast(`Calling support agent for ${tic.id}...`, 'info');
                  }}
                  style={{ width: 26, height: 26, borderRadius: '50%', background: '#F1F5F9', border: 'none', color: '#64748B', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                >
                  <Phone size={12} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button matching Figma Image 1 */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.25rem' }}>
        <button
          className="btn btn-sm"
          style={{ background: '#FF5B37', color: '#FFFFFF', fontWeight: 700, fontSize: '0.8125rem', borderRadius: 'var(--radius-md)', padding: '0.5rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}
          onClick={() => showToast('All 12 tickets currently loaded.', 'info')}
        >
          <RotateCw size={14} /> Load More
        </button>
      </div>

      {/* Add New Ticket Modal */}
      <Modal
        isOpen={isAddTicketOpen}
        onClose={() => setIsAddTicketOpen(false)}
        title="Create Support Ticket"
        subtitle="Log an IT issue or hardware request"
      >
        <form onSubmit={(e) => { e.preventDefault(); showToast('New ticket created successfully!', 'success'); setIsAddTicketOpen(false); }}>
          <div className="form-group">
            <label className="form-label">Ticket Subject / Title <span className="required">*</span></label>
            <input type="text" className="form-control" placeholder="e.g. Network latency in conference room" required />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select className="form-control">
                <option>IT Support</option>
                <option>Hardware Issues</option>
                <option>Software Issues</option>
                <option>Connectivity</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Priority</label>
              <select className="form-control">
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea className="form-control" rows={3} placeholder="Describe what happened..." />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <Button type="button" variant="secondary" onClick={() => setIsAddTicketOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Create Ticket
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
