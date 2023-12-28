'use client';

import {
  useParticipants,
  useRemoteParticipant,
} from '@livekit/components-react';
import { User2Icon } from 'lucide-react';

import { useStream } from '@/hooks';
import { StreamHeaderActions } from './StreamHeaderActions';

export type StreamHeaderProps = { name: string; imageUrl: string };

export const StreamHeader = ({ name, imageUrl }: StreamHeaderProps) => {
  const { hostId } = useStream();
  const participants = useParticipants(),
    hostParticipant = useRemoteParticipant(hostId);

  const isLive = !!hostParticipant;
  const participantCount = participants.length - 1;

  return (
    <div className='relative px-2 py-4'>
      <div className='mb-2 flex flex-row items-start gap-2'>
        <h1
          className='grow break-words text-xl font-bold tracking-tight
sm:text-2xl'
        >
          {name}
        </h1>
        {isLive && (
          <span
            className='flex h-8 flex-row items-center gap-1 rounded-sm
bg-destructive px-1.5 text-sm font-medium text-destructive-foreground'
          >
            <User2Icon className='h-5 w-5' />
            {participantCount}
          </span>
        )}
      </div>
      <StreamHeaderActions imageUrl={imageUrl} />
    </div>
  );
};
