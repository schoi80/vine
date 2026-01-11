'use client';

import Hero from './Hero';
import TodaysScriptureOverlay from './TodaysScriptureOverlay';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <div className="fixed inset-0 overflow-hidden">
      <Hero />
      <TodaysScriptureOverlay />
      <Footer />
    </div>
  );
}
