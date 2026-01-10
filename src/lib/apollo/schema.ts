import { Neo4jGraphQL } from '@neo4j/graphql';
import driver from '../neo4j/driver';
import { readFileSync } from 'fs';
import { join } from 'path';

let schemaPromise: Promise<any> | null = null;

export async function getSchema() {
  if (schemaPromise) {
    return schemaPromise;
  }

  schemaPromise = (async () => {
    // In Next.js, we need to be careful with file paths in standalone mode
    // process.cwd() is the root of the project
    const schemaPath = join(process.cwd(), 'src/lib/apollo/schema.graphql');
    const typeDefs = readFileSync(schemaPath, 'utf-8');

    const neoSchema = new Neo4jGraphQL({
      typeDefs,
      driver,
    });

    return neoSchema.getSchema();
  })();

  return schemaPromise;
}
