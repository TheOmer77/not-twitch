import type { PropsWithChildren } from 'react';

export const AuthContent = ({ children }: PropsWithChildren) => (
  <div className='space-y-2 [&>:not([hidden])~button:last-child]:mt-4'>
    {children}
  </div>
);
