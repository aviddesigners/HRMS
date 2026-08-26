import React, { useState } from 'react';
import { useHRMS } from '../../context/HRMSContext';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateProjectModal: React.FC<CreateProjectModalProps> = ({ isOpen, onClose }) => {
  const { addProject } = useHRMS();

  const [title, setTitle] = useState('');
  const [client, setClient] = useState('');
  const [category, setCategory] = useState<'UI/UX Design' | 'Web Development' | 'Mobile App' | 'Brand Identity' | 'Consulting'>('UI/UX Design');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('High');
  const [budget, setBudget] = useState('4500000');
  const [deadline, setDeadline] = useState('2026-11-30');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !client) return;

    addProject({
      title,
      client,
      description: description || 'Comprehensive design & engineering delivery.',
      status: 'Active',
      priority,
      startDate: new Date().toISOString().split('T')[0],
      deadline,
      budget: Number(budget) || 0,
      category,
      leader: {
        name: 'Amit Kumar',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        role: 'Tech Director'
      },
      team: [
        { id: 'emp-1', name: 'Ananya Sharma', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', role: 'UI Lead' },
        { id: 'emp-2', name: 'Rahul Verma', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80', role: 'Frontend Lead' }
      ],
      milestones: [
        { id: 'm-new-1', title: 'Phase 1 Architecture & UX', dueDate: deadline, completed: false }
      ],
      tasks: [
        { id: 't-new-1', title: 'Initial Sprint Planning & Backlog Grooming', completed: false, assignee: 'Ananya Sharma', dueDate: deadline, priority: 'High' }
      ]
    });

    onClose();
    setTitle('');
    setClient('');
    setDescription('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Project"
      subtitle="Initialize client project workspace, budget in INR (₹) and sprint timeline"
      maxWidth="620px"
    >
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Project Title <span className="required">*</span></label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. B2B Enterprise Portal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Client Name <span className="required">*</span></label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Apex Global Technologies"
              value={client}
              onChange={(e) => setClient(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              className="form-control"
              value={category}
              onChange={(e: any) => setCategory(e.target.value)}
            >
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Web Development">Web Development</option>
              <option value="Mobile App">Mobile App</option>
              <option value="Brand Identity">Brand Identity</option>
              <option value="Consulting">Consulting</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
          <div className="form-group">
            <label className="form-label">Budget (₹ INR)</label>
            <input
              type="number"
              className="form-control"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Priority</label>
            <select
              className="form-control"
              value={priority}
              onChange={(e: any) => setPriority(e.target.value)}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Deadline</label>
            <input
              type="date"
              className="form-control"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Project Description & Scope</label>
          <textarea
            className="form-control"
            rows={3}
            placeholder="Key milestones, tech stack, and deliverable expectations..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Create Project
          </Button>
        </div>
      </form>
    </Modal>
  );
};
