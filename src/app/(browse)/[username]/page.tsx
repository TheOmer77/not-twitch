import { notFound } from 'next/navigation';

import { isFollowingUser } from '@/queries/follow';
import { isBlockingUser } from '@/queries/block';
import { getUserByUsername } from '@/queries/users';
import { UserHeader } from '@/components/layout';

type UserPageProps = {
  params: { username: string };
};

const UserPage = async ({ params: { username } }: UserPageProps) => {
  const viewedUser = await getUserByUsername(username);
  if (!viewedUser) notFound();

  const isFollowing = await isFollowingUser(viewedUser.id),
    isBlocking = await isBlockingUser(viewedUser.id);

  return (
    <>
      <UserHeader
        user={viewedUser}
        isFollowing={isFollowing}
        isBlocking={isBlocking}
      />
    </>
  );
};

export default UserPage;
