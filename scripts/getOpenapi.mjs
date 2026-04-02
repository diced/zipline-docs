import AdmZip from 'adm-zip';
import { loadEnvFile } from 'process';

try {
  loadEnvFile('.env');
} catch {}

function exit(message) {
  console.error(message);
  process.exit(1);
}

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

zip.extractEntryTo(openApiEntry, 'public', false, true, false, 'openapi.json');

console.log('openapi.json extracted to public/openapi.json');
