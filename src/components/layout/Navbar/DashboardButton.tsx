'use client';

import Link from 'next/link';
import { ClapperboardIcon } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Tooltip } from '@/components/ui/Tooltip';

export const DashboardButton = () => (
  <Tooltip label='Dashboard'>
    <Button variant='ghost' size='icon' asChild>
      <Link href='/dashboard'>
        <ClapperboardIcon className='h-4 w-4' />
      </Link>
    </Button>
  </Tooltip>
);
