import { useLanguage } from '@/lib/contexts/LanguageContext';
import { EVENT_ERAS } from '@/lib/constants/eventEras';
import type { EventEra } from '@/lib/types/timeline';

interface EraHeaderProps {
  era: EventEra;
}

export default function EraHeader({ era }: EraHeaderProps) {
  const { language } = useLanguage();
  const eraConfig = EVENT_ERAS[era];

  if (!eraConfig) {
    return null;
  }

  const title = language === 'ko' ? eraConfig.titleKr : eraConfig.title;
  const fontClass = language === 'ko' ? 'font-song-myung' : 'font-serif';

  return (
    <div className="pointer-events-none sticky top-20 z-0 py-8">
      <h2
        className={`text-center text-4xl font-extrabold text-neutral-600 text-shadow-gray-400 text-shadow-lg md:text-6xl ${fontClass}`}
      >
        {title}
      </h2>
    </div>
  );
}
