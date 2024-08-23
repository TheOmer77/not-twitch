import type { PropsWithChildren } from 'react';

import { ClerkProvider } from './ClerkProvider';

export const Provider = ({ children }: PropsWithChildren) => (
  <ClerkProvider>{children}</ClerkProvider>
);

export * from './StreamProvider';
