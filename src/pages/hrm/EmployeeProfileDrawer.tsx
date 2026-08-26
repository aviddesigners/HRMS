import React, { useState } from 'react';
import type { Employee } from '../../types';
import { Drawer } from '../../components/common/Drawer';
import { Badge } from '../../components/common/Badge';
import { Avatar } from '../../components/common/Avatar';
import { Tabs } from '../../components/common/Tabs';
import { Button } from '../../components/common/Button';
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building,
  CreditCard,
  FileText,
  Shield,
  Clock,
  UserCheck,
  DollarSign
} from 'lucide-react';

interface EmployeeProfileDrawerProps {
  employee: Employee | null;
  isOpen: boolean;
  onClose: () => void;
}

export const EmployeeProfileDrawer: React.FC<EmployeeProfileDrawerProps> = ({
  employee,
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'personal' | 'payroll' | 'emergency' | 'docs'>('personal');

  if (!employee) return null;

  const profileTabs = [
    { id: 'personal', label: 'Personal & Job' },
    { id: 'payroll', label: 'Payroll & Bank' },
    { id: 'emergency', label: 'Emergency Contact' },
    { id: 'docs', label: 'Compliance Docs' }
  ];

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      width="580px"
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span>{employee.name}</span>
          <Badge variant={employee.status === 'Active' ? 'success' : 'warning'}>
            {employee.status}
          </Badge>
        </div>
      }
      subtitle={`Emp ID: ${employee.empId} • ${employee.designation}`}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Profile Card Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem',
            padding: '1.25rem',
            backgroundColor: 'var(--color-surface-muted)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-border)'
          }}
        >
          <Avatar src={employee.avatar} name={employee.name} size="xl" />
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1E293B' }}>{employee.name}</h3>
            <p style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.875rem' }}>
              {employee.designation}
            </p>
            <p style={{ color: '#64748B', fontSize: '0.75rem', marginTop: '0.25rem' }}>
              {employee.department} • {employee.employmentType}
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <Tabs
          tabs={profileTabs}
          activeTab={activeTab}
          onChange={(id: any) => setActiveTab(id)}
          variant="pills"
        />

        {/* TAB 1: PERSONAL & JOB */}
        {activeTab === 'personal' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1.25rem' }}>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.75rem' }}>
                Contact & Workplace Details
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.8125rem' }}>
                <div>
                  <span style={{ color: '#94A3B8' }}>Work Email:</span>
                  <div style={{ fontWeight: 600, color: '#1E293B' }}>{employee.email}</div>
                </div>
                <div>
                  <span style={{ color: '#94A3B8' }}>Phone Number:</span>
                  <div style={{ fontWeight: 600, color: '#1E293B' }}>{employee.phone}</div>
                </div>
                <div>
                  <span style={{ color: '#94A3B8' }}>Date of Joining:</span>
                  <div style={{ fontWeight: 600, color: '#1E293B' }}>{employee.joiningDate}</div>
                </div>
                <div>
                  <span style={{ color: '#94A3B8' }}>Office Location:</span>
                  <div style={{ fontWeight: 600, color: '#1E293B' }}>{employee.location}</div>
                </div>
              </div>
            </div>

            <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1.25rem' }}>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.75rem' }}>
                Demographic Information
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.8125rem' }}>
                <div>
                  <span style={{ color: '#94A3B8' }}>Date of Birth:</span>
                  <div style={{ fontWeight: 600, color: '#1E293B' }}>{employee.dob || '1995-06-18'}</div>
                </div>
                <div>
                  <span style={{ color: '#94A3B8' }}>Gender:</span>
                  <div style={{ fontWeight: 600, color: '#1E293B' }}>{employee.gender || 'Not specified'}</div>
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <span style={{ color: '#94A3B8' }}>Residential Address:</span>
                  <div style={{ fontWeight: 600, color: '#1E293B', marginTop: '0.125rem' }}>
                    {employee.address || 'Bengaluru, Karnataka 560038'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PAYROLL & COMPENSATION */}
        {activeTab === 'payroll' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div
              style={{
                background: 'linear-gradient(135deg, #FFF2EF 0%, #FFFFFF 100%)',
                border: '1px solid rgba(255, 91, 55, 0.2)',
                borderRadius: 'var(--radius-xl)',
                padding: '1.25rem'
              }}
            >
              <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>
                Annual Cost to Company (CTC)
              </span>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                ₹{employee.salary.toLocaleString('en-IN')} / year
              </div>
              <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.75rem', fontSize: '0.8125rem' }}>
                <div>
                  <span style={{ color: '#94A3B8' }}>Monthly Gross:</span>
                  <div style={{ fontWeight: 700, color: '#1E293B' }}>
                    ₹{Math.round(employee.salary / 12).toLocaleString('en-IN')}
                  </div>
                </div>
                <div>
                  <span style={{ color: '#94A3B8' }}>Est. TDS Tax (18%):</span>
                  <div style={{ fontWeight: 700, color: '#EF4444' }}>
                    -₹{Math.round((employee.salary / 12) * 0.18).toLocaleString('en-IN')}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1.25rem' }}>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.75rem' }}>
                Bank Account & Remittance Details
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.8125rem' }}>
                <div>
                  <span style={{ color: '#94A3B8' }}>Bank Name:</span>
                  <div style={{ fontWeight: 600, color: '#1E293B' }}>{employee.bankDetails?.bankName}</div>
                </div>
                <div>
                  <span style={{ color: '#94A3B8' }}>Account Number:</span>
                  <div style={{ fontWeight: 600, color: '#1E293B' }}>{employee.bankDetails?.accountNumber}</div>
                </div>
                <div>
                  <span style={{ color: '#94A3B8' }}>IFSC Code:</span>
                  <div style={{ fontWeight: 600, color: '#1E293B' }}>{employee.bankDetails?.ifsc}</div>
                </div>
                <div>
                  <span style={{ color: '#94A3B8' }}>PAN Number:</span>
                  <div style={{ fontWeight: 600, color: '#1E293B' }}>{employee.bankDetails?.pan}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: EMERGENCY CONTACT */}
        {activeTab === 'emergency' && (
          <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1.25rem' }}>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.75rem' }}>
              Primary Emergency Contact
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.8125rem' }}>
              <div>
                <span style={{ color: '#94A3B8' }}>Full Name:</span>
                <div style={{ fontWeight: 700, color: '#1E293B' }}>
                  {employee.emergencyContact?.name || 'Ramesh Sharma'}
                </div>
              </div>
              <div>
                <span style={{ color: '#94A3B8' }}>Relationship:</span>
                <div style={{ fontWeight: 600, color: '#1E293B' }}>
                  {employee.emergencyContact?.relationship || 'Parent'}
                </div>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <span style={{ color: '#94A3B8' }}>Emergency Contact Number:</span>
                <div style={{ fontWeight: 700, color: 'var(--color-primary)' }}>
                  {employee.emergencyContact?.phone || '+91 98200 11223'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: COMPLIANCE DOCS */}
        {activeTab === 'docs' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {employee.documents?.map((doc, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <FileText size={18} className="text-primary" />
                  <div>
                    <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#1E293B' }}>{doc.name}</div>
                    <div style={{ fontSize: '0.6875rem', color: '#64748B' }}>
                      {doc.type} • {doc.size} • Uploaded {doc.date}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  Download
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Drawer>
  );
};
