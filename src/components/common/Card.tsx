import React, { ReactNode, CSSProperties } from 'react';

export interface CardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', style, onClick }) => {
  return (
    <div className={`card ${className}`} style={style} onClick={onClick}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{
  title?: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}> = ({ title, subtitle, action, className = '', style, children }) => {
  return (
    <div className={`card-header ${className}`} style={style}>
      {children ? (
        children
      ) : (
        <>
          <div>
            {title && <h3 className="card-title">{title}</h3>}
            {subtitle && <p className="card-subtitle">{subtitle}</p>}
          </div>
          {action && <div className="card-header-action">{action}</div>}
        </>
      )}
    </div>
  );
};

export const CardBody: React.FC<{ children: ReactNode; className?: string; style?: CSSProperties }> = ({
  children,
  className = '',
  style
}) => {
  return (
    <div className={`card-body ${className}`} style={style}>
      {children}
    </div>
  );
};

export const CardFooter: React.FC<{ children: ReactNode; className?: string; style?: CSSProperties }> = ({
  children,
  className = '',
  style
}) => {
  return (
    <div className={`card-footer ${className}`} style={style}>
      {children}
    </div>
  );
};
