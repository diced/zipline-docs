import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function VersionSelect() {
  const [path, setPath] = useState('');
  const router = useRouter();

  const [upstream, setUpstream] = useState(false);
  const isLocalhost = typeof window !== 'undefined' && window.location.hostname === 'localhost';

  useEffect(() => {
    setPath(router.asPath);

    if (window.location.hostname === 'localhost' || window.location.hostname === 'zipline-trunk.diced.tech') {
      setUpstream(true);
    } else {
      setUpstream(false);
    }
  }, [router.asPath]);

  return (
    <div className='flex items-center justify-between my-4'>
      <div className='font-semibold text-sm w-full ml-1'>Version</div>
      <div className='flex items-center'>
        <Link
          href={`https://zipline.diced.tech${path}`}
          className={`text-xs bg-gray-200 dark:bg-gray-800 rounded-md px-2 py-1 font-semibold ${
            upstream ? 'text-gray-500' : 'text-gray-900 dark:text-gray-100'
          }`}
        >
          latest
        </Link>

        <Link
          href={`${isLocalhost ? 'http://localhost:3000' : 'https://zipline-trunk.diced.tech'}${path}`}
          className={`ml-2 text-xs bg-gray-200 dark:bg-gray-800 rounded-md px-2 py-1 font-semibold ${
            upstream ? 'text-gray-900 dark:text-gray-100' : 'text-gray-500'
          }`}
        >
          upstream
        </Link>
      </div>
    </div>
  );
}
