import React, { useState } from 'react';
import type { Lead } from '../../types';
import { useHRMS } from '../../context/HRMSContext';
import { Drawer } from '../../components/common/Drawer';
import { Badge } from '../../components/common/Badge';
import { Avatar } from '../../components/common/Avatar';
import { Button } from '../../components/common/Button';
import {
  Building2,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  TrendingUp,
  MessageSquare,
  Send,
  CheckCircle2,
  XCircle,
  Clock
} from 'lucide-react';

interface LeadDetailDrawerProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  onStageChange: (leadId: string, stage: Lead['stage']) => void;
}

export const LeadDetailDrawer: React.FC<LeadDetailDrawerProps> = ({
  lead,
  isOpen,
  onClose,
  onStageChange
}) => {
  const { addLeadActivity } = useHRMS();
  const [newNote, setNewNote] = useState('');

  if (!lead) return null;

  const stages: Lead['stage'][] = ['New', 'Contacted', 'Qualified', 'Proposal', 'Won', 'Lost'];

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    addLeadActivity(lead.id, {
      type: 'note',
      title: newNote,
      user: 'Amit Kumar'
    });

    setNewNote('');
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="540px"
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span>{lead.company}</span>
          <Badge variant={lead.stage === 'Won' ? 'success' : lead.stage === 'Lost' ? 'danger' : 'purple'}>
            {lead.stage}
          </Badge>
        </div>
      }
      subtitle={`Lead Contact: ${lead.name} • Source: ${lead.source}`}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Deal Value Hero */}
        <div
          style={{
            background: 'linear-gradient(135deg, #FFF2EF 0%, #FFFFFF 100%)',
            border: '1px solid rgba(255, 91, 55, 0.2)',
            borderRadius: 'var(--radius-xl)',
            padding: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
              Projected Deal Pipeline Value
            </span>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-primary)' }}>
              ₹{lead.dealValue.toLocaleString('en-IN')}
            </div>
            <span style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 600 }}>
              {lead.probability}% Closing Probability
            </span>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>Expected Close</span>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B', marginTop: '0.125rem' }}>
              {lead.expectedClose}
            </div>
          </div>
        </div>

        {/* Stage Mover Toolbar */}
        <div>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#64748B', display: 'block', marginBottom: '0.5rem' }}>
            Advance Sales Stage
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
            {stages.map((stg) => {
              const isCurrent = lead.stage === stg;
              return (
                <button
                  key={stg}
                  onClick={() => onStageChange(lead.id, stg)}
                  className={`btn btn-sm ${isCurrent ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ borderRadius: 'var(--radius-pill)', fontSize: '0.75rem' }}
                >
                  {stg === 'Won' && <CheckCircle2 size={14} />}
                  {stg === 'Lost' && <XCircle size={14} />}
                  <span>{stg}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Contact Info */}
        <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B' }}>Client Contact Details</h4>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.8125rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Mail size={16} className="text-primary" />
              <span>{lead.email}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Phone size={16} className="text-primary" />
              <span>{lead.phone}</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid var(--color-border-subtle)', fontSize: '0.8125rem' }}>
            <span style={{ color: '#64748B' }}>Account Owner:</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <Avatar src={lead.assignedTo.avatar} name={lead.assignedTo.name} size="xs" />
              <strong style={{ color: '#1E293B' }}>{lead.assignedTo.name}</strong>
            </div>
          </div>
        </div>

        {/* Notes & Requirements */}
        {lead.notes && (
          <div style={{ padding: '1rem', backgroundColor: 'var(--color-surface-muted)', borderRadius: 'var(--radius-lg)' }}>
            <h4 style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.25rem' }}>
              Lead Requirements / Brief
            </h4>
            <p style={{ fontSize: '0.8125rem', color: '#475569' }}>{lead.notes}</p>
          </div>
        )}

        {/* Activity Stream */}
        <div>
          <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.75rem' }}>
            Interaction History & Activity Log
          </h4>

          {/* Add note inline */}
          <form onSubmit={handleAddNote} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            <input
              type="text"
              className="form-control"
              placeholder="Log note, call outcome, or proposal..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              style={{ fontSize: '0.8125rem' }}
            />
            <Button type="submit" variant="primary" size="sm" iconLeft={<Send size={14} />}>
              Post
            </Button>
          </form>

          {/* Timeline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {lead.activities.map((act) => (
              <div
                key={act.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  padding: '0.75rem',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)'
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-primary-light)',
                    color: 'var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Clock size={14} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#1E293B' }}>{act.title}</div>
                  <div style={{ fontSize: '0.6875rem', color: '#64748B', marginTop: '0.125rem' }}>
                    {act.timestamp} by {act.user}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Drawer>
  );
};
