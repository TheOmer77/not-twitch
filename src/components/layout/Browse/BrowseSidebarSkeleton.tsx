import type { ComponentPropsWithoutRef } from 'react';
import { BrowseSidebarUsersSkeleton } from './BrowseSidebarUsers';
import { SidebarSkeletonBase } from '@/components/layout/Sidebar';

export const BrowseSidebarSkeleton = (
  props: ComponentPropsWithoutRef<typeof SidebarSkeletonBase>
) => (
  <SidebarSkeletonBase {...props}>
    <BrowseSidebarUsersSkeleton />
    <BrowseSidebarUsersSkeleton />
  </SidebarSkeletonBase>
);
