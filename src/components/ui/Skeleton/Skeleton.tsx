import type { ComponentPropsWithRef } from 'react';

import { cn } from '@/lib/utils';

export const Skeleton = ({
  className,
  ...props
}: ComponentPropsWithRef<'div'>) => (
  <div
    className={cn('animate-pulse rounded-md bg-muted/70', className)}
    {...props}
  />
);
