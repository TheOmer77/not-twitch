'use server';

import type { User } from '@prisma/client';

import { getCurrentUser } from '@/queries/auth';
import { updateUserById } from '@/queries/users';
import { revalidatePath } from 'next/cache';

export const updateCurrentUser = async ({ bio }: Partial<User>) => {
  const currentUser = await getCurrentUser();
  const updatableData = { bio };

  const updatedUser = await updateUserById(currentUser.id, updatableData);
  revalidatePath('/dashboard');
  revalidatePath(`/${currentUser.username}`);

  return updatedUser;
};
