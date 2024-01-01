'use client';

import { Button } from '@/components/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { useStream } from '@/hooks';
import { cn } from '@/lib/utils';

export type StreamAboutCardProps = {
  bio: string | null;
  followerCount: number;
};

export const StreamAboutCard = ({
  bio,
  followerCount,
}: StreamAboutCardProps) => {
  const { hostId, hostName, viewerId } = useStream();

  const isHost = viewerId === `host-${hostId}`;

  return (
    <Card>
      {/* Follower count */}
      <div className='flex flex-row items-start justify-between p-6'>
        <CardHeader className='p-0'>
          <CardTitle>About {hostName}</CardTitle>
          <CardDescription>
            {followerCount < 1
              ? 'No followers'
              : followerCount === 1
                ? `${followerCount} follower`
                : `${followerCount} followers`}
          </CardDescription>
        </CardHeader>
        {isHost && <Button>Edit</Button>}
      </div>
      <CardContent className={cn(!bio && 'text-muted-foreground')}>
        {bio ||
          'This user is so mysterious, that even we don’t know who they are.'}
      </CardContent>
    </Card>
  );
};
