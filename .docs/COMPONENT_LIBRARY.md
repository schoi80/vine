# UX Redesign Implementation - Component Library

## Overview

Comprehensive UX redesign for Bible Graph application with editorial elegance, compact density (8px grid), and full bilingual EN/KR support.

## Design System

**Full specification:** `/DESIGN_TOKENS.md`

### Key Design Principles
- **Visual tone**: Slightly expressive (editorial elegance with subtle details)
- **Theme**: Light/dark mode via CSS variables
- **Typography**: Open-source self-hosted fonts
- **Iconography**: Lucide React
- **Density**: Compact (8px grid)
- **Focus**: Enhanced reading with inline exploration

### Color System
- **Neutral scale**: 12-step scale (neutral-1 to neutral-12)
- **Entity accents**: Person (blue), Place (green), Event (purple)
- **Semantic colors**: Action, error, success, warning

### Typography
- **Verse text (EN)**: Source Serif 4 Variable (optical sizing)
- **Verse text (KR)**: Noto Serif KR
- **UI text (EN)**: IBM Plex Sans Variable
- **UI text (KR)**: Pretendard

## Component Library

### Atoms (`components/ui/`)

#### Icon (`Icon.tsx`)
Lucide icon wrapper with entity mapping and accessibility.

**Props:**
```typescript
{
  icon?: LucideIcon          // Lucide component
  entityType?: EntityType    // Auto-map: person→Users, place→MapPin, event→Calendar
  size?: 'xs'|'sm'|'md'|'lg' // 14/16/20/24px
  customSize?: number        // Override size
  'aria-label'?: string      // Screen reader label
  decorative?: boolean       // Hide from screen readers
  className?: string
  strokeWidth?: number       // Default: 2
}
```

**Usage:**
```tsx
<Icon icon={Users} size="sm" aria-label="Person" />
<Icon entityType="person" size="md" />
<EntityIcon type="place" size="sm" /> // With entity color
```

#### Button (`Button.tsx`)
Compact button with variants and loading state.

**Props:**
```typescript
{
  variant?: 'primary'|'subtle'|'ghost'|'danger' // Default: subtle
  size?: 'sm'|'md'                              // Default: md (h-9)
  iconOnly?: boolean                            // Square padding
  fullWidth?: boolean
  loading?: boolean                             // Shows spinner
  ...HTMLButtonAttributes
}
```

**Usage:**
```tsx
<Button variant="primary">Save</Button>
<Button variant="ghost" iconOnly><Icon icon={X} /></Button>
```

#### Badge (`Badge.tsx`)
Entity-typed badge with frequency indicators.

**Props:**
```typescript
{
  type: EntityType           // person|place|event
  label: string
  labelKr?: string          // Dual language with separator
  variant?: 'default'|'subtle' // Default has border
  size?: 'sm'|'md'
  interactive?: boolean      // Hover + click
  frequency?: number         // Shows ×N
  onClick?: () => void
  className?: string
}
```

**Usage:**
```tsx
<Badge type="person" label="Moses" variant="subtle" />
<Badge type="place" label="Jerusalem" labelKr="예루살렘" frequency={5} interactive />
```

#### EntityTagList (`Badge.tsx`)
Collapsible list of entity badges with "+N more" overflow.

**Props:**
```typescript
{
  entities: Array<{
    type: EntityType
    slug: string
    label: string
    labelKr?: string
    frequency?: number
  }>
  variant?: 'default'|'subtle'
  maxVisible?: number        // Default: 5
  onEntityClick?: (slug: string, type: EntityType) => void
  className?: string
}
```

#### VerseNumber (`VerseNumber.tsx`)
Stylized verse number with small caps and tabular numerals.

**Props:**
```typescript
{
  number: number
  highlight?: boolean        // Emphasized state
  onClick?: () => void
  className?: string
}
```

#### Tooltip (`Tooltip.tsx`)
Accessible tooltip with Radix UI.

