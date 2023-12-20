import { CurrentUserContext } from '@/contexts';
import { useContext } from 'react';

export const useCurrentUser = () => useContext(CurrentUserContext);
