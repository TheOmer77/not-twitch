import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react';
import NextLink from 'next/link';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';

export type LinkProps = ComponentPropsWithoutRef<typeof NextLink> & {
  asChild?: boolean;
};

export const Link = forwardRef<ElementRef<typeof NextLink>, LinkProps>(
  ({ href, asChild, className, children, ...props }, ref) => {
    const Comp = asChild ? Slot : NextLink;
    return (
      <Comp
        {...props}
        ref={ref}
        href={href}
        className={cn(
          `rounded-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50`,
          className
        )}
      >
        {children}
      </Comp>
    );
  }
);
Link.displayName = 'Link';
