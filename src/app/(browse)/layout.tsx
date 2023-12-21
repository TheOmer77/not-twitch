import { type PropsWithChildren } from 'react';
import { BrowseSidebar, Main, Navbar } from '@/components/layout';

const BrowseLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Navbar />
      <BrowseSidebar />
      <Main>{children}</Main>
    </>
  );
};

export default BrowseLayout;
