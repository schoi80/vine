'use client';

import { useState, useMemo } from 'react';
import { Search, X, Users, MapPin, Calendar } from 'lucide-react';
import type { TimelineEvent, TimelineFilters as Filters, EventEra } from '@/lib/types/timeline';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import { getAllEras } from '@/lib/constants/eventEras';

interface TimelineFiltersProps {
  events: TimelineEvent[];
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  mode?: 'full' | 'compact';
  hideHeader?: boolean;
}

/**
 * Timeline Filters Component
 * Provides UI controls for filtering timeline events
 * Supports full sidebar mode and compact chip mode
 */
export default function TimelineFilters({
  events,
  filters,
  onFiltersChange,
  mode = 'full',
  hideHeader = false,
}: TimelineFiltersProps) {
  const { language, t } = useLanguage();
  const [searchInput, setSearchInput] = useState(filters.searchQuery);

  // Extract unique people and places from events
  const { allPeople, allPlaces } = useMemo(() => {
    const peopleMap = new Map<string, { slug: string; name: string }>();
    const placesMap = new Map<string, { slug: string; name: string }>();

    events.forEach(event => {
      event.participants?.forEach(person => {
        if (!peopleMap.has(person.slug)) {
          peopleMap.set(person.slug, { slug: person.slug, name: person.name });
        }
      });

      event.occurredIn?.forEach(place => {
        if (!placesMap.has(place.slug)) {
          placesMap.set(place.slug, { slug: place.slug, name: place.name });
        }
      });
    });

    return {
      allPeople: Array.from(peopleMap.values()).sort((a, b) => a.name.localeCompare(b.name)),
      allPlaces: Array.from(placesMap.values()).sort((a, b) => a.name.localeCompare(b.name)),
    };
  }, [events]);

  const eras = getAllEras();

  // Toggle person filter
  const togglePerson = (slug: string) => {
    const newSet = new Set(filters.personSlugs);
    if (newSet.has(slug)) {
      newSet.delete(slug);
    } else {
      newSet.add(slug);
    }
    onFiltersChange({ ...filters, personSlugs: newSet });
  };

  // Toggle place filter
  const togglePlace = (slug: string) => {
    const newSet = new Set(filters.placeSlugs);
    if (newSet.has(slug)) {
      newSet.delete(slug);
    } else {
      newSet.add(slug);
    }
    onFiltersChange({ ...filters, placeSlugs: newSet });
  };

  // Toggle era filter
  const toggleEra = (era: EventEra) => {
    const newSet = new Set(filters.eras);
    if (newSet.has(era)) {
      newSet.delete(era);
    } else {
      newSet.add(era);
    }
    onFiltersChange({ ...filters, eras: newSet });
  };

  // Handle search
  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    onFiltersChange({ ...filters, searchQuery: value });
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSearchInput('');
    onFiltersChange({
      personSlugs: new Set(),
      placeSlugs: new Set(),
      eras: new Set(),
      searchQuery: '',
    });
  };

  const hasActiveFilters =
    filters.personSlugs.size > 0 ||
    filters.placeSlugs.size > 0 ||
    filters.eras.size > 0 ||
    filters.searchQuery.length > 0;

  // Compact mode: Show active filters as removable chips
  if (mode === 'compact') {
    return (
      <div className="flex flex-wrap items-center gap-2">
        {/* Active person filters */}
        {Array.from(filters.personSlugs).map(slug => {
          const person = allPeople.find(p => p.slug === slug);
          if (!person) return null;
          return (
            <button
              key={`person-${slug}`}
              onClick={() => togglePerson(slug)}
              className="text-accent-person flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs transition-colors hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30"
            >
              <Users className="h-3 w-3" />
              <span>{person.name}</span>
              <X className="h-3 w-3" />
            </button>
          );
        })}

        {/* Active place filters */}
        {Array.from(filters.placeSlugs).map(slug => {
          const place = allPlaces.find(p => p.slug === slug);
          if (!place) return null;
          return (
            <button
              key={`place-${slug}`}
              onClick={() => togglePlace(slug)}
              className="text-accent-place flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs transition-colors hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/30"
            >
              <MapPin className="h-3 w-3" />
              <span>{place.name}</span>
              <X className="h-3 w-3" />
            </button>
          );
        })}

        {/* Active era filters */}
        {Array.from(filters.eras).map(era => {
          const eraConfig = eras.find(e => e.id === era);
          if (!eraConfig) return null;
          return (
            <button
              key={`era-${era}`}
              onClick={() => toggleEra(era)}
              className="flex items-center gap-1 rounded-full px-2 py-1 text-xs transition-colors"
              style={{
                backgroundColor: `${eraConfig.color}20`,
                color: eraConfig.color,
              }}
            >
              <Calendar className="h-3 w-3" />
              <span>{language === 'ko' ? eraConfig.titleKr : eraConfig.title}</span>
              <X className="h-3 w-3" />
            </button>
          );
        })}

        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-text-secondary hover:text-text-primary text-xs underline"
          >
            {t('timeline.clearAll')}
          </button>
        )}
      </div>
    );
  }

  // Full mode: Show full filter sidebar
  return (
    <div className="space-y-6">
      {!hideHeader && (
        <div className="flex items-center justify-between">
          <h3 className="text-text-primary text-lg font-semibold">{t('timeline.filters')}</h3>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-text-secondary hover:text-text-primary text-sm"
            >
              {t('timeline.clearAll')}
            </button>
          )}
        </div>
      )}

      {hideHeader && hasActiveFilters && (
        <div className="flex justify-end">
          <button
            onClick={clearAllFilters}
            className="text-text-secondary hover:text-text-primary text-sm"
          >
            {t('timeline.clearAll')}
          </button>
        </div>
      )}

      {/* Search */}
      <div>
        <label className="text-text-secondary mb-2 block text-sm font-medium">
          {t('timeline.search')}
        </label>
        <div className="relative">
          <Search className="text-text-secondary absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <input
            type="text"
            value={searchInput}
            onChange={e => handleSearchChange(e.target.value)}
            placeholder={t('timeline.search')}
            className="border-border text-text-primary placeholder:text-text-secondary focus:ring-accent-event w-full rounded-lg border bg-white py-2 pr-3 pl-9 focus:ring-2 focus:outline-none dark:bg-gray-300"
          />
        </div>
      </div>

      {/* Filter by People */}
      {allPeople.length > 0 && (
        <div>
          <label className="text-text-secondary mb-2 block flex items-center gap-2 text-sm font-medium">
            <Users className="h-4 w-4" />
            {t('timeline.filterByPeople')}
          </label>
          <div className="max-h-48 space-y-1 overflow-y-auto">
            {allPeople.map(person => (
              <label
                key={person.slug}
                className="hover:bg-hover flex cursor-pointer items-center gap-2 rounded p-2"
              >
                <input
                  type="checkbox"
                  checked={filters.personSlugs.has(person.slug)}
                  onChange={() => togglePerson(person.slug)}
                  className="text-accent-person focus:ring-accent-person rounded border-gray-300"
                />
                <span className="text-text-primary text-sm">{person.name}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Filter by Places */}
      {allPlaces.length > 0 && (
        <div>
          <label className="text-text-secondary mb-2 block flex items-center gap-2 text-sm font-medium">
            <MapPin className="h-4 w-4" />
            {t('timeline.filterByPlaces')}
          </label>
          <div className="max-h-48 space-y-1 overflow-y-auto">
            {allPlaces.map(place => (
              <label
                key={place.slug}
                className="hover:bg-hover flex cursor-pointer items-center gap-2 rounded p-2"
              >
                <input
                  type="checkbox"
                  checked={filters.placeSlugs.has(place.slug)}
                  onChange={() => togglePlace(place.slug)}
                  className="text-accent-place focus:ring-accent-place rounded border-gray-300"
                />
                <span className="text-text-primary text-sm">{place.name}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Filter by Era */}
      <div>
        <label className="text-text-secondary mb-2 block flex items-center gap-2 text-sm font-medium">
          <Calendar className="h-4 w-4" />
          {t('timeline.filterByEra')}
        </label>
        <div className="space-y-1">
          {eras.map(era => (
            <label
              key={era.id}
              className="hover:bg-hover flex cursor-pointer items-center gap-2 rounded p-2"
            >
              <input
                type="checkbox"
                checked={filters.eras.has(era.id)}
                onChange={() => toggleEra(era.id)}
                className="rounded border-gray-300"
                style={{ accentColor: era.color }}
              />
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: era.color }} />
              <span className="text-text-primary text-sm">
                {language === 'ko' ? era.titleKr : era.title}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
