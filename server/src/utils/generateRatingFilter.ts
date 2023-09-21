import { MoreThanOrEqual } from 'typeorm';

export const generateRatingFilter = (rating: string) => {
  switch (rating) {
    case 'from-10':
      return {
        dislikes: MoreThanOrEqual(10),
      };
    case 'from5':
      return {
        likes: MoreThanOrEqual(5),
      };
    case 'from10':
      return {
        likes: MoreThanOrEqual(10),
      };

    default:
      return {};
  }
};
