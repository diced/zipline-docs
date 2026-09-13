import { generateFiles } from 'fumadocs-openapi';
import { openapi } from '@/lib/openapi';
import { generateErrorCodeDocs } from './gen-error-codes';
import AdmZip, { IZipEntry } from 'adm-zip';
import { loadEnvFile } from 'process';
import { readdir, rm, unlink } from 'fs/promises';

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
  if (runsData.workflow_runs.length === 0) exit('no runs');

  const latestRun = runsData.workflow_runs[0];
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

  zip.extractEntryTo(openApiEntry as IZipEntry, '.', false, true, false, 'public/openapi.json');

  console.log('openapi.json extracted... generating docs mdx...');

  await generateFiles({
    input: openapi,
    output: './content/docs/api/(generated)',
    meta: {
      folderStyle: 'separator',
    },
  });

  // remove everything except the content/docs/api/(generated)/api directory
  const generatedDir = './content/docs/api/(generated)';
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
