import { cn } from '@/lib/utils';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';

export const LoadingSpinner = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<'svg'>
>(({ className, ...props }, ref) => (
  <svg
    {...props}
    ref={ref}
    xmlns='http://www.w3.org/2000/svg'
    width='1em'
    height='1em'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={cn('animate-spin', className)}
  >
    <path d='M21 12a9 9 0 1 1-6.219-8.56' />
  </svg>
));
LoadingSpinner.displayName = 'LoadingSpinner';
