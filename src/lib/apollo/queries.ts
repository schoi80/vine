import { gql } from '@apollo/client';

/**
 * GraphQL query to fetch a chapter with all verses and entity mentions
 * Used for the main reading experience
 *
 * Includes bilingual fields:
 * Includes translations relationship for all entities.
 * Access pattern in components:
 *   import { getLocalizedTitle } from "@/lib/utils/bilingual";
 *   const title = getLocalizedTitle(entity, language);
 */
export const GET_CHAPTER_FOR_READING = gql`
  query GetChapterForReading($bookSlug: String, $chapterNum: Int) {
    books(where: { slug: { eq: $bookSlug } }) {
      id
      title
      translations(where: { language: { eq: "ko" } }) {
        language
        field
        text
      }
      shortName
      translations(where: { language: { eq: "ko" } }) {
        language
        field
        text
      }
      slug
      testament {
        title
        translations(where: { language: { eq: "ko" } }) {
          language
          field
          text
        }
      }
      division {
        title
        translations(where: { language: { eq: "ko" } }) {
          language
          field
          text
        }
      }
      allChapters: chaptersConnection {
        totalCount
      }
      chaptersConnection(where: { node: { chapterNum: { eq: $chapterNum } } }) {
        edges {
          node {
            id
            chapterNum
            osisRef
            slug
            versesConnection(sort: [{ node: { verseNum: ASC } }]) {
              edges {
                node {
                  id
                  verseNum
                  text
                  translations(where: { language: { eq: "ko" } }) {
                    language
                    field
                    text
                  }
                  translations(where: { language: { eq: "ko" } }) {
                    language
                    field
                    text
                  }
                  mentionsPeople {
                    id
                    slug
                    name
                    title
                    translations(where: { language: { eq: "ko" } }) {
                      language
                      field
                      text
                    }
                    gender
                  }
                  mentionsPlaces {
                    id
                    slug
                    name
                    translations(where: { language: { eq: "ko" } }) {
                      language
                      field
                      text
                    }
                    latitude
                    longitude
                    featureType
                  }
                  describesEvents {
                    id
                    title
                    translations(where: { language: { eq: "ko" } }) {
                      language
                      field
                      text
                    }
                    startDate
                  }
                }
              }
            }
            writers {
              id
              name
              translations(where: { language: { eq: "ko" } }) {
                language
                field
                text
              }
              slug
            }
          }
        }
      }
    }
  }
`;
/**
 * Query to get all books organized by testament and division
 * Used for the browse page
 */
export const GET_ALL_BOOKS = gql`
  query GetAllBooks {
    testaments {
      title
      translations(where: { language: { eq: "ko" } }) {
        language
        field
        text
      }
      divisions {
        title
        translations(where: { language: { eq: "ko" } }) {
          language
          field
          text
        }
        books {
          slug
          title
          translations(where: { language: { eq: "ko" } }) {
            language
            field
            text
          }
          shortName
          translations(where: { language: { eq: "ko" } }) {
            language
            field
            text
          }
          bookOrder
          division {
            title
            translations(where: { language: { eq: "ko" } }) {
              language
              field
              text
            }
          }
          chaptersConnection {
            totalCount
          }
        }
      }
      books {
        slug
        title
        translations(where: { language: { eq: "ko" } }) {
          language
          field
          text
        }
        shortName
        translations(where: { language: { eq: "ko" } }) {
          language
          field
          text
        }
        bookOrder
        division {
          title
          translations(where: { language: { eq: "ko" } }) {
            language
            field
            text
          }
        }
        chaptersConnection {
          totalCount
        }
      }
    }
  }
`;
/**
 * Query to get person details with all relationships
 */
