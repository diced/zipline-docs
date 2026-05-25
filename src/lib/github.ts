import { micromark } from 'micromark';
import { gfm, gfmHtml } from 'micromark-extension-gfm';

function githubHeaders(): HeadersInit {
  return {
    Accept: 'application/vnd.github+json',
    ...(process.env.GITHUB_TOKEN
      ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
      : {}),
  };
}

export async function getGithubStars(repo = 'diced/zipline'): Promise<number> {
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`, {
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

export interface ZiplineRelease {
  tagName: string;
  name: string;
  htmlUrl: string;
  publishedAt: string | null;
  prerelease: boolean;
  bodyHtml: string;
  author: {
    login: string;
    htmlUrl: string;
    avatarUrl: string;
  } | null;
}

interface RawGithubRelease {
  tag_name: string;
  name: string | null;
  body: string | null;
  html_url: string;
  published_at: string | null;
  prerelease: boolean;
  draft: boolean;
  author: {
    login: string;
    html_url: string;
    avatar_url: string;
  } | null;
}

function renderMarkdown(input: string): string {
  return micromark(input, {
    allowDangerousHtml: false,
    extensions: [gfm()],
    htmlExtensions: [gfmHtml()],
  });
}

export async function getZiplineReleases(
  repo = 'diced/zipline',
): Promise<ZiplineRelease[]> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${repo}/releases?per_page=100`,
      {
        headers: githubHeaders(),
        next: { revalidate: 3600 },
      },
    );

    if (!res.ok) return [];

    const raw = (await res.json()) as RawGithubRelease[];

    return raw
      .filter((r) => !r.draft && /^v4(\.|$)/.test(r.tag_name))
      .map<ZiplineRelease>((r) => ({
        tagName: r.tag_name,
        name: r.name?.trim() || r.tag_name,
        htmlUrl: r.html_url,
        publishedAt: r.published_at,
        prerelease: r.prerelease,
        bodyHtml: r.body ? renderMarkdown(r.body) : '',
        author: r.author
          ? {
              login: r.author.login,
              htmlUrl: r.author.html_url,
              avatarUrl: r.author.avatar_url,
            }
          : null,
      }))
      .sort((a, b) => {
        const ta = a.publishedAt ? Date.parse(a.publishedAt) : 0;
        const tb = b.publishedAt ? Date.parse(b.publishedAt) : 0;
        return tb - ta;
      });
  } catch {
    return [];
  }
}
