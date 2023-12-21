'use client';

import { usePathname } from 'next/navigation';
import {
  KeyRoundIcon,
  MessageCircleIcon,
  RadioIcon,
  UsersRoundIcon,
} from 'lucide-react';

import {
  SidebarContent,
  SidebarListItem,
  SidebarListItemIcon,
} from '@/components/layout';

const sidebarItems = [
  { label: 'Stream', href: '/dashboard', icon: <RadioIcon /> },
  { label: 'Keys', href: '/dashboard/keys', icon: <KeyRoundIcon /> },
  { label: 'Chat', href: '/dashboard/chat', icon: <MessageCircleIcon /> },
  {
    label: 'Community',
    href: '/dashboard/community',
    icon: <UsersRoundIcon />,
  },
] as const;

export const DashboardSidebar = () => {
  const pathname = usePathname();

  return (
    <SidebarContent>
      <ul className='flex grow flex-col gap-px lg:w-full [&>li>*]:w-full'>
        {sidebarItems.map(({ label, href, icon }) => (
          <SidebarListItem key={href} href={href} active={pathname === href}>
            <SidebarListItemIcon>{icon}</SidebarListItemIcon>
            <span className='shrink-0 text-xs font-medium lg:text-sm'>
              {label}
            </span>
          </SidebarListItem>
        ))}
      </ul>
    </SidebarContent>
  );
};
