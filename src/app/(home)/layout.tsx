import { HomeLayout } from '@/layouts/home';
import { baseOptions } from '@/lib/layout.shared';
import {
  FullSearchTrigger,
  SearchTrigger,
} from '@/layouts/shared/slots/search-trigger';

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <HomeLayout
      {...baseOptions()}
      slots={{
        searchTrigger: {
          sm: SearchTrigger,
          full: FullSearchTrigger,
        },
      }}
    >
      {children}
    </HomeLayout>
  );
}
