import { db } from '@/lib/db';
import { getSelf } from '../services/auth';
import { getUserById } from './users';

export const isBlockingUser = async (userId: string) => {
  try {
    const currentUser = await getSelf(),
      otherUser = await getUserById(userId);
    if (!otherUser) throw new Error(`User with ID '${userId}' not found.`);
    if (otherUser.id === currentUser.id) return true;

    const existingBlock = await db.block.findUnique({
      where: {
        blockerId_blockedId: {
          blockerId: currentUser.id,
          blockedId: otherUser.id,
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
    const currentUser = await getSelf(),
      otherUser = await getUserById(userId);
    if (!otherUser) throw new Error(`User with ID '${userId}' not found.`);
    if (otherUser.id === currentUser.id) return true;

    const existingBlock = await db.block.findUnique({
      where: {
        blockerId_blockedId: {
          blockerId: otherUser.id,
          blockedId: currentUser.id,
        },
      },
    });
    return !!existingBlock;
  } catch (err) {
    return false;
  }
};

export const createBlock = async (userId: string) => {
  const currentUser = await getSelf(),
    otherUser = await getUserById(userId);
  if (!otherUser) throw new Error(`User with ID '${userId}' not found.`);
  if (otherUser.id === currentUser.id)
    throw new Error('You cannot block yourself.');

  const existingBlock = await db.block.findFirst({
    where: { blockerId: currentUser.id, blockedId: otherUser.id },
  });
  if (existingBlock) throw new Error("You've already blocked this user.");

  const newBlock = await db.block.create({
    data: { blockerId: currentUser.id, blockedId: otherUser.id },
    include: { blocker: true, blocked: true },
  });
  return newBlock;
};

export const deleteBlock = async (userId: string) => {
  const currentUser = await getSelf(),
    otherUser = await getUserById(userId);
  if (!otherUser) throw new Error(`User with ID '${userId}' not found.`);
  if (otherUser.id === currentUser.id)
    throw new Error('You cannot unblock yourself.');

  const existingBlock = await db.block.findUnique({
    where: {
      blockerId_blockedId: {
        blockerId: currentUser.id,
        blockedId: otherUser.id,
      },
    },
  });
  if (!existingBlock) throw new Error("You haven't blocked this user.");

  const deletedBlock = await db.block.delete({
    where: { id: existingBlock.id },
    include: { blocked: true },
  });
  return deletedBlock;
};
