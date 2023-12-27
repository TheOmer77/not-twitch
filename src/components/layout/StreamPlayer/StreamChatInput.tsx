'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
  type FormEventHandler,
} from 'react';
import { useChat } from '@livekit/components-react';
import { InfoIcon } from 'lucide-react';

import { Input } from '@/components/ui/Input';
import { Skeleton } from '@/components/ui/Skeleton';
import { Tooltip } from '@/components/ui/Tooltip';
import { useStream } from '@/hooks';

export const StreamChatInput = () => {
  const [value, setValue] = useState(''),
    [isDelayBlocked, setIsDelayBlocked] = useState(false),
    [justSent, setJustSent] = useState(false);
  const [isSending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    isOnline,
    isChatEnabled,
    isChatEnabledOffline,
    isChatFollowersOnly,
    isChatDelayed,
    isFollowing,
  } = useStream();
  const { send } = useChat();

  const disabled =
    isSending || isDelayBlocked || (isChatFollowersOnly && !isFollowing);

  const infoMsg = useMemo(
      () =>
        isChatDelayed && isChatFollowersOnly
          ? 'Followers only & slow mode'
          : isChatDelayed
            ? 'Slow mode'
            : isChatFollowersOnly
              ? 'Followers only'
              : null,
      [isChatDelayed, isChatFollowersOnly]
    ),
    infoTooltip = useMemo(
      () =>
        isChatDelayed && isChatFollowersOnly
          ? 'Messages can only be sent every 3 seconds, by followers only.'
          : isChatDelayed
            ? 'Messages can only be sent every 3 seconds.'
            : isChatFollowersOnly
              ? 'Only followers can chat.'
              : null,
      [isChatDelayed, isChatFollowersOnly]
    );

  const handleSubmit = useCallback<FormEventHandler>(
    e => {
      e.preventDefault();
      e.stopPropagation();
      if (!send || value.length < 1) return;

      const submitMessage = async () => {
        setJustSent(true);
        await send(value);
        setValue('');
      };

      if (isChatDelayed && !isDelayBlocked) {
        setIsDelayBlocked(true);
        setTimeout(() => {
          setIsDelayBlocked(false);
          startTransition(submitMessage);
        }, 3000);
      } else startTransition(submitMessage);
    },
    [isDelayBlocked, isChatDelayed, send, value]
  );

  useEffect(() => {
    if (isSending || !justSent || !inputRef.current) return;
    setTimeout(() => inputRef.current?.focus?.(), 50);
    setJustSent(false);
  }, [isSending, justSent]);

  if (!isChatEnabled || (!isOnline && !isChatEnabledOffline)) return null;

  return (
    <form onSubmit={handleSubmit}>
      {infoMsg && (
        <span
          className='mb-2 flex flex-row items-center gap-2 px-2 text-sm
text-muted-foreground'
        >
          <Tooltip label={infoTooltip}>
            <InfoIcon className='h-4 w-4 shrink-0' />
          </Tooltip>
          {infoMsg}
        </span>
      )}
      <Input
        ref={inputRef}
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder='Send a message...'
        disabled={disabled}
      />
    </form>
  );
};

export const StreamChatInputSkeleton = () => (
  <Skeleton className='h-10 w-full' />
);
