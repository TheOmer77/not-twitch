'use server';

import { revalidatePath } from 'next/cache';
import { createFollow, deleteFollow } from '@/queries/follow';

export const followUser = async (userId: string) => {
  const followedUser = await createFollow(userId);
  revalidatePath('/');
  if (followedUser) revalidatePath(`/${followedUser.followed.username}`);
  return followedUser;
};

export const unfollowUser = async (userId: string) => {
  const unfollowedUser = await deleteFollow(userId);
  revalidatePath('/');
  if (unfollowedUser) revalidatePath(`/${unfollowedUser.followed.username}`);
  return unfollowedUser;
};
