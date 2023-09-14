import { useCallback, useEffect, useState } from 'react';

import { useSnackbar } from 'notistack';

import { ApiService } from '@/services';
import { ShortPostItem } from '@/types';
import { useDebounce } from '@/hooks';

export const useSearch = () => {
  const [searchValue, setSearchValue] = useState('');
  const debouncedValue = useDebounce<string>(searchValue, 500);

  const [data, setData] = useState<ShortPostItem[] | null>(null);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (debouncedValue) {
      handleSearch();
    }
  }, [debouncedValue]);

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
      const data = await ApiService.post.getAll();
      enqueueSnackbar('Failed to get items', { variant: 'error' });
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
  };
};
