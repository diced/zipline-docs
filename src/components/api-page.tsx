import { openapi } from '@/lib/openapi';
import { createAPIPage } from 'fumadocs-openapi/ui';
import client from './api-page.client';
import { createCodeUsageGeneratorRegistry } from 'fumadocs-openapi/requests/generators';

export const APIPage = createAPIPage(openapi, {
  client,
  playground: {
    enabled: false,
  },
  codeUsages: createCodeUsageGeneratorRegistry(),
  generateTypeScriptDefinitions: false,
});
