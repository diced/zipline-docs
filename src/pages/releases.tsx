import { NextSeo } from 'next-seo';
import Center from '../components/Center';
import Container from '../components/Container';
import ReleasesPage from '../components/pages/releases';

export default function Releases() {
  return (
    <>
      <NextSeo
        description='All of Ziplines releases'
        openGraph={{
          url: 'https://zipline.diced.vercel.app/releases',
          title: 'Zipline - Releases',
          description: 'All of Ziplines releases',
          images: [
            {
              url: '/img/og-banner.png',
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
            <h1 className='sm:text-8xl text-6xl font-extrabold text-center'>Releases</h1>
            <p className='text-center text-2xl mt-4'>List of available releases</p>
            <ReleasesPage />
          </div>
        </Center>
      </Container>
    </>
  );
}
