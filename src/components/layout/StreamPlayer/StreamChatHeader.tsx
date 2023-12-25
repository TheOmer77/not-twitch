import { UsersRoundIcon } from 'lucide-react';

import { StreamChatCollapseToggle } from './StreamChatCollapseToggle';
import { Button } from '@/components/ui/Button';
import { CardTitle } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { Tooltip } from '@/components/ui/Tooltip';

export const StreamChatHeader = () => (
  <div className='relative flex flex-row items-center gap-2'>
    <StreamChatCollapseToggle />
    <CardTitle className='grow'>Chat</CardTitle>
    <Tooltip label='Community'>
      <Button variant='flat' size='icon'>
        <UsersRoundIcon className='h-4 w-4' />
      </Button>
    </Tooltip>
  </div>
);

export const StreamChatHeaderSkeleton = () => (
  <div className='relative flex flex-row items-center gap-2'>
    <Skeleton className='m-2 h-6 w-6 rounded-full' />
    <CardTitle className='grow'>
      <Skeleton className='h-[1em] w-24' />
    </CardTitle>
    <Skeleton className='m-2 h-6 w-6 rounded-full' />
  </div>
);
