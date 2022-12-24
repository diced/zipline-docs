import { existsSync, readFileSync, statSync } from 'fs';
import { readdir, readFile } from 'fs/promises';
import matter from 'gray-matter';
import { join } from 'path';

export default async function genSidebar(dir) {
  const sidebar = [];

  const files = await readdir(dir);

  for (const file of files) {
    const filePath = join(dir, file);
    const stat = statSync(filePath);

    if (stat.isDirectory()) {
      const children = await genSidebar(filePath);

      if (existsSync(join(filePath, '_category_.json'))) {
        const category = JSON.parse(await readFile(join(filePath, '_category_.json')));
        sidebar.push({
          title: category.label,
          path: filePath,
          type: 'd',
          children,
          position: category.position,
        });
      } else {
        sidebar.push({ title: file, path: filePath, type: 'd', children });
      }
    } else {
      if (file === '_category_.json') continue;
      if (file === dir.split('/').pop() + '.md') continue;
      const fm = matter(await readFile(filePath, 'utf8'));
      const pos = fm.data['sidebar_position'];

      const firstHeader = getTitle(fm.content);
      const description = getDescription(fm.content);

      sidebar.push({
        title: firstHeader,
        path: filePath,
        type: 'f',
        description,
        position: pos ?? undefined,
      });
    }
  }

  return sidebar;
}

export function orderSidebar(sidebar) {
  sidebar.sort((a, b) => {
    if (a.position === undefined && b.position === undefined) return 0;
    if (a.position === undefined && b.position !== undefined) return 1;
    if (a.position !== undefined && b.position === undefined) return -1;
    return a.position - b.position;
  });

  for (const item of sidebar) {
    if (item.children) item.children = orderSidebar(item.children);
  }

  return sidebar;
}

export function convertSidebarToParsable(sidebar) {
  const newSidebar = [];

  for (const item of sidebar) {
    const href = '/' + item.path.replace(/\.md$/, '').replace(/^\/docs/, '');
    let res = {};

    res.title = item.title;
    res.path = './' + item.path;

    if (item.type === 'd') {
      res.items = convertSidebarToParsable(item.children);
    } else if (item.type === 'df') {
      res.href = href;
      res.items = convertSidebarToParsable(item.children);
      res.description = item.description;
    } else {
      res.href = href;
      res.description = item.description;
    }

    newSidebar.push(res);
  }

  return newSidebar;
}

export function checkIfDirectoryFile(sidebar) {
  for (const item of sidebar) {
    if (item.type === 'd') {
      const filename = item.path.split('/').pop() + '.md';
      const filepath = join(item.path, filename);

      if (existsSync(filepath)) {
        const fm = matter(readFileSync(filepath, 'utf8'));
        item.type = 'df';
        item.path = filepath.replace('/' + filename, '');
        item.children = checkIfDirectoryFile(item.children);
        item.title = getTitle(fm.content) ?? item.title;
        item.description = getDescription(fm.content) ?? undefined;
      } else {
        item.children = checkIfDirectoryFile(item.children);
      }
    }
  }

  return sidebar;
}

function getTitle(mdSource) {
  const match = mdSource.match(/^#\s+(.*)$/m);
  return match ? match[1] : null;
}

function getDescription(mdSource) {
  // Somewhat based on https://github.com/facebook/docusaurus/blob/main/packages/docusaurus-utils/src/markdownUtils.ts#L54
  const lines = mdSource.trimStart().split('\n');

  for (let i = 0; i !== lines.length; ++i) {
    const line = lines[i].trim();
    if (line === '') continue;
    if (line.startsWith('```')) continue;
    if (line.startsWith('import')) continue;

    const cleanedLine = line
      .replace(/<[^>]*>/g, '')
      .replace(/^#[^#]+#?/gm, '')
      .replace(/^#{1,6}\s*(?<text>[^#]*)\s*#{0,6}/gm, '$1')
      .replace(/(?<opening>[*_]{1,3})(?<text>.*?)\1/g, '$2')
      .replace(/~~(?<text>\S.*\S)~~/g, '$1')
      .replace(/!\[(?<alt>.*?)\][[(].*?[\])]/g, '$1')
      .replace(/\[\^.+?\](?:: .*$)?/g, '')
      .replace(/\[(?<alt>.*?)\][[(].*?[\])]/g, '$1')
      .replace(/`(?<text>.+?)`/g, '$1')
      .replace(/^\s{0,3}>\s?/g, '')
      .replace(/:::.*/, '')
      .replace(/\s?:(?:::|[^:\n])+:/g, '')
      .replace(/\{#*[\w-]+\}/, '')
      .trim();

    if (cleanedLine.length === 0) continue;

    return cleanedLine;
  }
}

export function flattenSidebar(parsable) {
  let newSidebar = [];

  for (const item of parsable) {
    if (item.items) {
      if (item.href) {
        const { items, ...rest } = item;
        newSidebar.push(rest);
      }
      newSidebar = newSidebar.concat(flattenSidebar(item.items));
    } else {
      newSidebar.push(item);
    }
  }

  return newSidebar;
}
