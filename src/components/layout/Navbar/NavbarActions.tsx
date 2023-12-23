import { currentUser, SignInButton, UserButton } from '@clerk/nextjs';

import { Button } from '@/components/ui/Button';
import { DashboardButton } from './DashboardButton';
import { getCurrentUser } from '@/services/auth';
import type { User } from '@prisma/client';

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
