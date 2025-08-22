import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';

import Center from '../components/Center';
import Container from '../components/Container';
import EmphasizeText from '../components/EmphasizeText';
import MacWindow from '../components/mac/MacWindow';
import HomePage from '../components/pages/home';
import ButtonLinks from '../components/pages/home/ButtonLinks';

import Image, { StaticImageData } from 'next/image';
import homePageScreenshotDark from '../../public/img/screenshot-1-dark.png';
import homePageScreenshotLight from '../../public/img/screenshot-1-light.png';
import metricsPageScreenshotDark from '../../public/img/screenshot-2-dark.png';
import metricsPageScreenshotLight from '../../public/img/screenshot-2-light.png';
import galleryPageScreenshotDark from '../../public/img/screenshot-3-dark.png';
import galleryPageScreenshotLight from '../../public/img/screenshot-3-light.png';
import urlsPageScreenshotDark from '../../public/img/screenshot-4-dark.png';
import urlsPageScreenshotLight from '../../public/img/screenshot-4-light.png';
import foldersPageScreenshotDark from '../../public/img/screenshot-5-dark.png';
import foldersPageScreenshotLight from '../../public/img/screenshot-5-light.png';
import settingsPageScreenshotDark from '../../public/img/screenshot-6-dark.png';
import settingsPageScreenshotLight from '../../public/img/screenshot-6-light.png';

import {
  IconArrowDown,
  IconFiles,
  IconGraphFilled,
  IconHeartFilled,
  IconLayoutDashboard,
  IconLink,
  IconStarFilled,
  IconTerminal2,
} from '@tabler/icons-react';
import { Fragment } from 'react';
import GithubStarsButton from '../components/GithubStarsButton';
import MacTerminal from '../components/mac/MacTerminal';
import SponsorButton from '../components/SponsorButton';

const SS_WIDTH = 2560;
const SS_HEIGHT = 1247;

const screenshotWindows: {
  darkImage: StaticImageData;
  lightImage: StaticImageData;
  alt: string;
  Icon: React.ComponentType<any>;
  title: React.ReactNode;
  text: string;
}[] = [
  {
    darkImage: homePageScreenshotDark,
    lightImage: homePageScreenshotLight,
    alt: 'Home page screenshot',
    Icon: IconLayoutDashboard,
    title: (
      <>
        Zipline has an <EmphasizeText>amazing</EmphasizeText> dashboard
      </>
    ),
    text: "Zipline's dashboard is packed with features, and is designed to be easy to use.",
  },
  {
    darkImage: galleryPageScreenshotDark,
    lightImage: galleryPageScreenshotLight,
    alt: 'Gallery page screenshot',
    Icon: IconFiles,
    title: (
      <>
        Gallery to view all your <EmphasizeText>uploads</EmphasizeText>
      </>
    ),
    text: 'View all your uploads in one place, and easily manage them.',
  },
  {
    darkImage: metricsPageScreenshotDark,
    lightImage: metricsPageScreenshotLight,
    alt: 'Metrics page screenshot',
    Icon: IconGraphFilled,
    title: (
      <>
        <EmphasizeText>Metrics</EmphasizeText> to track your uploads and more
      </>
    ),
    text: 'Track your uploads with historical data, and all stats related to your Zipline instance.',
  },
  {
    darkImage: urlsPageScreenshotDark,
    lightImage: urlsPageScreenshotLight,
    alt: 'URLs page screenshot',
    Icon: IconLink,
    title: (
      <>
        View your <EmphasizeText>shortened URLs</EmphasizeText>
      </>
    ),
    text: 'View all your shortened URLs in one place, and easily manage them.',
  },
  {
    darkImage: foldersPageScreenshotDark,
    lightImage: foldersPageScreenshotLight,
    alt: 'Folders page screenshot',
    Icon: IconFiles,
    title: (
      <>
        Organize your files with <EmphasizeText>folders</EmphasizeText>
      </>
    ),
    text: 'Organize your files with folders, and easily manage them.',
  },
  {
    darkImage: settingsPageScreenshotDark,
    lightImage: settingsPageScreenshotLight,
    alt: 'Settings page screenshot',
    Icon: IconLayoutDashboard,
    title: (
      <>
        <EmphasizeText>Customize</EmphasizeText> Zipline to your liking
      </>
    ),
    text: 'Customize Zipline to your liking with a wide range of settings.',
  },
];

