'use client';

import { useParticipants } from '@livekit/components-react';

import { StreamChatParticipant } from './StreamChatParticipant';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { useStream } from '@/hooks';

export const StreamChatCommunity = () => {
  const { isChatEnabled, isChatEnabledOffline, isOnline } = useStream();
  const participants = useParticipants();

  return !isChatEnabled ? (
    <p
      className='flex flex-grow items-center justify-center text-sm
text-muted-foreground'
    >
      This stream&apos;s community is disabled.
    </p>
  ) : !isOnline && !isChatEnabledOffline ? (
    <p
      className='flex flex-grow items-center justify-center text-sm
text-muted-foreground'
    >
      This stream is offline.
    </p>
  ) : (
    <div className='flex flex-col gap-2'>
      <ScrollArea className='flex-grow' asChild>
        <ul className='flex flex-col gap-px'>
          <li
            key='no-results'
            className='last: hidden w-full text-center text-sm text-muted-foreground'
          >
            No results.
          </li>
          {participants.map(({ name, identity }) => (
            <StreamChatParticipant key={identity} id={identity} name={name} />
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
};
