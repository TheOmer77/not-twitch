'use client';

import { AlertTriangleIcon } from 'lucide-react';

import { Alert, AlertDescription } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
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
          <Alert variant='destructive'>
            <AlertTriangleIcon />
            <AlertDescription>
              This action will invalidate your current connection, and reset all
              active streams using it.
            </AlertDescription>
          </Alert>
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
