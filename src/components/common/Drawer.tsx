import React, { useEffect, ReactNode } from 'react';
import { X } from 'lucide-react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  maxWidth?: string;
  width?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  maxWidth = '680px',
  width
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actualWidth = width || maxWidth;

  return (
    <div className="drawer-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="drawer-content"
        style={{ maxWidth: actualWidth, width: '100%' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header" style={{ padding: '1.25rem 1.75rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
              {title}
            </h2>
            {subtitle && (
              <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', marginTop: '0.125rem' }}>
                {subtitle}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="btn-icon-only btn-ghost"
            style={{ borderRadius: 'var(--radius-pill)', color: 'var(--color-text-muted)' }}
            aria-label="Close drawer"
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body" style={{ padding: '1.75rem', flex: 1, overflowY: 'auto' }}>
          {children}
        </div>

        {footer && <div className="modal-footer" style={{ padding: '1.25rem 1.75rem' }}>{footer}</div>}
      </div>
    </div>
  );
};
