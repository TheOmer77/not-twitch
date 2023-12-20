'use server';

import { revalidatePath } from 'next/cache';
import { createBlock, deleteBlock } from '@/queries/block';

export const blockUser = async (userId: string) => {
  // TODO: Adapt to disconnect from livestream
  // TODO: Allow ability to kick the user
  const blockedUser = await createBlock(userId);
  revalidatePath('/');
  if (blockedUser) revalidatePath(`/${blockedUser.blocked.username}`);
  return blockedUser;
};

export const unblockUser = async (userId: string) => {
  const unblockedUser = await deleteBlock(userId);
  revalidatePath('/');
  if (unblockedUser) revalidatePath(`/${unblockedUser.blocked.username}`);
  return unblockedUser;
};
