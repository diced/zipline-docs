'use client';

import { Fragment, type ReactNode } from 'react';

const markPattern = /<mark>(.*?)<\/mark>/g;

export function SearchMarkdown({ children }: { children: string }) {
  const parts: ReactNode[] = [];
  let lastIndex = 0;

  for (const match of children.matchAll(markPattern)) {
    const index = match.index ?? 0;
    if (index > lastIndex) {
      parts.push(children.slice(lastIndex, index));
    }
    parts.push(
      <span key={index} className='text-fd-primary underline'>
        {match[1]}
      </span>,
    );
    lastIndex = index + match[0].length;
  }

  if (lastIndex < children.length) {
    parts.push(children.slice(lastIndex));
  }

  return (
    <p className='min-w-0'>
      {parts.length > 0
        ? parts.map((part, i) => <Fragment key={i}>{part}</Fragment>)
        : children}
    </p>
  );
}
