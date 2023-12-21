import type { PropsWithChildren } from 'react';

import { DashboardNavbar, DashboardSidebar, Main } from '@/components/layout';

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <DashboardNavbar />
      <DashboardSidebar />
      <Main>{children}</Main>
    </>
  );
};

export default DashboardLayout;
