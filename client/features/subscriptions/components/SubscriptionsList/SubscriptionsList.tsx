import { Box, Typography } from '@mui/material';

import { constants } from '@/common';
import { Subscription } from '@/features/subscriptions';
import { useMemo } from 'react';

import { useTranslation } from 'next-i18next';

interface SubscriptionsListProps {
  categories: { id: number; category: string }[];
}

export const SubscriptionsList: React.FC<SubscriptionsListProps> = ({ categories }) => {
  const { t } = useTranslation();

  const unSubscribedCategories = useMemo(
    () =>
      constants.CATEGORIES.filter(
        ({ key }) => !categories.find(({ category }) => category === key)
      ),
    [categories]
  );

  return (
    <Box display='flex' flexDirection='column' gap={2}>
      {!!categories.length && <Typography variant='h4'>{t('layout.ui.yourSubs')}</Typography>}
      {categories.map((item) => (
        <Subscription category={item.category} key={item.id} />
      ))}

      <Typography variant={categories.length ? 'h5' : 'h4'}>{t('layout.ui.consider')}</Typography>
      {unSubscribedCategories.map(({ key }) => (
        <Subscription category={key} key={key} isSubbed={false} />
      ))}
    </Box>
  );
};
