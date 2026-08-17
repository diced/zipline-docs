export const DOCKER_COMPOSE_URL = 'https://raw.githubusercontent.com/diced/zipline/v4/docker-compose.yml';

export async function fetchDockerComposeYml(): Promise<string> {
  const res = await fetch(DOCKER_COMPOSE_URL, {
    cache: 'force-cache',
    next: { revalidate: false },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch docker-compose.yml (${res.status} ${res.statusText})`);
  }

  return res.text();
}
