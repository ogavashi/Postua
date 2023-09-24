import { useCallback, useEffect, useState, useRef } from 'react';

import { useRouter } from 'next/router';

import { useSnackbar } from 'notistack';

import { ApiService } from '@/services';
import { SearchResults } from '@/types';
import { useDebounce } from '@/hooks';
import { useToast } from '@/features/toast';

interface SearchOptions {
  sideFunc?: (value: boolean) => void;
}

export const useSearch = (options: SearchOptions) => {
  const [searchValue, setSearchValue] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [data, setData] = useState<SearchResults>([]);

  const debouncedValue = useDebounce<string>(searchValue, 500);

  const wrapperRef = useRef<HTMLHeadingElement>(null);

  const { toastError } = useToast();

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
    setData([]);
  }, []);

  const handleSearch = useCallback(async () => {
    try {
      const data = await ApiService.search.search(debouncedValue);
      setData(data);
    } catch (error) {
      toastError('Failed to get items', 'error');
    }
  }, [debouncedValue]);

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && debouncedValue) {
        event.preventDefault();
        router.push(`/search/${debouncedValue}`);
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [debouncedValue]);

  return {
    data,
    searchValue,
    handleChange,
    handleClearSearch,
    showPreview,
    setShowPreview,
    wrapperRef,
    debouncedValue,
  };
};
