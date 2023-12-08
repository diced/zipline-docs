import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return <div className='max-w-xl md:max-w-6xl mx-auto md:px-0'>{children}</div>;
}
