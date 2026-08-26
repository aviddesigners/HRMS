import React from 'react';
import type { Invoice } from '../../types';
import { useHRMS } from '../../context/HRMSContext';
import { Modal } from '../../components/common/Modal';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Printer, Download, CheckCircle2, Building, Mail, MapPin } from 'lucide-react';

interface InvoiceDetailModalProps {
  invoice: Invoice | null;
  isOpen: boolean;
  onClose: () => void;
}

export const InvoiceDetailModal: React.FC<InvoiceDetailModalProps> = ({
  invoice,
  isOpen,
  onClose
}) => {
  const { markInvoicePaid } = useHRMS();

  if (!invoice) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span>Invoice {invoice.invoiceNumber}</span>
          <Badge
            variant={
              invoice.status === 'Paid'
                ? 'success'
                : invoice.status === 'Overdue'
                ? 'danger'
                : 'warning'
            }
          >
            {invoice.status}
          </Badge>
        </div>
      }
      subtitle={`Billing Entity: ${invoice.clientName}`}
      maxWidth="780px"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Printable Invoice Container */}
        <div
          style={{
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
            backgroundColor: '#ffffff'
          }}
        >
          {/* Invoice Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary)' }}>Avi</span>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1E293B' }}>Designers</span>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.25rem' }}>
                Avid Designers Private Limited<br />
                MG Road, Indiranagar, Bengaluru, Karnataka 560038<br />
                GSTIN: 29AABCA1234F1Z5 • PAN: AABCA1234F
              </p>
            </div>

            <div style={{ textAlign: 'right' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1E293B' }}>TAX INVOICE</h3>
              <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-primary)', marginTop: '0.25rem' }}>
                {invoice.invoiceNumber}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.25rem' }}>
                Date: <strong>{invoice.issueDate}</strong><br />
                Due: <strong>{invoice.dueDate}</strong>
              </div>
            </div>
          </div>

          {/* Client Billed To */}
          <div style={{ margin: '1rem 0' }}>
            <span style={{ fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', color: '#94A3B8' }}>
              BILLED TO / RECIPIENT
            </span>
            <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#1E293B', marginTop: '0.25rem' }}>
              {invoice.clientName}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
              {invoice.clientEmail}<br />
              {invoice.clientAddress}
            </div>
          </div>

          {/* Line Items Table */}
          <div className="table-container" style={{ margin: '1rem 0', border: '1px solid var(--color-border)' }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Description / Deliverables</th>
                  <th style={{ textAlign: 'center' }}>Qty</th>
                  <th style={{ textAlign: 'right' }}>Unit Rate (₹)</th>
                  <th style={{ textAlign: 'right' }}>Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item) => (
                  <tr key={item.id}>
                    <td><strong>{item.description}</strong></td>
                    <td style={{ textAlign: 'center' }}>{item.quantity}</td>
                    <td style={{ textAlign: 'right' }}>₹{item.unitPrice.toLocaleString('en-IN')}</td>
                    <td style={{ textAlign: 'right' }}><strong>₹{item.amount.toLocaleString('en-IN')}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Financial Summary */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
            <div style={{ width: '280px', display: 'flex', flexDirection: 'column', gap: '0.375rem', fontSize: '0.8125rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Taxable Subtotal:</span>
                <span>₹{invoice.subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>GST ({invoice.taxRate}%):</span>
                <span>₹{invoice.taxAmount.toLocaleString('en-IN')}</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderTop: '2px solid var(--color-border)',
                  paddingTop: '0.5rem',
                  fontSize: '1rem',
                  fontWeight: 800,
                  color: 'var(--color-primary)'
                }}
              >
                <span>Total Amount:</span>
                <span>₹{invoice.totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Button variant="secondary" iconLeft={<Printer size={16} />} onClick={handlePrint}>
              Print Invoice
            </Button>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {invoice.status !== 'Paid' && (
              <Button
                variant="primary"
                iconLeft={<CheckCircle2 size={16} />}
                onClick={() => {
                  markInvoicePaid(invoice.id);
                  onClose();
                }}
              >
                Mark as Settled (Paid)
              </Button>
            )}
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
