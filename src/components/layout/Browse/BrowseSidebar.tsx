import { Suspense } from 'react';

import { SidebarCollapseToggle } from '../Sidebar/SidebarCollapseToggle';
import { Sidebar } from '../Sidebar/Sidebar';
import { BrowseSidebarUsers } from './BrowseSidebarUsers';
import { getRecommended } from '@/services/recommended';
import { getFollowedUsers } from '@/queries/follow';
import { BrowseSidebarSkeleton } from './BrowseSidebarSkeleton';

export const BrowseSidebar = async () => {
  const recommended = await getRecommended(),
    followed = await getFollowedUsers();

  return (
    <Suspense fallback={<BrowseSidebarSkeleton />}>
      <Sidebar skeleton={<BrowseSidebarSkeleton />}>
        <SidebarCollapseToggle />
        <BrowseSidebarUsers title='Followed' data={followed} />
        <BrowseSidebarUsers title='Recommended' data={recommended} />
      </Sidebar>
    </Suspense>
  );
};
