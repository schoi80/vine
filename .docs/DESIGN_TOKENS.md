# Design Tokens Specification

**Last Updated:** 2026-01-07
**Status:** Draft for UX Overhaul Implementation

## Overview

This document defines the complete design token system for the Bible Graph application. Tokens provide a single source of truth for visual design decisions across the application.

## Design Principles

- **Compact Density:** 8px base grid with 4px sub-increments
- **Slightly Expressive:** Editorial elegance with subtle details
- **Bilingual First:** EN/KR typography harmonized
- **Accessible:** WCAG AA minimum (7:1 for body text preferred)
- **Semantic:** Token names reflect purpose, not values

---

## 1. Color System

### Base Palette

#### Neutrals (12-step scale)
```css
--color-neutral-50:  #fafafa    /* Lightest backgrounds */
--color-neutral-100: #f5f5f5    /* Secondary backgrounds */
--color-neutral-200: #e5e5e5    /* Borders, dividers */
--color-neutral-300: #d4d4d4    /* Disabled states */
--color-neutral-400: #a3a3a3    /* Placeholders */
--color-neutral-500: #737373    /* Tertiary text */
--color-neutral-600: #525252    /* Secondary text */
--color-neutral-700: #404040    /* Labels */
--color-neutral-800: #262626    /* Muted text */
--color-neutral-900: #171717    /* Primary text */
--color-neutral-950: #0a0a0a    /* Headings */
```

#### Entity Accents
```css
/* Person - Blue */
--color-accent-person-light:     #3b82f6    /* Blue 500 */
--color-accent-person-dark:      #60a5fa    /* Blue 400 */
--color-accent-person-bg-light:  #eff6ff    /* Blue 50 */
--color-accent-person-bg-dark:   #1e3a8a    /* Blue 900 */

/* Place - Green */
--color-accent-place-light:      #10b981    /* Emerald 500 */
--color-accent-place-dark:       #34d399    /* Emerald 400 */
--color-accent-place-bg-light:   #ecfdf5    /* Emerald 50 */
--color-accent-place-bg-dark:    #064e3b    /* Emerald 900 */

/* Event - Purple */
--color-accent-event-light:      #8b5cf6    /* Violet 500 */
--color-accent-event-dark:       #a78bfa    /* Violet 400 */
--color-accent-event-bg-light:   #f5f3ff    /* Violet 50 */
--color-accent-event-bg-dark:    #4c1d95    /* Violet 900 */

/* Book - Slate */
--color-accent-book:             #64748b    /* Slate 500 (no dark variant) */
```

### Semantic Colors

#### Light Mode
```css
--color-bg-primary:      #ffffff
--color-bg-secondary:    #fafafa
--color-bg-tertiary:     #f5f5f5
--color-bg-hover:        #f5f5f5

--color-text-primary:    #171717
--color-text-secondary:  #525252
--color-text-tertiary:   #a3a3a3
--color-text-inverse:    #ffffff

--color-border:          #e5e5e5
--color-border-hover:    #d4d4d4
--color-border-focus:    #3b82f6

--color-surface:         #ffffff
--color-surface-elevated: #ffffff
```

#### Dark Mode
```css
--color-bg-primary:      #171717
--color-bg-secondary:    #262626
--color-bg-tertiary:     #404040
--color-bg-hover:        #262626

--color-text-primary:    #fafafa
--color-text-secondary:  #a3a3a3
--color-text-tertiary:   #737373
--color-text-inverse:    #171717

--color-border:          #404040
--color-border-hover:    #525252
--color-border-focus:    #60a5fa

--color-surface:         #171717
--color-surface-elevated: #262626
```

#### Feedback Colors
```css
--color-success:      #10b981
--color-success-bg:   #ecfdf5
--color-warning:      #f59e0b
--color-warning-bg:   #fffbeb
--color-error:        #ef4444
--color-error-bg:     #fef2f2
--color-info:         #3b82f6
--color-info-bg:      #eff6ff
```

---

## 2. Typography

### Font Families

