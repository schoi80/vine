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
- **State**: Centralized contexts in `src/lib/contexts/`.

## ANTI-PATTERNS (CRITICAL)

- **Leaflet SSR**: No direct imports of Leaflet/React-Leaflet in SSR components. Use `next/dynamic`.
- **Badge vs Chip**: `Chip` is DEPRECATED. Always use `Badge` for entity tags.
- **Hydration Errors**: No `Math.random()` or date formatting in SSR render. Use `useEffect`.
- **Mention Parsing**: `parseEntityMentions` requires specific regex order (Broken -> Standard -> Wiki).

## COMMANDS

- `make dev`: Start dev server (Port 8080)
- `make quality`: Run format, lint, and typecheck
- `make storybook`: Start UI design environment (Port 6006)
- `make install`: Install dependencies with `--legacy-peer-deps`

## TESTING

- **Vitest**: Logic and component unit tests (`npm run test`).
- **Storybook**: Visual verification for UI components.
- **Coverage**: Currently low; prioritize testing for new `lib/utils` logic.
