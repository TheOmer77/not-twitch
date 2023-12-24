'use client';

import { type PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

export type MainProps = PropsWithChildren<{ full?: boolean }>;

export const Main = ({ full, children }: MainProps) => (
  <main className={cn('p-4 ps-24 lg:ps-[21rem]', !full && 'mx-auto max-w-6xl')}>
    {children}
  </main>
);
