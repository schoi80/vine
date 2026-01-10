import { getClient } from '@/lib/apollo/client';
import { gql } from '@apollo/client';
import MapPageClient from '@/components/visualizations/MapPageClient';

const GET_ALL_PLACES = gql`
  query GetAllPlaces {
    places {
      id
      name
      slug
      latitude
      longitude
      featureType
      description
    }
  }
`;

export default async function MapPage() {
  const client = getClient();
  const { data } = await client.query<{ places: any[] }>({
    query: GET_ALL_PLACES,
  });

  // Filter places that have valid coordinates (lat: -90 to 90, lng: -180 to 180)
  const placesWithValidCoordinates = (data?.places || []).filter(
    (place: any) =>
      place.latitude != null &&
      place.longitude != null &&
      place.latitude >= -90 &&
      place.latitude <= 90 &&
      place.longitude >= -180 &&
      place.longitude <= 180
  );

  return <MapPageClient places={placesWithValidCoordinates} />;
}

export async function generateMetadata() {
  return {
    title: 'Biblical Places Map - in the vine',
    description: 'Explore all biblical places on an interactive map',
  };
}
