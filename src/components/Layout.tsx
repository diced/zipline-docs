import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import Footer from './Footer';
import Navbar from './Header';
import clsx from 'clsx';

interface LayoutProps {
  children: ReactNode;
  inter: ReturnType<typeof Inter>;
}

export default function Layout({ children, inter }: LayoutProps) {
  return (
    <div className={clsx(inter.className, 'flex flex-col')}>
      <Navbar />

      <main className='pt-20'>{children}</main>

      <Footer />
    </div>
  );
}
