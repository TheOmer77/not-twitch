'use client';

import { useMemo } from 'react';
import { useChat } from '@livekit/components-react';

import { StreamChatMessage } from './StreamChatMessage';

export type StreamChatMessagesProps = {
  isChatEnabled: boolean;
  isOnline: boolean;
};

export const StreamChatMessages = ({
  // TODO: Context, no prop drilling
  isChatEnabled,
  isOnline,
}: StreamChatMessagesProps) => {
  const { chatMessages } = useChat();
  const messages = useMemo(
    () => [...chatMessages].sort((a, b) => a.timestamp - b.timestamp),
    [chatMessages]
  );

  return !isOnline ? (
    <p
      className='flex flex-grow items-center justify-center text-sm
text-muted-foreground'
    >
      This stream is offline.
    </p>
  ) : !isChatEnabled ? (
    <p
      className='flex flex-grow items-center justify-center text-sm
text-muted-foreground'
    >
      This stream&apos;s chat is disabled.
    </p>
  ) : (
    <div className='grow overflow-auto break-words'>
      <p className='mb-2 text-sm text-muted-foreground'>Welcome to the chat!</p>
      {messages.map(message => (
        <StreamChatMessage
          key={`${message.from?.name}-${message.timestamp}`}
          data={message}
        />
      ))}
    </div>
  );
};
