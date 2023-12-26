import { createContext } from 'react';
import type { User } from '@prisma/client';

export const CurrentUserContext = createContext<User | null>(null);
