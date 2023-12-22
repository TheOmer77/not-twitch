'use client';

import { useState, type ComponentPropsWithoutRef } from 'react';

import { Input } from '@/components/ui/Input';
import { SettingsItem, type SettingsItemProps } from './SettingsItem';
import { SettingsCopyButton } from './SettingsCopyButton';
import { SettingsHideButton } from './SettingsHideButton';

export type InputSettingsItemProps = SettingsItemProps &
  ComponentPropsWithoutRef<typeof Input> & {
    withCopyButton?: boolean;
    secret?: boolean;
  };

export const InputSettingsItem = ({
  field,
  label,
  description,
  value,
  withCopyButton,
  secret,
  ...props
}: InputSettingsItemProps) => {
  const [hidden, setHidden] = useState(true);

  return (
    <SettingsItem
      field={field}
      label={label}
      description={description}
      htmlFor={`switch-${field}`}
      orientation='vertical'
    >
      <div className='flex w-full flex-row gap-2'>
        <Input
          {...props}
          {...(secret ? { type: hidden ? 'password' : 'text' } : {})}
          value={value}
          id={`switch-${field}`}
          className='grow'
        />
        {secret && (
          <SettingsHideButton
            value={hidden}
            onToggle={setHidden}
            disabled={!value}
          />
        )}
        {withCopyButton && <SettingsCopyButton value={value} />}
      </div>
    </SettingsItem>
  );
};
