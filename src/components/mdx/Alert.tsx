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
    <div className={clsx('my-2 px-3 py-0.5 border rounded-md', className)}>
      {children}
    </div>
  );
}

export default function Alert({ children, type }: AlertProps) {
  const Element = {
    danger: (props: any) => (
      <BaseAlert
        className='border-red-700 bg-red-200 dark:bg-red-950/60'
        {...props}
      />
    ),
    info: (props: any) => (
      <BaseAlert
        className='border-blue-600 bg-blue-100 dark:bg-blue-950'
        {...props}
      />
    ),
    note: (props: any) => (
      <BaseAlert
        className='bg-gray-50 dark:bg-gray-900 border-gray-100 dark:border-gray-700'
        {...props}
      />
    ),
    warning: (props: any) => (
      <BaseAlert
        className='border-yellow-700 bg-yellow-100 dark:bg-yellow-900/60'
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
