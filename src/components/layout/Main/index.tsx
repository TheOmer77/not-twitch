'use client';

import { type ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/utils';

export type MainProps = ComponentPropsWithoutRef<'main'> & { full?: boolean };

export const Main = ({ full, className, children, ...props }: MainProps) => (
  <main
    {...props}
    className={cn(
      'p-4 ps-24 lg:ps-[21rem]',
      !full && 'mx-auto max-w-6xl',
      className
    )}
  >
    {children}
  </main>
);
