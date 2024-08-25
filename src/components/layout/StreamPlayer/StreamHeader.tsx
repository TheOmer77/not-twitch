'use client';

import {
  useParticipants,
  useRemoteParticipant,
} from '@livekit/components-react';
import { User2Icon } from 'lucide-react';

import { StreamHeaderUser, StreamHeaderUserSkeleton } from './StreamHeaderUser';
import { StreamInfoDialog } from './StreamInfoDialog';
import { Skeleton } from '@/components/ui/Skeleton';
import { useStream } from '@/hooks';
import { cn } from '@/lib/utils';

export type StreamHeaderProps = { imageUrl: string };

export const StreamHeader = ({ imageUrl }: StreamHeaderProps) => {
  const { hostId, title, thumbnailUrl } = useStream();
  const participants = useParticipants(),
    hostParticipant = useRemoteParticipant(hostId);

  const isLive = !!hostParticipant;
  const participantCount = participants.length - 1;

  return (
    <div className='relative px-2 py-4'>
      <div className='mb-2 flex flex-row items-start gap-2'>
        <h1 className='grow break-words text-xl font-bold tracking-tight sm:text-2xl'>
          {title}
        </h1>
        <span
          className={cn(
            `flex h-10 select-none flex-row items-center gap-1 text-sm font-medium uppercase`,
            isLive ? 'text-destructive' : 'text-muted-foreground'
          )}
        >
          {isLive && <User2Icon className='h-5 w-5' />}
          {isLive ? participantCount : 'Offline'}
        </span>
        <StreamInfoDialog initialThumbnailUrl={thumbnailUrl} />
      </div>
      <StreamHeaderUser imageUrl={imageUrl} />
    </div>
  );
};

export const StreamHeaderSkeleton = () => (
  <div className='relative px-2 py-4'>
    <Skeleton className='mb-3 mt-1 h-em grow break-words text-xl sm:text-2xl' />
    <StreamHeaderUserSkeleton />
  </div>
);
