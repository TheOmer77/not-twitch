import { buttonVariants } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import type { Appearance } from '@clerk/types';

export const clerkTheme: Appearance = {
  elements: {
    card: 'bg-popover text-popover-foreground shadow-md',
    userPreviewSecondaryIdentifier: 'text-muted-foreground',
    userButtonPopoverActionButtonText: 'text-card-foreground',
    userButtonPopoverActionButtonIcon: 'text-muted-foreground',
    userButtonPopoverFooter: 'hidden',
    socialButtonsBlockButton: cn(buttonVariants({ variant: 'default' })),
    socialButtonsBlockButtonText: 'text-foreground',
    formFieldLabel: 'text-muted-foreground',
    formFieldInput: 'bg-background text-inherit',
    formButtonPrimary: cn(buttonVariants({ variant: 'primary' })),
    footerActionText: 'text-foreground',
    footerActionLink: 'text-primary font-medium hover:text-primary',
  },
  userProfile: {
    elements: { card: 'bg-background' },
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
