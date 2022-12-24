import { NextSeo } from 'next-seo';
import Center from '../components/Center';
import Container from '../components/Container';
import FAQPage from '../components/pages/faq';
import HomePage from '../components/pages/home';
import ButtonLinks from '../components/pages/home/ButtonLinks';

export default function FAQ() {
  return (
    <>
      <NextSeo
        description='Frequently asked questions about Zipline.'
        openGraph={{
          url: 'https://zipline.diced.tech',
          title: 'Zipline - FAQ',
          description: 'Frequently asked questions about Zipline.',
          images: [
            {
              url: '/img/og-banner.png',
            },
          ],
        }}
      />
      <Container>
        <Center>
          <div className='my-28 w-full'>
            <h1 className='sm:text-8xl text-6xl font-extrabold text-center'>FAQ</h1>
            <p className='text-center text-2xl mt-4'>Frequently asked questions about Zipline</p>

            <FAQPage />
          </div>
        </Center>
      </Container>
    </>
  );
}
