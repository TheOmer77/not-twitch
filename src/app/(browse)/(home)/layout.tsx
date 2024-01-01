import type { PropsWithChildren } from 'react';

import { Main } from '@/components/layout';

const HomeLayout = ({ children }: PropsWithChildren) => <Main>{children}</Main>;

export default HomeLayout;
