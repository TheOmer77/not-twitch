'use client';

import { useMaybeRoomContext } from '@livekit/components-react';
import { PlayIcon } from 'lucide-react';

export const StreamInteractionNeeded = () => {
  const room = useMaybeRoomContext();

  return (
    <div
      className='absolute start-0 top-0 flex h-full w-full items-center
justify-center'
    >
      <button
        className='absolute z-10 flex h-16 w-16 items-center justify-center
rounded-full bg-neutral-950/50 text-neutral-50
transition-[background-color,opacity] hover:bg-neutral-950/65 active:opacity-50
active:duration-0'
        onClick={() => room && room.startAudio()}
      >
        <PlayIcon className='h-8 w-8' />
      </button>
    </div>
  );
};
