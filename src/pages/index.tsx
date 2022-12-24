import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';

import Center from '../components/Center';
import Container from '../components/Container';
import EmphasizeText from '../components/EmphasizeText';
import MacWindow from '../components/MacWindow';
import HomePage from '../components/pages/home';
import ButtonLinks from '../components/pages/home/ButtonLinks';

import Image from 'next/image';
import homePageScreenshotLight from '../../public/img/screenshot-1-light.png';
import homePageScreenshot from '../../public/img/screenshot-1.png';
import statsPageScreenshotLight from '../../public/img/screenshot-2-light.png';
import statsPageScreenshot from '../../public/img/screenshot-2.png';
import galleryPageScreenshotLight from '../../public/img/screenshot-3-light.png';
import galleryPageScreenshot from '../../public/img/screenshot-3.png';
import urlsPageScreenshot from '../../public/img/screenshot-4.png';
import urlsPageScreenshotLight from '../../public/img/screenshot-4-light.png';

export default function Home({ stars }: { stars: number }) {
  return (
    <>
      <NextSeo
        description='The next generation ShareX / File upload server, packed with tons of features and a great dashboard. What more could you want?'
        openGraph={{
          url: 'https://zipline.diced.tech',
          title: 'Zipline',
          description:
            'The next generation ShareX / File upload server, packed with tons of features and a great dashboard. What more could you want?',
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
          <div className='my-28'>
            <div className='sm:text-7xl text-5xl font-extrabold text-center'>
              <div>
                The{' '}
                <span className='transition-all hover:text-6xl hover:md:text-8xl duration-500 ease-in-out bg-clip-text from-purple-500 via-blue-400 to-purple-500 text-transparent bg-gradient-to-r bg-pos-0 bg-size-200 hover:bg-pos-100'>
                  next generation
                </span>{' '}
              </div>
              <div>ShareX / File upload server</div>
            </div>

            <p className='text-center text-2xl mt-4'>
              Packed with features and a great dashboard. What more could you want?
            </p>

            <ButtonLinks stars={stars} />

            <div className='grid grid-cols-1 md:grid-cols-2 mt-36 gap-12 gap-y-36'>
              <div className='flex flex-col justify-center'>
                <div className='text-3xl font-bold'>
                  Zipline has an <EmphasizeText>amazing</EmphasizeText> dashboard
                </div>
                <p className='text-xl mt-4'>
                  Zipline&apos;s dashboard is packed with features, and is designed to be easy to use.
                </p>
              </div>
              <MacWindow>
                <Image
                  src={homePageScreenshot}
                  width={1920}
                  height={1080}
                  placeholder='blur'
                  className='dark:block hidden'
                  alt='screenshot of zipline'
                  sizes='(max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw,
                  33vw'
                />
                <Image
                  src={homePageScreenshotLight}
                  width={1920}
                  height={1080}
                  placeholder='blur'
                  className='dark:hidden block'
                  alt='screenshot of zipline'
                  sizes='(max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw,
                  33vw'
                />
              </MacWindow>

              <div className='h-0.5 bg-gray-200 dark:bg-gray-800 col-span-1 md:col-span-2' />

              <MacWindow>
                <Image
                  src={statsPageScreenshot}
                  width={1920}
                  height={1080}
                  placeholder='blur'
                  className='dark:block hidden'
                  alt='screenshot of zipline'
                  sizes='(max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw,
                  33vw'
                />
                <Image
                  src={statsPageScreenshotLight}
                  width={1920}
                  height={1080}
                  placeholder='blur'
                  className='dark:hidden block'
                  alt='screenshot of zipline'
                  sizes='(max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw,
                  33vw'
                />
              </MacWindow>
              <div className='flex flex-col justify-center'>
                <div className='text-3xl font-bold'>
                  View your <EmphasizeText>stats</EmphasizeText>
                </div>
                <p className='text-xl mt-4'>
                  Via the help of charts, graphs and tables, you can feel awesome while looking at this page.
                </p>
              </div>

              <div className='h-0.5 bg-gray-200 dark:bg-gray-800 col-span-1 md:col-span-2' />

              <div className='flex flex-col justify-center'>
                <div className='text-3xl font-bold'>
                  View your files in a <EmphasizeText>gallery</EmphasizeText>
                </div>
                <p className='text-xl mt-4'>
                  View your files and media in a gallery, and do anything you want with them.
                </p>
              </div>
              <MacWindow>
                <Image
                  src={galleryPageScreenshot}
                  width={1920}
                  height={1080}
                  placeholder='blur'
                  className='dark:block hidden'
                  alt='screenshot of zipline'
                  sizes='(max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw,
                  33vw'
                />
                <Image
                  src={galleryPageScreenshotLight}
                  width={1920}
                  height={1080}
                  placeholder='blur'
                  className='dark:hidden block'
                  alt='screenshot of zipline'
                  sizes='(max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw,
                  33vw'
                />
              </MacWindow>

              <div className='h-0.5 bg-gray-200 dark:bg-gray-800 col-span-1 md:col-span-2' />

              <MacWindow>
                <Image
                  src={urlsPageScreenshot}
                  width={1920}
                  height={1080}
                  placeholder='blur'
                  className='dark:block hidden'
                  alt='screenshot of zipline'
                  sizes='(max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw,
                  33vw'
                />
                <Image
                  src={urlsPageScreenshotLight}
                  width={1920}
                  height={1080}
                  placeholder='blur'
                  className='dark:hidden block'
                  alt='screenshot of zipline'
                  sizes='(max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw,
                  33vw'
                />
              </MacWindow>
              <div className='flex flex-col justify-center'>
                <div className='text-3xl font-bold'>
                  View your <EmphasizeText>shortened URLs</EmphasizeText>
                </div>
                <p className='text-xl mt-4'>
                  Create shortened links to websites, set a max amount of uses, and more!
                </p>
              </div>
            </div>

            <div className='text-6xl font-bold text-center mt-64 mb-6' id='features'>
              Want a list of features?
            </div>
            <p className='text-center text-2xl mt-4 mb-16'>
              Heres a list of the best features Zipline has to offer. We continue to look for new stuff to
              add!
            </p>
            <HomePage />

            <div className='my-64'>
              <div className='text-6xl font-bold text-center'>Ready to get started?</div>

              <ButtonLinks stars={stars} />
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
      ...(process.env.GITHUB_TOKEN ? { Authorization: 'token ' + process.env.GITHUB_TOKEN } : {}),
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
