import React from 'react';

export interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

export function Skeleton({
  className = '',
  variant = 'rectangular',
  width,
  height,
}: SkeletonProps) {
  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-md',
  };

  const style: React.CSSProperties = {
    width,
    height,
  };

  return (
    <div
      className={`bg-neutral-3 dark:bg-neutral-dark-3 animate-pulse ${variantClasses[variant]} ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
}

export function VerseSkeleton() {
  return (
    <div className="flex gap-3 py-3">
      <div className="w-8 shrink-0">
        <Skeleton variant="text" width={24} height={20} />
      </div>
      <div className="flex-1 space-y-2">
        <Skeleton variant="text" width="100%" height={20} />
        <Skeleton variant="text" width="95%" height={20} />
        <Skeleton variant="text" width="80%" height={20} />
        <div className="flex gap-2 pt-1">
          <Skeleton variant="rectangular" width={60} height={24} />
          <Skeleton variant="rectangular" width={70} height={24} />
          <Skeleton variant="rectangular" width={55} height={24} />
        </div>
      </div>
    </div>
  );
}

export function ChapterSkeleton({ verseCount = 10 }: { verseCount?: number }) {
  return (
    <div className="space-y-1">
      {Array.from({ length: verseCount }).map((_, i) => (
        <VerseSkeleton key={i} />
      ))}
    </div>
  );
}
