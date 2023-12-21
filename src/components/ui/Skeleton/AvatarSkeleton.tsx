import type { ComponentPropsWithRef } from 'react';
import type { VariantProps } from 'class-variance-authority';

import { Skeleton } from './Skeleton';
import { avatarVariants } from '../Avatar';
import { cn } from '@/lib/utils';

export type AvatarSkeletonProps = ComponentPropsWithRef<'div'> &
  VariantProps<typeof avatarVariants>;

export const AvatarSkeleton = ({
  size,
  className,
  ...props
}: AvatarSkeletonProps) => (
  <Skeleton
    className={cn(avatarVariants({ size, className }), className)}
    {...props}
  />
);
