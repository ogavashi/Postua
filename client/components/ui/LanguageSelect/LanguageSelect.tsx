import { useCallback, useEffect, useState } from 'react';

import { Select, SelectChangeEvent } from '@mui/material';
import { useRouter } from 'next/router';

import { MenuItem } from '@/components';
import { localeCookie } from '@/features/cookies';
import { useAppDispatch, useAppSelector } from '@/store';
import { appActions, appSelectors } from '@/features/app';
import { Language } from '@/types';

export const LanguageSelect = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const language = useAppSelector(appSelectors.language);

  const handleChange = useCallback(
    (event: SelectChangeEvent<unknown>) => {
      const value = event.target.value as string;

      dispatch(appActions.setLanguage(value as Language));

      localeCookie.set(value);
    },
    [router]
  );

  useEffect(() => {
    if (router.locale !== language) {
      const { pathname, asPath, query } = router;
      router.push({ pathname, query }, asPath, { locale: language });
    }
  }, [router, language]);

  return (
    <Select value={language} onChange={handleChange} color='primary' size='small'>
      <MenuItem value={'ua'}>UA</MenuItem>
      <MenuItem value={'en'}>EN</MenuItem>
    </Select>
  );
};
