'use client';

import type { ComponentPropsWithoutRef } from 'react';

import { useMediaQuery } from '@/hooks';
import { useSidebar } from '@/store/useSidebar';
import { cn } from '@/lib/utils';

export const SidebarContent = ({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<'aside'>) => {
  const matchesLg = useMediaQuery('(min-width: 1024px)');
  const collapsed = useSidebar(state => state.collapsed);

  return (
    <aside
      {...props}
      className={cn(
        `fixed start-0 z-20 flex h-full w-80 flex-col items-center gap-1
border-e bg-background p-2 shadow`,
        (collapsed || !matchesLg) && 'w-20',
        className
      )}
    >
      {children}
    </aside>
  );
};
