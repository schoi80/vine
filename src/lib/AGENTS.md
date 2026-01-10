# Lib Directory: The Brain of Vine

## OVERVIEW

The `src/lib` directory contains the core business logic, data access layers, and complex algorithms that power the application. It serves as the bridge between the Neo4j graph database and the React frontend.

## STRUCTURE

| Module       | Description                                                                                                        |
| :----------- | :----------------------------------------------------------------------------------------------------------------- |
| `apollo/`    | GraphQL integration: Schema definition (`schema.graphql`), server-side resolvers, and Apollo Client configuration. |
| `neo4j/`     | Database connectivity: Singleton driver connection and configuration.                                              |
| `utils/`     | Algorithmic heavy-lifting: Pedigree/Timeline layouts, entity mention parsing, and date/color helpers.              |
| `contexts/`  | Global React state: Language preferences, entity panel states, and shared UI contexts.                             |
| `constants/` | System-wide truth: **Translations** (CRITICAL), era definitions, and static configurations.                        |
| `map/`       | Map-specific logic: Tile configurations and geographic utilities.                                                  |

## KEY CONCEPTS

### Singleton Schema

The GraphQL schema is managed as a singleton to optimize performance and prevent redundant instantiation.

- **Location**: `src/lib/apollo/schema.ts`
- **Mechanism**: `schemaPromise` ensures the schema is built only once and shared across requests.

### Bilingual Source of Truth

All user-facing strings must be localized.

- **Source**: `src/lib/constants/translations.ts`
- **Usage**: Always use the `useLanguage()` hook or `translations` constant. **Never hardcode strings.**

### Graph Logic Separation

To maintain component purity, all complex layout calculations (D3, hierarchy transformations) must live in `lib/utils`, not within React components.

- **Pedigree**: `src/lib/utils/pedigreeLayout.ts`
- **Timeline**: `src/lib/utils/timelineLayout.ts`

## ANTI-PATTERNS (CRITICAL)

- **Regex Order**: In `parseEntityMentions`, do not change the execution order of regex patterns (Broken -> Standard -> Wiki). The "Broken" format is most specific and must be handled first to prevent partial matches by simpler patterns.
- **Hardcoding**: Do not hardcode any text in `lib/utils` or `lib/contexts`. Use the translation keys defined in `constants/translations.ts`.
- **Direct DB Access**: Components should never access the Neo4j driver directly. Always use the Apollo/GraphQL layer.

## DEPENDENCIES

- `@neo4j/graphql`: Schema generation and OGM.
- `@apollo/server`: GraphQL API implementation.
- `neo4j-driver`: Low-level database communication.
- `d3-force` / `d3-hierarchy`: Mathematical engines for graph and tree layouts.
