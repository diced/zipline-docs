import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';

export default async function releases() {
  await mkdir('./docs/changelog', { recursive: true });

  const res = await fetch('https://api.github.com/repos/diced/zipline/releases');
  const data = await res.json();

  const releases = data.filter((release) => release.name.startsWith('3') || release.name.startsWith('v3'));
  for (let i = 0, x = 1; i !== releases.length; ++i) {
    const release = releases[i];

    const md = `---
title: ${release.name}
sidebar_position: ${x++}
---

# ${release.name}
${release.body}
`;
    await writeFile(join('./docs/changelog', `${release.name.replace(/\./g, '-')}.md`), md);
  }

  await writeFile(
    './docs/changelog/_category_.json',
    JSON.stringify({
      label: 'Changelog',
      position: 5,
    })
  );
}
