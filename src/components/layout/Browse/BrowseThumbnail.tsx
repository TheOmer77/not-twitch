import Image from 'next/image';
import { UserAvatar } from '..';
import { Skeleton } from '@/components/ui/Skeleton';

export type BrowseThumbnailProps = {
  src: string | null;
  fallback: string;
  username: string;
};

export const BrowseThumbnail = ({
  src,
  fallback,
  username,
}: BrowseThumbnailProps) => (
  <div className='group relative aspect-video rounded-md'>
    {/* TODO: Replace this with a shadow on hover */}
    <div
      className='absolute inset-0 flex items-center justify-center rounded-md
bg-primary opacity-0 transition-opacity group-hover:opacity-100'
    />
    {src ? (
      <Image
        src={src}
        alt={username}
        fill
        className='aspect-video rounded-md object-cover transition-transform
group-hover:-translate-y-1 group-hover:translate-x-1'
      />
    ) : (
      <div
        className='flex h-full w-full flex-col items-center justify-center
gap-4 rounded-md bg-card transition-transform group-hover:-translate-y-1
group-hover:translate-x-1'
      >
        <UserAvatar size='lg' imageUrl={fallback} username={username} />
      </div>
    )}
  </div>
);

export const BrowseThumbnailSkeleton = () => (
  <Skeleton className='aspect-video w-full rounded-md' />
);
