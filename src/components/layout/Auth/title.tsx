import type { PropsWithChildren } from 'react';

export const AuthTitle = ({ children }: PropsWithChildren) => (
  <h1 className='text-3xl font-bold tracking-tight text-foreground'>
    {children}
  </h1>
);
