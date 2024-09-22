import {
  IconAlertCircleFilled,
  IconAlertTriangleFilled,
  IconHelp,
  IconInfoCircleFilled,
} from '@tabler/icons-react';
import clsx from 'clsx';
import { ReactNode } from 'react';

interface AlertProps {
  children: ReactNode;
  type: 'danger' | 'info' | 'warning' | 'note';
}

function BaseAlert({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        'my-2 px-3 py-0.5 border-r-2 border-l-2 rounded-md',
        className,
      )}
    >
      {children}
    </div>
  );
}

export default function Alert({ children, type }: AlertProps) {
  const Element = {
    danger: (props: any) => (
      <BaseAlert
        className='border-red-400 bg-red-200 dark:bg-red-900/40'
        {...props}
      />
    ),
    info: (props: any) => (
      <BaseAlert
        className='border-blue-400 bg-blue-200 dark:bg-blue-900/40'
        {...props}
      />
    ),
    note: (props: any) => (
      <BaseAlert
        className='border-gray-400 bg-gray-100 dark:bg-gray-800/40'
        {...props}
      />
    ),
    warning: (props: any) => (
      <BaseAlert
        className='border-yellow-400 bg-yellow-100 dark:bg-yellow-900/70'
        {...props}
      />
    ),
  }[type];

  const Icon = {
    danger: IconAlertCircleFilled,
    info: IconInfoCircleFilled,
    note: IconHelp,
    warning: IconAlertTriangleFilled,
  }[type];

  const name = {
    danger: 'Danger',
    info: 'Info',
    note: 'Note',
    warning: 'Warning',
  }[type];

  return (
    <Element>
      <div className='flex dark:text-white text-black items-center mt-2'>
        <Icon size={20} />
        <div className='ml-2 font-bold'>{name}</div>
      </div>

      <div>{children}</div>
    </Element>
  );
}
