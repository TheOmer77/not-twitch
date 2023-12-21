'use client';

import type { ComponentPropsWithRef } from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
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
          'flex-col justify-center px-0 py-8 lg:flex-row lg:justify-start lg:px-4 lg:py-2',
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
