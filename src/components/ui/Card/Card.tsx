import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/lib/utils';

export type CardProps = ComponentPropsWithoutRef<'div'> & { asChild?: boolean };

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ asChild, className, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';

    return (
      <Comp
        ref={ref}
        className={cn(
          'rounded-lg bg-card text-card-foreground shadow-sm',
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = 'Card';
