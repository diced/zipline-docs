import chokidar from 'chokidar';
import { generator } from './generator.mjs';
import { existsSync } from 'fs';
import { spawnSync } from 'child_process';

const context = 'watch';

if (process.env['GO_WATCHER_BIN']) {
  goWatcher();
} else {
  nodeWatcher();
}

async function goWatcher() {
  const goWatcherBin = process.env['GO_WATCHER_BIN'];
  if (!goWatcherBin) {
    console.warn(
      'GO_WATCHER_BIN environment variable is not set. Using node watcher instead.',
    );
    return nodeWatcher();
  }

  if (!existsSync(goWatcherBin)) {
    console.warn(
      `GO_WATCHER_BIN environment variable is set to ${goWatcherBin}, but the file does not exist. Using node watcher instead.`,
    );
    return nodeWatcher();
  }

  const extraArgs = process.env['GO_WATCHER_EXTRA_ARGS']
    ? process.env['GO_WATCHER_EXTRA_ARGS'].split(' ')
    : [];

  spawnSync(
    goWatcherBin,
    ['watch', '-ctx=' + context, '-out=./sidebar.json', ...extraArgs],
    {
      stdio: 'inherit',
      shell: true,
    },
  );
}

async function nodeWatcher() {
  await generator('build');

  chokidar.watch('docs', { ignoreInitial: true }).on('all', async () => {
    try {
      await generator(context);
    } catch (e) {
      console.log('[watch] error: ' + e.message);
    }
  });
}
