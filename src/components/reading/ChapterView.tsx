'use client';

import { useLanguage } from '@/lib/contexts/LanguageContext';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import VerseCard from './VerseCard';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Languages } from 'lucide-react';

interface Verse {
  id: string;
  verseNum: number;
  text: string;
  mentionsPeople: Array<{
    id: string;
    slug: string;
    name: string;
    title?: string;
    gender?: string;
  }>;
  mentionsPlaces: Array<{
    id: string;
    slug: string;
    name: string;
    latitude?: number;
    longitude?: number;
    featureType?: string;
  }>;
  describesEvents: Array<{
    id: string;
    title: string;
    startDate?: number;
  }>;
}

interface Writer {
  id: string;
  name: string;
  slug: string;
}

interface ChapterViewProps {
  verses: Verse[];
  writers: Writer[];
}

export default function ChapterView({ verses, writers }: ChapterViewProps) {
  const { language } = useLanguage();
  const [showDualLanguage, setShowDualLanguage] = useState(true);
  const [selectedVerseIndex, setSelectedVerseIndex] = useState<number>(-1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedVerseIndex(prev => (prev < verses.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedVerseIndex(prev => (prev > 0 ? prev - 1 : prev));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [verses.length]);

  useEffect(() => {
    if (selectedVerseIndex >= 0 && selectedVerseIndex < verses.length) {
      const verseElement = document.getElementById(`verse-${verses[selectedVerseIndex].id}`);
      if (verseElement) {
        verseElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [selectedVerseIndex, verses]);

  return (
    <div>
      <span className="sr-only" role="status">
        Keyboard shortcuts: Arrow up/down to navigate verses
      </span>
      <div>
        <div className="mb-1 flex items-center justify-end gap-2">
          {writers && writers.length > 0 && (
            <div className="text-neutral-11 dark:text-neutral-dark-11 text-sm">
              Written by: {writers.map(w => w.name).join(', ')}
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowDualLanguage(!showDualLanguage)}
            className="gap-1.5"
            aria-pressed={showDualLanguage}
            aria-label={showDualLanguage ? 'Switch to single language' : 'Show dual language'}
          >
            <Icon icon={Languages} size="xs" decorative />
            {showDualLanguage ? 'Single' : 'Dual'}
          </Button>
        </div>

        <motion.div
          className="space-y-1"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.03,
              },
            },
          }}
        >
          {verses.map((verse, index) => (
            <motion.div
              key={verse.id}
              id={`verse-${verse.id}`}
              variants={{
                hidden: { opacity: 0, y: 8 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.3,
                    ease: [0.4, 0, 0.2, 1],
                  },
                },
              }}
            >
              <VerseCard
                verse={verse}
                language={language}
                showDualLanguage={showDualLanguage}
                isSelected={selectedVerseIndex === index}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
