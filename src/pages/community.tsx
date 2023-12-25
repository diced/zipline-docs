import { NextSeo } from 'next-seo';
import Center from '../components/Center';
import Container from '../components/Container';
import CommunityPage from '../components/pages/community';

export default function Community() {
  return (
    <>
      <NextSeo
        description='Interact with the Zipline community, or receive support!'
        openGraph={{
          url: 'https://zipline.diced.vercel.app',
          title: 'Zipline - Community',
          description: 'Interact with the Zipline community, or receive support!',
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
          <div className='my-12 md:my-28'>
            <h1 className='text-3xl md:text-6xl font-extrabold text-center'>Zipline Community</h1>

            <p className='text-center text-2xl mt-4'>Interact with the community, or receive support!</p>

            <CommunityPage />
          </div>
        </Center>
      </Container>
    </>
  );
}
