import { type PropsWithChildren } from 'react';

export type SettingsItemProps = PropsWithChildren<{
  field: 'isChatDelayed' | 'isChatEnabled' | 'isChatFollowersOnly';
  label: string;
  description?: string;
  htmlFor?: string;
}>;

export const SettingsItem = ({
  field,
  label,
  description,
  htmlFor: labelId,
  children,
}: SettingsItemProps) => (
  <li className='flex flex-row items-center px-4 py-3'>
    <div className='5 flex flex-col gap-0'>
      <label htmlFor={labelId || field} className='text-base font-medium'>
        {label}
      </label>
      <p className='text-sm text-muted-foreground'>{description}</p>
    </div>
    {children}
  </li>
);
