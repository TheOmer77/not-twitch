'use client';

import { useCallback, useState, type FormEventHandler } from 'react';
import { useRouter } from 'next/navigation';
import queryString from 'query-string';
import { SearchIcon } from 'lucide-react';

import { Input } from '@/components/ui/Input';

export const NavbarSearch = () => {
  const router = useRouter();
  const [value, setValue] = useState('');

  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    e => {
      e.preventDefault();
      if (!value) return;

      const url = queryString.stringifyUrl(
        {
          url: '/search',
          query: { query: value },
        },
        { skipEmptyString: true }
      );
      router.push(url);
    },
    [router, value]
  );

  return (
    <form onSubmit={handleSubmit} className='relative w-full md:w-96'>
      <SearchIcon
        className='absolute start-3 h-full w-em text-base
text-muted-foreground'
      />
      <Input
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder='Search...'
        className='w-full ps-9'
      />
    </form>
  );
};
