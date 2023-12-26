import { useContext } from 'react';
import { StreamContext } from '@/contexts';

export const useStream = () => useContext(StreamContext);
