'use client';

import {
  useCallback,
  useTransition,
  type ComponentPropsWithoutRef,
} from 'react';

import { SettingsItem, type SettingsItemProps } from './SettingsItem';
import { Switch } from '@/components/ui/Switch';
import { useToast } from '@/hooks';
import { updateStreamSettings } from '@/actions/stream';

export type SwitchSettingsItemProps = Omit<SettingsItemProps, 'children'> &
  ComponentPropsWithoutRef<typeof Switch>;

export const SwitchSettingsItem = ({
  field,
  label,
  description,
  checked = false,
  disabled,
  ...props
}: SwitchSettingsItemProps) => {
  const { displayToast } = useToast();
  const [isPending, startTransition] = useTransition();

  const handleCheckedChange = useCallback(
    (checked: boolean) => {
      if (!field) return;
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
    <SettingsItem
      field={field}
      label={label}
      description={description}
      htmlFor={`switch-${field}`}
    >
      <Switch
        {...props}
        id={`switch-${field}`}
        className='ms-auto'
        checked={checked}
        onCheckedChange={handleCheckedChange}
        disabled={disabled || isPending}
      />
    </SettingsItem>
  );
};
