'use client';

import { useEffect } from 'react';
import { useMediaQuery } from 'usehooks-ts';

import { StreamChatCommunity } from './StreamChatCommunity';
import { StreamChatHeader } from './StreamChatHeader';
import { StreamChatInput } from './StreamChatInput';
import { StreamChatMessages } from './StreamChatMessages';
import { useChatSidebar } from '@/store/useChatSidebar';
import { Card } from '@/components/ui/Card';

export const StreamChat = () => {
  const matchesLg = useMediaQuery('(min-width: 1024px)');
  const { variant, setCollapsed } = useChatSidebar();

  useEffect(() => {
    if (!matchesLg) setCollapsed(false);
  }, [matchesLg, setCollapsed]);

  return (
    <Card className='flex h-full max-h-[calc(100vh-6rem)] flex-col gap-2 p-2'>
      <StreamChatHeader />
      {variant === 'community' ? (
        <StreamChatCommunity />
      ) : (
        <>
          <StreamChatMessages />
          <StreamChatInput />
        </>
      )}
    </Card>
  );
};
