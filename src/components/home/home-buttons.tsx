'use client';

import Link from 'fumadocs-core/link';
import { Heart, Search, Star } from 'lucide-react';
import { useSearchContext } from 'fumadocs-ui/contexts/search';
import { type ButtonProps, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/cn';

function homeButtonsClass(color: NonNullable<ButtonProps['color']> = 'primary', className?: string) {
  return cn(buttonVariants({ color, size: 'cta' }), 'w-full md:w-auto', className);
}

export function SearchButton({ hideIfDisabled }: { hideIfDisabled?: boolean }) {
  const { setOpenSearch, enabled } = useSearchContext();
  if (hideIfDisabled && !enabled) return null;

  return (
    <button
      type='button'
      aria-label='Search documentation'
      className={homeButtonsClass('secondary')}
      onClick={() => setOpenSearch(true)}
    >
      <Search className='size-4' />
      Search docs
    </button>
  );
}

export function HomeButtons({ stars, showSearch }: { stars: number; showSearch?: boolean }) {
  const formattedStars = new Intl.NumberFormat('en', {
    notation: 'compact',
  }).format(stars || 1600);

  return (
    <div className='mt-8 flex flex-col items-center justify-center space-y-4 md:flex-row md:space-y-0 md:space-x-6'>
      <Link href='/docs/get-started' className={homeButtonsClass('primary')}>
        Get started
      </Link>

      {showSearch ? (
        <SearchButton hideIfDisabled />
      ) : (
        <Link href='https://github.com/diced/zipline' className={homeButtonsClass('secondary', 'group')}>
          GitHub
          <Star className='size-4 transition-colors group-hover:fill-yellow-500' />
          <span className='text-sm'>{formattedStars}</span>
        </Link>
      )}
    </div>
  );
}

export function GithubStarsButton({ stars }: { stars?: number }) {
  const formattedStars = new Intl.NumberFormat('en', {
    notation: 'compact',
  }).format(stars ?? 1600);

  return (
    <Link href='https://github.com/diced/zipline' className={homeButtonsClass('primary', 'group max-w-sm')}>
      GitHub
      <Star className='size-4 transition-colors group-hover:fill-yellow-500' />
      <span className='text-sm'>{formattedStars}</span>
    </Link>
  );
}

export function SponsorButton() {
  return (
    <Link href='https://github.com/sponsors/diced' className={homeButtonsClass('primary', 'group max-w-sm')}>
      Sponsor on GitHub
      <Heart className='size-4 transition-colors group-hover:fill-red-400' />
    </Link>
  );
}
