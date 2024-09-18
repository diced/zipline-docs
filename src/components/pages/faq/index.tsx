import Link from 'next/link';
import { ReactNode } from 'react';
import Item from './Item';
import Image from 'next/image';

import ghChooseIssue from '../../../../public/faq/gh-choose-issue.png';
import ghNewDisc from '../../../../public/faq/gh-new-disc.png';

export function Ref(props: { href: string; children: ReactNode }) {
  return (
    <Link
      className='decoration-blue-400 underline hover:decoration-2'
      {...props}
    />
  );
}

export function Code(props: { children: ReactNode }) {
  return (
    <code
      className='bg-gray-50 rounded-md px-1 font-normal dark:bg-gray-700'
      {...props}
    />
  );
}

export function Img(props: { src: any; alt: string }) {
  return <Image placeholder='blur' className='rounded-md' {...props} />;
}

const items: {
  title: string;
  content: ReactNode;
  id: string;
}[] = [];

export default function FAQPage() {
  return (
    <>
      {items.map((item, i) => (
        <Item key={i} title={item.title} id={item.id}>
          {item.content}
        </Item>
      ))}
    </>
  );
}
