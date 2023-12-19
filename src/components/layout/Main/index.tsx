'use client';

import { type PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';
import { useSidebar } from '@/store/useSidebar';

export const Main = ({ children }: PropsWithChildren) => {
  const collapsed = useSidebar(state => state.collapsed);

  return (
    <main
      className={cn(
        'mx-auto max-w-3xl p-4',
        !collapsed && 'max-w-6xl ps-[21rem]'
      )}
    >
      {children}
    </main>
  );
};
