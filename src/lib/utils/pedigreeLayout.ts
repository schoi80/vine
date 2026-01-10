import { PersonNode, FamilyTreeData } from './familyTreeTransform';

export interface PedigreeNode {
  person: PersonNode;
  x: number;
  y: number;
  generation: number;
  isRoot: boolean;
  type: 'parent' | 'partner' | 'child' | 'root';
  role: 'root' | 'parent' | 'partner' | 'child';
}

export interface PedigreeConnection {
  from: PersonNode;
  to: PersonNode;
  type: 'parent' | 'partner';
}

const BOX_WIDTH = 100;
const BOX_HEIGHT = 40;
const HORIZONTAL_SPACING = 30;
const VERTICAL_SPACING = 80;

export function calculatePedigreeLayout(familyData: FamilyTreeData): {
  nodes: PedigreeNode[];
  connections: PedigreeConnection[];
  width: number;
  height: number;
} {
  const nodes: PedigreeNode[] = [];
  const connections: PedigreeConnection[] = [];

  const rootGeneration = 0;
  const parentGeneration = -1;
  const childGeneration = 1;

  const rootX = 400;

  nodes.push({
    person: familyData.person,
    x: rootX,
    y: rootGeneration * VERTICAL_SPACING + 200,
    generation: rootGeneration,
    isRoot: true,
    type: 'root',
    role: 'root',
  });

  const parentsCount = familyData.parents.length;
  if (parentsCount > 0) {
    const parentsStartX = rootX - ((parentsCount - 1) * (BOX_WIDTH + HORIZONTAL_SPACING)) / 2;

    familyData.parents.forEach((parent, index) => {
      const x = parentsStartX + index * (BOX_WIDTH + HORIZONTAL_SPACING);
      nodes.push({
        person: parent,
        x,
        y: parentGeneration * VERTICAL_SPACING + 200,
        generation: parentGeneration,
        isRoot: false,
        type: 'parent',
        role: 'parent',
      });

      connections.push({
        from: parent,
        to: familyData.person,
        type: 'parent',
      });
    });

    if (parentsCount === 2) {
      connections.push({
        from: familyData.parents[0],
        to: familyData.parents[1],
        type: 'partner',
      });
    }
  }

  const partnersCount = familyData.partners.length;
  if (partnersCount > 0) {
    const partnersStartX =
      rootX +
      BOX_WIDTH +
      HORIZONTAL_SPACING +
      ((partnersCount - 1) * (BOX_WIDTH + HORIZONTAL_SPACING)) / 2;

    familyData.partners.forEach((partner, index) => {
      const x = partnersStartX + index * (BOX_WIDTH + HORIZONTAL_SPACING);
      nodes.push({
        person: partner,
        x,
        y: rootGeneration * VERTICAL_SPACING + 200,
        generation: rootGeneration,
        isRoot: false,
        type: 'partner',
        role: 'partner',
      });

      connections.push({
        from: familyData.person,
        to: partner,
        type: 'partner',
      });
    });
  }

  const childrenCount = familyData.children.length;
  if (childrenCount > 0) {
    const childrenStartX = rootX - ((childrenCount - 1) * (BOX_WIDTH + HORIZONTAL_SPACING)) / 2;

    familyData.children.forEach((child, index) => {
      const x = childrenStartX + index * (BOX_WIDTH + HORIZONTAL_SPACING);
      nodes.push({
        person: child,
        x,
        y: childGeneration * VERTICAL_SPACING + 200,
        generation: childGeneration,
        isRoot: false,
        type: 'child',
        role: 'child',
      });

      connections.push({
        from: familyData.person,
        to: child,
        type: 'parent',
      });
    });
  }

  const allX = nodes.map(n => n.x);
  const allY = nodes.map(n => n.y);
  const minX = Math.min(...allX);
  const maxX = Math.max(...allX);
  const minY = Math.min(...allY);
  const maxY = Math.max(...allY);

  const width = maxX - minX + BOX_WIDTH + 100;
  const height = maxY - minY + BOX_HEIGHT + 100;

  return { nodes, connections, width, height };
}

export { BOX_WIDTH, BOX_HEIGHT };
