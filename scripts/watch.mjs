import chokidar from 'chokidar';
import { generator } from './generator.mjs';

await generator('build');

chokidar
  .watch('docs', { ignoreInitial: true, ignored: (p) => p.includes('.mdx') })
  .on('all', async () => {
    try {
      await generator('watch');
    } catch (e) {
      console.log('[watch] error: ' + e.message);
    }
  });
