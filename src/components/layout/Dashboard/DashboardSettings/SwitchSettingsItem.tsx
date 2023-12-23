'use client';

import { useCallback, useTransition } from 'react';

import { Switch } from '@/components/ui/Switch';
import { useToast } from '@/hooks';
import { updateStreamSettings } from '@/actions/stream';
import { SettingsItem, type SettingsItemProps } from './SettingsItem';

export type SwitchSettingsItemProps = Omit<SettingsItemProps, 'children'> & {
  checked?: boolean;
};

export const SwitchSettingsItem = ({
  field,
  checked = false,
  ...props
}: SwitchSettingsItemProps) => {
  const { displayToast } = useToast();
  const [isPending, startTransition] = useTransition();

  const handleCheckedChange = useCallback(
    (checked: boolean) => {
      startTransition(async () => {
        try {
          await updateStreamSettings({ [field]: checked });
        } catch (err) {
          displayToast("Couldn't update stream settings", {
            description:
              err instanceof Error
                ? err.message
                : 'Something went wrong while trying to update this setting.',
          });
        }
      });
    },
    [displayToast, field]
  );

  return (
    <SettingsItem {...props} field={field} htmlFor={`switch-${field}`}>
      <Switch
        id={`switch-${field}`}
        className='ms-auto'
        checked={checked}
        onCheckedChange={handleCheckedChange}
        disabled={isPending}
      />
    </SettingsItem>
  );
};
