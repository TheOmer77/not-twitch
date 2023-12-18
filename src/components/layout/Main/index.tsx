'use client';

import { type PropsWithChildren } from 'react';

import { useMediaQuery } from '@/hooks';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/store/useSidebar';

export const Main = ({ children }: PropsWithChildren) => {
  const matchesLg = useMediaQuery('(min-width: 1024px)');
  const collapsed = useSidebar(state => state.collapsed);

  return (
    <main
      className={cn(
        'mx-auto max-w-3xl p-4',
        !collapsed && matchesLg && 'max-w-6xl ps-[21rem]'
      )}
    >
      {children}
    </main>
  );
};
