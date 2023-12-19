import { useEffect, useState } from 'react';

const getMatches = (query: string): boolean => {
  // Prevents SSR issues
  if (typeof window === 'undefined') return false;
  return window.matchMedia(query).matches;
};

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState<boolean>(getMatches(query));

  useEffect(() => {
    const handleChange = () => setMatches(getMatches(query));
    const matchMedia = window.matchMedia(query);

    handleChange();
    matchMedia.addEventListener('change', handleChange);

    return () => matchMedia.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
};
