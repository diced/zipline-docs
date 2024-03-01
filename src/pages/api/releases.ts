import { Endpoints } from '@octokit/types';
import type { NextRequest } from 'next/server';

export type Release = Endpoints['GET /repos/{owner}/{repo}/releases']['response']['data'][0];
export type Commit = Endpoints['GET /repos/{owner}/{repo}/commits/{ref}']['response']['data'];
export type CheckRun =
  Endpoints['GET /repos/{owner}/{repo}/commits/{ref}/check-runs']['response']['data']['check_runs'][0];

export interface ReleaseResponse {
  releases: Release[];
  upstream: {
    commit: Commit | null;
    checkRuns: CheckRun[];
  };
}

export const config = {
  runtime: 'edge',
};

const headers = {
  Accept: 'application/vnd.github.v3+json',
  ...(process.env.GITHUB_TOKEN ? { Authorization: 'token ' + process.env.GITHUB_TOKEN } : {}),
};

export default async function handler(req: NextRequest) {
  const response: ReleaseResponse = {
    releases: [],
    upstream: {
      commit: null,
      checkRuns: [],
    },
  };

  const res = await fetch('https://api.github.com/repos/diced/zipline/releases', {
    headers,
  });

  if (res.ok) {
    const releases: Release[] = await res.json();

    response.releases = releases.filter(
      (release) => release.tag_name.startsWith('v3') || release.tag_name.startsWith('3'),
    );
  }

  const upstreamRes = await fetch('https://api.github.com/repos/diced/zipline/commits/trunk', {
    headers,
  });

  if (upstreamRes.ok) {
    const commit: Commit = await upstreamRes.json();

    response.upstream.commit = commit;
  }

  const checkRunsRes = await fetch('https://api.github.com/repos/diced/zipline/commits/trunk/check-runs', {
    headers,
  });

  if (checkRunsRes.ok) {
    const resp: {
      check_runs: CheckRun[];
    } = await checkRunsRes.json();

    response.upstream.checkRuns = resp.check_runs;
  }

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: {
      'content-type': 'application/json',
      'cache-control': 'public, max-age=60, s-maxage=60',
    },
  });
}
