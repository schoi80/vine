## Project Overview

This is a bilingual (English/Korean) Bible companion app with a **Neo4j graph database backend** and **Next.js frontend** integrated into a single repository. The app enables contextual reading of Scripture by exposing rich relationships between verses, people, places, and events through a GraphQL API served via Next.js API Routes.

**Architecture:** Unified Next.js Application
- **API (Backend):** Apollo Server integrated into Next.js Route Handlers (`src/app/api/graphql/route.ts`)
- **Frontend:** Next.js 16 App Router + TypeScript (port 8080)
- **Database:** Neo4j (ports 7474/7687)
- **Source Layout:** All source code in `src/` directory

## Common Commands

### Development
```bash
# Install dependencies
make install
# Shortcut for npm install --legacy-peer-deps

# Start development server (http://localhost:8080)
make dev

# Start Storybook (Design System) (http://localhost:6006)
make storybook
```

### Code Quality (Makefile shortcuts)
```bash
# From project root
make lint                   # Run ESLint
make lint-fix               # Auto-fix lint errors
make format                 # Apply Prettier formatting
make format-check           # Check formatting
make typecheck              # TypeScript compilation check (npx tsc --noEmit)
make quality                # Run format + lint + typecheck
```

## Architecture & Key Concepts

### GraphQL Schema (Neo4j GraphQL v7)

The backend uses **Neo4j GraphQL Library v7** which auto-generates queries/mutations from type definitions. Schema is at `src/lib/apollo/schema.graphql`.

**Key entity types:**
- `Testament` → `Division` → `Book` → `Chapter` → `Verse` (hierarchical text structure)
- `Person`, `Place`, `Event`, `PeopleGroup` (contextual entities)

**Querying:** Filters use generic operator objects (v7 syntax):
- `where: { slug: { eq: "gen" } }`
- Response structure: `{ edges { node { ...fields } } }`

### Frontend Architecture (Next.js App Router)

**App Router structure (`src/app`):**
- `/` - Home page
- `/read/[bookSlug]/[chapterNum]` - Main chapter reading (e.g., `/read/gen/1`)
- `/person/[slug]`, `/place/[slug]`, `/event/[slug]` - Entity details
- `/browse`, `/map`, `/timeline` - Navigation/visualization pages

**Apollo Client Setup:**
Uses `@apollo/experimental-nextjs-app-support` for App Router compatibility. Client is in `src/lib/apollo/client.ts`.

**State Management:**
- `LanguageContext` (`src/lib/contexts/LanguageContext.tsx`) - Bilingual EN/KR support with localStorage persistence
- URL state for navigation (book slug + chapter number in route)

### Design System (Tailwind v4)

Uses **Tailwind CSS v4** with `@tailwindcss/postcss`.

**Colors & Styling:**
- UI: Modern, premium dark/light modes.
- Color-coded entities: Person (Blue), Place (Green), Event (Purple).
- Typography: Serif fonts for Scripture text, Sans-serif for UI.

### Bilingual Implementation

All text content has English and Korean versions.
- Use `useLanguage()` hook to access current language and translations.
- Translations managed in `src/lib/constants/translations.ts`.

## Environment Variables

Defined in `.env` (or `.env.local`):
```env
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:8080/api/graphql
NEO4J_URI=neo4j://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=your_password
```

## File Locations Reference

**Source Root:** `src/`

- **App Router:** `src/app/`
- **Components:** `src/components/`
- **GraphQL Schema:** `src/lib/apollo/schema.graphql`
- **GraphQL Queries:** `src/lib/apollo/queries.ts`
- **Neo4j Driver:** `src/lib/neo4j/driver.ts`
- **Global Styles:** `src/app/globals.css`
- **TypeScript Types:** `src/types/` (if consolidated)

---

## Development Guidelines

### Git Commits
**ALWAYS use Conventional Commits:** `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`.

### Quality Workflow
1. `make format`
2. `make lint`
3. `make typecheck`
4. `npm run build` (for major changes)
