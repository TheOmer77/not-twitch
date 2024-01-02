'use server';

import { revalidatePath } from 'next/cache';

import { getCurrentUser } from '@/queries/auth';
import { updateUserById } from '@/queries/users';
import type { User } from '@/types';

export const updateCurrentUser = async ({ bio }: Partial<User>) => {
  const currentUser = await getCurrentUser({ throwIfNotFound: true });
  const updatableData = { bio };

  const updatedUser = await updateUserById(currentUser.id, updatableData);
  revalidatePath('/dashboard');
  revalidatePath(`/${currentUser.username}`);

  return updatedUser;
};
