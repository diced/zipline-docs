import { ReactNode } from 'react';
import Footer from './Footer';
import Navbar from './Header';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className='flex flex-col'>
      <Navbar />

      <main className='pt-20'>{children}</main>

      <Footer />
    </div>
  );
}
