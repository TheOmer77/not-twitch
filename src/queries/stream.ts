import { getCurrentUser } from './auth';
import { db } from '@/lib/db';
import type { Stream } from '@/types';

export const getStreams = async () => {
  const currentUser = await getCurrentUser();

  return await db.stream.findMany({
    orderBy: [{ isLive: 'desc' }, { updatedAt: 'desc' }],
    select: {
      id: true,
      isLive: true,
      thumbnailUrl: true,
      title: true,
      user: true,
    },
    ...(currentUser
      ? {
          where: {
            user: {
              NOT: { blocking: { some: { blockedUserId: currentUser.id } } },
            },
          },
        }
      : {}),
  });
};

export const getStreamByUserId = async (userId: string) =>
  await db.stream.findUnique({ where: { userId } });

export const updateStreamByUserId = async (
  userId: string,
  data: Partial<Stream>
) => await db.stream.update({ where: { userId }, data });
