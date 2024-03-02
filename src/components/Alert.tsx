import {
  IconAlertCircleFilled,
  IconAlertTriangleFilled,
  IconExclamationCircle,
  IconHelp,
  IconInfoCircleFilled,
} from '@tabler/icons-react';
import { ReactNode } from 'react';

interface AlertProps {
  children: ReactNode;
  type: 'danger' | 'info' | 'warning' | 'tip' | 'note';
}

// inspired by remix.run docs alerts

export default function Alert({ children, type }: AlertProps) {
  const Element = {
    danger: (props: any) => (
      <div
        className='my-1 px-3 py-1 border-r-2 border-l-2 rounded-md border-red-400 bg-red-200 dark:bg-red-900/40'
        {...props}
      />
    ),
    info: (props: any) => (
      <div
        className='my-1 px-3 py-1 border-r-2 border-l-2 rounded-md border-blue-400 bg-blue-200 dark:bg-blue-900/40'
        {...props}
      />
    ),
    note: (props: any) => (
      <div
        className='my-1 px-3 py-1 border-r-2 border-l-2 rounded-md border-gray-400 bg-gray-100 dark:bg-gray-800/40'
        {...props}
      />
    ),
    tip: (props: any) => (
      <div
        className='my-1 px-3 py-1 border-r-2 border-l-2 rounded-md border-green-400 bg-green-100 dark:bg-green-900/40'
        {...props}
      />
    ),
    warning: (props: any) => (
      <div
        className='my-1 px-3 py-1 border-r-2 border-l-2 rounded-md border-yellow-400 bg-yellow-100 dark:bg-yellow-900/70'
        {...props}
      />
    ),
  }[type];

  const Icon = {
    danger: IconAlertCircleFilled,
    info: IconInfoCircleFilled,
    note: IconExclamationCircle,
    tip: IconHelp,
    warning: IconAlertTriangleFilled,
  }[type];

  const name = {
    danger: 'Danger',
    info: 'Info',
    note: 'Note',
    tip: 'Tip',
    warning: 'Warning',
  }[type];

  return (
    <Element>
      <div className='flex dark:text-white text-black items-center'>
        <Icon size={20} />
        <div className='ml-2 font-bold'>{name}</div>
      </div>

      <div>{children}</div>
    </Element>
  );
}
