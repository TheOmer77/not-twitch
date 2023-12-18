import type { PropsWithChildren } from 'react';
import { Main, Navbar, Sidebar } from '@/components/layout';

const BrowseLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Main>{children}</Main>
    </>
  );
};

export default BrowseLayout;
