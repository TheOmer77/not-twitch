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
  isHidden: boolean;
  isFollowersOnly: boolean;
  isDelayed: boolean;
  isFollowing: boolean;
};

export const StreamChatInput = ({
  isHidden,
  isFollowersOnly,
  isDelayed,
  isFollowing,
}: StreamChatInputProps) => {
  const [value, setValue] = useState(''),
    [justSent, setJustSent] = useState(false);
  const [isSending, startTransition] = useTransition();
  const { send } = useChat();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback<FormEventHandler>(
    e => {
      e.preventDefault();
      if (!send) return;

      startTransition(async () => {
        setJustSent(true);
        await send(value);
        setValue('');
      });
    },
    [send, value]
  );

  useEffect(() => {
    if (isSending || !justSent || !inputRef.current) return;
    setTimeout(() => inputRef.current?.focus?.(), 50);
    setJustSent(false);
  }, [isSending, justSent]);

  return (
    <form onSubmit={handleSubmit}>
      <Input
        ref={inputRef}
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder='Send a message...'
        disabled={isSending}
      />
    </form>
  );
};
