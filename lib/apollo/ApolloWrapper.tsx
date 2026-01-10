'use client';

import { ApolloClient, InMemoryCache } from '@apollo/client-integration-nextjs';
import { HttpLink } from '@apollo/client';
import { ApolloNextAppProvider } from '@apollo/experimental-nextjs-app-support/ssr';
import { ReactNode } from 'react';

function makeClient() {
  let graphqlUrl = process.env.NEXT_PUBLIC_GRAPHQL_URL;

  if (typeof window === 'undefined') {
    graphqlUrl = 'http://127.0.0.1:8080/api/graphql';
  } else {
    if (!graphqlUrl || graphqlUrl.includes(':4000')) {
      graphqlUrl = '/api/graphql';
    }
  }

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
    link: new HttpLink({
      uri: graphqlUrl,
      fetchOptions: { cache: 'no-store' },
    }),
  });
}

export function ApolloWrapper({ children }: { children: ReactNode }) {
  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>;
}
