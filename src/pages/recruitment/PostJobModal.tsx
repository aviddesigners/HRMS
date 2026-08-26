import React, { useState } from 'react';
import { useHRMS } from '../../context/HRMSContext';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';

interface PostJobModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PostJobModal: React.FC<PostJobModalProps> = ({ isOpen, onClose }) => {
  const { addJobOpening } = useHRMS();

  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('Product & Design');
  const [location, setLocation] = useState('San Francisco, CA / Remote');
  const [type, setType] = useState<'Full-time' | 'Part-time' | 'Contract' | 'Remote'>('Full-time');
  const [experience, setExperience] = useState('4+ years');
  const [openings, setOpenings] = useState(2);
  const [salaryRange, setSalaryRange] = useState('$110,000 - $135,000');
  const [deadline, setDeadline] = useState('2026-10-15');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    addJobOpening({
      title,
      department,
      location,
      type,
      experience,
      openings: Number(openings),
      salaryRange,
      deadline,
      status: 'Active',
      description: description || 'Seeking passionate talent to shape next-gen digital experiences at Avid Designers.'
    });

    onClose();
    setTitle('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Post New Job Opening"
      subtitle="Publish role across company career portal and hiring board"
      maxWidth="620px"
    >
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">
            Job Title <span className="required">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. Lead Brand & Motion Designer"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Department</label>
            <select
              className="form-control"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="Product & Design">Product & Design</option>
              <option value="Engineering">Engineering</option>
              <option value="Human Resources">Human Resources</option>
              <option value="Marketing & Sales">Marketing & Sales</option>
              <option value="Finance & Accounts">Finance & Accounts</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Work Type</label>
            <select
              className="form-control"
              value={type}
              onChange={(e: any) => setType(e.target.value)}
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Remote">Remote</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
          <div className="form-group">
            <label className="form-label">Min Experience</label>
            <input
              type="text"
              className="form-control"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Headcount Openings</label>
            <input
              type="number"
              min="1"
              className="form-control"
              value={openings}
              onChange={(e) => setOpenings(Number(e.target.value))}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Salary Band</label>
            <input
              type="text"
              className="form-control"
              value={salaryRange}
              onChange={(e) => setSalaryRange(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Role Description & Key Responsibilities</label>
          <textarea
            className="form-control"
            rows={3}
            placeholder="Key objectives, tech stack, and ideal background..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Publish Job Listing
          </Button>
        </div>
      </form>
    </Modal>
  );
};
