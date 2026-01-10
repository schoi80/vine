'use client';

import React, { useEffect } from 'react';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { usePathname } from 'next/navigation';
import { useEntityPanel } from '@/lib/contexts/EntityPanelContext';
import { useUIConfig } from '@/lib/config/uiConfig';
import { EntityPanel } from './EntityPanel';
import { PERSON_PANEL_QUERY, PLACE_PANEL_QUERY, EVENT_PANEL_QUERY } from '@/lib/apollo/queries';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import { getLocalizedTitle, getLocalizedValue } from '@/lib/utils/bilingual';

// Simplified types for query data since we handle any typing in the component
type QueryData = any;

export function EntityPanelContainer() {
  const { state, close, clearData } = useEntityPanel();
  const { isOpen, type, slug } = state;
  const { entityPanelAnimation } = useUIConfig();
  const { language } = useLanguage();
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

  const personQuery = useQuery<QueryData>(PERSON_PANEL_QUERY, {
    variables: { slug, first: 1, after: null },
    skip: !isOpen || type !== 'person' || !slug,
    fetchPolicy: 'cache-first',
  });

  const placeQuery = useQuery<QueryData>(PLACE_PANEL_QUERY, {
    variables: { slug, first: 1, after: null },
    skip: !isOpen || type !== 'place' || !slug,
    fetchPolicy: 'cache-first',
  });

  const eventQuery = useQuery<QueryData>(EVENT_PANEL_QUERY, {
    variables: { id: slug, first: 1, after: null },
    skip: !isOpen || type !== 'event' || !slug,
    fetchPolicy: 'cache-first',
  });

  // Don't check type/slug here - let AnimatePresence handle unmounting
  if (!type || !slug) {
    if (!isOpen) return null;
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
    entityData = personQuery.data?.people?.[0];
    debugInfo = `People: ${personQuery.data?.people?.length || 0}`;
  } else if (type === 'place') {
    currentQuery = placeQuery;
    entityData = placeQuery.data?.places?.[0];
    debugInfo = `Places: ${placeQuery.data?.places?.length || 0}`;
  } else {
    currentQuery = eventQuery;
    entityData = eventQuery.data?.events?.[0];
    debugInfo = `Events: ${eventQuery.data?.events?.length || 0}`;
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

  let entityName = '';
  if (type === 'event') {
    entityName = getLocalizedTitle(entityData, language);
  } else {
    entityName = getLocalizedValue(entityData, 'name', entityData.name, language);
  }

  return (
    <EntityPanel
      open={isOpen}
      onClose={close}
      onExitComplete={clearData}
      entityType={type}
      entitySlug={slug}
      entityName={entityName}
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
