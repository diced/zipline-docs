import { micromark } from 'micromark';
import { gfm, gfmHtml } from 'micromark-extension-gfm';

const REPO = 'diced/zipline';

function githubHeaders(token?: string) {
  return {
    Accept: 'application/vnd.github+json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function fetchGithub(path: string) {
  const token = process.env.GITHUB_TOKEN;
  const url = `https://api.github.com/repos/${REPO}${path}`;
  const options = {
    next: { revalidate: 3600 },
    signal: AbortSignal.timeout(10000),
  };
  const response = await fetch(url, { ...options, headers: githubHeaders(token) });

  // Public repository data remains available when the configured token is invalid.
  if (token && response.status === 401) {
    return fetch(url, { ...options, headers: githubHeaders() });
  }
  return response;
}

export async function getStars(): Promise<number> {
  try {
    const res = await fetchGithub('');

    if (!res.ok) return 0;

    const data = (await res.json()) as { stargazers_count?: number };
    return data.stargazers_count ?? 0;
  } catch {
    return 0;
  }
}

export type GithubRelease = {
  tag_name: string;
  name: string | null;
  body: string | null;
  html_url: string;
  published_at: string | null;
  prerelease: boolean;
};

function renderMarkdown(input?: string | null): string {
  if (!input) return '';
  return micromark(input, {
    allowDangerousHtml: false,
    extensions: [gfm()],
    htmlExtensions: [gfmHtml()],
  });
}

export async function getReleases(): Promise<GithubRelease[] | null> {
  try {
    const res = await fetchGithub('/releases?per_page=100');

    if (!res.ok) return null;

    const raw = (await res.json()) as (GithubRelease & { draft: boolean })[];

    return raw
      .filter((r) => !r.draft && /^v4(\.|$)/.test(r.tag_name))
      .map((r) => ({
        ...r,
        name: r.name?.trim() || r.tag_name,
        body: renderMarkdown(r.body?.trim()),
      }))
      .sort((a, b) => {
        const ta = a.published_at ? Date.parse(a.published_at) : 0;
        const tb = b.published_at ? Date.parse(b.published_at) : 0;
        return tb - ta;
      });
  } catch {
    return null;
  }
}
