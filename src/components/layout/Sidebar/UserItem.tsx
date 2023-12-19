import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
  const pathname = usePathname();
  const sidebarCollapsed = useSidebar(state => state.collapsed);

  const href = `/user/${username}`;
  const isActive = pathname === href;

  return (
    <Button
      asChild
      variant='ghost'
      size={sidebarCollapsed ? 'icon' : 'default'}
      className={cn(
        'gap-2',
        isActive && 'bg-accent',
        !sidebarCollapsed && 'justify-start'
      )}
    >
      <Link href={href}>
        <Avatar className='h-8 w-8'>
          <AvatarImage src={imageUrl} alt={username} />
          <AvatarFallback>{username[0]}</AvatarFallback>
        </Avatar>
        {!sidebarCollapsed && <span>{username}</span>}
      </Link>
    </Button>
  );
};
