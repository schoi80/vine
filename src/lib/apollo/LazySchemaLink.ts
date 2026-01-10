import { ApolloLink, Observable, Operation, FetchResult } from '@apollo/client';
import { SchemaLink } from '@apollo/client/link/schema';
import { getSchema } from './schema';

export class LazySchemaLink extends ApolloLink {
  private schemaLinkPromise: Promise<SchemaLink> | null = null;

  public request(operation: Operation): Observable<FetchResult> {
    if (!this.schemaLinkPromise) {
      this.schemaLinkPromise = getSchema().then((schema) => {
        return new SchemaLink({ 
          schema,
          context: {} // Provide default empty context for Neo4jGraphQL
        });
      });
    }

    return new Observable((observer) => {
      this.schemaLinkPromise!
        .then((link) => {
          const observable = link.request(operation);
          if (observable) {
            observable.subscribe(observer);
          } else {
            observer.complete();
          }
        })
        .catch((err) => {
          observer.error(err);
        });
    });
  }
}
