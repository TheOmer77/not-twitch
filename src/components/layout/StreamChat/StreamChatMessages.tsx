'use client';

import { useEffect, useMemo, useRef, useState, type ElementRef } from 'react';
import dynamic from 'next/dynamic';
import { useEventListener } from 'usehooks-ts';
import { ArrowDownIcon } from 'lucide-react';

import { StreamChatMessage } from './StreamChatMessage';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { useStream } from '@/hooks';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/ScrollArea';

//@ts-expect-error This polyfill doesn't really need TS definitions
dynamic(() => import('scrollyfills'), { ssr: false });

export const StreamChatMessages = () => {
  const scrollAreaRef = useRef<ElementRef<typeof ScrollArea>>(null);
  const [scrolledToBottom, setScrolledToBottom] = useState(true);
  const { chatMessages, isChatEnabled, isChatEnabledOffline, isOnline } =
    useStream();
  const messages = useMemo(
    () => [...chatMessages].sort((a, b) => a.timestamp - b.timestamp),
    [chatMessages]
  );

  const scrollToBottom = () => {
    if (!scrollAreaRef.current) return;
    const { scrollHeight } = scrollAreaRef.current;
    scrollAreaRef.current.scrollTop = scrollHeight;
  };

  useEventListener(
    'scrollend',
    () => {
      if (!scrollAreaRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = scrollAreaRef.current,
        atBottom = scrollTop + clientHeight >= scrollHeight;
      if (scrolledToBottom !== atBottom) setScrolledToBottom(atBottom);
    },
    scrollAreaRef
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
    <ScrollArea
      viewportRef={scrollAreaRef}
      className='relative flex flex-grow flex-col'
    >
      <ul className='flex-grow break-words'>
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
      <div
        className={cn(
          `absolute bottom-2 flex w-full flex-row justify-center
transition-opacity`,
          scrolledToBottom && 'pointer-events-none opacity-0'
        )}
      >
        <Button onClick={scrollToBottom}>
          <ArrowDownIcon className='me-2 h-4 w-4' />
          See latest messages
        </Button>
      </div>
    </ScrollArea>
  );
};

export const StreamChatMessagesSkeleton = () => (
  <div className='flex flex-grow flex-col'>
    <Skeleton className='h-5 w-1/2' />
  </div>
);
