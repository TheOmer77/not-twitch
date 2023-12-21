import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/utils';

export const SidebarSkeletonBase = ({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<'aside'>) => (
  <aside
    {...props}
    className={cn(
      `fixed start-0 z-20 flex h-full w-20 flex-col items-center gap-1 border-e
bg-card p-2 shadow lg:w-80`,
      className
    )}
  >
    {children}
  </aside>
);
