'use client';

import { useTransition } from 'react';

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/useToast';
import { onFollow, onUnfollow } from '@/actions/follow';
import { onBlock, onUnblock } from '@/actions/block';

export type UserHeaderActionsProps = {
  currentUserId: string;
  userId: string;
  isFollowing: boolean;
  isBlocking: boolean;
};

export const UserHeaderActions = ({
  currentUserId,
  userId,
  isFollowing,
  isBlocking,
}: UserHeaderActionsProps) => {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const handleFollowClick = async () => {
    startTransition(async () => {
      try {
        const follow = await (isFollowing
          ? onUnfollow(userId)
          : onFollow(userId));
        toast({
          description: isFollowing
            ? `You are no longer following ${follow.followed.username}.`
            : `You are now following ${follow.followed.username}!`,
        });
      } catch (err) {
        toast({
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
        const block = await (isBlocking ? onUnblock(userId) : onBlock(userId));
        toast({
          description: isBlocking
            ? `You've unblocked ${block.blocked.username}.`
            : `You've blocked ${block.blocked.username}.`,
        });
      } catch (err) {
        toast({
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
    <div className='ms-auto flex flex-row gap-2'>
      {currentUserId !== userId && (
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
