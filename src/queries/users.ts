import type { User } from '@prisma/client';

import { db } from '@/lib/db';

export type GetUserOptions = {
  includeFollowerCount?: boolean;
  includeStream?: boolean;
};

export const getUserById = async (
  id: string,
  { includeFollowerCount = false, includeStream = false }: GetUserOptions = {}
) =>
  await db.user.findUnique({
    where: { id },
    include: {
      stream: includeStream,
      ...(includeFollowerCount
        ? { _count: { select: { followedBy: true } } }
        : {}),
    },
  });

export const getUserByUsername = async (
  username: string,
  { includeFollowerCount = false, includeStream = false }: GetUserOptions = {}
) =>
  await db.user.findUnique({
    where: { username },
    include: {
      stream: includeStream,
      ...(includeFollowerCount
        ? { _count: { select: { followedBy: true } } }
        : {}),
    },
  });

export const updateUserById = async (id: string, data: Partial<User>) =>
  await db.user.update({ where: { id }, data });
