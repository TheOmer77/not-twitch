import { db } from '@/lib/db';
import { getSelf } from '../services/auth';
import { getUserById } from './users';

export const getFollowedUsers = async () => {
  try {
    const currentUser = await getSelf();
    return (
      await db.follow.findMany({
        where: {
          followingUserId: currentUser.id,
          followedUser: {
            blocking: { none: { blockedUserId: currentUser.id } },
          },
        },
        include: { followedUser: true },
      })
    ).map(({ followedUser }) => followedUser);
  } catch (err) {
    return [];
  }
};

export const isFollowingUser = async (userId: string) => {
  try {
    const currentUser = await getSelf(),
      otherUser = await getUserById(userId);
    if (!otherUser) throw new Error(`User with ID '${userId}' not found.`);
    if (otherUser.id === currentUser.id) return true;

    const existingFollow = await db.follow.findUnique({
      where: {
        followingUserId_followedUserId: {
          followingUserId: currentUser.id,
          followedUserId: otherUser.id,
        },
      },
    });
    return !!existingFollow;
  } catch (err) {
    return false;
  }
};

export const createFollow = async (userId: string) => {
  const currentUser = await getSelf(),
    otherUser = await getUserById(userId);
  if (!otherUser) throw new Error(`User with ID '${userId}' not found.`);
  if (otherUser.id === currentUser.id)
    throw new Error('You cannot follow yourself.');

  const existingFollow = await db.follow.findUnique({
    where: {
      followingUserId_followedUserId: {
        followingUserId: currentUser.id,
        followedUserId: otherUser.id,
      },
    },
  });
  if (existingFollow) throw new Error("You're already following this user.");

  const newFollow = await db.follow.create({
    data: { followingUserId: currentUser.id, followedUserId: otherUser.id },
    include: { followedUser: true },
  });
  return newFollow;
};

export const deleteFollow = async (userId: string) => {
  const currentUser = await getSelf(),
    otherUser = await getUserById(userId);
  if (!otherUser) throw new Error(`User with ID '${userId}' not found.`);
  if (otherUser.id === currentUser.id)
    throw new Error('You cannot unfollow yourself.');

  const existingFollow = await db.follow.findUnique({
    where: {
      followingUserId_followedUserId: {
        followingUserId: currentUser.id,
        followedUserId: otherUser.id,
      },
    },
  });
  if (!existingFollow) throw new Error("You're not following this user.");

  const deletedFollow = await db.follow.delete({
    where: { id: existingFollow.id },
    include: { followedUser: true },
  });
  return deletedFollow;
};