'use client';

import { UserProfileDialog } from './UserProfileDialog';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { useCurrentUser } from '@/hooks';
import { cn } from '@/lib/utils';

export type UserAboutProps = {
  username: string;
  bio: string | null;
  followerCount?: number;
  withHeader?: boolean;
};

export const UserAbout = ({
  username,
  bio,
  followerCount,
  withHeader = false,
}: UserAboutProps) => {
  const currentUser = useCurrentUser();
  const isCurrentUser = currentUser?.username === username;

  return (
    <Card className='relative'>
      {withHeader && (
        <CardHeader>
          <CardTitle>About {username}</CardTitle>
          {typeof followerCount === 'number' && (
            <CardDescription>
              {followerCount < 1
                ? 'No followers'
                : followerCount === 1
                  ? `${followerCount} follower`
                  : `${followerCount} followers`}
            </CardDescription>
          )}
        </CardHeader>
      )}
      {isCurrentUser && (
        <UserProfileDialog
          initialValues={{ bio }}
          className='absolute end-4 top-4'
        >
          Edit
        </UserProfileDialog>
      )}
      <CardContent
        className={cn(!bio && 'text-muted-foreground', !withHeader && 'pt-6')}
      >
        {bio ||
          'This user is so mysterious, that even we don’t know who they are.'}
      </CardContent>
    </Card>
  );
};
