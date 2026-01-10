'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { useLanguage } from '@/lib/contexts/LanguageContext';

interface ChapterSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookTitle: string;
  bookTitleKr: string;
  bookSlug: string;
  currentChapter: number;
  totalChapters: number;
}

export default function ChapterSelectorModal({
  isOpen,
  onClose,
  bookTitle,
  bookTitleKr,
  bookSlug,
  currentChapter,
  totalChapters,
}: ChapterSelectorModalProps) {
  const { language } = useLanguage();
  const router = useRouter();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleChapterClick = (chapter: number) => {
    router.push(`/read/${bookSlug}/${chapter}`);
    onClose();
  };

  const displayTitle = language === 'ko' ? bookTitleKr : bookTitle;
  const secondaryTitle = language === 'ko' ? bookTitle : bookTitleKr;

  const chapters = Array.from({ length: totalChapters }, (_, i) => i + 1);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div
              className="pointer-events-auto max-h-[80vh] w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-neutral-900"
              onClick={e => e.stopPropagation()}
            >
              <div className="border-neutral-6 dark:border-neutral-dark-6 flex items-start justify-between border-b p-6">
                <div className="min-w-0 flex-1 pr-4">
                  <h2
                    className={`text-neutral-12 dark:text-neutral-dark-12 mb-1 text-2xl font-bold ${
                      language === 'ko' ? 'font-song-myung' : ''
                    }`}
                  >
                    {displayTitle}
                  </h2>
                  <p
                    className={`text-neutral-11 dark:text-neutral-dark-11 text-sm ${
                      language === 'en' ? 'font-song-myung' : ''
                    }`}
                  >
                    {secondaryTitle}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="hover:bg-neutral-3 dark:hover:bg-neutral-dark-3 text-neutral-11 dark:text-neutral-dark-11 flex-shrink-0 rounded-lg p-2 transition-colors"
                  aria-label="Close chapter selector"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="max-h-[calc(80vh-120px)] overflow-y-auto p-6">
                <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8">
                  {chapters.map(chapter => {
                    const isCurrent = chapter === currentChapter;
                    return (
                      <button
                        key={chapter}
                        onClick={() => handleChapterClick(chapter)}
                        className={`relative aspect-square rounded-lg text-base font-semibold transition-all duration-200 ${
                          isCurrent
                            ? 'scale-105 bg-blue-600 text-white shadow-lg shadow-blue-500/50 dark:bg-blue-500 dark:shadow-blue-400/50'
                            : 'bg-neutral-3 dark:bg-neutral-dark-3 text-neutral-12 dark:text-neutral-dark-12 hover:scale-105 hover:bg-blue-100 hover:text-blue-700 hover:shadow-md dark:hover:bg-blue-900/30 dark:hover:text-blue-300'
                        } `}
                        aria-label={`Go to chapter ${chapter}`}
                        aria-current={isCurrent ? 'true' : undefined}
                      >
                        <span className="absolute inset-0 flex items-center justify-center">
                          {chapter}
                        </span>
                        {isCurrent && (
                          <span className="absolute top-1 right-1">
                            <Check className="h-3 w-3 drop-shadow-md" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
