import { DocSearchModal } from '@docsearch/react';
import clsx from 'clsx';
import Head from 'next/head';
import Link from 'next/link';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const INDEX_NAME = 'zipline';
const APP_ID = 'BXUJSM62NY';
const APP_KEY = '94e0a10b58aab0c08fcb8c7d1821fbb3';

export const SearchContext = createContext({
  isOpen: false,
  setIsOpen: (_: boolean) => {},
});

export default function SearchProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'k') {
        event.preventDefault();
        setIsOpen(true);
      }

      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <Head>
        <link rel='preconnect' href={`https://${APP_ID}-dsn.algolia.net`} crossOrigin='anonymous' />
      </Head>

      <SearchContext.Provider value={{ isOpen, setIsOpen }}>{children}</SearchContext.Provider>

      {isOpen &&
        createPortal(
          <DocSearchModal
            appId={APP_ID}
            apiKey={APP_KEY}
            indexName={INDEX_NAME}
            onClose={() => setIsOpen(false)}
            initialScrollY={window.scrollY}
            hitComponent={Hit}
            transformItems={(items) =>
              items.map((item) => ({
                ...item,
                url: item.url.replace('https://zipline.diced.vercel.app', ''),
              }))
            }
          />,
          document.body,
        )}
    </>
  );
}

function Hit({ hit, children }: { hit: any; children: ReactNode }) {
  return (
    <Link
      href={hit.url}
      className={clsx({
        'DocSearch-Hit--Result': hit.__is_result?.(),
        'DocSearch-Hit--Parent': hit.__is_parent?.(),
        'DocSearch-Hit--FirstChild': hit.__is_first?.(),
        'DocSearch-Hit--LastChild': hit.__is_last?.(),
        'DocSearch-Hit--Child': hit.__is_child?.(),
      })}
    >
      {children}
    </Link>
  );
}
