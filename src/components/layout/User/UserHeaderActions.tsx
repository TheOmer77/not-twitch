'use client';

import { useTransition } from 'react';

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/useToast';
import { onFollow } from '@/actions/follow';

export type UserHeaderActionsProps = {
  userId: string;
  isFollowing: boolean;
};

export const UserHeaderActions = ({
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
        console.error(err);
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

  return (
    <div className='ms-auto'>
      <Button
        variant={isFollowing ? 'secondary' : 'default'}
        onClick={handleFollowClick}
        disabled={isPending || isFollowing}
      >
        {isFollowing ? 'Unfollow' : 'Follow'}
      </Button>
    </div>
  );
};
