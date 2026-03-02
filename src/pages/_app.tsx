import { DefaultSeo } from 'next-seo';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Link from 'next/link';
import Script from 'next/script';
import Layout from '../components/Layout';
import SearchProvider from '../components/search/SearchProvider';

import AnnouncementBar from '../components/AnnouncementBar';
import '../styles/index.css';
import '../styles/docs.css';
import '../styles/docsearch.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
});

const ANNOUNCEMENT_IDS = {
  'v4-migration': 'v4-1',
  stars: 'stars-1',
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        titleTemplate='%s – Zipline'
        defaultTitle='Zipline'
        themeColor='#2052a9'
        additionalLinkTags={[
          {
            rel: 'icon',
            type: 'image/png',
            href: '/favicons/favicon-16x16.png',
            sizes: '16x16',
          },
          {
            rel: 'icon',
            type: 'image/png',
            href: '/favicons/favicon-32x32.png',
            sizes: '32x32',
          },
          { rel: 'icon', type: 'image/svg', href: '/favicons/favicon.svg' },
          {
            rel: 'apple-touch-icon',
            sizes: '180x180',
            href: '/favicons/apple-touch-icon.png',
          },
          { rel: 'manifest', href: '/favicons/site.webmanifest' },
        ]}
        additionalMetaTags={[
          { name: 'viewport', content: 'width=device-width,initial-scale=1' },
          { httpEquiv: 'x-ua-compatible', content: 'IE=edge' },
        ]}
      />
      <Script
        async
        src='https://analytics_.diced.sh/script.js'
        data-website-id='eb6dbb46-aeae-45c5-ae52-a6d8ab6bf43c'
      />
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }

        code,
        pre {
          font-family: ${jetbrainsMono.style.fontFamily};
        }
      `}</style>

      <AnnouncementBar
        className='bg-amber-400/90 text-white'
        id={ANNOUNCEMENT_IDS['stars']}
      >
        ⭐ If you find Zipline useful, please consider giving it a star on{' '}
        <Link
          href='https://github.com/diced/zipline'
          className='underline hover:text-blue-200'
        >
          GitHub
        </Link>
        ! ⭐
      </AnnouncementBar>

      <ThemeProvider attribute='class' enableSystem={true}>
        <SearchProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SearchProvider>
      </ThemeProvider>
    </>
  );
}
