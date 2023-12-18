'use client';

import { SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';

export const Search = () => (
  <div className='relative'>
    <SearchIcon
      className='absolute start-3 text-base text-muted-foreground'
      width='1em'
      height='100%'
    />
    <Input placeholder='Search...' className='ps-9' />
  </div>
);
