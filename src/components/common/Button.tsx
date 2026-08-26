import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  isLoading?: boolean;
  isIconOnly?: boolean;
  children?: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  iconLeft,
  iconRight,
  isLoading = false,
  isIconOnly = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const sizeClass = size === 'sm' ? 'btn-sm' : size === 'lg' ? 'btn-lg' : '';
  const iconOnlyClass = isIconOnly ? 'btn-icon-only' : '';

  return (
    <button
      className={`btn btn-${variant} ${sizeClass} ${iconOnlyClass} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="animate-spin" size={size === 'sm' ? 14 : 18} />
      ) : (
        iconLeft
      )}
      {children}
      {!isLoading && iconRight}
    </button>
  );
};
