import { SearchResultSkeleton } from '@/components/layout';
import { Skeleton } from '@/components/ui/Skeleton';

const SearchPageLoading = () => (
  <>
    <Skeleton className='mb-4 mt-1 h-em w-64 text-2xl' />
    <div className='flex flex-col gap-px'>
      {[...Array(5).keys()].map(key => (
        <SearchResultSkeleton key={key} />
      ))}
    </div>
  </>
);

export default SearchPageLoading;
