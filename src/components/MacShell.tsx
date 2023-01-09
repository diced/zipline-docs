import { ReactNode, useEffect, useState } from 'react';
import Tilt from 'react-parallax-tilt';
import { Lock, Refresh } from 'tabler-icons-react';

const DEFAULT_SCALE = 1.05;

export default function MacShell({
  children,
  decoration,
  center,
}: {
  children: ReactNode;
  decoration: ReactNode;
  center?: boolean;
}) {
  const [closed, setClosed] = useState(false);
  const [percent, setPercent] = useState(0);
  const [waiting, setWaiting] = useState(false);
  const [scale, setScale] = useState(DEFAULT_SCALE);
  const [minimized, setMinimized] = useState(false);

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
    if (scale !== DEFAULT_SCALE) {
      setTimeout(() => {
        setScale(DEFAULT_SCALE);
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
      tiltMaxAngleY={3}
      tiltMaxAngleX={3}
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
        <div className='dark:bg-gray-900 h-full rounded-md border-gray-100 dark:border-gray-800 border flex flex-col transition-all'>
          <div
            className={`flex dark:border-gray-800 border-gray-100 border-b ${
              center ? 'grid grid-cols-3' : ''
            }`}
          >
            <div
              className={`flex items-center space-x-2 p-2 ${
                !center ? 'border-r dark:border-r-gray-800 border-r-gray-100' : ''
              }`}
            >
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

            {decoration}
          </div>

          {children}
        </div>
      )}
    </Tilt>
  );
}
