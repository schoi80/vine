'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { TimelineEvent, TimelineNode, TimelineEdge, ZoomState } from '@/lib/types/timeline';
import {
  buildGraphData,
  createTimelineSimulation,
  calculateNodeSize,
  calculateEdgeOpacity,
  isEdgeDashed,
} from '@/lib/utils/timelineLayout';
import { EVENT_ERAS, getAllEras, getEraRadius } from '@/lib/constants/eventEras';
import { classifyEventEra } from '@/lib/utils/eraClassifier';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import { getLocalizedTitle } from '@/lib/utils/bilingual';

interface EventTimelineProps {
  events: TimelineEvent[];
  selectedEventId?: string | null;
  onEventSelect?: (eventId: string) => void;
  width?: number;
  height?: number;
}

/**
 * Base Event Timeline Component
 * Pure SVG network graph visualization with d3-force layout
 * Shows events clustered by biblical era in concentric circles
 */
export default function EventTimeline({
  events,
  selectedEventId,
  onEventSelect,
  width = 1200,
  height = 800,
}: EventTimelineProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [nodes, setNodes] = useState<TimelineNode[]>([]);
  const [edges, setEdges] = useState<TimelineEdge[]>([]);
  const [zoom, setZoom] = useState<ZoomState>({ x: 0, y: 0, scale: 1 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const simulationRef = useRef<any>(null);
  const { t, language } = useLanguage();

  // Build graph data from events
  const graphData = useMemo(() => {
    // Ensure each event has an era
    const eventsWithEra = events.map(event => ({
      ...event,
      era: event.era || classifyEventEra(event),
    }));

    return buildGraphData(eventsWithEra as TimelineEvent[]);
  }, [events]);

  // Initialize and run d3-force simulation
  useEffect(() => {
    if (graphData.nodes.length === 0) return;

    // Stop existing simulation
    if (simulationRef.current) {
      simulationRef.current.stop();
    }

    // Create new simulation
    const simulation = createTimelineSimulation(graphData, { width, height });

    // Update node positions on each tick
    simulation.on('tick', () => {
      setNodes([...graphData.nodes]);
      setEdges([...graphData.edges]);
    });

    // Stop simulation after convergence
    simulation.on('end', () => {
      console.log('Timeline simulation converged');
    });

    simulationRef.current = simulation;

    return () => {
      simulation.stop();
    };
  }, [graphData, width, height]);

  // Handle mouse wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = -e.deltaY * 0.001;
    const newScale = Math.max(0.1, Math.min(5, zoom.scale + delta));
    setZoom({ ...zoom, scale: newScale });
  };

  // Handle pan drag start
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      // Left click only
      setIsDragging(true);
      setDragStart({ x: e.clientX - zoom.x, y: e.clientY - zoom.y });
    }
  };

  // Handle pan drag move
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setZoom({
        ...zoom,
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  // Handle pan drag end
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle node click
  const handleNodeClick = (eventId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onEventSelect?.(eventId);
  };

  // Reset zoom
  const handleResetZoom = () => {
    setZoom({ x: 0, y: 0, scale: 1 });
  };

  const centerX = width / 2;
  const centerY = height / 2;
  const eras = getAllEras();

  if (events.length === 0) {
    return (
      <div className="text-text-secondary flex h-full items-center justify-center">
        {t('timeline.noEventsToDisplay')}
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        className="cursor-move bg-gray-50 dark:bg-gray-800"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <g transform={`translate(${zoom.x}, ${zoom.y}) scale(${zoom.scale})`}>
          {/* Era zone backgrounds (concentric circles) */}
          <g className="era-zones">
            {eras.map(era => {
              const radius = getEraRadius(era.id, 80);
              const localizedEraTitle = getLocalizedTitle(era, language);
              return (
                <g key={era.id}>
                  <circle
                    cx={centerX}
                    cy={centerY}
                    r={radius}
                    fill={era.color}
                    fillOpacity={0.05}
                    stroke={era.color}
                    strokeWidth={1}
                    strokeOpacity={0.2}
                  />
                  {/* Era label */}
                  <text
                    x={centerX}
                    y={centerY - radius + 20}
                    fill={era.color}
                    fontSize="11"
                    fontWeight="600"
                    textAnchor="middle"
                    opacity={0.6}
                  >
                    {localizedEraTitle}
                  </text>
                </g>
              );
            })}
          </g>

          {/* Edges (connections between events) */}
          <g className="edges">
            {edges.map((edge, i) => {
              const source =
                typeof edge.source === 'string'
                  ? nodes.find(n => n.id === edge.source)
                  : edge.source;
              const target =
                typeof edge.target === 'string'
                  ? nodes.find(n => n.id === edge.target)
                  : edge.target;

              if (!source || !target) return null;

              const opacity = calculateEdgeOpacity(source.era, target.era);
              const dashed = isEdgeDashed(source.era, target.era);

              return (
                <line
                  key={`edge-${i}`}
                  x1={source.x}
                  y1={source.y}
                  x2={target.x}
                  y2={target.y}
                  stroke="#9ca3af"
                  strokeWidth={1.5}
                  strokeOpacity={opacity}
                  strokeDasharray={dashed ? '4 2' : undefined}
                />
              );
            })}
          </g>

          {/* Nodes (events) */}
          <g className="nodes">
            {nodes.map(node => {
              const size = calculateNodeSize(node.event);
              const isSelected = node.id === selectedEventId;
              const eraConfig = EVENT_ERAS[node.era];
              const localizedTitle = getLocalizedTitle(node.event, language);

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  onClick={e => handleNodeClick(node.id, e)}
                  className="cursor-pointer"
                  style={{ pointerEvents: 'all' }}
                >
                  {/* Node circle */}
                  <circle
                    r={size}
                    fill={isSelected ? '#8b5cf6' : eraConfig.color}
                    stroke={isSelected ? '#6d28d9' : '#ffffff'}
                    strokeWidth={isSelected ? 3 : 2}
                    opacity={0.9}
                    className="transition-all hover:opacity-100"
                  />

                  {/* Node label */}
                  <text
                    y={size + 16}
                    fill="#171717"
                    fontSize="10"
                    fontWeight={isSelected ? 'bold' : 'normal'}
                    textAnchor="middle"
                    className="pointer-events-none select-none"
                  >
                    {localizedTitle.length > 20
                      ? `${localizedTitle.slice(0, 20)}...`
                      : localizedTitle}
                  </text>
                </g>
              );
            })}
          </g>
        </g>
      </svg>

      {/* Zoom controls */}
      <div className="absolute right-4 bottom-4 flex flex-col gap-2">
        <button
          onClick={() => setZoom({ ...zoom, scale: Math.min(5, zoom.scale * 1.2) })}
          className="border-border hover:bg-hover rounded border bg-white px-3 py-2 text-sm shadow-sm dark:bg-gray-100"
          title={t('timeline.zoomInTitle')}
        >
          +
        </button>
        <button
          onClick={() => setZoom({ ...zoom, scale: Math.max(0.1, zoom.scale / 1.2) })}
          className="border-border hover:bg-hover rounded border bg-white px-3 py-2 text-sm shadow-sm dark:bg-gray-100"
          title={t('timeline.zoomOutTitle')}
        >
          −
        </button>
        <button
          onClick={handleResetZoom}
          className="border-border hover:bg-hover rounded border bg-white px-3 py-2 text-xs shadow-sm dark:bg-gray-100"
          title={t('timeline.resetTitle')}
        >
          {t('timeline.resetView')}
        </button>
      </div>

      <div className="border-border text-text-secondary absolute top-4 left-4 rounded border bg-white px-3 py-2 text-sm shadow-sm dark:bg-gray-100">
        {events.length} {t('timeline.eventsCount')}
      </div>

      {/* Event count indicator */}
      <div className="border-border text-text-secondary absolute top-4 left-4 rounded border bg-white px-3 py-2 text-sm shadow-sm dark:bg-gray-100">
        {events.length} events
      </div>
    </div>
  );
}
