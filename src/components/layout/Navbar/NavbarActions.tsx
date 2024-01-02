import { SignInButton, UserButton } from '@clerk/nextjs';

import { DashboardButton } from './DashboardButton';
import { Button } from '@/components/ui/Button';
import { getCurrentUser } from '@/queries/auth';

export const NavbarActions = async () => {
  const currentUser = await getCurrentUser();

  return (
    <div className='flex items-center justify-end gap-2'>
      {currentUser && typeof currentUser.username === 'string' ? (
        <>
          <DashboardButton />
          <UserButton afterSignOutUrl='/' />
        </>
      ) : (
        <SignInButton>
          <Button variant='primary'>Login</Button>
        </SignInButton>
      )}
    </div>
  );
};
