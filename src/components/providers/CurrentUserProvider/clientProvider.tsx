'use client';

import type { PropsWithChildren } from 'react';
import type { User } from '@prisma/client';

import { CurrentUserContext } from '@/contexts';

const ClientCurrentUserProvider = ({
  value,
  children,
}: PropsWithChildren<{ value: User | null }>) => {
  return (
    <CurrentUserContext.Provider value={value}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default ClientCurrentUserProvider;
