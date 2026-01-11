import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  ariaLabel?: string;
  className?: string;
}

const sizeMap = {
  sm: 'loading-sm',
  md: 'loading-md',
  lg: 'loading-lg',
};

export default function LoadingSpinner({
  size = 'sm',
  ariaLabel = 'Loading',
  className = '',
}: LoadingSpinnerProps) {
  return (
    <span
      role="status"
      aria-label={ariaLabel}
      className={`loading loading-dots ${sizeMap[size]} ${className}`}
    />
  );
}
