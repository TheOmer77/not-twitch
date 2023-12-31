'use client';

import {
  useCallback,
  useMemo,
  useState,
  useTransition,
  type FormEventHandler,
} from 'react';
import { useRouter } from 'next/navigation';

import { useStream, useToast, useUploadThing } from '@/hooks';
import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import type { DropzoneProps } from '@/components/ui/Dropzone';
import { Spinner } from '@/components/ui/Spinner';
import { InputSettingsItem, SettingsItem } from '@/components/layout/Settings';
import { updateStreamSettings } from '@/actions/stream';
import { cn } from '@/lib/utils';
import { StreamThumbnailDropzone } from './StreamThumbnailDropzone';

export type StreamInfoProps = {
  initialThumbnailUrl: string | null;
};

export const StreamInfoDialog = ({ initialThumbnailUrl }: StreamInfoProps) => {
  const { hostId, viewerId, title: initialTitle } = useStream();
  const isHost = viewerId === `host-${hostId}`;

  const [dialogOpen, setDialogOpen] = useState(false);
  const [title, setTitle] = useState(initialTitle),
    [thumbnailFile, setThumbnailFile] = useState<File | null>(null),
    [thumbnailFileUrl, setThumbnailFileUrl] = useState(initialThumbnailUrl);

  const router = useRouter();
  const { displayToast } = useToast();

  const [isPending, startTransition] = useTransition();
  const [uploadProgress, setUploadProgress] = useState(0);
  const { permittedFileInfo, startUpload } = useUploadThing(
    'thumbnailUploader',
    {
      onUploadProgress: setUploadProgress,
      onUploadError: () => setUploadProgress(0),
    }
  );

  const maxFileSizeMb = useMemo(
    () =>
      permittedFileInfo?.config[
        Object.keys(
          permittedFileInfo.config
        )[0] as keyof typeof permittedFileInfo.config
      ]?.maxFileSize,
    [permittedFileInfo]
  );

  const handleDropzoneAccept = useCallback<
    NonNullable<DropzoneProps['onDropAccepted']>
  >(([file]) => {
    setThumbnailFile(file);
    setThumbnailFileUrl(URL.createObjectURL(file));
  }, []);

  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    e => {
      e.preventDefault();
      startTransition(async () => {
        try {
          let thumbnailUrl = thumbnailFileUrl;
          if (thumbnailFile) {
            const uploadedFiles = await startUpload([thumbnailFile]);
            if (!uploadedFiles)
              throw new Error(
                'Something went wrong while uploading thumbnail.'
              );
            thumbnailUrl = uploadedFiles[0].url;
            setThumbnailFileUrl(thumbnailUrl);
          }

          await updateStreamSettings({ title, thumbnailUrl });
          displayToast('Stream info updated.');
          setDialogOpen(false);
          router.refresh();
          setTimeout(() => setUploadProgress(0), 200);
        } catch (err) {
          displayToast("Couldn't update stream info", {
            description:
              err instanceof Error
                ? err.message
                : 'Something went wrong while updating the stream info.',
          });
        }
      });
    },
    [displayToast, router, startUpload, thumbnailFile, thumbnailFileUrl, title]
  );

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (isPending) return;
      setDialogOpen(open);

      if (open) return;
      setTimeout(() => {
        setTitle(initialTitle);
        setThumbnailFile(null);
        setThumbnailFileUrl(initialThumbnailUrl);
        setUploadProgress(0);
      }, 200);
    },
    [initialThumbnailUrl, initialTitle, isPending]
  );

  if (!isHost) return null;

  return (
    <>
      <Button onClick={() => setDialogOpen(true)}>Edit stream info</Button>

      <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Stream info</DialogTitle>
          </DialogHeader>
          <form className='flex w-full flex-col gap-px' onSubmit={handleSubmit}>
            <InputSettingsItem
              field='title'
              label='Title'
              value={title}
              onChange={e => !isPending && setTitle(e.target.value)}
            />
            <SettingsItem
              field='thumbnailUrl'
              label='Thumbnail'
              description={`Drop file here, or click to select it (max ${maxFileSizeMb})`}
              className='items-start'
            >
              <StreamThumbnailDropzone
                fileUrl={thumbnailFileUrl}
                uploadProgress={uploadProgress}
                disabled={isPending}
                onDropAccepted={handleDropzoneAccept}
                onFileRemoved={() => {
                  setThumbnailFile(null);
                  setThumbnailFileUrl(null);
                }}
              />
            </SettingsItem>

            <DialogFooter className='mt-4'>
              <DialogClose asChild>
                <Button type='button'>Cancel</Button>
              </DialogClose>
              <Button
                variant='primary'
                disabled={isPending}
                className='relative'
              >
                <span className={cn(isPending && 'invisible')}>Save</span>
                {isPending && <Spinner className='absolute' />}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
