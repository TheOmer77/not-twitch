'use client';

import { forwardRef, type ElementRef, type ReactNode } from 'react';
import {
  Tooltip as TooltipRoot,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  type TooltipContentProps,
} from '@radix-ui/react-tooltip';

import { cn } from '@/lib/utils';

export type TooltipProps = TooltipContentProps & {
  label: ReactNode;
};

export const Tooltip = forwardRef<
  ElementRef<typeof TooltipContent>,
  TooltipProps
>(({ label, sideOffset = 4, className, children, ...props }, ref) => (
  <TooltipProvider>
    <TooltipRoot>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent
        {...props}
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
          `z-50 overflow-hidden rounded-md bg-popover px-3 py-1.5 text-xs font-medium text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2`,
          className
        )}
      >
        {label}
      </TooltipContent>
    </TooltipRoot>
  </TooltipProvider>
));
Tooltip.displayName = 'Tooltip';
