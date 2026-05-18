'use client';

import { useState } from 'react';
import { ChevronDown, SidebarIcon } from 'lucide-react';
import { cva } from 'class-variance-authority';
import { useDocsLayout } from 'fumadocs-ui/layouts/docs';
import { LinkItem, type LinkItemType } from '@/layouts/shared';
import { useIsScrollTop } from 'fumadocs-ui/utils/use-is-scroll-top';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/cn';

type NavLinkItem = ReturnType<typeof useDocsLayout>['navItems'][number];

const navItemClass = cva('[&_svg]:size-4', {
  variants: {
    variant: {
      main: 'inline-flex items-center gap-1 p-2 text-sm text-fd-muted-foreground transition-colors hover:text-fd-accent-foreground data-[active=true]:text-fd-primary',
      icon: buttonVariants({ color: 'ghost', size: 'icon' }),
    },
  },
  defaultVariants: { variant: 'main' },
});

function isSecondary(item: NavLinkItem) {
  if ('secondary' in item && item.secondary != null) return item.secondary;
  return item.type === 'icon';
}

function DesktopNavLink({
  item,
  className,
}: {
  item: NavLinkItem;
  className?: string;
}) {
  if (item.type === 'custom') return item.children;
  if (item.type === 'menu') return null;

  return (
    <LinkItem
      item={item}
      className={cn(
        navItemClass({ variant: item.type === 'icon' ? 'icon' : 'main' }),
        className,
      )}
      aria-label={item.type === 'icon' ? item.label : undefined}
    >
      {item.type === 'icon' ? item.icon : item.text}
    </LinkItem>
  );
}

function MobileNavLink({
  item,
  className,
}: {
  item: LinkItemType;
  className?: string;
}) {
  if (item.type === 'custom') {
    return <div className={cn('grid', className)}>{item.children}</div>;
  }

  if (item.type === 'menu') return null;

  return (
    <LinkItem
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
        className,
      )}
      aria-label={item.type === 'icon' ? item.label : undefined}
    >
      {item.icon}
      {item.type === 'icon' ? undefined : item.text}
    </LinkItem>
  );
}

export function SiteHeader() {
  const { navItems, menuItems, slots, props: { nav } } = useDocsLayout();
  const [menuOpen, setMenuOpen] = useState(false);
  const isTop = useIsScrollTop({ enabled: nav?.transparentMode === 'top' }) ?? true;
  const isTransparent =
    nav?.transparentMode === 'top' ? isTop : nav?.transparentMode === 'always';

  if (nav?.component) return nav.component;

  const secondaryItems = navItems.filter(isSecondary);
  const primaryItems = navItems.filter((item) => !isSecondary(item));
  const SidebarTrigger = slots.sidebar?.trigger;

  return (
    <header
      id="nd-nav"
      className="sticky top-0 z-40 shrink-0 border-b border-fd-border"
    >
      <Collapsible open={menuOpen} onOpenChange={setMenuOpen}>
        <div
          className={cn(
            'backdrop-blur-lg transition-colors',
            menuOpen && 'max-lg:shadow-lg max-lg:rounded-b-2xl',
            !isTransparent || menuOpen ? 'bg-fd-background/80' : undefined,
          )}
        >
          <div className="mx-auto flex h-14 w-full max-w-(--fd-layout-width) items-center gap-2 px-4">
            {slots.navTitle && (
              <slots.navTitle className="inline-flex items-center gap-2.5 font-semibold" />
            )}
            {nav?.children}

            <ul className="hidden items-center gap-2 sm:flex">
              {primaryItems.map((item, i) => (
                <li key={i}>
                  <DesktopNavLink item={item} />
                </li>
              ))}
            </ul>

            <div className="hidden flex-1 items-center justify-end gap-1.5 lg:flex">
              {slots.searchTrigger && (
                <slots.searchTrigger.full
                  hideIfDisabled
                  className="w-full max-w-[240px] rounded-full ps-2.5"
                />
              )}
              {slots.themeSwitch && <slots.themeSwitch />}
              <ul className="flex items-center gap-2">
                {secondaryItems.map((item, i) => (
                  <li key={i}>
                    <DesktopNavLink item={item} />
                  </li>
                ))}
              </ul>
            </div>

            <div className="ms-auto flex items-center gap-1 lg:hidden">
              {slots.searchTrigger && (
                <slots.searchTrigger.sm hideIfDisabled className="p-2" />
              )}
              {SidebarTrigger && (
                <SidebarTrigger
                  type="button"
                  className={buttonVariants({
                    color: 'ghost',
                    size: 'icon-sm',
                    className: 'p-2',
                  })}
                >
                  <SidebarIcon />
                </SidebarTrigger>
              )}
              <CollapsibleTrigger asChild>
                <button
                  type="button"
                  aria-label="Toggle menu"
                  className={buttonVariants({
                    size: 'icon',
                    color: 'ghost',
                    className: 'group [&_svg]:size-5.5',
                  })}
                >
                  <ChevronDown className="transition-transform duration-300 group-data-[state=open]:rotate-180" />
                </button>
              </CollapsibleTrigger>
            </div>
          </div>

          <CollapsibleContent className="border-t border-fd-border px-4 pb-4 pt-2 lg:hidden">
            <div className="flex flex-col gap-2">
              {primaryItems.map((item, i) => (
                <MobileNavLink key={i} item={item} />
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2 border-t border-fd-border pt-3">
              {menuItems.filter(isSecondary).map((item, i) => (
                <MobileNavLink key={i} item={item} />
              ))}
              {slots.themeSwitch && <slots.themeSwitch />}
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
    </header>
  );
}
