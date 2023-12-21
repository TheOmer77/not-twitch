import { Skeleton } from '@/components/ui/skeleton';

export type SettingsItemSkeletonProps = {
  withDescription?: boolean;
};

export const SettingsItemSkeleton = ({
  withDescription = false,
}: SettingsItemSkeletonProps) => (
  <li className='flex flex-row items-center px-4 py-2'>
    <div className='flex flex-col gap-0'>
      <Skeleton className='my-1 h-4 w-20 md:w-32' />
      {withDescription && <Skeleton className='my-1 h-3 w-60 md:w-96' />}
    </div>
  </li>
);
