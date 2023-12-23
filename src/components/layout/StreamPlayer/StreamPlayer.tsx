'use client';

import { useViewerToken } from '@/hooks';
import type { Stream, User } from '@prisma/client';

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
  const { token, name, identity } = useViewerToken(user.id);
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
