'use server';

import { revalidatePath } from 'next/cache';
import {
  IngressAudioEncodingPreset,
  IngressInput,
  IngressVideoEncodingPreset,
  type CreateIngressOptions,
} from 'livekit-server-sdk';
import { TrackSource } from 'livekit-server-sdk/dist/proto/livekit_models';

import { getCurrentUser } from '@/queries/auth';
import { db } from '@/lib/db';
import { createIngress, resetIngresses } from '@/lib/ingress';

export const createUserIngress = async (ingressType: IngressInput) => {
  const currentUser = await getCurrentUser({ throwIfNotFound: true });

  await resetIngresses(currentUser.id);

  const ingressOptions: CreateIngressOptions = {
    name: currentUser.username,
    roomName: currentUser.id,
    participantName: currentUser.username,
    participantIdentity: currentUser.id,
    ...(ingressType === IngressInput.WHIP_INPUT
      ? { bypassTranscoding: true }
      : {
          video: {
            source: TrackSource.CAMERA,
            preset: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
          },
          audio: {
            source: TrackSource.MICROPHONE,
            preset: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS,
          },
        }),
  };
  const ingress = await createIngress(ingressType, ingressOptions);
  await db.stream.update({
    where: { userId: currentUser.id },
    data: {
      ingressId: ingress.ingressId,
      serverUrl: ingress.url,
      streamKey: ingress.streamKey,
    },
  });

  revalidatePath('/dashboard/keys');
  return ingress;
};

export const deleteUserIngress = async () => {
  const currentUser = await getCurrentUser({ throwIfNotFound: true });

  await resetIngresses(currentUser.id);
  await db.stream.update({
    where: { userId: currentUser.id },
    data: { ingressId: null, serverUrl: null, streamKey: null },
  });
  revalidatePath('/dashboard/keys');
};
