import {
  ConnectionDialog,
  DeleteConnectionDialog,
  InputSettingsItem,
  SettingsCard,
  SettingsItem,
} from '@/components/layout';
import { getCurrentUser } from '@/queries/auth';
import { getStreamByUserId } from '@/queries/stream';

const DashboardKeysPage = async () => {
  const currentUser = await getCurrentUser({
      throwIfNotFound: true,
    }),
    stream = await getStreamByUserId(currentUser.id);
  if (!stream) throw new Error("You don't have a stream.");

  return (
    <>
      <h1 className='mb-4 text-4xl font-bold tracking-tight'>Keys</h1>
      {stream.ingressId ? (
        <>
          <h2 className='mb-2 text-base font-semibold'>Connection details</h2>
          <SettingsCard>
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
          </SettingsCard>
          <h2 className='mb-2 mt-4 text-base font-semibold'>
            Connection options
          </h2>
          <SettingsCard>
            <SettingsItem
              label='Regenerate connection'
              description="Change your connection's protocol and reset your
stream key, in case something went wrong. Note that this will invalidate
your current connection details."
            >
              <ConnectionDialog isRegenerate />
            </SettingsItem>
            <SettingsItem
              label='Delete connection'
              description="Delete your current connection. You won't be able to stream again until you generate a new one."
            >
              <DeleteConnectionDialog />
            </SettingsItem>
          </SettingsCard>
        </>
      ) : (
        <>
          <p className='mb-2'>You haven&apos;t generated a connection yet.</p>
          <ConnectionDialog />
        </>
      )}
    </>
  );
};

export default DashboardKeysPage;
