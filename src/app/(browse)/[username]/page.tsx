import { db } from '@/lib/db';
import { notFound } from 'next/navigation';

type UserPageProps = {
  params: { username: string };
};

const UserPage = async ({ params: { username } }: UserPageProps) => {
  const user = await db.user.findUnique({ where: { username } });
  if (!user) notFound();

  return <div>{username}&apos;s user page</div>;
};

export default UserPage;
