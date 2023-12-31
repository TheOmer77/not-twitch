'use client';

import { StreamChatCollapseToggle } from './StreamChatCollapseToggle';
import { StreamChatVariantToggle } from './StreamChatVariantToggle';
import { CardTitle } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { useChatSidebar } from '@/store/useChatSidebar';

export const StreamChatHeader = () => {
  const { variant } = useChatSidebar();

  return (
    <div className='relative flex flex-row items-center gap-2'>
      <StreamChatCollapseToggle />
      <CardTitle className='grow'>
        {variant === 'community' ? 'Community' : 'Chat'}
      </CardTitle>
      <StreamChatVariantToggle />
    </div>
  );
};

export const StreamChatHeaderSkeleton = () => (
  <div className='relative flex flex-row items-center gap-2'>
    <Skeleton className='m-2.5 h-5 w-5 rounded-full' />
    <CardTitle className='grow'>
      <Skeleton className='h-em w-24' />
    </CardTitle>
    <Skeleton className='m-2.5 h-5 w-5 rounded-full' />
  </div>
);
