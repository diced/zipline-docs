import {
  IconChevronLeft,
  IconChevronRight,
  IconExternalLink,
  IconHome,
} from '@tabler/icons-react';
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
import rehypeMdxCodeProps from 'rehype-mdx-code-props';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import rehypeUnwrapImages from 'rehype-unwrap-images';
import { MDXComponents } from '../../components/mdx/MDXComponents';
import ScrollToTop from '../../components/mdx/ScrollToTop';
import Sidebar from '../../components/sidebar';
import {
  flattenSidebar,
  getBreadcrumbs,
  getPaths,
  readSidebar,
} from '../../lib/docs';
import rehypeImageSize from '../../lib/rehypeImageSize';
import dayjs from 'dayjs';

// @ts-ignore
(typeof global !== 'undefined' ? global : window).Prism = Prism;

require('prismjs/components/prism-bash');
require('prismjs/components/prism-nginx');
require('prismjs/components/prism-http');

const REPO_BASE_URL = 'https://github.com/diced/zipline-docs';
const REPO_BRANCH = 'v4';

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
}: {
  source: any;
  sidebar: any;
  title?: string;
  description?: string;
  prev: any;
  next: any;
  path: string;
  breadcrumbs: string[];
  lastUpdated: string;
}) {
  const lastUpdated = new Date(last);

  return (
    <div className='max-w-[90rem] w-full mx-auto flex flex-1 items-stretch'>
      <NextSeo
        title={title ?? 'Docs – Zipline'}
        titleTemplate='%s – Docs – Zipline'
        description={description ?? undefined}
        openGraph={{
          url: 'https://zipline.diced.sh',
          title: `${title ? `${title} – Docs – ` : ''}Zipline`,
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
          <div className='items-center cursor-default select-none mb-6 hidden md:flex'>
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

          <div>
            <MDXRemote components={MDXComponents} {...source} />
          </div>

          <hr className='not-prose border-[1.35px] rounded-md border-gray-200 dark:border-gray-800' />

          <div className='flex justify-between my-8 not-prose flex-grow gap-8'>
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
                    {prev.description.length > 70
                      ? prev.description.substring(0, 70).trim() + '...'
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
                    {next.description.length > 70
                      ? next.description.substring(0, 70).trim() + '...'
                      : next.description}
                  </div>
                </div>
              </Link>
            ) : (
              <div />
            )}
          </div>

          <hr className='not-prose border-[1.35px] rounded-md border-gray-200 dark:border-gray-800' />

          <div className='not-prose flex justify-between my-8 cursor-default md:flex-row flex-col items-center space-y-10 md:space-y-0'>
            <div className='flex items-center text-sm dark:text-gray-400'>
              Last updated:{' '}
              <span className='hover:text-gray-400 dark:hover:text-gray-100 transition-colors ml-1'>
                {dayjs(lastUpdated).format('MMM D, YYYY')}
              </span>
            </div>

            <Link
              href={`${REPO_BASE_URL}/edit/${REPO_BRANCH}${path.endsWith('.mdx') ? path.slice(1) : path.slice(1) + '/' + path.split('/').pop() + '.mdx'}`}
              className='flex items-center text-sm dark:text-gray-400 transition-colors dark:hover:text-blue-500 hover:text-blue-600'
              target='_blank'
              data-umami-event='edit_on_github'
              data-umami-event-page={path}
            >
              Edit this page on GitHub{' '}
              <IconExternalLink className='ml-1' size='1rem' />
            </Link>
          </div>
        </article>
      </Sidebar>

      <ScrollToTop />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const sidebar = flattenSidebar(await readSidebar());
  const paths: { params: { slug: string[] } }[] = getPaths(sidebar);

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = (async ({ params }) => {
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

  let path = join(process.cwd(), 'docs', joined + '.mdx');
  if (!existsSync(path)) {
    path = join(
      process.cwd(),
      'docs',
      joined,
      joined.split('/').pop() + '.mdx',
    );
  }

  if (!existsSync(path)) {
    return {
      notFound: true,
    };
  }

  const content = await readFile(path, 'utf8');

  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [
        rehypeSlug,
        rehypeMdxCodeProps,
        rehypeUnwrapImages,
        [rehypeImageSize, { root: join(process.cwd(), 'public') }],
      ],
      remarkPlugins: [remarkGfm],
      development: process.env.NODE_ENV === 'development',
    },
    parseFrontmatter: true,
  });

  const sidebar = await readSidebar();
  const sidebarf = flattenSidebar(sidebar);

  const index = sidebarf.findIndex((i: any) => i.href === '/docs/' + joined);

  if (index === -1)
    return {
      notFound: true,
    };

  const page = sidebarf[index];
  const prev = sidebarf[index - 1];
  const next = sidebarf[index + 1];

  const breadcrumbs = getBreadcrumbs(sidebar, joined);

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
}) satisfies GetStaticProps;
