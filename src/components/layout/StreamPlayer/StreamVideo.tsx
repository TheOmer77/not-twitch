'use client';

import { ConnectionState, Track } from 'livekit-client';
import {
  useConnectionState,
  useRemoteParticipant,
  useTracks,
} from '@livekit/components-react';

import { StreamLiveVideo } from './StreamLiveVideo';
import { StreamLoadingState } from './StreamLoadingState';
import { StreamOfflineState } from './StreamOfflineState';
import { useStream } from '@/hooks';

export const StreamVideo = () => {
  const { hostId, hostName } = useStream();
  const connectionState = useConnectionState(),
    participant = useRemoteParticipant(hostId),
    tracks = useTracks([Track.Source.Camera, Track.Source.Microphone]).filter(
      track => track.participant.identity === hostId
    );

  return (
    <div
      className='group relative aspect-video overflow-hidden rounded-lg
bg-neutral-950 text-neutral-100 dark:border'
    >
      {!participant && connectionState === ConnectionState.Connected ? (
        <StreamOfflineState username={hostName} />
      ) : !participant || tracks.length < 1 ? (
        <StreamLoadingState />
      ) : (
        <StreamLiveVideo />
      )}
    </div>
  );
};
