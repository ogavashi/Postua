import { useCallback, useEffect, useState } from 'react';

import { Select, SelectChangeEvent } from '@mui/material';
import { useRouter } from 'next/router';

import { MenuItem } from '@/components';
import { localeCookie } from '@/features/cookies';
import { i18n } from 'next-i18next';

export const LanguageSelect = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(i18n?.language || 'ua');

  const router = useRouter();

  useEffect(() => {
    const savedLocale = localeCookie.get();

    if (savedLocale !== selectedLanguage) {
      const path = router.asPath;

      setSelectedLanguage(savedLocale);
      router.push(path, path, { locale: savedLocale });
    }
  }, []);

  const handleChange = useCallback((event: SelectChangeEvent<unknown>) => {
    const value = event.target.value as string;
    const path = router.asPath;

    setSelectedLanguage(value);
    localeCookie.set(value);

    router.push(path, path, { locale: value });
  }, []);

  return (
    <Select value={selectedLanguage} onChange={handleChange} color='primary' size='small'>
      <MenuItem value={'ua'}>UA</MenuItem>
      <MenuItem value={'en'}>EN</MenuItem>
    </Select>
  );
};
