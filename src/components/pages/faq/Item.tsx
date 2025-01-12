import { IconChevronRight } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react';

interface ItemProps {
  title: any;
  children: any;
  id: string;
}

export default function Item({ title, children, id }: ItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      id={`faq-${id}`}
      onClick={() => setOpen(!open)}
      className='w-full my-12 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 dark:bg-gray-900 shadow-md hover:shadow-lg rounded-md p-4 transition-all ease-in-out cursor-pointer'
    >
      {/* todo: faq with headlessui */}
    </div>
  );
}
