import { IconCheck, IconClipboardCopy } from '@tabler/icons-react';
import clsx from 'clsx';
import { useTheme } from 'next-themes';
import { Highlight, themes } from 'prism-react-renderer';
import { useEffect, useState } from 'react';

export default function Pre({
  children,
  copy,
  filename,
  code,
  className: cN,
}: {
  children?: any;
  copy?: boolean;
  filename?: string;
  code?: string;
  className?: string;
}) {
  const { theme } = useTheme();
  const className = cN ?? children?.props?.className;
  const match = /language-(\w+)/.exec(className || '');

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [copied]);

  return (
    <>
      {filename && (
        <div className='flex items-center justify-between bg-white shadow-md dark:bg-gray-900 border-b-[0px] border-[1px] border-gray-100 dark:border-gray-800 rounded-t-md px-4 py-1'>
          <span className='text-gray-500 dark:text-gray-300 font-mono'>
            {filename}
          </span>
        </div>
      )}

      <div className='relative group'>
        <Highlight
          code={code ?? children.props.children.slice(0, -1)}
          language={match ? match[1] : 'text'}
          theme={theme === 'light' ? themes.oneLight : themes.oneDark}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={clsx(
                'shadow-md scroll-styled bg-white dark:bg-gray-900 border-[1px] border-gray-100 dark:border-gray-800',
                filename && 'rounded-t-none mt-0',
                className,
              )}
              style={{
                ...style,
                backgroundColor: undefined,
              }}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {line.map((token, j) => (
                    <span key={j} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
        {copy && (
          <button
            className='transition-all duration-200 ease-in-out absolute top-2 right-2 border-[1px] bg-white dark:bg-[#1e1e1e] border-gray-100 dark:border-gray-800 rounded-md p-1 shadow-md opacity-0 group-hover:opacity-100'
            onClick={() => {
              navigator.clipboard.writeText(
                code ?? children.props.children.slice(0, -1),
              );
              setCopied(true);
            }}
          >
            {copied ? (
              <IconCheck size='1.25rem' className='text-green-600' />
            ) : (
              <IconClipboardCopy size='1.25rem' />
            )}
          </button>
        )}
      </div>
    </>
  );
}
