import type { Metadata } from 'next';
import Link from 'fumadocs-core/link';
import {
  ChevronDown,
  ExternalLink,
  GitBranch,
  RefreshCcw,
} from 'lucide-react';
import { getZiplineReleases, type ZiplineRelease } from '@/lib/github';
import { cn } from '@/lib/cn';

export const metadata: Metadata = {
  title: 'Releases',
  description:
    'Browse the latest Zipline v4 releases with full changelogs from GitHub.',
  openGraph: {
    url: 'https://zipline.diced.sh/releases',
    title: 'Releases · Zipline',
    description:
      'Browse the latest Zipline v4 releases with full changelogs from GitHub.',
    images: [{ url: '/img/og-banner.png' }],
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export const revalidate = 3600;

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

function formatDate(value: string | null): string {
  if (!value) return 'Unknown date';
  const ts = Date.parse(value);
  if (Number.isNaN(ts)) return 'Unknown date';
  return dateFormatter.format(new Date(ts));
}

function ReleaseBadge({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant: 'latest' | 'prerelease';
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium',
        variant === 'latest' &&
          'border-green-500/40 bg-green-500/10 text-green-700 dark:text-green-300',
        variant === 'prerelease' &&
          'border-yellow-500/40 bg-yellow-500/10 text-yellow-700 dark:text-yellow-300',
      )}
    >
      {children}
    </span>
  );
}

function ReleaseCard({
  release,
  isLatest,
  defaultOpen,
}: {
  release: ZiplineRelease;
  isLatest: boolean;
  defaultOpen: boolean;
}) {
  const anchorId = release.tagName.replace(/[^\w.-]/g, '');

  return (
    <details
      id={anchorId}
      open={defaultOpen || undefined}
      className='group scroll-mt-24 overflow-hidden rounded-xl border border-fd-border bg-fd-card shadow-sm transition-colors open:border-fd-ring/60 hover:border-fd-ring/60'
    >
      <summary
        className={cn(
          'flex cursor-pointer list-none flex-col gap-3 p-6 transition-colors md:flex-row md:items-center md:justify-between md:gap-4 md:p-8',
          '[&::-webkit-details-marker]:hidden',
          'group-open:border-b group-open:border-fd-border',
          'hover:bg-fd-muted/40',
        )}
      >
        <div className='flex min-w-0 flex-1 flex-col gap-2'>
          <div className='flex flex-wrap items-center gap-2'>
            <span className='inline-flex items-center gap-2 font-mono text-2xl font-bold tracking-tight text-fd-foreground'>
              <GitBranch className='size-5 text-fd-muted-foreground' />
              {release.tagName}
            </span>
            {isLatest && <ReleaseBadge variant='latest'>Latest</ReleaseBadge>}
            {release.prerelease && (
              <ReleaseBadge variant='prerelease'>Pre-release</ReleaseBadge>
            )}
          </div>

          {release.name && release.name !== release.tagName && (
            <p className='text-base font-medium text-fd-muted-foreground'>
              {release.name}
            </p>
          )}

          <div className='flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-fd-muted-foreground'>
            <time dateTime={release.publishedAt ?? undefined}>
              {formatDate(release.publishedAt)}
            </time>
          </div>
        </div>

        <div className='flex shrink-0 items-center gap-2 self-end md:self-center'>
          <a
            href={release.htmlUrl}
            target='_blank'
            rel='noreferrer noopener'
            className='inline-flex items-center gap-1.5 rounded-md border border-fd-border bg-fd-secondary px-3 py-1.5 text-sm font-medium text-fd-secondary-foreground transition-colors hover:bg-fd-secondary/50 hover:text-fd-foreground'
          >
            View on GitHub
            <ExternalLink className='size-3.5' />
          </a>
          <span
            aria-hidden
            className='inline-flex size-9 items-center justify-center rounded-md text-fd-muted-foreground transition-transform group-open:rotate-180'
          >
            <ChevronDown className='size-5' />
          </span>
        </div>
      </summary>

      <div className='px-6 pb-6 pt-5 md:px-8 md:pb-8'>
        {release.bodyHtml ? (
          <div
            className='prose prose-sm max-w-none'
            dangerouslySetInnerHTML={{ __html: release.bodyHtml }}
          />
        ) : (
          <p className='text-sm italic text-fd-muted-foreground'>
            Unable to fetch release notes.
          </p>
        )}
      </div>
    </details>
  );
}

export default async function ReleasesPage() {
  const releases = await getZiplineReleases();
  const latestStableTag = releases.find((r) => !r.prerelease)?.tagName;

  return (
    <main className='mx-auto w-full max-w-(--fd-layout-width,1400px) px-6 py-16 md:px-8'>
      <section className='mx-auto max-w-4xl text-center'>
        <h1 className='text-5xl font-black sm:text-6xl'>
          <span className='bg-linear-to-r from-blue-600 via-blue-400 to-blue-600 bg-size-[200%_200%] bg-clip-text text-transparent'>
            Releases
          </span>
        </h1>
        <div className='mt-6 flex flex-wrap items-center justify-center gap-3'>
          <Link
            href='https://github.com/diced/zipline/releases'
            className='inline-flex items-center gap-1.5 rounded-md border border-fd-border bg-fd-secondary px-3 py-1.5 text-sm font-medium text-fd-secondary-foreground transition-colors hover:bg-fd-secondary/50 hover:text-fd-foreground'
          >
            All releases on GitHub
            <ExternalLink className='size-3.5' />
          </Link>
          <span className='inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs text-fd-muted-foreground'>
            <RefreshCcw className='size-3.5' />
            Updates hourly
          </span>
        </div>
      </section>

      {releases.length === 0 ? (
        <div className='mx-auto mt-16 max-w-2xl rounded-xl border border-fd-border bg-fd-card p-8 text-center'>
          <p className='text-lg font-semibold'>No releases available</p>
          <p className='mt-2 text-sm text-fd-muted-foreground'>
            Unable to fetch releases.. See them{' '}
            <a
              href='https://github.com/diced/zipline/releases'
              target='_blank'
              rel='noreferrer noopener'
              className='font-medium text-fd-primary hover:underline'
            >
              here
            </a>
            .
          </p>
        </div>
      ) : (
        <div className='mx-auto mt-16 flex max-w-4xl flex-col gap-4'>
          {releases.map((release) => {
            const isLatest = release.tagName === latestStableTag;
            return (
              <ReleaseCard
                key={release.tagName}
                release={release}
                isLatest={isLatest}
                defaultOpen={isLatest}
              />
            );
          })}
        </div>
      )}
    </main>
  );
}
