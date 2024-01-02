import type { Stream, User as UserBase } from '@prisma/client';
export type { Block, Follow, Stream, User as UserBase } from '@prisma/client';

export type User = UserBase & { _count: { followedBy: number } };
export type UserWithStream = User & { stream: Stream | null };
