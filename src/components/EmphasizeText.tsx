import { ReactNode } from 'react';

export default function EmphasizeText({ children }: { children: ReactNode }) {
  return (
    <span className='transition-all hover:text-4xl duration-500 ease-in-out bg-clip-text from-purple-500 via-blue-400 to-purple-500 text-transparent bg-gradient-to-r bg-pos-0 bg-size-200 hover:bg-pos-100'>
      {children}
    </span>
  );
}
