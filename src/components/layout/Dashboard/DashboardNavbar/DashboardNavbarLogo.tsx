'use client';

import Link from 'next/link';

import Logo from '@/components/Logo';
import { cn } from '@/lib/utils';

export const DashboardNavbarLogo = () => {
  return (
    <div className='flex h-full flex-row items-center gap-4'>
      <div
        className={cn(
          `flex h-full w-20 shrink-0 flex-row items-center justify-center gap-4 bg-card lg:w-80 lg:justify-start lg:ps-4`
        )}
      >
        <Link href='/'>
          <Logo className='text-5xl text-primary transition-[opacity,filter] duration-75 hover:brightness-125 active:opacity-70 active:duration-0' />
        </Link>
        <span className='hidden text-xl font-bold tracking-tight lg:block'>
          Creator Dashboard
        </span>
      </div>
      <span
        className={cn('text-xl font-bold leading-6 tracking-tight lg:hidden')}
      >
        Creator Dashboard
      </span>
    </div>
  );
};
