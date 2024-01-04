import type { Stream } from '@prisma/client';
export type { Block, Follow, Stream, User } from '@prisma/client';

export type UserFollowerCount = { _count: { followedBy: number } };
export type UserStream = { stream: (StreamBase & StreamSettings) | null };

export type StreamBase = Pick<
  Stream,
  'id' | 'isLive' | 'thumbnailUrl' | 'title'
>;
export type StreamSettings = Pick<
  Stream,
  | 'isChatDelayed'
  | 'isChatDisabledOffline'
  | 'isChatEnabled'
  | 'isChatFollowersOnly'
>;
