import clsx from 'clsx';

interface APIBadgeProps {
  type: string;
}

export default function APIBadge({ type }: APIBadgeProps) {
  return (
    <div className='inline-block font-bold text-center rounded-md mr-4'>
      <span
        className={clsx('bg-gray-200 rounded-md py-1/2 px-2', `color-${type}`)}
      >
        {type}
      </span>
    </div>
  );
}
