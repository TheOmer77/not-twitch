import { CollapseToggle } from './CollapseToggle';
import { SidebarContent } from './SidebarContent';
import { SidebarUserList } from './SidebarUserList';
import { getRecommended } from '@/services/recommended';
import { getFollowedUsers } from '@/queries/follow';

export const Sidebar = async () => {
  const recommended = await getRecommended(),
    followed = await getFollowedUsers();

  return (
    <SidebarContent>
      <CollapseToggle />
      <SidebarUserList title='Followed' data={followed} />
      <SidebarUserList title='Recommended' data={recommended} />
    </SidebarContent>
  );
};
