import { ReactNode, useEffect, useState } from 'react';
import Tilt from 'react-parallax-tilt';

export default function MacWindow({ children }: { children: ReactNode }) {
  const [browser, setBrowser] = useState('Zipline Browser');
  const [closed, setClosed] = useState(false);
  const [percent, setPercent] = useState(0);
  const [waiting, setWaiting] = useState(false);
  const [scale, setScale] = useState(1.1);
  const [minimized, setMinimized] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();

    // this is dumb but it gets the job done lol
    if (userAgent.includes('chrome')) {
      setBrowser('Google Chrome');
    } else if (userAgent.includes('safari')) {
      setBrowser('Safari');
    } else if (userAgent.includes('firefox')) {
      setBrowser('Firefox');
    } else {
      setBrowser('Zipline Browser');
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (closed && !waiting) {
        if (percent < 100) {
          const waitTime = Math.floor(Math.random() * 100) + 100;
          const percentAdded = Math.floor(Math.random() * 10) + 1;

          setTimeout(() => {
            setPercent(percent + percentAdded);
          }, waitTime);
        }

        if (percent >= 100) {
          setWaiting(true);
          setTimeout(() => {
            setClosed(false);
            setPercent(0);
            setWaiting(false);
          }, 2000);
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [percent, closed]);

  useEffect(() => {
    if (scale !== 1.1) {
      setTimeout(() => {
        setScale(1.1);
      }, 5000);
    }
  }, [scale]);

  useEffect(() => {
    if (minimized) {
      setTimeout(() => {
        setMinimized(false);
      }, 5000);
    }
  }, [minimized]);

  return (
    <Tilt
      scale={scale}
      tiltMaxAngleY={6}
      tiltMaxAngleX={6}
      className={`transition-all ${minimized ? 'opacity-0' : 'visible'}`}
    >
      {closed ? (
        <div className='bg-blue-600 justify-center rounded-md border-blue-300 border flex flex-col p-2 transition-all ease-in-out px-5 text-white'>
          <div className='text-8xl font-bold'>{':('}</div>
          <div className='text-xl mt-12'>
            Your PC ran into a problem and needs to restart. We&apos;re just collecting some error info, and
            then we&apos;ll restart for you
          </div>

          <div className='text-xl mt-6 transition-all ease-in-out animate-pulse'>
            {percent >= 100 ? <div>Just a moment...</div> : <div>{percent}% complete</div>}
          </div>
        </div>
      ) : (
        <div className='dark:bg-gray-800 justify-center rounded-md border-gray-100 dark:border-gray-700 border flex flex-col flex-grow items-center w-full transition-all'>
          <div className='grid grid-cols-3 w-full p-2'>
            <div className='flex items-center space-x-2 w-full pt-1 px-2'>
              <div
                className='bg-red-500 hover:bg-red-600 transition-colors ease-in-out shadow-lg rounded-full h-3 w-3 cursor-pointer'
                onClick={() => setClosed(!closed)}
              />
              <div
                className='bg-yellow-500 hover:bg-yellow-600 transition-colors ease-in-out shadow-lg rounded-full h-3 w-3 cursor-pointer'
                onClick={() => setMinimized(!minimized)}
              />
              <div
                className='bg-green-500 hover:bg-green-600 transition-colors ease-in-out shadow-lg rounded-full h-3 w-3 cursor-pointer'
                onClick={() => setScale(2)}
              />
            </div>

            <div className='flex items-center justify-center'>
              <div className='text-sm'>Zipline - {browser}</div>
            </div>
          </div>

          <div className='w-full mt-1'>{children}</div>
        </div>
      )}
    </Tilt>
  );
}
