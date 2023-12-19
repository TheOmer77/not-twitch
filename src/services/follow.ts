import { db } from '@/lib/db';
import { getSelf } from './auth';

export const isFollowingUser = async (userId: string) => {
  try {
    const currentUser = await getSelf();
    const otherUser = await db.user.findUnique({ where: { id: userId } });
    if (!otherUser) throw new Error(`User with ID '${userId}' not found.`);
    if (otherUser.id === currentUser.id) return true;

    const existingFollow = await db.follow.findFirst({
      where: { followerId: currentUser.id, followedId: otherUser.id },
    });
    return !!existingFollow;
  } catch (err) {
    console.error(err);

    return false;
  }
};

export const followUser = async (userId: string) => {
  const currentUser = await getSelf();
  const otherUser = await db.user.findUnique({ where: { id: userId } });
  if (!otherUser) throw new Error(`User with ID '${userId}' not found.`);
  if (otherUser.id === currentUser.id)
    throw new Error('You cannot follow yourself.');

  const existingFollow = await db.follow.findFirst({
    where: { followerId: currentUser.id, followedId: otherUser.id },
  });
  if (existingFollow) throw new Error("You're already following this user.");

  const newFollow = await db.follow.create({
    data: { followerId: currentUser.id, followedId: otherUser.id },
    include: { follower: true, followed: true },
  });
  return newFollow;
};

export const unfollowUser = async (userId: string) => {
  const currentUser = await getSelf();
  const otherUser = await db.user.findUnique({ where: { id: userId } });
  if (!otherUser) throw new Error(`User with ID '${userId}' not found.`);
  if (otherUser.id === currentUser.id)
    throw new Error('You cannot unfollow yourself.');

  const existingFollow = await db.follow.findFirst({
    where: { followerId: currentUser.id, followedId: otherUser.id },
  });
  if (!existingFollow) throw new Error("You're not following this user.");

  const deletedFollow = await db.follow.delete({
    where: { id: existingFollow.id },
    include: { followed: true },
  });
  return deletedFollow;
};
