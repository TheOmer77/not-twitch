'use server';

import { revalidatePath } from 'next/cache';
import { createBlock, deleteBlock } from '@/queries/block';

export const blockUser = async (userId: string) => {
  // TODO: Adapt to disconnect from livestream
  // TODO: Allow ability to kick the user
  const newBlock = await createBlock(userId);
  revalidatePath('/');
  if (newBlock) revalidatePath(`/${newBlock.blockedUser.username}`);
  return newBlock;
};

export const unblockUser = async (userId: string) => {
  const deletedBlock = await deleteBlock(userId);
  revalidatePath('/');
  if (deletedBlock) revalidatePath(`/${deletedBlock.blockedUser.username}`);
  return deletedBlock;
};
