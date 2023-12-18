'use client';

import { useSidebar } from '@/store/useSidebar';
import { cn } from '@/lib/utils';
import { CollapseToggle } from './CollapseToggle';

export const Sidebar = () => {
  const collapsed = useSidebar(state => state.collapsed);

  return (
    <aside
      className={cn(
        `fixed start-0 z-20 flex h-full w-80 flex-col items-center border-e
bg-background p-2 shadow`,
        collapsed && 'w-20'
      )}
    >
      <CollapseToggle />
      {!collapsed && <>Sidebar TBD</>}
    </aside>
  );
};
