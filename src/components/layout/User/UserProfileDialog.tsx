'use client';

import {
  useCallback,
  useState,
  useTransition,
  type ComponentPropsWithoutRef,
  type FormEventHandler,
} from 'react';
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
import { Spinner } from '@/components/ui/Spinner';
import { Textarea } from '@/components/ui/Textarea';
import { SettingsItem } from '@/components/layout/Settings';
import { useToast } from '@/hooks';
import { updateCurrentUser } from '@/actions/user';
import { cn } from '@/lib/utils';

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
  const [values, setValues] = useState(initialValues);

  const [isSaving, startTransition] = useTransition();
  const { displayToast } = useToast();

  const handleOpenChange = useCallback(
    (open: boolean) => {
      setDialogOpen(open);
      if (!open) setTimeout(() => setValues(initialValues), 200);
    },
    [initialValues]
  );

  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    e => {
      e.preventDefault();

      startTransition(async () => {
        try {
          await updateCurrentUser(values);
          displayToast('Profile updated.');
          setDialogOpen(false);
        } catch (err) {
          displayToast("Couldn't update profile", {
            description:
              err instanceof Error
                ? err.message
                : 'Something went wrong while updating your profile.',
          });
        }
      });
    },
    [displayToast, values]
  );

  return (
    <>
      <Button {...props} onClick={() => setDialogOpen(true)}>
        Edit
      </Button>

      <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <SettingsItem field='bio' label='Bio' orientation='vertical'>
              <Textarea
                placeholder='Write something about yourself...'
                value={values.bio || ''}
                onChange={e =>
                  setValues(prev => ({ ...prev, bio: e.target.value }))
                }
                className='resize-none'
              />
            </SettingsItem>

            <DialogFooter className='mt-4'>
              <DialogClose asChild>
                <Button type='button'>Cancel</Button>
              </DialogClose>
              <Button
                variant='primary'
                disabled={isSaving}
                className='relative'
              >
                <span className={cn(isSaving && 'invisible')}>Update</span>
                {isSaving && <Spinner className='absolute' />}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
