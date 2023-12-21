'use client';

import { useCallback, useTransition } from 'react';

import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/useToast';
import { updateStreamSettings } from '@/actions/stream';

export type SwitchSettingsItemProps = {
  field: 'isChatDelayed' | 'isChatEnabled' | 'isChatFollowersOnly';
  label: string;
  description?: string;
  checked?: boolean;
};

export const SwitchSettingsItem = ({
  field,
  label,
  description,
  checked = false,
}: SwitchSettingsItemProps) => {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const handleCheckedChange = useCallback(
    (checked: boolean) => {
      startTransition(async () => {
        try {
          await updateStreamSettings({ [field]: checked });
        } catch (err) {
          toast({
            title: "Couldn't update stream settings",
            description:
              err instanceof Error
                ? err.message
                : 'Something went wrong while trying to update this setting.',
          });
        }
      });
    },
    [field, toast]
  );

  return (
    <li className='flex flex-row items-center px-4 py-2'>
      <div className='5 flex flex-col gap-0'>
        <label htmlFor={`switch-${field}`} className='text-base font-medium'>
          {label}
        </label>
        <p className='text-sm text-muted-foreground'>{description}</p>
      </div>
      <Switch
        id={`switch-${field}`}
        className='ms-auto'
        checked={checked}
        onCheckedChange={handleCheckedChange}
        disabled={isPending}
      />
    </li>
  );
};
