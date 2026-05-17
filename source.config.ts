import { defineConfig, defineDocs } from 'fumadocs-mdx/config';
import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';
import lastModified from 'fumadocs-mdx/plugins/last-modified';
import { remarkSteps } from 'fumadocs-core/mdx-plugins';
import { variablesTextmateGrammar } from '@/lib/textmate/zipline-vars';
import { caddyTextmateGrammar } from '@/lib/textmate/caddyfile';

// You can customize Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.dev/docs/mdx/collections
export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: pageSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkSteps],
    rehypeCodeOptions: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      langs: [variablesTextmateGrammar, caddyTextmateGrammar],
      inline: 'tailing-curly-colon',
    },
  },
  plugins: [lastModified()],
});
