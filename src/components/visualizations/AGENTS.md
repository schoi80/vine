# Visualizations Component Guide (`src/components/visualizations`)

This directory contains complex, interactive data visualizations for exploring biblical data, including geographic maps, temporal timelines, and genealogical family trees.

## OVERVIEW

The visualizations in this directory provide interactive graph-based views of Scripture entities. They leverage specialized libraries for high-performance rendering and complex layouts, while maintaining integration with the application's entity navigation system.

## KEY COMPONENTS

### `EventTimeline`

- **Technology**: D3.js (d3-force).
- **Purpose**: Displays a network graph of historic events, clustered by biblical era in concentric circles.
- **Key Features**: Eras-based clustering, interactive node selection, pan/zoom support.

### `PedigreeChart`

- **Technology**: React SVG with custom layout engine.
- **Purpose**: Visualizes family relationships (parents, partners, children) for a specific person.
- **Key Features**: Directional relationship arrows, gender-coded nodes, automatic layout calculation.

### `Map`

- **Technology**: React Leaflet.
- **Purpose**: Geographic visualization of places mentioned in Scripture.
- **Key Features**: Marker clustering (via parent views), place detail popups, integration with `EntityPanelContext`.

## CONVENTIONS

### ⚠️ SSR Safety (CRITICAL)

Leaflet and some D3 interactions depend on the `window` object and DOM availability.

- **ALL** components in this directory that use Leaflet or complex D3 logic **must** be dynamically imported with `ssr: false` in their parent views or pages.
- Example:
  ```tsx
  const Map = dynamic(() => import('./Map'), { ssr: false });
  ```

### User Interactions

- **Left-click only**: Major node/marker interactions should only trigger on left-click (`e.button === 0`) to avoid conflicts with browser context menus or custom right-click behaviors.
- **Event Propagation**: Ensure `e.stopPropagation()` is called on interactive elements within SVGs to prevent unintended pan/zoom triggers.

### Design & Colors

- **Consistency**: Use `colorHelpers` from `src/lib/utils/colorHelpers.ts` to maintain entity color consistency (Person = Blue, Place = Green, Event = Purple).
- **Responsiveness**: Use `viewBox` for SVG-based visualizations and parent container references (e.g., `useResizeObserver`) for dimensioning rather than hardcoded pixel values.

## ANTI-PATTERNS

- ❌ **Direct Leaflet Imports in Server Components**: Never import `leaflet` or `react-leaflet` in a component that might be rendered on the server.
- ❌ **Embedded Layout Logic**: Do not place complex layout calculation logic (e.g., d3-force configs, tree traversal) directly in the component file. Move these to `src/lib/utils/` (e.g., `timelineLayout.ts`, `pedigreeLayout.ts`).
- ❌ **Hardcoded Dimensions**: Avoid fixed `width` or `height` props. Components should ideally fill their parent container and respond to resize events.
- ❌ **Ad-hoc Styling**: Use Tailwind utility classes or theme tokens from `globals.css` instead of hardcoded hex values where possible (except for D3/SVG fill attributes which may require `colorHelpers`).
