import { type PropsWithChildren } from 'react';

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className='flex h-full w-full flex-col items-center justify-center bg-primary'>
      {children}
    </div>
  );
};

export default AuthLayout;
