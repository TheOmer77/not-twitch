import { useContext } from 'react';

import { StreamContext } from '@/contexts/streamContext';

export const useStream = () => useContext(StreamContext);
