'use server';

import { followUser } from '@/services/follow';
import { revalidatePath } from 'next/cache';

export const onFollow = async (userId: string) => {
  const followedUser = await followUser(userId);
  revalidatePath('/');
  if (followedUser) revalidatePath(`/${followedUser.followed.username}`);
  return followedUser;
};
