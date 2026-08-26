import React from 'react';

interface AvatarProps {
  src?: string;
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ src, name, size = 'md', className = '' }) => {
  const getInitials = (n: string) => {
    if (!n) return 'AD';
    const parts = n.trim().split(' ');
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  // Generate deterministic pastel background from name
  const getBgColor = (n: string) => {
    const colors = ['#FF5B37', '#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#06B6D4', '#EC4899'];
    let hash = 0;
    for (let i = 0; i < n.length; i++) {
      hash = n.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  };

  return (
    <div
      className={`avatar avatar-${size} ${className}`}
      style={{ backgroundColor: !src ? getBgColor(name) : undefined }}
      title={name}
    >
      {src ? (
        <img
          src={src}
          alt={name}
          onError={(e) => {
            // fallback to initials on broken image
            e.currentTarget.style.display = 'none';
          }}
        />
      ) : (
        <span>{getInitials(name)}</span>
      )}
    </div>
  );
};
