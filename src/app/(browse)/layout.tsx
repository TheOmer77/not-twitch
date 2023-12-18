import type { PropsWithChildren } from 'react';
import { Navbar, Sidebar } from '@/components/layout';

const BrowseLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Navbar />
      <Sidebar />
      {children}
    </>
  );
};

export default BrowseLayout;
