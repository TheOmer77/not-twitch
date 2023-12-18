import type { PropsWithChildren } from 'react';
import { Navbar } from '@/components/layout';

const BrowseLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default BrowseLayout;
