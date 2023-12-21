'use client';

import { useTransition } from 'react';

import { Button } from '@/components/ui/Button';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useToast } from '@/hooks/useToast';
import { followUser, unfollowUser } from '@/actions/follow';
import { blockUser, unblockUser } from '@/actions/block';

export type UserHeaderActionsProps = {
  userId: string;
  isFollowing: boolean;
  isBlocking: boolean;
};

export const UserHeaderActions = ({
  userId,
  isFollowing,
  isBlocking,
}: UserHeaderActionsProps) => {
  const currentUser = useCurrentUser();
  const { displayToast } = useToast();
  const [isPending, startTransition] = useTransition();

  const handleFollowClick = async () => {
    startTransition(async () => {
      try {
        const follow = await (isFollowing
          ? unfollowUser(userId)
          : followUser(userId));
        displayToast({
          description: isFollowing
            ? `You are no longer following ${follow.followedUser.username}.`
            : `You are now following ${follow.followedUser.username}!`,
        });
      } catch (err) {
        displayToast({
          title: isFollowing
            ? `Couldn't unfollow this user`
            : `Couldn't follow this user`,
          description:
            err instanceof Error
              ? err.message
              : isFollowing
                ? 'Something went wrong while trying to unfollow this user.'
                : 'Something went wrong while trying to follow this user.',
        });
      }
    });
  };

  const handleBlockClick = async () => {
    startTransition(async () => {
      try {
        const block = await (isBlocking
          ? unblockUser(userId)
          : blockUser(userId));
        displayToast({
          description: isBlocking
            ? `You've unblocked ${block.blockedUser.username}.`
            : `You've blocked ${block.blockedUser.username}.`,
        });
      } catch (err) {
        displayToast({
          title: isBlocking
            ? `Couldn't unblock this user`
            : `Couldn't block this user`,
          description:
            err instanceof Error
              ? err.message
              : isBlocking
                ? 'Something went wrong while trying to unblock this user.'
                : 'Something went wrong while trying to block this user.',
        });
      }
    });
  };

  return (
    <div className='mt-4 flex flex-row gap-2 md:ms-auto md:mt-0'>
      {currentUser?.id !== userId && (
        <>
          <Button
            variant={isFollowing ? 'secondary' : 'default'}
            onClick={handleFollowClick}
            disabled={isPending}
          >
            {isFollowing ? 'Unfollow' : 'Follow'}
          </Button>
          <Button
            variant='secondary'
            onClick={handleBlockClick}
            disabled={isPending}
          >
            {isBlocking ? 'Unblock' : 'Block'}
          </Button>
        </>
      )}
    </div>
  );
};
