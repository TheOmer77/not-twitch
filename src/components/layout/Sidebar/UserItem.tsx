import type { User } from '@prisma/client';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSidebar } from '@/store/useSidebar';
import { cn } from '@/lib/utils';

export type UserItemProps = {
  username: string;
  imageUrl?: string;
  isLive?: boolean;
};

export const UserItem = ({ username, imageUrl, isLive }: UserItemProps) => {
  const collapsed = useSidebar(state => state.collapsed);

  return (
    <Button
      variant='ghost'
      size={collapsed ? 'icon' : 'default'}
      className={cn('gap-2', !collapsed && 'justify-start')}
    >
      <Avatar className='h-8 w-8'>
        <AvatarImage src={imageUrl} alt={username} />
        <AvatarFallback>{username[0]}</AvatarFallback>
      </Avatar>
      {!collapsed && <span>{username}</span>}
    </Button>
  );
};
