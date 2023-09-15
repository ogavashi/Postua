import { useCallback, useEffect, useState, useRef } from 'react';

import { useRouter } from 'next/router';

import { useSnackbar } from 'notistack';

import { ApiService } from '@/services';
import { SearchResults } from '@/types';
import { useDebounce } from '@/hooks';

interface SearchOptions {
  sideFunc?: (value: boolean) => void;
}

export const useSearch = (options: SearchOptions) => {
  const [searchValue, setSearchValue] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [data, setData] = useState<SearchResults | null>(null);

  const debouncedValue = useDebounce<string>(searchValue, 500);

  const wrapperRef = useRef<HTMLHeadingElement>(null);

  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();

  useEffect(() => {
    if (debouncedValue) {
      handleSearch();
      setShowPreview(true);

      return;
    }

    setShowPreview(false);
  }, [debouncedValue]);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowPreview(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const onRouteChangeStart = () => {
      setShowPreview(false);
      options?.sideFunc && options.sideFunc(false);
    };
    router.events.on('routeChangeStart', onRouteChangeStart);

    return () => {
      router.events.off('routeChangeStart', onRouteChangeStart);
    };
  }, []);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setSearchValue(event.target.value);
    },
    []
  );

  const handleClearSearch = useCallback(() => {
    setSearchValue('');
    setData(null);
  }, []);

  const handleSearch = useCallback(async () => {
    try {
      const data = await ApiService.search.search(searchValue);
      setData(data);
    } catch (error) {
      enqueueSnackbar('Failed to get items', { variant: 'error' });
    }
  }, []);

  return {
    data,
    searchValue,
    handleChange,
    handleClearSearch,
    showPreview,
    setShowPreview,
    wrapperRef,
  };
};
