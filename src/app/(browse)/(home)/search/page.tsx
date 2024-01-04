import { redirect } from 'next/navigation';

import { SearchResult } from '@/components/layout';
import { getSearchStreams } from '@/queries/stream';

type SearchPageProps = {
  searchParams: { query?: string };
};

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  if (!searchParams.query) redirect('/');
  const data = await getSearchStreams(searchParams.query);

  return (
    <>
      <h2 className='mb-4 text-2xl font-bold tracking-tight'>
        Results for &quot;{searchParams.query}&quot;
      </h2>
      {data.length < 1 ? (
        <p className='text-sm text-muted-foreground'>No result found.</p>
      ) : (
        <div className='flex flex-col gap-px'>
          {data.map(result => (
            <SearchResult key={result.id} data={result} />
          ))}
        </div>
      )}
    </>
  );
};

export default SearchPage;
