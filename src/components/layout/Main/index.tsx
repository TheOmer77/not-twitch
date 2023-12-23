'use client';

import { type PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';
import { useSidebar } from '@/store/useSidebar';

export type MainProps = PropsWithChildren<{ full?: boolean }>;

export const Main = ({ full, children }: MainProps) => {
  const collapsed = useSidebar(state => state.collapsed);

  return (
    <main
      className={cn(
        'p-4 ps-24 lg:ps-[21rem]',
        !full && 'mx-auto max-w-6xl',
        collapsed && 'lg:ps-4',
        collapsed && !full && 'lg:max-w-6xl'
      )}
    >
      {children}
    </main>
  );
};
