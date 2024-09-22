import chokidar from 'chokidar';
import { generator } from './generator.mjs';

await generator('build');

chokidar.watch('docs', { ignoreInitial: true }).on('all', async () => {
  try {
    await generator('watch');
  } catch (e) {
    console.log('[watch] error: ' + e.message);
  }
});
