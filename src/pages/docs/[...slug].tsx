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
import nightOwl from 'prism-react-renderer/themes/nightOwl';
import nightOwlLight from 'prism-react-renderer/themes/nightOwlLight';
import { Fragment } from 'react';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, ArrowRight, Edit, Home } from 'tabler-icons-react';
import Alert from '../../components/Alert';
import APIBadge from '../../components/APIBadge';
import ExternalLinksBuilder from '../../components/ExternalLinksBuilder';
import Playground from '../../components/Playground';
import ScrollToTop from '../../components/ScrollToTop';
import Sidebar from '../../components/sidebar';
import SlugLink from '../../components/SlugLink';
import Tabs from '../../components/tabs';
import TabItem from '../../components/tabs/TabItem';

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
}

const components = {
  a: ({ href, ...props }: any) => {
    return <Link href={href} {...props} />;
  },
  img: (props: any) => {
    return <img loading='lazy' className='block object-contain max-w-full h-auto' {...props} />;
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
        theme={theme === 'light' ? nightOwlLight : nightOwl}
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
}: DocsProps) {
  return (
    <>
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
        <div className='flex items-center space-x-2'>
          <Link href='/docs/get-started' className='flex items-center'>
            <Home className='w-5 h-5 text-gray-500 dark:text-gray-400' />
          </Link>
          {breadcrumbs.map((breadcrumb, index) =>
            breadcrumbs.length - 1 !== index ? (
              <Fragment key={index}>
                <span className='text-gray-300 dark:text-gray-600'>/</span>
                <span className='text-gray-500 dark:text-gray-400'>{breadcrumb}</span>
              </Fragment>
            ) : (
              <Fragment key={index}>
                <span className='text-gray-300 dark:text-gray-600'>/</span>
                <span className='text-gray-500 dark:text-gray-400'>{breadcrumb}</span>
              </Fragment>
            )
          )}
        </div>

        <article className='my-6 prose dark:prose-invert max-w-none dark:text-white text-black'>
          <MDXRemote components={components} {...source} />
        </article>

        <div className='h-0.5 bg-gray-200 dark:bg-gray-800' />

        <div className='flex justify-between my-8'>
          {prev && (
            <Link
              href={prev.href}
              className='flex items-center space-x-2 transition-all ease-in-out p-2 hover:bg-blue-200/60 dark:hover:bg-blue-800/40 rounded-md'
            >
              <ArrowLeft className='w-5 h-5' />
              <span>{prev.title}</span>
            </Link>
          )}
          {next && (
            <Link
              href={next.href}
              className='flex items-center space-x-2 transition-all ease-in-out p-2 hover:bg-blue-200/60 dark:hover:bg-blue-800/40 rounded-md'
            >
              <span>{next.title}</span>
              <ArrowRight className='w-5 h-5' />
            </Link>
          )}
        </div>

        <div className='h-0.5 bg-gray-200 dark:bg-gray-800' />

        <div className='flex justify-center my-8'>
          <Link
            href={`https://github.com/diced/zipline-docs/tree/v3-latest/${path}`}
            className='underline hover:decoration-2 decoration-blue-400 flex items-center space-x-2'
          >
            <Edit className='w-5 h-5' />
            <span>Edit this page on GitHub</span>
          </Link>
        </div>
      </Sidebar>

      <ScrollToTop />
    </>
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
    },
  };
};
