import React, { ReactNode } from 'react';

export interface TabItem {
  id: string;
  label: string;
  count?: number;
  icon?: ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  variant?: 'underline' | 'pills';
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  variant = 'underline',
  className = ''
}) => {
  if (variant === 'pills') {
    return (
      <div className={`pills-nav ${className}`} role="tablist">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              className={`pill-btn ${isActive ? 'active' : ''}`}
              onClick={() => onChange(tab.id)}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {typeof tab.count === 'number' && (
                <span
                  style={{
                    backgroundColor: isActive ? 'var(--color-primary)' : 'rgba(0, 0, 0, 0.08)',
                    color: isActive ? '#ffffff' : 'var(--color-text-secondary)',
                    padding: '0.1rem 0.4rem',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: '0.6875rem',
                    fontWeight: 700
                  }}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`tabs-nav ${className}`} role="tablist">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            className={`tab-btn ${isActive ? 'active' : ''}`}
            onClick={() => onChange(tab.id)}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {typeof tab.count === 'number' && (
              <span
                style={{
                  backgroundColor: isActive ? 'var(--color-primary-light)' : 'var(--color-surface-muted)',
                  color: isActive ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                  padding: '0.125rem 0.45rem',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '0.6875rem',
                  fontWeight: 700
                }}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
