'use client';

import { MaximizeIcon, MinimizeIcon } from 'lucide-react';

import { Tooltip } from '@/components/ui/Tooltip';
import { Button } from '@/components/ui/Button';

export type StreamFullscreenControlProps = {
  isFullscreen?: boolean;
  onFullscreenChange?: (value: boolean) => void;
};

export const StreamFullscreenControl = ({
  isFullscreen = false,
  onFullscreenChange,
}: StreamFullscreenControlProps) => {
  const Icon = isFullscreen ? MinimizeIcon : MaximizeIcon;

  return (
    <Tooltip label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}>
      <Button
        variant='flat'
        size='icon'
        onClick={() => onFullscreenChange?.(!isFullscreen)}
      >
        <Icon className='h-4 w-4' />
      </Button>
    </Tooltip>
  );
};
