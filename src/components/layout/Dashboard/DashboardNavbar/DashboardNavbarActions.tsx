import { UserButton } from '@clerk/nextjs';
import { DashboardExitButton } from './DashboardExitButton';

export const DashboardNavbarActions = () => {
  return (
    <div className='flex items-center justify-end gap-2'>
      <DashboardExitButton />
      <UserButton afterSignOutUrl='/' />
    </div>
  );
};
