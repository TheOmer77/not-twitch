import { Suspense } from 'react';

import { DashboardSidebarSkeleton } from './DashboardSidebarSkeleton';
import { DashboardSidebarItems } from './DashboardSidebarItems';
import { Sidebar } from '@/components/layout/Sidebar';

export const DashboardSidebar = async () => {
  return (
    <Suspense fallback={<DashboardSidebarSkeleton />}>
      <Sidebar skeleton={<DashboardSidebarSkeleton />}>
        <DashboardSidebarItems />
      </Sidebar>
    </Suspense>
  );
};
