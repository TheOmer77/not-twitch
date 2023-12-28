'use server';

import { revalidatePath } from 'next/cache';
import type { Stream } from '@prisma/client';

import { getStreamByUserId, updateStreamByUserId } from '@/queries/stream';
import { getCurrentUser } from '@/services/auth';

export const updateStreamSettings = async ({
  title,
  thumbnailUrl,
  isChatDelayed,
  isChatEnabled,
  isChatDisabledOffline,
  isChatFollowersOnly,
}: Partial<Stream>) => {
  const currentUser = await getCurrentUser(),
    stream = await getStreamByUserId(currentUser.id);
  if (!stream) throw new Error("You don't have a stream.");

  const updatableData = {
    title,
    thumbnailUrl,
    isChatDelayed,
    isChatEnabled,
    isChatDisabledOffline,
    isChatFollowersOnly,
  };
  // TODO: If thumbnailUrl is null or different than old one, delete old one
  const updatedStream = await updateStreamByUserId(
    currentUser.id,
    updatableData
  );

  revalidatePath('/dashboard');
  revalidatePath('/dashboard/chat');
  revalidatePath('/');

  return updatedStream;
};
