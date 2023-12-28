'use client';

import {
  useCallback,
  useState,
  useTransition,
  type FormEventHandler,
} from 'react';

import { useStream, useToast } from '@/hooks';
import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import { Spinner } from '@/components/ui/Spinner';
import { InputSettingsItem } from '@/components/layout/Settings';
import { cn } from '@/lib/utils';
import { updateStreamSettings } from '@/actions/stream';

export type StreamInfoProps = {
  initialThumbnailUrl: string | null;
};

export const StreamInfoDialog = ({ initialThumbnailUrl }: StreamInfoProps) => {
  const { hostId, viewerId, streamName: initialName } = useStream();
  const isHost = viewerId === `host-${hostId}`;

  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState(initialName);
  const [isPending, startTransition] = useTransition();

  const { displayToast } = useToast();

  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    e => {
      e.preventDefault();
      startTransition(async () => {
        try {
          await updateStreamSettings({ name });
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
    [displayToast, name]
  );

  if (!isHost) return null;

  return (
    <>
      <Button onClick={() => setDialogOpen(true)}>Edit stream info</Button>

      <Dialog
        open={dialogOpen}
        onOpenChange={open => !isPending && setDialogOpen(open)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Stream info</DialogTitle>
          </DialogHeader>
          <form className='flex w-full flex-col gap-px' onSubmit={handleSubmit}>
            <InputSettingsItem
              label='Title'
              value={name}
              onChange={e => setName(e.target.value)}
            />
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
