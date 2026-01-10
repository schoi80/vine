import React from 'react';
import { LucideIcon, Users, MapPin, Calendar, BookOpen } from 'lucide-react';

/**
 * Entity-to-icon mapping
 * Maps entity types to their respective Lucide icons
 */
export const entityIconMap: Record<'person' | 'place' | 'event' | 'book', LucideIcon> = {
  person: Users,
  place: MapPin,
  event: Calendar,
  book: BookOpen,
};

/**
 * Icon size variants (aligned with 8px grid and compact density)
 */
export const iconSizeMap = {
  xs: 14, // Compact inline usage
  sm: 16, // Default UI size
  md: 20, // Emphasis, headers
  lg: 24, // Large buttons, hero elements
} as const;

export type IconSize = keyof typeof iconSizeMap;
export type EntityType = keyof typeof entityIconMap;

export interface IconProps {
  /**
   * Lucide icon component to render
   */
  icon?: LucideIcon;
  /**
   * Entity type for automatic icon selection (alternative to `icon` prop)
   */
  entityType?: EntityType;
  /**
   * Size variant (defaults to 'sm')
   */
  size?: IconSize;
  /**
   * Custom pixel size (overrides size variant)
   */
  customSize?: number;
  /**
   * Accessible label for screen readers
   */
  'aria-label'?: string;
  /**
   * Whether the icon is decorative (hides from screen readers)
   */
  decorative?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Stroke width (defaults to 2 for compact density)
   */
  strokeWidth?: number;
}

/**
 * Icon wrapper component with entity type support and consistent sizing
 *
 * Usage:
 * ```tsx
 * <Icon icon={Users} size="sm" aria-label="Person" />
 * <Icon entityType="person" size="md" />
 * <Icon icon={ChevronRight} decorative />
 * ```
 */
export function Icon({
  icon: IconComponent,
  entityType,
  size = 'sm',
  customSize,
  'aria-label': ariaLabel,
  decorative = false,
  className = '',
  strokeWidth = 2,
}: IconProps) {
  // Select icon from entity type if provided
  const ResolvedIcon = IconComponent || (entityType ? entityIconMap[entityType] : null);

  if (!ResolvedIcon) {
    console.warn('Icon component requires either `icon` or `entityType` prop');
    return null;
  }

  const iconSize = customSize || iconSizeMap[size];

  // Accessibility: decorative icons are hidden from screen readers
  const ariaProps = decorative
    ? { 'aria-hidden': 'true' as const }
    : ariaLabel
      ? { 'aria-label': ariaLabel, role: 'img' }
      : {};

  return (
    <ResolvedIcon size={iconSize} strokeWidth={strokeWidth} className={className} {...ariaProps} />
  );
}

/**
 * Entity icon shortcut component
 * Automatically applies entity color styling
 *
 * Usage:
 * ```tsx
 * <EntityIcon type="person" size="sm" />
 * ```
 */
export interface EntityIconProps extends Omit<IconProps, 'icon' | 'entityType'> {
  type: EntityType;
}

export function EntityIcon({ type, className = '', ...props }: EntityIconProps) {
  // Apply entity color from CSS variables
  const entityClass = `text-accent-${type}`;

  return <Icon entityType={type} className={`${entityClass} ${className}`} {...props} />;
}
