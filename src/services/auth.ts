import { currentUser } from '@clerk/nextjs';

import { db } from '@/lib/db';
import type { GetUserOptions } from '@/queries/users';

export const getCurrentUser = async ({
  includeFollowerCount,
  includeStream,
}: GetUserOptions = {}) => {
  const clerkUser = await currentUser();
  if (!clerkUser || !clerkUser.username)
    throw new Error("You're not logged in.");

  const dbUser = await db.user.findUnique({
    where: { externalUserId: clerkUser.id },
    include: {
      stream: includeStream,
      ...(includeFollowerCount
        ? { _count: { select: { followedBy: true } } }
        : {}),
    },
  });
  if (!dbUser)
    throw new Error(
      `User ${clerkUser.username} (external ID: ${clerkUser.id}) exists but isn't found in the DB. This shouldn't happen!`
    );

  return dbUser;
};
