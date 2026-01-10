import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  serverExternalPackages: ['graphql', '@neo4j/graphql', 'neo4j-driver', '@apollo/server'],
  env: {
    GRAPHQL_URL: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  },
  images: {
    localPatterns: [
      {
        pathname: '/**',
        search: '',
      },
    ],
    qualities: [75, 95],
  },
};

export default nextConfig;
