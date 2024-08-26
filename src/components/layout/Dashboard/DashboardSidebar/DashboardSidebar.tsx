import { Suspense } from 'react';

import { DashboardSidebarSkeleton } from './DashboardSidebarSkeleton';
import { DashboardSidebarItems } from './DashboardSidebarItems';
import { Sidebar } from '@/components/layout/Sidebar';

export const DashboardSidebar = async () => {
  const skeleton = <DashboardSidebarSkeleton className='hidden md:flex' />;
  return (
    <Suspense fallback={skeleton}>
      <Sidebar
        className='h-16 w-full pt-1 md:h-full md:w-20 md:flex-col'
        skeleton={skeleton}
      >
        <DashboardSidebarItems />
      </Sidebar>
    </Suspense>
  );
};
