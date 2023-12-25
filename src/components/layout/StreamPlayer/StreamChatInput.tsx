'use client';

import {
  useCallback,
  useRef,
  useState,
  useTransition,
  type FormEventHandler,
  useEffect,
} from 'react';
import { useChat } from '@livekit/components-react';

import { Input } from '@/components/ui/Input';

export type StreamChatInputProps = {
  isChatEnabled: boolean;
  isFollowersOnly: boolean;
  isDelayed: boolean;
  isFollowing: boolean;
};

export const StreamChatInput = ({
  // TODO: Context, no prop drilling
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

  if (!isChatEnabled) return null;

  return (
    <form onSubmit={handleSubmit}>
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
