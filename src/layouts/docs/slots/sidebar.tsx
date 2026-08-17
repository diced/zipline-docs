'use client';
import * as Base from '@/components/docs-sidebar/base';
import { createLinkItemRenderer } from '@/components/docs-sidebar/link-item';
import { createPageTreeRenderer, type SidebarPageTreeComponents } from '@/components/docs-sidebar/page-tree';
import { buttonVariants } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { isLayoutTabActive, type LayoutTab } from '@/layouts/shared';
import { cn } from '@/lib/cn';
import { mergeRefs } from '@/lib/merge-refs';
import { cva } from 'class-variance-authority';
import { usePathname } from 'fumadocs-core/framework';
import Link from 'fumadocs-core/link';
import { useDocsLayout } from 'fumadocs-ui/layouts/docs';
import { Check, ChevronsUpDown, SidebarIcon } from 'lucide-react';
import { useMemo, useState, type ComponentProps, type ReactNode } from 'react';

const itemVariants = cva(
  'relative flex flex-row items-center gap-2 rounded-lg p-2 text-start text-fd-muted-foreground wrap-anywhere [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        link: 'transition-colors hover:bg-fd-accent/50 hover:text-fd-accent-foreground/80 hover:transition-none data-[active=true]:bg-fd-primary/10 data-[active=true]:text-fd-primary data-[active=true]:hover:transition-colors',
        button:
          'transition-colors hover:bg-fd-accent/50 hover:text-fd-accent-foreground/80 hover:transition-none',
      },
      highlight: {
        true: "data-[active=true]:before:content-[''] data-[active=true]:before:bg-fd-primary data-[active=true]:before:absolute data-[active=true]:before:w-px data-[active=true]:before:inset-y-2.5 data-[active=true]:before:inset-s-2.5",
      },
    },
  },
);

export interface SidebarProps extends ComponentProps<'aside'> {
  components?: Partial<SidebarPageTreeComponents>;
  banner?: ReactNode;
}

export type SidebarProviderProps = Base.SidebarProviderProps;

export const { useSidebar } = Base;

export function SidebarProvider(props: SidebarProviderProps) {
  return <Base.SidebarProvider {...props} />;
}

export function Sidebar({ banner, components, ...rest }: SidebarProps) {
  const {
    menuItems,
    props: { tabs, tabMode },
  } = useDocsLayout();
  const viewport = (
    <Base.SidebarViewport>
      {menuItems
        .filter((v) => v.type !== 'icon')
        .map((item, i, list) => (
          <SidebarLinkItem key={i} item={item} className={cn(i === list.length - 1 && 'mb-4')} />
        ))}
      <SidebarPageTree {...components} />
    </Base.SidebarViewport>
  );

  return (
    <>
      <SidebarContent {...rest}>
        {((tabs.length > 0 && tabMode === 'auto') || banner) && (
          <div className='flex flex-col gap-3 p-4 pb-2'>
            {tabs.length > 0 && tabMode === 'auto' && <SidebarTabsDropdown tabs={tabs} />}
            {banner}
          </div>
        )}
        {viewport}
      </SidebarContent>
      <SidebarDrawer>
        <div className='flex flex-col gap-3 p-4 pb-2'>
          <div className='flex justify-end'>
            <SidebarTrigger
              className={cn(
                buttonVariants({
                  color: 'ghost',
                  size: 'icon-sm',
                  className: 'p-2',
                }),
              )}
            >
              <SidebarIcon />
            </SidebarTrigger>
          </div>
          {tabs.length > 0 && <SidebarTabsDropdown tabs={tabs} />}
          {banner}
        </div>
        {viewport}
      </SidebarDrawer>
    </>
  );
}

function SidebarFolder(props: ComponentProps<typeof Base.SidebarFolder>) {
  return <Base.SidebarFolder {...props} />;
}

export function SidebarTrigger(props: ComponentProps<'button'>) {
  return <Base.SidebarTrigger {...props} />;
}

function SidebarContent({ ref: refProp, className, children, ...props }: ComponentProps<'aside'>) {
  const hover = Base.useSidebarHover();
  if (!hover) return null;

  const { registerAside, hovered, onPointerEnter, onPointerLeave } = hover;

  return (
    <div
      data-sidebar-placeholder=''
      className='docs-sidebar-placeholder sticky z-20 [grid-area:sidebar] pointer-events-none *:pointer-events-auto md:layout:[--fd-sidebar-width:268px] max-md:hidden'
    >
      <aside
        id='nd-sidebar'
        ref={mergeRefs(refProp, registerAside)}
        className={cn(
          'absolute flex h-full min-h-0 w-full flex-col items-end overflow-hidden border-e border-transparent bg-transparent text-sm *:w-(--fd-sidebar-width) inset-s-0 inset-y-0',
          className,
        )}
        data-hovered={hovered ? 'true' : undefined}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        {...props}
      >
        {children}
      </aside>
    </div>
  );
}

function SidebarDrawer({ children, className, ...props }: ComponentProps<typeof Base.SidebarDrawerContent>) {
  return (
    <>
      <Base.SidebarDrawerOverlay className='fixed z-40 inset-0 backdrop-blur-xs data-[state=open]:animate-fd-fade-in data-[state=closed]:animate-fd-fade-out' />
      <Base.SidebarDrawerContent
        className={cn(
          'fixed text-[0.9375rem] flex min-h-0 flex-col overflow-hidden shadow-lg border-s inset-e-0 inset-y-0 w-[85%] max-w-[380px] z-40 bg-fd-background data-[state=open]:animate-fd-sidebar-in data-[state=closed]:animate-fd-sidebar-out',
          className,
        )}
        {...props}
      >
        {children}
      </Base.SidebarDrawerContent>
    </>
  );
}

