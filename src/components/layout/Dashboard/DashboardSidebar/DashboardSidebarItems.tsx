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

export const DashboardSidebarItems = () => {
  const pathname = usePathname();

  return (
    <ul className='flex grow flex-col gap-px lg:w-full [&>li>*]:w-full'>
      {sidebarItems.map(({ label, href, icon }) => (
        <SidebarListItem key={href} href={href} active={pathname === href}>
          <SidebarListItemIcon>{icon}</SidebarListItemIcon>
          <SidebarListItemText>{label}</SidebarListItemText>
        </SidebarListItem>
      ))}
    </ul>
  );
};
