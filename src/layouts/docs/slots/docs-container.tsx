'use client';

import type { ComponentProps } from 'react';
import { Container } from 'fumadocs-ui/layouts/docs/slots/container';
import { SiteHeader } from '@/layouts/shared/slots/site-header';
import { cn } from '@/lib/cn';

export function DocsContainerWithNav(props: ComponentProps<typeof Container>) {
  return (
    <div className="flex h-dvh flex-col [--fd-site-nav-height:3.5rem]">
      <SiteHeader />
      <Container
        {...props}
        className={cn('min-h-0 flex-1 [--fd-docs-height:100%]', props.className)}
      />
    </div>
  );
}
