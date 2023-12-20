import type { User } from '@prisma/client';

import { UserAvatar } from './UserAvatar';
import { UserHeaderActions } from './UserHeaderActions';

export type UserHeaderProps = {
  user: User;
  isFollowing: boolean;
  isBlocking: boolean;
};

export const UserHeader = ({
  user,
  isFollowing,
  isBlocking,
}: UserHeaderProps) => {
  return (
    <div className='flex flex-col md:flex-row'>
      <div>
        <div className='mb-2 flex flex-row items-center gap-4'>
          <UserAvatar
            size='lg'
            username={user.username}
            imageUrl={user.imageUrl}
          />
          <h1 className='text-xl font-bold tracking-tight sm:text-3xl'>
            {user.username}
          </h1>
        </div>
        {user.bio && <p className='text-xl'>{user.bio}</p>}
        <p className='text-sm text-muted-foreground'>
          Joined{' '}
          {new Date(user.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </p>
      </div>
      <UserHeaderActions
        userId={user.id}
        isFollowing={isFollowing}
        isBlocking={isBlocking}
      />
    </div>
  );
};
