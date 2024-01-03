import { db } from '@/lib/db';
import type { User, UserFollowerCount, UserStream } from '@/types';

export type GetUserOptions = {
  includeStream?: boolean;
  throwIfNotFound?: boolean;
};

export type GetUserResultStream<T extends GetUserOptions> =
  T['includeStream'] extends true ? UserStream : unknown;
export type GetUserResult<T extends GetUserOptions> =
  T['throwIfNotFound'] extends true
    ? User & UserFollowerCount & GetUserResultStream<T>
    : (User & UserFollowerCount & GetUserResultStream<T>) | null;

export const getUserById = async <T extends GetUserOptions>(
  id: string,
  options?: T
): Promise<GetUserResult<T>> => {
  const user = await db.user.findUnique({
    where: { id },
    include: {
      stream: !!options?.includeStream && {
        select: {
          id: true,
          isChatDelayed: true,
          isChatDisabledOffline: true,
          isChatEnabled: true,
          isChatFollowersOnly: true,
          isLive: true,
          thumbnailUrl: true,
          title: true,
        },
      },
      _count: { select: { followedBy: true } },
    },
  });
  if (!user && options?.throwIfNotFound)
    throw new Error(`User with ID '${id}' not found.`);
  return user as GetUserResult<T>;
};

export const getUserByUsername = async <T extends GetUserOptions>(
  username: string,
  options?: T
): Promise<GetUserResult<T>> => {
  const user = await db.user.findUnique({
    where: { username },
    include: {
      stream: !!options?.includeStream && {
        select: {
          id: true,
          isChatDelayed: true,
          isChatDisabledOffline: true,
          isChatEnabled: true,
          isChatFollowersOnly: true,
          isLive: true,
          thumbnailUrl: true,
          title: true,
        },
      },
      _count: { select: { followedBy: true } },
    },
  });
  if (!user && options?.throwIfNotFound)
    throw new Error(`User with username '${username}' not found.`);
  return user as GetUserResult<T>;
};

export const updateUserById = async (id: string, data: Partial<User>) =>
  await db.user.update({ where: { id }, data });
