import type { PropsWithChildren } from 'react';

import { ClerkProvider } from './ClerkProvider';
import { TooltipProvider } from '../ui/tooltip';

export const Provider = ({ children }: PropsWithChildren) => (
  <ClerkProvider>
    <TooltipProvider>{children}</TooltipProvider>
  </ClerkProvider>
);

export * from './StreamProvider';
