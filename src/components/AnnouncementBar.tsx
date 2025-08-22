import { IconX } from '@tabler/icons-react';
import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';

export default function AnnouncementBar({
  id,
  children,
  className,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  const lsKey = `announcement-${id}`;

  const [isClosed, setClosed] = useState<boolean | null>(null);

  useEffect(() => {
    const dismissed = localStorage.getItem(lsKey) === 'true';
    setClosed(dismissed);
  }, [lsKey]);

  const handleDismiss = useCallback(() => {
    setClosed(true);
    localStorage.setItem(lsKey, 'true');
  }, [lsKey]);

  if (isClosed === null) {
    return null;
  }

  if (isClosed) {
    return null;
  }

  return (
    <div
      className={clsx(
        'z-50 text-white bg-blue-600 font-bold text-center py-2 flex justify-between items-center',
        className,
      )}
    >
      <div></div>

      <div>{children}</div>

      <button
        onClick={handleDismiss}
        className='text-blue-200 hover:text-blue-300 pr-5'
        data-umami-event='dismiss_announcement'
        data-umami-event-id={id}
        aria-label='dismiss announcement'
      >
        <IconX size='1.2rem' stroke={4} className='pointer-events-none' />
      </button>
    </div>
  );
}
