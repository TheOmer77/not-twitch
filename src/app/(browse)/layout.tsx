import type { PropsWithChildren } from 'react';

import { BrowseSidebar, Navbar } from '@/components/layout';

const BrowseLayout = ({ children }: PropsWithChildren) => (
  <>
    <Navbar />
    <BrowseSidebar />
    {children}
  </>
);

export default BrowseLayout;
