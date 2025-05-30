import { writeFile } from 'fs/promises';
import genSidebar, {
  checkIfDirectoryFile,
  convertSidebarToParsable,
  orderSidebar,
} from './sidebar.mjs';
import { spawnSync } from 'child_process';
import { existsSync } from 'fs';

export async function generator(context = 'watch') {
  if (process.env['GO_SIDEBAR_BIN']) {
    return goGenerator(context);
  }

  return nodeGenerator(context);
}

async function nodeGenerator(context) {
  const time = process.hrtime();
  const sidebar = await genSidebar('./docs');

  await writeFile(
    './sidebar.json',
    JSON.stringify(
      convertSidebarToParsable(checkIfDirectoryFile(orderSidebar(sidebar))),
      null,
      2,
    ),
  );

  const diff = process.hrtime(time);

  console.log(
    `[${context}] generated sidebar json in ${Math.floor(diff[1] / 1e6)}ms`,
  );
}

/*
  work in progress sidebar.json generator built in golang
  it is like 10x faster than the node version! so its great to use in dev
  idk how to make it work in vercel so vercel will still use the node version which is fine

  - uses parallelism to cache git last modified dates in memory (takes less than 100ms) (this is the slowest part of both versions,
    but this process takes way longer in node since its sequential)
  - generates a sidebar.json in less than 3ms
*/
async function goGenerator(context) {
  const goSidebarBin = process.env['GO_SIDEBAR_BIN'];
  if (!goSidebarBin) {
    console.warn(
      'GO_SIDEBAR_BIN environment variable is not set. Using node generator instead.',
    );
    return nodeGenerator(context);
  }

  if (!existsSync(goSidebarBin)) {
    console.warn(
      `GO_SIDEBAR_BIN environment variable is set to ${goSidebarBin}, but the file does not exist. Using node generator instead.`,
    );
    return nodeGenerator(context);
  }

  const result = spawnSync(
    goSidebarBin,
    ['-ctx=' + context, '-out=./sidebar.json'],
    {
      stdio: 'inherit',
    },
  );

  if (result.error) {
    console.error('Failed to run Go binary:', result.error);
    return nodeGenerator(context);
  }
}
