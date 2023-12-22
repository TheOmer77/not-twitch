'use client';

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';
import { ScrollUpButton } from '@radix-ui/react-select';
import { ChevronUpIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

export const SelectScrollUpButton = forwardRef<
  ElementRef<typeof ScrollUpButton>,
  ComponentPropsWithoutRef<typeof ScrollUpButton>
>(({ className, ...props }, ref) => (
  <ScrollUpButton
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-1',
      className
    )}
    {...props}
  >
    <ChevronUpIcon className='h-4 w-4' />
  </ScrollUpButton>
));
SelectScrollUpButton.displayName = ScrollUpButton.displayName;
