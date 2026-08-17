import Link from 'fumadocs-core/link';
import { BookOpen, Home } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/cn';
import { SearchButton } from './home/home-buttons';

export function NotFoundContent({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex flex-1 flex-col items-center justify-center gap-4 px-6 py-24 text-center',
        className,
      )}
    >
      <p className='text-7xl font-black tabular-nums text-blue-400 sm:text-8xl'>404</p>
      <h1 className='text-2xl font-bold sm:text-3xl'>You&apos;re lost</h1>
      <div className='mt-4 flex flex-col gap-3 sm:flex-row'>
        <Link href='/' className={cn(buttonVariants({ color: 'primary', size: 'cta' }), 'gap-2')}>
          <Home className='size-4' />
          Home
        </Link>
        <Link
          href='/docs/get-started'
          className={cn(buttonVariants({ color: 'secondary', size: 'cta' }), 'gap-2')}
        >
          <BookOpen className='size-4' />
          Docs
        </Link>

        <SearchButton />
      </div>
    </div>
  );
}
