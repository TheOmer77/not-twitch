import type { UserItemProps } from './UserItem';
import { Avatar } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

export const UserAvatar = ({ imageUrl, username, isLive }: UserItemProps) => (
  <Avatar
    src={imageUrl}
    alt={username}
    fallback={username[0]}
    className={cn(
      isLive &&
        `ring-2 ring-red-600 ring-offset-2 ring-offset-white
dark:ring-red-400 dark:ring-offset-slate-950`
    )}
  />
);
