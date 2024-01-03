import type { Stream } from '@prisma/client';
export type { Block, Follow, Stream, User } from '@prisma/client';

export type UserFollowerCount = { _count: { followedBy: number } };
export type UserStream = { stream: (StreamBase & StreamStatus) | null };

export type StreamBase = Pick<
  Stream,
  'id' | 'isLive' | 'thumbnailUrl' | 'title'
>;
export type StreamStatus = Pick<
  Stream,
  | 'isChatDelayed'
  | 'isChatDisabledOffline'
  | 'isChatEnabled'
  | 'isChatFollowersOnly'
  | 'isLive'
>;
