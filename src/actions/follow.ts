'use server';

import { followUser, unfollowUser } from '@/services/follow';
import { revalidatePath } from 'next/cache';

export const onFollow = async (userId: string) => {
  const followedUser = await followUser(userId);
  revalidatePath('/');
  if (followedUser) revalidatePath(`/${followedUser.followed.username}`);
  return followedUser;
};

export const onUnfollow = async (userId: string) => {
  const unfollowedUser = await unfollowUser(userId);
  revalidatePath('/');
  if (unfollowedUser) revalidatePath(`/${unfollowedUser.followed.username}`);
  return unfollowedUser;
};
