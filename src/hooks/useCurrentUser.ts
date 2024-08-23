import { useContext } from 'react';

import { CurrentUserContext } from '@/contexts/currentUserContext';

export const useCurrentUser = () => useContext(CurrentUserContext);
