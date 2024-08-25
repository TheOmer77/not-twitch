import type { PropsWithChildren } from 'react';

export const AuthDescription = ({ children }: PropsWithChildren) => (
  <p className='text-sm text-muted-foreground'>{children}</p>
);
