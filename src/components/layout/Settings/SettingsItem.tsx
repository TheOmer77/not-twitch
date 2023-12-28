import type { PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

export type SettingsItemProps = PropsWithChildren<{
  field?: string;
  label: string;
  description?: string;
  htmlFor?: string;
  orientation?: 'horizontal' | 'vertical';
}>;

export const SettingsItem = ({
  field,
  label,
  description,
  htmlFor,
  orientation = 'horizontal',
  children,
}: SettingsItemProps) => (
  <li
    className={cn(
      'flex items-center gap-2 px-4 py-3',
      orientation === 'vertical' ? 'flex-col items-start' : 'flex-row'
    )}
  >
    <div className='5 flex flex-col gap-0'>
      <label htmlFor={htmlFor || field} className='text-base font-medium'>
        {label}
      </label>
      <p className='text-sm text-muted-foreground'>{description}</p>
    </div>
    {children}
  </li>
);
