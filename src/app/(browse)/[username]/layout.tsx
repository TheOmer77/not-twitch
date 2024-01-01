import type { PropsWithChildren } from 'react';

import { Main } from '@/components/layout';

const UserPageLayout = ({ children }: PropsWithChildren) => <Main full>{children}</Main>;

export default UserPageLayout;
