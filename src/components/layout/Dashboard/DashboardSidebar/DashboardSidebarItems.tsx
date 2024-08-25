'use client';

import { usePathname } from 'next/navigation';
import {
  KeyRoundIcon,
  MessageCircleIcon,
  RadioIcon,
  UsersRoundIcon,
} from 'lucide-react';

import {
  SidebarListItem,
  SidebarListItemIcon,
  SidebarListItemText,
} from '@/components/layout/Sidebar';

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

export const DashboardSidebarItems = () => {
  const pathname = usePathname();

  return (
    <ul className='grid w-full grow grid-cols-4 flex-row gap-px md:flex md:flex-col lg:w-full [&>li>*]:w-full'>
      {sidebarItems.map(({ label, href, icon }) => (
        <SidebarListItem key={href} href={href} active={pathname === href}>
          <SidebarListItemIcon>{icon}</SidebarListItemIcon>
          <SidebarListItemText>{label}</SidebarListItemText>
        </SidebarListItem>
      ))}
    </ul>
  );
};
