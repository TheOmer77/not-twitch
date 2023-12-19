import { notFound } from 'next/navigation';

import { UserAvatar } from '@/components/layout/Sidebar/UserAvatar';
import { getUserByUsername } from '@/services/users';

type UserPageProps = {
  params: { username: string };
};

const UserPage = async ({ params: { username } }: UserPageProps) => {
  const user = await getUserByUsername(username);
  if (!user) notFound();

  return (
    <div>
      <div className='mb-2 flex flex-row items-center gap-4'>
        <UserAvatar size='lg' username={username} imageUrl={user.imageUrl} />
        <h1 className='text-3xl font-bold tracking-tight'>{username}</h1>
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
  );
};

export default UserPage;
