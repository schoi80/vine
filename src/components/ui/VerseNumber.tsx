import React from 'react';

export interface VerseNumberProps {
  number: number;
  highlight?: boolean;
  onClick?: () => void;
  className?: string;
}

export function VerseNumber({
  number,
  highlight = false,
  onClick,
  className = '',
}: VerseNumberProps) {
  const baseClasses = 'text-verse-number font-feature-tnum font-feature-smcp select-none';
  const interactiveClass = onClick
    ? 'cursor-pointer hover:text-neutral-11 dark:hover:text-neutral-dark-11'
    : '';
  const highlightClass = highlight
    ? 'text-neutral-12 dark:text-neutral-dark-12 font-semibold'
    : 'text-neutral-10 dark:text-neutral-dark-10';

  const Tag = onClick ? 'button' : 'span';

  return (
    <Tag
      onClick={onClick}
      className={`${baseClasses} ${highlightClass} ${interactiveClass} ${className}`}
      {...(onClick && { role: 'button', tabIndex: 0 })}
    >
      {number}
    </Tag>
  );
}
