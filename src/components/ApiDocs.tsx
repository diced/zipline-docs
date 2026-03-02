// @ts-nocheck

import { useEffect, useState } from 'react';

export default function ApiDocs() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    import('rapidoc').then(() => setLoading(false));
  }, []);

  return loading ? (
    <div className='flex items-center justify-center h-[50vh]'>
      <div className='w-12 h-12 border-4 border-gray-300 dark:border-gray-700 rounded-full border-t-blue-500 animate-spin'></div>
      <span className='ml-4 text-gray-500 font-mono text-lg'>
        Loading API documentation...
      </span>
    </div>
  ) : (
    <rapi-doc
      spec-url='/openapi.json'
      render-style='read'
      layout='column'
      show-header='false'
      mono-font='JetBrains Mono, monospace'
      use-path-in-nav-bar='true'
      show-method-in-nav-bar='as-colored-text'
      default-schema-tab='schema'
      info-description-headings-in-navbar='true'
      allow-authentication='false'
      allow-server-selection='false'
      allow-try='false'
    />
  );
}
