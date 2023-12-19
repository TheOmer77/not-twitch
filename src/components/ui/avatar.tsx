'use client';

import { forwardRef, type ElementRef } from 'react';
import {
  Avatar as AvatarRoot,
  AvatarFallback,
  AvatarImage,
  type AvatarImageProps,
  type AvatarProps as AvatarRootProps,
} from '@radix-ui/react-avatar';

import { cn } from '@/lib/utils';

export type AvatarProps = AvatarRootProps &
  AvatarImageProps & { fallback?: string };

export const Avatar = forwardRef<ElementRef<typeof AvatarRoot>, AvatarProps>(
  ({ src, alt, fallback, className, ...props }, ref) => (
    <AvatarRoot
      {...props}
      ref={ref}
      className={cn(
        'relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full',
        className
      )}
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
