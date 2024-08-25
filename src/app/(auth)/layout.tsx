import type { PropsWithChildren } from 'react';
import { ClerkLoaded, ClerkLoading } from '@clerk/nextjs';

import { Spinner } from '@/components/ui/Spinner';
import { Logo } from '@/components/layout/Logo';

const AuthLayout = ({ children }: PropsWithChildren) => (
  <div className='grid w-full grid-cols-1 grid-rows-[theme(spacing.64),1fr] flex-col place-items-center lg:min-h-dvh lg:grid-cols-2 lg:grid-rows-1'>
    <div className='mx-auto w-full max-w-[23rem] p-6'>
      <ClerkLoading>
        <Spinner className='mx-auto size-8' />
      </ClerkLoading>
      <ClerkLoaded>{children}</ClerkLoaded>
    </div>
    <div className='bg-primary dark:from-primary/30 dark:to-primary/0 dark:bg-primary-foreground relative -order-1 grid size-full place-items-center lg:order-1'>
      <Logo className='fill-primary-foreground dark:fill-primary relative size-48' />
    </div>
  </div>
);

export default AuthLayout;
