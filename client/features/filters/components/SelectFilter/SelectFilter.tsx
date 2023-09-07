import { useState, useMemo } from 'react';

import { useTranslation } from 'next-i18next';

import { Select, SelectChangeEvent } from '@mui/material';
import { useRouter } from 'next/router';
import { MenuItem } from '@/components';

interface SelectFilterProps {
  options: { key: string }[];
  pageKey?: string;
  defaultValue?: { key: string };
}

export const SelectFilter: React.FC<SelectFilterProps> = ({
  options,
  pageKey,
  defaultValue = options[0],
}) => {
  const router = useRouter();

  const pathFilter = useMemo(
    () => (Object.values(router.query)[0] as string) || defaultValue.key,
    [router]
  );

  const [active, setActive] = useState(pathFilter || defaultValue.key);

  const { t } = useTranslation();

  const handleChange = (event: SelectChangeEvent) => {
    const key = event.target.value as string;
    const page = pageKey || router.pathname.split('/')[1];

    setActive(key);

    if (key === defaultValue.key) {
      router.push(`/${page}`);

      return;
    }

    router.push(`/${page}/${key}`);
  };

  return (
    <Select value={active} onChange={handleChange} size='small' sx={{ width: 120 }}>
      {options.map(({ key }) => (
        <MenuItem value={key} key={key}>
          {t(`layout.filters.${key}`)}
        </MenuItem>
      ))}
    </Select>
  );
};
