import { fetchDockerComposeYml } from '@/lib/docker-compose';

export const dynamic = 'force-static';
export const revalidate = false;

const dockerComposeYml = await fetchDockerComposeYml();

export function GET() {
  return new Response(dockerComposeYml, {
    status: 200,
    headers: {
      'content-type': 'application/yaml',
    },
  });
}
