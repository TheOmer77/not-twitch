'use client';

import { useEffect, type ComponentPropsWithoutRef } from 'react';

import { SidebarUserListSkeleton } from './SidebarUserList';
import { useIsClient, useMediaQuery } from '@/hooks';
import { useSidebar } from '@/store/useSidebar';
import { cn } from '@/lib/utils';

export const SidebarContent = ({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<'aside'>) => {
  const isClient = useIsClient();
  const matchesLg = useMediaQuery('(min-width: 1024px)');
  const { collapsed, setCollapsed } = useSidebar();

  useEffect(() => {
    setCollapsed(!matchesLg);
  }, [matchesLg, setCollapsed]);

  if (!isClient)
    return (
      <aside
        {...props}
        className={cn(
          `fixed start-0 z-20 flex h-full w-20 flex-col items-center gap-1
border-e bg-background p-2 shadow lg:w-80`,
          className
        )}
      >
        <SidebarUserListSkeleton />
        <SidebarUserListSkeleton />
      </aside>
    );

  return (
    <aside
      {...props}
      className={cn(
        `fixed start-0 z-20 flex h-full w-80 flex-col items-center gap-1
border-e bg-background p-2 shadow`,
        collapsed && 'w-20',
        className
      )}
    >
      {children}
    </aside>
  );
};
