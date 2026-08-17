'use client';

import { useState } from 'react';
import { usePathname } from 'fumadocs-core/framework';
import Link from 'fumadocs-core/link';
import { useIsScrollTop } from 'fumadocs-ui/utils/use-is-scroll-top';
import { ChevronDown, SidebarIcon } from 'lucide-react';
import { cva } from 'class-variance-authority';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { buttonVariants } from '@/components/ui/button';
import { useLinkItems, type LinkItemType, LinkItem as SharedLinkItem } from '@/layouts/shared';
import { SearchTrigger, FullSearchTrigger } from '@/layouts/shared/slots/search-trigger';
import { ThemeSwitch } from '@/layouts/shared/slots/theme-switch';
import { useSidebar } from '@/components/docs-sidebar/base';
import { baseOptions } from '@/lib/layout.shared';
import { appName, docsRoute } from '@/lib/shared';
import { cn } from '@/lib/cn';

const navItemClass = cva('[&_svg]:size-4', {
  variants: {
    variant: {
      main: 'inline-flex items-center gap-1 p-2 text-sm text-fd-muted-foreground transition-colors hover:text-fd-accent-foreground data-[active=true]:text-fd-primary',
      icon: buttonVariants({ color: 'ghost', size: 'icon' }),
      button: buttonVariants({ color: 'secondary', className: 'gap-1.5' }),
    },
  },
  defaultVariants: { variant: 'main' },
});

function isSecondary(item: LinkItemType) {
  if ('secondary' in item && item.secondary != null) return item.secondary;
  return item.type === 'icon';
}

function DesktopNavLink({ item }: { item: LinkItemType }) {
  if (item.type === 'custom') return item.children;
  if (item.type === 'menu') return null;

  return (
    <SharedLinkItem
      item={item}
      className={cn(
        navItemClass({
          variant: item.type === 'icon' ? 'icon' : item.type === 'button' ? 'button' : 'main',
        }),
      )}
      aria-label={item.type === 'icon' ? item.label : undefined}
    >
      {item.type === 'icon' ? item.icon : item.text}
    </SharedLinkItem>
  );
}

function MobileNavLink({ item }: { item: LinkItemType }) {
  if (item.type === 'custom') return <div className='grid'>{item.children}</div>;
  if (item.type === 'menu') return null;

  return (
    <SharedLinkItem
      item={item}
      className={cn(
        {
          main: 'inline-flex w-full items-center gap-2 py-1.5 text-sm transition-colors hover:text-fd-accent-foreground data-[active=true]:font-medium data-[active=true]:text-fd-primary [&_svg]:size-4',
          icon: buttonVariants({ size: 'icon', color: 'ghost' }),
          button: buttonVariants({
            color: 'secondary',
            className: 'gap-1.5 [&_svg]:size-4',
          }),
        }[item.type ?? 'main'],
      )}
      aria-label={item.type === 'icon' ? item.label : undefined}
    >
      {item.icon}
      {item.type === 'icon' ? undefined : item.text}
    </SharedLinkItem>
  );
}

function DocsSidebarTrigger() {
  const { setOpen, mode } = useSidebar();

  if (mode !== 'drawer') return null;

  return (
    <button
      type='button'
      aria-label='Open Sidebar'
      onClick={() => setOpen((prev) => !prev)}
      className={cn(
        buttonVariants({
          color: 'ghost',
          size: 'icon-sm',
          className: 'p-2',
        }),
      )}
    >
      <SidebarIcon />
    </button>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const options = baseOptions();
  const { navItems, menuItems } = useLinkItems(options);
  const [menuOpen, setMenuOpen] = useState(false);

  const transparentMode = options.nav?.transparentMode;
  const isTop = useIsScrollTop({ enabled: transparentMode === 'top' }) ?? true;
  const isTransparent = transparentMode === 'top' ? isTop : transparentMode === 'always';

  const primaryItems = navItems.filter((item) => !isSecondary(item));
  const secondaryNavItems = navItems.filter(isSecondary);
  const secondaryMenuItems = menuItems.filter(isSecondary);

  const onDocs = pathname.startsWith(docsRoute);
  const titleHref = options.nav?.url ?? '/';

  return (
    <header
      id='nd-nav'
      className='sticky top-(--fd-banner-height,0px) z-30 shrink-0 border-b border-fd-border'
    >
      <Collapsible open={menuOpen} onOpenChange={setMenuOpen}>
        <div
          className={cn(
            'backdrop-blur-lg transition-colors',
            menuOpen && 'max-lg:shadow-lg max-lg:rounded-b-2xl',
            !isTransparent || menuOpen ? 'bg-fd-background/80' : undefined,
          )}
        >
          <div className='mx-auto flex h-14 w-full max-w-(--fd-layout-width,1400px) items-center gap-2 px-4'>
            <Link href={titleHref} className='inline-flex items-center gap-2.5 font-semibold'>
              {appName}
            </Link>

            <ul className='hidden items-center gap-2 sm:flex'>
              {primaryItems.map((item, i) => (
                <li key={i}>
                  <DesktopNavLink item={item} />
                </li>
              ))}
            </ul>

            <div className='hidden flex-1 items-center justify-end gap-1.5 lg:flex'>
              <FullSearchTrigger hideIfDisabled className='w-full max-w-[240px] rounded-full ps-2.5' />
              <ThemeSwitch />
              <ul className='flex items-center gap-2'>
                {secondaryNavItems.map((item, i) => (
                  <li key={i}>
                    <DesktopNavLink item={item} />
                  </li>
                ))}
              </ul>
            </div>

            <div className='ms-auto flex items-center gap-1 lg:hidden'>
              <SearchTrigger hideIfDisabled className='p-2' />
              {onDocs && <DocsSidebarTrigger />}
              <CollapsibleTrigger asChild>
                <button
                  type='button'
                  aria-label='Toggle menu'
                  className={buttonVariants({
                    size: 'icon',
                    color: 'ghost',
                    className: 'group [&_svg]:size-5.5',
                  })}
                >
                  <ChevronDown className='transition-transform duration-300 group-data-[state=open]:rotate-180' />
                </button>
              </CollapsibleTrigger>
            </div>
          </div>

          <CollapsibleContent className='border-t border-fd-border px-4 pb-4 pt-2 lg:hidden'>
            <div className='flex flex-col gap-2'>
              {primaryItems.map((item, i) => (
                <MobileNavLink key={i} item={item} />
              ))}
            </div>
            <div className='mt-3 flex items-center gap-2 border-t border-fd-border pt-3'>
              {secondaryMenuItems.map((item, i) => (
                <MobileNavLink key={i} item={item} />
              ))}
              <ThemeSwitch />
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
    </header>
  );
}
