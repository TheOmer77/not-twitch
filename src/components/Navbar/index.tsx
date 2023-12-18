import { UserButton } from '@clerk/nextjs';
import Logo from '@/components/Logo';
import Link from 'next/link';

export const Navbar = () => (
  <>
    <nav className='fixed top-0 flex h-16 w-full flex-row items-center justify-between gap-4 bg-background px-2 shadow md:px-4'>
      <h1 className='flex flex-row items-center gap-4 text-xl font-bold tracking-tight'>
        <Link href='/'>
          <Logo className='text-5xl text-primary transition-[opacity,filter] duration-75 hover:brightness-125 active:opacity-70 active:duration-0' />
        </Link>
        Home
      </h1>
      <UserButton afterSignOutUrl='/' />
    </nav>
    <div className='h-16 w-full' />
  </>
);
