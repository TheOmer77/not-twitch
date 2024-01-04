import Link from 'next/link';

import { BrowseThumbnail, BrowseThumbnailSkeleton } from '../BrowseThumbnail';
import { Button } from '@/components/ui/Button';
import { UserAvatar } from '@/components/layout/User';
import type { StreamBase, StreamUser } from '@/types';
import { formatDistanceToNowStrict } from 'date-fns';
import { Skeleton } from '@/components/ui/Skeleton';
import { AvatarSkeleton } from '@/components/ui/Avatar';

type SearchResultProps = {
  data: StreamBase & StreamUser;
};

export const SearchResult = ({ data }: SearchResultProps) => (
  <Button
    asChild
    variant='flat'
    className='grid h-auto w-full grid-cols-[10rem,1fr] items-start gap-x-4
p-2 sm:grid-cols-[12rem,1fr] md:grid-cols-[14rem,1fr]'
  >
    <Link href={`/${data.user.username}`}>
      <BrowseThumbnail
        src={data.thumbnailUrl}
        fallback={data.user.imageUrl}
        username={data.user.username}
        isLive={data.isLive}
      />
      <div className='flex flex-col overflow-hidden'>
        <span
          className='truncate text-base font-semibold tracking-tight
sm:text-lg'
        >
          {data.title}
        </span>
        <span className='text-xs text-muted-foreground sm:text-sm'>
          {formatDistanceToNowStrict(data.updatedAt, { addSuffix: true })}
        </span>
        <div className='mt-2 flex flex-row items-center gap-2'>
          <UserAvatar
            username={data.user.username}
            imageUrl={data.user.imageUrl}
            isLive={data.isLive}
          />
          <span className='text-xs text-muted-foreground sm:text-sm'>
            {data.user.username}
          </span>
        </div>
      </div>
    </Link>
  </Button>
);

export const SearchResultSkeleton = () => (
  <div
    className='grid w-full grid-cols-[10rem,1fr] items-start gap-x-4 p-2
sm:grid-cols-[12rem,1fr] md:grid-cols-[14rem,1fr]'
  >
    <BrowseThumbnailSkeleton />
    <div className='flex flex-col'>
      <Skeleton
        className='my-1 h-em w-full text-base font-semibold sm:my-[0.3125rem]
sm:w-1/2 sm:text-lg'
      />
      <Skeleton className='my-0.5 h-em w-20 text-xs sm:my-1.5 sm:text-sm' />
      <div className='mt-2 flex flex-row items-center gap-2'>
        <AvatarSkeleton />
        <Skeleton className='my-0.5 h-em w-20 text-xs sm:my-1.5 sm:text-sm' />
      </div>
    </div>
  </div>
);
