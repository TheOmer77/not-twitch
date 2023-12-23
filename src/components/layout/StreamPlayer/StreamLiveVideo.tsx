'use client';

import { useCallback, useRef, useState } from 'react';
import { Track, type Participant } from 'livekit-client';
import { useTracks } from '@livekit/components-react';
import { useEventListener } from 'usehooks-ts';

import { StreamFullscreenControl } from './StreamFullscreenControl';

export type StreamLiveVideoProps = {
  participant: Participant;
};

export const StreamLiveVideo = ({ participant }: StreamLiveVideoProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null),
    videoRef = useRef<HTMLVideoElement>(null);

  const handleFullscreenChange = useCallback((value: boolean) => {
    if (!value) document.exitFullscreen();
    else if (wrapperRef.current) wrapperRef.current.requestFullscreen();
  }, []);

  useEventListener(
    'fullscreenchange',
    () => setIsFullscreen(document.fullscreenElement !== null),
    wrapperRef
  );

  useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter(track => track.participant.identity === participant.identity)
    .forEach(
      track =>
        videoRef.current && track.publication.track?.attach(videoRef.current)
    );

  return (
    <div ref={wrapperRef} className='group relative flex h-full'>
      <video ref={videoRef} width='100%' />
      <div
        className='absolute bottom-0 flex h-14 w-full items-center
justify-between bg-gradient-to-t from-neutral-900 px-2 opacity-0
transition-opacity group-hover:opacity-100'
      >
        <StreamFullscreenControl
          isFullscreen={isFullscreen}
          onFullscreenChange={handleFullscreenChange}
        />
      </div>
    </div>
  );
};
