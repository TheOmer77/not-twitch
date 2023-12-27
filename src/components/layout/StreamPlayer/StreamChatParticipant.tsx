'use client';

import { useCallback, useTransition } from 'react';
import { BanIcon } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Tooltip } from '@/components/ui/Tooltip';
import { useStream, useToast } from '@/hooks';
import { blockUser } from '@/actions/block';
import { cn } from '@/lib/utils';

export type StreamChatParticipantProps = {
  id: string;
  name?: string;
};

export const StreamChatParticipant = ({
  id,
  name,
}: StreamChatParticipantProps) => {
  const [isPending, startTranstion] = useTransition();
  const { hostName, viewerName } = useStream();
  const { displayToast } = useToast();

  const isSelf = name === viewerName,
    isHost = viewerName === hostName;

  const handleBlock = useCallback(() => {
    if (!name || isSelf || !isHost) return;
    startTranstion(async () => {
      try {
        await blockUser(id);
        displayToast(`${name} has been blocked.`);
      } catch (err) {
        displayToast("Couldn't block user", {
          description:
            err instanceof Error
              ? err.message
              : 'Something went wrong while trying to block this user.',
        });
      }
    });
  }, [displayToast, id, isHost, isSelf, name]);

  return (
    <li
      className={cn(
        `group flex h-10 w-full flex-row items-center justify-between
rounded-md pe-2 ps-4 text-sm transition-colors hover:bg-accent/50`,
        isPending && 'pointer-events-none'
      )}
    >
      <span className={cn(isPending && 'opacity-50')}>{name || id}</span>
      {isHost && !isSelf && (
        <Tooltip label='Block'>
          <Button
            variant='flat'
            size='icon'
            className='opacity-0 transition-opacity group-hover:opacity-100'
            onClick={handleBlock}
            disabled={isPending}
          >
            <BanIcon className='h-4 w-4' />
          </Button>
        </Tooltip>
      )}
    </li>
  );
};
