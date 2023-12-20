import { notFound } from 'next/navigation';

import { UserAvatar } from '@/components/layout/User/UserAvatar';
import { UserHeaderActions } from '@/components/layout/User/UserHeaderActions';
import { isFollowingUser } from '@/queries/follow';
import { isBlockingUser } from '@/queries/block';
import { getUserByUsername } from '@/queries/users';
import { getSelf } from '@/services/auth';

type UserPageProps = {
  params: { username: string };
};

const UserPage = async ({ params: { username } }: UserPageProps) => {
  const viewedUser = await getUserByUsername(username);
  if (!viewedUser) notFound();

  const isFollowing = await isFollowingUser(viewedUser.id),
    isBlocking = await isBlockingUser(viewedUser.id);

  return (
    <div>
      <div className='mb-2 flex flex-row items-center gap-4'>
        <UserAvatar
          size='lg'
          username={username}
          imageUrl={viewedUser.imageUrl}
        />
        <h1 className='text-3xl font-bold tracking-tight'>{username}</h1>
        <UserHeaderActions
          userId={viewedUser.id}
          isFollowing={isFollowing}
          isBlocking={isBlocking}
        />
      </div>
      {viewedUser.bio && <p className='text-xl'>{viewedUser.bio}</p>}
      <p className='text-sm text-muted-foreground'>
        Joined{' '}
        {new Date(viewedUser.createdAt).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })}
      </p>
    </div>
  );
};

export default UserPage;
