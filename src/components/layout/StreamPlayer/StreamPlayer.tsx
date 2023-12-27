'use client';

import { LiveKitRoom } from '@livekit/components-react';
import type { Stream, User } from '@prisma/client';

import { StreamChat, StreamChatSkeleton } from './StreamChat';
import { StreamChatCollapseToggle } from './StreamChatCollapseToggle';
import { StreamVideo, StreamVideoSkeleton } from './StreamVideo';
import { StreamProvider } from '@/components/providers';
import { useViewerToken } from '@/hooks';
import { useChatSidebar } from '@/store/useChatSidebar';
import { cn } from '@/lib/utils';

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

  if (isTokenPending) return <StreamPlayerSkeleton />;
  if (!token || !name || !identity)
    return <div>Unable to watch this stream.</div>;

  return (
    <>
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
        className={cn(
          'flex h-[calc(100vh-6rem)] w-full flex-col gap-2 md:grid md:grid-cols-[2fr,1fr] xl:grid-cols-[1fr,20rem]',
          collapsed && 'lg:grid-cols-1 xl:grid-cols-1'
        )}
      >
        <StreamProvider
          viewerName={name}
          hostName={user.username}
          hostId={user.id}
          isFollowing={isFollowing}
          isChatEnabled={stream.isChatEnabled}
          isChatEnabledOffline={stream.isChatEnabledOffline}
          isChatDelayed={stream.isChatDelayed}
          isChatFollowersOnly={stream.isChatFollowersOnly}
        >
          <div className='hidden-scrollbar relative col-span-1'>
            {collapsed && (
              <StreamChatCollapseToggle
                className='absolute end-2 top-2 z-10 hidden text-white
hover:bg-white/15 hover:text-white lg:inline-flex'
              />
            )}
            <StreamVideo />
          </div>
          <div className={cn('col-span-1 grow', collapsed && 'hidden')}>
            <StreamChat />
          </div>
        </StreamProvider>
      </LiveKitRoom>
    </>
  );
};

export const StreamPlayerSkeleton = () => (
  <div
    className='flex h-[calc(100vh-6rem)] w-full flex-col gap-2 md:grid
    md:grid-cols-[2fr,1fr] xl:grid-cols-[1fr,20rem]'
  >
    <div className='hidden-scrollbar relative col-span-1'>
      <StreamVideoSkeleton />
      {/* TODO: Header skeleton */}
    </div>
    <div className='col-span-1 grow'>
      <StreamChatSkeleton />
    </div>
  </div>
);
