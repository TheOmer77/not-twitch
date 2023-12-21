import Link from 'next/link';
import { LogOutIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Tooltip } from '@/components/ui/tooltip';

export const DashboardExitButton = () => (
  <Tooltip label='Exit dashboard'>
    <Button variant='ghost' size='icon' asChild>
      <Link href={`/`}>
        <LogOutIcon className='h-4 w-4' />
      </Link>
    </Button>
  </Tooltip>
);