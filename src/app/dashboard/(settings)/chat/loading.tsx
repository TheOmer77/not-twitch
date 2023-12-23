import { SettingsItemSkeleton } from '@/components/layout';
import { Card } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';

const DashboardChatLoading = () => (
  <>
    <Skeleton className='mb-4 h-10 w-60' />
    <Card>
      <ul className='flex w-full flex-col gap-px'>
        {[...Array(3).keys()].map(key => (
          <SettingsItemSkeleton key={key} withDescription />
        ))}
      </ul>
    </Card>
  </>
);

export default DashboardChatLoading;
