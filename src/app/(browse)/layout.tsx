import type { PropsWithChildren } from 'react';
import { Navbar } from '@/components/Navbar';

const BrowseLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default BrowseLayout;
