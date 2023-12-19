'use client';

import { useSidebar } from '@/store/useSidebar';
import { useMediaQuery } from '@/hooks';
import { cn } from '@/lib/utils';
import { CollapseToggle } from './CollapseToggle';

export const Sidebar = () => {
  const matchesLg = useMediaQuery('(min-width: 1024px)');
  const collapsed = useSidebar(state => state.collapsed);

  return (
    <aside
      className={cn(
        `fixed start-0 z-20 flex h-full w-80 flex-col items-center border-e
bg-background p-2 shadow`,
        (collapsed || !matchesLg) && 'w-20'
      )}
    >
      <CollapseToggle />
      {!collapsed && matchesLg && <>Sidebar TBD</>}
    </aside>
  );
};
