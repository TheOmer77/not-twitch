import { Suspense, type PropsWithChildren } from 'react';
import { Main, Navbar, Sidebar, SidebarSkeleton } from '@/components/layout';

const BrowseLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Navbar />
      <Suspense fallback={<SidebarSkeleton />}>
        <Sidebar />
      </Suspense>
      <Main>{children}</Main>
    </>
  );
};

export default BrowseLayout;
