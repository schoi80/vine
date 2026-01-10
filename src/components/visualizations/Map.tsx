'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useEntityPanel } from '@/lib/contexts/EntityPanelContext';
import { getTileConfig } from '@/lib/map/tiles';

// Fix default marker icon issue in Next.js
// Leaflet expects icons to be in /images/ but Next.js serves from /public/
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconUrl: '/leaflet/marker-icon.png',
  shadowUrl: '/leaflet/marker-shadow.png',
});

interface Place {
  id: string;
  slug: string;
  name: string;
  latitude: number;
  longitude: number;
  featureType?: string;
}

interface MapProps {
  places: Place[];
  center?: [number, number];
  zoom?: number;
  height?: string;
  onMarkerClick?: (place: Place) => void;
}

export default function Map({
  places,
  center = [31.7683, 35.2137],
  zoom = 7,
  height = '400px',
  onMarkerClick,
}: MapProps) {
  const { open } = useEntityPanel();
  const tile = getTileConfig();

  return (
    <div
      style={{ height, width: '100%' }}
      className="border-border overflow-hidden rounded-lg border"
    >
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer attribution={tile.attribution} url={tile.url} />
        {places.map(place => (
          <Marker
            key={place.id}
            position={[place.latitude, place.longitude]}
            eventHandlers={{
              click: () => {
                open('place', place.slug);
                onMarkerClick?.(place);
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
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
