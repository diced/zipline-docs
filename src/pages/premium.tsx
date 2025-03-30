import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

import Center from '../components/Center';
import Container from '../components/Container';
import { useEffect } from 'react';

export default function Premium({ stars }: { stars: number }) {
  const router = useRouter();

  useEffect(() => {
    router.push('https://youtube.com/watch?v=dQw4w9WgXcQ');
  }, []);

  return (
    <>
      <NextSeo
        description='Hosted Zipline for only $6.99 a month!'
        openGraph={{
          url: 'https://zipline.diced.sh/premium',
          title: 'Premium',
          description: 'Hosted Zipline for only $6.99 a month!',
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

      <Container>
        <Center>
          <div className='my-28 w-full mx-6'>
            <div className='sm:text-7xl text-5xl font-medium text-center'>
              <div>
                The{' '}
                <span className='bg-clip-text from-purple-500 via-blue-400 to-purple-500 text-transparent bg-gradient-to-r bg-pos-0 bg-size-200'>
                  premium
                </span>{' '}
              </div>
              <div>ShareX / File upload server</div>
            </div>
          </div>
        </Center>
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('https://api.github.com/repos/diced/zipline', {
    headers: {
      Accept: 'application/vnd.github.v3+json',
      ...(process.env.GITHUB_TOKEN
        ? { Authorization: 'token ' + process.env.GITHUB_TOKEN }
        : {}),
    },
  });

  if (!res.ok)
    return {
      props: {
        stars: 0,
      },
    };

  const data = await res.json();

  return {
    props: {
      stars: data.stargazers_count,
    },
  };
};
