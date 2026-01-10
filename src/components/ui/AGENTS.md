# Vine Project: UI Components Guide

## OVERVIEW

Base design system components for the Vine project. These are highly reusable, low-level components built with **Tailwind CSS v4**, **Radix UI** primitives, and **Framer Motion**. They prioritize compact density, accessibility, and bilingual (EN/KR) support.

## CONVENTIONS

- **Stories**: Every component MUST have a corresponding `*.stories.tsx` file in the same directory for visual verification and documentation.
- **Accessibility**:
  - Icons MUST be set to `decorative={true}` if adjacent to descriptive text to avoid redundant screen reader announcements.
  - Interactive elements must have proper `aria-label` or `aria-labelledby` if they don't contain readable text.
- **Exports**: Use **named exports** for all components. Avoid default exports to ensure better IDE discoverability and refactoring support.
- **Ref Handling**: All reusable UI components that wrap DOM elements MUST handle `ref` forwarding.
  - **React 19 Pattern**: Prefer passing `ref` as a standard prop directly to functional components.
  - Ensure the `ref` is correctly attached to the primary interactive or root element.

## STATUS

| Component   | Status         | Description                                                                         |
| :---------- | :------------- | :---------------------------------------------------------------------------------- |
| **Badge**   | **Primary**    | The standard entity tag component. Used for `person`, `place`, `event`, and `book`. |
| **Icon**    | **Primary**    | Standard wrapper for Lucide/SVG icons. Handles consistent sizing and a11y.          |
| **Button**  | **Stable**     | Standard action component with loading and icon-only states.                        |
| **Chip**    | **DEPRECATED** | **Do not use.** Use `Badge` with `mode="generic"` instead.                          |
| **Tooltip** | **Stable**     | Radix-based tooltip for providing additional context.                               |

## ANTI-PATTERNS

- **Importing Chip**: Never import `Chip` in new features. It is kept only for backward compatibility during the migration to `Badge`.
- **Hardcoded Styling**: Never use hex codes (e.g., `#ffffff`) or generic Tailwind colors (e.g., `bg-blue-500`) directly. Use project tokens like `bg-accent-person-bg` or `text-neutral-11`.
- **Direct SVG/Lucide Usage**: Avoid using Lucide icons directly in business logic components. Wrap them in the `<Icon />` component to ensure consistent stroke width, size, and accessibility props.
- **Missing Forwarded Refs**: Reusable UI components must not "black hole" refs. Always ensure the `ref` prop is handled.
- **Hardcoded Text**: Do not hardcode EN/KR text. Use `useLanguage` or pass bilingual props (e.g., `label` and `labelKr`).
