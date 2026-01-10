'use client';

import { Search } from 'lucide-react';
import { useLanguage } from '@/lib/contexts/LanguageContext';

interface FiltersBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function FiltersBar({ value, onChange }: FiltersBarProps) {
  const { t } = useLanguage();

  return (
    <div className="sticky top-0 z-20 border-b border-neutral-200 bg-white/80 px-4 py-4 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/80">
      <div className="relative mx-auto max-w-md">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-400" />
        <input
          type="text"
          placeholder={t('timeline.search')}
          value={value}
          onChange={e => onChange(e.target.value)}
          className="focus:border-accent-event focus:ring-accent-event/20 w-full rounded-lg border border-neutral-200 py-2 pr-3 pl-9 focus:ring-2 focus:outline-none dark:border-neutral-800 dark:bg-neutral-900"
        />
      </div>
    </div>
  );
}
