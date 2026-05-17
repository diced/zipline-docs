import { RootProvider } from 'fumadocs-ui/provider/next';
import { Inter } from 'next/font/google';

import './global.css';
import { Banner } from '@/components/banner';
import Link from 'fumadocs-core/link';
import CustomSearchDialog from '@/components/search';

const inter = Inter({
  subsets: ['latin'],
});

const ANNOUNCEMENT_IDS = {
  'v4-migration': 'v4-1',
  stars: 'stars-1',
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang='en' className={inter.className} suppressHydrationWarning>
      <body className='flex flex-col min-h-screen'>
        <Banner
          id={ANNOUNCEMENT_IDS['stars']}
          rainbowColors={[
            '#facc15',
            '#fbbf24',
            '#f59e0b',
            '#d97706',
            '#b45309',
          ]}
          variant='rainbow'
          height='3rem'
        >
          ⭐ If you find Zipline useful, please consider giving it a star on
          <Link href='https://github.com/diced/zipline'> GitHub</Link>! ⭐
        </Banner>
        <RootProvider
          search={{
            SearchDialog: CustomSearchDialog,
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
