'use client';

import type { User } from '@prisma/client';

import { UserItem, UserItemSkeleton } from './UserItem';
import { useSidebar } from '@/store/useSidebar';
import { cn } from '@/lib/utils';

export type RecommendedProps = {
  data: User[];
};

export const Recommended = ({ data }: RecommendedProps) => {
  const collapsed = useSidebar(state => state.collapsed);

  return (
    <div className={cn(!collapsed && 'flex w-full flex-col')}>
      {!collapsed && data.length > 0 && (
        <h2 className='mb-2 p-2 text-sm font-semibold tracking-tight text-muted-foreground'>
          Recommended
        </h2>
      )}
      {data.map(({ id, username, imageUrl }) => (
        <UserItem
          key={id}
          username={username}
          imageUrl={imageUrl}
          isLive={false}
        />
      ))}
    </div>
  );
};

export const RecommendedSkeleton = () => (
  <ul className='px-2'>
    {[...Array(5).keys()].map(key => (
      <UserItemSkeleton key={key} />
    ))}
  </ul>
);
