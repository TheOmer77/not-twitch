'use client';

import { forwardRef, type ElementRef } from 'react';
import {
  Fallback,
  Image,
  Root,
  type AvatarFallbackProps,
  type AvatarImageProps,
  type AvatarProps,
} from '@radix-ui/react-avatar';

import { cn } from '@/lib/utils';

export const Avatar = forwardRef<ElementRef<typeof Root>, AvatarProps>(
  ({ className, ...props }, ref) => (
    <Root
      ref={ref}
      className={cn(
        'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
        className
      )}
      {...props}
    />
  )
);
Avatar.displayName = Root.displayName;

export const AvatarImage = forwardRef<
  ElementRef<typeof Image>,
  AvatarImageProps
>(({ src, alt, className, ...props }, ref) => (
  <Image
    ref={ref}
    src={src}
    alt={alt}
    className={cn('aspect-square h-full w-full', className)}
    {...props}
  />
));
AvatarImage.displayName = Image.displayName;

export const AvatarFallback = forwardRef<
  ElementRef<typeof Fallback>,
  AvatarFallbackProps
>(({ className, ...props }, ref) => (
  <Fallback
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center rounded-full bg-muted',
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = Fallback.displayName;
