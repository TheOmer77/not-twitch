'use client';

import { useCallback, useState, useTransition } from 'react';
import { IngressInput } from 'livekit-server-sdk';
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
import { useToast } from '@/hooks/useToast';
import { createIngress } from '@/actions/ingress';

export const ConnectionDialog = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [ingressType, setIngressType] = useState<number>(
    IngressInput.RTMP_INPUT
  );
  const [isPending, startTransition] = useTransition();
  const { displayToast } = useToast();

  const handleSubmit = useCallback(() => {
    startTransition(async () => {
      try {
        await createIngress(ingressType);

        displayToast('Ingress created.');
        setDialogOpen(false);
      } catch (err) {
        displayToast("Couldn't generate connection", {
          description:
            err instanceof Error
              ? err.message
              : 'Something went wrong while trying to create an ingress.',
        });
      }
    });
  }, [displayToast, ingressType]);

  return (
    <>
      <Button variant='primary' onClick={() => setDialogOpen(true)}>
        Generate connection
      </Button>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate connection</DialogTitle>
          </DialogHeader>
          <div className='flex flex-col gap-4'>
            <Select
              value={`${ingressType}`}
              onValueChange={value => setIngressType(Number(value))}
              disabled={isPending}
            >
              <SelectTrigger>
                <SelectValue placeholder='Ingress type' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={`${IngressInput.RTMP_INPUT}`}>
                  RTMP
                </SelectItem>
                <SelectItem value={`${IngressInput.WHIP_INPUT}`}>
                  WHIP
                </SelectItem>
              </SelectContent>
            </Select>
            <Alert variant='destructive'>
              <AlertTriangleIcon />
              <AlertDescription>
                This action will invalidate your current connection, and reset
                all active streams using it.
              </AlertDescription>
            </Alert>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant='secondary' disabled={isPending}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              variant='primary'
              onClick={handleSubmit}
              disabled={isPending}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
