## Project Overview

This is a bilingual (English/Korean) Bible companion app with a **Neo4j graph database backend** and **Next.js frontend**. The app enables contextual reading of Scripture by exposing rich relationships between verses, people, places, and events through a GraphQL API.

**Architecture:** Monorepo with separate backend and frontend directories
- **Backend:** Apollo Server + Neo4j GraphQL (port 4000)
- **Frontend:** Next.js 16 App Router + TypeScript (port 3000)
- **Database:** Neo4j 2025.11.2 in Docker (ports 7474/7687)

## Common Commands

### Backend (GraphQL Server)
```bash
# Start Neo4j database
make up

# Install backend dependencies
make install-backend

# Start GraphQL server (http://localhost:4000)
make backend
# OR
cd backend && npm start

# Load data into Neo4j (run in order: index → nodes → relationships → patches)
make run-scripts
```

### Frontend (Next.js)
```bash
cd frontend

# Development server (http://localhost:3000)
npm run dev

# Production build
npm run build
npm start

# Storybook (Design System)
npm run storybook           # Start Storybook dev server (http://localhost:6006)
npm run build-storybook     # Build static Storybook
npm run chromatic           # Run visual regression tests (requires CHROMATIC_PROJECT_TOKEN)

# Code quality (linting & formatting)
npm run format              # Apply Prettier formatting
npm run format:check        # Check formatting without changes
npx eslint .                # Run ESLint
npm run lint:fix            # Auto-fix lint errors
npx tsc --noEmit           # TypeScript compilation check
```

### Code Quality (Makefile shortcuts)
```bash
# Run from project root
make lint                   # Run ESLint
make lint-fix               # Auto-fix lint errors
make format                 # Apply Prettier formatting
make format-check           # Check formatting
make typecheck              # TypeScript compilation check
make quality                # Run format + lint + typecheck
make pre-commit             # Pre-commit checks (format-check + lint + typecheck)
```

### Full Stack Development
1. Start Neo4j: `make up`
2. Start backend: `make backend` (in one terminal)
3. Start frontend: `cd frontend && npm run dev` (in another terminal)
4. Access app at http://localhost:3000

## Architecture & Key Concepts

### GraphQL Schema (Neo4j GraphQL v7)

The backend uses **Neo4j GraphQL Library v7** which auto-generates queries/mutations from type definitions. Schema is at `backend/schema.graphql`.

**Key entity types:**
- `Testament` → `Division` → `Book` → `Chapter` → `Verse` (hierarchical text structure)
- `Person`, `Place`, `Event`, `PeopleGroup` (contextual entities)

**Critical: Neo4j GraphQL v7 Query Syntax**
- Use `Connection` API for relationships with filtering/sorting:
  ```graphql
  chaptersConnection(where: { node: { chapterNum: { eq: 1 } } })
  versesConnection(sort: [{ node: { verseNum: ASC } }])
  ```
- **Filters use generic operator objects** (NEW syntax):
  - String: `{ eq, in, contains, startsWith, endsWith }`
  - Number: `{ eq, in, lt, lte, gt, gte }`
  - ID: `{ eq, in }`
  - Boolean: `{ eq }`
  - Relationship: `{ some, none, every }` with nested `{ node: { ... } }`
- **Migration from deprecated suffixes:**
  - `field_EQ: value` → `field: { eq: value }`
  - `field_IN: [values]` → `field: { in: [values] }`
  - `field_CONTAINS: value` → `field: { contains: value }`
- Response structure: `{ edges { node { ...fields } } }`

**Book slugs:** Books use shortened slugs (`"gen"` not `"genesis"`, `"exod"` not `"exodus"`)

### Frontend Architecture (Next.js App Router)

**App Router structure:**
- `/` - Home page
- `/read/[bookSlug]/[chapterNum]` - Main chapter reading (e.g., `/read/gen/1`)
- `/person/[slug]`, `/place/[slug]`, `/event/[slug]` - Entity details
- `/browse`, `/map`, `/timeline` - Navigation/visualization pages

**Apollo Client Setup:**
Uses `@apollo/experimental-nextjs-app-support` for App Router compatibility with Server Components. Client is in `lib/apollo/client.ts` using `registerApolloClient()`.

**State Management:**
- `LanguageContext` (`lib/contexts/LanguageContext.tsx`) - Bilingual EN/KR support with localStorage persistence
- URL state for navigation (book slug + chapter number in route)
- Apollo InMemoryCache with normalized entities (keyed by `slug`)

