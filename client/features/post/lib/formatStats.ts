export const formatStats = (stat: number) => {
  if (stat < 1000) {
    return stat;
  }

  if (stat >= 1000000) {
    const formatted = Math.round(stat / 1000000);

    return formatted + 'KK';
  }

  const formatted = Math.round(stat / 1000);

  return formatted + 'K';
};
