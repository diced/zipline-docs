import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { NextSeo } from 'next-seo';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { join } from 'path';
import Highlight, { Prism } from 'prism-react-renderer';
import { Fragment, useEffect, useState } from 'react';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { ChevronLeft, ChevronRight, Home, X } from 'tabler-icons-react';
import Alert from '../../components/Alert';
import APIBadge from '../../components/APIBadge';
import ExternalLinksBuilder from '../../components/ExternalLinksBuilder';
import Playground from '../../components/Playground';
import ScrollToTop from '../../components/ScrollToTop';
import Sidebar from '../../components/sidebar';
import SlugLink from '../../components/SlugLink';
import Tabs from '../../components/tabs';
import TabItem from '../../components/tabs/TabItem';

import ayuDark from '../../lib/themes/ayuDark';
import ayuLight from '../../lib/themes/ayuLight';

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

const components = {
  a: ({ href, ...props }: any) => {
    return <Link href={href} {...props} />;
  },
  img: (props: any) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
      if (open) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    }, [open]);

    return (
      <>
        <div
          className='relative cursor-pointer'
          onClick={() => {
            setOpen(true);
          }}
        >
          <img loading='lazy' className='block object-contain rounded-md max-w-full h-auto' {...props} />
          <div className='absolute rounded-md inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all' />
        </div>

        {/* when open */}
        <div
          className={`fixed inset-0 z-50 transition-all flex items-center h-screen justify-center bg-black bg-opacity-70 ${
            open ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => {
            setOpen(false);
          }}
        >
          <div className='relative'>
            <img loading='lazy' className='block object-contain rounded-md max-w-full h-auto' {...props} />
            <div
              className='absolute top-0 right-0 z-50 p-2 -m-6 cursor-pointer'
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
              }}
            >
              <X size={24} />
            </div>
          </div>
        </div>
      </>
    );
  },
  APIBadge: (props: any) => {
    return <APIBadge {...props} />;
  },
  Playground: (props: any) => {
    return <Playground {...props} />;
  },
  ExternalLinksBuilder: (props: any) => {
    return <ExternalLinksBuilder {...props} />;
  },
  pre: (props: any) => {
    const { theme } = useTheme();
    const className = props.children.props.className;
    const match = /language-(\w+)/.exec(className || '');
    return (
      <Highlight
        Prism={Prism}
        code={props.children.props.children.slice(0, -1)}
        // @ts-ignore
        language={match ? match[1] : 'text'}
        theme={theme === 'light' ? ayuLight : ayuDark}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={`${className} shadow-md`} style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    );
  },
  TabItem: (props: any) => {
    return <TabItem {...props} />;
  },
  Tabs: (props: any) => {
    return <Tabs {...props} />;
  },
  Alert: (props: any) => {
    return <Alert {...props} />;
  },

  h1: ({ id, children }: any) => {
    return (
      <h1 id={id} className='flex items-center group'>
        {children}
        <SlugLink id={id} />
      </h1>
    );
  },
  h2: ({ id, children }: any) => {
    return (
      <h2 id={id} className='flex items-center group'>
        {children}
        <SlugLink id={id} />
      </h2>
    );
  },
  h3: ({ id, children }: any) => {
    return (
      <h3 id={id} className='flex items-center group'>
        {children}
        <SlugLink id={id} />
      </h3>
    );
  },
};

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
          url: 'https://zipline.diced.tech',
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
              <Home className='w-5 h-5 text-gray-500 dark:text-gray-400' />
            </Link>
            {breadcrumbs.map((breadcrumb, index) =>
              breadcrumbs.length - 1 !== index ? (
                <Fragment key={index}>
                  <span className='text-gray-300 dark:text-gray-600'>
                    <ChevronRight />
                  </span>
                  <span className='text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-100 transition-colors'>
                    {breadcrumb}
                  </span>
                </Fragment>
              ) : (
                <Fragment key={index}>
                  <span className='text-gray-300 dark:text-gray-600'>
                    <ChevronRight />
                  </span>
                  <span className='text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-100 transition-colors'>
                    {breadcrumb}
                  </span>
                </Fragment>
              )
            )}
          </div>

          <MDXRemote components={components} {...source} />

          <div className='h-0.5 bg-gray-200 dark:bg-gray-800' />

          <div className='flex justify-between my-8 not-prose'>
            {prev ? (
              <Link
                href={prev.href}
                className='flex items-center text-sm dark:text-gray-400 transition-colors dark:hover:text-blue-500'
              >
                <ChevronLeft className='w-5 h-5 mr-2' />
                {prev.title}
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                href={next.href}
                className='flex items-center text-sm dark:text-gray-400 transition-colors dark:hover:text-blue-500'
              >
                {next.title}
                <ChevronRight className='w-5 h-5 ml-2' />
              </Link>
            ) : (
              <div />
            )}
          </div>

          <div className='h-0.5 bg-gray-200 dark:bg-gray-800' />

          <div className='not-prose flex justify-between my-8 cursor-default'>
            <div className='flex items-center text-sm dark:text-gray-400'>
              Last updated:{' '}
              <span className='hover:text-gray-800 dark:hover:text-gray-100 transition-colors ml-1'>
                {lastUpdated.toLocaleDateString()}
              </span>
            </div>

            <Link
              href={`https://github.com/diced/zipline-docs/tree/trunk/${path}`}
              className='flex items-center text-sm dark:text-gray-400 transition-colors dark:hover:text-blue-500'
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
