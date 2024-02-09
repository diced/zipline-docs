import { IconMenu, IconX } from '@tabler/icons-react';
import { useEffect, useRef } from 'react';
import Headings from '../../Headings';

interface MobileHeadingsMenuProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function MobileHeadingsMenu({ open, setOpen }: MobileHeadingsMenuProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
  }, [open]);

  return (
    <>
      <button
        className='flex items-center text-white transition-colors ease-in-out hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md'
        onClick={() => setOpen(!open)}
      >
        <span className='ml-4 text-gray-400'>On this page</span>
        <IconMenu className='mx-2 text-gray-400' />
      </button>

      {open && (
        <div
          ref={ref}
          className='md:hidden top-0 right-0 left-0 bottom-0 absolute overflow-auto w-screen max-w-[100vw] h-screen z-[999999999] dark:bg-gray-900 bg-white dark:border-gray-700 shadow-md'
        >
          <div className='px-5 py-2 flex items-center justify-between'>
            <div className='flex items-center'>
              <span className='text-3xl font-bold'>Headings</span>
            </div>
            <div className='-mr-2'>
              <button
                className='m-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500'
                onClick={() => setOpen(!open)}
              >
                <span className='sr-only'>Close main menu</span>
                <IconX />
              </button>
            </div>
          </div>
          <div className='px-5 py-2 pb-3 space-y-1'>
            <Headings close={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
