'use client';

import { useEffect } from 'react';
import HomePage from '@/components/home/HomePage';

export default function Home() {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  return <HomePage />;
}
