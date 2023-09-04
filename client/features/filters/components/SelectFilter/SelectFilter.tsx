import { useState } from 'react';

import { useTranslation } from 'next-i18next';

import { Select, SelectChangeEvent } from '@mui/material';
import { useRouter } from 'next/router';
import { MenuItem } from '@/components';

interface SelectFilterProps {
  options: { key: string }[];
  pageKey?: string;
}

export const SelectFilter: React.FC<SelectFilterProps> = ({ options, pageKey }) => {
  const router = useRouter();

  const [active, setActive] = useState((router.query.period as string) || options[0].key);

  const { t } = useTranslation();

  const handleChange = (event: SelectChangeEvent) => {
    const key = event.target.value as string;
    const page = pageKey || router.pathname.split('/')[1];

    setActive(key);

    if (key === options[0].key) {
      router.push(`/${page}`);

      return;
    }

    router.push(`/${page}/${key}`);
  };

  return (
    <Select value={active} onChange={handleChange} size='small' sx={{ width: 120, mb: 1 }}>
      {options.map(({ key }) => (
        <MenuItem value={key} key={key}>
          {t(`layout.filters.${key}`)}
        </MenuItem>
      ))}
    </Select>
  );
};
