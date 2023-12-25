import { StreamPlayer } from '@/components/layout';
import { getCurrentUser } from '@/services/auth';

const DashboardHomePage = async () => {
  const { stream, ...user } = await getCurrentUser({ includeStream: true });
  if (!stream) throw new Error("You don't have a stream.");

  return (
    <div className='h-full'>
      <StreamPlayer user={user} stream={stream} isFollowing={true} />
    </div>
  );
};

export default DashboardHomePage;
