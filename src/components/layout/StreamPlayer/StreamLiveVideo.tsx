'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Track, type Participant, RoomEvent } from 'livekit-client';
import { useMaybeRoomContext, useTracks } from '@livekit/components-react';
import { useEventListener } from 'usehooks-ts';

import { StreamFullscreenControl } from './StreamFullscreenControl';
import { StreamInteractionNeeded } from './StreamInteractionNeeded';
import { StreamVolumeControl } from './StreamVolumeControl';
import { cn } from '@/lib/utils';

export type StreamLiveVideoProps = {
  participant: Participant;
};

export const StreamLiveVideo = ({ participant }: StreamLiveVideoProps) => {
  const [volume, setVolume] = useState(100),
    [muted, setMuted] = useState(true),
    [isFullscreen, setIsFullscreen] = useState(false),
    [interactionNeeded, setInteractionNeeded] = useState(false);

  const room = useMaybeRoomContext();

  useEffect(() => {
    if (!room) return;

    /* By default browsers block audio autoplay until the user interacts
    with the page. In this case display a button to manually play audio. */
    const listener = () => setInteractionNeeded(!room.canPlaybackAudio);
    room.on(RoomEvent.AudioPlaybackStatusChanged, listener);
    return () => {
      room.off(RoomEvent.AudioPlaybackStatusChanged, listener);
    };
  }, [room]);

  const wrapperRef = useRef<HTMLDivElement>(null),
    videoRef = useRef<HTMLVideoElement>(null);

  const handleVolumeChange = useCallback((value: number) => {
    setVolume(value);
    if (value > 0) setMuted(false);

    if (!videoRef.current) return;
    videoRef.current.muted = value < 1;
    videoRef.current.volume = value * 0.01;
  }, []);

  const handleMutedChange = useCallback(
    (muted: boolean) => setMuted(muted),
    []
  );

  const handleFullscreenChange = useCallback((value: boolean) => {
    if (!value) document.exitFullscreen();
    else if (wrapperRef.current) wrapperRef.current.requestFullscreen();
  }, []);

  useEffect(() => {
    handleMutedChange(false);
  }, [handleMutedChange]);

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.muted = muted;
    videoRef.current.volume = muted ? 0 : volume * 0.01;
  }, [muted, volume]);

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
      {interactionNeeded && <StreamInteractionNeeded />}
      <video
        ref={videoRef}
        width='100%'
        className={cn('transition-[filter]', interactionNeeded && 'blur-lg')}
      />
      <div
        className='absolute bottom-0 flex h-14 w-full items-center
justify-between bg-gradient-to-t from-neutral-900 px-2 opacity-0
transition-opacity group-hover:opacity-100'
      >
        <StreamVolumeControl
          value={volume}
          onValueChange={handleVolumeChange}
          muted={muted}
          onMutedChange={handleMutedChange}
        />
        <StreamFullscreenControl
          isFullscreen={isFullscreen}
          onFullscreenChange={handleFullscreenChange}
        />
      </div>
    </div>
  );
};
