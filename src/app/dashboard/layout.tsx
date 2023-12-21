import type { PropsWithChildren } from 'react';

import { DashboardNavbar, Main } from '@/components/layout';

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <DashboardNavbar />
      <Main>{children}</Main>
    </>
  );
};

export default DashboardLayout;