**Props:**
```typescript
{
  children: ReactElement     // Trigger element
  content: ReactNode         // Tooltip content
  side?: 'top'|'right'|'bottom'|'left'
  align?: 'start'|'center'|'end'
  delayDuration?: number     // Default: 300ms
  disabled?: boolean
}
```

**Usage:**
```tsx
<Tooltip content="Copy verse"><Button>...</Button></Tooltip>
```

### Molecules (`components/reading/`)

#### VerseCard
Enhanced verse display with inline entity mentions and optional dual-language.

**Features:**
- Sticky verse number
- Entity mentions as colored inline links
- Optional dual-language display (side-by-side or stacked)
- Entity badge list (first 5 with overflow)
- Compact mode

**Props:**
```typescript
{
  verse: {
    id: string
    verseNum: number
    verseText: string
    mdText: string
    mdTextKr: string
    mentionsPeople: Array<{...}>
    mentionsPlaces: Array<{...}>
    describesEvents: Array<{...}>
  }
  language: 'en'|'ko'
  showDualLanguage?: boolean   // Show both languages
  compact?: boolean            // Minimal spacing
}
```

### Organisms (`components/reading/`)

#### ChapterView
Main reading interface with filtering and dual-language toggle.

**Features:**
- Filter by entity type (person/place/event)
- Dual-language toggle
- Entity frequency counts
- Collapsible filter panel
- Verse count indicator

**Props:**
```typescript
{
  verses: Verse[]
  writers: Writer[]
}
```

**Interactive controls:**
- Filter button → Toggle filter panel
- Dual button → Switch single/dual language
- Entity badges → Filter by type
- Clear filter → Reset to all verses

#### EntityPanel
Side drawer for entity details.

**Features:**
- Entity icon and name (with Korean)
- Entity type badge
- Summary text
- Related verses (first 10)
- "View Full Details" CTA
- Escape key to close

**Props:**
```typescript
{
  open: boolean
  onClose: () => void
  entityType: EntityType
  entitySlug: string
  entityName: string
  entityNameKr?: string
  summary?: string
  relatedVerses?: Array<{
    book: string
    chapter: number
    verse: number
    text: string
  }>
}
```

#### MentionsBrowser
Modal overlay for browsing all chapter mentions.

**Features:**
- Search entities by name
- Filter by entity type
- Grouped by type with counts
- Sorted by frequency
- Verse number pills (clickable)
- Shows entity occurrence count

**Props:**
```typescript
{
  open: boolean
  onClose: () => void
  mentions: Array<{
    type: EntityType
    slug: string
    label: string
    labelKr?: string
    verseRefs: Array<{ verseNum: number; verseId: string }>
  }>
  onVerseClick?: (verseId: string) => void
  onEntityClick?: (slug: string, type: EntityType) => void
}
```

### Layout (`components/layout/`)

#### Header
Updated with compact density and new design tokens.

**Changes:**
- Height: 64px → 56px (h-16 → h-14)
- Nav links: text-sm
- Language toggle: compact pill with rounded-full
- Mobile menu button: 20px icon
- Z-index: z-header (100)

## Theme Implementation

### CSS Variables Structure
```css
:root {
  /* Neutral scale */
  --color-neutral-1: #fcfcfd;
  --color-neutral-12: #111113;
  /* ...11 more steps... */

  /* Entity accents */
  --color-accent-person: #3b82f6;
  --color-accent-person-bg: rgba(59, 130, 246, 0.1);
  /* ...place, event... */
}

[data-theme="dark"] {
  --color-neutral-1: #111113;
  --color-neutral-12: #fcfcfd;
  /* ...inverted + adjusted... */
}
```

### Z-Index Scale
```
base: 0
sticky: 100 (verse numbers)
header: 200 (fixed header)
overlay: 400 (backdrop)
drawer: 500 (side panels)
modal: 600 (MentionsBrowser)
tooltip: 700
toast: 800
```

