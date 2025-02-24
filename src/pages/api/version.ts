import { Endpoints } from '@octokit/types';
import type { NextRequest } from 'next/server';
import { parse } from 'semver';

export interface VersionResponse {
  git?: {
    stable?: string;
    upstream?: string;
  };
  current?: string;
  isUpstream?: boolean;
  update?: {
    stable?: boolean;
    upstream?: boolean;
  };
}

export const config = {
  runtime: 'edge',
};

type Tags = Endpoints['GET /repos/{owner}/{repo}/tags']['response']['data'];
type Commits =
  Endpoints['GET /repos/{owner}/{repo}/commits']['response']['data'];

async function getTags(): Promise<Tags> {
  const res = await fetch('https://api.github.com/repos/diced/zipline/tags', {
    headers: {
      Accept: 'application/vnd.github.v3+json',
      ...(process.env.GITHUB_TOKEN
        ? { Authorization: 'token ' + process.env.GITHUB_TOKEN }
        : {}),
    },
  });

  if (!res.ok) return [];

  return await res.json();
}

async function getCommits(): Promise<Commits> {
  const res = await fetch(
    'https://api.github.com/repos/diced/zipline/commits/v3',
    {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        ...(process.env.GITHUB_TOKEN
          ? { Authorization: 'token ' + process.env.GITHUB_TOKEN }
          : {}),
      },
    },
  );

  const latestv3 = ((await res.json()) as Commits[0]).sha;
  const realRes = await fetch(
    `https://api.github.com/repos/diced/zipline/commits?sha=${latestv3}`,
    {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        ...(process.env.GITHUB_TOKEN
          ? { Authorization: 'token ' + process.env.GITHUB_TOKEN }
          : {}),
      },
    },
  );

  return await realRes.json();
}

async function getCommit(c: string | null): Promise<Commits[0] | null> {
  const res = await fetch(
    `https://api.github.com/repos/diced/zipline/commits/${c}`,
    {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        ...(process.env.GITHUB_TOKEN
          ? { Authorization: 'token ' + process.env.GITHUB_TOKEN }
          : {}),
      },
    },
  );

  if (!res.ok) return null;

  return await res.json();
}

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const com = searchParams.get('c');

  const tags = await getTags();
  const commits = await getCommits();

  if (tags.length === 0 || commits.length === 0)
    return new Response(
      JSON.stringify({
        error: 'no available version',
      }),
      {
        status: 500,
        headers: {
          'content-type': 'application/json',
        },
      },
    );

  const stable = parse(tags[0].name.replace('v', '')),
    upstream = commits[0],
    instanceVer = tags.find(
      (t) => t.name.replace('v', '') === com || t.commit.sha === com,
    ),
    instnceCom = await getCommit(com);

  if (!stable || (!instnceCom && !instanceVer)) {
    return new Response(
      JSON.stringify({
        error: 'Invalid version',
      }),
      {
        status: 400,
        headers: {
          'content-type': 'application/json',
        },
      },
    );
  }

  const isUpstream =
    !instanceVer ||
    tags.findIndex((t) => t.commit.sha === instnceCom?.sha) !== -1;

  const response: VersionResponse = {
    git: {
      stable: stable.version,
      upstream: upstream.sha,
    },
    isUpstream,
    current:
      tags
        .find(
          (t) =>
            t.commit.sha === instnceCom?.sha || t.name.replace('v', '') === com,
        )
        ?.name.replace('v', '') || instnceCom?.sha,
  };

  if (isUpstream)
    response.update = {
      upstream:
        commits.findIndex((c) => c.sha === instnceCom?.sha) === -1
          ? true
          : commits.findIndex((c) => c.sha === instnceCom?.sha) > 0,
    };
  else
    response.update = {
      stable: tags[0].commit.sha !== instanceVer?.commit.sha,
    };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: {
      'content-type': 'application/json',
    },
  });
}
