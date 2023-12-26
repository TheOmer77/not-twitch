import { createContext } from 'react';

export type StreamContextValue = {
  hostId: string;
  hostName: string;
  viewerName: string;
  isChatDelayed: boolean;
  isChatEnabled: boolean;
  isChatEnabledOffline: boolean;
  isChatFollowersOnly: boolean;
  isFollowing: boolean;
  isOnline: boolean;
};

const initialState: StreamContextValue = {
  hostId: '',
  hostName: '',
  viewerName: '',
  isChatDelayed: false,
  isChatEnabled: false,
  isChatEnabledOffline: false,
  isChatFollowersOnly: false,
  isFollowing: false,
  isOnline: false,
};

export const StreamContext = createContext<StreamContextValue>(initialState);
