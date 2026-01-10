import { gql } from '@apollo/client';

export const PLACE_EVENTS_CHIPS = gql`
  query PlaceEventsChips($slug: String!, $first: Int!) {
    places(where: { slug: { eq: $slug } }) {
      id
      eventsConnection(first: $first, sort: [{ node: { sortKey: ASC } }]) {
        totalCount
        edges {
          node {
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
          }
        }
      }
    }
  }
`;

export const PLACE_PEOPLE_BORN_CHIPS = gql`
  query PlacePeopleBornChips($slug: String!, $first: Int!) {
    places(where: { slug: { eq: $slug } }) {
      id
      peopleBornConnection(first: $first, sort: [{ node: { name: ASC } }]) {
        totalCount
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
            birthYear
          }
        }
      }
    }
  }
`;

export const PLACE_PEOPLE_DIED_CHIPS = gql`
  query PlacePeopleDiedChips($slug: String!, $first: Int!) {
    places(where: { slug: { eq: $slug } }) {
      id
      peopleDiedConnection(first: $first, sort: [{ node: { name: ASC } }]) {
        totalCount
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
            deathYear
          }
        }
      }
    }
  }
`;

export const PERSON_KEY_INFO = gql`
  query PersonKeyInfo($slug: String!) {
    people(where: { slug: { eq: $slug } }) {
      id
      name
      translations(where: { language: { eq: "ko" } }) {
        language
        field
        text
      }
      slug
      alsoCalled
      title
      translations(where: { language: { eq: "ko" } }) {
        language
        field
        text
      }
      gender
      description
      status
      birthYear
      deathYear
      bornInConnection(first: 1) {
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
            latitude
            longitude
          }
        }
      }
      diedInConnection(first: 1) {
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
            latitude
            longitude
          }
        }
      }
      memberOfConnection(first: 1) {
        edges {
          node {
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
    }
  }
`;

export const PERSON_FAMILY_CHIPS = gql`
  query PersonFamilyChips($slug: String!, $first: Int!) {
    people(where: { slug: { eq: $slug } }) {
      id
      parentsConnection(first: $first, sort: [{ node: { name: ASC } }]) {
        totalCount
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
            birthYear
            deathYear
          }
        }
      }
      childrenConnection(first: $first, sort: [{ node: { name: ASC } }]) {
        totalCount
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
            birthYear
            deathYear
          }
        }
      }
      partnersConnection(first: $first, sort: [{ node: { name: ASC } }]) {
        totalCount
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
          }
        }
      }
    }
  }
`;

export const PERSON_PARTICIPATION_CHIPS = gql`
  query PersonParticipationChips($slug: String!, $first: Int!) {
    people(where: { slug: { eq: $slug } }) {
      id
      participatedInConnection(first: $first, sort: [{ node: { sortKey: ASC } }]) {
        totalCount
        edges {
          node {
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
          }
        }
      }
    }
  }
`;

export const PERSON_AUTHORSHIP_CHIPS = gql`
  query PersonAuthorshipChips($slug: String!, $first: Int!) {
    people(where: { slug: { eq: $slug } }) {
      id
      chaptersWrittenConnection(first: $first, sort: [{ node: { osisRef: ASC } }]) {
        totalCount
        edges {
          node {
            chapterNum
            book {
              id
              slug
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
`;

export const EVENT_PLACES_CHIPS = gql`
  query EventPlacesChips($id: ID!, $first: Int!) {
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
      occurredInConnection(first: $first) {
        totalCount
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
            latitude
            longitude
          }
        }
      }
    }
  }
`;

export const EVENT_PARTICIPANTS_CHIPS = gql`
  query EventParticipantsChips($id: ID!, $first: Int!) {
    events(where: { id: { eq: $id } }) {
      id
      participantsConnection(first: $first, sort: [{ node: { name: ASC } }]) {
        totalCount
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
            birthYear
            deathYear
          }
        }
      }
    }
  }
`;

export const EVENT_TIMELINE_CHIPS = gql`
  query EventTimelineChips($id: ID!, $first: Int!) {
    events(where: { id: { eq: $id } }) {
      id
      followsConnection(first: $first) {
        totalCount
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
          properties {
            lagType
            lag
          }
        }
      }
      precedesConnection(first: $first) {
        totalCount
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
          properties {
            lagType
            lag
          }
        }
      }
    }
  }
`;
