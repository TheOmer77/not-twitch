'use server';

import { revalidatePath } from 'next/cache';
import type { Stream } from '@prisma/client';

import { getStreamByUserId, updateStreamByUserId } from '@/queries/stream';
import { getSelf } from '@/services/auth';

export const updateStreamSettings = async ({
  name,
  isChatDelayed,
  isChatEnabled,
  isChatFollowersOnly,
}: Partial<Stream>) => {
  const currentUser = await getSelf(),
    stream = await getStreamByUserId(currentUser.id);
  if (!stream) throw new Error("You don't have a stream.");

  const updatableData = {
    isChatDelayed,
    isChatEnabled,
    isChatFollowersOnly,
    name,
  };
  const updatedStream = await updateStreamByUserId(
    currentUser.id,
    updatableData
  );

  revalidatePath('/dashboard');
  revalidatePath('/dashboard/chat');
  revalidatePath('/');

  return updatedStream;
};
