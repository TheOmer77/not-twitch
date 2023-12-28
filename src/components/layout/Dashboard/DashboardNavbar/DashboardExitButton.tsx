import Link from 'next/link';
import { LogOutIcon } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Tooltip } from '@/components/ui/Tooltip';

export const DashboardExitButton = () => (
  <Tooltip label='Exit dashboard'>
    <Button variant='flat' size='icon' asChild>
      <Link href={`/`}>
        <LogOutIcon />
      </Link>
    </Button>
  </Tooltip>
);