**Data Flow Pattern:**
1. Server Component fetches data via `getClient().query()`
2. Extract from connection structure: `data.books[0].chaptersConnection.edges[0].node`
3. Pass to Client Components for interactive UI

### Design System (Tailwind v4)

Uses **Tailwind CSS v4** with `@tailwindcss/postcss` plugin (different from v3).

**Custom CSS structure (`app/globals.css`):**
```css
@import "tailwindcss";
@theme { /* custom CSS variables */ }
.custom-utility { /* explicit utility classes */ }
```

**Color-coded entities:**
- Person: Blue (`--color-accent-person: #3b82f6`)
- Place: Green (`--color-accent-place: #10b981`)
- Event: Purple (`--color-accent-event: #8b5cf6`)

**Typography:**
- UI: Inter (system font stack)
- Verses: Serif fonts (Charter, Georgia) with `.text-verse` class
- Korean: Noto Sans KR / Noto Serif KR support via `mdTextKr` field

### Bilingual Implementation

All text content has English and Korean versions:
- GraphQL fields: `title` / `bookNameKr`, `mdText` / `mdTextKr`
- UI translations: `lib/constants/translations.ts`
- Language toggle in header switches between languages via context
- Always fetch both languages, display based on `language` state

## Neo4j Data Model

**Hierarchical structure:**
```
Testament
  ├── Division (Law, History, Wisdom, Prophets, etc.)
  │   └── Book (66 books)
  │       └── Chapter
  │           └── Verse
```

**Entity relationships:**
- `Verse → MENTIONS → Person/Place`
- `Verse → DESCRIBES → Event`
- `Person → WROTE → Chapter` (authorship)
- `Person → PARENT_OF/CHILD_OF/PARTNER_OF → Person` (family)
- `Person → BORN_IN/DIED_IN → Place`
- `Person → PARTICIPATED_IN → Event`
- `Event → OCCURRED_IN → Place`
- `Event → PRECEEDS/FOLLOWS → Event` (timeline with lag properties)

**Data import:** JSON files in `neo4j/import/json/` loaded via APOC, Cypher scripts in `neo4j/scripts/`

## Development Guidelines

