import { type PropsWithChildren } from 'react';
import Logo from '@/components/Logo';

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className='flex h-full w-full items-center justify-center bg-primary dark:bg-background'>
      <div
        className='mx-4 flex w-full max-w-[25rem] flex-col items-center
justify-center rounded-lg bg-card p-8 shadow-lg dark:bg-slate-900'
      >
        <Logo className='text-9xl text-primary' />
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
