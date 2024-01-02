import { SettingsCard, SwitchSettingsItem } from '@/components/layout';
import { getCurrentUser } from '@/queries/auth';

const DashboardChatPage = async () => {
  const { stream } = await getCurrentUser({
    includeStream: true,
    throwIfNotFound: true,
  });
  if (!stream) throw new Error("You don't have a stream.");

  return (
    <>
      <h1 className='mb-4 text-4xl font-bold tracking-tight'>Chat settings</h1>
      <SettingsCard>
        <SwitchSettingsItem
          field='isChatEnabled'
          label='Enable chat'
          description="Allow users to send messages in your stream's chat."
          checked={stream.isChatEnabled}
        />
        <SwitchSettingsItem
          field='isChatDisabledOffline'
          label='Disable offline chat'
          description="Only allow users to send messages in chat when you're live."
          checked={stream.isChatDisabledOffline}
          disabled={!stream.isChatEnabled}
        />
        <SwitchSettingsItem
          field='isChatDelayed'
          label='Slow mode'
          description='Only allow users to send messages in chat every 3 seconds.'
          checked={stream.isChatDelayed}
          disabled={!stream.isChatEnabled}
        />
        <SwitchSettingsItem
          field='isChatFollowersOnly'
          label='Follower only chat'
          description='Only allow users who follow you to send messages in chat.'
          checked={stream.isChatFollowersOnly}
          disabled={!stream.isChatEnabled}
        />
      </SettingsCard>
    </>
  );
};

export default DashboardChatPage;
