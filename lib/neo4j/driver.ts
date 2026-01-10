import neo4j, { Driver } from 'neo4j-driver';

const uri = process.env.NEO4J_URI || 'neo4j://localhost:7687';
const user = process.env.NEO4J_USERNAME || 'neo4j';
const password = process.env.NEO4J_PASSWORD || 'neo4j';

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from accumulating.
 */
let driver: Driver;

if (process.env.NODE_ENV === 'production') {
  driver = neo4j.driver(uri, neo4j.auth.basic(user, password), {
    disableLosslessIntegers: true,
  });
} else {
  if (!(global as any)._neo4jDriver) {
    (global as any)._neo4jDriver = neo4j.driver(uri, neo4j.auth.basic(user, password), {
      disableLosslessIntegers: true,
    });
  }
  driver = (global as any)._neo4jDriver;
}

export default driver;
