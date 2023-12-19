'use client';

import { useTransition } from 'react';

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/useToast';
import { onFollow, onUnfollow } from '@/actions/follow';

export type UserHeaderActionsProps = {
  currentUserId: string;
  userId: string;
  isFollowing: boolean;
};

export const UserHeaderActions = ({
  currentUserId,
  userId,
  isFollowing,
}: UserHeaderActionsProps) => {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const handleFollowClick = async () => {
    startTransition(async () => {
      try {
        const followedUser = await onFollow(userId);
        toast({
          description: `You are now following ${followedUser.followed.username}!`,
        });
      } catch (err) {
        toast({
          title: `Couldn't follow this user`,
          description:
            err instanceof Error
              ? err.message
              : 'Something went wrong while trying to follow this user.',
        });
      }
    });
  };

  const handleUnfollowClick = async () => {
    startTransition(async () => {
      try {
        const followedUser = await onUnfollow(userId);
        toast({
          description: `You are no longer following ${followedUser.followed.username}.`,
        });
      } catch (err) {
        toast({
          title: `Couldn't unfollow this user`,
          description:
            err instanceof Error
              ? err.message
              : 'Something went wrong while trying to unfollow this user.',
        });
      }
    });
  };

  return (
    <div className='ms-auto'>
      {currentUserId !== userId && (
        <Button
          variant={isFollowing ? 'secondary' : 'default'}
          onClick={isFollowing ? handleUnfollowClick : handleFollowClick}
          disabled={isPending}
        >
          {isFollowing ? 'Unfollow' : 'Follow'}
        </Button>
      )}
    </div>
  );
};
