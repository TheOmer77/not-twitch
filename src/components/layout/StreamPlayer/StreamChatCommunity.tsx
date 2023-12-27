import { useParticipants } from '@livekit/components-react';

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
    <ul>
      {participants.map(({ name, identity }) => (
        <li key={identity}>{name}</li>
      ))}
    </ul>
  );
};
