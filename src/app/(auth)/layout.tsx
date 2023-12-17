import { type PropsWithChildren } from 'react';
import Logo from '@/components/Logo';

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className='flex h-full w-full flex-col items-center justify-center bg-primary'>
      <Logo className='text-9xl text-primary-foreground' />
      {children}
    </div>
  );
};

export default AuthLayout;
