interface PlaceWithCoordinates {
  latitude: number;
  longitude: number;
}

interface MapBounds {
  center: [number, number];
  zoom: number;
}

/**
 * Calculate appropriate map center and zoom level for a set of places
 * Returns Jerusalem as default center if no places provided
 */
export function calculateMapBounds(places: PlaceWithCoordinates[]): MapBounds {
  // Default to Jerusalem if no places
  if (places.length === 0) {
    return { center: [31.7683, 35.2137], zoom: 5 };
  }

  // Single place: center on it with closer zoom
  if (places.length === 1) {
    return {
      center: [places[0].latitude, places[0].longitude],
      zoom: 5,
    };
  }

  // Multiple places: calculate bounding box center
  const lats = places.map(p => p.latitude);
  const lngs = places.map(p => p.longitude);

  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);

  const centerLat = (minLat + maxLat) / 2;
  const centerLng = (minLng + maxLng) / 2;

  // // Calculate appropriate zoom based on bounding box size
  // const latDiff = maxLat - minLat;
  // const lngDiff = maxLng - minLng;
  // const maxDiff = Math.max(latDiff, lngDiff);

  // // Rough zoom calculation with higher zoom levels
  const zoom = 4;
  // if (maxDiff < 0.5) zoom = 10;
  // else if (maxDiff < 1) zoom = 9;
  // else if (maxDiff < 2) zoom = 8;
  // else if (maxDiff < 5) zoom = 7;
  // else if (maxDiff < 10) zoom = 6;

  return {
    center: [centerLat, centerLng],
    zoom,
  };
}
