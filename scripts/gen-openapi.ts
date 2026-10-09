import { openapi } from '@/lib/openapi';
import AdmZip from 'adm-zip';
import { mkdir, readdir, rm, unlink, writeFile } from 'fs/promises';
import { generateFiles } from 'fumadocs-openapi';
import { createHash } from 'node:crypto';
import { loadEnvFile } from 'process';
import { generateErrorCodeDocs } from './gen-error-codes';

try {
  loadEnvFile('.env');
} catch {}

function exit(message: string): never {
  console.error(message);
  process.exit(1);
}

async function exitResponse(message: string, response: Response): Promise<never> {
  const details = await response.text();
  exit(`${message} (${response.status} ${response.statusText})${details ? `: ${details}` : ''}`);
}

function validateOpenApiReferences(document: unknown): number {
  const missing = new Map<string, string>();
  let references = 0;

  function resolve(reference: string): unknown {
    if (reference === '#') return document;
    const parts = decodeURIComponent(reference.slice(1)).slice(1).split('/');
    let value = document;
    for (const part of parts) {
      const key = part.replaceAll('~1', '/').replaceAll('~0', '~');
      if (value === null || typeof value !== 'object' || !Object.hasOwn(value, key)) return;
      value = (value as Record<string, unknown>)[key];
    }
    return value;
  }

  function visit(value: unknown, location: string) {
    if (value === null || typeof value !== 'object') return;
    const node = value as Record<string, unknown>;
    if (typeof node.$ref === 'string' && (node.$ref === '#' || node.$ref.startsWith('#/'))) {
      references++;
      if (resolve(node.$ref) === undefined) missing.set(node.$ref, location);
    }
    for (const [key, child] of Object.entries(node)) {
      visit(child, `${location}/${key.replaceAll('~', '~0').replaceAll('/', '~1')}`);
    }
  }

  visit(document, '#');
  if (missing.size > 0) {
    throw new Error(
      `Downloaded OpenAPI document has unresolved references:\n${[...missing]
        .map(([reference, location]) => `  ${reference} (at ${location})`)
        .join('\n')}\nCheck the upstream workflow run and artifact logged above.`,
    );
  }
  return references;
}

const githubHeaders = {
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  ...(process.env.GITHUB_TOKEN
    ? {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      }
    : {}),
};

(async () => {
  const WORKFLOW = 'openapi.yml';
  const REPO = 'diced/zipline';

  const runsResponse = await fetch(
    `https://api.github.com/repos/${REPO}/actions/workflows/${WORKFLOW}/runs?branch=trunk&event=push&status=success&per_page=1`,
    {
      headers: githubHeaders,
    },
  );
  if (!runsResponse.ok) await exitResponse('failed to fetch workflow runs', runsResponse);

  const runsData = await runsResponse.json();
  const latestRun = runsData.workflow_runs[0];
  if (!latestRun) exit('no runs');
  if (latestRun.conclusion !== 'success') exit('selected OpenAPI workflow run was not successful');

  console.log(`OpenAPI workflow: ${latestRun.html_url} (commit ${latestRun.head_sha})`);
  const artifactsUrl = latestRun.artifacts_url;

  const artifactsResponse = await fetch(artifactsUrl, {
    headers: githubHeaders,
  });

  if (!artifactsResponse.ok) await exitResponse('failed to fetch workflow artifacts', artifactsResponse);

  const artifactsData = await artifactsResponse.json();
  const latestArtifact = artifactsData.artifacts.find(
    (artifact: { expired: boolean; name: string }) => artifact.name === 'openapi-json' && !artifact.expired,
  );
  if (!latestArtifact) exit('no unexpired openapi-json artifact found');
  console.log(`OpenAPI artifact: ${latestArtifact.id} (created ${latestArtifact.created_at})`);

  const downloadUrl = latestArtifact.archive_download_url;
  const zipResponse = await fetch(downloadUrl, {
    headers: githubHeaders,
  });
  if (!zipResponse.ok) {
    const hint = process.env.GITHUB_TOKEN
      ? ''
      : ' Set GITHUB_TOKEN to a token with Actions read access to diced/zipline.';
    await exitResponse(`failed to download artifact.${hint}`, zipResponse);
  }

  const zipBuffer = await zipResponse.arrayBuffer();
  const zip = new AdmZip(Buffer.from(zipBuffer));
  const openApiEntry = zip.getEntry('openapi.json');
  if (!openApiEntry) exit('openapi.json not found in artifact');

  const schema = openApiEntry.getData();
  console.log(`OpenAPI schema SHA-256: ${createHash('sha256').update(schema).digest('hex')}`);
  const references = validateOpenApiReferences(JSON.parse(schema.toString('utf8')));
  console.log(`Validated ${references} internal OpenAPI references`);

  await mkdir('./public', { recursive: true });
  await writeFile('./public/openapi.json', schema);

  // replace generated pages so removed endpoints cannot survive a repeated build
  const generatedDir = './content/docs/api/(generated)';
  await rm(generatedDir, { recursive: true, force: true });

  console.log('openapi.json extracted... generating docs mdx...');

  await generateFiles({
    input: openapi,
    output: generatedDir,
    meta: {
      folderStyle: 'separator',
    },
  });

  // remove everything except the content/docs/api/(generated)/api directory
  const entries = await readdir(generatedDir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === 'api' && entry.isDirectory()) continue;
    const path = `${generatedDir}/${entry.name}`;
    if (entry.isDirectory()) {
      await rm(path, { recursive: true, force: true });
    } else {
      if (entry.name === 'meta.json') continue;
      await unlink(path);
    }
  }

  await generateErrorCodeDocs();

  console.log('docs mdx generated successfully!');
})();
