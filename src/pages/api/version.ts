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

async function getLatestRelease() {
  const res = await fetch('https://api.github.com/repos/diced/zipline/releases/latest', {
    headers: {
      Accept: 'application/vnd.github.v3+json',
      ...(process.env.GITHUB_TOKEN ? { Authorization: 'token ' + process.env.GITHUB_TOKEN } : {}),
    },
  });

  return res.json();
}

async function getLatestUpstreamRelease() {
  // read the package.json
  const res = await fetch('https://raw.githubusercontent.com/diced/zipline/trunk/package.json');

  const { version } = await res.json();

  return version;
}

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const c = searchParams.get('c');

  const latestStable = await getLatestRelease();

  const stable = parse(latestStable.tag_name.replace('v', ''));
  const upstream = parse(await getLatestUpstreamRelease());
  const current = parse(c);

  if (!current || !stable || !upstream) {
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

  const isUpstream = current.prerelease.length !== 0;

  const response: VersionResponse = {
    git: {
      stable: stable.version,
      upstream: upstream.version,
    },
    isUpstream,
    current: current.version,
  };

  if (isUpstream) {
    response.update = {
      stable: stable.compare(current) > 0,
      upstream: upstream.compare(current) > 0,
    };
  } else {
    response.update = {
      stable: stable.compare(current) > 0,
    };
  }

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: {
      'content-type': 'application/json',
    },
  });
}
