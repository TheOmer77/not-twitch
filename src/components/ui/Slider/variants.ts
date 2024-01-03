import { cva } from 'class-variance-authority';

export const sliderTrackVariants = cva(
  'relative h-1 w-full grow overflow-hidden rounded-full',
  {
    variants: {
      variant: { default: 'bg-secondary', light: 'bg-neutral-50/25' },
    },
    defaultVariants: { variant: 'default' },
  }
);

export const sliderThumbVariants = cva(
  `block h-4 w-4 rounded-full ring-offset-background transition-colors
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`,
  {
    variants: { variant: { default: 'bg-background', light: 'bg-neutral-50' } },
    defaultVariants: { variant: 'default' },
  }
);

export const sliderRangeVariants = cva('absolute h-full', {
  variants: { variant: { default: 'bg-primary', light: 'bg-neutral-50' } },
  defaultVariants: { variant: 'default' },
});
