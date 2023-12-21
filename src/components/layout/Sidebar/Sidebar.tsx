'use client';

import {
  useEffect,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';

import { useIsClient, useMediaQuery } from '@/hooks';
import { useSidebar } from '@/store/useSidebar';
import { cn } from '@/lib/utils';

export type SidebarProps = ComponentPropsWithoutRef<'aside'> & {
  skeleton?: ReactNode;
};

export const Sidebar = ({
  skeleton = null,
  className,
  children,
  ...props
}: SidebarProps) => {
  const isClient = useIsClient();
  const matchesLg = useMediaQuery('(min-width: 1024px)');
  const { collapsed, setCollapsed } = useSidebar();

  useEffect(() => {
    setCollapsed(!matchesLg);
  }, [matchesLg, setCollapsed]);

  if (!isClient) return skeleton;

  return (
    <aside
      {...props}
      className={cn(
        `fixed start-0 z-20 flex h-full w-80 flex-col items-center gap-1
border-e bg-card p-2 shadow`,
        collapsed && 'w-20',
        className
      )}
    >
      {children}
    </aside>
  );
};
