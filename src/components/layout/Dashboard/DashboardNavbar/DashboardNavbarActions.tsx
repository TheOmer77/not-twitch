import { UserMenu } from '@/components/layout/Navbar/UserMenu';

import { DashboardExitButton } from './DashboardExitButton';

export const DashboardNavbarActions = () => (
  <div className='flex items-center justify-end gap-2'>
    <DashboardExitButton />
    <UserMenu />
  </div>
);
