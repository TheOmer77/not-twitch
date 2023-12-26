'use client';

import type { PropsWithChildren } from 'react';
import {
  useConnectionState,
  useRemoteParticipant,
} from '@livekit/components-react';
import { ConnectionState } from 'livekit-client';

import {
  StreamContext,
  type StreamContextValue,
} from '@/contexts/streamContext';

export const StreamProvider = ({
  hostId,
  hostName,
  viewerName,
  isChatDelayed,
  isChatEnabled,
  isChatEnabledOffline,
  isChatFollowersOnly,
  isFollowing,
  children,
}: PropsWithChildren<Omit<StreamContextValue, 'isOnline'>>) => {
  const participant = useRemoteParticipant(hostId),
    connectionState = useConnectionState();

  const isOnline =
    !!participant && connectionState === ConnectionState.Connected;

  return (
    <StreamContext.Provider
      value={{
        hostId,
        hostName,
        viewerName,
        isChatDelayed,
        isChatEnabled,
        isChatEnabledOffline,
        isChatFollowersOnly,
        isFollowing,
        isOnline,
      }}
    >
      {children}
    </StreamContext.Provider>
  );
};
