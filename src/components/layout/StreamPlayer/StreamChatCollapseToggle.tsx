'use client';

import { ArrowLeftFromLineIcon, ArrowRightFromLineIcon } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Tooltip } from '@/components/ui/Tooltip';
import { useChatSidebar } from '@/store/useChatSidebar';

export const StreamChatCollapseToggle = () => {
  const { collapsed, setCollapsed } = useChatSidebar();
  const Icon = collapsed ? ArrowLeftFromLineIcon : ArrowRightFromLineIcon;

  return (
    <Tooltip label={collapsed ? 'Expand chat' : 'Collapse chat'} side='left'>
      <Button
        variant='flat'
        size='icon'
        onClick={() => setCollapsed(!collapsed)}
      >
        <Icon className='h-4 w-4' />
      </Button>
    </Tooltip>
  );
};
