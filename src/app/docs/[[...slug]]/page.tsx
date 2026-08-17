import { APIPage } from '@/components/api-page';
import { getMDXComponents } from '@/components/mdx';
import {
  EditOnGithub,
  MarkdownCopyButton,
  PageLastUpdate,
  ViewOptionsPopover,
} from '@/components/page-actions';
import { Footer } from '@/layouts/docs/page/slots/footer';
import { TOC, TOCPopover, TOCProvider } from '@/layouts/docs/page/slots/toc';
import { gitConfig } from '@/lib/shared';
import { getPageImage, getPageMarkdownUrl, source } from '@/lib/source';
import { openapi } from '@/lib/openapi';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page';
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

  const isAPI = page.data._openapi;

  const tocFooter = (
    <div className='flex flex-col gap-2 border-t border-fd-border pt-3 mt-3'>
      {!isAPI && <EditOnGithub href={githubEditUrl} />}
      <MarkdownCopyButton markdownUrl={markdownUrl} />
      <ViewOptionsPopover
        markdownUrl={isAPI ? undefined : markdownUrl}
        githubUrl={isAPI ? undefined : githubViewUrl}
      />
      {page.data.lastModified && <PageLastUpdate date={page.data.lastModified} />}
    </div>
  );

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      tableOfContent={{ footer: tocFooter }}
      tableOfContentPopover={{ footer: tocFooter }}
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
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(source, page),
            APIPage: async (componentProps) => (
              <APIPage {...await openapi.preloadOpenAPIPage(page)} {...componentProps} />
            ),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: PageProps<'/docs/[[...slug]]'>): Promise<Metadata> {
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
