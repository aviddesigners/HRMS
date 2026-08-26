import React, { useState } from 'react';
import { Candidate } from '../../types';
import { useHRMS } from '../../context/HRMSContext';
import { Modal } from '../../components/common/Modal';
import { Badge } from '../../components/common/Badge';
import { Avatar } from '../../components/common/Avatar';
import { Button } from '../../components/common/Button';
import {
  Mail,
  Phone,
  Briefcase,
  Star,
  FileText,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock
} from 'lucide-react';

interface CandidateProfileModalProps {
  candidate: Candidate | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenSchedule: (c: Candidate) => void;
}

export const CandidateProfileModal: React.FC<CandidateProfileModalProps> = ({
  candidate,
  isOpen,
  onClose,
  onOpenSchedule
}) => {
  const { updateCandidateStage } = useHRMS();

  if (!candidate) return null;

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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="680px"
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span>{candidate.name}</span>
          <Badge
            variant={
              candidate.stage === 'Hired'
                ? 'success'
                : candidate.stage === 'Rejected'
                ? 'danger'
                : candidate.stage === 'Offered'
                ? 'primary'
                : 'purple'
            }
          >
            {candidate.stage}
          </Badge>
        </div>
      }
      subtitle={`Position: ${candidate.jobTitle} • Applied on ${candidate.appliedDate}`}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* Candidate Profile Hero */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem',
            padding: '1.25rem',
            backgroundColor: 'var(--color-surface-muted)',
            borderRadius: 'var(--radius-xl)'
          }}
        >
          <Avatar src={candidate.avatar} name={candidate.name} size="xl" />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1E293B' }}>{candidate.name}</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#F59E0B', fontWeight: 700 }}>
                <Star size={16} fill="#F59E0B" />
                <span>{candidate.rating.toFixed(1)} / 5.0</span>
              </div>
            </div>

            <p style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.875rem' }}>
              {candidate.currentCompany} ({candidate.experienceYears} Years Exp)
            </p>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', fontSize: '0.75rem', color: '#64748B' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Mail size={14} /> {candidate.email}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Phone size={14} /> {candidate.phone}
              </span>
            </div>
          </div>
        </div>

        {/* Stage Pipeline Mover */}
        <div>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#64748B', display: 'block', marginBottom: '0.5rem' }}>
            Hiring Pipeline Progression
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
            {stages.map((stg) => {
              const isCurrent = candidate.stage === stg;
              return (
                <button
                  key={stg}
                  onClick={() => updateCandidateStage(candidate.id, stg)}
                  className={`btn btn-sm ${isCurrent ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ borderRadius: 'var(--radius-pill)' }}
                >
                  {stg === 'Hired' && <CheckCircle2 size={12} />}
                  {stg === 'Rejected' && <XCircle size={12} />}
                  <span>{stg}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Key Candidate Details */}
        <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1.25rem' }}>
          <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.75rem' }}>
            Verified Skills & Expectations
          </h4>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginBottom: '1rem' }}>
            {candidate.skills.map((skill, idx) => (
              <Badge key={idx} variant="purple">
                {skill}
              </Badge>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.8125rem', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '0.75rem' }}>
            <div>
              <span style={{ color: '#94A3B8' }}>Expected Compensation:</span>
              <div style={{ fontWeight: 700, color: 'var(--color-primary)' }}>{candidate.expectedSalary}</div>
            </div>
            <div>
              <span style={{ color: '#94A3B8' }}>Candidate Resume:</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: '#3B82F6', fontWeight: 600, cursor: 'pointer' }}>
                <FileText size={14} /> {candidate.resumeUrl}
              </div>
            </div>
          </div>
        </div>

        {/* Scheduled Interview Card */}
        {candidate.scheduledInterview && (
          <div
            style={{
              padding: '1rem',
              border: '1px solid #BFDBFE',
              backgroundColor: '#EFF6FF',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#1E40AF', textTransform: 'uppercase' }}>
                Confirmed {candidate.scheduledInterview.type} Interview
              </span>
              <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#1E293B', marginTop: '0.125rem' }}>
                {candidate.scheduledInterview.date} at {candidate.scheduledInterview.time}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#475569' }}>
                Lead Interviewer: {candidate.scheduledInterview.interviewer}
              </div>
            </div>
            <Badge variant="info">Scheduled</Badge>
          </div>
        )}

        {/* Footer Actions */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
          <Button
            variant="secondary"
            iconLeft={<Calendar size={16} />}
            onClick={() => {
              onClose();
              onOpenSchedule(candidate);
            }}
          >
            Schedule Interview
          </Button>

          <Button variant="primary" onClick={onClose}>
            Done
          </Button>
        </div>
      </div>
    </Modal>
  );
};
