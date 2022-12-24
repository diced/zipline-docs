import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return <div className='max-xl md:max-w-6xl mx-auto px-6 md:px-0'>{children}</div>;
}
