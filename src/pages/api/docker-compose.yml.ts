import type { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: NextRequest) {
  let url =
    'https://raw.githubusercontent.com/diced/zipline/v4/docker-compose.yml';

  const res = await fetch(url);
  const dockerComposeYml = await res.text();

  return new Response(dockerComposeYml, {
    status: 200,
    headers: {
      'content-type': 'text/plain',
    },
  });
}
