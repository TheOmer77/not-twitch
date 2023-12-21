import { Suspense } from 'react';

import { DashboardSidebarSkeleton } from './DashboardSidebarSkeleton';
import { DashboardSidebarItems } from './DashboardSidebarItems';
import { Sidebar } from '@/components/layout';

export const DashboardSidebar = async () => {
  return (
    <Suspense fallback={<DashboardSidebarSkeleton />}>
      <Sidebar skeleton={<DashboardSidebarSkeleton />}>
        <DashboardSidebarItems />
      </Sidebar>
    </Suspense>
  );
};
