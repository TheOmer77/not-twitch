'use client';

import { ArrowLeftFromLineIcon, ArrowRightFromLineIcon } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Tooltip } from '@/components/ui/tooltip';
import { useSidebar } from '@/store/useSidebar';
import { cn } from '@/lib/utils';

export const SidebarCollapseToggle = () => {
  const { collapsed, setCollapsed } = useSidebar();

  const Icon = collapsed ? ArrowRightFromLineIcon : ArrowLeftFromLineIcon;

  return (
    <Tooltip label={collapsed ? 'Expand' : 'Collapse'} side='right'>
      <Button
        variant='ghost'
        size='icon'
        onClick={() => setCollapsed(!collapsed)}
        className={cn('hidden lg:flex', !collapsed && 'absolute end-2 top-2')}
      >
        <Icon className='h-4 w-4' />
      </Button>
    </Tooltip>
  );
};
