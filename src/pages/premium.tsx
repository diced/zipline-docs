import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Premium() {
  const router = useRouter();
  useEffect(() => {
    router.push('https://youtube.com/watch?v=dQw4w9WgXcQ'); // lol
  }, []);

  return (
    <>
      <NextSeo
        description='Introducing the next generation of Zipline, with premium features!'
        openGraph={{
          url: 'https://zipline.diced.vercel.app/premium',
          title: 'Zipline - Premium',
          description: 'Introducing the next generation of Zipline, with premium features!',
          images: [
            {
              url: '/img/og-banner-premium.png',
            },
          ],
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />
      <div className='flex flex-col items-center justify-center h-screen'>
        <h1 className='text-3xl md:text-6xl font-extrabold text-center'>Zipline Premium</h1>
      </div>
    </>
  );
}
