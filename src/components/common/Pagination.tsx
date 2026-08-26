import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  pageSize?: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  pageSize = 10
}) => {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems || currentPage * pageSize);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.875rem 1.25rem',
        borderTop: '1px solid var(--color-border-subtle)',
        fontSize: 'var(--font-size-xs)',
        color: 'var(--color-text-secondary)'
      }}
    >
      <div>
        {totalItems ? (
          <span>
            Showing <strong style={{ color: 'var(--color-text-primary)' }}>{startItem}</strong> to{' '}
            <strong style={{ color: 'var(--color-text-primary)' }}>{endItem}</strong> of{' '}
            <strong style={{ color: 'var(--color-text-primary)' }}>{totalItems}</strong> entries
          </span>
        ) : (
          <span>
            Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
          </span>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
        <Button
          variant="secondary"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          iconLeft={<ChevronLeft size={14} />}
        >
          Previous
        </Button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            style={{
              width: '28px',
              height: '28px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid',
              borderColor: currentPage === page ? 'var(--color-primary)' : 'var(--color-border)',
              backgroundColor: currentPage === page ? 'var(--color-primary)' : '#ffffff',
              color: currentPage === page ? '#ffffff' : 'var(--color-text-primary)',
              fontSize: 'var(--font-size-xs)',
              fontWeight: currentPage === page ? 700 : 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {page}
          </button>
        ))}

        <Button
          variant="secondary"
          size="sm"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          iconRight={<ChevronRight size={14} />}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
