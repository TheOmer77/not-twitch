import { redirect } from 'next/navigation';

import { StreamPlayer } from '@/components/layout';
import { getCurrentUser } from '@/queries/auth';

const DashboardHomePage = async () => {
  try {
    const { stream, ...user } = await getCurrentUser({
      includeStream: true,
      throwIfNotFound: true,
    });
    if (!stream) throw new Error("You don't have a stream.");

    return (
      <div className='h-full'>
        <StreamPlayer user={user} stream={stream} isFollowing={true} />
      </div>
    );
  } catch {
    redirect('/login');
  }
};

export default DashboardHomePage;
