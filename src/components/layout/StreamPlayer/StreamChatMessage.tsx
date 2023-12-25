import type { ReceivedChatMessage } from '@livekit/components-react';

export type StreamChatMessageProps = { data: ReceivedChatMessage };

export const StreamChatMessage = ({ data }: StreamChatMessageProps) => (
  <p className='text-sm'>
    <span className='font-semibold'>{data.from?.name}: </span>
    {data.message}
  </p>
);
