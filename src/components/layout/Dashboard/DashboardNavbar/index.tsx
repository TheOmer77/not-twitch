import { DashboardNavbarActions } from './DashboardNavbarActions';
import { DashboardNavbarLogo } from './DashboardNavbarLogo';

export const DashboardNavbar = () => (
  <>
    <nav
      className='fixed top-0 grid h-16 w-full grid-cols-2 items-center
justify-between gap-4 bg-background pe-2 md:pe-4'
    >
      <DashboardNavbarLogo />
      <DashboardNavbarActions />
    </nav>
    <div className='h-16 w-full' />
  </>
);
