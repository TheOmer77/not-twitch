import type { PropsWithChildren } from 'react';

import ClientCurrentUserProvider from './clientProvider';
import { getCurrentUser } from '@/services/auth';

export const CurrentUserProvider = async ({ children }: PropsWithChildren) => {
  let currentUser;
  try {
    currentUser = await getCurrentUser();
  } catch {
    currentUser = null;
  }
  return (
    <ClientCurrentUserProvider value={currentUser}>
      {children}
    </ClientCurrentUserProvider>
  );
};
