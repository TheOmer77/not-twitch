import { CollapseToggle } from './CollapseToggle';
import { SidebarContent } from './SidebarContent';
import { SidebarUserList, SidebarUserListSkeleton } from './SidebarUserList';
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

export const SidebarSkeleton = () => (
  <aside
    className='fixed start-0 z-20 flex h-full w-20 flex-col items-center gap-1
border-e bg-card p-2 shadow lg:w-80'
  >
    <SidebarUserListSkeleton />
    <SidebarUserListSkeleton />
  </aside>
);
