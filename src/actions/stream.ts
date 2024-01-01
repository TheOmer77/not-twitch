'use server';

import { revalidatePath } from 'next/cache';
import type { Stream } from '@prisma/client';

import { getCurrentUser } from '@/queries/auth';
import { getStreamByUserId, updateStreamByUserId } from '@/queries/stream';
import { uploadThingApi } from '@/lib/uploadthing';

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

  if (
    (updatableData.thumbnailUrl === null ||
      updatableData.thumbnailUrl !== stream.thumbnailUrl) &&
    stream.thumbnailUrl !== null
  ) {
    const fileKey = stream.thumbnailUrl.split('/').at(-1) || null;
    try {
      fileKey && (await uploadThingApi.deleteFiles(fileKey));
    } catch (err) {
      console.error(
        `File ${fileKey} should be deleted but doesn't exist. This shouldn't happen!`
      );
    }
  }

  const updatedStream = await updateStreamByUserId(
    currentUser.id,
    updatableData
  );

  revalidatePath('/dashboard');
  revalidatePath('/dashboard/chat');
  revalidatePath('/');

  return updatedStream;
};