#### Serif (Verses)
```css
--font-serif-en: "Source Serif 4 Variable", "Source Serif 4", Charter, "Iowan Old Style", "Sitka Text", Georgia, serif
--font-serif-kr: "Noto Serif KR", "Nanum Myeongjo", serif
```

#### Sans (UI)
```css
--font-sans-en: "IBM Plex Sans Variable", "IBM Plex Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
--font-sans-kr: "Pretendard Variable", "Pretendard", -apple-system, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif
```

#### Mono (Code/Data)
```css
--font-mono: ui-monospace, "Cascadia Code", "Source Code Pro", "Fira Mono", monospace
```

### Type Scale (1.125 ratio - compact)

```css
--font-size-xs:    0.75rem    /* 12px - Captions */
--font-size-sm:    0.875rem   /* 14px - Small UI */
--font-size-base:  1rem       /* 16px - Body text */
--font-size-md:    1.125rem   /* 18px - Verses */
--font-size-lg:    1.25rem    /* 20px - Large verses */
--font-size-xl:    1.5rem     /* 24px - Section headings */
--font-size-2xl:   1.875rem   /* 30px - Chapter titles */
--font-size-3xl:   2.25rem    /* 36px - Page headers */
```

### Line Heights

```css
--leading-tight:    1.25      /* Headings */
--leading-snug:     1.375     /* UI text */
--leading-normal:   1.5       /* Body text */
--leading-relaxed:  1.625     /* Readable paragraphs */
--leading-loose:    1.75      /* Verses (EN) */
--leading-extra:    2.0       /* Verses (KR) */
```

### Font Weights

```css
--font-weight-normal:    400
--font-weight-medium:    500
--font-weight-semibold:  600
--font-weight-bold:      700
```

### Letter Spacing

```css
--tracking-tighter:  -0.02em
--tracking-tight:    -0.01em
--tracking-normal:    0
--tracking-wide:      0.01em
--tracking-wider:     0.02em
```

### Verse-Specific Typography

```css
/* Verse text - English */
.text-verse-en {
  font-family: var(--font-serif-en);
  font-size: var(--font-size-md);           /* 18px */
  line-height: var(--leading-loose);        /* 1.75 */
  letter-spacing: var(--tracking-wide);     /* 0.01em */
  font-optical-sizing: auto;                /* Variable font */
  font-feature-settings: "onum", "pnum";    /* Old-style proportional numerals */
}

/* Verse text - Korean */
.text-verse-kr {
  font-family: var(--font-serif-kr);
  font-size: var(--font-size-md);           /* 18px */
  line-height: var(--leading-extra);        /* 2.0 - Korean needs more */
  letter-spacing: var(--tracking-tight);    /* -0.01em */
}

/* Verse numbers */
.text-verse-number {
  font-family: var(--font-sans-en);
  font-size: var(--font-size-sm);           /* 14px */
  font-weight: var(--font-weight-medium);   /* 500 */
  font-feature-settings: "tnum", "lnum";    /* Tabular lining numerals */
  font-variant-numeric: tabular-nums lining-nums;
  color: var(--color-text-tertiary);
}
```

---

## 3. Spacing

### Base Grid: 8px

```css
--spacing-0:    0
--spacing-1:    0.25rem    /* 4px  - Micro spacing */
--spacing-2:    0.5rem     /* 8px  - Base unit */
--spacing-3:    0.75rem    /* 12px - Compact padding */
--spacing-4:    1rem       /* 16px - Standard padding */
--spacing-5:    1.25rem    /* 20px */
--spacing-6:    1.5rem     /* 24px - Section spacing */
--spacing-8:    2rem       /* 32px - Large sections */
--spacing-10:   2.5rem     /* 40px */
--spacing-12:   3rem       /* 48px - Page margins */
--spacing-16:   4rem       /* 64px - Major sections */
--spacing-20:   5rem       /* 80px */
--spacing-24:   6rem       /* 96px - Hero sections */
```

### Component-Specific Spacing

```css
--spacing-chip-x:       0.5rem     /* 8px - Chip horizontal padding */
--spacing-chip-y:       0.25rem    /* 4px - Chip vertical padding */
--spacing-button-x:     1rem       /* 16px - Button horizontal */
--spacing-button-y:     0.5rem     /* 8px - Button vertical */
--spacing-verse-gap:    1rem       /* 16px - Gap between verses */
--spacing-verse-gutter: 2.75rem    /* 44px - Verse number gutter width */
```

