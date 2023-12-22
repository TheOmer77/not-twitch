import { getCurrentUser } from '@/services/auth';
import { db } from '@/lib/db';
import { getUserById } from './users';

export const isBlockingUser = async (userId: string) => {
  try {
    const currentUser = await getCurrentUser(),
      otherUser = await getUserById(userId);
    if (!otherUser) throw new Error(`User with ID '${userId}' not found.`);
    if (otherUser.id === currentUser.id) return true;

    const existingBlock = await db.block.findUnique({
      where: {
        blockingUserId_blockedUserId: {
          blockingUserId: currentUser.id,
          blockedUserId: otherUser.id,
        },
      },
    });
    return !!existingBlock;
  } catch (err) {
    return false;
  }
};

export const isBlockedByUser = async (userId: string) => {
  try {
    const currentUser = await getCurrentUser(),
      otherUser = await getUserById(userId);
    if (!otherUser) throw new Error(`User with ID '${userId}' not found.`);
    if (otherUser.id === currentUser.id) return true;

    const existingBlock = await db.block.findUnique({
      where: {
        blockingUserId_blockedUserId: {
          blockingUserId: otherUser.id,
          blockedUserId: currentUser.id,
        },
      },
    });
    return !!existingBlock;
  } catch (err) {
    return false;
  }
};

export const createBlock = async (userId: string) => {
  const currentUser = await getCurrentUser(),
    otherUser = await getUserById(userId);
  if (!otherUser) throw new Error(`User with ID '${userId}' not found.`);
  if (otherUser.id === currentUser.id)
    throw new Error('You cannot block yourself.');

  const existingBlock = await db.block.findFirst({
    where: { blockingUserId: currentUser.id, blockedUserId: otherUser.id },
  });
  if (existingBlock) throw new Error("You've already blocked this user.");

  const newBlock = await db.block.create({
    data: { blockingUserId: currentUser.id, blockedUserId: otherUser.id },
    include: { blockingUser: true, blockedUser: true },
  });
  return newBlock;
};

export const deleteBlock = async (userId: string) => {
  const currentUser = await getCurrentUser(),
    otherUser = await getUserById(userId);
  if (!otherUser) throw new Error(`User with ID '${userId}' not found.`);
  if (otherUser.id === currentUser.id)
    throw new Error('You cannot unblock yourself.');

  const existingBlock = await db.block.findUnique({
    where: {
      blockingUserId_blockedUserId: {
        blockingUserId: currentUser.id,
        blockedUserId: otherUser.id,
      },
    },
  });
  if (!existingBlock) throw new Error("You haven't blocked this user.");

  const deletedBlock = await db.block.delete({
    where: { id: existingBlock.id },
    include: { blockedUser: true },
  });
  return deletedBlock;
};
