import clsx from 'clsx';
import {
  ReactElement,
  ReactNode,
  isValidElement,
  useEffect,
  useState,
} from 'react';
import { createShiki } from './Pre';

const shiki = await createShiki();

function extractCodeInnerHtml(html: string): string {
  const match = html.match(/<code[^>]*>([\s\S]*?)<\/code>/i);
  return match?.[1] ?? '';
}

export default function CodeInline({
  text,
  lang,
}: {
  text: string;
  lang: string;
}) {
  const [highlightedHtml, setHighlightedHtml] = useState('');
  useEffect(() => {
    if (!text?.trim()) {
      setHighlightedHtml('');
      return;
    }

    try {
      const html = shiki.codeToHtml(text, {
        lang,
        themes: {
          light: 'github-light',
          dark: 'github-dark-default',
        },
        defaultColor: false,
      });

      setHighlightedHtml(extractCodeInnerHtml(html));
    } catch {
      setHighlightedHtml('');
    }
  }, [lang, text]);

  return (
    <code
      className={clsx(
        'font-mono px-1 py-0.5 rounded bg-gray-100 dark:bg-gray-800',
        lang,
      )}
      {...(highlightedHtml
        ? { dangerouslySetInnerHTML: { __html: highlightedHtml } }
        : {})}
    >
      {!highlightedHtml ? text : null}
    </code>
  );
}
