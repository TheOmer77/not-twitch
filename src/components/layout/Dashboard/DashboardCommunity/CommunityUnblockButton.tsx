'use client';

import { useCallback, useTransition } from 'react';

import { SpinnerButton } from '@/components/ui/SpinnerButton';
import { useToast } from '@/hooks';
import { unblockUser } from '@/actions/block';

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
    <SpinnerButton
      onClick={handleClick}
      disabled={isPending}
      showSpinner={isPending}
    >
      Unblock
    </SpinnerButton>
  );
};