function SidebarSeparator({ className, style, children, ...props }: ComponentProps<'p'>) {
  const depth = Base.useFolderDepth();

  return (
    <Base.SidebarSeparator
      className={cn(
        'inline-flex items-center gap-2 mb-1 px-2 mt-6 empty:mb-0 [&_svg]:size-4 [&_svg]:shrink-0',
        depth === 0 && 'first:mt-0',
        className,
      )}
      style={{
        paddingInlineStart: getItemOffset(depth),
        ...style,
      }}
      {...props}
    >
      {children}
    </Base.SidebarSeparator>
  );
}

function SidebarItem({ className, style, children, ...props }: ComponentProps<typeof Base.SidebarItem>) {
  const depth = Base.useFolderDepth();

  return (
    <Base.SidebarItem
      className={cn(itemVariants({ variant: 'link', highlight: depth >= 1 }), className)}
      style={{
        paddingInlineStart: getItemOffset(depth),
        ...style,
      }}
      {...props}
    >
      {children}
    </Base.SidebarItem>
  );
}

function SidebarFolderTrigger({
  className,
  style,
  ...props
}: ComponentProps<typeof Base.SidebarFolderTrigger>) {
  const { depth, collapsible } = Base.useFolder()!;

  return (
    <Base.SidebarFolderTrigger
      className={cn(itemVariants({ variant: collapsible ? 'button' : null }), 'w-full', className)}
      style={{
        paddingInlineStart: getItemOffset(depth - 1),
        ...style,
      }}
      {...props}
    >
      {props.children}
    </Base.SidebarFolderTrigger>
  );
}

function SidebarFolderLink({ className, style, ...props }: ComponentProps<typeof Base.SidebarFolderLink>) {
  const depth = Base.useFolderDepth();

  return (
    <Base.SidebarFolderLink
      className={cn(itemVariants({ variant: 'link', highlight: depth > 1 }), 'w-full', className)}
      style={{
        paddingInlineStart: getItemOffset(depth - 1),
        ...style,
      }}
      {...props}
    >
      {props.children}
    </Base.SidebarFolderLink>
  );
}

function SidebarFolderContent({
  className,
  children,
  ...props
}: ComponentProps<typeof Base.SidebarFolderContent>) {
  const depth = Base.useFolderDepth();

  return (
    <Base.SidebarFolderContent
      className={cn(
        'relative',
        depth === 1 &&
          "before:content-[''] before:absolute before:w-px before:inset-y-1 before:bg-fd-border before:inset-s-2.5",
        className,
      )}
      {...props}
    >
      <div className='flex flex-col gap-0.5 pt-0.5'>{children}</div>
    </Base.SidebarFolderContent>
  );
}

function SidebarTabsDropdown({
  tabs,
  placeholder,
  ...props
}: {
  placeholder?: ReactNode;
  tabs: LayoutTab[];
} & ComponentProps<'button'>) {
  const [open, setOpen] = useState(false);
  const { closeOnRedirectRef } = useSidebar();
  const pathname = usePathname();

  const selected = useMemo(() => {
    return tabs.findLast((item) => isLayoutTabActive(item, pathname));
  }, [tabs, pathname]);

  const onClick = () => {
    closeOnRedirectRef.current = false;
    setOpen(false);
  };

  const item = selected ? (
    <>
      <div className='size-9 shrink-0 empty:hidden md:size-5'>{selected.icon}</div>
      <div>
        <p className='text-sm font-medium'>{selected.title}</p>
        <p className='text-sm text-fd-muted-foreground empty:hidden md:hidden'>{selected.description}</p>
      </div>
    </>
  ) : (
    placeholder
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {item && (
        <PopoverTrigger
          {...props}
          className={cn(
            'flex items-center gap-2 rounded-lg p-2 border bg-fd-secondary/50 text-start text-fd-secondary-foreground transition-colors hover:bg-fd-accent data-[state=open]:bg-fd-accent data-[state=open]:text-fd-accent-foreground',
            props.className,
          )}
        >
          {item}
          <ChevronsUpDown className='shrink-0 ms-auto size-4 text-fd-muted-foreground' />
        </PopoverTrigger>
      )}
      <PopoverContent className='flex flex-col gap-1 w-(--radix-popover-trigger-width) p-1 fd-scroll-container'>
        {tabs.map((item) => {
          const isActive = selected && item.url === selected.url;
          if (!isActive && item.unlisted) return;

          return (
            <Link
              key={item.url}
              href={item.url}
              onClick={onClick}
              {...item.props}
              className={cn(
                'flex items-center gap-2 rounded-lg p-1.5 hover:bg-fd-accent hover:text-fd-accent-foreground',
                item.props?.className,
              )}
            >
              <div className='shrink-0 size-9 md:mb-auto md:size-5 empty:hidden'>{item.icon}</div>
              <div>
                <p className='text-sm font-medium leading-none'>{item.title}</p>
                <p className='text-[0.8125rem] text-fd-muted-foreground mt-1 empty:hidden'>
                  {item.description}
                </p>
              </div>

              <Check className={cn('shrink-0 ms-auto size-3.5 text-fd-primary', !isActive && 'invisible')} />
            </Link>
          );
        })}
      </PopoverContent>
    </Popover>
  );
}

function getItemOffset(depth: number) {
  return `calc(${2 + 3 * depth} * var(--spacing))`;
}

const SidebarPageTree = createPageTreeRenderer({
  SidebarFolder,
  SidebarFolderContent,
  SidebarFolderLink,
  SidebarFolderTrigger,
  SidebarItem,
  SidebarSeparator,
});

const SidebarLinkItem = createLinkItemRenderer({
  SidebarFolder,
  SidebarFolderContent,
  SidebarFolderLink,
  SidebarFolderTrigger,
  SidebarItem,
});
