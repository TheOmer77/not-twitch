'use client';

import { LiveKitRoom } from '@livekit/components-react';
import type { Stream, User } from '@prisma/client';

import { StreamVideo } from './StreamVideo';
import { Spinner } from '@/components/ui/Spinner';
import { useViewerToken } from '@/hooks';
import { useChatSidebar } from '@/store/useChatSidebar';
import { cn } from '@/lib/utils';
import { StreamChat } from './StreamChat';

export type StreamPlayerProps = {
  user: User;
  stream: Stream;
  isFollowing: boolean;
};

export const StreamPlayer = ({
  user,
  stream,
  isFollowing,
}: StreamPlayerProps) => {
  const { collapsed } = useChatSidebar();

  const { token, name, identity, isTokenPending } = useViewerToken(user.id);
  if (isTokenPending)
    return (
      <div className='flex items-center justify-center p-4'>
        <Spinner className='h-8 w-8' />
      </div>
    );

  if (!token || !name || !identity)
    return <div>Unable to watch this stream.</div>;

  return (
    <>
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
        className={cn(
          'grid w-full grid-cols-1 gap-2 lg:grid-cols-3 lg:gap-y-0 2xl:grid-cols-6',
          collapsed && 'lg:grid-cols-2 2xl:grid-cols-2'
        )}
      >
        <div
          className='hidden-scrollbar col-span-1 space-y-4 pb-10 lg:col-span-2
lg:overflow-y-auto 2xl:col-span-5'
        >
          <StreamVideo hostName={user.username} hostId={user.id} />
        </div>
        <div className={cn('col-span-1', collapsed && 'hidden')}>
          <StreamChat
            viewerName={name}
            hostName={user.username}
            hostId={user.id}
            isFollowing={isFollowing}
            isChatEnabled={stream.isChatEnabled}
            isChatDelayed={stream.isChatDelayed}
            isChatFollowersOnly={stream.isChatFollowersOnly}
          />
        </div>
      </LiveKitRoom>
    </>
  );
};
