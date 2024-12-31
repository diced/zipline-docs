import { ReactNode, useEffect, useRef, useState } from 'react';
import MacShell from './MacShell';
import clsx from 'clsx';

interface MacTerminalProps {
  text: string;
  lines: {
    text: ReactNode;
    showAfter: number;
  }[];
}

export default function MacTerminal({ text, lines }: MacTerminalProps) {
  const [visibleText, setVisibleText] = useState('');
  const [blinking, setBlinking] = useState(false);
  const [typingInterval, setTypingInterval] = useState(600);

  const [outputLines, setOutputLines] = useState<
    {
      visible: boolean;
      children: ReactNode;
    }[]
  >(lines.map((line) => ({ visible: false, children: line.text })));
  const [visibleIdx, setVisibleIdx] = useState(0);

  const divElement = useRef<HTMLDivElement>(null);

  const isElementVisible = () => {
    if (divElement.current) {
      const { top, bottom } = divElement.current.getBoundingClientRect();
      const vHeight =
        window.innerHeight || document.documentElement.clientHeight;

      return top > 0 && bottom < vHeight;
    }

    return false;
  };

  const divVisible = isElementVisible();

  useEffect(() => {
    const interval = setInterval(() => {
      setBlinking(!blinking);
    }, 700);

    return () => clearInterval(interval);
  }, [blinking]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isElementVisible()) {
      interval = setInterval(() => {
        if (visibleText.length === text.length) {
          if (visibleIdx !== lines.length) {
            const { text, showAfter } = lines[visibleIdx];

            setTypingInterval(showAfter);
            // setOutputLines((prev) => [...prev, text]);
            setOutputLines((prev) =>
              prev.map((line, index) =>
                index === visibleIdx
                  ? { visible: true, children: line.children }
                  : line,
              ),
            );
            setVisibleIdx((prev) => prev + 1);
          }
        }

        if (visibleText.length < text.length) {
          setVisibleText((prev) => text.substring(0, prev.length + 1));
          setTypingInterval(Math.floor(Math.random() * 1) + 100);
        }
      }, typingInterval);
    }

    return () => clearInterval(interval);
  }, [visibleText, typingInterval, lines, visibleIdx, divVisible]);

  return (
    <MacShell
      decoration={
        <div className='flex items-center justify-center px-4 border-r dark:border-r-gray-800 border-r-gray-100 text-gray-300 text-sm'>
          zsh
        </div>
      }
    >
      <div className='w-full mt-1 p-2 font-mono' ref={divElement}>
        <span className='text-gray-400'>~/zipline/</span>{' '}
        <span>{visibleText}</span>
        <span
          className={clsx(
            'px-1.5 ml-1 bg-blue-200 dark:bg-blue-800 transition-all',
            blinking && visibleText.length !== text.length
              ? 'opacity-100'
              : 'opacity-0',
          )}
        />
      </div>
      <div className='w-full -mt-2 p-2 font-mono'>
        {outputLines.map((line, idx) => (
          <div
            key={idx}
            className={clsx(
              'transition-all duration-200 ease-in-out',
              line.visible ? 'opacity-100' : 'opacity-0',
            )}
          >
            {line.children}
          </div>
        ))}
      </div>
      {visibleIdx === lines.length && (
        <div className='w-full mt-1 p-2 font-mono'>
          <span className='text-gray-400'>~/zipline/</span>
          <span
            className={clsx(
              'px-1.5 ml-1 bg-blue-200 dark:bg-blue-800 transition-all',
              blinking && visibleText.length === text.length
                ? 'opacity-100'
                : 'opacity-0',
            )}
          />
        </div>
      )}
    </MacShell>
  );
}
