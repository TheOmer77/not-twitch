'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useChat } from '@livekit/components-react';
import { useEventListener } from 'usehooks-ts';
import { ArrowDownIcon } from 'lucide-react';
import 'scrollyfills';

import { StreamChatMessage } from './StreamChatMessage';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export type StreamChatMessagesProps = {
  isChatEnabled: boolean;
  isChatEnabledOffline: boolean;
  isOnline: boolean;
};

export const StreamChatMessages = ({
  // TODO: Context, no prop drilling
  isChatEnabled,
  isChatEnabledOffline,
  isOnline,
}: StreamChatMessagesProps) => {
  const listRef = useRef<HTMLUListElement>(null);
  const [scrolledToBottom, setScrolledToBottom] = useState(true);
  const { chatMessages } = useChat();
  const messages = useMemo(
    () => [...chatMessages].sort((a, b) => a.timestamp - b.timestamp),
    [chatMessages]
  );

  const scrollToBottom = () => {
    if (!listRef.current) return;
    const { scrollHeight } = listRef.current;
    listRef.current.scrollTop = scrollHeight;
  };

  useEventListener(
    'scrollend',
    () => {
      if (!listRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = listRef.current,
        atBottom = scrollTop + clientHeight >= scrollHeight;
      if (scrolledToBottom !== atBottom) setScrolledToBottom(atBottom);
    },
    listRef
  );

  useEffect(() => {
    if (scrolledToBottom) scrollToBottom();
  }, [messages.length, scrolledToBottom]);

  return !isChatEnabled ? (
    <p
      className='flex flex-grow items-center justify-center text-sm
text-muted-foreground'
    >
      This stream&apos;s chat is disabled.
    </p>
  ) : !isOnline && !isChatEnabledOffline ? (
    <p
      className='flex flex-grow items-center justify-center text-sm
text-muted-foreground'
    >
      This stream is offline.
    </p>
  ) : (
    <div className='relative flex grow flex-col overflow-auto'>
      <ul ref={listRef} className='flex-grow overflow-auto break-words'>
        <li className='mb-2 text-sm text-muted-foreground'>
          Welcome to the chat!
        </li>
        {messages.map(message => (
          <StreamChatMessage
            key={`${message.from?.name}-${message.timestamp}`}
            data={message}
          />
        ))}
      </ul>
      <Button
        onClick={scrollToBottom}
        disabled={scrolledToBottom}
        className={cn(
          `absolute bottom-2 self-center transition-[background-color,opacity]
disabled:opacity-0`,
          scrolledToBottom && 'pointer-events-none'
        )}
      >
        <ArrowDownIcon className='me-2 h-4 w-4' />
        See latest messages
      </Button>
    </div>
  );
};
