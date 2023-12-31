'use client';

import { useState, type ComponentPropsWithoutRef } from 'react';

import { SettingsItem, type SettingsItemCoreProps } from './SettingsItem';
import { SettingsCopyButton } from './SettingsCopyButton';
import { SettingsHideButton } from './SettingsHideButton';
import { Input } from '@/components/ui/Input';

export type InputSettingsItemProps = SettingsItemCoreProps &
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
      htmlFor={`input-${field}`}
      orientation='vertical'
    >
      <div className='flex w-full flex-row gap-2'>
        <Input
          {...props}
          {...(secret ? { type: hidden ? 'password' : 'text' } : {})}
          value={value}
          id={`input-${field}`}
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
