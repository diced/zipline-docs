import type { LiteClient } from 'algoliasearch/lite';
import { createContentHighlighter } from 'fumadocs-core/search';
import { getMethodFromSearchUrl } from '@/lib/http-method';

type HighlightField = {
  value?: string;
  matchLevel?: string;
};

export type DocSearchHit = {
  objectID: string;
  url: string;
  url_without_anchor?: string;
  anchor?: string;
  content?: string | null;
  type?: string;
  hierarchy: Record<string, string | null | undefined>;
  _highlightResult?: {
    content?: HighlightField;
    hierarchy?: Record<string, HighlightField>;
  };
  _snippetResult?: {
    content?: HighlightField;
  };
};

export type DocSearchResultItem = {
  id: string;
  type: 'page' | 'heading' | 'text';
  url: string;
  breadcrumbs?: string[];
  content: string;
  method?: string;
};

const hierarchyLevels = ['lvl0', 'lvl1', 'lvl2', 'lvl3', 'lvl4', 'lvl5', 'lvl6'] as const;

export function rewriteDocSearchUrl(hit: DocSearchHit): string {
  try {
    const { pathname } = new URL(hit.url);
    if (hit.anchor) return `${pathname}#${hit.anchor}`;
    const { hash } = new URL(hit.url);
    return `${pathname}${hash}`;
  } catch {
    return hit.url;
  }
}

function decodeHtmlEntities(value: string): string {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"');
}

function algoliaHighlightToMark(value: string): string {
  return decodeHtmlEntities(
    value
      .replaceAll('<span class="algolia-docsearch-suggestion--highlight">', '<mark>')
      .replaceAll('</span>', '</mark>'),
  );
}

function hierarchyValues(hit: DocSearchHit): string[] {
  const values = hierarchyLevels
    .map((level) => hit.hierarchy[level])
    .filter((value): value is string => Boolean(value));

  if (values[0] === 'Documentation') return values.slice(1);

  return values;
}

function getHitLevel(hit: DocSearchHit): number | null {
  if (!hit.type?.startsWith('lvl')) return null;
  return Number.parseInt(hit.type.slice(3), 10);
}

function getHierarchyAtLevel(hit: DocSearchHit, level: number): string | undefined {
  const value = hit.hierarchy[`lvl${level}`];
  return value ?? undefined;
}

function getHighlightedAtLevel(hit: DocSearchHit, level: number): string | undefined {
  const field = hit._highlightResult?.hierarchy?.[`lvl${level}`];
  if (field?.value) return algoliaHighlightToMark(field.value);
  return getHierarchyAtLevel(hit, level);
}

function getHitContent(hit: DocSearchHit): string | undefined {
  if (hit.type === 'content') {
    const snippet = hit._snippetResult?.content?.value;
    if (snippet) return algoliaHighlightToMark(snippet);

    const highlighted = hit._highlightResult?.content?.value;
    if (highlighted) return algoliaHighlightToMark(highlighted);

    if (hit.content) return hit.content;
  }

  const level = getHitLevel(hit);
  if (level !== null) return getHighlightedAtLevel(hit, level);

  return hierarchyValues(hit).at(-1);
}

function getBreadcrumbs(hit: DocSearchHit): string[] | undefined {
  const level = getHitLevel(hit);

  if (level !== null) {
    const crumbs: string[] = [];
    for (let i = 1; i < level; i++) {
      const value = getHierarchyAtLevel(hit, i);
      if (value) crumbs.push(value);
    }
    return crumbs.length > 0 ? crumbs : undefined;
  }

  const values = hierarchyValues(hit);
  return values.length > 0 ? values : undefined;
}

function getItemType(hit: DocSearchHit): DocSearchResultItem['type'] {
  if (hit.type === 'lvl1') return 'page';
  return 'text';
}

export function mapDocSearchHits(hits: DocSearchHit[]): DocSearchResultItem[] {
  const items: DocSearchResultItem[] = [];

  for (const hit of hits) {
    const content = getHitContent(hit);
    if (!content) continue;

    const type = getItemType(hit);
    const url = rewriteDocSearchUrl(hit);
    const method = getMethodFromSearchUrl(hit.url);

    items.push({
      id: hit.objectID,
      type,
      url,
      breadcrumbs: type === 'page' ? undefined : getBreadcrumbs(hit),
      content,
      method,
    });
  }

  return items;
}

export function createDocSearchClient(
  client: LiteClient,
  indexName: string,
): {
  deps: string[];
  search: (query: string) => Promise<DocSearchResultItem[]>;
} {
  return {
    deps: [indexName],
    async search(query) {
      if (query.trim().length === 0) return [];

      const result = await client.searchForHits<DocSearchHit>({
        requests: [
          {
            indexName,
            query,
            hitsPerPage: 15,
          },
        ],
      });

      const hits = result.results[0]?.hits ?? [];
      const highlighter = createContentHighlighter(query);

      return mapDocSearchHits(hits).map((item) => {
        const highlighted = item.content.includes('<mark>')
          ? item.content
          : highlighter.highlightMarkdown(item.content);

        return {
          ...item,
          content: highlighted,
        };
      });
    },
  };
}
