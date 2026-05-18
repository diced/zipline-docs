import { getMDXComponents } from '@/components/mdx';
import { Footer } from '@/layouts/docs/page/slots/footer';
import { TOC, TOCPopover, TOCProvider } from '@/layouts/docs/page/slots/toc';
import { gitConfig } from '@/lib/shared';
import { getPageImage, getPageMarkdownUrl, source } from '@/lib/source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  EditOnGitHub,
  MarkdownCopyButton,
  PageLastUpdate,
  ViewOptionsPopover,
} from 'fumadocs-ui/layouts/docs/page';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export default async function Page(props: PageProps<'/docs/[[...slug]]'>) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const markdownUrl = getPageMarkdownUrl(page).url;
  const githubEditUrl = `https://github.com/${gitConfig.user}/${gitConfig.repo}/edit/${gitConfig.branch}/content/docs/${page.path}`;
  const githubViewUrl = `https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/content/docs/${page.path}`;

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      slots={{
        footer: Footer,
        toc: {
          provider: TOCProvider,
          main: TOC,
          popover: TOCPopover,
        },
      }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className='mb-0'>
        {page.data.description}
      </DocsDescription>
      <div className='flex flex-row flex-wrap items-center justify-between gap-2 border-b pb-6'>
        <div className='flex flex-row flex-wrap items-center gap-2'>
          {!page.data._openapi && <EditOnGitHub href={githubEditUrl} />}
          <MarkdownCopyButton markdownUrl={markdownUrl} />
          <ViewOptionsPopover
            markdownUrl={markdownUrl}
            githubUrl={githubViewUrl}
          />
        </div>
        <div className='ms-auto'></div>
      </div>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
      {page.data.lastModified && (
        <PageLastUpdate date={page.data.lastModified} />
      )}
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(
  props: PageProps<'/docs/[[...slug]]'>,
): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: getPageImage(page).url,
    },
  };
}
