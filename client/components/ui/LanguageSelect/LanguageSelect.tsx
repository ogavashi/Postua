import { useCallback, useState } from 'react';

import { Select, SelectChangeEvent } from '@mui/material';
import { useRouter } from 'next/router';
import { i18n } from 'next-i18next';

import { MenuItem } from '@/components';

export const LanguageSelect = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(i18n?.language || 'ua');

  const router = useRouter();

  const handleChange = useCallback((event: SelectChangeEvent<unknown>) => {
    const value = event.target.value as string;
    const path = router.asPath;

    setSelectedLanguage(value);

    router.push(path, path, { locale: value });
  }, []);

  return (
    <Select value={selectedLanguage} onChange={handleChange} color='primary' size='small'>
      <MenuItem value={'ua'}>UA</MenuItem>
      <MenuItem value={'en'}>EN</MenuItem>
    </Select>
  );
};
