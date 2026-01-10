'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import { extractPlacesFromVerses } from './utils/extractPlaces';
import { calculateMapBounds } from './utils/mapBounds';
import { useEntityPanel } from '@/lib/contexts/EntityPanelContext';

// Dynamic import to avoid SSR issues with Leaflet
const Map = dynamic(() => import('./Map'), {
  ssr: false,
  loading: () => (
    <div className="flex h-64 animate-pulse items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
      <MapPin className="h-8 w-8 text-gray-400" />
    </div>
  ),
});

interface Verse {
  verseNum: number;
  mentionsPlaces?: Array<{
    id: string;
    slug: string;
    name: string;
    latitude?: number;
    longitude?: number;
    featureType?: string;
  }>;
}

interface ChapterMapViewProps {
  verses: Verse[];
}

/**
 * Collapsible map showing places mentioned in the current chapter
 * Only renders if chapter has places with coordinates
 */
export default function ChapterMapView({ verses }: ChapterMapViewProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { open } = useEntityPanel();

  const places = extractPlacesFromVerses(verses);

  // Don't render if no places with coordinates
  if (places.length === 0) {
    return null;
  }

  const { center, zoom } = calculateMapBounds(places);

  return (
    <div className="border-border mb-8 overflow-hidden rounded-lg border">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-background hover:bg-hover flex w-full items-center justify-between p-4 transition-colors"
      >
        <div className="flex items-center gap-2">
          <MapPin className="text-accent-place h-5 w-5" />
          <span className="text-text-primary font-medium">
            {places.length} {places.length === 1 ? 'Place' : 'Places'} Mentioned
          </span>
        </div>
        {isExpanded ? (
          <ChevronUp className="text-text-secondary h-5 w-5" />
        ) : (
          <ChevronDown className="text-text-secondary h-5 w-5" />
        )}
      </button>

      {isExpanded && (
        <div className="border-border border-t p-4">
          <Map places={places} center={center} zoom={zoom} height="400px" />
          <div className="mt-4 flex flex-wrap gap-2">
            {places.map(place => (
              <button
                key={place.id}
                onClick={() => open('place', place.slug)}
                className="bg-accent-place/10 text-accent-place hover:bg-accent-place/20 inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm transition-colors"
              >
                <MapPin className="h-3 w-3" />
                {place.name}
                {place.verses && place.verses.length > 0 && (
                  <span className="text-xs opacity-70">(v{place.verses.join(', ')})</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
