import type { PropsWithChildren } from 'react';

import { BrowseSidebar, Header } from '@/components/layout';

const BrowseLayout = ({ children }: PropsWithChildren) => (
  <>
    <Header />
    <BrowseSidebar />
    {children}
  </>
);

export default BrowseLayout;
