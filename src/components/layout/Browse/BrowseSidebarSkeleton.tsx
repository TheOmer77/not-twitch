import type { ComponentPropsWithoutRef } from 'react';

import { SidebarSkeletonBase } from '@/components/layout/Sidebar';

import { BrowseSidebarUsersSkeleton } from './BrowseSidebarUsers';

export const BrowseSidebarSkeleton = (
  props: ComponentPropsWithoutRef<typeof SidebarSkeletonBase>
) => (
  <SidebarSkeletonBase {...props}>
    <BrowseSidebarUsersSkeleton />
    <BrowseSidebarUsersSkeleton />
  </SidebarSkeletonBase>
);