---

## 4. Radii (Compact)

```css
--radius-xs:    0.25rem    /* 4px  - Small chips */
--radius-sm:    0.375rem   /* 6px  - Badges, buttons */
--radius-md:    0.5rem     /* 8px  - Cards, inputs */
--radius-lg:    0.75rem    /* 12px - Panels */
--radius-xl:    1rem       /* 16px - Modals */
--radius-full:  9999px     /* Pill shapes */
```

---

## 5. Shadows & Elevation

### Elevation Scale (Subtle, compact)

```css
/* Light mode */
--shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.08),
             0 1px 2px -1px rgba(0, 0, 0, 0.08);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.08),
             0 2px 4px -2px rgba(0, 0, 0, 0.08);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.08),
             0 4px 6px -4px rgba(0, 0, 0, 0.08);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.08),
             0 8px 10px -6px rgba(0, 0, 0, 0.08);

/* Dark mode - lighter shadows */
--shadow-xs-dark: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
--shadow-sm-dark: 0 1px 3px 0 rgba(0, 0, 0, 0.4),
                  0 1px 2px -1px rgba(0, 0, 0, 0.4);
--shadow-md-dark: 0 4px 6px -1px rgba(0, 0, 0, 0.5),
                  0 2px 4px -2px rgba(0, 0, 0, 0.5);
```

### Semantic Elevations

```css
--elevation-card:     var(--shadow-sm)
--elevation-hover:    var(--shadow-md)
--elevation-drawer:   var(--shadow-lg)
--elevation-modal:    var(--shadow-xl)
```

---

## 6. Z-Index Scale

```css
--z-base:      0
--z-header:    50
--z-sticky:    60
--z-sidebar:   100
--z-overlay:   1900
--z-drawer:    2000
--z-modal:     2100
--z-tooltip:   2200
--z-toast:     2300
```

---

## 7. Motion & Animation

### Durations

```css
--duration-instant:   0ms
--duration-fast:      100ms     /* Micro-interactions */
--duration-quick:     150ms     /* Hover states */
--duration-normal:    200ms     /* Standard transitions */
--duration-smooth:    300ms     /* Drawers, panels */
--duration-slow:      500ms     /* Page transitions */
```

### Easing Functions

```css
--ease-linear:     linear
--ease-in:         cubic-bezier(0.4, 0, 1, 1)
--ease-out:        cubic-bezier(0, 0, 0.2, 1)
--ease-in-out:     cubic-bezier(0.4, 0, 0.2, 1)
--ease-soft:       cubic-bezier(0.2, 0.8, 0.2, 1)      /* Gentle, editorial */
--ease-snappy:     cubic-bezier(0.2, 0, 0, 1)          /* Crisp, responsive */
```

### Animation Patterns

```css
/* Verse entrance (staggered) */
.verse-enter {
  animation: verse-fade-up var(--duration-normal) var(--ease-soft) forwards;
  animation-delay: calc(var(--index) * 30ms);  /* 30ms stagger */
  opacity: 0;
}

@keyframes verse-fade-up {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Badge hover */
.badge-hover {
  transition:
    background-color var(--duration-quick) var(--ease-out),
    border-color var(--duration-quick) var(--ease-out),
    transform var(--duration-quick) var(--ease-out);
}

.badge-hover:hover {
  transform: translateY(-1px);
}

/* Drawer slide */
.drawer-enter {
  animation: drawer-slide var(--duration-smooth) var(--ease-soft);
}

@keyframes drawer-slide {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}
```

---

## 8. Breakpoints

```css
--breakpoint-sm:   640px    /* Mobile landscape */
--breakpoint-md:   768px    /* Tablet portrait */
--breakpoint-lg:   1024px   /* Tablet landscape / Small desktop */
--breakpoint-xl:   1280px   /* Desktop */
--breakpoint-2xl:  1536px   /* Large desktop */
```

---

## 9. Special Effects

### Paper Texture (Focus Mode)

