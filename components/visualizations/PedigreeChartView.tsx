'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const PedigreeChart = dynamic(() => import('./PedigreeChart'), {
  ssr: false,
  loading: () => (
    <div className="flex h-96 items-center justify-center">
      <div className="text-gray-500">Loading family tree...</div>
    </div>
  ),
});

interface PedigreeChartViewProps {
  slug: string;
}

export default function PedigreeChartView({ slug }: PedigreeChartViewProps) {
  return <PedigreeChart slug={slug} />;
}
