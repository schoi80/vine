import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  ariaLabel?: string;
  className?: string;
}

const sizeMap = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
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
      className={`border-neutral-6 border-t-neutral-11 inline-block animate-spin rounded-full border-2 ${sizeMap[size]} ${className}`}
    />
  );
}
