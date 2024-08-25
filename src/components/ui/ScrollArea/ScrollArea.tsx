'use client';

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type RefObject,
} from 'react';
import {
  ScrollArea as ScrollAreaRoot,
  ScrollAreaCorner,
  ScrollAreaViewport,
} from '@radix-ui/react-scroll-area';

import { ScrollBar } from './ScrollBar';
import { cn } from '@/lib/utils';

export type ScrollAreaProps = ComponentPropsWithoutRef<
  typeof ScrollAreaRoot
> & {
  viewportRef?: RefObject<HTMLDivElement>;
};

export const ScrollArea = forwardRef<
  ElementRef<typeof ScrollAreaRoot>,
  ScrollAreaProps
>(({ className, asChild, children, viewportRef, ...props }, ref) => (
  <ScrollAreaRoot
    ref={ref}
    className={cn('relative overflow-hidden', className)}
    {...props}
  >
    <ScrollAreaViewport
      ref={viewportRef}
      asChild={asChild}
      className='h-full w-full rounded-[inherit]'
    >
      {children}
    </ScrollAreaViewport>
    <ScrollBar />
    <ScrollAreaCorner />
  </ScrollAreaRoot>
));
ScrollArea.displayName = ScrollAreaRoot.displayName;
