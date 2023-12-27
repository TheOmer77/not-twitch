import { User2Icon } from 'lucide-react';

import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { useStream } from '@/hooks';

export type StreamHeaderProps = { name: string; imageUrl: string };

export const StreamHeader = ({ name, imageUrl }: StreamHeaderProps) => {
  const { hostId, hostName, isFollowing, viewerId } = useStream();

  return (
    <div className='relative px-2 py-4'>
      <div className='mb-2 flex flex-row items-start gap-2'>
        <h1
          className='grow break-words text-xl font-bold tracking-tight
sm:text-2xl'
        >
          {name}
        </h1>
        {/* TODO: Number of viewers
        For now, using dummy number */}
        <span
          className='flex h-8 flex-row items-center gap-1 rounded-sm
bg-destructive px-1.5 text-sm font-medium text-destructive-foreground'
        >
          <User2Icon className='h-5 w-5' />
          69
        </span>
      </div>
      <div className='flex h-10 flex-row items-center gap-2'>
        <Avatar src={imageUrl} />
        <span className='grow text-sm font-semibold'>{hostName}</span>
        {viewerId !== `host-${hostId}` && (
          <Button variant={isFollowing ? 'default' : 'primary'}>
            {isFollowing ? 'Unfollow' : 'Follow'}
          </Button>
        )}
      </div>
    </div>
  );
};
