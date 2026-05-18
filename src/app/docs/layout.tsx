import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { SidebarTrigger, useSidebar } from '@/components/docs-sidebar/base';
import { DocsContainerWithNav } from '@/layouts/docs/slots/docs-container';
import { Sidebar, SidebarProvider } from '@/layouts/docs/slots/sidebar';
import {
  FullSearchTrigger,
  SearchTrigger,
} from '@/layouts/shared/slots/search-trigger';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  const options = baseOptions();

  return (
    <DocsLayout
      {...options}
      tree={source.getPageTree()}
      nav={{ ...options.nav, enabled: false }}
      slots={{
        container: DocsContainerWithNav,
        sidebar: {
          provider: SidebarProvider,
          root: Sidebar,
          trigger: SidebarTrigger,
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
  );
}
