import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { getSchema } from '@/lib/apollo/schema';
import { NextRequest } from 'next/server';

const schema = await getSchema();

const server = new ApolloServer({
  schema,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({ req }),
});

async function safeHandler(req: NextRequest) {
  return handler(req);
}

export { safeHandler as GET, safeHandler as POST };
