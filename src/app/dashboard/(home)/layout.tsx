import type { PropsWithChildren } from 'react';

import { Main } from '@/components/layout';

const DashboardStreamLayout = ({ children }: PropsWithChildren) => (
  <Main full>{children}</Main>
);

export default DashboardStreamLayout;
