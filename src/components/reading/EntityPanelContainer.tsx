'use client';

import React, { useEffect } from 'react';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { usePathname } from 'next/navigation';
import { useEntityPanel } from '@/lib/contexts/EntityPanelContext';
import { useUIConfig } from '@/lib/config/uiConfig';
import { EntityPanel } from './EntityPanel';
import { PERSON_PANEL_QUERY, PLACE_PANEL_QUERY, EVENT_PANEL_QUERY } from '@/lib/apollo/queries';

type PersonQueryData = {
  people: Array<{
    id: string;
    name: string;
    slug: string;
    gender?: string;
    title?: string;
    description?: string;
  }>;
};

type PlaceQueryData = {
  places: Array<{
    id: string;
    name: string;
    slug: string;
    featureType?: string;
    latitude?: number;
    longitude?: number;
    description?: string;
  }>;
};

type EventQueryData = {
  events: Array<{
    id: string;
    title: string;
    startDate?: string;
  }>;
};

export function EntityPanelContainer() {
  const { state, close, clearData } = useEntityPanel();
  const { isOpen, type, slug } = state;
  const { entityPanelAnimation } = useUIConfig();
  const pathname = usePathname();
  const prevPathnameRef = React.useRef(pathname);

  useEffect(() => {
    const pathnameChanged = prevPathnameRef.current !== pathname;
    prevPathnameRef.current = pathname;

    if (!isOpen || !pathnameChanged) return;

    const isReadRoute = typeof pathname === 'string' && /^\/read\/[^/]+\/\d+$/.test(pathname);
    if (isReadRoute) {
      close();
    }
  }, [pathname, isOpen, close]);

  const personQuery = useQuery<PersonQueryData>(PERSON_PANEL_QUERY, {
    variables: { slug, first: 1, after: null },
    skip: !isOpen || type !== 'person' || !slug,
    fetchPolicy: 'cache-first',
  });

  const placeQuery = useQuery<PlaceQueryData>(PLACE_PANEL_QUERY, {
    variables: { slug, first: 1, after: null },
    skip: !isOpen || type !== 'place' || !slug,
    fetchPolicy: 'cache-first',
  });

  const eventQuery = useQuery<EventQueryData>(EVENT_PANEL_QUERY, {
    variables: { id: slug, first: 1, after: null },
    skip: !isOpen || type !== 'event' || !slug,
    fetchPolicy: 'cache-first',
  });

  // Don't check type/slug here - let AnimatePresence handle unmounting
  // If we return null immediately, the exit animation won't play
  if (!type || !slug) {
    // Never opened, safe to skip rendering
    if (!isOpen) return null;

    // Closing without data (shouldn't happen, but handle gracefully)
    return (
      <EntityPanel
        open={isOpen}
        onClose={close}
        onExitComplete={clearData}
        entityType="person"
        entitySlug=""
        entityName=""
        animationDuration={entityPanelAnimation.duration}
        animationStiffness={entityPanelAnimation.stiffness}
        animationDamping={entityPanelAnimation.damping}
        backdropClosable={entityPanelAnimation.backdropClosable}
      />
    );
  }

  let currentQuery;
  let entityData: any;
  let debugInfo = '';

  if (type === 'person') {
    currentQuery = personQuery;
    const person = personQuery.data?.people?.[0];
    entityData = person;
    debugInfo = `People: ${personQuery.data?.people?.length || 0} | Data: ${!!personQuery.data} | Error: ${personQuery.error?.message || 'none'} | NetworkStatus: ${personQuery.networkStatus}`;
  } else if (type === 'place') {
    currentQuery = placeQuery;
    const place = placeQuery.data?.places?.[0];
    entityData = place;
    debugInfo = `Places: ${placeQuery.data?.places?.length || 0} | Data: ${!!placeQuery.data} | Error: ${placeQuery.error?.message || 'none'} | NetworkStatus: ${placeQuery.networkStatus}`;
  } else {
    currentQuery = eventQuery;
    const event = eventQuery.data?.events?.[0];
    entityData = event;
    debugInfo = `Events: ${eventQuery.data?.events?.length || 0} | Data: ${!!eventQuery.data} | Error: ${eventQuery.error?.message || 'none'} | NetworkStatus: ${eventQuery.networkStatus}`;
  }

  const { loading, error } = currentQuery;

  if (loading && !entityData) {
    return (
      <EntityPanel
        open={isOpen}
        onClose={close}
        onExitComplete={clearData}
        entityType={type}
        entitySlug={slug}
        entityName="Loading..."
        animationDuration={entityPanelAnimation.duration}
        animationStiffness={entityPanelAnimation.stiffness}
        animationDamping={entityPanelAnimation.damping}
        backdropClosable={entityPanelAnimation.backdropClosable}
      />
    );
  }

  if (error || !entityData) {
    const errorMessage = error ? `Error: ${error.message}` : `Not found: ${slug}`;

    return (
      <EntityPanel
        open={isOpen}
        onClose={close}
        onExitComplete={clearData}
        entityType={type}
        entitySlug={slug}
        entityName={errorMessage}
        summary={`Type: ${type} | Slug: ${slug} | ${debugInfo} | Loading: ${loading}`}
        animationDuration={entityPanelAnimation.duration}
        animationStiffness={entityPanelAnimation.stiffness}
        animationDamping={entityPanelAnimation.damping}
        backdropClosable={entityPanelAnimation.backdropClosable}
      />
    );
  }

  const entityName = type === 'event' ? entityData.title : entityData.name;

  const entityNameKr = undefined;

  return (
    <EntityPanel
      open={isOpen}
      onClose={close}
      onExitComplete={clearData}
      entityType={type}
      entitySlug={slug}
      entityName={entityName}
      entityNameKr={entityNameKr}
      summary={entityData.description}
      latitude={type === 'place' ? entityData.latitude : undefined}
      longitude={type === 'place' ? entityData.longitude : undefined}
      startDate={type === 'event' ? entityData.startDate : undefined}
      animationDuration={entityPanelAnimation.duration}
      animationStiffness={entityPanelAnimation.stiffness}
      animationDamping={entityPanelAnimation.damping}
      backdropClosable={entityPanelAnimation.backdropClosable}
    />
  );
}
