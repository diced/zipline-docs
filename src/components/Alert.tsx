import { ReactNode } from 'react';
import { AlertTriangle, Bulb, ExclamationMark, Flame } from 'tabler-icons-react';

interface AlertProps {
  children: ReactNode;
  type: 'danger' | 'info' | 'warning' | 'tip' | 'note';
}

export default function Alert({ children, type }: AlertProps) {
  const Element = {
    danger: (props: any) => (
      <div
        className='dark:bg-red-900/50 bg-red-200 py-2 px-1 rounded-md border-l-4 border-red-700 my-8'
        {...props}
      />
    ),
    info: (props: any) => (
      <div
        className='dark:bg-blue-800 bg-blue-200 py-2 px-1 rounded-md border-l-4 border-blue-700 my-8'
        {...props}
      />
    ),
    note: (props: any) => (
      <div
        className='dark:bg-gray-800 bg-gray-100 py-2 px-1 rounded-md border-l-4 border-gray-700 my-8'
        {...props}
      />
    ),
    tip: (props: any) => (
      <div
        className='dark:bg-green-900 bg-green-200 py-2 px-1 rounded-md border-l-4 border-green-700 my-8'
        {...props}
      />
    ),
    warning: (props: any) => (
      <div
        className='dark:bg-yellow-800 bg-yellow-200 py-2 px-1 rounded-md border-l-4 border-yellow-700 my-8'
        {...props}
      />
    ),
  }[type];

  const Icon = {
    danger: Flame,
    info: ExclamationMark,
    note: ExclamationMark,
    tip: Bulb,
    warning: AlertTriangle,
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
      <div className='flex dark:text-white text-black'>
        <Icon size={28} />
        <div className='ml-2 font-bold'>{name}</div>
      </div>
      <div className='ml-3'>
        <div>{children}</div>
      </div>
    </Element>
  );
}
