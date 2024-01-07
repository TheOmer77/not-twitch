'use client';

import { useCallback, useTransition } from 'react';

import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { useToast } from '@/hooks';
import { unblockUser } from '@/actions/block';
import { cn } from '@/lib/utils';

type CommunityUnblockButtonProps = {
  userId: string;
};

export const CommunityUnblockButton = ({
  userId,
}: CommunityUnblockButtonProps) => {
  const [isPending, startTransition] = useTransition();
  const { displayToast } = useToast();

  const handleClick = useCallback(() => {
    startTransition(async () => {
      try {
        const deletedBlock = await unblockUser(userId);
        displayToast(`You've unblocked ${deletedBlock.blockedUser.username}.`);
      } catch (err) {
        displayToast(`Couldn't unblock this user`, {
          description:
            err instanceof Error
              ? err.message
              : 'Something went wrong while trying to unblock this user.',
        });
      }
    });
  }, [displayToast, userId]);

  return (
    <Button disabled={isPending} onClick={handleClick} className='relative'>
      <span className={cn(isPending && 'invisible')}>Unblock</span>
      {isPending && <Spinner className='absolute' />}
    </Button>
  );
};
