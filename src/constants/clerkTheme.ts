import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Appearance } from '@clerk/types';

export const clerkTheme: Appearance = {
  elements: {
    card: 'bg-card text-card-foreground shadow-md shadow-black/30',
    userPreviewSecondaryIdentifier: 'text-muted-foreground',
    userButtonPopoverActionButtonText: 'text-card-foreground',
    userButtonPopoverActionButtonIcon: 'text-muted-foreground',
    userButtonPopoverFooter: 'hidden',
    socialButtonsBlockButton: cn(buttonVariants({ variant: 'outline' })),
    socialButtonsBlockButtonText: 'text-foreground',
    formFieldLabel: 'text-muted-foreground',
    formFieldInput: 'bg-background text-inherit',
    formButtonPrimary: cn(buttonVariants({ variant: 'default' })),
    footerActionText: 'text-foreground',
    footerActionLink: 'text-primary font-medium hover:text-primary',
  },
  ...['signIn', 'signUp'].reduce(
    (obj, curr) => ({
      ...obj,
      [curr]: {
        elements: {
          rootBox: 'w-full',
          card: 'bg-transparent shadow-none py-0 [&>:last-child]:hidden m-0 p-0 w-full',
          headerTitle:
            'text-2xl text-center font-bold tracking-tight text-foreground',
          headerSubtitle: 'hidden',
        },
      },
    }),
    {}
  ),
};
