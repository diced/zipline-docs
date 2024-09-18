import chokidar from 'chokidar';
import { generator } from './generator.mjs';

await generator('build');

chokidar
  .watch('docs', { ignoreInitial: true })
  .on('all', generator.bind(this, 'watch'));
