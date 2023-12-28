import { createContext } from 'react';
import type { ReceivedChatMessage } from '@livekit/components-react';

export type StreamContextValue = {
  hostId: string;
  hostName: string;
  viewerId: string;
  viewerName: string;
  isChatDelayed: boolean;
  isChatEnabled: boolean;
  isChatDisabledOffline: boolean;
  isChatFollowersOnly: boolean;
  isFollowing: boolean;
  isOnline: boolean;
  chatMessages: ReceivedChatMessage[];
};

const initialState: StreamContextValue = {
  hostId: '',
  hostName: '',
  viewerId: '',
  viewerName: '',
  isChatDelayed: false,
  isChatEnabled: false,
  isChatDisabledOffline: false,
  isChatFollowersOnly: false,
  isFollowing: false,
  isOnline: false,
  chatMessages: [],
};

export const StreamContext = createContext<StreamContextValue>(initialState);
