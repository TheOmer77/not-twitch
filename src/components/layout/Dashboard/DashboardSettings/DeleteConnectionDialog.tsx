'use client';

import { useCallback, useState, useTransition } from 'react';

import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import { Spinner } from '@/components/ui/Spinner';
import { useToast } from '@/hooks';
import { deleteUserIngress } from '@/actions/ingress';
import { cn } from '@/lib/utils';

export const DeleteConnectionDialog = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { displayToast } = useToast();

  const handleConfirm = useCallback(() => {
    startTransition(async () => {
      try {
        await deleteUserIngress();

        displayToast('Ingress deleted.');
        setDialogOpen(false);
      } catch (err) {
        displayToast("Couldn't delete connection", {
          description:
            err instanceof Error
              ? err.message
              : 'Something went wrong while trying to delete this ingress.',
        });
      }
    });
  }, [displayToast]);

  return (
    <>
      <Button
        variant='destructive'
        onClick={() => setDialogOpen(true)}
        className='ms-auto'
      >
        Delete connection
      </Button>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete connection?</DialogTitle>
            <DialogDescription>
              Your current connection will be deleted, and you won&apos;t be
              able to stream again until you generate a new one.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button disabled={isPending}>Cancel</Button>
            </DialogClose>
            <Button
              variant='destructive'
              onClick={handleConfirm}
              disabled={isPending}
              className='relative'
            >
              <span className={cn(isPending && 'invisible')}>Delete</span>
              {isPending && <Spinner className='absolute' />}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
