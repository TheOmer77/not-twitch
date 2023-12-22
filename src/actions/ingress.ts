'use server';

import { revalidatePath } from 'next/cache';
import {
  IngressAudioEncodingPreset,
  IngressClient,
  IngressInput,
  IngressVideoEncodingPreset,
  RoomServiceClient,
  type CreateIngressOptions,
} from 'livekit-server-sdk';
import { TrackSource } from 'livekit-server-sdk/dist/proto/livekit_models';

import { db } from '@/lib/db';
import { getCurrentUser } from '@/services/auth';

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL as string,
  process.env.LIVEKIT_API_KEY,
  process.env.LIVEKIT_API_SECRET
);
const ingressClient = new IngressClient(process.env.LIVEKIT_API_URL as string);

export const resetIngresses = async (hostId: string) => {
  const ingresses = await ingressClient.listIngress({ roomName: hostId }),
    rooms = await roomService.listRooms([hostId]);

  await Promise.allSettled(
    rooms.map(async room => await roomService.deleteRoom(room.name))
  );
  await Promise.allSettled(
    ingresses.map(
      async ingress =>
        ingress.ingressId &&
        (await ingressClient.deleteIngress(ingress.ingressId))
    )
  );
};

export const createIngress = async (ingressType: IngressInput) => {
  const currentUser = await getCurrentUser();

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
  const ingress = await ingressClient.createIngress(
    ingressType,
    ingressOptions
  );
  if (!ingress || !ingress.url || !ingress.streamKey)
    throw new Error('Failed to create ingress.');

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
