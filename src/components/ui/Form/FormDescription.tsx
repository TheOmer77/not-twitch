import { forwardRef, type ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/utils';

export type FormDescriptionProps = ComponentPropsWithoutRef<'p'> & {
  error?: boolean;
};

export const FormDescription = forwardRef<
  HTMLParagraphElement,
  FormDescriptionProps
>(({ error, className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      'mt-2 text-xs text-muted-foreground',
      error && 'text-destructive',
      className
    )}
    {...props}
  />
));
FormDescription.displayName = 'FormDescription';
