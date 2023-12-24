'use client';

import { EyeIcon, EyeOffIcon } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Tooltip } from '@/components/ui/Tooltip';

export type SettingsHideButtonProps = {
  value?: boolean;
  onToggle?: (value: boolean) => void;
  disabled?: boolean;
};

export const SettingsHideButton = ({
  value,
  onToggle,
  disabled,
}: SettingsHideButtonProps) => {
  const Icon = value ? EyeOffIcon : EyeIcon;

  return (
    <Tooltip label={value ? 'Show' : 'Hide'}>
      <Button
        variant='flat'
        size='icon'
        onClick={() => onToggle?.(!value)}
        disabled={disabled}
      >
        <Icon className='h-4 w-4' />
      </Button>
    </Tooltip>
  );
};
