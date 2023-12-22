import { ConnectionDialog, InputSettingsItem } from '@/components/layout';
import { Card } from '@/components/ui/Card';
import { getStreamByUserId } from '@/queries/stream';
import { getCurrentUser } from '@/services/auth';

const DashboardKeysPage = async () => {
  const currentUser = await getCurrentUser(),
    stream = await getStreamByUserId(currentUser.id);
  if (!stream) throw new Error("You don't have a stream.");

  return (
    <>
      <h1 className='mb-4 flex flex-row justify-between text-4xl font-bold tracking-tight'>
        Keys
        <ConnectionDialog />
      </h1>
      <Card>
        <ul className='flex w-full flex-col gap-px'>
          <InputSettingsItem
            field='serverUrl'
            label='Server URL'
            placeholder='Server URL'
            value={stream.serverUrl || ''}
            disabled
            withCopyButton
          />
          <InputSettingsItem
            field='streamKey'
            label='Stream key'
            placeholder='Stream key'
            value={stream.streamKey || ''}
            type='password'
            disabled
            withCopyButton
            secret
          />
        </ul>
      </Card>
    </>
  );
};

export default DashboardKeysPage;
