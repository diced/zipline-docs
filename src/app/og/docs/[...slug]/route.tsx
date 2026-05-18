import { DocsOGImage } from '@/components/og/docs-image';
import { getPageImage, source } from '@/lib/source';
import { appName } from '@/lib/shared';
import { notFound } from 'next/navigation';
import { ImageResponse } from '@takumi-rs/image-response';

export const revalidate = false;

export async function GET(
  _req: Request,
  { params }: RouteContext<'/og/docs/[...slug]'>,
) {
  const { slug } = await params;
  const page = source.getPage(slug.slice(0, -1));
  if (!page) notFound();

  return new ImageResponse(
    <DocsOGImage
      title={page.data.title}
      description={page.data.description}
      site={appName}
      method={
        typeof page.data._openapi?.method === 'string'
          ? page.data._openapi.method
          : undefined
      }
    />,
    {
      width: 1200,
      height: 630,
      format: 'webp',
    },
  );
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    lang: page.locale,
    slug: getPageImage(page).segments,
  }));
}
