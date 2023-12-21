import { SwitchSettingsItem } from '@/components/layout';
import { Card } from '@/components/ui/card';
import { getStreamByUserId } from '@/queries/stream';
import { getSelf } from '@/services/auth';

const DashboardChatPage = async () => {
  const currentUser = await getSelf(),
    stream = await getStreamByUserId(currentUser.id);
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
            description='Only allow users to send messages in chat every TBD seconds.'
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
