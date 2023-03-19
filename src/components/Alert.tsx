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

export default function Alert({ children, type }: AlertProps) {
  const Element = {
    danger: (props: any) => (
      <div
        className='dark:bg-red-900/60 bg-red-200 py-2 px-1 rounded-md border border-red-800 my-8'
        {...props}
      />
    ),
    info: (props: any) => (
      <div
        className='dark:bg-blue-900 bg-blue-200 py-2 px-1 rounded-md border border-blue-800 my-8'
        {...props}
      />
    ),
    note: (props: any) => (
      <div
        className='dark:bg-gray-800/30 bg-gray-100 py-2 px-1 rounded-md border border-gray-800 my-8'
        {...props}
      />
    ),
    tip: (props: any) => (
      <div
        className='dark:bg-green-900/50 bg-green-200 py-2 px-1 rounded-md border border-green-800 my-8'
        {...props}
      />
    ),
    warning: (props: any) => (
      <div
        className='dark:bg-yellow-900/70 bg-yellow-200 py-2 px-1 rounded-md border border-yellow-800 my-8'
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
      <div className='flex dark:text-white text-black items-center mt-1 mx-2'>
        <Icon size={28} />
        <div className='ml-2 font-bold'>{name}</div>
      </div>
      <div className='ml-3'>
        <div>{children}</div>
      </div>
    </Element>
  );
}
