export default {
  github: 'https://github.com/diced/zipline',
  docsRepositoryBase: 'https://github.com/diced/zipline-docs/blob/new',
  titleSuffix: ' – Zipline',
  logo: (
    <>
      <span className="mr-2 font-extrabold hidden md:inline">Zipline</span>
      <span className="text-gray-600 font-normal hidden md:inline">
        Fast & lightweight file uploading.
      </span>
    </>
  ),
  head: (
    <>
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="en" />
      <meta name="description" content="Zipline: documentation" />
      <meta name="og:description" content="Zipline: documentation" />
      <meta name="twitter:site:domain" content="zipline.diced.me" />
      <meta name="twitter:url" content="https://zipline.diced.me/" />
      <meta name="og:title" content="Zipline: documentation" />
      <meta name="apple-mobile-web-app-title" content="Zipline" />
      <link
        rel="icon"
        type="image/png"
        sizes="256x256"
        href="/favicon.ico"
      />
      <style>{`.dark body, .dark .sidebar, .dark nav { background-color: #05070f !important; }`}</style>
    </>
  ),
  search: false,
  prevLinks: true,
  nextLinks: true,
  footer: true,
  footerEditLink: 'Edit this page on GitHub',
  footerText: <>© {new Date().getFullYear()} diced</>
}
