import { Inter } from 'next/font/google';
import { DefaultSeo } from 'next-seo';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import SearchProvider from '../components/search/SearchProvider';
import Script from 'next/script';

import '../styles/index.css';
import '../styles/docsearch.css';
import '../styles/http-badge.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        titleTemplate='Zipline - %s'
        defaultTitle='Zipline'
        themeColor='#3498db'
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
          {
            rel: 'icon',
            type: 'image/png',
            href: '/favicons/favicon-64x64.png',
            sizes: '64x64',
          },
          {
            rel: 'icon',
            type: 'image/png',
            href: '/favicons/favicon-128x128.png',
            sizes: '128x128',
          },
          {
            rel: 'icon',
            type: 'image/png',
            href: '/favicons/favicon-512x512.png',
            sizes: '512x512',
          },
          { rel: 'icon', type: 'image/svg', href: '/favicons/favicon.svg' },
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

      <ThemeProvider attribute='class' enableSystem={true}>
        <SearchProvider>
          <Layout inter={inter}>
            <Component {...pageProps} />
          </Layout>
        </SearchProvider>
      </ThemeProvider>
    </>
  );
}
