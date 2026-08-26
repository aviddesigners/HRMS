import React, { useState } from 'react';
import { Candidate } from '../../types';
import { useHRMS } from '../../context/HRMSContext';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';

interface ScheduleInterviewModalProps {
  candidate: Candidate | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ScheduleInterviewModal: React.FC<ScheduleInterviewModalProps> = ({
  candidate,
  isOpen,
  onClose
}) => {
  const { scheduleInterview } = useHRMS();

  const [date, setDate] = useState('2026-08-28');
  const [time, setTime] = useState('11:00 AM');
  const [interviewer, setInterviewer] = useState('Alexander Wright (Lead Architect)');
  const [type, setType] = useState<'Technical' | 'HR' | 'Cultural Fit' | 'Final'>('Technical');

  if (!candidate) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    scheduleInterview(candidate.id, {
      date,
      time,
      interviewer,
      type
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Schedule Interview Round"
      subtitle={`Candidate: ${candidate.name} (${candidate.jobTitle})`}
      maxWidth="520px"
    >
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Interview Round Type</label>
          <select
            className="form-control"
            value={type}
            onChange={(e: any) => setType(e.target.value)}
          >
            <option value="Technical">Technical & Portfolio Deep-Dive</option>
            <option value="HR">HR Culture & Compensation Screening</option>
            <option value="Cultural Fit">Cross-Team Cultural Alignment</option>
            <option value="Final">Executive Final Partner Round</option>
          </select>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Date <span className="required">*</span></label>
            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Time Slot <span className="required">*</span></label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. 11:00 AM PST"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Lead Interviewer Panelist</label>
          <select
            className="form-control"
            value={interviewer}
            onChange={(e) => setInterviewer(e.target.value)}
          >
            <option value="Alexander Wright (Lead Architect)">Alexander Wright (Tech Director)</option>
            <option value="Sophia Montgomery (Head of People)">Sophia Montgomery (HR Head)</option>
            <option value="Liam Chen (Senior Project Mgr)">Liam Chen (Senior PM)</option>
            <option value="Emma Watson (Lead Designer)">Emma Watson (Lead Designer)</option>
          </select>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Confirm & Dispatch Invite
          </Button>
        </div>
      </form>
    </Modal>
  );
};
