import type { PropsWithChildren } from 'react';

import ClientCurrentUserProvider from './clientProvider';
import { getSelf } from '@/services/auth';

export const CurrentUserProvider = async ({ children }: PropsWithChildren) => {
  let currentUser;
  try {
    currentUser = await getSelf();
  } catch {
    currentUser = null;
  }
  return (
    <ClientCurrentUserProvider value={currentUser}>
      {children}
    </ClientCurrentUserProvider>
  );
};