### Git Commits
**MUST use Conventional Commits format for all commits:**
```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Common types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

**Examples:**
```bash
git commit -m "feat(reading): add verse highlighting on hover"
git commit -m "fix(apollo): correct GraphQL query filter syntax"
git commit -m "docs: update CLAUDE.md with commit guidelines"
```

### Code Quality Checks

**ALWAYS verify code quality before completing work:**

1. **Formatting** (MANDATORY - run FIRST):
   ```bash
   cd frontend && npm run format
   ```
   - Applies Prettier formatting with Tailwind class sorting
   - MUST be run before linting (Prettier and ESLint are integrated)
   - Auto-fixes formatting issues

2. **Linting** (MANDATORY):
   ```bash
   cd frontend && npx eslint .
   ```
   - Run after formatting to catch code quality issues
   - Fix all ESLint errors before completing work
   - Use `npm run lint:fix` for auto-fixable errors
   - **Note:** `next lint` command is currently broken, use `npx eslint .` directly

3. **TypeScript compilation** (MANDATORY):
   ```bash
   cd frontend && npx tsc --noEmit
   ```
   - Must pass with zero errors before work is considered complete
   - Fix all type errors, never use `as any` or `@ts-ignore` to suppress
   - Type safety is non-negotiable

4. **Build verification** (for major changes):
   ```bash
   cd frontend && npm run build
   ```
   - Ensures production build succeeds
   - Catches runtime issues that TypeScript might miss

**Workflow (CRITICAL - Follow this order):**

1. **Before starting work:**
   - Understand the existing code patterns in files you'll modify
   - Check if similar implementations exist in the codebase

2. **During development:**
   - Write code following existing patterns
   - Keep changes focused and minimal
   - Never refactor while fixing bugs

3. **Before marking todos complete:**
   ```bash
   # Run all three checks in order:
   make quality
   # OR manually:
   cd frontend && npm run format && npx eslint . && npx tsc --noEmit
   ```

4. **Before final delivery:**
   - Run full quality check: `make quality`
   - Verify production build: `cd frontend && npm run build`
   - Never deliver work with formatting, lint, or TypeScript errors

**Code Quality Standards:**

- **ESLint:** Zero errors allowed (warnings acceptable if pre-existing)
- **Prettier:** All files must be formatted (automated via `npm run format`)
- **TypeScript:** Strict mode enabled, zero compilation errors
- **No suppressions:** Never use `as any`, `@ts-ignore`, `@ts-expect-error`, or `eslint-disable`
- **Empty catch blocks forbidden:** Always handle errors appropriately
- **Imports:** Keep imports organized and remove unused imports

**Quick Quality Check:**
```bash
# From project root - runs format, lint, and typecheck
make quality
```

**Pre-existing Lint Issues:**

The codebase currently has 34 ESLint errors and 63 warnings. These are **NOT blockers** for new work, but should not be made worse:

- **Critical errors to avoid introducing:**
  - Unused variables (prefix with `_` if intentionally unused)
  - Impure functions in render (like `Math.random()`)
  - `setState` calls directly in `useEffect` (prefer derived state or refs)
  - Unused imports

- **Known warnings (acceptable):**
  - `@typescript-eslint/no-explicit-any` - 63 instances exist, avoid adding more

**When working on existing files with lint errors:**
- Fix errors in code you're modifying if straightforward
- Don't introduce new lint errors
- Don't break existing functionality while fixing lint issues

### Internationalization (i18n)
**ALWAYS consider bilingual support (EN/KR) for ALL user-facing text:**
- Never hardcode English-only text in components
- Add translations to `lib/constants/translations.ts`
- Use `useLanguage()` hook to access current language and translations
- For new features, provide both English and Korean text from the start
- GraphQL queries must fetch both language fields (e.g., `title` AND `bookNameKr`)

## Important Constraints & Gotchas

1. **Neo4j GraphQL filter syntax:** Use generic filter objects (e.g., `slug: { eq: "gen" }`) rather than deprecated suffix filters like `slug_EQ: "gen"`. Suffixes (`_EQ`, `_IN`, `_CONTAINS`) are deprecated in Neo4j GraphQL v7+
2. **Connection API responses:** Must extract from `edges[].node` structure
3. **Book slugs are short:** `"gen"`, `"exod"`, `"matt"`, etc. (not full names)
4. **Tailwind v4:** Different from v3 - uses `@import "tailwindcss"` not `@tailwind directives`
5. **App Router Apollo:** Requires `@apollo/experimental-nextjs-app-support` and `rxjs` dependency
6. **npm install:** Use `--legacy-peer-deps` flag due to Apollo/Next.js peer dependency conflicts

## Environment Variables

**Backend:** `backend/.env`
```env
NEO4J_URI=neo4j://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=hellobible
PORT=4000
```

**Frontend:** `frontend/.env.local`
```env
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:4000
NEXT_PUBLIC_MAPBOX_TOKEN=pk.xxx  # For future map features
```

## Implementation Status

**Phase 1 Complete (Core Reading):**
- ✅ Next.js setup with TypeScript + Tailwind v4
- ✅ Apollo Client + GraphQL integration
- ✅ Bilingual support (EN/KR)
- ✅ Chapter reading page with verse display
- ✅ Entity mentions as colored badges
- ✅ Chapter navigation (prev/next)
- ✅ Responsive header with language toggle

**Planned (See IMPLEMENTATION_PLAN.md):**
- Phase 2: Browse books page, navigation sidebar
- Phase 3: Interactive entity mentions, detail pages
- Phase 4: Geographic maps (Mapbox)
- Phase 5: Family tree visualization (React Flow)
- Phase 6: Event timeline
- Phase 7: Search (command palette)
- Phase 8: Deployment

## File Locations Reference

**Critical GraphQL files:**
- Schema: `backend/schema.graphql`
- Queries: `frontend/lib/apollo/queries.ts`
- Client setup: `frontend/lib/apollo/client.ts`

**Core UI components:**
- Layout: `frontend/components/layout/Header.tsx`
- Reading: `frontend/components/reading/{ChapterView,VerseCard,ChapterNavigation}.tsx`
- Contexts: `frontend/lib/contexts/LanguageContext.tsx`

**Styling:**
- Design system: `frontend/app/globals.css`
- Config: `frontend/tailwind.config.ts`, `frontend/postcss.config.mjs`

**Data scripts:** `neo4j/scripts/{nodes,relationships,patch}/*.cypher`
