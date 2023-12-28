'use client';

import { useCallback, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
  useParticipants,
  useRemoteParticipant,
} from '@livekit/components-react';
import { useAuth } from '@clerk/nextjs';
import { User2Icon } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { UserAvatar } from '@/components/layout/User';
import { useStream, useToast } from '@/hooks';
import { Tooltip } from '@/components/ui/Tooltip';
import { followUser, unfollowUser } from '@/actions/follow';

export type StreamHeaderProps = { name: string; imageUrl: string };

export const StreamHeader = ({ name, imageUrl }: StreamHeaderProps) => {
  const { userId } = useAuth();
  const { hostId, hostName, isFollowing, viewerId } = useStream();
  const participants = useParticipants(),
    hostParticipant = useRemoteParticipant(hostId);

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { displayToast } = useToast();

  const isLive = !!hostParticipant;
  const isHost = viewerId === `host-${hostId}`;
  const participantCount = participants.length - 1;

  const handleFollowClick = useCallback(() => {
    if (isHost) return;

    startTransition(async () => {
      try {
        const follow = await (isFollowing
          ? unfollowUser(hostId)
          : followUser(hostId));
        displayToast(
          isFollowing
            ? `You are no longer following ${follow.followedUser.username}.`
            : `You are now following ${follow.followedUser.username}!`
        );
      } catch (err) {
        displayToast(
          isFollowing
            ? `Couldn't unfollow this user`
            : `Couldn't follow this user`,
          {
            description:
              err instanceof Error
                ? err.message
                : isFollowing
                  ? 'Something went wrong while trying to unfollow this user.'
                  : 'Something went wrong while trying to follow this user.',
          }
        );
      }
    });
  }, [displayToast, hostId, isFollowing, isHost]);

  return (
    <div className='relative px-2 py-4'>
      <div className='mb-2 flex flex-row items-start gap-2'>
        <h1
          className='grow break-words text-xl font-bold tracking-tight
sm:text-2xl'
        >
          {name}
        </h1>
        {isLive && (
          <span
            className='flex h-8 flex-row items-center gap-1 rounded-sm
bg-destructive px-1.5 text-sm font-medium text-destructive-foreground'
          >
            <User2Icon className='h-5 w-5' />
            {participantCount}
          </span>
        )}
      </div>
      <div className='flex h-10 flex-row items-center gap-2'>
        <UserAvatar username={hostName} imageUrl={imageUrl} isLive={isLive} />
        <span className='grow text-sm font-semibold'>{hostName}</span>
        {!userId ? (
          <Tooltip label={`To follow ${hostName}, you must log in first.`}>
            <Button variant='primary' onClick={() => router.push('/login')}>
              Follow
            </Button>
          </Tooltip>
        ) : (
          !isHost && (
            <Button
              variant={isFollowing ? 'default' : 'primary'}
              onClick={handleFollowClick}
              disabled={isPending}
            >
              {isFollowing ? 'Unfollow' : 'Follow'}
            </Button>
          )
        )}
      </div>
    </div>
  );
};