### Motion Tokens
```
--duration-motion-instant: 100ms
--duration-motion-quick: 150ms
--duration-motion-moderate: 250ms
--duration-motion-deliberate: 400ms
--duration-motion-slow: 500ms

--easing-motion-smooth: cubic-bezier(0.4, 0.0, 0.2, 1)
--easing-motion-snappy: cubic-bezier(0.4, 0.0, 0.6, 1)
```

## Usage Guidelines

### Entity Color Consistency
Always use entity color utilities:
```tsx
// ✅ Correct
<span className="text-accent-person dark:text-accent-person-dark">Moses</span>

// ❌ Wrong
<span className="text-blue-500">Moses</span>
```

### Bilingual Text
Always provide both languages where applicable:
```tsx
<Badge
  type="place"
  label="Jerusalem"   // Always English first
  labelKr="예루살렘"   // Korean second
/>
```

### Compact Density
Use 8px grid increments:
```tsx
// ✅ Correct
<div className="gap-2 p-4 mb-3"> // 8px, 16px, 12px

// ❌ Wrong
<div className="gap-3 p-5 mb-7"> // 12px, 20px, 28px
```

### Accessibility
- Always provide `aria-label` for non-decorative icons
- Use `decorative` prop for purely visual icons
- Ensure focus rings are visible
- Support keyboard navigation (Escape for modals)

## Migration Notes

### From Old to New Components

**Badges:**
```tsx
// Old
<Link href={`/person/${slug}`} className="text-accent-person">
  {name}
</Link>

// New
<Badge type="person" label={name} interactive onClick={() => navigate(slug)} />
```

**Buttons:**
```tsx
// Old
<button className="px-3 py-2 bg-zinc-900 text-white rounded">
  Submit
</button>

// New
<Button variant="primary">Submit</Button>
```

**VerseCard:**
```tsx
// Old
<VerseCard verse={verse} language={language} />

// New - Enhanced with dual language
<VerseCard
  verse={verse}
  language={language}
  showDualLanguage={isDualMode}
  compact={isCompactView}
/>
```

## Files Changed

### Created
- `/DESIGN_TOKENS.md` - Full design specification
- `/frontend/lib/fonts.ts` - Font configuration
- `/frontend/app/fonts/*.woff2` - Self-hosted fonts (7 files, 3.6MB)
- `/frontend/components/ui/Icon.tsx` - Icon system
- `/frontend/components/ui/Button.tsx` - Button component
- `/frontend/components/ui/Badge.tsx` - Badge + EntityTagList
- `/frontend/components/ui/VerseNumber.tsx` - Verse number
- `/frontend/components/ui/Tooltip.tsx` - Tooltip wrapper
- `/frontend/components/reading/EntityPanel.tsx` - Entity drawer
- `/frontend/components/reading/MentionsBrowser.tsx` - Mentions overlay

### Modified
- `/frontend/app/globals.css` - Complete design token system
- `/frontend/app/layout.tsx` - Font loading
- `/frontend/components/layout/Header.tsx` - Compact density
- `/frontend/components/reading/VerseCard.tsx` - Enhanced with badges
- `/frontend/components/reading/ChapterView.tsx` - Filters + dual language

### Dependencies Added
- `lucide-react` - Icons
- `@radix-ui/react-tooltip` - Accessible tooltips

## Build Status

✅ TypeScript compilation: PASS (zero errors)
✅ Production build: SUCCESS
⚠️ Timeline route: Dynamic (expected, not blocking)

## Next Steps (Not Implemented)

The following were planned but cancelled due to scope/time:
- **Focus Mode**: Paper texture overlay, reduced chrome
- **Micro-interactions**: Verse entrance animations, badge hover effects
- **Keyboard navigation**: Arrow keys, shortcuts
- **Accessibility audit**: WCAG AA compliance pass
- **Performance optimization**: Memoization, virtualization

These can be implemented incrementally as enhancements.
