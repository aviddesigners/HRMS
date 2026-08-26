import React, { useState } from 'react';
import { useHRMS } from '../../context/HRMSContext';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({ isOpen, onClose }) => {
  const { addEmployee } = useHRMS();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+91 98');
  const [department, setDepartment] = useState('UI/UX Design');
  const [designation, setDesignation] = useState('');
  const [employmentType, setEmploymentType] = useState<'Full-time' | 'Part-time' | 'Contract' | 'Intern'>('Full-time');
  const [salary, setSalary] = useState('1800000');
  const [location, setLocation] = useState('Bengaluru, Karnataka');
  const [joiningDate, setJoiningDate] = useState('2026-09-01');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    addEmployee({
      name,
      email,
      phone: phone || '+91 98200 11223',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      department,
      designation: designation || 'Product Designer',
      joiningDate,
      employmentType,
      status: 'Active',
      salary: Number(salary) || 1500000,
      location,
      dob: '1995-06-18',
      gender: 'Female',
      address: 'Indiranagar, Bengaluru, Karnataka 560038',
      emergencyContact: {
        name: 'Ramesh Sharma',
        relationship: 'Father',
        phone: '+91 98200 11223'
      },
      bankDetails: {
        bankName: 'HDFC Bank Ltd',
        accountNumber: '••••••••4892',
        ifsc: 'HDFC000189',
        pan: 'AAAPS1234K'
      },
      documents: []
    });

    onClose();
    setName('');
    setEmail('');
    setDesignation('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Employee"
      subtitle="Register personnel account, compensation in INR (₹) and department placement"
      maxWidth="620px"
    >
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Full Name <span className="required">*</span></label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Ananya Sharma"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Official Work Email <span className="required">*</span></label>
            <input
              type="email"
              className="form-control"
              placeholder="ananya.s@aviddesigners.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Department</label>
            <select
              className="form-control"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Engineering">Engineering</option>
              <option value="Human Resources">Human Resources</option>
              <option value="Marketing & Sales">Marketing & Sales</option>
              <option value="Finance & Accounts">Finance & Accounts</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Designation / Role Title <span className="required">*</span></label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Senior Product Designer"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              required
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
          <div className="form-group">
            <label className="form-label">Annual CTC (₹ INR)</label>
            <input
              type="number"
              className="form-control"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Employment Type</label>
            <select
              className="form-control"
              value={employmentType}
              onChange={(e: any) => setEmploymentType(e.target.value)}
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Intern">Intern</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Joining Date</label>
            <input
              type="date"
              className="form-control"
              value={joiningDate}
              onChange={(e) => setJoiningDate(e.target.value)}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input
              type="text"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Office Location</label>
            <input
              type="text"
              className="form-control"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Register Employee
          </Button>
        </div>
      </form>
    </Modal>
  );
};
