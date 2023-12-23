'use client';

import type { Stream, User } from '@prisma/client';

import {
  BrowseSidebarUserItem,
  BrowseSidebarUserItemSkeleton,
} from './BrowseSidebarUserItem';
import { Skeleton } from '@/components/ui/Skeleton';
import { useSidebar } from '@/store/useSidebar';
import { cn } from '@/lib/utils';

export type SidebarUserListProps = {
  data: (User & { stream: Stream | null })[];
  title?: string;
};

export const BrowseSidebarUsers = ({ data, title }: SidebarUserListProps) => {
  const collapsed = useSidebar(state => state.collapsed);

  return (
    data.length > 0 && (
      <div
        className={cn(
          'flex w-full flex-col gap-px',
          collapsed ? 'items-center' : 'items-stretch'
        )}
      >
        {typeof title === 'string' && !collapsed && (
          <h2 className='mb-2 p-2 text-sm font-semibold tracking-tight text-muted-foreground'>
            {title}
          </h2>
        )}
        {data.map(({ id, username, imageUrl, stream }) => (
          <BrowseSidebarUserItem
            key={id}
            username={username}
            imageUrl={imageUrl}
            isLive={stream?.isLive}
          />
        ))}
      </div>
    )
  );
};

export const BrowseSidebarUsersSkeleton = () => (
  <div className='flex w-full flex-col'>
    <Skeleton className='m-2 mb-4 hidden h-5 w-28 lg:block' />
    <ul className='flex w-full flex-col'>
      {[...Array(5).keys()].map(key => (
        <BrowseSidebarUserItemSkeleton key={key} />
      ))}
    </ul>
  </div>
);
