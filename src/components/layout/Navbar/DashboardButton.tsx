'use client';

import Link from 'next/link';
import { ClapperboardIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export const DashboardButton = ({ username }: { username: string }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant='secondary' size='icon' asChild>
          <Link href={`/user/${username}`}>
            <ClapperboardIcon className='h-4 w-4' />
          </Link>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Dashboard</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);
