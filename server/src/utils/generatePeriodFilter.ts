import { Between } from 'typeorm';

export const generatePeriodFilter = (period: string) => {
  const finish = new Date();

  const start = new Date();

  switch (period) {
    case 'today':
      start.setHours(0, 0, 0, 0);
      break;
    case 'week':
      start.setDate(start.getDate() - 7);
      break;
    case 'month':
      start.setMonth(start.getMonth() - 1);
      break;
    case 'year':
      start.setFullYear(start.getFullYear() - 1);
      break;
    default:
      return {};
  }

  return {
    createdAt: Between(start, finish),
  };
};
