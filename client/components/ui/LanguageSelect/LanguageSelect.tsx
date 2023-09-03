import { useCallback, useEffect, useState } from 'react';

import { Select, SelectChangeEvent } from '@mui/material';
import { useRouter } from 'next/router';

import { MenuItem } from '@/components';
import { localeCookie } from '@/features/cookies';

export const LanguageSelect = () => {
  const router = useRouter();

  const [selectedLanguage, setSelectedLanguage] = useState(router.locale);

  const handleChange = useCallback(
    (event: SelectChangeEvent<unknown>) => {
      const value = event.target.value as string;
      const { pathname, asPath, query } = router;

      setSelectedLanguage(value);
      localeCookie.set(value);

      router.push({ pathname, query }, asPath, { locale: value });
    },
    [router]
  );

  // Temporarily fix
  useEffect(() => {
    const preferedLocale = localeCookie.get();

    if (preferedLocale && preferedLocale !== selectedLanguage) {
      const { pathname, asPath, query } = router;
      setSelectedLanguage(preferedLocale);
      router.push({ pathname, query }, asPath, { locale: preferedLocale });
    }
  }, []);

  return (
    <Select value={selectedLanguage} onChange={handleChange} color='primary' size='small'>
      <MenuItem value={'ua'}>UA</MenuItem>
      <MenuItem value={'en'}>EN</MenuItem>
    </Select>
  );
};
