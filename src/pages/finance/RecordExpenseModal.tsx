import React, { useState } from 'react';
import { useHRMS } from '../../context/HRMSContext';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';

interface RecordExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RecordExpenseModal: React.FC<RecordExpenseModalProps> = ({ isOpen, onClose }) => {
  const { addExpense } = useHRMS();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Software & Tools' | 'Office Supplies' | 'Travel' | 'Marketing' | 'Equipment' | 'Utilities'>('Software & Tools');
  const [amount, setAmount] = useState('45000');
  const [paymentMethod, setPaymentMethod] = useState<'Credit Card' | 'Bank Transfer' | 'Cash' | 'Corporate Card'>('Corporate Card');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount) return;

    addExpense({
      title,
      category,
      amount: Number(amount) || 0,
      date,
      recordedBy: 'Amit Kumar',
      paymentMethod,
      receiptAttached: true
    });

    onClose();
    setTitle('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Record Operating Expense"
      subtitle="Log corporate purchase or employee reimbursement claim in INR (₹)"
      maxWidth="540px"
    >
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Expense Description <span className="required">*</span></label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. AWS Cloud Hosting Mumbai Region"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              className="form-control"
              value={category}
              onChange={(e: any) => setCategory(e.target.value)}
            >
              <option value="Software & Tools">Software & Tools</option>
              <option value="Travel">Travel & Lodging</option>
              <option value="Equipment">Hardware & Office</option>
              <option value="Marketing">Growth & Marketing</option>
              <option value="Office Supplies">Office Supplies</option>
              <option value="Utilities">Utilities</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Amount (₹ INR) <span className="required">*</span></label>
            <input
              type="number"
              className="form-control"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Payment Mode</label>
            <select
              className="form-control"
              value={paymentMethod}
              onChange={(e: any) => setPaymentMethod(e.target.value)}
            >
              <option value="Corporate Card">Corporate Card</option>
              <option value="Bank Transfer">Bank Transfer / Wire</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Cash">Cash</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Expense Date</label>
            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Record Expense
          </Button>
        </div>
      </form>
    </Modal>
  );
};
