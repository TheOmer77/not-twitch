import type { PropsWithChildren } from 'react';

import { DashboardNavbar } from '@/components/layout';

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <DashboardNavbar />
      {children}
    </>
  );
};

export default DashboardLayout;
