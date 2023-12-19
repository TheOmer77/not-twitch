'use client';

import { forwardRef, type ElementRef } from 'react';
import {
  Avatar as AvatarRoot,
  AvatarFallback,
  AvatarImage,
  type AvatarImageProps,
  type AvatarProps as AvatarRootProps,
} from '@radix-ui/react-avatar';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

export const avatarVariants = cva(
  'relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full',
  {
    variants: {
      size: {
        md: 'h-8 w-8',
        lg: 'h-14 w-14',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export type AvatarProps = AvatarRootProps &
  AvatarImageProps &
  VariantProps<typeof avatarVariants> & { fallback?: string };

export const Avatar = forwardRef<ElementRef<typeof AvatarRoot>, AvatarProps>(
  ({ src, alt, fallback, size, className, ...props }, ref) => (
    <AvatarRoot
      {...props}
      ref={ref}
      className={cn(avatarVariants({ size, className }))}
    >
      <AvatarImage
        src={src}
        alt={alt}
        className='aspect-square h-full w-full'
      />
      <AvatarFallback className='flex h-full w-full items-center justify-center rounded-full bg-muted'>
        {fallback || alt?.[0]}
      </AvatarFallback>
    </AvatarRoot>
  )
);
Avatar.displayName = AvatarRoot.displayName;
