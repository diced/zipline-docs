import { RootProvider } from 'fumadocs-ui/provider/next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import type { Metadata } from 'next';

import './global.css';
import { siteMetadata } from '@/lib/site-metadata';
import { Banner } from '@/components/banner';
import Link from 'fumadocs-core/link';
import CustomSearchDialog from '@/components/search';
import Script from 'next/script';
import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { SidebarProvider } from '@/components/docs-sidebar/base';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = siteMetadata;

const ANNOUNCEMENT_IDS = {
  'v4-migration': 'v4-1',
  stars: 'stars-1',
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang='en'
      className={`${inter.variable} ${jetBrainsMono.variable}`}
      suppressHydrationWarning
    >
      <Script
        async
        src='https://analytics_.diced.sh/script.js'
        data-website-id='b67b1a7b-fc2f-4fe7-b6aa-f56d4bbe9c4f'
      />

      <body className='flex min-h-screen flex-col font-sans antialiased [--fd-site-nav-height:3.5rem]'>
        <Banner
          id={ANNOUNCEMENT_IDS['stars']}
          rainbowColors={[
            'transparent',
            '#facc15',
            '#fbbf24',
            '#f59e0b',
            'transparent',
            '#d97706',
            '#b45309',
            '#92400e',
            'transparent',
          ]}
          variant='rainbow'
          height='3rem'
        >
          ⭐ If you find Zipline useful, please consider giving it a star
          on&nbsp;
          <Link href='https://github.com/diced/zipline'>Github</Link>! ⭐
        </Banner>
        <RootProvider
          search={{
            SearchDialog: CustomSearchDialog,
          }}
        >
          <SidebarProvider>
            <Navbar />
            <div id='main-content'>{children}</div>
            <Footer />
          </SidebarProvider>
        </RootProvider>
      </body>
    </html>
  );
}
