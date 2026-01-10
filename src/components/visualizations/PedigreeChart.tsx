'use client';

import React, { useMemo, useState, useRef, useCallback } from 'react';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { GET_PERSON_FAMILY_TREE } from '@/lib/apollo/queries';
import { transformToFamilyTree, GraphQLPersonResponse } from '@/lib/utils/familyTreeTransform';
import {
  calculatePedigreeLayout,
  BOX_WIDTH,
  BOX_HEIGHT,
  PedigreeNode,
} from '@/lib/utils/pedigreeLayout';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import { useEntityPanel } from '@/lib/contexts/EntityPanelContext';

interface PedigreeChartProps {
  slug: string;
}

const MIN_SCALE = 0.5;
const MAX_SCALE = 3.0;
const ZOOM_SPEED = 0.001;

export default function PedigreeChart({ slug }: PedigreeChartProps) {
  const { t } = useLanguage();
  const { open } = useEntityPanel();
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [scale, setScale] = useState(1);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const { data, loading, error } = useQuery<GraphQLPersonResponse>(GET_PERSON_FAMILY_TREE, {
    variables: { slug },
  });

  const layout = useMemo(() => {
    if (!data) return null;
    const familyData = transformToFamilyTree(data);
    if (!familyData) return null;
    return calculatePedigreeLayout(familyData);
  }, [data]);

  const viewBox = useMemo(() => {
    if (!layout || layout.nodes.length === 0) return '0 0 800 400';

    const allX = layout.nodes.map(n => n.x);
    const allY = layout.nodes.map(n => n.y);
    const minX = Math.min(...allX);
    const maxX = Math.max(...allX);
    const minY = Math.min(...allY);
    const maxY = Math.max(...allY);

    const padding = 50;
    const vbMinX = minX - padding;
    const vbMinY = minY - padding;
    const vbWidth = maxX - minX + BOX_WIDTH + 2 * padding;
    const vbHeight = maxY - minY + BOX_HEIGHT + 2 * padding;

    return `${vbMinX} ${vbMinY} ${vbWidth} ${vbHeight}`;
  }, [layout]);

  const handleWheel = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      e.preventDefault();

      const rect = svgRef.current?.getBoundingClientRect();
      if (!rect) return;

      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const delta = -e.deltaY * ZOOM_SPEED;
      const newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, scale + delta));

      const scaleRatio = newScale / scale;

      const newTranslateX = mouseX - scaleRatio * (mouseX - translateX);
      const newTranslateY = mouseY - scaleRatio * (mouseY - translateY);

      setScale(newScale);
      setTranslateX(newTranslateX);
      setTranslateY(newTranslateY);
    },
    [scale, translateX, translateY]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      if (e.button !== 0) return; // Left click only
      setIsDragging(true);
      setDragStart({ x: e.clientX - translateX, y: e.clientY - translateY });
    },
    [translateX, translateY]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      if (!isDragging) return;
      setTranslateX(e.clientX - dragStart.x);
      setTranslateY(e.clientY - dragStart.y);
    },
    [isDragging, dragStart]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleNodeClick = (personSlug: string) => {
    open('person', personSlug);
  };

  const getRoleLabel = (role: string): string => {
    switch (role) {
      case 'root':
        return t('family.root');
      case 'parent':
        return t('family.parent');
      case 'partner':
        return t('family.partner');
      case 'child':
        return t('family.child');
      default:
        return '';
    }
  };

  const getTooltipText = (node: PedigreeNode): string => {
    const roleLabel = getRoleLabel(node.role);
    const lifespan =
      node.person.birthYear && node.person.deathYear
        ? `${node.person.birthYear}–${node.person.deathYear}`
        : node.person.birthYear
          ? `b. ${node.person.birthYear}`
          : node.person.deathYear
            ? `d. ${node.person.deathYear}`
            : '';

    return [roleLabel, node.person.name, lifespan].filter(Boolean).join(' • ');
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-red-500">Error loading family tree</div>
      </div>
    );
  }

  if (!layout || layout.nodes.length === 0) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-gray-500">{t('family.empty')}</div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full overflow-x-auto overflow-y-hidden"
      onWheel={handleWheel}
      style={{ cursor: isDragging ? 'grabbing' : 'grab', userSelect: 'none', height: '250px' }}
    >
      <svg
        ref={svgRef}
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid meet"
        className="mx-auto"
        style={{ height: '250px', minWidth: layout.width }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <g transform={`translate(${translateX / scale}, ${translateY / scale}) scale(${scale})`}>
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 10 3, 0 6" fill="#64748b" />
            </marker>
          </defs>

          {layout.connections.map((conn, idx) => {
            const fromNode = layout.nodes.find(n => n.person.id === conn.from.id);
            const toNode = layout.nodes.find(n => n.person.id === conn.to.id);

            if (!fromNode || !toNode) return null;

            const isPartner = conn.type === 'partner';

            if (isPartner) {
              const y = fromNode.y + BOX_HEIGHT / 2;
              return (
                <line
                  key={`conn-${idx}`}
                  x1={fromNode.x + BOX_WIDTH}
                  y1={y}
                  x2={toNode.x}
                  y2={y}
                  stroke="#a855f7"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
              );
            }

            const fromX = fromNode.x + BOX_WIDTH / 2;
            const fromY = fromNode.y + BOX_HEIGHT;
            const toX = toNode.x + BOX_WIDTH / 2;
            const toY = toNode.y;
            const midY = (fromY + toY) / 2;

            return (
              <g key={`conn-${idx}`}>
                <path
                  d={`M ${fromX} ${fromY} L ${fromX} ${midY} L ${toX} ${midY} L ${toX} ${toY}`}
                  stroke="#64748b"
                  strokeWidth="2"
                  fill="none"
                  markerEnd="url(#arrowhead)"
                />
              </g>
            );
          })}

          {layout.nodes.map(node => {
            const isMale = node.person.gender?.toLowerCase() === 'male';
            const isFemale = node.person.gender?.toLowerCase() === 'female';
            const genderSymbol = isMale ? '♂' : isFemale ? '♀' : '';

            let fillColor = '#3b82f6';
            let borderColor = '#2563eb';

            if (node.isRoot) {
              fillColor = '#3b82f6';
              borderColor = '#1d4ed8';
            } else if (node.type === 'parent') {
              fillColor = '#6b7280';
              borderColor = '#4b5563';
            } else if (node.type === 'partner') {
              fillColor = '#a855f7';
              borderColor = '#9333ea';
            } else if (node.type === 'child') {
              fillColor = '#60a5fa';
              borderColor = '#3b82f6';
            }

            const nameWithGender = genderSymbol
              ? `${node.person.name} ${genderSymbol}`
              : node.person.name;

            const roleLabel = getRoleLabel(node.role);
            const hasLifespan = node.person.birthYear || node.person.deathYear;

            return (
              <g
                key={node.person.id}
                onClick={() => handleNodeClick(node.person.slug)}
                className="cursor-pointer transition-opacity hover:opacity-80"
              >
                <title>{getTooltipText(node)}</title>

                <rect
                  x={node.x}
                  y={node.y}
                  width={BOX_WIDTH}
                  height={BOX_HEIGHT}
                  fill={fillColor}
                  stroke={borderColor}
                  strokeWidth="2"
                  rx="6"
                />

                <text
                  x={node.x + BOX_WIDTH / 2}
                  y={node.y + 16}
                  textAnchor="middle"
                  fill="white"
                  fontSize="12"
                  fontWeight="600"
                >
                  {nameWithGender}
                </text>

                <text
                  x={node.x + BOX_WIDTH / 2}
                  y={node.y + 28}
                  textAnchor="middle"
                  fill="white"
                  fontSize="8"
                  opacity="0.75"
                >
                  {roleLabel}
                </text>

                {hasLifespan && (
                  <text
                    x={node.x + BOX_WIDTH / 2}
                    y={node.y + 42}
                    textAnchor="middle"
                    fill="white"
                    fontSize="8"
                    opacity="0.7"
                  >
                    {node.person.birthYear && node.person.deathYear
                      ? `${node.person.birthYear}–${node.person.deathYear}`
                      : node.person.birthYear
                        ? `b. ${node.person.birthYear}`
                        : `d. ${node.person.deathYear}`}
                  </text>
                )}
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
