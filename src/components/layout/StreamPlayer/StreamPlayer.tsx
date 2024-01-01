'use client';

import { LiveKitRoom } from '@livekit/components-react';
import type { Stream, User } from '@prisma/client';

import { StreamHeader, StreamHeaderSkeleton } from './StreamHeader';
import { StreamInfoDialog } from './StreamInfoDialog';
import { StreamVideo, StreamVideoSkeleton } from './StreamVideo';
import {
  StreamChat,
  StreamChatSkeleton,
  StreamChatCollapseToggle,
} from '@/components/layout/StreamChat';
import { UserAbout } from '@/components/layout/User';
import { StreamProvider } from '@/components/providers';
import { useViewerToken } from '@/hooks';
import { useChatSidebar } from '@/store/useChatSidebar';
import { cn } from '@/lib/utils';

export type StreamPlayerProps = {
  user: User & { _count: { followedBy: number } };
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
    // TODO: Throw error?
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
          hostId={user.id}
          hostName={user.username}
          title={stream.title}
          viewerId={identity}
          viewerName={name}
          isChatDelayed={stream.isChatDelayed}
          isChatDisabledOffline={stream.isChatDisabledOffline}
          isChatEnabled={stream.isChatEnabled}
          isChatFollowersOnly={stream.isChatFollowersOnly}
          isFollowing={isFollowing}
        >
          <div className='hidden-scrollbar relative col-span-1'>
            {collapsed && (
              <StreamChatCollapseToggle
                className='absolute end-2 top-2 z-10 hidden text-white
hover:bg-white/15 hover:text-white lg:inline-flex'
              />
            )}
            <StreamVideo />
            <StreamHeader imageUrl={user.imageUrl} />
            <StreamInfoDialog initialThumbnailUrl={stream.thumbnailUrl} />
            <UserAbout withHeader user={user} />
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
      <StreamHeaderSkeleton />
    </div>
    <div className='col-span-1 grow'>
      <StreamChatSkeleton />
    </div>
  </div>
);
