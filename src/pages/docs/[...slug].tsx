import { IconChevronLeft, IconChevronRight, IconHome } from '@tabler/icons-react';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { join } from 'path';
import { Prism } from 'prism-react-renderer';
import { Fragment } from 'react';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { docsComponents } from '../../components/DocsComponents';
import ScrollToTop from '../../components/ScrollToTop';
import Sidebar from '../../components/sidebar';

// @ts-ignore
(typeof global !== 'undefined' ? global : window).Prism = Prism;

require('prismjs/components/prism-bash');
require('prismjs/components/prism-nginx');

interface DocsProps {
  source: any;
  sidebar: any;
  title?: string;
  description?: string;
  prev: any;
  next: any;
  path: string;
  breadcrumbs: string[];
  lastUpdated: string;
}

export default function DocsPage({
  source,
  sidebar,
  title,
  description,
  prev,
  next,
  path,
  breadcrumbs,
  lastUpdated: last,
}: DocsProps) {
  const lastUpdated = new Date(last);

  return (
    <div className='max-w-[90rem] w-full mx-auto flex flex-1 items-stretch'>
      <NextSeo
        title={title ?? undefined}
        description={description ?? undefined}
        openGraph={{
          url: 'https://zipline.diced.vercel.app',
          title: `${title ? `${title} - ` : ''}Zipline`,
          description: description ?? undefined,
          images: [
            {
              url: '/img/og-banner.png',
            },
          ],
        }}
      />
      <Sidebar items={sidebar}>
        <article className='prose dark:prose-invert dark:text-white text-black max-w-4xl min-w-0 pt-6 px-8 md:px-20 w-full'>
          <div className='flex items-center cursor-default select-none mb-6'>
            <Link href='/docs/get-started' className='flex items-center'>
              <IconHome className='w-5 h-5 text-gray-500 dark:text-gray-400' />
            </Link>
            {breadcrumbs.map((breadcrumb, index) =>
              breadcrumbs.length - 1 !== index ? (
                <Fragment key={index}>
                  <span className='text-gray-300 dark:text-gray-600'>
                    <IconChevronRight />
                  </span>
                  <span className='text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-100 transition-colors'>
                    {breadcrumb}
                  </span>
                </Fragment>
              ) : (
                <Fragment key={index}>
                  <span className='text-gray-300 dark:text-gray-600'>
                    <IconChevronRight />
                  </span>
                  <span className='text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-100 transition-colors'>
                    {breadcrumb}
                  </span>
                </Fragment>
              ),
            )}
          </div>

          <MDXRemote components={docsComponents} {...source} />

          <div className='h-0.5 bg-gray-200 dark:bg-gray-800' />

          <div className='flex justify-between my-8 not-prose flex-grow space-x-8'>
            {prev ? (
              <Link
                href={prev.href}
                className='rounded-md border border-gray-200 dark:border-gray-800 px-4 py-2 w-1/2 text-left transition-all ease-in-out hover:dark:border-blue-700 hover:border-gray-300 hover:shadow-md'
              >
                <div className='flex flex-col'>
                  <div className='flex items-center justify-start'>
                    <IconChevronLeft className='w-5 h-5 mr-2' />
                    {prev.title}
                  </div>
                  <div className='text-xs text-gray-500 dark:text-gray-400 pl-7'>
                    {prev.description.length > 50
                      ? prev.description.substring(0, 50).trim() + '...'
                      : prev.description}
                  </div>
                </div>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                href={next.href}
                className='rounded-md border border-gray-200 dark:border-gray-800 px-4 py-2 w-1/2 text-right transition-all ease-in-out hover:dark:border-blue-700 hover:border-gray-300 hover:shadow-md'
              >
                <div className='flex flex-col'>
                  <div className='flex items-center justify-end'>
                    {next.title}
                    <IconChevronRight className='w-5 h-5 ml-2' />
                  </div>
                  <div className='text-xs pr-7 text-gray-500 dark:text-gray-400'>
                    {next.description.length > 50
                      ? next.description.substring(0, 50).trim() + '...'
                      : next.description}
                  </div>
                </div>
              </Link>
            ) : (
              <div />
            )}
          </div>

          <div className='h-0.5 bg-gray-200 dark:bg-gray-800' />

          <div className='not-prose flex justify-between my-8 cursor-default md:flex-row flex-col items-center space-y-10'>
            <div className='flex items-center text-sm dark:text-gray-400'>
              Last updated:{' '}
              <span className='hover:text-gray-400 dark:hover:text-gray-100 transition-colors ml-1'>
                {lastUpdated.toLocaleDateString()}
              </span>
            </div>

            <Link
              href={`https://github.com/diced/zipline-docs/tree/trunk/${path}`}
              className='flex items-center text-sm dark:text-gray-400 transition-colors dark:hover:text-blue-500 hover:text-blue-600'
            >
              Edit this page on GitHub
            </Link>
          </div>
        </article>
      </Sidebar>

      <ScrollToTop />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const sidebarUnparsed = await readFile(join(process.cwd(), 'sidebar.json'), 'utf8');
  const sidebar = JSON.parse(sidebarUnparsed);

  const paths: { params: { slug: string[] } }[] = [];

  const getPaths = (items: any[]) => {
    for (let i = 0; i !== items.length; ++i) {
      const item = items[i];

      if (item.href) {
        const slug = item.href.split('/').filter((i: string) => i !== '');
        slug.shift();

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
  };

  getPaths(sidebar);

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string[] };

  if (!slug || slug.length === 0) {
    return {
      redirect: {
        permanent: false,
        destination: '/docs',
      },
      props: {},
    };
  }

  const joined = slug.join('/');

  let path = join(process.cwd(), 'docs', joined + '.md');
  if (!existsSync(path)) {
    path = join(process.cwd(), 'docs', joined, joined.split('/').pop() + '.md');
  }

  if (!existsSync(path)) {
    return {
      notFound: true,
    };
  }

  const content = await readFile(path, 'utf8');

  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [rehypeSlug],
      remarkPlugins: [remarkGfm],
    },
    parseFrontmatter: true,
  });

  const sidebarf = JSON.parse(await readFile(join(process.cwd(), 'sidebarf.json'), 'utf8'));
  const sidebar = JSON.parse(await readFile(join(process.cwd(), 'sidebar.json'), 'utf8'));

  const index = sidebarf.findIndex((i: any) => i.href === '/docs/' + joined);

  if (index === -1) {
    return {
      notFound: true,
    };
  }

  const page = sidebarf[index];
  const prev = sidebarf[index - 1];
  const next = sidebarf[index + 1];

  const getBreadcrumbs = (sidebar: any[]) => {
    const breadcrumbs: string[] = [];

    for (let i = 0; i !== sidebar.length; ++i) {
      const item = sidebar[i];

      if (item.href === '/docs/' + joined) {
        breadcrumbs.push(item.title);
        break;
      }

      if (item.items) {
        const subbreadcrumbs = getBreadcrumbs(item.items);
        if (subbreadcrumbs.length !== 0) {
          breadcrumbs.push(item.title);
          breadcrumbs.push(...subbreadcrumbs);
          break;
        }
      }
    }

    if (breadcrumbs.length === 0) {
      return [];
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs(sidebar);

  return {
    props: {
      source: mdxSource,
      sidebar: sidebar,
      title: page?.title || null,
      description: page?.description || null,
      prev: prev || null,
      next: next || null,
      path: page.path,
      breadcrumbs,
      lastUpdated: page.lastUpdated,
    },
  };
};
