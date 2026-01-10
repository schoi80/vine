'use client';

import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, X } from 'lucide-react';
import { useEntityPanel } from '@/lib/contexts/EntityPanelContext';
import { getTileConfig } from '@/lib/map/tiles';

// Fix default marker icon issue in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconUrl: '/leaflet/marker-icon.png',
  shadowUrl: '/leaflet/marker-shadow.png',
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

interface FullMapViewProps {
  places: Place[];
}

export default function FullMapView({ places }: FullMapViewProps) {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const { open } = useEntityPanel();
  const tile = getTileConfig();

  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={[31.7683, 35.2137]}
        zoom={6}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer attribution={tile.attribution} url={tile.url} />
        {places.map(place => (
          <Marker
            key={place.id}
            position={[place.latitude, place.longitude]}
            eventHandlers={{
              click: () => {
                setSelectedPlace(place);
                open('place', place.slug);
              },
            }}
          >
            <Popup>
              <div className="text-sm">
                <button
                  onClick={() => open('place', place.slug)}
                  className="text-accent-place text-left font-semibold hover:underline"
                >
                  {place.name}
                </button>
                {place.featureType && (
                  <p className="text-text-secondary mt-1 text-xs capitalize">{place.featureType}</p>
                )}
                <p className="text-accent-place mt-1 text-xs">View details →</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Floating info panel */}
      <div className="bg-background border-border absolute top-4 right-4 z-10 max-w-sm rounded-lg border p-4 shadow-lg dark:bg-gray-100">
        <h2 className="text-text-primary mb-2 text-lg font-bold">Biblical Places</h2>
        <p className="text-text-secondary text-sm">{places.length} places with coordinates</p>
      </div>

      {/* Selected place details panel */}
      {selectedPlace && (
        <div className="bg-background border-border absolute right-4 bottom-4 z-10 max-w-md rounded-lg border p-4 shadow-lg dark:bg-gray-100">
          <button
            onClick={() => setSelectedPlace(null)}
            className="hover:bg-hover absolute top-2 right-2 rounded p-1"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="flex items-start gap-3">
            <MapPin className="text-accent-place mt-1 h-5 w-5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-text-primary font-semibold">{selectedPlace.name}</h3>
              {selectedPlace.featureType && (
                <p className="text-text-secondary text-xs capitalize">
                  {selectedPlace.featureType}
                </p>
              )}
              {selectedPlace.description && (
                <p className="text-text-primary mt-2 line-clamp-3 text-sm">
                  {selectedPlace.description}
                </p>
              )}
              <button
                onClick={() => open('place', selectedPlace.slug)}
                className="text-accent-place mt-2 inline-block text-sm hover:underline"
              >
                View full details →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
