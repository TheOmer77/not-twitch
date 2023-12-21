import { Switch } from '@/components/ui/switch';

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
  return (
    <li className='flex flex-row items-center px-4 py-2'>
      <div className='5 flex flex-col gap-0'>
        <label htmlFor={`switch-${field}`} className='text-base font-medium'>
          {label}
        </label>
        <p className='text-sm text-muted-foreground'>{description}</p>
      </div>
      <Switch id={`switch-${field}`} className='ms-auto' checked={checked} />
    </li>
  );
};
