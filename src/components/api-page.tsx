'use client';

import { createOpenAPIPage } from 'fumadocs-openapi/ui';

export const APIPage = createOpenAPIPage({
  playground: {
    enabled: false,
  },
  generateTypeScriptDefinitions: false,
});
