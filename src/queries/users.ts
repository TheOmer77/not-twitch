import type { Stream, User } from '@prisma/client';

import { db } from '@/lib/db';

// TODO: Move to types dir, along with re-exports from prisma client
export type UserWithFollowerCount = User & { _count: { followedBy: number } };

export type GetUserOptions = {
  includeStream?: boolean;
  throwIfNotFound?: boolean;
};
export type GetUserResult<T extends GetUserOptions> =
  T['throwIfNotFound'] extends true
    ? T['includeStream'] extends true
      ? UserWithFollowerCount & { stream: Stream | null }
      : UserWithFollowerCount
    :
        | (T['includeStream'] extends true
            ? UserWithFollowerCount & { stream: Stream | null }
            : UserWithFollowerCount)
        | null;

export const getUserById = async <T extends GetUserOptions>(
  id: string,
  options?: T
): Promise<GetUserResult<T>> => {
  const user = await db.user.findUnique({
    where: { id },
    include: {
      stream: options?.includeStream,
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
      stream: options?.includeStream,
      _count: { select: { followedBy: true } },
    },
  });
  if (!user && options?.throwIfNotFound)
    throw new Error(`User with username '${username}' not found.`);
  return user as GetUserResult<T>;
};

export const updateUserById = async (id: string, data: Partial<User>) =>
  await db.user.update({ where: { id }, data });
