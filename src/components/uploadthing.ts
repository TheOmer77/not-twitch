import { generateComponents } from '@uploadthing/react';

import type { ThumbnailFileRouter } from '@/lib/uploadthing';

export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<ThumbnailFileRouter>();
