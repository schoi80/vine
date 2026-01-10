'use client';

import Hero from './Hero';
import TodaysScriptureOverlay from './TodaysScriptureOverlay';

export default function HomePage() {
  return (
    <div className="fixed inset-0 overflow-hidden">
      <Hero />
      <TodaysScriptureOverlay />
    </div>
  );
}
