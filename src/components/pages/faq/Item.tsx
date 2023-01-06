import { motion } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';
import { ChevronRight } from 'tabler-icons-react';

interface ItemProps {
  title: string;
  children: ReactNode;
  id: string;
}

export default function Item({ title, children, id }: ItemProps) {
  const [open, setOpen] = useState(false);

  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <div
      id={`faq-${id}`}
      onClick={() => setOpen(!open)}
      className='w-full my-12 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 dark:bg-gray-900 shadow-md hover:shadow-lg rounded-md p-4 transition-all ease-in-out cursor-pointer'
    >
      <button className='flex w-full items-center justify-between' onClick={() => setOpen(!open)}>
        <div className='font-semibold text-2xl'>{title}</div>
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

      {/* {mounted && ( */}
      <motion.div
        animate={!mounted ? 'closed' : open ? 'open' : 'closed'}
        variants={{
          open: { opacity: 1, height: 'auto' },
          closed: { opacity: 0, height: 0 },
        }}
        transition={{ duration: 0.2 }}
        className='overflow-hidden'
      >
        <p className='text-lg mt-6'>{children}</p>
      </motion.div>
      {/* )} */}
    </div>
  );
}
