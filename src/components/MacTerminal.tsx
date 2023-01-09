import { ReactNode, useEffect, useRef, useState } from 'react';
import MacShell from './MacShell';

interface MacTerminalProps {
  text: string;
  outputLines: {
    text: ReactNode;
    showAfter: number;
  }[];
}

const shells = ['bash', 'zsh', 'powershell'];

export default function MacTerminal({ text, outputLines }: MacTerminalProps) {
  const [visibleText, setVisibleText] = useState('');
  const [blinking, setBlinking] = useState(false);
  const [typingInterval, setTypingInterval] = useState(600);

  const [visibleOutputLines, setVisibleOutputLines] = useState<ReactNode[]>([]);
  const [visibleIdx, setVisibleIdx] = useState(0);

  const [shell, setShell] = useState(shells[0]);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();

    if (userAgent.includes('mac') || userAgent.includes('linux')) {
      setShell(shells[Math.floor(Math.random() * 2)]);
    } else if (userAgent.includes('win')) {
      // discriminate windows users ig
      setShell(shells[3]);
    } else {
      setShell(shells[Math.floor(Math.random() * 3)]);
    }
  }, []);

  const divElement = useRef<HTMLDivElement>(null);

  const isElementVisible = () => {
    if (divElement.current) {
      const { top, bottom } = divElement.current.getBoundingClientRect();
      const vHeight = window.innerHeight || document.documentElement.clientHeight;

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
          if (visibleIdx !== outputLines.length) {
            const { text, showAfter } = outputLines[visibleIdx];

            setTypingInterval(showAfter);
            setVisibleOutputLines((prev) => [...prev, text]);
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
  }, [visibleText, typingInterval, visibleOutputLines, visibleIdx, divVisible]);

  return (
    <MacShell
      decoration={
        <div className='flex items-center justify-center px-4 border-r dark:border-r-gray-800 border-r-gray-100 text-gray-300 text-sm'>
          {shell}
        </div>
      }
    >
      <div className='w-full mt-1 p-2 font-mono' ref={divElement}>
        <span className='text-gray-400'>~/zipline/</span> <span>{visibleText}</span>
        <span
          className={`px-1.5 ml-1 bg-blue-200 dark:bg-blue-800 transition-all ${
            blinking && visibleText.length !== text.length ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>
      <div className='w-full -mt-2 p-2 font-mono'>
        {visibleOutputLines.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>
      {visibleIdx === outputLines.length && (
        <div className='w-full mt-1 p-2 font-mono'>
          <span className='text-gray-400'>~/zipline/</span>
          <span
            className={`px-1.5 ml-1 bg-blue-200 dark:bg-blue-800 transition-all ${
              blinking && visibleText.length === text.length ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>
      )}
    </MacShell>
  );
}
