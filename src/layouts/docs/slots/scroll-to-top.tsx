'use client';

import { ArrowUp } from 'lucide-react';
import { useIsScrollTop } from 'fumadocs-ui/utils/use-is-scroll-top';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/cn';
import { useIsMounted } from '@/lib/use-is-mounted';

export function DocsScrollToTop() {
  const isTop = useIsScrollTop({ enabled: true });
  const mounted = useIsMounted();
  const visible = mounted && isTop === false;

  return (
    <button
      type='button'
      aria-label='Scroll to top'
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={cn(
        buttonVariants({ color: 'secondary', size: 'icon' }),
        'fixed bottom-6 end-6 z-50 border shadow-md transition-[opacity,translate] duration-200 xl:layout:end-[calc(var(--fd-toc-width,0px)+1.5rem)]',
        visible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-2 opacity-0',
      )}
    >
      <ArrowUp className='size-5' />
    </button>
  );
}
