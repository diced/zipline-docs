import { IconChevronDown } from '@tabler/icons-react';
import clsx from 'clsx';
import { useState } from 'react';

export default function TimezoneCollapse() {
  const [open, setOpen] = useState(false);
  const timezones = Intl.supportedValuesOf('timeZone').map((tz) =>
    tz.split('/'),
  );

  return (
    <>
      <div className='flex-col items-center justify-between mb-12'>
        <button
          className='flex items-center space-x-2 p-1 rounded-md'
          onClick={() => setOpen(!open)}
        >
          <span className='text-gray-200 dark:text-gray-500'>
            View Timezones
          </span>

          <IconChevronDown
            className={clsx(
              'w-5 h-5 text-gray-200 dark:text-gray-500 transition-transform transform',
              open && 'rotate-180',
            )}
          />
        </button>

        <div
          className={clsx(
            'overflow-auto transition-all max-h-0',
            open && 'max-h-400',
          )}
        >
          <div className=''>
            {timezones.map((tz, i) => (
              <p key={i}>
                <span className='text-gray-800 dark:text-gray-200'>
                  {tz[0]}
                </span>
                {'/'}
                <span className='text-gray-500 dark:text-gray-400'>
                  {tz[1]}
                </span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
