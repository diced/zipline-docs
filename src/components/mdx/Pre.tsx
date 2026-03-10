import { IconCheck, IconClipboardCopy } from '@tabler/icons-react';
import clsx from 'clsx';
import {
  ReactElement,
  ReactNode,
  isValidElement,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { createHighlighterCore, createJavaScriptRegexEngine } from 'shiki';
import { variablesTextmateGrammar } from '../../lib/variables-textmate';
import { caddyTextmateGrammar } from '../../lib/caddy-textmate';

export const createShiki = async () =>
  createHighlighterCore({
    langs: [
      import('@shikijs/langs/json'),
      import('@shikijs/langs/javascript'),
      import('@shikijs/langs/typescript'),
      import('@shikijs/langs/bash'),
      import('@shikijs/langs/dotenv'),
      import('@shikijs/langs/shell'),
      import('@shikijs/langs/nginx'),
      import('@shikijs/langs/cpp'),
      import('@shikijs/langs/go'),
      import('@shikijs/langs/http'),
      import('@shikijs/langs/python'),
      import('@shikijs/langs/yaml'),
      variablesTextmateGrammar,
      caddyTextmateGrammar,
    ],
    engine: createJavaScriptRegexEngine(),
    themes: [
      import('@shikijs/themes/github-dark-default'),
      import('@shikijs/themes/github-light'),
    ],
  });

const shiki = await createShiki();

function extractText(node: ReactNode): string {
  if (node == null || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (isValidElement(node)) {
    const element = node as ReactElement<{ children?: ReactNode }>;
    return extractText(element.props.children);
  }

  return '';
}

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
  const className = cN || children?.props?.className;
  const classNameParts = className?.split(' ') || [];
  const match = /language-([\w-]+)/.exec(classNameParts[0] || '');
  const language = match?.[1] || 'text';
  const rawCode = useMemo(() => {
    if (code) return code;

    const text = extractText(children?.props?.children ?? children);
    return text.endsWith('\n') ? text.slice(0, -1) : text;
  }, [children, code]);

  const [highlightedHtml, setHighlightedHtml] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;

    try {
      const html = shiki.codeToHtml(rawCode, {
        lang: language,
        themes: {
          light: 'github-light',
          dark: 'github-dark-default',
        },
        defaultColor: false,
      });

      console.log(html);

      if (!cancelled) {
        setHighlightedHtml(html);
      }
    } catch (e) {
      console.log(e);
      if (!cancelled) {
        setHighlightedHtml('');
      }
    }

    if (!rawCode.trim()) {
      setHighlightedHtml('');
      return;
    }

    return () => {
      cancelled = true;
    };
  }, [language, rawCode]);

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
        <div className='mt-2! mb-0! flex items-center justify-between bg-white shadow-md dark:bg-gray-900 border-b-0 border border-gray-100 dark:border-gray-800 rounded-t-md px-4 py-1'>
          <span className='text-gray-500 dark:text-gray-300 font-mono'>
            {filename}
          </span>
        </div>
      )}

      <div className='relative group mb-2'>
        {highlightedHtml ? (
          <div
            className={clsx(
              'shadow-md scroll-styled border border-gray-100 dark:border-gray-800 rounded-b-md [&_pre]:m-0 [&_pre]:rounded-md [&_pre]:p-4',
              filename
                ? '[&_pre]:rounded-t-none [&_pre]:mt-0'
                : 'rounded-md mt-0',
              ...classNameParts.slice(1),
            )}
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          />
        ) : (
          <pre
            className={clsx(
              'shadow-md scroll-styled border p-4 border-gray-100 dark:border-gray-800 rounded-b-md [&_pre]:m-0 [&_pre]:rounded-md [&_pre]:p-4',
              filename
                ? '[&_pre]:rounded-t-none [&_pre]:mt-0'
                : 'rounded-md mt-0',
              className,
            )}
          >
            {children ? children : <code>{rawCode}</code>}
          </pre>
        )}
        {copy && (
          <button
            className='transition-all duration-200 ease-in-out absolute top-2 right-2 border bg-white dark:bg-[#1e1e1e] border-gray-100 dark:border-gray-800 rounded-md p-1 shadow-md opacity-0 group-hover:opacity-25 hover:opacity-100!'
            onClick={() => {
              navigator.clipboard.writeText(rawCode);
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
