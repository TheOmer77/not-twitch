import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';

import Logo from '@/components/Logo';
import { Search } from './Search';

export const Navbar = () => (
  <>
    <nav className='fixed top-0 flex h-16 w-full flex-row items-center justify-between gap-4 bg-background px-2 shadow md:px-4'>
      <div className='flex flex-row items-center gap-4'>
        <Link href='/'>
          <Logo className='text-5xl text-primary transition-[opacity,filter] duration-75 hover:brightness-125 active:opacity-70 active:duration-0' />
        </Link>
        <h1 className='hidden text-xl font-bold tracking-tight md:inline'>
          Home
        </h1>
      </div>
      <div className='flex flex-row items-center gap-4'>
        <Search />
        <UserButton afterSignOutUrl='/' />
      </div>
    </nav>
    <div className='h-16 w-full' />
  </>
);
