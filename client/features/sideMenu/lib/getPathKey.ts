export const getPathKey = (path: string): string => {
  const key = path.split('/')[1];

  return key;
};
