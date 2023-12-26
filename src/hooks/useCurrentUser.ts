import { useContext } from 'react';
import { CurrentUserContext } from '@/contexts';

export const useCurrentUser = () => useContext(CurrentUserContext);
