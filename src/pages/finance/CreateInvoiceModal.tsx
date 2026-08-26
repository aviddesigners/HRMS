import React, { useState } from 'react';
import { useHRMS } from '../../context/HRMSContext';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';

interface CreateInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateInvoiceModal: React.FC<CreateInvoiceModalProps> = ({ isOpen, onClose }) => {
  const { addInvoice } = useHRMS();

  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientAddress, setClientAddress] = useState('Nariman Point, Mumbai, Maharashtra 400021');
  const [issueDate, setIssueDate] = useState('2026-08-26');
  const [dueDate, setDueDate] = useState('2026-09-26');
  const [desc, setDesc] = useState('Enterprise Platform UI/UX Sprint Phase 1');
  const [amount, setAmount] = useState('2500000');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !amount) return;

    const subtotal = Number(amount) || 0;
    const taxRate = 18;
    const taxAmount = Math.round(subtotal * 0.18);
    const totalAmount = subtotal + taxAmount;

    addInvoice({
      clientName,
      clientEmail,
      clientAddress,
      issueDate,
      dueDate,
      status: 'Pending',
      subtotal,
      taxRate,
      taxAmount,
      discount: 0,
      totalAmount,
      notes: 'Payment via NEFT/RTGS Transfer or Corporate UPI.',
      items: [
        {
          id: `item-${Date.now()}`,
          description: desc,
          quantity: 1,
          unitPrice: subtotal,
          amount: subtotal
        }
      ]
    });

    onClose();
    setClientName('');
    setClientEmail('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create GST Tax Invoice"
      subtitle="Generate and issue commercial invoice with 18% GST in INR (₹)"
      maxWidth="620px"
    >
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Client Company Name <span className="required">*</span></label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Reliance Retail Labs"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Billing Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="e.g. accounts@relianceretail.in"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Client Registered GST Address</label>
          <input
            type="text"
            className="form-control"
            value={clientAddress}
            onChange={(e) => setClientAddress(e.target.value)}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Issue Date</label>
            <input
              type="date"
              className="form-control"
              value={issueDate}
              onChange={(e) => setIssueDate(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Due Date</label>
            <input
              type="date"
              className="form-control"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Deliverable Description</label>
          <input
            type="text"
            className="form-control"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Taxable Subtotal (₹ INR) <span className="required">*</span></label>
          <input
            type="number"
            className="form-control"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <span style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.25rem', display: 'block' }}>
            + 18% GST (₹{Math.round(Number(amount || 0) * 0.18).toLocaleString('en-IN')}) will be auto-calculated. Total: ₹{(Number(amount || 0) * 1.18).toLocaleString('en-IN')}
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Issue Invoice
          </Button>
        </div>
      </form>
    </Modal>
  );
};
