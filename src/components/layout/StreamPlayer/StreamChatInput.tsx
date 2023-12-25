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
import { Tooltip } from '@/components/ui/Tooltip';

export type StreamChatInputProps = {
  isOnline: boolean;
  isChatEnabled: boolean;
  isFollowersOnly: boolean;
  isDelayed: boolean;
  isFollowing: boolean;
};

export const StreamChatInput = ({
  // TODO: Context, no prop drilling
  isOnline,
  isChatEnabled,
  isFollowersOnly,
  isDelayed,
  isFollowing,
}: StreamChatInputProps) => {
  const [value, setValue] = useState(''),
    [isDelayBlocked, setIsDelayBlocked] = useState(false),
    [justSent, setJustSent] = useState(false);
  const [isSending, startTransition] = useTransition();
  const { send } = useChat();
  const inputRef = useRef<HTMLInputElement>(null);

  const disabled =
    isSending || isDelayBlocked || (isFollowersOnly && !isFollowing);

  const infoMsg = useMemo(
      () =>
        isDelayed && isFollowersOnly
          ? 'Followers only & slow mode'
          : isDelayed
            ? 'Slow mode'
            : isFollowersOnly
              ? 'Followers only'
              : null,
      [isDelayed, isFollowersOnly]
    ),
    infoTooltip = useMemo(
      () =>
        isDelayed && isFollowersOnly
          ? 'Messages can only be sent every 3 seconds, by followers only.'
          : isDelayed
            ? 'Messages can only be sent every 3 seconds.'
            : isFollowersOnly
              ? 'Only followers can chat.'
              : null,
      [isDelayed, isFollowersOnly]
    );

  const handleSubmit = useCallback<FormEventHandler>(
    e => {
      e.preventDefault();
      e.stopPropagation();
      if (!send) return;

      const submitMessage = async () => {
        setJustSent(true);
        await send(value);
        setValue('');
      };

      if (isDelayed && !isDelayBlocked) {
        setIsDelayBlocked(true);
        setTimeout(() => {
          setIsDelayBlocked(false);
          startTransition(submitMessage);
        }, 3000);
      } else startTransition(submitMessage);
    },
    [isDelayBlocked, isDelayed, send, value]
  );

  useEffect(() => {
    if (isSending || !justSent || !inputRef.current) return;
    setTimeout(() => inputRef.current?.focus?.(), 50);
    setJustSent(false);
  }, [isSending, justSent]);

  if (!isOnline || !isChatEnabled) return null;

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
