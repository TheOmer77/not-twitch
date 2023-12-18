'use client';

import Link from 'next/link';
import { ClapperboardIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Tooltip } from '@/components/ui/tooltip';

export const DashboardButton = ({ username }: { username: string }) => (
  <Tooltip title='Dashboard'>
    <Button variant='secondary' size='icon' asChild>
      <Link href={`/user/${username}`}>
        <ClapperboardIcon className='h-4 w-4' />
      </Link>
    </Button>
  </Tooltip>
);
