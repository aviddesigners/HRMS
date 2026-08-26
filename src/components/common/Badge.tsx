import React, { ReactNode, CSSProperties } from 'react';

export interface BadgeProps {
  variant?: 'success' | 'warning' | 'error' | 'danger' | 'info' | 'purple' | 'primary' | 'neutral';
  children: ReactNode;
  showDot?: boolean;
  className?: string;
  style?: CSSProperties;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  children,
  showDot = false,
  className = '',
  style
}) => {
  const normVariant = variant === 'danger' ? 'error' : variant;
  return (
    <span className={`badge badge-${normVariant} ${className}`} style={style}>
      {showDot && <span className="badge-dot" />}
      {children}
    </span>
  );
};
