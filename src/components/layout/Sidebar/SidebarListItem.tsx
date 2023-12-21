'use client';

import type { ComponentPropsWithRef } from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export type SidebarListItemProps = ComponentPropsWithRef<typeof Link> & {
  active?: boolean;
};

export const SidebarListItem = ({
  active,
  className,
  children,
  ...props
}: SidebarListItemProps) => {
  return (
    <li>
      <Button
        variant='ghost'
        className={cn(
          `h-16 flex-col justify-center p-0 lg:h-10 lg:flex-row
lg:justify-start lg:px-4`,
          active && 'bg-accent',
          className
        )}
        asChild
      >
        <Link {...props}>{children}</Link>
      </Button>
    </li>
  );
};
