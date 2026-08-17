'use client';

import { useEffect, useRef, useState } from 'react';
import Tilt from 'react-parallax-tilt';
import { Lock, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/cn';

const DEFAULT_SCALE = 1.05;

function MacShell({
  children,
  decoration,
  center,
}: {
  children: React.ReactNode;
  decoration: React.ReactNode;
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
            setPercent((current) => current + percentAdded);
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
  }, [percent, closed, waiting]);

  useEffect(() => {
    if (scale !== DEFAULT_SCALE) {
      const timeout = setTimeout(() => {
        setScale(DEFAULT_SCALE);
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [scale]);

  useEffect(() => {
    if (minimized) {
      const timeout = setTimeout(() => {
        setMinimized(false);
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [minimized]);

  return (
    <Tilt
      scale={scale}
      tiltMaxAngleY={3}
      tiltMaxAngleX={3}
      className={cn('transition-all', minimized ? 'opacity-0' : 'visible')}
    >
      {closed ? (
        <div className='flex flex-col justify-center rounded-xl border border-blue-300/50 bg-blue-600 py-8 px-16 text-white transition-all ease-in-out'>
          <div className='text-8xl font-black'>{':('}</div>
          <p className='mt-12 font-semibold text-xl'>
            Your PC ran into a problem and needs to restart. We&apos;re just collecting some error info, and
            then we&apos;ll restart for you.
          </p>

          <p className='mt-6 animate-pulse text-xl transition-all ease-in-out'>
            {percent >= 100 ? 'Just a moment...' : `${percent}% complete`}
          </p>
        </div>
      ) : (
        <div className='flex h-full flex-col rounded-xl border border-fd-border bg-fd-card transition-all'>
          <div className={cn('flex border-b border-fd-border', center && 'grid grid-cols-3')}>
            <div className={cn('flex items-center space-x-2 p-2', !center && 'border-r border-fd-border')}>
              <button
                type='button'
                aria-label='Close window'
                className='h-3 w-3 cursor-pointer rounded-full bg-red-500 shadow-lg transition-colors ease-in-out hover:bg-red-600'
                onClick={() => setClosed(true)}
              />
              <button
                type='button'
                aria-label='Minimize window'
                className='h-3 w-3 cursor-pointer rounded-full bg-yellow-500 shadow-lg transition-colors ease-in-out hover:bg-yellow-600'
                onClick={() => setMinimized(true)}
              />
              <button
                type='button'
                aria-label='Maximize window'
                className='h-3 w-3 cursor-pointer rounded-full bg-green-500 shadow-lg transition-colors ease-in-out hover:bg-green-600'
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

export function MacWindow({ children }: { children: React.ReactNode }) {
  return (
    <MacShell
      center
      decoration={
        <div className='flex items-center justify-center'>
          <div className='flex flex-row items-center space-x-2 rounded-md bg-fd-muted/80 px-4 py-[0.01rem] text-sm'>
            <Lock className='text-teal-500' size={12} />
            <span className='text-fd-foreground'>zipline.diced.sh</span>
            <RefreshCw className='text-fd-muted-foreground' size={12} />
          </div>
        </div>
      }
    >
      <div className='w-full'>{children}</div>
    </MacShell>
  );
}

type TerminalLine = {
  text: React.ReactNode;
  showAfter: number;
};

export function MacTerminal({ text, lines }: { text: string; lines: TerminalLine[] }) {
  const [visibleText, setVisibleText] = useState('');
  const [typingInterval, setTypingInterval] = useState(600);
  const [outputLines, setOutputLines] = useState(
    lines.map((line) => ({ visible: false, children: line.text })),
  );
  const [visibleIdx, setVisibleIdx] = useState(0);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isVisible = () => {
      if (!divRef.current) return false;
      const { top, bottom } = divRef.current.getBoundingClientRect();
      const vHeight = window.innerHeight || document.documentElement.clientHeight;
      return top > 0 && bottom < vHeight;
    };

    const interval = setInterval(() => {
      if (!isVisible()) return;

      if (visibleText.length === text.length) {
        if (visibleIdx !== lines.length) {
          const { showAfter } = lines[visibleIdx];
          setTypingInterval(showAfter);
          setOutputLines((prev) =>
            prev.map((line, index) => (index === visibleIdx ? { ...line, visible: true } : line)),
          );
          setVisibleIdx((prev) => prev + 1);
        }
      } else {
        setVisibleText((prev) => text.substring(0, prev.length + 1));
        setTypingInterval(Math.floor(Math.random() * 1) + 100);
      }
    }, typingInterval);

    return () => clearInterval(interval);
  }, [visibleText, typingInterval, lines, visibleIdx, text]);

  const showCursor = visibleText.length !== text.length;

  return (
    <MacShell
      decoration={
        <div className='flex items-center font-mono justify-center border-r border-fd-border px-4 text-sm text-fd-muted-foreground'>
          zsh
        </div>
      }
    >
      <div className='mt-1 w-full p-2 px-4 font-mono' ref={divRef}>
        <span className='text-fd-muted-foreground'>/zipline</span> <span>{visibleText}</span>
        <span
          className={cn(
            'ml-1 bg-blue-200 px-1.5 dark:bg-blue-800 transition-all',
            showCursor ? 'opacity-100' : 'opacity-0',
          )}
        />
      </div>
      <div className='-mt-2 w-full p-2 px-4 font-mono'>
        {outputLines.map((line, idx) => (
          <div
            key={idx}
            className={cn(
              'transition-all duration-200 ease-in-out',
              line.visible ? 'opacity-100' : 'opacity-0',
            )}
          >
            {line.children}
          </div>
        ))}
      </div>
      {visibleIdx === lines.length && (
        <div className='mt-1 w-full p-2 px-4 font-mono'>
          <span className='text-fd-muted-foreground'>/zipline</span>
          <span className='ml-2 bg-blue-200 px-1.5 dark:bg-blue-800 transition-all animate-pulse' />
        </div>
      )}
    </MacShell>
  );
}
