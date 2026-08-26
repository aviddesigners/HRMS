import React, { useState } from 'react';
import { useHRMS } from '../../context/HRMSContext';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';

interface ApplyLeaveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApplyLeaveModal: React.FC<ApplyLeaveModalProps> = ({ isOpen, onClose }) => {
  const { applyLeave, employees } = useHRMS();

  const [selectedEmpId, setSelectedEmpId] = useState(employees[0]?.id || '');
  const [leaveType, setLeaveType] = useState<'Casual Leave' | 'Sick Leave' | 'Annual Leave' | 'Maternity/Paternity' | 'Unpaid'>('Annual Leave');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [days, setDays] = useState(1);
  const [reason, setReason] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emp = employees.find((e) => e.id === selectedEmpId) || employees[0];
    if (!emp) return;

    applyLeave({
      empId: emp.empId,
      empName: emp.name,
      avatar: emp.avatar,
      department: emp.department,
      leaveType,
      startDate,
      endDate,
      days: Number(days),
      reason: reason || 'Personal leave request'
    });

    onClose();
    setReason('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Apply for Leave"
      subtitle="Submit formal time-off request for HR manager review"
      maxWidth="540px"
    >
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Select Employee</label>
          <select
            className="form-control"
            value={selectedEmpId}
            onChange={(e) => setSelectedEmpId(e.target.value)}
          >
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.name} — {emp.designation} ({emp.empId})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Leave Category</label>
          <select
            className="form-control"
            value={leaveType}
            onChange={(e: any) => setLeaveType(e.target.value)}
          >
            <option value="Annual Leave">Annual Leave (Paid Vacation)</option>
            <option value="Sick Leave">Sick Leave (Medical)</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Maternity/Paternity">Maternity / Paternity</option>
            <option value="Unpaid">Unpaid Leave</option>
          </select>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
          <div className="form-group">
            <label className="form-label">Start Date</label>
            <input
              type="date"
              className="form-control"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">End Date</label>
            <input
              type="date"
              className="form-control"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Total Days</label>
            <input
              type="number"
              min="1"
              max="30"
              className="form-control"
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Reason / Handover Notes</label>
          <textarea
            className="form-control"
            rows={2}
            placeholder="Brief reason for time-off..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Submit Leave Request
          </Button>
        </div>
      </form>
    </Modal>
  );
};
