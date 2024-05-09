import { useCallback, useMemo } from 'react';
import { TrashIcon } from 'lucide-react';
import Image from 'next/image';
import { generateClientDropzoneAccept } from 'uploadthing/client';

import { Button } from '@/components/ui/Button';
import { Dropzone, type DropzoneProps } from '@/components/ui/Dropzone';
import { Tooltip } from '@/components/ui/Tooltip';
import { useToast, useUploadThing } from '@/hooks';
import { cn } from '@/lib/utils';

export type StreamThumbnailDropzoneProps = {
  fileUrl: string | null;
  uploadProgress?: number;
  onDrop: DropzoneProps['onDrop'];
  onFileRemoved: () => void;
  disabled?: boolean;
};

export const StreamThumbnailDropzone = ({
  fileUrl,
  disabled,
  uploadProgress = 0,
  onDrop,
  onFileRemoved,
}: StreamThumbnailDropzoneProps) => {
  const { permittedFileInfo } = useUploadThing('thumbnailUploader');
  const { displayToast } = useToast();

  const [maxFileSize, maxFileSizeMb] = useMemo(() => {
    const maxSizeMb =
        permittedFileInfo?.config[
          Object.keys(
            permittedFileInfo.config
          )[0] as keyof typeof permittedFileInfo.config
        ]?.maxFileSize,
      maxSize = Number(maxSizeMb?.replace('MB', '')) * 1e6;
    return [maxSize, maxSizeMb];
  }, [permittedFileInfo]);

  const [allowedMimetypes, allowedFileExtenstions] = useMemo(() => {
    const mimetypes = permittedFileInfo?.config
        ? Object.keys(permittedFileInfo.config)
        : [],
      extensions = mimetypes.map(mimetype =>
        mimetype.split('/').slice(1).join('/')
      );
    return [mimetypes, extensions];
  }, [permittedFileInfo?.config]);

  const handleDrop = useCallback<NonNullable<DropzoneProps['onDrop']>>(
    acceptedFiles => {
      if (acceptedFiles.length > 0) return onDrop?.(acceptedFiles);

      const uppercaseExtenstions = allowedFileExtenstions.map(ext =>
        ext.toUpperCase()
      );
      displayToast("Couldn't upload this file", {
        description: `Only ${uppercaseExtenstions
          .slice(0, -1)
          .join(', ')} and ${uppercaseExtenstions.at(
          -1
        )} files under ${maxFileSizeMb} are supported.`,
      });
    },
    [allowedFileExtenstions, displayToast, maxFileSizeMb, onDrop]
  );

  return fileUrl ? (
    <div
      className='absolute end-0 top-2 ms-auto aspect-video h-24 overflow-hidden
rounded-lg outline outline-1 outline-border'
    >
      <Image
        src={fileUrl}
        alt='Stream thumbnail'
        fill
        className={cn(
          'object-cover transition-opacity',
          disabled && 'opacity-50'
        )}
      />
      <div
        className='absolute bottom-0 h-1 bg-primary transition-[width] duration-75'
        style={{ width: `${uploadProgress}%` }}
      />
      {!disabled && (
        <Tooltip label='Remove thumbnail'>
          <Button
            size='icon'
            type='button'
            className='absolute end-2 top-2'
            onClick={onFileRemoved}
          >
            <TrashIcon />
          </Button>
        </Tooltip>
      )}
    </div>
  ) : (
    <Dropzone
      className='absolute end-0 top-2 ms-auto aspect-video h-24 p-0'
      multiple={false}
      maxSize={maxFileSize}
      accept={generateClientDropzoneAccept(allowedMimetypes)}
      onDrop={handleDrop}
    />
  );
};
