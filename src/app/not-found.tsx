import { NotFoundContent } from '@/components/not-found';
import { HomeLayout } from '@/layouts/home';
import { baseOptions } from '@/lib/layout.shared';
import { FullSearchTrigger, SearchTrigger } from '@/layouts/shared/slots/search-trigger';
import { SiteFooter } from '@/layouts/shared/slots/site-footer';

export default function NotFound() {
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
      <NotFoundContent className='min-h-[60vh]' />
      <SiteFooter />
    </HomeLayout>
  );
}
