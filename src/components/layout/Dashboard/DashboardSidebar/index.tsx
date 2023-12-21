'use client';

import { usePathname } from 'next/navigation';
import {
  KeyRoundIcon,
  MessageCircleIcon,
  RadioIcon,
  UsersRoundIcon,
} from 'lucide-react';

import { SidebarContent } from '@/components/layout';

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
        {/* TODO: Sidebar items */}
      </ul>
    </SidebarContent>
  );
};
