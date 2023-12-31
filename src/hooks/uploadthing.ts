import { generateReactHelpers } from '@uploadthing/react/hooks';

import type { ThumbnailFileRouter } from '@/lib/uploadthing';

export const { useUploadThing } = generateReactHelpers<ThumbnailFileRouter>();
