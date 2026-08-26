import React, { ReactNode } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  iconColor?: 'coral' | 'blue' | 'emerald' | 'amber' | 'purple';
  trend?: {
    value: string;
    isUp: boolean;
    label?: string;
  };
  subtitle?: string;
  className?: string;
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  icon,
  iconColor = 'coral',
  trend,
  subtitle,
  className = '',
  onClick
}) => {
  return (
    <div
      className={`metric-card ${className}`}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <div className="metric-header">
        <div>
          <span className="metric-label">{label}</span>
          <div className="metric-value" style={{ marginTop: '0.375rem' }}>
            {value}
          </div>
        </div>
        <div className={`metric-icon-wrap metric-icon-${iconColor}`}>{icon}</div>
      </div>

      {(trend || subtitle) && (
        <div className="metric-footer">
          {trend && (
            <span className={`trend-badge ${trend.isUp ? 'trend-up' : 'trend-down'}`}>
              {trend.isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {trend.value}
            </span>
          )}
          <span>{trend?.label || subtitle}</span>
        </div>
      )}
    </div>
  );
};
