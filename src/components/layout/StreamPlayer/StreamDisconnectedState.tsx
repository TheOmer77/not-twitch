import { FrownIcon } from 'lucide-react';

export const StreamDisconnectedState = () => (
  <div className='flex h-full flex-col items-center justify-center gap-4 text-neutral-400'>
    <FrownIcon className='h-10 w-10' />
    <p>Disconnected</p>
  </div>
);
