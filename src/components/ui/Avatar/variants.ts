import { cva } from 'class-variance-authority';

export const avatarVariants = cva(
  'relative flex shrink-0 overflow-hidden rounded-full',
  {
    variants: { size: { md: 'h-8 w-8', lg: 'h-14 w-14' } },
    defaultVariants: { size: 'md' },
  }
);
