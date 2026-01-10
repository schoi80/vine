'use client';

import dynamic from 'next/dynamic';

// Dynamic import to avoid SSR issues with Leaflet
const Map = dynamic(() => import('./Map'), {
  ssr: false,
  loading: () => <div className="h-64 animate-pulse rounded-lg bg-gray-100 dark:bg-gray-800" />,
});

interface Place {
  id?: string;
  slug: string;
  name: string;
  latitude: number;
  longitude: number;
  featureType?: string;
}

interface PlaceDetailMapProps {
  place: Place;
}

/**
 * Client component wrapper for place detail maps
 * Allows dynamic import with ssr: false in Server Components
 */
export default function PlaceDetailMap({ place }: PlaceDetailMapProps) {
  return (
    <Map
      places={[
        {
          id: place.id || place.slug,
          slug: place.slug,
          name: place.name,
          latitude: place.latitude,
          longitude: place.longitude,
          featureType: place.featureType,
        },
      ]}
      center={[place.latitude, place.longitude]}
      zoom={10}
      height="300px"
    />
  );
}
