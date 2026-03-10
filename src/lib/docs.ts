export type DocSidebarItem = {
  title: string;
  path: string;
  href?: string;
  lastUpdated: string;
  description: string;
  items?: DocSidebarItem[];
};

export function flattenSidebar(
  sidebar: DocSidebarItem[],
): Exclude<DocSidebarItem, 'items'>[] {
  let newSidebar: Exclude<DocSidebarItem, 'items'>[] = [];

  for (const item of sidebar) {
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

export function getBreadcrumbs(
  sidebar: DocSidebarItem[],
  url: string,
): string[] {
  const breadcrumbs: string[] = [];

  for (let i = 0; i < sidebar.length; i++) {
    const item = sidebar[i];

    if (item.href === '/docs/' + url) {
      breadcrumbs.push(item.title);
      return breadcrumbs;
    }

    if (item.items) {
      const sub = getBreadcrumbs(item.items, url);
      if (sub.length > 0) {
        breadcrumbs.push(item.title, ...sub);
        return breadcrumbs;
      }
    }
  }

  return breadcrumbs;
}

export function getPaths(sidebar: DocSidebarItem[]) {
  const paths: { params: { slug: string[] } }[] = [];

  for (let i = 0; i !== sidebar.length; ++i) {
    const item = sidebar[i];

    if (item.href) {
      const slug = item.href.split('/').filter((i: string) => i !== '');
      slug.shift();

      if (item.href === '/docs/api-reference') continue;

      paths.push({
        params: {
          slug,
        },
      });
    }

    if (item.items) {
      getPaths(item.items);
    }
  }

  return paths;
}

export async function readSidebar() {
  const { readFile } = await import('fs/promises');
  const { join } = await import('path');

  const sidebar: DocSidebarItem[] = JSON.parse(
    await readFile(join(process.cwd(), 'sidebar.json'), 'utf8'),
  );

  return sidebar;
}
