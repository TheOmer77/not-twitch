import { BrowseSidebarUsersSkeleton } from './BrowseSidebarUsers';
import { SidebarSkeletonBase } from '@/components/layout';

export const BrowseSidebarSkeleton = () => (
  <SidebarSkeletonBase>
    <BrowseSidebarUsersSkeleton />
    <BrowseSidebarUsersSkeleton />
  </SidebarSkeletonBase>
);
