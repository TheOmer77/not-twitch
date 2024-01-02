import { db } from '@/lib/db';
import type { Stream } from '@/types';

export const getStreamByUserId = async (userId: string) =>
  await db.stream.findUnique({ where: { userId } });

export const updateStreamByUserId = async (
  userId: string,
  data: Partial<Stream>
) => await db.stream.update({ where: { userId }, data });
