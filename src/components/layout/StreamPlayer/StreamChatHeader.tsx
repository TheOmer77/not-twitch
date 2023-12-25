import { ArrowRightToLineIcon, UsersRoundIcon } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { CardTitle } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';

export const StreamChatHeader = () => {
  return (
    <div className='relative flex flex-row items-center gap-2'>
      <Button variant='flat' size='icon'>
        <ArrowRightToLineIcon className='h-4 w-4' />
      </Button>
      <CardTitle className='grow'>Chat</CardTitle>
      <Button variant='flat' size='icon'>
        <UsersRoundIcon className='h-4 w-4' />
      </Button>
    </div>
  );
};

export const StreamChatHeaderSkeleton = () => (
  <div className='relative flex flex-row items-center gap-2'>
    <Skeleton className='m-2 h-6 w-6 rounded-full' />
    <CardTitle className='grow'>
      <Skeleton className='h-[1em] w-24' />
    </CardTitle>
    <Skeleton className='m-2 h-6 w-6 rounded-full' />
  </div>
);
