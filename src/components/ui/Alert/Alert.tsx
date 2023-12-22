import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import type { VariantProps } from 'class-variance-authority';

import { alertVariants } from './variants';
import { cn } from '@/lib/utils';

export const Alert = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<'div'> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role='alert'
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = 'Alert';
