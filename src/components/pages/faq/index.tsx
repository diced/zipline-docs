import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Item from './Item';

const items = [
  {
    title: 'Coming soon!',
    content: 'For now enjoy a bunch of things you can click on.',
    id: 'a',
  },
  {
    title: 'Coming soon!',
    content: 'For now enjoy a bunch of things you can click on.',
    id: 'a',
  },
  {
    title: 'Coming soon!',
    content: 'For now enjoy a bunch of things you can click on.',
    id: 'a',
  },
  {
    title: 'Coming soon!',
    content: 'For now enjoy a bunch of things you can click on.',
    id: 'a',
  },
  {
    title: 'Coming soon!',
    content: 'For now enjoy a bunch of things you can click on.',
    id: 'a',
  },
  {
    title: 'Coming soon!',
    content: 'For now enjoy a bunch of things you can click on.',
    id: 'a',
  },
  {
    title: 'Coming soon!',
    content: 'For now enjoy a bunch of things you can click on.',
    id: 'a',
  },
  {
    title: 'Coming soon!',
    content: 'For now enjoy a bunch of things you can click on.',
    id: 'a',
  },
  {
    title: 'Coming soon!',
    content: 'For now enjoy a bunch of things you can click on.',
    id: 'a',
  },
  {
    title: 'Coming soon!',
    content: 'For now enjoy a bunch of things you can click on.',
    id: 'a',
  },
  {
    title: 'Coming soon!',
    content: 'For now enjoy a bunch of things you can click on.',
    id: 'a',
  },
  {
    title: 'Coming soon!',
    content: 'For now enjoy a bunch of things you can click on.',
    id: 'a',
  },
];

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