export const GET_PERSON_DETAIL = gql`
  query GetPersonDetail($slug: String) {
    people(where: { slug: { eq: $slug } }) {
      name
      alsoCalled
      title
      translations(where: { language: { eq: "ko" } }) {
        language
        field
        text
      }
      description
      gender
      slug
      parents {
        name
        translations(where: { language: { eq: "ko" } }) {
          language
          field
          text
        }
        slug
        gender
        children {
          name
          translations(where: { language: { eq: "ko" } }) {
            language
            field
            text
          }
          slug
          gender
        }
      }
      children {
        name
        translations(where: { language: { eq: "ko" } }) {
          language
          field
          text
        }
        slug
        gender
      }
      partners {
        name
        translations(where: { language: { eq: "ko" } }) {
          language
          field
          text
        }
        slug
        gender
      }
      bornIn {
        name
        translations(where: { language: { eq: "ko" } }) {
          language
          field
          text
        }
        slug
        latitude
        longitude
      }
      diedIn {
        name
        translations(where: { language: { eq: "ko" } }) {
          language
          field
          text
        }
        slug
        latitude
        longitude
      }
      versesConnection(sort: [{ node: { verseNum: ASC } }]) {
        edges {
          node {
            verseText
            translations(where: { language: { eq: "ko" } }) {
              language
              field
              text
            }
            verseNum
            chapter {
              chapterNum
              book {
                shortName
                translations(where: { language: { eq: "ko" } }) {
                  language
                  field
                  text
                }
                slug
              }
            }
          }
        }
        totalCount
      }
      participatedIn {
        id
        title
        translations(where: { language: { eq: "ko" } }) {
          language
          field
          text
        }
        startDate
        duration
        sortKey
        occurredIn {
          id
          name
          translations(where: { language: { eq: "ko" } }) {
            language
            field
            text
          }
          slug
        }
        verses {
          verseText
          translations(where: { language: { eq: "ko" } }) {
            language
            field
            text
          }
          verseNum
          chapter {
            chapterNum
            book {
              shortName
              translations(where: { language: { eq: "ko" } }) {
                language
                field
                text
              }
              slug
            }
          }
        }
        precedes {
          id
          title
          translations(where: { language: { eq: "ko" } }) {
            language
            field
            text
          }
        }
        follows {
          id
          title
          translations(where: { language: { eq: "ko" } }) {
            language
            field
            text
          }
        }
      }
      memberOf {
        id
        name
        translations(where: { language: { eq: "ko" } }) {
          language
          field
          text
        }
      }
    }
  }
`;
/**
 * Query to get place details
 */
export const GET_PLACE_DETAIL = gql`
  query GetPlaceDetail($slug: String) {
    places(where: { slug: { eq: $slug } }) {
      name
      translations(where: { language: { eq: "ko" } }) {
        language
        field
        text
      }
      latitude
      longitude
      precision
      featureType
      description
      source
      slug
      versesConnection(sort: [{ node: { verseNum: ASC } }]) {
        edges {
          node {
            verseText
            translations(where: { language: { eq: "ko" } }) {
              language
              field
              text
            }
            verseNum
            chapter {
              chapterNum
              book {
                shortName
                translations(where: { language: { eq: "ko" } }) {
                  language
                  field
                  text
                }
                slug
              }
            }
          }
        }
        totalCount
      }
      events {
        id
        title
        translations(where: { language: { eq: "ko" } }) {
          language
          field
          text
        }
        startDate
        duration
        sortKey
        participants {
          id
          name
          translations(where: { language: { eq: "ko" } }) {
            language
            field
            text
          }
          slug
          gender
        }
        verses {
          verseText
          translations(where: { language: { eq: "ko" } }) {
            language
            field
            text
          }
          verseNum
          chapter {
            chapterNum
            book {
              shortName
              translations(where: { language: { eq: "ko" } }) {
                language
                field
                text
              }
              slug
            }
          }
        }
        precedes {
          id
          title
          translations(where: { language: { eq: "ko" } }) {
            language
            field
            text
          }
        }
        follows {
          id
          title
          translations(where: { language: { eq: "ko" } }) {
            language
            field
            text
          }
        }
      }
    }
  }
`;
/**
 * Query to get event details with timeline context
 */
export const GET_EVENT_DETAIL = gql`
  query GetEventDetail($id: ID!) {
    events(where: { id: { eq: $id } }) {
      id
      title
      translations(where: { language: { eq: "ko" } }) {
        language
        field
        text
      }
      startDate
      duration
      sortKey
      participants {
        id
        name
        translations(where: { language: { eq: "ko" } }) {
          language
          field
          text
        }
        slug
      }
      occurredIn {
        id
        name
        translations(where: { language: { eq: "ko" } }) {
          language
          field
          text
        }
        slug
        latitude
        longitude
      }
      verses {
        id
        verseText
        translations(where: { language: { eq: "ko" } }) {
          language
          field
          text
        }
        verseNum
        chapter {
          chapterNum
          book {
            shortName
            translations(where: { language: { eq: "ko" } }) {
              language
              field
              text
            }
            slug
          }
        }
      }
      precedes {
        id
        title
        translations(where: { language: { eq: "ko" } }) {
          language
          field
          text
        }
      }
      follows {
        id
        title
        translations(where: { language: { eq: "ko" } }) {
          language
          field
          text
        }
      }
    }
  }
`;
/**
 * Query to get book metadata for navigation
 * Returns a single book with its chapter count
 */
export const GET_BOOK_METADATA = gql`
  query GetBookMetadata($slug: String!) {
    books(where: { slug: { eq: $slug } }) {
      id
      title
      translations(where: { language: { eq: "ko" } }) {
        language
        field
        text
      }
      shortName
      translations(where: { language: { eq: "ko" } }) {
        language
        field
        text
      }
      slug
      chaptersConnection {
        totalCount
      }
    }
  }
`;
/**
 * Query to get all timeline events for visualization
 * Includes all relationships needed for network graph
 */
