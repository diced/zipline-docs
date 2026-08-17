import { micromark } from 'micromark';
import { gfm, gfmHtml } from 'micromark-extension-gfm';

const REPO = 'diced/zipline';

function githubHeaders() {
  return {
    Accept: 'application/vnd.github+json',
    ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
  };
}

export async function getStars(): Promise<number> {
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}`, {
      headers: githubHeaders(),
      next: { revalidate: 3600 },
    });

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

export async function getReleases(): Promise<GithubRelease[]> {
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}/releases?per_page=100`, {
      headers: githubHeaders(),
      next: { revalidate: 3600 },
    });

    if (!res.ok) return [];

    const raw = (await res.json()) as GithubRelease[];

    return raw
      .filter((r) => /^v4(\.|$)/.test(r.tag_name))
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
    return [];
  }
}
