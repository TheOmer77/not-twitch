import { SignInButton, UserButton } from '@clerk/nextjs';
import type { User } from '@prisma/client';

import { DashboardButton } from './DashboardButton';
import { Button } from '@/components/ui/Button';
import { getCurrentUser } from '@/queries/auth';

export const NavbarActions = async () => {
  let currentUser: User | null;
  try {
    currentUser = await getCurrentUser();
  } catch (error) {
    currentUser = null;
  }

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
