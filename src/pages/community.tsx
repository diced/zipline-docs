import { NextSeo } from 'next-seo';
import Center from '../components/Center';
import Container from '../components/Container';
import CommunityPage from '../components/pages/community';

const communityLinks = [
  {
    href: '#community',
    label: 'Community Links',
  },
  {
    href: '#themes',
    label: 'Themes',
  },
  {
    href: '#showcase',
    label: 'Showcase',
  },
];

export default function Community() {
  return (
    <>
      <NextSeo
        title='Community'
        description='Interact with the Zipline community, or receive support!'
        openGraph={{
          url: 'https://zipline.diced.sh/community',
          title: 'Zipline - Community',
          description:
            'Interact with the Zipline community, or receive support!',
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
            <h1 className='text-4xl md:text-6xl font-extrabold text-center'>
              Zipline Community
            </h1>
            <p className='text-center text-xl mt-4'>
              Interact with the Zipline community, find custom themes, or check
              out these Zipline-related projects!
            </p>
            <div className='flex flex-wrap justify-center gap-2 mt-8'>
              {communityLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className='px-4 py-2 rounded-md bg-blue-100 dark:bg-gray-800/30 dark:border dark:border-gray-800 text-blue-700 dark:text-blue-300 font-semibold hover:bg-blue-200 dark:hover:bg-gray-800 transition'
                >
                  {link.label}
                </a>
              ))}
            </div>
            <CommunityPage />
          </div>
        </Center>
      </Container>
    </>
  );
}