export const GET_ALL_TIMELINE_EVENTS = gql`
  query GetAllTimelineEvents {
    events {
      id
      title
      translations(where: { language: { eq: "ko" } }) {
        language
        field
        text
      }
      startDate
      duration
      sortKey
      participants {
        id
        name
        translations(where: { language: { eq: "ko" } }) {
          language
          field
          text
        }
        slug
        gender
      }
      occurredIn {
        id
        name
        translations(where: { language: { eq: "ko" } }) {
          language
          field
          text
        }
        slug
      }
      verses {
        text
        translations(where: { language: { eq: "ko" } }) {
          language
          field
          text
        }
        verseNum
        chapter {
          chapterNum
          book {
            shortName
            translations(where: { language: { eq: "ko" } }) {
              language
              field
              text
            }
            slug
          }
        }
      }
      precedes {
        id
        title
        translations(where: { language: { eq: "ko" } }) {
          language
          field
          text
        }
      }
      follows {
        id
        title
        translations(where: { language: { eq: "ko" } }) {
          language
          field
          text
        }
      }
    }
  }
`;
/**
 * Query to get all books with chapter counts
 * Used for Jump to Book/Chapter navigation
 */
export const BOOKS_WITH_COUNTS = gql`
  query BooksWithCounts {
    books(sort: [{ bookOrder: ASC }]) {
      slug
      title
      translations(where: { language: { eq: "ko" } }) {
        language
        field
        text
      }
      chaptersConnection {
        totalCount
      }
    }
  }
`;
export const PERSON_PANEL_QUERY = gql`
  query PersonPanel($slug: String!, $first: Int = 10, $after: String) {
    people(where: { slug: { eq: $slug } }) {
      id
      name
      slug
      gender
      title
      translations(where: { language: { eq: "ko" } }) {
        language
        field
        text
      }
      description
      versesConnection(first: $first, after: $after, sort: [{ node: { verseNum: ASC } }]) {
        totalCount
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            verseNum
            text
            translations(where: { language: { eq: "ko" } }) {
              language
              field
              text
            }
            chapter {
              id
              chapterNum
              book {
                id
                title
                translations(where: { language: { eq: "ko" } }) {
                  language
                  field
                  text
                }
                slug
              }
            }
          }
        }
      }
    }
  }
`;
export const PLACE_PANEL_QUERY = gql`
  query PlacePanel($slug: String!, $first: Int = 10, $after: String) {
    places(where: { slug: { eq: $slug } }) {
      id
      name
      translations(where: { language: { eq: "ko" } }) {
        language
        field
        text
      }
      slug
      featureType
      latitude
      longitude
      description
      versesConnection(first: $first, after: $after, sort: [{ node: { verseNum: ASC } }]) {
        totalCount
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            verseNum
            text
            translations(where: { language: { eq: "ko" } }) {
              language
              field
              text
            }
            chapter {
              id
              chapterNum
              book {
                id
                title
                translations(where: { language: { eq: "ko" } }) {
                  language
                  field
                  text
                }
                slug
              }
            }
          }
        }
      }
    }
  }
`;
export const EVENT_PANEL_QUERY = gql`
  query EventPanel($id: ID!, $first: Int = 10, $after: String) {
    events(where: { id: { eq: $id } }) {
      id
      title
      translations(where: { language: { eq: "ko" } }) {
        language
        field
        text
      }
      startDate
      versesConnection(first: $first, after: $after, sort: [{ node: { verseNum: ASC } }]) {
        totalCount
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            verseNum
            text
            translations(where: { language: { eq: "ko" } }) {
              language
              field
              text
            }
            chapter {
              id
              chapterNum
              book {
                id
                title
                translations(where: { language: { eq: "ko" } }) {
                  language
                  field
                  text
                }
                slug
              }
            }
          }
        }
      }
    }
  }
`;
export const PERSON_VERSES_QUERY = gql`
  query PersonVerses($slug: String!, $first: Int = 500, $after: String) {
    people(where: { slug: { eq: $slug } }) {
      slug
      versesConnection(first: $first, after: $after) {
        totalCount
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            verseNum
            text
            translations(where: { language: { eq: "ko" } }) {
              language
              field
              text
            }
            chapter {
              id
              chapterNum
              book {
                id
                title
                translations(where: { language: { eq: "ko" } }) {
                  language
                  field
                  text
                }
                slug
                bookOrder
              }
            }
            mentionsPeopleConnection {
              edges {
                node {
                  slug
                  name
                  translations(where: { language: { eq: "ko" } }) {
                    language
                    field
                    text
                  }
                }
              }
            }
            mentionsPlacesConnection {
              edges {
                node {
                  slug
                  name
                  translations(where: { language: { eq: "ko" } }) {
                    language
                    field
                    text
                  }
                }
              }
            }
            describesEventsConnection {
              edges {
                node {
                  id
                  title
                  translations(where: { language: { eq: "ko" } }) {
                    language
                    field
                    text
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
export const PLACE_VERSES_QUERY = gql`
  query PlaceVerses($slug: String!, $first: Int = 500, $after: String) {
    places(where: { slug: { eq: $slug } }) {
      slug
      versesConnection(first: $first, after: $after) {
        totalCount
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            verseNum
            text
            translations(where: { language: { eq: "ko" } }) {
              language
              field
              text
            }
            chapter {
              id
              chapterNum
              book {
                id
                title
                translations(where: { language: { eq: "ko" } }) {
                  language
                  field
                  text
                }
                slug
                bookOrder
              }
            }
            mentionsPeopleConnection {
              edges {
                node {
                  slug
                  name
                  translations(where: { language: { eq: "ko" } }) {
                    language
                    field
                    text
                  }
                }
              }
            }
            mentionsPlacesConnection {
              edges {
                node {
                  slug
                  name
                  translations(where: { language: { eq: "ko" } }) {
                    language
                    field
                    text
                  }
                }
              }
            }
            describesEventsConnection {
              edges {
                node {
                  id
                  title
                  translations(where: { language: { eq: "ko" } }) {
                    language
                    field
                    text
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
export const EVENT_VERSES_QUERY = gql`
  query EventVerses($id: ID!, $first: Int = 500, $after: String) {
    events(where: { id: { eq: $id } }) {
      id
      versesConnection(first: $first, after: $after) {
        totalCount
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            verseNum
            text
            translations(where: { language: { eq: "ko" } }) {
              language
              field
              text
            }
            chapter {
              id
              chapterNum
              book {
                id
                title
                translations(where: { language: { eq: "ko" } }) {
                  language
                  field
                  text
                }
                slug
                bookOrder
              }
            }
            mentionsPeopleConnection {
              edges {
                node {
                  slug
                  name
                  translations(where: { language: { eq: "ko" } }) {
                    language
                    field
                    text
                  }
                }
              }
            }
            mentionsPlacesConnection {
              edges {
                node {
                  slug
                  name
                  translations(where: { language: { eq: "ko" } }) {
                    language
                    field
                    text
                  }
                }
              }
            }
            describesEventsConnection {
              edges {
                node {
                  id
                  title
                  translations(where: { language: { eq: "ko" } }) {
                    language
                    field
                    text
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
/**
 * Query to get today's daily reading for the home page
 * Uses Neo4j Date scalar which expects YYYY-MM-DD format
 *
 * Returns chapters for the specified date with full bilingual book metadata
 * Used by TodayScripture component with fallback to random selection
 */
export const GET_DAILY_READING = gql`
  query GetDailyReading($date: ID!) {
    dailyReadings(where: { id: { eq: $date } }) {
      id
      date
      chaptersConnection {
        edges {
          node {
            id
            chapterNum
            slug
            book {
              id
              slug
              title
              translations(where: { language: { eq: "ko" } }) {
                language
                field
                text
              }
              shortName
              translations(where: { language: { eq: "ko" } }) {
                language
                field
                text
              }
              bookOrder
              testament {
                title
                translations(where: { language: { eq: "ko" } }) {
                  language
                  field
                  text
                }
              }
              division {
                title
                translations(where: { language: { eq: "ko" } }) {
                  language
                  field
                  text
                }
              }
            }
          }
        }
      }
    }
  }
`;
/**
 * Query to fetch family tree data for a person
 * Fetches parents, partners, and children with bilingual support
 * Used for React Flow family tree visualization
 */
export const GET_PERSON_FAMILY_TREE = gql`
  query GetPersonFamilyTree($slug: String!) {
    people(where: { slug: { eq: $slug } }) {
      id
      slug
      name
      translations(where: { language: { eq: "ko" } }) {
        language
        field
        text
      }
      gender
      birthYear
      deathYear
      parentsConnection {
        edges {
          node {
            id
            slug
            name
            translations(where: { language: { eq: "ko" } }) {
              language
              field
              text
            }
            gender
            birthYear
            deathYear
          }
        }
      }
      partnersConnection {
        edges {
          node {
            id
            slug
            name
            translations(where: { language: { eq: "ko" } }) {
              language
              field
              text
            }
            gender
            birthYear
            deathYear
          }
        }
      }
      childrenConnection {
        edges {
          node {
            id
            slug
            name
            translations(where: { language: { eq: "ko" } }) {
              language
              field
              text
            }
            gender
            birthYear
            deathYear
          }
        }
      }
    }
  }
`;
