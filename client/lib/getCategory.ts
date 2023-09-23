import { constants } from '@/common';

export const getCategory = (category: string | string[] | undefined) => {
  if (!category) {
    return;
  }

  const queryCategory = category as string;

  return constants.CATEGORIES.find(({ key }) => key === queryCategory)?.key;
};
