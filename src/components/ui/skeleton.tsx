import type { ComponentPropsWithRef } from 'react';
import type { VariantProps } from 'class-variance-authority';

import { avatarVariants } from './avatar';
import { cn } from '@/lib/utils';

export const Skeleton = ({
  className,
  ...props
}: ComponentPropsWithRef<'div'>) => (
  <div
    className={cn('animate-pulse rounded-md bg-muted', className)}
    {...props}
  />
);

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
