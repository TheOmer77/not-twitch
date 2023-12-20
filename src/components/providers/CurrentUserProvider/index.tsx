import type { PropsWithChildren } from 'react';

import ClientCurrentUserProvider from './clientProvider';
import { getSelf } from '@/services/auth';

export const CurrentUserProvider = async ({ children }: PropsWithChildren) => {
  const currentUser = await getSelf();
  return (
    <ClientCurrentUserProvider value={currentUser}>
      {children}
    </ClientCurrentUserProvider>
  );
};
