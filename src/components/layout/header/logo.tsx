'use client';

import Link from 'next/link';

import { Logo } from '@/components/layout/Logo';

export const HeaderLogo = () => (
  <div className='flex h-full w-20 flex-row items-center justify-center gap-4 lg:w-80 lg:justify-start lg:ps-4'>
    <Link href='/'>
      <Logo className='text-5xl text-primary transition-[opacity,filter] duration-75 hover:brightness-125 active:opacity-70 active:duration-0' />
    </Link>
  </div>
);
