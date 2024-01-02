'use server';

import { revalidatePath } from 'next/cache';
import { RoomServiceClient } from 'livekit-server-sdk';

import { getCurrentUser } from '@/queries/auth';
import { createBlock, deleteBlock } from '@/queries/block';

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL as string,
  process.env.LIVEKIT_API_KEY,
  process.env.LIVEKIT_API_SECRET
);

export const blockUser = async (userId: string) => {
  const currentUser = await getCurrentUser({ throwIfNotFound: true });

  let newBlock;
  try {
    newBlock = await createBlock(userId);
  } catch {
    // User is a guest, just kick them
  }

  try {
    roomService.removeParticipant(currentUser.id, userId);
  } catch {
    // User is not in the room
  }

  revalidatePath('/dashboard/community');
  if (newBlock) revalidatePath(`/${newBlock.blockedUser.username}`);
  return newBlock;
};

export const unblockUser = async (userId: string) => {
  const deletedBlock = await deleteBlock(userId);
  revalidatePath('/');
  if (deletedBlock) revalidatePath(`/${deletedBlock.blockedUser.username}`);
  return deletedBlock;
};
