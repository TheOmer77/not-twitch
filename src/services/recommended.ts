import { db } from '@/lib/db';
import { getCurrentUser } from './auth';

export const getRecommended = async () => {
  let currentUserId;
  try {
    currentUserId = (await getCurrentUser()).id;
  } catch (err) {
    currentUserId = null;
  }

  const users = await db.user.findMany({
    orderBy: { createdAt: 'desc' },
    include: { stream: true },
    ...(currentUserId
      ? {
          where: {
            AND: [
              { NOT: { id: currentUserId } },
              {
                NOT: {
                  followedBy: { some: { followingUserId: currentUserId } },
                },
              },
              { NOT: { blocking: { some: { blockedUserId: currentUserId } } } },
            ],
          },
        }
      : {}),
  });
  return users;
};
