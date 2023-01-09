import { motion } from 'framer-motion';
import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react';
import { ChevronRight } from 'tabler-icons-react';

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
      <button className='flex w-full items-center justify-between' onClick={() => setOpen(!open)}>
        <div className='font-semibold text-2xl group'>
          {title}

          <Link
            href={`#faq-${id}`}
            className='opacity-0 group-hover:opacity-100 transition-all text-gray-400 hover:text-gray-200 text-sm ml-2'
          >
            Link to this FAQ
          </Link>
        </div>
        <div
          className='transition-colors ease-in-out hover:bg-gray-800 rounded-md cursor-pointer'
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <motion.div animate={{ rotate: 90 }}>
              <ChevronRight size={24} />
            </motion.div>
          ) : (
            <motion.div animate={{ rotate: 0 }}>
              <ChevronRight size={24} />
            </motion.div>
          )}
        </div>
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.1 }}
          className='mt-4'
        >
          <p className='text-lg mt-6'>{children}</p>
        </motion.div>
      )}
    </div>
  );
}