export default function Home({ stars }: { stars: number }) {
  return (
    <>
      <NextSeo
        description='The next generation ShareX / File upload server, packed with tons of features and a great dashboard. What more could you want?'
        openGraph={{
          url: 'https://zipline.diced.sh',
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
          <div className='my-28 w-full mx-6'>
            <div className='sm:text-7xl text-5xl font-medium text-center'>
              <div>
                The{' '}
                <span className='bg-clip-text from-purple-500 via-blue-400 to-purple-500 text-transparent bg-gradient-to-r bg-pos-0 bg-size-200'>
                  next generation
                </span>{' '}
              </div>
              <div>ShareX / File upload server</div>
            </div>

            <p className='text-center text-xl text-black dark:text-gray-100 mt-4'>
              Packed with features and a great dashboard. What more could you
              want?
            </p>

            <ButtonLinks stars={stars} first={true} />

            <div className='h-0.5 my-40' />

            <div className='grid grid-cols-1 md:grid-cols-2 mt-36 gap-12 gap-y-36'>
              {screenshotWindows.map((window, index) => (
                <Fragment key={index}>
                  <MacWindow>
                    <Image
                      src={window.darkImage}
                      width={SS_WIDTH}
                      height={SS_HEIGHT}
                      placeholder='blur'
                      className='dark:block hidden'
                      alt={window.alt}
                      sizes='(max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw,
                  33vw'
                    />
                    <Image
                      src={window.lightImage}
                      width={SS_WIDTH}
                      height={SS_HEIGHT}
                      placeholder='blur'
                      className='dark:hidden block'
                      alt={window.alt}
                      sizes='(max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw,
                  33vw'
                    />
                  </MacWindow>
                  <div className='flex flex-col justify-center'>
                    <window.Icon className='my-2 w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg p-2 text-gray-400' />
                    <div className='text-3xl font-bold my-2'>
                      {window.title}
                    </div>
                    <p className='text-xl my-4'>{window.text}</p>
                  </div>
                </Fragment>
              ))}
            </div>

            <div className='h-0.5 my-96'>
              <IconArrowDown size='2.5rem' className='mx-auto animate-bounce' />
            </div>

            <div
              className='text-5xl md:text-6xl font-medium text-center mt-64 mb-6'
              id='features'
            >
              What does Zipline offer?
            </div>
            <p className='text-center text-lg text-black dark:text-gray-100 mt-4 mb-16'>
              Zipline offers a wide range of features, all designed to make
              sharing files and links easier.
            </p>

            <HomePage />

            <div className='h-0.5 my-64' />

            <div className='my-64'>
              <div className='text-5xl md:text-6xl font-medium text-center'>
                Ready to get started?
              </div>

              <div className='my-32 grid grid-cols-1 md:grid-cols-2 space-y-12 md:space-y-0 md:space-x-12'>
                <MacTerminal
                  text='docker compose up -d'
                  lines={[
                    {
                      text: (
                        <>
                          Creating network &quot;zipline_default&quot; with the
                          default driver
                        </>
                      ),
                      showAfter: 1000,
                    },
                    {
                      text: (
                        <>
                          Creating zipline_postgres_1 ...{' '}
                          <span className='text-green-500'>done</span>
                        </>
                      ),
                      showAfter: 2000,
                    },
                    {
                      text: (
                        <>
                          Creating zipline_zipline_1 ...{' '}
                          <span className='text-green-500'>done</span>
                        </>
                      ),
                      showAfter: 2000,
                    },
                  ]}
                />

                <div className='flex flex-col justify-center'>
                  <IconTerminal2 className='my-2 w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg p-2 text-gray-400' />
                  <div className='text-3xl font-bold my-2'>
                    Setup in <EmphasizeText>seconds</EmphasizeText>
                  </div>
                  <p className='text-xl my-4'>
                    Zipline is designed to be easy to setup via Docker, and is
                    ready to go in seconds.
                  </p>
                  <ButtonLinks stars={stars} />
                </div>
              </div>
            </div>

            <div className='h-0.5 my-64' />

            <div className='my-64'>
              <div className='text-5xl md:text-6xl font-medium text-center'>
                Support development!
              </div>

              <div className='flex flex-col justify-center md:mx-32 mx-12'>
                <div className='flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6 my-16'>
                  <div className='flex flex-col justify-center items-center'>
                    <IconHeartFilled className='w-10 h-10 text-red-500' />
                    <div className='text-3xl font-bold my-2'>
                      GitHub Sponsor
                    </div>
                    <p className='text-xl my-4 text-center'>
                      Zipline is developed in my free time, and I would love to
                      continue working on it. If you want to support me,
                      consider sponsoring me on GitHub!
                    </p>

                    <SponsorButton />
                  </div>
                </div>

                <div className='flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6 my-16'>
                  <div className='flex flex-col justify-center items-center'>
                    <IconStarFilled className='w-10 h-10 text-yellow-500' />
                    <div className='text-3xl font-bold my-2'>Star Zipline</div>
                    <p className='text-xl my-4 text-center'>
                      If sponsoring isn&apos;t an option, consider starring
                      Zipline on GitHub! It greatly helps increase the
                      project&apos;s visibility :)
                    </p>
                    <GithubStarsButton stars={stars} />
                  </div>
                </div>
              </div>
            </div>

            <div className='h-0.5 my-64' />
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
