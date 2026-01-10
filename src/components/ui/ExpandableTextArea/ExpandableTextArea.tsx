'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/lib/contexts/LanguageContext';

export interface ExpandableTextAreaProps {
  text: string;
  maxHeight?: number; // max height in pixels before truncating
  className?: string;
  textClassName?: string;
}

export function ExpandableTextArea({
  text,
  maxHeight = 180,
  className = '',
  textClassName = '',
}: ExpandableTextAreaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();
  const [expanded, setExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    // Reset expansion state when text changes
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setExpanded(false);
  }, [text]);

  useEffect(() => {
    if (!text || !containerRef.current) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsOverflowing(false);
      return;
    }

    const checkOverflow = () => {
      if (containerRef.current) {
        const isOverflowing = containerRef.current.scrollHeight > containerRef.current.clientHeight;
        setIsOverflowing(isOverflowing);
      }
    };

    checkOverflow();
    // Re-check after a brief delay to handle font loading or layout shifts
    const timer = setTimeout(checkOverflow, 100);

    return () => clearTimeout(timer);
  }, [text, language, expanded, maxHeight]);

  return (
    <div className={className}>
      <div className="relative">
        <div
          ref={containerRef}
          className={`relative overflow-hidden transition-all duration-200 ${
            expanded ? 'max-h-none' : ''
          }`}
          style={{ maxHeight: expanded ? undefined : `${maxHeight}px` }}
        >
          <p
            className={`text-neutral-11 dark:text-neutral-dark-11 text-xs leading-relaxed ${textClassName}`}
          >
            {text}
          </p>
        </div>
        {!expanded && isOverflowing && (
          <div
            className="summary-fade-gradient pointer-events-none absolute right-0 bottom-0 left-0 h-16"
            aria-hidden="true"
          />
        )}
      </div>
      {!expanded && isOverflowing && (
        <div className="mt-2 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded(true)}
            aria-expanded={expanded}
            className="bg-neutral-3 hover:bg-neutral-4 dark:bg-neutral-dark-3 dark:hover:bg-neutral-dark-4 rounded-md px-3 py-1.5 text-xs font-medium transition-all hover:shadow-sm"
          >
            {t('entityPanel.showMore')}
          </button>
        </div>
      )}
    </div>
  );
}
