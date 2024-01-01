'use client';

import { useState, type ComponentPropsWithoutRef } from 'react';
import type { User } from '@prisma/client';

import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';

export type UserProfileDialogProps = Omit<
  ComponentPropsWithoutRef<typeof Button>,
  'onClick'
> & {
  initialValues: Partial<User>;
};

export const UserProfileDialog = ({
  initialValues,
  ...props
}: UserProfileDialogProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <Button {...props} onClick={() => setDialogOpen(true)}>
        Edit
      </Button>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
          </DialogHeader>
          <div className='text-sm text-muted-foreground'>
            Nothing here yet...
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button>Cancel</Button>
            </DialogClose>
            <Button disabled variant='primary'>
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
