import { CodegenConfig } from '@graphql-codegen/cli';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const config: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_SANDBOX_SUBGRAPH_GRAPHQL,
  documents: ['**/queries/*.ts'],
  generates: {
    './app/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
