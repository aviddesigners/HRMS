import React, { useState } from 'react';
import { useHRMS } from '../../context/HRMSContext';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';

interface AddLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddLeadModal: React.FC<AddLeadModalProps> = ({ isOpen, onClose }) => {
  const { addLead } = useHRMS();

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+91 98');
  const [dealValue, setDealValue] = useState('2500000');
  const [source, setSource] = useState<'Website' | 'Referral' | 'LinkedIn' | 'Events' | 'Cold Outreach'>('Website');
  const [probability, setProbability] = useState(50);
  const [expectedClose, setExpectedClose] = useState('2026-10-31');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !company) return;

    addLead({
      name,
      company,
      email: email || `${name.toLowerCase().replace(' ', '.')}@${company.toLowerCase().replace(/[^a-z]/g, '')}.in`,
      phone: phone || '+91 98200 11223',
      dealValue: Number(dealValue) || 0,
      stage: 'New',
      source,
      assignedTo: {
        name: 'Amit Kumar',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
      },
      probability: Number(probability),
      expectedClose,
      notes
    });

    onClose();
    setName('');
    setCompany('');
    setEmail('');
    setNotes('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Deal Lead"
      subtitle="Register prospect company, projected pipeline value in INR (₹) and point of contact"
      maxWidth="600px"
    >
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Client Company Name <span className="required">*</span></label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Swiggy Product Studio"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Primary Contact Person <span className="required">*</span></label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Karan Saxena"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="karan@swiggy.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input
              type="text"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
          <div className="form-group">
            <label className="form-label">Deal Value (₹ INR)</label>
            <input
              type="number"
              className="form-control"
              value={dealValue}
              onChange={(e) => setDealValue(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Lead Source</label>
            <select
              className="form-control"
              value={source}
              onChange={(e: any) => setSource(e.target.value)}
            >
              <option value="Website">Website Inbound</option>
              <option value="Referral">Client Referral</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Events">Industry Event</option>
              <option value="Cold Outreach">Direct Outreach</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Probability (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              className="form-control"
              value={probability}
              onChange={(e) => setProbability(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Expected Closing Date</label>
          <input
            type="date"
            className="form-control"
            value={expectedClose}
            onChange={(e) => setExpectedClose(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Project Scope / Discussion Notes</label>
          <textarea
            className="form-control"
            rows={3}
            placeholder="Key requirements, budget constraints, timeline..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Add to CRM Pipeline
          </Button>
        </div>
      </form>
    </Modal>
  );
};
