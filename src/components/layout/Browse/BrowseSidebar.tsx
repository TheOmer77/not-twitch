import { Suspense } from 'react';

import { BrowseSidebarUsers } from './BrowseSidebarUsers';
import { BrowseSidebarSkeleton } from './BrowseSidebarSkeleton';
import { Sidebar } from '../Sidebar';
import { getRecommended } from '@/queries/recommended';
import { getFollowedUsers } from '@/queries/follow';

export const BrowseSidebar = async () => {
  const recommended = await getRecommended(),
    followed = await getFollowedUsers();

  return (
    <Suspense fallback={<BrowseSidebarSkeleton />}>
      <Sidebar skeleton={<BrowseSidebarSkeleton />}>
        <BrowseSidebarUsers title='Followed' data={followed} />
        <BrowseSidebarUsers title='Recommended' data={recommended} />
      </Sidebar>
    </Suspense>
  );
};
