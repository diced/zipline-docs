import { IconLink } from '@tabler/icons-react';
import Link from 'next/link';

export function Heading({
  level,
  id,
  children,
}: {
  level: number;
  id: string;
  children: React.ReactNode;
}) {
  const HeadingTag = {
    1: 'h1',
    2: 'h2',
    3: 'h3',
    4: 'h4',
  }[level] as 'h1' | 'h2' | 'h3' | 'h4';

  return (
    <Link href={`#${id}`} className='no-underline'>
      <HeadingTag
        id={id}
        className='flex items-center group hover:text-blue-400 transition-colors duration-200 ease-in-out'
      >
        {children}

        <IconLink
          className='opacity-0 group-hover:opacity-100 ml-2 text-blue-400'
          size='1.25rem'
        />
      </HeadingTag>
    </Link>
  );
}