```css
--texture-opacity-light: 0.025
--texture-opacity-dark:  0.02
--texture-size:          200px

/* SVG noise pattern (inline data URI) */
--texture-pattern: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
```

---

## 10. Implementation Map

### Tailwind v4 @theme Block

```css
/* frontend/app/globals.css */
@import "tailwindcss";

@theme {
  /* Colors - Neutrals */
  --color-neutral-50: #fafafa;
  --color-neutral-100: #f5f5f5;
  /* ... full scale ... */

  /* Colors - Entity Accents */
  --color-accent-person: #3b82f6;
  --color-accent-place: #10b981;
  --color-accent-event: #8b5cf6;

  /* Typography */
  --font-serif: var(--font-source-serif);
  --font-sans: var(--font-ibm-plex-sans);

  /* Spacing (8px grid) */
  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  /* ... */

  /* Shadows */
  --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.08);
  /* ... */
}

/* Dark mode overrides */
[data-theme="dark"] {
  --color-bg-primary: #171717;
  --color-text-primary: #fafafa;
  /* ... all semantic colors ... */
}
```

### Generated Utilities (Automatic)

```
Tailwind automatically generates:
- bg-neutral-50, bg-neutral-100, ...
- text-accent-person, text-accent-place, ...
- p-1, p-2, m-4, gap-6, ...
- shadow-sm, shadow-md, ...
- rounded-sm, rounded-md, ...
```

---

## 11. Usage Examples

### Entity Badge
```tsx
<span className="
  inline-flex items-center gap-1
  px-2 py-1 rounded-sm
  text-sm font-medium
  text-accent-person bg-accent-person/5
  border border-accent-person/30
  hover:border-accent-person
  hover:bg-accent-person/10
  transition-colors duration-150
">
  <UserIcon size={14} />
  Abraham
</span>
```

### Verse Text
```tsx
<p className="
  text-verse-en
  text-text-primary
  leading-loose
">
  In the beginning God created the heavens and the earth.
</p>
```

### Compact Button
```tsx
<button className="
  px-4 py-2 rounded-sm
  bg-accent-person text-white
  font-medium text-sm
  hover:bg-accent-person/90
  active:scale-95
  transition-all duration-150
  shadow-sm hover:shadow-md
">
  Read Chapter
</button>
```

---

## 12. Token Naming Conventions

### Pattern: `--[category]-[property]-[variant]`

**Categories:**
- `color-` - All colors
- `font-` - Font families, sizes, weights
- `spacing-` - Margins, padding, gaps
- `radius-` - Border radius
- `shadow-` - Box shadows
- `duration-` - Animation timing
- `ease-` - Easing functions
- `z-` - Z-index layering

**Properties:**
- Descriptive (bg, text, border)
- Semantic when possible (primary, secondary)

**Variants:**
- Scale values (50, 100, 500)
- States (hover, focus, active)
- Themes (light, dark)

---

## Migration Notes

### From Current System

**Keep backward compatible:**
- Existing `--color-accent-*` tokens → Map to new system
- `.text-verse` class → Enhance with new typography tokens
- Entity color utilities → Already aligned

**Breaking changes:**
- Font stack changes (Charter → Source Serif 4)
- Spacing adjustments (current system → 8px grid)
- Shadow values (new elevation scale)

### Feature Flags

```typescript
// lib/config/features.ts
export const FEATURES = {
  NEW_DESIGN_SYSTEM: process.env.NEXT_PUBLIC_NEW_DESIGN === 'true',
  FOCUS_MODE: process.env.NEXT_PUBLIC_FOCUS_MODE === 'true',
} as const;
```

---

## Validation Checklist

- [ ] All colors pass WCAG AA contrast (4.5:1 minimum)
- [ ] Verse text passes WCAG AAA (7:1 for body text)
- [ ] Entity accents distinguishable in dark mode
- [ ] Korean line-height prevents vertical cramping
- [ ] Spacing maintains visual hierarchy
- [ ] Shadows subtle in light mode, visible in dark
- [ ] Motion reduces for `prefers-reduced-motion`
- [ ] Focus rings visible on all interactive elements

---

**End of Design Tokens Specification**
