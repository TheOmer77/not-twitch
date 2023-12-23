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

export type StreamVideoProps = {
  hostName: string;
  hostId: string;
};

export const StreamVideo = ({ hostName, hostId }: StreamVideoProps) => {
  const connectionState = useConnectionState(),
    participant = useRemoteParticipant(hostId),
    tracks = useTracks([Track.Source.Camera, Track.Source.Microphone]).filter(
      track => track.participant.identity === hostId
    );

  return (
    <div className='group relative aspect-video overflow-hidden rounded-lg bg-card'>
      {!participant && connectionState === ConnectionState.Connected ? (
        <StreamOfflineState username={hostName} />
      ) : !participant || tracks.length < 1 ? (
        <StreamLoadingState />
      ) : (
        <StreamLiveVideo participant={participant} />
      )}
    </div>
  );
};
