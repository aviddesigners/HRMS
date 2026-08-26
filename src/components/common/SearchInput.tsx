import React, { InputHTMLAttributes } from 'react';
import { Search, X } from 'lucide-react';

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onValueChange: (val: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onValueChange,
  placeholder = 'Search...',
  className = '',
  ...props
}) => {
  return (
    <div className={`input-icon-wrapper ${className}`} style={{ minWidth: '220px' }}>
      <Search size={16} className="input-icon-left" />
      <input
        type="text"
        className="form-control has-icon-left has-icon-right"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        {...props}
      />
      {value && (
        <span
          className="input-icon-right"
          onClick={() => onValueChange('')}
          title="Clear search"
          style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
        >
          <X size={14} />
        </span>
      )}
    </div>
  );
};
