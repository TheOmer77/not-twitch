import { CollapseToggle } from './CollapseToggle';
import { Recommended } from './Recommended';
import { SidebarWrapper } from './SidebarWrapper';
import { getRecommended } from '@/services/recommended';

export const Sidebar = async () => {
  const recommended = await getRecommended();

  return (
    <SidebarWrapper>
      <CollapseToggle />
      <Recommended data={recommended} />
    </SidebarWrapper>
  );
};
