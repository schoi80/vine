import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  ariaLabel?: string;
  className?: string;
}

const sizeMap = {
  sm: 'daisy-loading-sm',
  md: 'daisy-loading-md',
  lg: 'daisy-loading-lg',
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
      className={`daisy-loading daisy-loading-dots ${sizeMap[size]} ${className}`}
    />
  );
}
