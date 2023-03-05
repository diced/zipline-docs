import { IconLoader2 } from '@tabler/icons-react';

export function TextSkeleton() {
  return <div className='w-full my-1 h-4 bg-gray-200 dark:bg-gray-400 rounded-md animate-pulse' />;
}

export default function ReleaseSkeleton() {
  return (
    <div className='my-12 border border-gray-200 dark:border-gray-800 rounded-md p-4'>
      <div className='flex flex-row items-center justify-between'>
        <div className='flex flex-row items-center space-x-4'>
          <div className='w-12 h-12 rounded-md bg-gray-200 dark:bg-gray-800 items-center flex justify-center'>
            <IconLoader2 className='text-gray-500 dark:text-gray-400 animate-spin' size={24} />
          </div>
          <div>
            <div className='font-semibold text-xl w-96'>
              <TextSkeleton />
            </div>
            <div className='text-gray-500 dark:text-gray-400 w-72'>
              <TextSkeleton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
