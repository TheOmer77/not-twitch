import Link from 'next/link';

import Logo from '@/components/Logo';
import { Search } from './Search';
import { Actions } from './Actions';

export const Navbar = () => (
  <>
    <nav
      className='fixed top-0 grid h-16 w-full grid-cols-[1fr_auto_1fr] items-center
justify-between gap-4 border-b bg-background px-2 shadow md:px-4'
    >
      <div className='flex flex-row items-center justify-start gap-4'>
        <Link href='/'>
          <Logo
            className='text-5xl text-primary transition-[opacity,filter]
duration-75 hover:brightness-125 active:opacity-70 active:duration-0'
          />
        </Link>
      </div>
      <Search />
      <Actions />
    </nav>
    <div className='h-16 w-full' />
  </>
);
