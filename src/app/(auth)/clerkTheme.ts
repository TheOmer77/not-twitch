import type { Theme } from '@clerk/types';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const clerkTheme: Theme = {
  elements: {
    card: 'bg-transparent shadow-none py-0 [&>:last-child]:hidden m-0 p-0 w-full',
    headerTitle:
      'text-2xl text-center font-bold tracking-tight text-foreground',
    headerSubtitle: 'hidden',
    socialButtonsBlockButton: cn(buttonVariants({ variant: 'outline' })),
    socialButtonsBlockButtonText: 'text-foreground',
    formFieldLabel: 'text-muted-foreground',
    formFieldInput: 'bg-background text-inherit',
    formButtonPrimary: cn(buttonVariants({ variant: 'default' })),
    footerActionText: 'text-foreground',
    footerActionLink: 'text-primary font-medium hover:text-primary',
  },
};

export default clerkTheme;
