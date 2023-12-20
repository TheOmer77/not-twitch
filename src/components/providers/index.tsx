import type { PropsWithChildren } from 'react';

import { CurrentUserProvider } from './CurrentUserProvider';

export const Provider = ({ children }: PropsWithChildren) => (
  <CurrentUserProvider>{children}</CurrentUserProvider>
);
