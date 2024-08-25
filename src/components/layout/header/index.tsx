import { HeaderLogo } from './logo';
import { HeaderSearch } from './search';
import { HeaderUserMenu } from './user-menu';

export const Header = () => (
  <>
    <header className='fixed top-0 z-20 grid h-16 w-full grid-cols-[1fr_auto_1fr] items-center justify-between gap-4 bg-background pe-2 md:pe-4'>
      <HeaderLogo />
      <HeaderSearch />
      <HeaderUserMenu />
    </header>
    <div className='h-16 w-full' />
  </>
);
