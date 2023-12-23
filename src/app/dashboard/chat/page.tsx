import { SwitchSettingsItem } from '@/components/layout';
import { Card } from '@/components/ui/Card';
import { getCurrentUser } from '@/services/auth';

const DashboardChatPage = async () => {
  const { stream } = await getCurrentUser({ includeStream: true });
  if (!stream) throw new Error("You don't have a stream.");

  return (
    <>
      <h1 className='mb-4 text-4xl font-bold tracking-tight'>Chat settings</h1>
      <Card>
        <ul className='flex w-full flex-col gap-px'>
          <SwitchSettingsItem
            field='isChatEnabled'
            label='Enable chat'
            description="Allow users to send messages in your stream's chat."
            checked={stream.isChatEnabled}
          />
          <SwitchSettingsItem
            field='isChatDelayed'
            label='Slow mode'
            description='Only allow users to send messages in chat every 3 seconds.'
            checked={stream.isChatDelayed}
          />
          <SwitchSettingsItem
            field='isChatFollowersOnly'
            label='Follower only chat'
            description="Only allow users who follow you to send messages in your stream's chat."
            checked={stream.isChatFollowersOnly}
          />
        </ul>
      </Card>
    </>
  );
};

export default DashboardChatPage;
