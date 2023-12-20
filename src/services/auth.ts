import { currentUser } from '@clerk/nextjs';
import { db } from '../lib/db';

export const getSelf = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser || !clerkUser.username)
    throw new Error("You're not logged in.");

  const dbUser = await db.user.findUnique({
    where: { externalUserId: clerkUser.id },
  });
  if (!dbUser)
    throw new Error(
      `User ${clerkUser.username} (external ID: ${clerkUser.id}) exists but isn't found in the DB. This shouldn't happen!`
    );

  return dbUser;
};
