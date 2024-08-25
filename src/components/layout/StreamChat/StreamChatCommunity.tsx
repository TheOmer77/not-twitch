'use client';

import { useMemo, useState } from 'react';
import { useParticipants } from '@livekit/components-react';
import { SearchIcon } from 'lucide-react';
import type { LocalParticipant, RemoteParticipant } from 'livekit-client';

import { StreamChatParticipant } from './StreamChatParticipant';
import { Input } from '@/components/ui/Input';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { useStream } from '@/hooks';

export const StreamChatCommunity = () => {
  const { isChatEnabled, isChatDisabledOffline, isOnline } = useStream();
  const participants = useParticipants();

  const [value, setValue] = useState('');

  const filteredParticipants = useMemo(
    () =>
      participants
        .reduce(
          (arr, participant) => [
            ...arr,
            ...(!arr.some(p => p.identity === `host-${participant.identity}`)
              ? [participant]
              : []),
          ],
          [] as (RemoteParticipant | LocalParticipant)[]
        )
        .filter(
          ({ name }) => !!name?.toLowerCase().includes(value.toLowerCase())
        ),
    [participants, value]
  );

  return !isChatEnabled ? (
    <p className='flex flex-grow items-center justify-center text-sm text-muted-foreground'>
      This stream&apos;s community is disabled.
    </p>
  ) : !isOnline && isChatDisabledOffline ? (
    <p className='flex flex-grow items-center justify-center text-sm text-muted-foreground'>
      This stream is offline.
    </p>
  ) : (
    <div className='flex flex-col gap-2'>
      <div className='relative w-full'>
        <SearchIcon className='absolute start-3 h-full w-em text-base text-muted-foreground' />
        <Input
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder='Filter participants'
          className='w-full ps-9'
        />
      </div>
      <ScrollArea className='flex-grow' asChild>
        <ul className='flex flex-col gap-px'>
          <li
            key='no-results'
            className='mt-4 hidden w-full text-center text-sm text-muted-foreground last:list-item'
          >
            No results.
          </li>
          {filteredParticipants.map(({ name, identity }) => (
            <StreamChatParticipant key={identity} id={identity} name={name} />
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
};
