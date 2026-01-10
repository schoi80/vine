'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { MapPin } from 'lucide-react';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import { getTileConfig } from '@/lib/map/tiles';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconUrl: '/leaflet/marker-icon.png',
  shadowUrl: '/leaflet/marker-shadow.png',
});

interface PlaceMapProps {
  name: string;
  latitude?: number | null;
  longitude?: number | null;
  height?: number;
  zoom?: number;
}

export function PlaceMap({ name, latitude, longitude, height = 240, zoom = 5 }: PlaceMapProps) {
  const { t } = useLanguage();
  const tile = getTileConfig();

  if (latitude == null || longitude == null) return null;

  return (
    <div className="space-y-2">
      <h3 className="text-neutral-11 flex items-center gap-1.5 text-sm font-semibold tracking-wider uppercase">
        <MapPin className="h-3.5 w-3.5" />
        {t('entityPanel.location')}
      </h3>
      <div className="border-neutral-6 overflow-hidden rounded-md border">
        <MapContainer
          center={[latitude, longitude]}
          zoom={zoom}
          scrollWheelZoom={false}
          style={{ height, width: '100%' }}
        >
          <TileLayer url={tile.url} attribution={tile.attribution} />
          <Marker position={[latitude, longitude]}>
            <Popup>{name}</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}
