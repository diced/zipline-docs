import type { Metadata } from 'next';
import { ArrowDown, Heart, Star, Terminal } from 'lucide-react';
import { getGithubStars } from '@/lib/github';
import {
  EmphasizeText,
  HomeScreenshots,
} from '@/components/home/home-screenshots';
import {
  GithubStarsButton,
  HomeCta,
  SponsorButton,
} from '@/components/home/home-cta';
import { HomeFeatures } from '@/components/home/home-features';
import { MacTerminal } from '@/components/home/mac';

export const metadata: Metadata = {
  title: 'Zipline',
  description:
    'The next generation ShareX / File upload server, packed with tons of features and a great dashboard. What more could you want?',
  openGraph: {
    url: 'https://zipline.diced.sh',
    title: 'Zipline',
    description:
      'The next generation ShareX / File upload server, packed with tons of features and a great dashboard. What more could you want?',
    images: [{ url: '/img/og-banner.png' }],
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default async function HomePage() {
  const stars = await getGithubStars();

  return (
    <main className='mx-auto w-full max-w-(--fd-layout-width,1400px) px-6 py-16 md:px-8'>
      <section className='my-16 text-center'>
        <h1 className='text-5xl font-medium sm:text-7xl'>
          <span>
            The{' '}
            <span className='bg-linear-to-r from-blue-600 via-blue-400 to-blue-600 bg-size-[200%_200%] bg-clip-text text-transparent'>
              next generation
            </span>{' '}
          </span>
          <span className='block'>ShareX / File upload server</span>
        </h1>

        <p className='mt-4 text-xl text-fd-muted-foreground'>
          Packed with features and a great dashboard. What more could you want?
        </p>

        <HomeCta stars={stars} showSearch />
      </section>

      <HomeScreenshots />

      <div className='my-24 flex justify-center'>
        <ArrowDown className='size-10 animate-bounce text-fd-muted-foreground' />
      </div>

      <section id='features' className='scroll-mt-24'>
        <h2 className='text-center text-5xl font-medium md:text-6xl'>What does Zipline offer?</h2>
        <p className='mb-16 mt-4 text-center text-lg text-fd-muted-foreground'>
          Zipline offers a wide range of features, all designed to make sharing files and links
          easier.
        </p>
        <HomeFeatures />
      </section>

      <section className='my-64'>
        <h2 className='text-center text-5xl font-medium md:text-6xl'>Ready to get started?</h2>

        <div className='my-32 grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-12'>
          <MacTerminal
            text='docker compose up -d'
            lines={[
              {
                text: (
                  <>
                    Creating network &quot;zipline_default&quot; with the default driver
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
            <Terminal className='my-2 h-10 w-10 rounded-lg bg-fd-muted p-2 text-fd-muted-foreground' />
            <h3 className='my-2 text-3xl font-bold'>
              Setup in <EmphasizeText>seconds</EmphasizeText>
            </h3>
            <p className='my-4 text-xl text-fd-muted-foreground'>
              Zipline is designed to be easy to setup via Docker, and is ready to go in seconds.
            </p>
            <HomeCta stars={stars} />
          </div>
        </div>
      </section>

      <section className='my-64'>
        <h2 className='text-center text-5xl font-medium md:text-6xl'>Support development!</h2>

        <div className='mx-auto flex max-w-3xl flex-col items-center gap-16 py-16'>
          <div className='flex flex-col items-center text-center'>
            <Heart className='h-10 w-10 text-red-500' />
            <h3 className='my-2 text-3xl font-bold'>GitHub Sponsor</h3>
            <p className='my-4 text-xl text-fd-muted-foreground'>
              Zipline is developed in my free time, and I would love to continue working on it. If
              you want to support me, consider sponsoring me on GitHub!
            </p>
            <SponsorButton />
          </div>

          <div className='flex flex-col items-center text-center'>
            <Star className='h-10 w-10 text-yellow-500' />
            <h3 className='my-2 text-3xl font-bold'>Star Zipline</h3>
            <p className='my-4 text-xl text-fd-muted-foreground'>
              If sponsoring isn&apos;t an option, consider starring Zipline on GitHub! It greatly
              helps increase the project&apos;s visibility :)
            </p>
            <GithubStarsButton stars={stars} />
          </div>
        </div>
      </section>
    </main>
  );
}
