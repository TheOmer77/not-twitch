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
} from '@/components/ui/Dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { Spinner } from '@/components/ui/Spinner';
import { useToast } from '@/hooks';
import { createUserIngress } from '@/actions/ingress';
import { cn } from '@/lib/utils';

export type ConnectionDialogProps = {
  isRegenerate?: boolean;
};

export const ConnectionDialog = ({ isRegenerate }: ConnectionDialogProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [ingressType, setIngressType] = useState<number>(
    IngressInput.RTMP_INPUT
  );
  const [isPending, startTransition] = useTransition();
  const { displayToast } = useToast();

  const handleSubmit = useCallback(() => {
    startTransition(async () => {
      try {
        await createUserIngress(ingressType);

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
      <Button
        variant={isRegenerate ? 'default' : 'primary'}
        onClick={() => setDialogOpen(true)}
        className={cn(isRegenerate && 'ms-auto')}
      >
        {isRegenerate ? 'Regenerate connection' : 'Generate connection'}
      </Button>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isRegenerate ? 'Regenerate connection' : 'Generate connection'}
            </DialogTitle>
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
            {isRegenerate && (
              <Alert variant='destructive'>
                <AlertTriangleIcon />
                <AlertDescription>
                  This action will invalidate your current connection, and reset
                  all active streams using it.
                </AlertDescription>
              </Alert>
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button disabled={isPending}>Cancel</Button>
            </DialogClose>
            <Button
              variant='primary'
              onClick={handleSubmit}
              disabled={isPending}
              className='relative'
            >
              <span className={cn(isPending && 'invisible')}>Confirm</span>
              {isPending && <Spinner className='absolute' />}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
