'use client';

import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';

export const ConnectDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='primary'>Generate connection</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate connection</DialogTitle>
          <DialogDescription>
            Choose an ingress type below. Note that this will invalidate your
            current connection, and reset all active streams using it.
          </DialogDescription>
        </DialogHeader>
        <div className='flex flex-col gap-4'>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder='Ingress type' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='rtmp'>RTMP</SelectItem>
              <SelectItem value='whip'>WHIP</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='secondary'>Cancel</Button>
          </DialogClose>
          <Button variant='primary'>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
