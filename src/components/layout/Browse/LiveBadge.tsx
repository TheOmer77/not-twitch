import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/utils';

export const LiveBadge = ({
  className,
  ...props
}: ComponentPropsWithoutRef<'span'>) => (
  <span
    {...props}
    className={cn(
      `rounded-sm bg-destructive px-1.5 py-1 text-xs font-medium uppercase
text-destructive-foreground`,
      className
    )}
  >
    Live
  </span>
);
