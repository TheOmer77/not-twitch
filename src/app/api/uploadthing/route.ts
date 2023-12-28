import { createNextRouteHandler } from 'uploadthing/next';

import { fileRouter } from '@/lib/uploadthing';

export const { GET, POST } = createNextRouteHandler({ router: fileRouter });
