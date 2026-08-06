import { generateFiles } from 'fumadocs-openapi';
import { openapi } from '@/lib/openapi';
import AdmZip, { IZipEntry } from 'adm-zip';
import { loadEnvFile } from 'process';
import { readdir, rm, unlink } from 'fs/promises';

try {
  loadEnvFile('.env');
} catch {}

function exit(message: string) {
  console.error(message);
  process.exit(1);
}

(async () => {
  const WORKFLOW = 'openapi.yml';
  const REPO = 'diced/zipline';

  const runsResponse = await fetch(
    `https://api.github.com/repos/${REPO}/actions/workflows/${WORKFLOW}/runs?per_page=1`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    },
  );
  if (!runsResponse.ok) exit('failed to fetch');

  const runsData = await runsResponse.json();
  if (runsData.workflow_runs.length === 0) exit('no runs');

  const latestRun = runsData.workflow_runs[0];
  const artifactsUrl = latestRun.artifacts_url;

  const artifactsResponse = await fetch(artifactsUrl, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  });

  if (!artifactsResponse.ok) exit('failed to get artifacts');

  const artifactsData = await artifactsResponse.json();
  if (artifactsData.artifacts.length === 0) exit('no artifacts found');

  const latestArtifact = artifactsData.artifacts[0];
  const downloadUrl = latestArtifact.archive_download_url;
  const zipResponse = await fetch(downloadUrl, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  });
  if (!zipResponse.ok) exit('failed to download artifact');

  const zipBuffer = await zipResponse.arrayBuffer();
  const zip = new AdmZip(Buffer.from(zipBuffer));
  const openApiEntry = zip.getEntry('openapi.json');
  if (!openApiEntry) exit('openapi.json not found in artifact');

  zip.extractEntryTo(
    openApiEntry as IZipEntry,
    '.',
    false,
    true,
    false,
    'public/openapi.json',
  );

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

  console.log('docs mdx generated successfully!');
})();
