'use client';

import { useRef } from 'react';
import { Track, type Participant } from 'livekit-client';
import { useTracks } from '@livekit/components-react';

export type StreamLiveVideoProps = {
  participant: Participant;
};

export const StreamLiveVideo = ({ participant }: StreamLiveVideoProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null),
    videoRef = useRef<HTMLVideoElement>(null);

  useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter(track => track.participant.identity === participant.identity)
    .forEach(
      track =>
        videoRef.current && track.publication.track?.attach(videoRef.current)
    );

  return (
    <div ref={wrapperRef} className='relative flex h-full'>
      <video ref={videoRef} width='100%' />
    </div>
  );
};
