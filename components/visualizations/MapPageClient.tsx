'use client';

import dynamic from 'next/dynamic';

const FullMapView = dynamic(() => import('./FullMapView'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full animate-pulse items-center justify-center bg-gray-100 dark:bg-gray-800">
      <p className="text-gray-500">Loading map...</p>
    </div>
  ),
});

interface Place {
  id: string;
  name: string;
  slug: string;
  latitude: number;
  longitude: number;
  featureType?: string;
  description?: string;
}

interface MapPageClientProps {
  places: Place[];
}

export default function MapPageClient({ places }: MapPageClientProps) {
  return (
    <div className="h-full w-full">
      <FullMapView places={places} />
    </div>
  );
}
