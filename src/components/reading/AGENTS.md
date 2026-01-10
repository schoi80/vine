# Reading Components: Agent Guide

## OVERVIEW

Core Bible reading interface components. This module provides the primary scripture reading experience, including verse rendering, entity highlighting, and navigation.

## COMPONENTS

- **`ChapterView`**: The main orchestrator for the reading page. Manages verse list, dual-language state, and keyboard navigation (Arrow Up/Down).
- **`VerseCard` / `VerseCardView`**: Renders individual verses. It is responsible for rendering verse numbers and the actual scripture text with entity mentions highlighted.
- **`EntityPanel` / `EntityPanelView`**: A slide-over drawer that displays detailed information about a selected entity (Person, Place, or Event) when clicked within a verse.
- **`MentionsBrowser`**: A modal interface for browsing all entities mentioned within the current chapter, grouped by type (People, Places, Events).
- **`ChapterHeader`**: Displays the book and chapter title, often including a selector for other chapters.
- **`ChapterNavigation`**: Provides controls for navigating between chapters (Previous/Next).
- **`RelatedVerses`**: Displays cross-references or related scripture for the current context.

## CONVENTIONS

- **Mention Parsing**: ALL scripture text must be processed using `parseEntityMentions` from `lib/utils/parseEntityMentions.ts`. This ensures consistent entity highlighting and interaction across the app.
- **Bilingual Support**: Heavily relies on `LanguageContext` (via `useLanguage()`). Support for dual-language rendering (English and Korean) is a core requirement for all reading components.
- **Entity Interaction**: Clicking an entity mention should trigger the `EntityPanel`. Hovering over mentions should provide visual feedback (handled via `hoveredEntity` state).
- **Navigation**: Use `ChapterNavigation` for moving between chapters to maintain consistent breadcrumb and deep-linking behavior.

## ANTI-PATTERNS

- **Hardcoded Parsing**: NEVER reimplement regex or string splitting for entity mentions within components. Always use the centralized `parseEntityMentions` utility.
- **Hydration Mismatch**: Avoid rendering dynamic content (like random highlights or client-side only formatting) directly in the initial HTML. Use `useEffect` or `next/dynamic` if client-specific logic is needed.
- **Direct Entity Links**: Do not use standard `<a>` tags for entity mentions within verses. Use buttons with the appropriate onClick handlers to trigger the `EntityPanel` or app-specific routing.
- **State Duplication**: Do not manage language or global entity state locally if it's already provided by `LanguageContext` or `EntityPanelContext`.
