# Vine Project: Agent Guide

## OVERVIEW

Bilingual (English/Korean) Bible Graph Explorer. Rich scripture context via relationships between verses, people, places, and events. Unified Next.js mono-repo with Neo4j backend.

## STRUCTURE

- `src/app/`: Next.js App Router (Routes & Layouts)
- `src/components/`: Feature-based React components
- `src/lib/`: Core logic, drivers, and utilities
- `src/stories/`: Legacy Storybook components and documentation
- `src/types/`: Consolidated TypeScript definitions

## WHERE TO LOOK

| Task                | Path                                   |
| :------------------ | :------------------------------------- |
| **Graph Schema**    | `src/lib/apollo/schema.graphql`        |
| **Database Logic**  | `src/lib/neo4j/driver.ts`              |
| **Design System**   | `src/components/ui/`                   |
| **Visualizations**  | `src/components/visualizations/`       |
| **Bilingual Logic** | `src/lib/utils/bilingual.ts`           |
| **Entity State**    | `src/lib/contexts/LanguageContext.tsx` |

## CONVENTIONS

- **Bilingual**: Use `useLanguage()` hook. **No hardcoded text** in components.
- **Commits**: Conventional Commits MANDATORY (`feat:`, `fix:`, `docs:`, etc.).
- **Styling**: Tailwind CSS v4. Use utility classes from `src/app/globals.css`.
- **daisyUI**: v5 component library with `daisy-` prefix. See daisyUI section below.
- **State**: Centralized contexts in `src/lib/contexts/`.

## DAISYUI USAGE

daisyUI v5 is installed with a **`daisy-` prefix** to avoid conflicts with custom styles.

### Component Class Pattern

```html
<!-- Use daisy- prefix for all daisyUI classes -->
<button class="daisy-btn daisy-btn-primary">Button</button>
<div class="daisy-card bg-bg-secondary">
  <div class="daisy-card-body">Content</div>
</div>
<input class="daisy-input daisy-input-bordered" />
```

### When to Use daisyUI vs Custom

| Use daisyUI (`daisy-` prefix)      | Use Custom Styles                           |
| :--------------------------------- | :------------------------------------------ |
| Forms: inputs, selects, checkboxes | Entity badges (Person, Place, Event)        |
| Modals, drawers, tooltips          | Typography: `.text-verse`, `.text-verse-kr` |
| Navigation: navbar, menu, tabs     | Color system: `--color-accent-*`            |
| Data display: tables, stats        | Custom animations                           |
| Feedback: alerts, loading, toast   | Existing `.badge` component                 |

### Available Themes

Configured themes: `light`, `dark`. Themes integrate with existing `[data-theme]` attribute.

### Documentation

- Components: https://daisyui.com/components/
- Theme Generator: https://daisyui.com/theme-generator/

## ANTI-PATTERNS (CRITICAL)

- **Leaflet SSR**: No direct imports of Leaflet/React-Leaflet in SSR components. Use `next/dynamic`.
- **Badge vs Chip**: `Chip` is DEPRECATED. Always use `Badge` for entity tags.
- **Hydration Errors**: No `Math.random()` or date formatting in SSR render. Use `useEffect`.
- **Mention Parsing**: `parseEntityMentions` requires specific regex order (Broken -> Standard -> Wiki).

## COMMANDS

- `make dev`: Start dev server (Port 8080)
- `make quality`: Run format, lint, and typecheck
- `make storybook`: Start UI design environment (Port 6006)
- `make install`: Install dependencies

## TESTING

- **Vitest**: Logic and component unit tests (`npm run test`).
- **Storybook**: Visual verification for UI components.
- **Coverage**: Currently low; prioritize testing for new `lib/utils` logic.
