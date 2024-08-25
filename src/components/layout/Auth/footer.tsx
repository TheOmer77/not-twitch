import type { PropsWithChildren } from 'react';

export const AuthFooter = ({ children }: PropsWithChildren) => (
  <div className='mt-4 space-y-4 text-sm text-muted-foreground'>{children}</div>
);
