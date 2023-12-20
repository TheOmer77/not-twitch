import { currentUser, SignInButton, UserButton } from '@clerk/nextjs';

import { Button } from '@/components/ui/button';
import { DashboardButton } from './DashboardButton';

export const NavbarActions = async () => {
  const user = await currentUser();

  return (
    <div className='flex items-center justify-end gap-2'>
      {user && typeof user.username === 'string' ? (
        <>
          <DashboardButton />
          <UserButton afterSignOutUrl='/' />
        </>
      ) : (
        <SignInButton>
          <Button>Login</Button>
        </SignInButton>
      )}
    </div>
  );
};
