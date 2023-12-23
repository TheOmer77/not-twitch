'use client';

import type { Stream, User } from '@prisma/client';

import { Spinner } from '@/components/ui/Spinner';
import { useViewerToken } from '@/hooks';

export type StreamPlayerProps = {
  user: User;
  stream: Stream;
  isFollowing?: boolean;
};

export const StreamPlayer = ({
  user,
  stream,
  isFollowing,
}: StreamPlayerProps) => {
  const { token, name, identity, isTokenPending } = useViewerToken(user.id);
  if (isTokenPending)
    return (
      <div className='flex items-center justify-center p-4'>
        <Spinner className='h-8 w-8' />
      </div>
    );

  if (!token || !name || !identity)
    return (
      <div>
        Unable to watch this stream.
        <pre>{JSON.stringify({ token, name, identity }, undefined, 2)}</pre>
      </div>
    );

  return (
    <div>
      This stream player component isn&apos;t finished yet, but if it was, you
      would have been able to watch this stream.
      <pre>{JSON.stringify({ token, name, identity }, undefined, 2)}</pre>
    </div>
  );
};
