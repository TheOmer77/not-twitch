import type { PropsWithChildren } from 'react';

import { DashboardNavbar, DashboardSidebar } from '@/components/layout';

const DashboardLayout = ({ children }: PropsWithChildren) => (
  <>
    <DashboardNavbar />
    <DashboardSidebar />
    {children}
  </>
);

export default DashboardLayout;
