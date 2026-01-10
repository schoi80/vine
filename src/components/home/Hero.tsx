'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

const HERO_IMAGES = [
  '/hero/hero2.png',
  // '/hero/hero1.jpg',
  // '/hero/hero2.jpg',
];

// Generate a deterministic but "random-looking" index based on the day
// This way, the image stays the same within a day but changes daily
function getDailyImageIndex(): number {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
  );
  return dayOfYear % HERO_IMAGES.length;
}

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Only use the daily image after mounting to avoid hydration mismatch
  const src = mounted ? (HERO_IMAGES[getDailyImageIndex()] ?? HERO_IMAGES[0]) : HERO_IMAGES[0];

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          transform: isMobile ? 'scale(1.0)' : 'scale(1.0)',
          transformOrigin: 'bottom right',
          transition: 'transform 0.3s ease-out',
        }}
      >
        <Image
          src={src}
          alt="Background hero image"
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover object-right-bottom"
        />
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/35 to-transparent" />
    </div>
  );
}
