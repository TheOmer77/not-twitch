import type { ReceivedChatMessage } from '@livekit/components-react';

export type StreamChatMessageProps = { data: ReceivedChatMessage };

export const StreamChatMessage = ({ data }: StreamChatMessageProps) => (
  <li className='mb-2 text-sm'>
    <span className='me-2 font-semibold text-primary'>{data.from?.name}</span>
    {data.message}
  </li>
);
