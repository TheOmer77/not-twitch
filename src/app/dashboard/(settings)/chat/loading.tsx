import { SettingsCard, SettingsItemSkeleton } from '@/components/layout';
import { Skeleton } from '@/components/ui/Skeleton';

const DashboardChatLoading = () => (
  <>
    <Skeleton className='mb-4 h-10 w-60' />
    <SettingsCard>
      {[...Array(4).keys()].map(key => (
        <SettingsItemSkeleton key={key} withDescription />
      ))}
    </SettingsCard>
  </>
);

export default DashboardChatLoading;
