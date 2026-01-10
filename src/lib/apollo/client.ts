import { ApolloClient, InMemoryCache } from '@apollo/client';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';
import { LazySchemaLink } from './LazySchemaLink';

/**
 * Apollo Client configured for Next.js App Router with Server Components
 * Uses LazySchemaLink to execute queries directly against the local schema
 * without network round-trips.
 */
export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            books: {
              merge: false,
            },
            verses: {
              merge: false,
            },
          },
        },
        Book: {
          keyFields: ['slug'],
        },
        Person: {
          keyFields: ['slug'],
        },
        Place: {
          keyFields: ['slug'],
        },
        Event: {
          keyFields: ['id'],
        },
      },
    }),
    link: new LazySchemaLink(),
  });
});
