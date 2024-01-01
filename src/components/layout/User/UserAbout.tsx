'use client';

import type { User } from '@prisma/client';

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
  user: User & { _count: { followedBy: number } };
  withHeader?: boolean;
};

export const UserAbout = ({ user, withHeader = false }: UserAboutProps) => {
  const currentUser = useCurrentUser();
  const isCurrentUser = currentUser?.username === user.username;
  const followerCount = user._count?.followedBy;

  return (
    <Card className='relative'>
      {withHeader && (
        <CardHeader>
          <CardTitle>About {user.username}</CardTitle>
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
          initialValues={{ bio: user.bio }}
          className='absolute end-4 top-4'
        >
          Edit
        </UserProfileDialog>
      )}
      <CardContent
        className={cn(
          !user.bio && 'text-muted-foreground',
          !withHeader && 'pt-6'
        )}
      >
        {user.bio ||
          'This user is so mysterious, that even we don’t know who they are.'}
      </CardContent>
    </Card>
  );
};
