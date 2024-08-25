import type { PropsWithChildren } from 'react';

export const AuthHeader = ({ children }: PropsWithChildren) => (
  <div className='mb-8 space-y-1'>{children}</div>
);
