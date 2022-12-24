import { ReactNode } from 'react';

interface CenterProps {
  children: ReactNode;
}

export default function Center({ children }: CenterProps) {
  return <div className='flex justify-center'>{children}</div>;
}
