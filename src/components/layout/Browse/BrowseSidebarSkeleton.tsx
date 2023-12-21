import { BrowseSidebarUsersSkeleton } from './BrowseSidebarUsers';
import { SidebarSkeletonBase } from '@/components/layout/Sidebar';

export const BrowseSidebarSkeleton = () => (
  <SidebarSkeletonBase>
    <BrowseSidebarUsersSkeleton />
    <BrowseSidebarUsersSkeleton />
  </SidebarSkeletonBase>
);
