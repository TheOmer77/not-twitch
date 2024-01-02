import type { PropsWithChildren } from 'react';

import ClientCurrentUserProvider from './clientProvider';
import { getCurrentUser } from '@/queries/auth';

export const CurrentUserProvider = async ({ children }: PropsWithChildren) => {
  const currentUser = await getCurrentUser();

  return (
    <ClientCurrentUserProvider value={currentUser}>
      {children}
    </ClientCurrentUserProvider>
  );
};
