import { ReactNode } from 'react';

export default function EmphasizeText({ children }: { children: ReactNode }) {
  return (
    <span className='bg-clip-text from-purple-500 via-blue-400 to-purple-500 text-transparent bg-linear-to-r bg-pos-0 bg-size-200 transition-all ease-in-out hover:animate-[gradient-spin_3s_linear_infinite]'>
      {children}
    </span>
  );
}
