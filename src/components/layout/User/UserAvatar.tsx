import type { ComponentProps } from 'react';
import { cn } from 'cn';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export type UserAvatarProps = Omit<
  ComponentProps<typeof Avatar>,
  'children'
> & {
  username: string;
  imageUrl?: string;
  isLive?: boolean;
};

export const UserAvatar = ({
  imageUrl,
  username,
  isLive,
  className,
  ...props
}: UserAvatarProps) => (
  <Avatar
    {...props}
    className={cn(
      isLive && 'ring-2 ring-destructive ring-offset-2 ring-offset-background',
      className
    )}
  >
    <AvatarImage src={imageUrl} alt={username} />
    <AvatarFallback>{username[0]}</AvatarFallback>
  </Avatar>
);
