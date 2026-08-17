import { SidebarTrigger, useSidebar } from '@/components/docs-sidebar/base';
import { DocsScrollToTop } from '@/layouts/docs/slots/scroll-to-top';
import { Sidebar } from '@/layouts/docs/slots/sidebar';
import { FullSearchTrigger, SearchTrigger } from '@/layouts/shared/slots/search-trigger';
import { baseOptions } from '@/lib/layout.shared';
import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { SidebarProvider as FumadocsSidebarProvider } from 'fumadocs-ui/layouts/docs/slots/sidebar';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  const options = baseOptions();

  return (
    <>
      <DocsLayout
        {...options}
        tree={source.getPageTree()}
        nav={{ ...options.nav, enabled: false }}
        containerProps={{
          style: {
            '--fd-docs-row-1': 'calc(var(--fd-banner-height, 0px) + var(--fd-site-nav-height, 0px))',
          } as any,
        }}
        slots={{
          sidebar: {
            provider: FumadocsSidebarProvider,
            root: Sidebar,
            trigger: SidebarTrigger,
            // oxlint-disable-next-line react/react-compiler -- Fumadocs expects the hook itself in its slot API.
            useSidebar,
          },
          searchTrigger: {
            sm: SearchTrigger,
            full: FullSearchTrigger,
          },
        }}
      >
        {children}
      </DocsLayout>
      <DocsScrollToTop />
    </>
  );
}
