'use client';

import type { PropsWithChildren } from 'react';
import {
  useChat,
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
  title,
  viewerId,
  viewerName,
  isChatDelayed,
  isChatDisabledOffline,
  isChatEnabled,
  isChatFollowersOnly,
  isFollowing,
  children,
}: PropsWithChildren<
  Omit<StreamContextValue, 'chatMessages' | 'isOnline'>
>) => {
  const participant = useRemoteParticipant(hostId),
    connectionState = useConnectionState();

  const { chatMessages } = useChat();
  const isOnline =
    !!participant && connectionState === ConnectionState.Connected;

  return (
    <StreamContext.Provider
      value={{
        hostId,
        hostName,
        title,
        viewerId,
        viewerName,
        isChatDelayed,
        isChatDisabledOffline,
        isChatEnabled,
        isChatFollowersOnly,
        isFollowing,
        isOnline,
        chatMessages,
      }}
    >
      {children}
    </StreamContext.Provider>
  );
};
