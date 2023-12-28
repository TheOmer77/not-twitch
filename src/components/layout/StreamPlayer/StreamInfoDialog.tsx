'use client';

import {
  useCallback,
  useState,
  useTransition,
  type FormEventHandler,
} from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { TrashIcon } from 'lucide-react';

import { useStream, useToast } from '@/hooks';
import { Button, buttonVariants } from '@/components/ui/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import { Spinner } from '@/components/ui/Spinner';
import { Tooltip } from '@/components/ui/Tooltip';
import { InputSettingsItem, SettingsItem } from '@/components/layout/Settings';
import { UploadDropzone } from '@/components/uploadthing';
import { updateStreamSettings } from '@/actions/stream';
import { cn } from '@/lib/utils';

export type StreamInfoProps = {
  initialThumbnailUrl: string | null;
};

export const StreamInfoDialog = ({ initialThumbnailUrl }: StreamInfoProps) => {
  const { hostId, viewerId, title: initialTitle } = useStream();
  const isHost = viewerId === `host-${hostId}`;

  const [dialogOpen, setDialogOpen] = useState(false);
  const [title, setTitle] = useState(initialTitle),
    [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const { displayToast } = useToast();

  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    e => {
      e.preventDefault();
      startTransition(async () => {
        try {
          await updateStreamSettings({ title, thumbnailUrl });
          displayToast('Stream info updated.');
          setDialogOpen(false);
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
    [displayToast, thumbnailUrl, title]
  );

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (isPending) return;
      setDialogOpen(open);

      if (open) return;
      setTimeout(() => {
        setTitle(initialTitle);
        setThumbnailUrl(initialThumbnailUrl);
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
              onChange={e => setTitle(e.target.value)}
            />
            <SettingsItem
              field='thumbnailUrl'
              label='Thumbnail'
              orientation='vertical'
            >
              {thumbnailUrl ? (
                <div className='relative aspect-video w-full overflow-hidden rounded-lg border'>
                  <Image
                    src={thumbnailUrl}
                    alt='Stream thumbnail'
                    fill
                    className='object-cover'
                  />
                  <Tooltip label='Remove thumbnail'>
                    <Button
                      size='icon'
                      type='button'
                      className='absolute end-2 top-2'
                      onClick={() => setThumbnailUrl(null)}
                    >
                      <TrashIcon />
                    </Button>
                  </Tooltip>
                </div>
              ) : (
                <UploadDropzone
                  endpoint='thumbnailUploader'
                  // TODO: Only upload to uploadthing when pressing Save
                  // https://docs.uploadthing.com/api-reference/react#useuploadthing
                  config={{ mode: 'auto' }}
                  className='aspect-video w-full rounded-lg outline-dashed outline-1 outline-border'
                  appearance={{
                    label: 'text-foreground',
                    allowedContent: 'text-muted-foreground',
                    button: cn(
                      buttonVariants({ variant: 'default', size: 'md' }),
                      'after:bg-muted-foreground after:h-1 after:bottom-0'
                    ),
                  }}
                  onClientUploadComplete={([{ url }]) => {
                    setThumbnailUrl(url);
                    router.refresh();
                  }}
                  onUploadError={error => {
                    displayToast("Couldn't upload file", {
                      description: error.message,
                    });
                  }}
                />
              )}
            </SettingsItem>

            {/* TODO: If thumbnail is too big, disable saving & show error message */}
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
