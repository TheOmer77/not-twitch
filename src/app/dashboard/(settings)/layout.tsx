import type { PropsWithChildren } from 'react';

import { Main } from '@/components/layout';

const DashboardSettingsLayout = ({ children }: PropsWithChildren) => (
  <Main>{children}</Main>
);

export default DashboardSettingsLayout;
