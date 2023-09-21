import { constants } from '@/common';

export const getPeriod = (period: string | string[] | undefined) => {
  if (!period) {
    return;
  }

  const queryPeriod = period as string;

  return constants.FILTERS_TIME.find(({ key }) => key === queryPeriod)?.key;
};
