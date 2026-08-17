import Link from 'fumadocs-core/link';
import { appName } from '@/lib/shared';
import { footerColumns, type FooterLink } from '@/lib/footer-links';
import { cn } from '@/lib/cn';

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox='0 0 24 24' aria-hidden className={cn('size-6 fill-current', className)}>
      <path d='M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z' />
    </svg>
  );
}

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg viewBox='0 0 24 24' aria-hidden className={cn('size-6 fill-current', className)}>
      <path d='M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z' />
    </svg>
  );
}

function FooterNavLink({ item }: { item: FooterLink }) {
  const className =
    'rounded-md py-1 text-sm text-fd-muted-foreground transition-colors hover:text-fd-primary';

  if (item.external) {
    return (
      <a
        href={item.href}
        target='_blank'
        rel='noreferrer noopener'
        className={className}
        data-umami-event={item.event}
      >
        {item.title}
      </a>
    );
  }

  return (
    <Link href={item.href} className={className} data-umami-event={item.event}>
      {item.title}
    </Link>
  );
}

export function Footer({
  className,
  variant = 'default',
}: {
  className?: string;
  variant?: 'default' | 'docs';
}) {
  const year = new Date().getFullYear();
  const isDocs = variant === 'docs';

  return (
    <footer
      className={cn(
        'border-t border-fd-border bg-fd-background',
        variant === 'default' && 'mt-auto',
        isDocs &&
          'site-footer-docs mt-16 w-[calc(100%+2rem)] max-w-none not-prose -mx-4 md:-mx-6 md:w-[calc(100%+3rem)] xl:-mx-8 xl:w-[calc(100%+4rem)]',
        className,
      )}
    >
      <div
        className={cn(
          'w-full py-16 md:py-20',
          isDocs ? 'px-4 md:px-6 xl:px-8' : 'mx-auto max-w-(--fd-layout-width,1400px) px-6 sm:px-8',
        )}
      >
        <div className='flex flex-col items-center justify-between gap-12 xl:flex-row xl:items-start'>
          <div className='flex flex-col items-center xl:items-start'>
            <div className='flex items-center gap-4'>
              <p className='text-3xl font-bold tracking-tight sm:text-4xl'>{appName}</p>
              <div className='flex items-center gap-3'>
                <Link
                  href='/github'
                  aria-label='GitHub'
                  className='text-fd-foreground transition-colors hover:text-fd-muted-foreground'
                  data-umami-event='footer_link_github'
                >
                  <GithubIcon />
                </Link>
                <Link
                  href='/discord'
                  aria-label='Discord'
                  className='text-[#5865F2] transition-colors hover:text-[#4750b5]'
                  data-umami-event='footer_link_discord'
                >
                  <DiscordIcon />
                </Link>
              </div>
            </div>

            <p className='mt-4 text-center text-sm text-fd-muted-foreground xl:text-start'>
              © {year}{' '}
              <a
                href='https://github.com/diced/'
                className='hover:text-fd-foreground hover:underline'
                data-umami-event='footer_link_github_com_diced'
              >
                diced
              </a>
              .{' '}
              <a
                href='https://github.com/diced/zipline/tree/trunk/LICENSE'
                className='hover:text-fd-foreground hover:underline'
                data-umami-event='footer_link_license'
              >
                All rights reserved.
              </a>
            </p>
          </div>

          <div
            className={cn(
              'grid w-full grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4',
              !isDocs && 'max-w-3xl xl:max-w-none',
              isDocs && 'xl:gap-x-16',
            )}
          >
            {footerColumns.map((column) => (
              <div key={column.title}>
                <p className='text-base font-medium text-fd-foreground'>{column.title}</p>
                <nav className='mt-3 flex flex-col gap-1'>
                  {column.items.map((item) => (
                    <FooterNavLink key={item.href} item={item} />
                  ))}
                </nav>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
