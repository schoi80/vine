/**
 * Timeline Layout Utility
 * Configures d3-force simulation for network graph layout
 */

import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCollide,
  forceCenter,
  forceRadial,
  type Simulation,
} from 'd3-force';
import type {
  TimelineEvent,
  TimelineNode,
  TimelineEdge,
  TimelineGraphData,
  EventEra,
} from '../types/timeline';
import { classifyEventEra } from './eraClassifier';
import { getEraRadius } from '../constants/eventEras';

/**
 * Build graph data from timeline events
 * Creates nodes from events and edges from precedes/follows relationships
 */
export function buildGraphData(events: TimelineEvent[]): TimelineGraphData {
  // Create nodes
  const nodes: TimelineNode[] = events.map(event => ({
    id: event.id,
    event,
    x: Math.random() * 800,
    y: Math.random() * 600,
    era: event.era || classifyEventEra(event),
  }));

  // Create edges from relationships
  const edges: TimelineEdge[] = [];
  const nodeIds = new Set(nodes.map(n => n.id));

  for (const node of nodes) {
    // Add edges for "precedes" relationships
    for (const target of node.event.precedes || []) {
      if (nodeIds.has(target.id)) {
        edges.push({
          source: node.id,
          target: target.id,
        });
      }
    }
  }

  return { nodes, edges };
}

/**
 * Configuration for force simulation
 */
export interface ForceConfig {
  width: number;
  height: number;
  chargeStrength?: number;
  linkDistance?: number;
  collideRadius?: number;
  alphaDecay?: number;
  velocityDecay?: number;
}

/**
 * Create and configure d3-force simulation
 * Uses radial force to cluster events by era
 */
export function createTimelineSimulation(
  graphData: TimelineGraphData,
  config: ForceConfig
): Simulation<TimelineNode, TimelineEdge> {
  const {
    width,
    height,
    chargeStrength = -150,
    linkDistance = 100,
    collideRadius = 40,
    alphaDecay = 0.02,
    velocityDecay = 0.4,
  } = config;

  const centerX = width / 2;
  const centerY = height / 2;

  // Create simulation
  const simulation = forceSimulation<TimelineNode, TimelineEdge>(graphData.nodes)
    // Nodes repel each other
    .force('charge', forceManyBody().strength(chargeStrength))

    // Links connect related events
    .force(
      'link',
      forceLink<TimelineNode, TimelineEdge>(graphData.edges)
        .id(d => d.id)
        .distance(linkDistance)
    )

    // Radial force: cluster events by era in concentric circles
    .force(
      'radial',
      forceRadial<TimelineNode>(node => getEraRadius(node.era, 80), centerX, centerY).strength(0.8)
    )

    // Prevent node overlap
    .force('collide', forceCollide<TimelineNode>(collideRadius))

    // Center the whole graph
    .force('center', forceCenter(centerX, centerY))

    // Simulation parameters
    .alphaDecay(alphaDecay)
    .velocityDecay(velocityDecay);

  return simulation;
}

/**
 * Calculate node size based on event importance
 * Considers participant count and verse count
 */
export function calculateNodeSize(event: TimelineEvent): number {
  const baseSize = 20;
  const participantWeight = (event.participants?.length || 0) * 2;
  const verseWeight = Math.min(event.verses?.length || 0, 10);

  return baseSize + participantWeight + verseWeight;
}

/**
 * Calculate edge opacity based on relationship type
 * Within-era edges are more prominent than cross-era edges
 */
export function calculateEdgeOpacity(sourceEra: EventEra, targetEra: EventEra): number {
  return sourceEra === targetEra ? 0.6 : 0.2;
}

/**
 * Calculate whether an edge should be dashed
 * Cross-era edges are dashed
 */
export function isEdgeDashed(sourceEra: EventEra, targetEra: EventEra): boolean {
  return sourceEra !== targetEra;
}

/**
 * Filter graph data based on criteria
 */
export function filterGraphData(
  graphData: TimelineGraphData,
  filters: {
    personSlugs?: Set<string>;
    placeSlugs?: Set<string>;
    eras?: Set<EventEra>;
    searchQuery?: string;
  }
): TimelineGraphData {
  const { personSlugs, placeSlugs, eras, searchQuery } = filters;

  // Filter nodes
  let filteredNodes = graphData.nodes;

  if (personSlugs && personSlugs.size > 0) {
    filteredNodes = filteredNodes.filter(node =>
      node.event.participants?.some(p => personSlugs.has(p.slug))
    );
  }

  if (placeSlugs && placeSlugs.size > 0) {
    filteredNodes = filteredNodes.filter(node =>
      node.event.occurredIn?.some(p => placeSlugs.has(p.slug))
    );
  }

  if (eras && eras.size > 0) {
    filteredNodes = filteredNodes.filter(node => eras.has(node.era));
  }

  if (searchQuery && searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filteredNodes = filteredNodes.filter(node => node.event.title.toLowerCase().includes(query));
  }

  // Filter edges to only include those between visible nodes
  const visibleNodeIds = new Set(filteredNodes.map(n => n.id));
  const filteredEdges = graphData.edges.filter(edge => {
    const sourceId = typeof edge.source === 'string' ? edge.source : edge.source.id;
    const targetId = typeof edge.target === 'string' ? edge.target : edge.target.id;
    return visibleNodeIds.has(sourceId) && visibleNodeIds.has(targetId);
  });

  return {
    nodes: filteredNodes,
    edges: filteredEdges,
  };
}

/**
 * Calculate SVG viewBox to fit all nodes
 */
export function calculateViewBox(nodes: TimelineNode[], padding: number = 100): string {
  if (nodes.length === 0) return '0 0 800 600';

  const xs = nodes.map(n => n.x);
  const ys = nodes.map(n => n.y);

  const minX = Math.min(...xs) - padding;
  const maxX = Math.max(...xs) + padding;
  const minY = Math.min(...ys) - padding;
  const maxY = Math.max(...ys) + padding;

  const width = maxX - minX;
  const height = maxY - minY;

  return `${minX} ${minY} ${width} ${height}`;
}

/**
 * Stop simulation when it has converged
 * Returns true if simulation should stop
 */
export function hasSimulationConverged(alpha: number, threshold: number = 0.01): boolean {
  return alpha < threshold;
}

/**
 * Calculate optimal zoom scale based on graph size
 */
export function calculateOptimalZoom(
  graphBounds: { width: number; height: number },
  viewportBounds: { width: number; height: number }
): number {
  const scaleX = viewportBounds.width / graphBounds.width;
  const scaleY = viewportBounds.height / graphBounds.height;

  return Math.min(scaleX, scaleY, 1) * 0.9; // 90% to add padding
}
