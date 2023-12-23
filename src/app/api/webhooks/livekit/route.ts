import { headers } from 'next/headers';
import { WebhookReceiver } from 'livekit-server-sdk';

import { db } from '@/lib/db';

const receiver = new WebhookReceiver(
  process.env.LIVEKIT_API_KEY as string,
  process.env.LIVEKIT_API_SECRET as string
);

export const POST = async (req: Request) => {
  const body = await req.text(),
    headerPayload = headers(),
    auth = headerPayload.get('Authorization');

  if (!auth)
    return new Response('Authorization header is missing!', { status: 400 });

  const event = receiver.receive(body, auth);
  switch (event.event) {
    case 'ingress_started': {
      await db.stream.update({
        where: { ingressId: event.ingressInfo?.ingressId },
        data: { isLive: true },
      });
      break;
    }

    case 'ingress_ended': {
      await db.stream.update({
        where: { ingressId: event.ingressInfo?.ingressId },
        data: { isLive: false },
      });
      break;
    }
  }
};
