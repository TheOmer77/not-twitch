import Link from 'next/link';

import { BrowseThumbnail, BrowseThumbnailSkeleton } from './BrowseThumbnail';
import { LiveBadge } from './LiveBadge';
import { UserAvatar } from '@/components/layout/User';
import { AvatarSkeleton } from '@/components/ui/Avatar';
import { Skeleton } from '@/components/ui/Skeleton';
import type { Stream, UserBase } from '@/types';

export type BrowseResultProps = { data: Stream & { user: UserBase } };

export const BrowseResult = ({ data }: BrowseResultProps) => {
  return (
    <Link href={`/${data.user.username}`} className='group relative'>
      <BrowseThumbnail
        src={data.thumbnailUrl}
        fallback={data.user.imageUrl}
        username={data.user.username}
      />
      {data.isLive && (
        <LiveBadge
          className='absolute end-2 top-2 transition-transform
group-hover:-translate-y-1 group-hover:translate-x-1'
        />
      )}
      <div className='mt-2 flex flex-row gap-2'>
        <UserAvatar
          username={data.user.username}
          imageUrl={data.user.imageUrl}
          isLive={data.isLive}
        />
        <div className='flex flex-col overflow-hidden'>
          <span className='truncate text-base font-medium'>{data.title}</span>
          <span className='text-sm text-muted-foreground'>
            {data.user.username}
          </span>
        </div>
      </div>
    </Link>
  );
};

export const BrowseResultSkeleton = () => (
  <div>
    <BrowseThumbnailSkeleton />
    <div className='mt-2 flex flex-row gap-2'>
      <AvatarSkeleton />
      <div className='flex grow flex-col'>
        <Skeleton className='my-1 h-em w-full truncate font-medium' />
        <Skeleton className='my-0.5 h-em w-1/3 text-sm' />
      </div>
    </div>
  </div>
);
