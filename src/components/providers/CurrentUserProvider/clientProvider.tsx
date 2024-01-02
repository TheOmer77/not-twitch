'use client';

import type { PropsWithChildren } from 'react';

import { CurrentUserContext } from '@/contexts';
import type { User } from '@/types';

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
