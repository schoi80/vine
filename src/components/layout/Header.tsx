'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import { cn } from '@/lib/utils/cn';
import { Menu, X, ChevronRight } from 'lucide-react';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const original = document.body.style.overflow;
    if (open) document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      const toFocus =
        panelRef.current?.querySelector<HTMLElement>(
          'button, [href], select, [tabindex]:not([tabindex="-1"])'
        ) || panelRef.current;
      toFocus?.focus();
    } else {
      triggerRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setOpen(false);
        return;
      }
      if (e.key === 'Tab' && panelRef.current) {
        const focusables = Array.from(
          panelRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
        ).filter(el => !el.hasAttribute('disabled'));
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;

        if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const isHome = pathname === '/';
  const isBrowse = pathname.startsWith('/browse') || pathname.startsWith('/read');
  const isMap = pathname.startsWith('/map');
  const isTimeline = pathname.startsWith('/timeline');

  const getLinkClasses = (isActive: boolean) => {
    return cn(
      'text-sm font-semibold transition-colors text-shadow-contrast rounded-sm px-2 py-1',
      isActive ? 'text-white' : 'text-white/80 hover:text-white'
    );
  };

  const getMobileLinkClasses = (isActive: boolean) => {
    return cn(
      'flex items-center justify-between px-3 py-2 rounded-md transition-colors',
      isActive
        ? 'bg-neutral-3 dark:bg-neutral-dark-3 text-neutral-12 dark:text-neutral-dark-12 font-semibold'
        : 'hover:bg-neutral-3 dark:hover:bg-neutral-dark-3 text-neutral-12 dark:text-neutral-dark-12'
    );
  };

  return (
    <>
      <header
        className={cn(
          'z-header sticky top-0',
          isHome
            ? 'border-transparent bg-transparent backdrop-blur-sm'
            : 'border-b border-white/10 backdrop-blur-sm'
        )}
        style={!isHome ? { backgroundColor: 'rgba(50, 60, 97, 0.8)' } : undefined}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-14 items-center justify-between">
            <Link href="/" className="group flex items-center gap-3" aria-label="navhome">
              <Image
                src="/onnuri_v1.png"
                alt="logo"
                width={32}
                height={32}
                priority
                className="transition-opacity group-hover:opacity-80"
              />
              <span
                className={cn(
                  'font-kaushan-script text-shadow-contrast text-2xl font-bold text-white transition-colors group-hover:text-white/80'
                )}
              >
                {t('nav.appTitle')}
              </span>
            </Link>

            <nav className="hidden items-center gap-6 md:flex">
              <Link href="/browse" className={getLinkClasses(isBrowse)}>
                {t('nav.browse')}
              </Link>
              <Link href="/map" className={getLinkClasses(isMap)}>
                {t('nav.map')}
              </Link>
              <Link href="/timeline" className={getLinkClasses(isTimeline)}>
                {t('nav.timeline')}
              </Link>
            </nav>

            <div className="flex items-center gap-2">
              <button
                ref={triggerRef}
                className={cn(
                  'text-shadow-contrast inline-flex items-center justify-center rounded-md p-2 text-white transition-colors hover:bg-white/10 md:hidden'
                )}
                aria-label={t('nav.openMenu')}
                aria-expanded={open}
                onClick={() => setOpen(true)}
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </button>

              <div className="bg-neutral-2 dark:bg-neutral-dark-2 hidden items-center gap-1 rounded-full p-0.5 md:flex">
                <button
                  onClick={() => setLanguage('en')}
                  className={cn(
                    'rounded-full px-3 py-1.5 text-sm transition-all',
                    language === 'en'
                      ? 'dark:bg-neutral-dark-12 text-neutral-12 dark:text-neutral-dark-1 border-neutral-6 dark:border-neutral-dark-6 border bg-white font-semibold shadow-lg'
                      : 'text-shadow-contrast text-white hover:text-white/80'
                  )}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('ko')}
                  className={cn(
                    'rounded-full px-3 py-1.5 text-sm transition-all',
                    language === 'ko'
                      ? 'dark:bg-neutral-dark-12 text-neutral-12 dark:text-neutral-dark-1 border-neutral-6 dark:border-neutral-dark-6 border bg-white font-semibold shadow-lg'
                      : 'text-shadow-contrast text-white hover:text-white/80'
                  )}
                >
                  한국어
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="z-overlay fixed inset-0 bg-black/25 backdrop-blur-sm"
              role="presentation"
              onClick={() => setOpen(false)}
            />

            <motion.div
              ref={panelRef}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{
                type: 'spring',
                damping: 30,
                stiffness: 300,
              }}
              role="dialog"
              aria-modal="true"
              className="z-drawer fixed top-0 left-0 isolate h-full w-[80vw] max-w-[320px] overflow-y-auto bg-white shadow-xl outline-none dark:bg-neutral-900"
              tabIndex={-1}
            >
              <div className="border-neutral-6 dark:border-neutral-dark-6 flex items-center justify-between border-b p-4">
                <span className="text-neutral-12 dark:text-neutral-dark-12 font-semibold">
                  {t('nav.menu')}
                </span>
                <button
                  className="hover:bg-neutral-3 dark:hover:bg-neutral-dark-3 text-neutral-12 dark:text-neutral-dark-12 rounded-md p-2 transition-colors"
                  onClick={() => setOpen(false)}
                  aria-label={t('nav.closeMenu')}
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <nav className="p-2">
                <Link
                  href="/"
                  className={getMobileLinkClasses(isHome)}
                  onClick={() => setOpen(false)}
                >
                  <span>{t('nav.home')}</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/browse"
                  className={getMobileLinkClasses(isBrowse)}
                  onClick={() => setOpen(false)}
                >
                  <span>{t('nav.browse')}</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/map"
                  className={getMobileLinkClasses(isMap)}
                  onClick={() => setOpen(false)}
                >
                  <span>{t('nav.map')}</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/timeline"
                  className={getMobileLinkClasses(isTimeline)}
                  onClick={() => setOpen(false)}
                >
                  <span>{t('nav.timeline')}</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </nav>

              <div className="border-neutral-6 dark:border-neutral-dark-6 border-t px-4 py-3">
                <div className="bg-neutral-2 dark:bg-neutral-dark-2 flex items-center gap-1 rounded-full p-0.5">
                  <button
                    onClick={() => setLanguage('en')}
                    className={cn(
                      'flex-1 rounded-full px-3 py-1.5 text-sm transition-all',
                      language === 'en'
                        ? 'dark:bg-neutral-dark-12 text-neutral-12 dark:text-neutral-dark-1 border-neutral-6 dark:border-neutral-dark-6 border bg-white font-semibold shadow-lg'
                        : 'text-neutral-12 hover:text-neutral-11 dark:text-white dark:hover:text-white/80'
                    )}
                    aria-label={language === 'en' ? 'English selected' : 'Switch to English'}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => setLanguage('ko')}
                    className={cn(
                      'flex-1 rounded-full px-3 py-1.5 text-sm transition-all',
                      language === 'ko'
                        ? 'dark:bg-neutral-dark-12 text-neutral-12 dark:text-neutral-dark-1 border-neutral-6 dark:border-neutral-dark-6 border bg-white font-semibold shadow-lg'
                        : 'text-neutral-12 hover:text-neutral-11 dark:text-white dark:hover:text-white/80'
                    )}
                    aria-label={language === 'ko' ? '한국어 선택됨' : '한국어로 변경'}
                  >
                    한국어
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
