import { createContext } from 'react';
import type { ReceivedChatMessage } from '@livekit/components-react';

export type StreamContextValue = {
  hostId: string;
  hostName: string;
  viewerId: string;
  viewerName: string;
  title: string;
  isChatDelayed: boolean;
  isChatDisabledOffline: boolean;
  isChatEnabled: boolean;
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
  title: '',
  isChatDelayed: false,
  isChatDisabledOffline: false,
  isChatEnabled: false,
  isChatFollowersOnly: false,
  isFollowing: false,
  isOnline: false,
  chatMessages: [],
};

export const StreamContext = createContext<StreamContextValue>(initialState);
