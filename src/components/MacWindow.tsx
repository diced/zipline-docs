import { IconLock, IconRefresh } from '@tabler/icons-react';
import { ReactNode } from 'react';
import MacShell from './MacShell';

export default function MacWindow({ children }: { children: ReactNode }) {
  return (
    <MacShell
      decoration={
        <div className='flex items-center justify-center'>
          <div className='text-sm bg-gray-100/50 dark:bg-gray-800/50 px-4 rounded-md flex flex-row items-center space-x-2'>
            <IconLock className='text-teal-500' size={12} />
            <span className='text-gray-700 dark:text-gray-200'>i.diced.sh</span>
            <IconRefresh className='text-gray-300' size={12} />
          </div>
        </div>
      }
      center={true}
    >
      <div className='w-full mt-1'>{children}</div>
    </MacShell>
  );
}
