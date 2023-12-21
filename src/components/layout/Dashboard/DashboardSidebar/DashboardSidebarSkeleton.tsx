'use client';

import { SidebarSkeletonBase } from '@/components/layout/Sidebar';
import { AvatarSkeleton, Skeleton } from '@/components/ui/skeleton';

export const DashboardSidebarSkeleton = () => (
  <SidebarSkeletonBase>
    <ul className='flex grow flex-col gap-px lg:w-full'>
      {[...Array(4).keys()].map(key => (
        <li
          key={key}
          className='inline-flex h-10 flex-row items-center justify-start
gap-2 px-4 py-2'
        >
          <AvatarSkeleton />
          <Skeleton className='hidden h-5 grow lg:block' />
        </li>
      ))}
    </ul>
  </SidebarSkeletonBase>
);
