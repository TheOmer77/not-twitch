'use client';

import { type PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';
import { useSidebar } from '@/store/useSidebar';

export const Main = ({ children }: PropsWithChildren) => {
  const collapsed = useSidebar(state => state.collapsed);

  return (
    <main
      className={cn(
        'mx-auto max-w-6xl p-4 ps-24 lg:ps-[21rem]',
        collapsed && 'lg:max-w-6xl lg:ps-4'
      )}
    >
      {children}
    </main>
  );
};
