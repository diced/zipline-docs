import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head />
      <body className='dark:bg-gray-900 dark:text-white transition-all ease-in-out duration-500'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
