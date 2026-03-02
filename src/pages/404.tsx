import clsx from 'clsx';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import Center from '../components/Center';
import Container from '../components/Container';

export default function FourOhFour() {
  return (
    <>
      <NextSeo
        title='404'
        description="Looks like you're lost... Need a hand?"
        openGraph={{
          url: 'https://zipline.diced.vercel.app',
          title: 'Zipline - 404',
          description: "Looks like you're lost... Need a hand?",
        }}
      />
      <Container>
        <Center>
          <div className='my-28'>
            <h1 className='sm:text-8xl text-6xl font-extrabold text-center bg-clip-text from-purple-500 to-cyan-400 text-transparent bg-linear-to-tr'>
              {':('}
            </h1>

            <p className='text-center text-2xl mt-4'>
              Looks like you&apos;re lost... Need a hand?
            </p>

            <Link href='/'>
              <button
                className={clsx(
                  'transition-all duration-300 ease-in-out hover:scale-105 group w-full my-6',
                  'bg-blue-600 hover:bg-blue-500 focus:bg-blue-500',
                  'text-white font-bold py-2 px-4 rounded-sm text-xl',
                  'hover:ring-2 hover:ring-blue-800 dark:hover:ring-blue-300 hover:ring-offset-white dark:hover:ring-offset-gray-900 hover:ring-offset-2',
                )}
              >
                Go back
              </button>
            </Link>
          </div>
        </Center>
      </Container>
    </>
  );
}
