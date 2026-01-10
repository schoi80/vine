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

interface PlaceWithVerses {
  id: string;
  slug: string;
  name: string;
  latitude: number;
  longitude: number;
  featureType?: string;
  verses: number[];
}

/**
 * Validate if coordinates are within valid lat/lng range
 */
function isValidCoordinate(lat: number, lng: number): boolean {
  return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
}

/**
 * Extract unique places with valid coordinates from an array of verses
 * Returns places with verse numbers where they are mentioned
 * Filters out places with invalid coordinates (outside -90/90 lat, -180/180 lng)
 */
export function extractPlacesFromVerses(verses: Verse[]): PlaceWithVerses[] {
  const placesMap = new Map<string, PlaceWithVerses>();

  verses.forEach(verse => {
    verse.mentionsPlaces?.forEach(place => {
      if (
        place.latitude != null &&
        place.longitude != null &&
        isValidCoordinate(place.latitude, place.longitude)
      ) {
        const existing = placesMap.get(place.id);
        placesMap.set(place.id, {
          id: place.id,
          slug: place.slug,
          name: place.name,
          latitude: place.latitude,
          longitude: place.longitude,
          featureType: place.featureType,
          verses: [...(existing?.verses || []), verse.verseNum],
        });
      }
    });
  });

  return Array.from(placesMap.values());
}
