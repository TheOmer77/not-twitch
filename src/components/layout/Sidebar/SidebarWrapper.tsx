'use client';

import type { PropsWithChildren } from 'react';

import { useMediaQuery } from '@/hooks';
import { useSidebar } from '@/store/useSidebar';
import { cn } from '@/lib/utils';

export const SidebarWrapper = ({ children }: PropsWithChildren) => {
  const matchesLg = useMediaQuery('(min-width: 1024px)');
  const collapsed = useSidebar(state => state.collapsed);

  return (
    <aside
      className={cn(
        `fixed start-0 z-20 flex h-full w-80 flex-col items-center border-e
bg-background p-2 shadow`,
        (collapsed || !matchesLg) && 'w-20 gap-1'
      )}
    >
      {children}
    </aside>
  );
};
