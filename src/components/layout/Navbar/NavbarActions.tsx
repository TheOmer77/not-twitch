'use client';

import { SignInButton, useUser } from '@clerk/nextjs';

import { DashboardButton } from './DashboardButton';
import { Button } from '@/components/ui/Button';

import { UserMenu } from './UserMenu';

export const NavbarActions = () => {
  const { isLoaded, user } = useUser();

  return (
    <div className='flex items-center justify-end gap-2'>
      {isLoaded &&
        (typeof user?.username === 'string' ? (
          <DashboardButton />
        ) : (
          <SignInButton>
            <Button variant='primary'>Login</Button>
          </SignInButton>
        ))}
      <UserMenu />
    </div>
  );
};
