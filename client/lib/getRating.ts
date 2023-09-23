import { constants } from '@/common';

export const getRating = (rating: string | string[] | undefined) => {
  if (!rating) {
    return;
  }

  const queryRating = rating as string;

  return constants.FILTERS_RATING.find(({ key }) => key === queryRating)?.key;
};
