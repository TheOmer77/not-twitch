import { Suspense } from 'react';

import { Sidebar } from '../Sidebar';
import { BrowseSidebarUsers } from './BrowseSidebarUsers';
import { getRecommended } from '@/queries/recommended';
import { getFollowedUsers } from '@/queries/follow';
import { BrowseSidebarSkeleton } from './BrowseSidebarSkeleton';

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
