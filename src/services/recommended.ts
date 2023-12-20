import { db } from '@/lib/db';
import { getSelf } from './auth';

export const getRecommended = async () => {
  let currentUserId;
  try {
    currentUserId = (await getSelf()).id;
  } catch (err) {
    currentUserId = null;
  }

  const users = await db.user.findMany({
    orderBy: { createdAt: 'desc' },
    ...(currentUserId
      ? {
          where: {
            AND: [
              { NOT: { id: currentUserId } },
              { NOT: { followedBy: { some: { followerId: currentUserId } } } },
            ],
          },
        }
      : {}),
  });
  return users;
};
