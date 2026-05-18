const HTTP_METHOD_SEGMENTS = new Set([
  'get',
  'post',
  'put',
  'patch',
  'delete',
  'head',
  'options',
]);

/** Parse HTTP method from API doc URLs indexed by Algolia (e.g. …/users/id/patch). */
export function getMethodFromSearchUrl(url: string): string | undefined {
  try {
    const { pathname } = new URL(url, 'https://zipline.diced.sh');
    if (!pathname.includes('/docs/api/')) return undefined;

    const segment = pathname.split('/').filter(Boolean).at(-1)?.toLowerCase();
    if (!segment || !HTTP_METHOD_SEGMENTS.has(segment)) return undefined;

    return segment.toUpperCase();
  } catch {
    return undefined;
  }
}
