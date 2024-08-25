import type { PropsWithChildren } from 'react';

import { DashboardSidebar, Header } from '@/components/layout';

const DashboardLayout = ({ children }: PropsWithChildren) => (
  <>
    <Header />
    <DashboardSidebar />
    {children}
  </>
);

export default DashboardLayout;
