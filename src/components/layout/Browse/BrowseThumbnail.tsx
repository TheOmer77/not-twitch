import Image from 'next/image';

import { LiveBadge } from './LiveBadge';
import { UserAvatar } from '@/components/layout/User';
import { Skeleton } from '@/components/ui/Skeleton';

export type BrowseThumbnailProps = {
  src: string | null;
  fallback: string;
  username: string;
  isLive: boolean;
};

export const BrowseThumbnail = ({
  src,
  fallback,
  username,
  isLive,
}: BrowseThumbnailProps) => (
  // TODO: Replace this ::after with a shadow on hover
  <div
    className='relative aspect-video rounded-md after:absolute
after:start-0 after:top-0 after:-z-10 after:h-full after:w-full
after:rounded-md after:bg-primary after:opacity-0 after:transition-opacity
group-hover:after:opacity-100'
  >
    <div
      className='h-full w-full transition-transform group-hover:-translate-y-1
group-hover:translate-x-1'
    >
      {isLive && <LiveBadge className='absolute end-2 top-2 z-10' />}
      {src ? (
        <Image
          src={src}
          alt={username}
          fill
          className='rounded-md object-cover'
        />
      ) : (
        <div
          className='flex h-full w-full flex-col items-center
justify-center gap-4 rounded-md bg-card'
        >
          <UserAvatar size='lg' imageUrl={fallback} username={username} />
        </div>
      )}
    </div>
  </div>
);

export const BrowseThumbnailSkeleton = () => (
  <Skeleton className='aspect-video w-full rounded-md' />
);
