'use server';

import { v4 } from 'uuid';
import { AccessToken } from 'livekit-server-sdk';
import type { User } from '@prisma/client';

import { getCurrentUser } from '@/queries/auth';
import { getUserById } from '@/queries/users';
import { isBlockedByUser } from '@/queries/block';

export const createViewerToken = async (hostId: string) => {
  let currentUser: Partial<User> | null = await getCurrentUser();
  if (!currentUser) {
    const id = v4();
    const username = `guest#${Math.floor(Math.random() * 1000)}`;
    currentUser = { id, username };
  }

  const hostUser = await getUserById(hostId);
  if (!hostUser) throw new Error('Host user not found.');

  const isBlocked = await isBlockedByUser(hostId);
  if (isBlocked) throw new Error('You are blocked by this user.');

  const isHost = currentUser.id === hostId;

  const token = new AccessToken(
    process.env.LIVEKIT_API_KEY,
    process.env.LIVEKIT_API_SECRET,
    {
      identity: isHost ? `host-${hostId}` : currentUser.id,
      name: currentUser.username,
    }
  );
  token.addGrant({
    room: hostId,
    roomJoin: true,
    canPublish: false,
    canPublishData: true,
  });

  return await Promise.resolve(token.toJwt());
};
