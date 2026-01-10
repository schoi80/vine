import { gql } from '@apollo/client';

/**
 * GraphQL query to fetch a chapter with all verses and entity mentions
 * Used for the main reading experience
 *
 * Includes bilingual fields:
 * - testament.titleKr: Korean translation for Testament ("구약", "신약")
 * - division.titleKr: Korean translation for Division ("모세오경", "복음서", etc.)
 * - bookNameKr: Korean book name ("창세기", "마태복음", etc.)
 *
 * Access pattern in components:
 *   const testament = book.testament;
 *   const testamentName = language === 'kr' ? testament.titleKr : testament.title;
 *
 * Or use utility:
 *   import { getLocalizedTitle } from '@/lib/utils/bilingual';
 *   const testamentName = getLocalizedTitle(book.testament, language);
 */
export const GET_CHAPTER_FOR_READING = gql`
  query GetChapterForReading($bookSlug: String, $chapterNum: Int) {
    books(where: { slug: { eq: $bookSlug } }) {
      id
      title
      bookNameKr
      shortName
      shortNameKr
      slug
      testament {
        title
        titleKr
      }
      division {
        title
        titleKr
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
                  verseText
                  mdText
                  mdTextKr
                  mentionsPeople {
                    id
                    slug
                    name
                    title
                    gender
                  }
                  mentionsPlaces {
                    id
                    slug
                    name
                    latitude
                    longitude
                    featureType
                  }
                  describesEvents {
                    id
                    title
                    startDate
                  }
                }
              }
            }
            writers {
              id
              name
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
      titleKr
      divisions {
        title
        titleKr
        books {
          slug
          title
          bookNameKr
          shortName
          shortNameKr
          bookOrder
          division {
            title
            titleKr
          }
          chaptersConnection {
            totalCount
          }
        }
      }
      books {
        slug
        title
        bookNameKr
        shortName
        shortNameKr
        bookOrder
        division {
          title
          titleKr
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
      description
      gender
      slug
      parents {
        name
        slug
        gender
        children {
          name
          slug
          gender
        }
      }
      children {
        name
        slug
        gender
      }
      partners {
        name
        slug
        gender
      }
      bornIn {
        name
        slug
        latitude
        longitude
      }
      diedIn {
        name
        slug
        latitude
        longitude
      }
      versesConnection(sort: [{ node: { verseNum: ASC } }]) {
        edges {
          node {
            verseText
            verseNum
            chapter {
              chapterNum
              book {
                shortName
                bookNameKr
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
        startDate
        duration
        sortKey
        occurredIn {
          id
          name
          slug
        }
        verses {
          verseText
          verseNum
          chapter {
            chapterNum
            book {
              shortName
              slug
            }
          }
        }
        precedes {
          id
          title
        }
        follows {
          id
          title
        }
      }
      memberOf {
        id
        name
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
            verseNum
            chapter {
              chapterNum
              book {
                shortName
                bookNameKr
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
        startDate
        duration
        sortKey
        participants {
          id
          name
          slug
          gender
        }
        verses {
          verseText
          verseNum
          chapter {
            chapterNum
            book {
              shortName
              slug
            }
          }
        }
        precedes {
          id
          title
        }
        follows {
          id
          title
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
      startDate
      duration
      sortKey
      participants {
        id
        name
        slug
      }
      occurredIn {
        id
        name
        slug
        latitude
        longitude
      }
      verses {
        id
        verseText
        verseNum
        chapter {
          chapterNum
          book {
            shortName
            bookNameKr
            slug
          }
        }
      }
      precedes {
        id
        title
      }
      follows {
        id
        title
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
      bookNameKr
      shortName
      shortNameKr
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
      startDate
      duration
      sortKey
      participants {
        id
        name
        slug
        gender
      }
      occurredIn {
        id
        name
        slug
      }
      verses {
        verseText
        mdText
        mdTextKr
        verseNum
        chapter {
          chapterNum
          book {
            shortName
            bookNameKr
            slug
          }
        }
      }
      precedes {
        id
        title
      }
      follows {
        id
        title
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
      bookNameKr
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
            verseText
            mdText
            mdTextKr
            chapter {
              id
              chapterNum
              book {
                id
                title
                bookNameKr
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
            verseText
            mdText
            mdTextKr
            chapter {
              id
              chapterNum
              book {
                id
                title
                bookNameKr
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
            verseText
            mdText
            mdTextKr
            chapter {
              id
              chapterNum
              book {
                id
                title
                bookNameKr
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
            verseText
            mdText
            mdTextKr
            chapter {
              id
              chapterNum
              book {
                id
                title
                bookNameKr
                slug
                bookOrder
              }
            }
            mentionsPeopleConnection {
              edges {
                node {
                  slug
                  name
                }
              }
            }
            mentionsPlacesConnection {
              edges {
                node {
                  slug
                  name
                }
              }
            }
            describesEventsConnection {
              edges {
                node {
                  id
                  title
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
            verseText
            mdText
            mdTextKr
            chapter {
              id
              chapterNum
              book {
                id
                title
                bookNameKr
                slug
                bookOrder
              }
            }
            mentionsPeopleConnection {
              edges {
                node {
                  slug
                  name
                }
              }
            }
            mentionsPlacesConnection {
              edges {
                node {
                  slug
                  name
                }
              }
            }
            describesEventsConnection {
              edges {
                node {
                  id
                  title
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
            verseText
            mdText
            mdTextKr
            chapter {
              id
              chapterNum
              book {
                id
                title
                bookNameKr
                slug
                bookOrder
              }
            }
            mentionsPeopleConnection {
              edges {
                node {
                  slug
                  name
                }
              }
            }
            mentionsPlacesConnection {
              edges {
                node {
                  slug
                  name
                }
              }
            }
            describesEventsConnection {
              edges {
                node {
                  id
                  title
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
              bookNameKr
              shortName
              shortNameKr
              bookOrder
              testament {
                title
                titleKr
              }
              division {
                title
                titleKr
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
      gender
      birthYear
      deathYear
      parentsConnection {
        edges {
          node {
            id
            slug
            name
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
            gender
            birthYear
            deathYear
          }
        }
      }
    }
  }
`;
