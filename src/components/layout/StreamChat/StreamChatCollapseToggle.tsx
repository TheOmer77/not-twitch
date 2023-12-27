'use client';

import type { ComponentPropsWithRef } from 'react';
import { ArrowLeftFromLineIcon, ArrowRightFromLineIcon } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Tooltip } from '@/components/ui/Tooltip';
import { useChatSidebar } from '@/store/useChatSidebar';
import { cn } from '@/lib/utils';

export const StreamChatCollapseToggle = ({
  className,
  ...props
}: ComponentPropsWithRef<typeof Button>) => {
  const { collapsed, setCollapsed } = useChatSidebar();
  const Icon = collapsed ? ArrowLeftFromLineIcon : ArrowRightFromLineIcon;

  return (
    <Tooltip label={collapsed ? 'Expand chat' : 'Collapse chat'} side='left'>
      <Button
        {...props}
        variant='flat'
        size='icon'
        onClick={() => setCollapsed(!collapsed)}
        className={cn('hidden lg:inline-flex', className)}
      >
        <Icon className='h-4 w-4' />
      </Button>
    </Tooltip>
  );
};
