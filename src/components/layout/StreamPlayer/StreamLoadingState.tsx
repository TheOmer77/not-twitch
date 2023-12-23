import { Spinner } from '@/components/ui/Spinner';

export const StreamLoadingState = () => (
  <div className='flex h-full items-center justify-center'>
    <Spinner className='h-10 w-10' />
  </div>
);
