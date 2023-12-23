import { db } from '@/lib/db';

export const getUserById = async (
  id: string,
  { includeStream }: { includeStream?: boolean } = {}
) =>
  await db.user.findUnique({
    where: { id },
    include: { stream: includeStream },
  });

export const getUserByUsername = async (
  username: string,
  { includeStream }: { includeStream?: boolean } = {}
) =>
  await db.user.findUnique({
    where: { username },
    include: { stream: includeStream },
  });
