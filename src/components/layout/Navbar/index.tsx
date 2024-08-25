import { NavbarActions } from './NavbarActions';
import { NavbarLogo } from './NavbarLogo';
import { NavbarSearch } from './NavbarSearch';

export const Navbar = () => (
  <>
    <nav className='fixed top-0 grid h-16 w-full grid-cols-[1fr_auto_1fr] items-center justify-between gap-4 bg-background pe-2 md:pe-4'>
      <NavbarLogo />
      <NavbarSearch />
      <NavbarActions />
    </nav>
    <div className='h-16 w-full' />
  </>
);
