import { createContext } from 'react';

import type { User } from '@/types';

export const CurrentUserContext = createContext<User | null>(null);
