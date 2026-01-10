import { Translation, Translatable } from '@/lib/types/hierarchy';

export interface PersonNode extends Translatable {
  id: string;
  slug: string;
  name: string;
  gender?: string;
  birthYear?: number;
  deathYear?: number;
}

export interface FamilyTreeData {
  person: PersonNode;
  parents: PersonNode[];
  partners: PersonNode[];
  children: PersonNode[];
}

export interface GraphQLPersonResponse {
  people: Array<{
    id: string;
    slug: string;
    name: string;
    translations?: Translation[];
    gender?: string;
    birthYear?: number;
    deathYear?: number;
    parentsConnection: {
      edges: Array<{
        node: PersonNode;
      }>;
    };
    partnersConnection: {
      edges: Array<{
        node: PersonNode;
      }>;
    };
    childrenConnection: {
      edges: Array<{
        node: PersonNode;
      }>;
    };
  }>;
}

export function transformToFamilyTree(data: GraphQLPersonResponse): FamilyTreeData | null {
  if (!data.people || data.people.length === 0) {
    return null;
  }

  const person = data.people[0];

  return {
    person: {
      id: person.id,
      slug: person.slug,
      name: person.name,
      translations: person.translations,
      gender: person.gender,
      birthYear: person.birthYear,
      deathYear: person.deathYear,
    },
    parents: person.parentsConnection.edges.map(edge => edge.node),
    partners: person.partnersConnection.edges.map(edge => edge.node),
    children: person.childrenConnection.edges.map(edge => edge.node),
  };
}
