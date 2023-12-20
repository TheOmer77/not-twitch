import type { User } from '@prisma/client';
import { createContext } from 'react';

export const CurrentUserContext = createContext<User | null>(null);
