'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
  type FormEventHandler,
} from 'react';
import {
  useChat,
  useConnectionState,
  useRemoteParticipant,
} from '@livekit/components-react';
import { ConnectionState } from 'livekit-client';
import { useMediaQuery } from 'usehooks-ts';

import { StreamChatHeader, StreamChatHeaderSkeleton } from './StreamChatHeader';
import { Input } from '@/components/ui/Input';
import { useChatSidebar } from '@/store/useChatSidebar';
import { Card } from '@/components/ui/Card';

export type StreamChatProps = {
  viewerName: string;
  hostName: string;
  hostId: string;
  isFollowing: boolean;
  isChatEnabled: boolean;
  isChatDelayed: boolean;
  isChatFollowersOnly: boolean;
};

export const StreamChat = ({
  viewerName,
  hostName,
  hostId,
  isFollowing,
  isChatEnabled,
  isChatDelayed,
  isChatFollowersOnly,
}: StreamChatProps) => {
  const matchesLg = useMediaQuery('(min-width: 1024px)');
  const { variant, setCollapsed } = useChatSidebar();
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostId);

  const [value, setValue] = useState('');
  const [isSending, startTransition] = useTransition();
  const { chatMessages: messages, send } = useChat();

  const isOnline = participant && connectionState === ConnectionState.Connected;
  const isHidden = !isChatEnabled || !isOnline;

  const reversedMessages = useMemo(
    () => [...messages].sort((a, b) => a.timestamp - b.timestamp),
    [messages]
  );

  const handleSubmit = useCallback<FormEventHandler>(
    e => {
      e.preventDefault();
      if (!send) return;

      startTransition(async () => {
        send(value);
        setValue('');
      });
    },
    [send, value]
  );

  useEffect(() => {
    setCollapsed(!matchesLg);
  }, [matchesLg, setCollapsed]);

  return (
    <Card className='flex h-[calc(100vh-6rem)] flex-col gap-2 p-2'>
      <StreamChatHeader />
      <div className='grow'>
        <span className='text-sm text-muted-foreground'>Actual chat TBD</span>
      </div>
      <form onSubmit={handleSubmit}>
        <Input
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder='Send a message...'
        />
      </form>
    </Card>
  );
};
