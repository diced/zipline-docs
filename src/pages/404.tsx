import { IconArrowRight } from '@tabler/icons-react';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import Center from '../components/Center';
import Container from '../components/Container';

export default function FourohFour() {
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
            <h1 className='sm:text-8xl text-6xl font-extrabold text-center bg-clip-text from-purple-500 to-cyan-400 text-transparent bg-gradient-to-tr'>
              {':('}
            </h1>

            <p className='text-center text-2xl mt-4'>Looks like you&apos;re lost... Need a hand?</p>

            <Link
              href='/'
              className='text-center mt-6 transition-all shadow-lg duration-500 shadow-blue-500/30 hover:shadow-blue-600/50 ease-in-out bg-blue-500 hover:bg-blue-600 focus:bg-blue-400 text-white font-bold py-2 px-4 rounded text-3xl flex'
            >
              Go back! <IconArrowRight className='my-auto ml-6 hidden md:block' />
            </Link>
          </div>
        </Center>
      </Container>
    </>
  );
}
